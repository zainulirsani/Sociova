<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Kelas;
use App\Models\Analysis;
use App\Models\Submission;
use Illuminate\Http\Request;
use App\Services\GeminiService;
use Illuminate\Support\Facades\Auth;
use App\Services\EvaluasiService; // <-- Pastikan untuk mengimpor service ini

class SubmissionController extends Controller
{
    protected $geminiService;
    protected $evaluasiService;

    /**
     * Meng-inject semua service yang dibutuhkan oleh controller.
     *
     * @param GeminiService $geminiService
     * @param EvaluasiService $evaluasiService
     */
    public function __construct(GeminiService $geminiService, EvaluasiService $evaluasiService)
    {
        $this->geminiService = $geminiService;
        $this->evaluasiService = $evaluasiService;
    }

    /**
     * Menyimpan submission baru dari mahasiswa dan menganalisisnya.
     *
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse
     */

   public function index(Kelas $kelas) // <-- Ganti dari index() dan terima $kelas
    {
        // Eager load semua sesi pembelajaran yang dimiliki oleh kelas ini
        $kelas->load('sesiPembelajaran');

        // Render halaman Inertia dan kirimkan data yang dibutuhkan
        return Inertia::render('Mahasiswa/EvaluasiKelas', [ // Asumsi nama file Show.tsx
            'kelas' => $kelas,
            'sesiList' => $kelas->sesiPembelajaran, // Kirim daftar sesi
        ]);
    }
    public function store(Request $request)
    {

        $request->validate(['content' => 'required|string|min:20']);
        // dd($request->all());
        // 1. Simpan tulisan siswa
        $submission = Submission::create([
            'user_id' => Auth::id(),
            'sesi_pembelajaran_id' => $request->input('sesi_pembelajaran_id'),
            'content' => $request->input('content'),
        ]);

        // 2. Panggil GeminiService untuk analisis
        $analysisResult = $this->geminiService->analyzeSubmission($submission);

        // 3. Simpan hasil analisis ke database
        $analysis = new Analysis();
        
        $analysis->submission_id = $submission->id;

        if ($analysisResult['success']) {
            $analysis->status = 'completed';
            $analysis->raw_response = json_encode($analysisResult['data']);
            $analysis->summary = $analysisResult['data']['summary'] ?? null;
            $analysis->suggested_score = $analysisResult['data']['suggested_score'] ?? null;
            $analysis->feedback_points = json_encode($analysisResult['data']['feedback_points'] ?? []);
        } else {
            $analysis->status = 'failed';
            $analysis->error_message = $analysisResult['data'];
        }

        $analysis->save();

        return redirect()->back()->with('success', 'Jurnal berhasil disimpan dan dianalisis!');
    }

    /**
     * Mengambil semua data submission melalui EvaluasiService.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getSubmissionAll()
    {
        return $this->evaluasiService->getAllSubmissionsWithDetails();
    }
}