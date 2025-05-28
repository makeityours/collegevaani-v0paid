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
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('user_id');
            $table->enum('plan', ['free', 'premium', 'pro', 'enterprise']);
            $table->enum('status', ['active', 'cancelled', 'expired', 'trial']);
            $table->enum('billing_cycle', ['monthly', 'yearly']);
            $table->decimal('amount', 10, 2);
            $table->string('currency', 10)->default('INR');
            $table->timestamp('start_date');
            $table->timestamp('end_date');
            $table->boolean('auto_renew')->default(true);
            $table->json('features')->nullable();
            $table->timestamps();
            
            // Foreign key constraint
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            
            // Indexes
            $table->index('user_id');
            $table->index('status');
        });
        
        // Set default values for JSON columns using raw SQL because MySQL doesn't allow JSON default values in migrations
        DB::statement("ALTER TABLE subscriptions MODIFY features JSON NULL DEFAULT (JSON_ARRAY())");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
