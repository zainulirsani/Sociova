<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\KelasController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SubmissionController;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('welcome');



Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


//Route Dosen
// Route::get('/dosen/dashboard', [SubmissionController::class, 'index'])
//     ->middleware(['auth', 'verified'])->name('dashboardDosen');

Route::middleware(['auth', 'verified'])->group(function () {
    // ... route umum seperti profile

    // Grup khusus untuk Dosen
    Route::middleware('role:dosen')->prefix('dosen')->name('dosen.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'dosen'])->name('dashboardDosen');

        Route::get('/kelas', [KelasController::class, 'index'])->name('kelas');
        Route::get('/kelas/{kelas}', [KelasController::class, 'show'])->name('kelas.show');
        Route::post('/kelas', [KelasController::class, 'store'])->name('kelas.store');
        Route::patch('/kelas/{kelas}', [KelasController::class, 'update'])->name('kelasUpdate');
        Route::delete('/kelas/{kelas}', [KelasController::class, 'destroy'])->name('kelas.destroy');

        Route::post('/kelas/{kelas}/sesi', [KelasController::class, 'storeSesi'])->name('kelasSesi.store');
        Route::patch('/kelas/{kelas}/sesi/{sesi}', [KelasController::class, 'updateSesi'])->name('sesiUpdate');
        Route::delete('/kelas/{kelas}/sesi/{sesi}', [KelasController::class, 'destroySesi'])->name('sesiDestroy');
    });

    // Grup khusus untuk Mahasiswa
    Route::middleware('role:student')->prefix('mahasiswa')->name('mahasiswa.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'Mahasiswa'])->name('dashboard');
        
        Route::post('/kelas/join', [KelasController::class, 'join'])->name('kelasJoin');
        Route::get('/kelas', [KelasController::class, 'indexMahasiswa'])->name('kelas');
        Route::get('/kelas/{kelas}', [KelasController::class, 'showMahasiswa'])->name('kelas.show');


        Route::get('{kelas}/evaluasi', [SubmissionController::class, 'index'])->name('EvaluasiKelas');
        Route::post('/submissions', [
            SubmissionController::class,
            'store'
        ])->middleware(['auth', 'verified'])->name('submissions.store');
    });
});
require __DIR__ . '/auth.php';
