<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Call seeders in order of dependencies
        $this->call([
            UserSeeder::class,
            CollegeSeeder::class,
            CourseSeeder::class,
        ]);
    }
}
