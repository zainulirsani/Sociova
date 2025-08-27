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
        Schema::create('analyses', function (Blueprint $table) {
            $table->id();

            // Foreign Key ke tabel 'submissions'. Ini link paling penting.
            // onDelete('cascade') berarti jika submission dihapus, analisisnya juga ikut terhapus.
            $table->foreignId('submission_id')->constrained('submissions')->onDelete('cascade');

            // Status proses analisis: 'pending', 'completed', 'failed'
            $table->string('status')->default('pending');

            // Untuk menyimpan respons mentah dari Gemini, berguna untuk logging/debug
            $table->longText('raw_response')->nullable();

            // Ringkasan analisis yang sudah diproses
            $table->text('summary')->nullable();

            // Usulan skor dari AI
            $table->unsignedInteger('suggested_score')->nullable();

            // Poin-poin feedback dalam format JSON
            $table->json('feedback_points')->nullable();

            // Untuk menyimpan pesan error jika analisis gagal
            $table->text('error_message')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('analyses');
    }
};
