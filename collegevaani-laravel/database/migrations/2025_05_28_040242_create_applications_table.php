<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('applications', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->uuid('college_id');
            $table->uuid('course_id');
            $table->enum('status', ['draft', 'submitted', 'under_review', 'accepted', 'rejected', 'waitlisted']);
            $table->json('documents')->nullable();
            $table->json('personal_info');
            $table->timestamp('submitted_at')->nullable();
            $table->timestamp('reviewed_at')->nullable();
            $table->timestamps();
            
            // Foreign key constraints
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('college_id')->references('id')->on('colleges')->onDelete('cascade');
            $table->foreign('course_id')->references('id')->on('courses')->onDelete('cascade');
            
            // Indexes
            $table->index('user_id');
            $table->index('college_id');
            $table->index('course_id');
            $table->index('status');
        });
        
        // Set default values for JSON columns using raw SQL because MySQL doesn't allow JSON default values in migrations
        DB::statement("ALTER TABLE applications MODIFY documents JSON NULL DEFAULT (JSON_ARRAY())");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('applications');
    }
};
