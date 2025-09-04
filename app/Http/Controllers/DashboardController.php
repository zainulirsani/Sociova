<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\KelasService;
use App\Services\EvaluasiService;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    protected $kelasService;
    protected $evaluasiService;
    public function __construct(KelasService $kelasService, EvaluasiService $evaluasiService)
    {
        $this->kelasService = $kelasService;
        $this->evaluasiService = $evaluasiService;
    }

    public function Mahasiswa()
    {
        $datakelas = $this->kelasService->getKelasUser();

        // Panggil service yang sudah diperbaiki
        $evaluasiData = $this->evaluasiService->getDataByUserId(Auth::id());

        return Inertia::render('Mahasiswa/Dashboard', [
            // Kirim setiap data dengan key yang jelas
            'dataSubmission' => $evaluasiData['submissions'],
            'averageScore' => $evaluasiData['averageScore'],
            'kelasResult' => $datakelas,
        ]);
    }

    public function Dosen()
    {
        $submissions = $this->getSubmissionAll();

        // Render halaman Inertia 'Dashboard' dan kirimkan data 'submissions'
        return Inertia::render('Dosen/Dashboard', [
            'submissions' => $submissions,
        ]);
    }

    public function getSubmissionAll()
    {
        return $this->evaluasiService->getAllSubmissionsWithDetails();
    }
}
