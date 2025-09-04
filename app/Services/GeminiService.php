<?php

namespace App\Services;

use App\Models\Submission;
use Gemini;
use Gemini\Data\Content;
use Gemini\Enums\Role;
use Exception;

class GeminiService
{
    public function analyzeSubmission(Submission $submission): array
    {
        $yourApiKey = env('GEMINI_API_KEY');
        if (!$yourApiKey) {
            return ['success' => false, 'data' => 'GEMINI_API_KEY is not set.'];
        }

        $sesi = $submission->sesiPembelajaran;

        if (!$sesi) {
             throw new Exception('Submission tidak terhubung ke sesi pembelajaran yang valid.');
        }

        $sesiContext = "Topik Sesi: \"{$sesi->topik}\"\n";
        if (!empty($sesi->deskripsi)) {
            $sesiContext .= "Deskripsi Sesi: \"{$sesi->deskripsi}\"\n";
        }

        $client = Gemini::client($yourApiKey);

        // --- PROMPT BARU DENGAN LOGIKA KONDISIONAL UNTUK 'SUGGESTION' ---
        $prompt = "
        Anda adalah seorang analis pedagogi dan pakar pengalaman belajar mahasiswa.
        Tugas Anda adalah menganalisis refleksi mahasiswa secara holistik.

        **KONTEKS SESI PEMBELAJARAN HARI INI:**
        ---
        {$sesiContext}
        ---

        **REFLEKSI DARI MAHASISWA:**
        ---
        {$submission->content}
        ---

        Lakukan analisis berdasarkan kriteria berikut dan berikan hasilnya dalam format JSON yang ketat.

        Struktur JSON harus seperti ini:
        {
          \"summary\": \"(Ringkasan analisis dalam 2-3 kalimat, mencakup aspek pemahaman DAN pengalaman)\",
          \"suggested_score\": (Berikan skor dari 1-100 yang merepresentasikan KUALITAS REFLEKSI. Skor TINGGI (75-100) diberikan jika mahasiswa menunjukkan pemahaman materi yang baik, ATAU jika mereka memberikan deskripsi PENGALAMAN BELAJAR yang detail dan berharga.),
          \"feedback_points\": [
            { \"type\": \"strength\", \"point\": \"(Identifikasi poin kekuatan atau aspek paling positif dari refleksi ini)\" },
            { \"type\": \"concern\", \"point\": \"(Identifikasi satu kendala atau kebingungan utama. JIKA TIDAK ADA KENDALA SAMA SEKALI, tulis 'Tidak ada kendala signifikan yang teridentifikasi.')\" },
            { \"type\": \"suggestion\", \"point\": \"(BERIKAN SARAN HANYA JIKA ADA 'concern' yang valid. JIKA 'concern' menyatakan tidak ada kendala, maka berikan respons POSITIF atau PENGUATAN di sini, contohnya: 'Pertahankan semangat belajar yang positif ini!' atau 'Pengalaman belajar yang baik ini adalah fondasi yang bagus untuk sesi berikutnya.')\" }
          ]
        }
        ";

        try {
            // Sebaiknya gunakan model yang lebih baru seperti gemini-1.5-pro atau gemini-1.5-flash
            $result = $client->generativeModel('gemini-2.0-flash')->generateContent($prompt);

            $rawText = $result->text();
            $jsonText = preg_replace('/^```json\s*|\s*```$/m', '', $rawText);
            $analysisData = json_decode(trim($jsonText), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('Invalid JSON response from AI. Raw text: ' . $rawText);
            }

            return ['success' => true, 'data' => $analysisData];
        } catch (Exception $e) {
            report($e);
            return ['success' => false, 'data' => $e->getMessage()];
        }
    }
}