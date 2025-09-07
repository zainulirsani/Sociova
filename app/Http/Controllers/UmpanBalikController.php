<?php

namespace App\Http\Controllers;

use App\Models\UmpanBalik;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UmpanBalikController extends Controller
{
    /**
     * Menampilkan halaman form umpan balik.
     */
    public function create()
    {
        return Inertia::render('UmpanBalik/Create');
    }

    /**
     * Menyimpan umpan balik baru dari pengguna.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'komentar' => 'nullable|string|max:1000',
        ]);

        UmpanBalik::create([
            'user_id' => Auth::id(),
            'rating' => $validatedData['rating'],
            'komentar' => $validatedData['komentar'],
        ]);

        // Redirect kembali ke halaman sebelumnya dengan pesan sukses
        return back()->with('success', 'Terima kasih! Umpan balik Anda telah kami terima.');
    }
}