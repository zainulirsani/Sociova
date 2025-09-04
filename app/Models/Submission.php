<?php

namespace App\Models;

use App\Models\SesiPembelajaran;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Submission extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'submissions';

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * Mendapatkan data user yang membuat submission ini.
     * Submission dimiliki oleh (belongs to) satu User.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Mendapatkan data hasil analisis AI untuk submission ini.
     * Submission memiliki satu (has one) Analysis.
     */
    public function analysis(): HasOne
    {
        return $this->hasOne(Analysis::class);
    }

    /**
     * Mendapatkan semua data evaluasi yang terkait dengan submission ini.
     * Submission memiliki banyak (has many) Evaluations.
     *
     * Catatan: Model Anda bernama 'Evalution', idealnya diganti menjadi 'Evaluation'.
     * Jika nama model tetap 'Evalution', relasi ini sudah benar.
     */
    public function evaluations(): HasMany
    {
        return $this->hasMany(Evalution::class);
    }

    public function sesiPembelajaran(): BelongsTo // <-- 2. Tambahkan method ini
    {
        // Parameter kedua ('sesi_pembelajaran_id') adalah nama foreign key di tabel 'submissions'
        return $this->belongsTo(SesiPembelajaran::class, 'sesi_pembelajaran_id');
    }
}