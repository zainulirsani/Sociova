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
        Schema::table('submissions', function (Blueprint $table) {
            // PERBAIKAN: Hapus foreign key berdasarkan nama kolomnya.
            $table->dropForeign(['evaluation_id']);
            
            // Hapus kolom lama
            $table->dropColumn('evaluation_id');

            // Tambahkan kolom dan constraint yang baru
            $table->foreignId('sesi_pembelajaran_id')->after('id')->constrained('sesi_pembelajaran')->onDelete('cascade');
        });

        // Hapus tabel 'evalutions' setelah relasinya diputus
        Schema::dropIfExists('evalutions');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Buat kembali tabel 'evalutions' terlebih dahulu
        Schema::create('evalutions', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->timestamps();
        });
        
        // Kembalikan skema 'submissions' seperti semula
        Schema::table('submissions', function (Blueprint $table) {
            $table->dropForeign(['sesi_pembelajaran_id']);
            $table->dropColumn('sesi_pembelajaran_id');
            $table->foreignId('evaluation_id')->after('id')->constrained('evalutions')->onDelete('cascade');
        });
    }
};