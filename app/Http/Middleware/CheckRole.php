<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     * @param  string  ...$roles // Menggunakan ...$roles agar bisa menerima banyak role
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        // 1. Periksa apakah pengguna sudah login
        if (!Auth::check()) {
            // Jika belum login, redirect ke halaman login
            return redirect('login');
        }

        // 2. Ambil data pengguna yang sedang login
        $user = Auth::user();

        // 3. Periksa apakah role pengguna ada di dalam daftar role yang diizinkan
        foreach ($roles as $role) {
            // Asumsi di tabel 'users' Anda ada kolom 'role'
            if ($user->role == $role) {
                // Jika role cocok, izinkan akses ke halaman berikutnya
                return $next($request);
            }
        }

        // 4. Jika tidak ada role yang cocok, tolak akses
        abort(403, 'ANDA TIDAK MEMILIKI AKSES.');
    }
}