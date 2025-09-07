<?php

namespace App\Services;

use App\Models\UmpanBalik;
use Illuminate\Database\Eloquent\Collection;

class UmpanBalikService
{
    /**
     * Mengambil beberapa umpan balik terbaik untuk ditampilkan sebagai testimoni.
     */
    public function getFeaturedFeedback(): Collection
    {
        return UmpanBalik::with('user') // Ambil juga data user (nama, peran, dll.)
            ->whereNotNull('komentar') // Hanya ambil yang ada komentarnya
            ->where('rating', '>=', 4) // Hanya ambil yang ratingnya 4 atau 5
            ->latest() // Urutkan dari yang terbaru
            ->take(3) // Batasi hanya 3 testimoni
            ->get();
    }
}