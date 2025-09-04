<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Evalution extends Model
{
    protected $table = 'evalutions';
    protected $guarded = [];

    /**
     * Mendapatkan data submission yang dievaluasi.
     * Evalution dimiliki oleh (belongs to) satu Submission.
     */
    public function submission(): BelongsTo
    {
        return $this->belongsTo(Submission::class);
    }
}