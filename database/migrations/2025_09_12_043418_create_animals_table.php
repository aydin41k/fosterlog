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
        Schema::create('animals', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->enum('species', ['cat', 'dog', 'other'])->default('cat');
            $table->date('dob')->nullable();
            $table->enum('sex', ['male', 'female', 'unknown'])->default('unknown');
            $table->text('medical_conditions')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['in_foster', 'available', 'adopted'])->default('in_foster');
            $table->string('slug')->unique();
            $table->foreignId('foster_carer_id')->nullable()->constrained('users')->onDelete('set null');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animals');
    }
};
