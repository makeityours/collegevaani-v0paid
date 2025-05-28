<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'id' => Str::uuid(),
            'name' => 'Admin User',
            'email' => 'admin@collegevaani.com',
            'password' => Hash::make('Admin@123'),
            'role' => 'admin',
            'is_verified' => true,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create a student user
        User::create([
            'id' => Str::uuid(),
            'name' => 'Student User',
            'email' => 'student@collegevaani.com',
            'password' => Hash::make('Student@123'),
            'role' => 'student',
            'is_verified' => true,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create a counselor user
        User::create([
            'id' => Str::uuid(),
            'name' => 'Counselor User',
            'email' => 'counselor@collegevaani.com',
            'password' => Hash::make('Counselor@123'),
            'role' => 'counselor',
            'is_verified' => true,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create a parent user
        User::create([
            'id' => Str::uuid(),
            'name' => 'Parent User',
            'email' => 'parent@collegevaani.com',
            'password' => Hash::make('Parent@123'),
            'role' => 'parent',
            'is_verified' => true,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create a college representative user
        User::create([
            'id' => Str::uuid(),
            'name' => 'College Rep',
            'email' => 'college_rep@collegevaani.com',
            'password' => Hash::make('CollegeRep@123'),
            'role' => 'college_rep',
            'is_verified' => true,
            'is_active' => true,
            'email_verified_at' => now(),
        ]);
    }
}
