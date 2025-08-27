<?php

namespace App\Http\Controllers;

use App\Models\Analysis;
use App\Models\Submission;
use App\Services\GeminiService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SubmissionController extends Controller
{
    protected $geminiService;

    public function __construct(GeminiService $geminiService)
    {
        $this->geminiService = $geminiService;
    }

    public function store(Request $request)
    {
        $request->validate(['content' => 'required|string|min:20']);

        // 1. Simpan tulisan siswa
        $submission = Submission::create([
            'user_id' => Auth::id(), // ID siswa yang login
            'evaluation_id' => 1, // Mengacu ke "Jurnal Belajar Harian"
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
}