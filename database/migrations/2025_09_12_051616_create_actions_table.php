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
        Schema::create('actions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('animal_id')->constrained()->onDelete('cascade');
            $table->foreignId('performed_by')->constrained('users')->onDelete('cascade');
            $table->string('type'); // Will store ActionType enum values
            $table->json('details'); // Stores type-specific data
            $table->timestamp('performed_at');
            $table->timestamps();
            
            // Index for performance when querying by animal and type
            $table->index(['animal_id', 'type']);
            $table->index(['animal_id', 'performed_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('actions');
    }
};
