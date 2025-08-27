<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();

            // Foreign Key ke tabel 'evalutions' (tugas "Jurnal Belajar Harian")
            // Kita sebutkan nama tabel 'evalutions' secara eksplisit karena ada typo di awal
            $table->foreignId('evaluation_id')->constrained('evalutions')->onDelete('cascade');

            // Foreign Key ke tabel 'users' (untuk siswa yang menulis)
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');

            // Di sinilah tulisan siswa disimpan. longText() bisa menampung teks sangat panjang.
            $table->longText('content');

            // timestamps() akan membuat created_at dan updated_at.
            // `created_at` bisa kita anggap sebagai waktu submit.
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submissions');
    }
};
