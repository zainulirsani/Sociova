<?php

namespace App\Services;

use App\Models\Submission;
use App\Models\Evalution;
use App\Models\Analysis;
use App\Models\SesiPembelajaran;

class EvaluasiService
{
    public function getAllSubmissionsWithDetails()
    {
        $subbmissionsCount = Submission::count();
        $submissions = Submission::with('user', 'analysis', 'sesiPembelajaran.kelas')
        ->latest()    
        ->get();
        // dd($submissions);
        return [
            'totalSubmissions' => $subbmissionsCount,
            'submissions' => $submissions
        ];
    }

    // app/Services/EvaluasiService.php

    public function getDataByUserId($userId): array
    {
        // 1. Ambil semua submisi milik user yang sudah memiliki hasil analisis.
        //    Kita butuh relasi 'analysis' untuk mendapatkan skornya.
        $submissionsWithAnalysis = Submission::where('user_id', $userId)
            ->whereHas('analysis') // Hanya ambil yang punya relasi 'analysis'
            ->with('analysis')
            ->get();

        // 2. Hitung rata-rata skor dari koleksi yang didapat.
        //    'pluck' mengambil semua 'suggested_score' dari relasi 'analysis'.
        //    'avg' menghitung rata-ratanya. Hasilnya akan 0 jika tidak ada skor.
        $averageScore = $submissionsWithAnalysis->pluck('analysis.suggested_score')->avg();

        // 3. Ambil 10 submisi terbaru untuk ditampilkan di riwayat (dengan relasi lengkap).
        $latestSubmissions = Submission::with(['analysis', 'sesiPembelajaran.kelas'])
            ->where('user_id', $userId)
            ->latest()
            ->take(10)
            ->get();

        // 4. Kembalikan semua data dalam satu array yang terstruktur.
        return [
            'submissions' => $latestSubmissions,
            'averageScore' => round($averageScore ?? 0), // Bulatkan rata-rata, default 0 jika null
        ];
    }
}
