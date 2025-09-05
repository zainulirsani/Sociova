<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Kelas;
use Illuminate\Http\Request;
use App\Services\KelasService;
use App\Models\SesiPembelajaran;
use Illuminate\Validation\ValidationException;

class KelasController extends Controller
{
    protected $kelasService;

    public function __construct(KelasService $kelasService)
    {
        $this->kelasService = $kelasService;
    }

    public function index()
    {
        $classes = $this->kelasService->getAllKelas();
        // dd($classes);
        return inertia('Dosen/Kelas', ['classes' => $classes]);
    }
    public function show(Kelas $kelas)
    {
        // Eager load sesi pembelajaran untuk kelas ini
        $kelas->load('sesiPembelajaran');

        return Inertia::render('Dosen/Kelas/Show', [
            'kelas' => $kelas
        ]);
    }

    public function indexMahasiswa()
    {
        $classes = $this->kelasService->getKelasUser();
        // dd($classes);
        return inertia('Mahasiswa/Kelas', [ 'enrolledClasses' => $classes]);
    }
    public function store(Request $request)
    {

        $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);
        try {
            $this->kelasService->createKelas($request->only('nama', 'deskripsi', 'status'));

            return redirect()->route('dosen.kelas')->with('success', 'Kelas berhasil dibuat.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal membuat kelas: ' . $e->getMessage()]);
        }
    }

    public function storeSesi(Request $request, Kelas $kelas)
    {
        // PERBAIKAN: Sesuaikan aturan validasi dengan data dari form React
        $validatedData = $request->validate([
            'topik'        => 'required|string|max:255',
            'pertemuan_ke' => 'required|integer|min:1',
            'deskripsi'    => 'nullable|string',
            'status'       => 'required|in:upcoming,open,closed',
        ]);

        try {
            // PERBAIKAN: Kirim data yang sudah divalidasi ke service
            $this->kelasService->createSesiPembelajaran($kelas, $validatedData);

            return redirect()->route('dosen.kelas.show', $kelas->id)
                ->with('success', 'Sesi pembelajaran berhasil ditambahkan.');
        } catch (\Exception $e) {
            // Menangani error dari service
            return back()->withErrors(['error' => 'Gagal menambahkan sesi: ' . $e->getMessage()]);
        }
    }

    public function update(Request $request, Kelas $kelas)
    {
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'deskripsi' => 'nullable|string',
            'status' => 'required|in:active,inactive',
        ]);

        try {
            // PERBAIKAN: Panggil service menggunakan '$this', bukan '$kelas'
            $this->kelasService->updateKelas($kelas, $validatedData);

            // Redirect ke halaman daftar kelas (index) dengan pesan sukses
            return redirect()->route('dosen.kelas')->with('success', 'Kelas berhasil diperbarui.');

        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal memperbarui kelas: ' . $e->getMessage()]);
        }
    }

    public function updateSesi(Request $request, Kelas $kelas, SesiPembelajaran $sesi)
    {
        // 1. Validasi data yang masuk dari form React
        $validatedData = $request->validate([
            'topik' => 'required|string|max:255',
            'pertemuan_ke' => 'required|integer|min:1',
            'deskripsi' => 'nullable|string',
            'status' => 'required|in:upcoming,open,closed',
        ]);

        // 2. Panggil service untuk melakukan update
        try {
            $this->kelasService->updateSesi($sesi, $validatedData);
        } catch (\Exception $e) {
            return back()->withErrors(['error' => $e->getMessage()]);
        }

        // 3. Redirect kembali ke halaman detail kelas
        return redirect()->route('dosen.kelas.show', $kelas->id)->with('success', 'Sesi berhasil diperbarui.');
    }

    public function destroy(Kelas $kelas)
    {
        try {
            $kelas->delete();
            return redirect()->route('dosen.kelas')->with('success', 'Kelas berhasil dihapus.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menghapus kelas: ' . $e->getMessage()]);
        }
    }

    public function destroySesi(Kelas $kelas, SesiPembelajaran $sesi)
    {
        try {
            $sesi->delete();
            return redirect()->route('dosen.kelas.show', $kelas->id)->with('success', 'Sesi berhasil dihapus.');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Gagal menghapus sesi: ' . $e->getMessage()]);
        }
    }
    
    // public function join(Request $request)
    // {
    //     // 1. Validasi input dari frontend
    //     // Gunakan 'class_code' agar sesuai dengan form di React
    //     $request->validate([
    //         'class_code' => 'required|string|max:10',
    //     ]);

    //     // dd($request->all());

    //     try {
    //         // 2. Panggil service untuk menjalankan logika utama
    //         // Gunakan 'class_code' juga di sini
    //         $kelas = $this->kelasService->joinKelas($request->input('class_code'));

    //         // 3. Jika berhasil, redirect dengan pesan sukses
    //         return redirect()->route('mahasiswa.dashboard')->with('success', 'Berhasil bergabung ke kelas: ' . $kelas->nama);
    //     } catch (ValidationException $e) {
    //         // 4. Tangkap ValidationException secara spesifik
    //         // Exception ini akan otomatis me-redirect kembali dengan error
    //         // yang terikat pada field yang benar.
    //         throw $e;
    //     } catch (\Exception $e) {
    //         // 5. Tangkap error umum lainnya jika ada
    //         // Error ini akan muncul sebagai error global di frontend
    //         return back()->withErrors([
    //             'class_code' => 'Terjadi kesalahan tak terduga: ' . $e->getMessage()
    //         ]);
    //     }
    // }
}
