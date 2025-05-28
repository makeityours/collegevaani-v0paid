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
        Schema::table('users', function (Blueprint $table) {
            // Drop the default id column (Laravel uses auto-increment integer by default)
            $table->dropColumn('id');
        });

        Schema::table('users', function (Blueprint $table) {
            // Add our UUID as primary key
            $table->uuid('id')->first()->primary();
            
            // Add the additional columns we need
            $table->enum('role', ['admin', 'student', 'counselor', 'parent', 'college_rep'])->after('password');
            $table->boolean('is_verified')->default(false)->after('role');
            $table->boolean('is_active')->default(true)->after('is_verified');
            $table->string('avatar')->nullable()->after('is_active');
            $table->json('preferences')->nullable()->after('avatar');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Drop our new columns
            $table->dropColumn([
                'role',
                'is_verified',
                'is_active',
                'avatar',
                'preferences',
            ]);
            
            // Drop the UUID primary key
            $table->dropPrimary('id');
            $table->dropColumn('id');
        });
        
        Schema::table('users', function (Blueprint $table) {
            // Add back the original Laravel auto-increment ID
            $table->id();
        });
    }
};
