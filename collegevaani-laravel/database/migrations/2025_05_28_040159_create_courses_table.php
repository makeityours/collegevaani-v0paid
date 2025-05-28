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
        Schema::create('courses', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->uuid('college_id');
            $table->string('category');
            $table->enum('degree', ['diploma', 'undergraduate', 'postgraduate', 'doctoral']);
            $table->json('duration');
            $table->json('eligibility')->nullable();
            $table->json('curriculum')->nullable();
            $table->json('fees');
            $table->json('seats');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            // Foreign key constraint
            $table->foreign('college_id')->references('id')->on('colleges')->onDelete('cascade');
            
            // Unique constraint for college_id and slug
            $table->unique(['college_id', 'slug']);
            
            // Indexes
            $table->index('college_id');
            $table->index('degree');
            $table->index('category');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
