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
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->string('session_title');
            $table->string('meeting_id')->default(uniqid());
            $table->string('meeting_password')->default(uniqid());
            $table->string('language1_id', 2);
            $table->string('language2_id', 2);
            $table->foreign('language1_id')->references('code')->on('languages');
            $table->foreign('language2_id')->references('code')->on('languages');
            $table->text('description')->nullable();
            $table->string('cover_photo');
            $table->string('level');
            $table->dateTime('date');
            $table->integer('duration'); // in minutes
            $table->integer('max_attendees');
            $table->foreignId('host_id')->constrained('users');
            $table->text('preparation')->nullable();
            $table->foreignId('material_id')->nullable()->constrained('materials');
            $table->integer('status')->default(0); // 0: pending, 1: active, 2: finished
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
