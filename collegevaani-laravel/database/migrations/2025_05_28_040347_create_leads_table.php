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
        Schema::create('leads', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('email');
            $table->string('phone', 20);
            $table->string('course');
            $table->string('location')->nullable();
            $table->string('budget')->nullable();
            $table->string('timeline')->nullable();
            $table->string('source');
            $table->enum('status', ['new', 'contacted', 'qualified', 'converted', 'lost']);
            $table->integer('score')->default(0);
            $table->uuid('assigned_to')->nullable();
            $table->json('notes')->nullable();
            $table->timestamps();
            
            // Foreign key constraint
            $table->foreign('assigned_to')->references('id')->on('users')->onDelete('set null');
            
            // Indexes
            $table->index('email');
            $table->index('status');
            $table->index('assigned_to');
        });
        
        // Set default values for JSON columns using raw SQL because MySQL doesn't allow JSON default values in migrations
        DB::statement("ALTER TABLE leads MODIFY notes JSON NULL DEFAULT (JSON_ARRAY())");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
