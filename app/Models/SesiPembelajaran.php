<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SesiPembelajaran extends Model
{
    protected $table = 'sesi_pembelajaran';
    protected $guarded = [];

    public function kelas()
    {
        return $this->belongsTo(Kelas::class, 'kelas_id');
    }
}
