<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Analysis extends Model
{
    protected $table = 'analyses';
    protected $guarded = [];

    /**
     * Mendapatkan data submission yang dianalisis.
     * Analysis dimiliki oleh (belongs to) satu Submission.
     */

   protected $casts = [
        'feedback_points' => 'array', // <-- TAMBAHKAN BARIS INI
    ];

    public function submission(): BelongsTo
    {
        return $this->belongsTo(Submission::class);
    }
}