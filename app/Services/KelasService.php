<?php

namespace App\Services;

use Exception;

use App\Models\User;
use App\Models\Kelas;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\SesiPembelajaran;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Validation\ValidationException;

class KelasService
{
    public function getAllKelas()
    {
        // withCount('users') akan menambahkan kolom 'users_count'
        // pada setiap objek kelas yang dihasilkan.
        return Kelas::withCount('users')
            ->where('status', 'active')
            ->get();
    }

    public function createKelas(array $data): Kelas
    {
        try {
            // --- GENERATE KODE KELAS ---
            $words = explode(' ', $data['nama']);
            $acronym = '';
            foreach ($words as $word) {
                if (!empty($word)) {
                    $acronym .= strtoupper($word[0]);
                }
            }
            $randomNumber = random_int(1000, 9999);
            $generatedCode = $acronym . $randomNumber;

            // --- PERSIAPAN DATA UNTUK DISIMPAN ---

            // 2. Ambil nama user yang sedang login
            $namaDosen = Auth::user()->name;

            // 3. Gabungkan semua data menjadi satu array untuk disimpan
            $kelasData = [
                'nama' => $data['nama'],
                'kode' => $generatedCode,
                'deskripsi' => $data['deskripsi'],
                'nama_dosen' => $namaDosen,
                // Anda bisa menambahkan nilai default lainnya di sini jika perlu
                // 'status' => 'active',
            ];

            // 4. Simpan data ke database menggunakan array yang sudah disiapkan
            return Kelas::create($kelasData);
        } catch (Exception $e) {
            Log::error('Gagal membuat kelas baru di KelasService.', [
                'error_message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data_input' => $data
            ]);

            // Lempar kembali exception agar bisa ditangani oleh controller
            throw new Exception('Terjadi kesalahan server saat membuat kelas.');
        }
    }

    public function updateKelas(Kelas $kelas, array $data)
    {
        try {
            // Logika ini sudah benar
            $kelas->update($data);
            return $kelas;
        } catch (Exception $e) {
            Log::error('Gagal memperbarui kelas di KelasService.', [
                'error_message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'data_input' => $data,
                'kelas_id' => $kelas->id
            ]);

            throw new Exception('Terjadi kesalahan server saat memperbarui kelas.');
        }
    }

    public function createSesiPembelajaran(Kelas $kelas, array $data)
    {
        try {
            // Gunakan relasi untuk membuat sesi baru.
            // Eloquent akan otomatis mengisi 'kelas_id'.
            // Data yang diterima dari controller sudah divalidasi.
            return $kelas->sesiPembelajaran()->create($data);
        } catch (Exception $e) {
            Log::error('Gagal membuat sesi pembelajaran di KelasService.', [
                'error_message' => $e->getMessage(),
                'trace'         => $e->getTraceAsString(),
                'data_input'    => $data,
                'kelas_id'      => $kelas->id
            ]);

            // Lempar kembali exception agar bisa ditangani oleh controller
            throw new Exception('Terjadi kesalahan server saat membuat sesi pembelajaran.');
        }
    }

    public function updateSesi(SesiPembelajaran $sesi, array $data): SesiPembelajaran
    {
        try {
            $sesi->update($data);
            return $sesi;
        } catch (Exception $e) {
            Log::error('Gagal memperbarui sesi pembelajaran.', [
                'error_message' => $e->getMessage(),
                'sesi_id' => $sesi->id,
                'data_input' => $data
            ]);

            throw new Exception('Terjadi kesalahan server saat memperbarui sesi.');
        }
    }

    public function joinKelas(string $kodeKelas)
    {
        // 1. Query yang efisien
        $kelas = Kelas::where('kode', $kodeKelas)
            ->where('status', 'active')
            ->first();

        // 2. Validasi kelas
        if (!$kelas) {
            throw new Exception('Kode kelas tidak valid atau kelas ini sudah tidak aktif.');
        }

        /** @var \App\Models\User $user */ // <-- Type-hinting untuk Auth::user()
        $user = Auth::user();

        // 3. Cek duplikasi
        if ($user->kelas()->where('kelas_id', $kelas->id)->exists()) {
            throw new Exception('Anda sudah terdaftar di kelas ini.');
        }

        // 4. Attach relasi
        $user->kelas()->attach($kelas->id);

        return $kelas;
    }

    public function getKelasUser(): array
    {
        /** @var \App\Models\User|null $user */
        $user = Auth::user();

        // Jika user tidak login, kembalikan array kosong
        if (!$user) {
            return [
                'kelas' => new Collection(),
                'kelasCount' => 0
            ];
        }

        // 1. Ambil koleksi kelas milik user (hanya 1 query database)
        $daftarKelas = $user->kelas; // Mengakses relasi sebagai properti

        // 2. Hitung jumlah kelas dari koleksi yang sudah diambil (tanpa query baru)
        $jumlahKelas = $daftarKelas->count();

        // 3. Kembalikan data dalam format array
        return [
            'kelas' => $daftarKelas,
            'kelasCount' => $jumlahKelas
        ];
    }
}
