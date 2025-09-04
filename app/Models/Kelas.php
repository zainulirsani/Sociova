<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Kelas extends Model
{
    protected $guarded = [];
     public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'kelas_user', 'kelas_id', 'user_id');
    }

    public function sesiPembelajaran(): HasMany // <-- TAMBAHKAN METHOD INI
    {
        return $this->hasMany(SesiPembelajaran::class, 'kelas_id');
    }
}
