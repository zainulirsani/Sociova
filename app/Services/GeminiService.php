<?php

namespace App\Services;

use App\Models\Submission;
use Gemini;
use Gemini\Data\Content;
use Gemini\Enums\Role;
use Exception;

class GeminiService
{
    /**
     * Menganalisis sebuah submission siswa menggunakan Gemini 1.5 Pro.
     *
     * @param Submission $submission
     * @return array ['success' => bool, 'data' => array|string]
     */
    public function analyzeSubmission(Submission $submission): array
    {
        // PERBAIKAN PENTING: Langsung ambil dari .env karena package baru tidak punya file config.
        $yourApiKey = env('GEMINI_API_KEY');

        if (!$yourApiKey) {
            return ['success' => false, 'data' => 'GEMINI_API_KEY is not set in .env file.'];
        }

        $client = Gemini::client($yourApiKey);

        // ... (sisa kodenya sama persis seperti sebelumnya dan sudah benar)

        $criteria = "- Tata bahasa dan penulisan.\n- Kedalaman refleksi dan emosi.\n- Identifikasi potensi masalah (misal: perundungan, stres, demotivasi).\n- Saran atau kalimat penyemangat yang positif.";

        $prompt = "
        Anda adalah seorang psikolog dan konselor sekolah yang bijaksana, empatik, dan suportif.
        Tugas Anda adalah menganalisis tulisan jurnal seorang siswa dan memberikan umpan balik yang konstruktif.

        Berikut adalah kriteria analisis:
        {$criteria}

        Berikut adalah tulisan jurnal dari siswa:
        ---
        {$submission->content}
        ---

        Tolong berikan hasil analisis dalam format JSON yang ketat. JANGAN tambahkan teks atau format lain di luar JSON ini.
        Struktur JSON harus seperti ini:
        {
          \"summary\": \"(Ringkasan singkat dari tulisan siswa dalam 2-3 kalimat. Tangkap sentimen utamanya: positif, negatif, atau netral)\",
          \"suggested_score\": (Berikan skor dari 1-100 yang merepresentasikan tingkat 'kesejahteraan' siswa berdasarkan tulisan ini. 100 sangat baik, 1 sangat butuh perhatian),
          \"feedback_points\": [
            { \"type\": \"strength\", \"point\": \"(Satu poin kekuatan atau hal positif dari tulisan ini)\" },
            { \"type\": \"concern\", \"point\": \"(Satu potensi masalah atau kekhawatiran yang teridentifikasi. Jika tidak ada, tulis 'Tidak ada kekhawatiran khusus yang teridentifikasi.')\" },
            { \"type\": \"suggestion\", \"point\": \"(Satu saran atau kalimat penyemangat yang relevan dan positif untuk siswa)\" }
          ]
        }
        ";

        try {
            // Cukup ganti nama modelnya seperti ini:
            $result = $client->generativeModel('gemini-2.0-flash')->generateContent($prompt);

            $rawText = $result->text();

            // PERBAIKAN: "Buka amplop" - Hapus ```json dan ``` dari respons
            $jsonText = preg_replace('/^```json\s*|\s*```$/m', '', $rawText);

            // Decode teks yang sudah bersih
            $analysisData = json_decode(trim($jsonText), true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                // Jika masih error, kita log teks yang sudah dibersihkan untuk debug
                throw new Exception('Invalid JSON response from AI. Cleaned text: ' . $jsonText);
            }

            return ['success' => true, 'data' => $analysisData];
        } catch (Exception $e) {
            report($e);
            return ['success' => false, 'data' => $e->getMessage()];
        }
    }
}
