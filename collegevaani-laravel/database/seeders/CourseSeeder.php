<?php

namespace Database\Seeders;

use App\Models\College;
use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get all colleges
        $colleges = College::all();

        // Sample courses for IIT Delhi
        $iitDelhiCourses = [
            [
                'name' => 'B.Tech in Computer Science',
                'slug' => 'btech-cs',
                'description' => 'Bachelor of Technology in Computer Science and Engineering',
                'category' => 'engineering',
                'degree' => 'undergraduate',
            ],
            [
                'name' => 'B.Tech in Electrical Engineering',
                'slug' => 'btech-ee',
                'description' => 'Bachelor of Technology in Electrical Engineering',
                'category' => 'engineering',
                'degree' => 'undergraduate',
            ],
            [
                'name' => 'M.Tech in Computer Science',
                'slug' => 'mtech-cs',
                'description' => 'Master of Technology in Computer Science and Engineering',
                'category' => 'engineering',
                'degree' => 'postgraduate',
            ],
        ];

        // Sample courses for AIIMS Delhi
        $aiimsDelhiCourses = [
            [
                'name' => 'MBBS',
                'slug' => 'mbbs',
                'description' => 'Bachelor of Medicine and Bachelor of Surgery',
                'category' => 'medical',
                'degree' => 'undergraduate',
            ],
            [
                'name' => 'MD in General Medicine',
                'slug' => 'md-general-medicine',
                'description' => 'Doctor of Medicine in General Medicine',
                'category' => 'medical',
                'degree' => 'postgraduate',
            ],
        ];

        // Sample courses for IIM Ahmedabad
        $iimAhmedabadCourses = [
            [
                'name' => 'MBA',
                'slug' => 'mba',
                'description' => 'Master of Business Administration',
                'category' => 'management',
                'degree' => 'postgraduate',
            ],
            [
                'name' => 'Executive MBA',
                'slug' => 'executive-mba',
                'description' => 'Executive Master of Business Administration for working professionals',
                'category' => 'management',
                'degree' => 'postgraduate',
            ],
        ];

        // Map course lists to college slugs
        $coursesByCollege = [
            'iit-delhi' => $iitDelhiCourses,
            'aiims-delhi' => $aiimsDelhiCourses,
            'iim-ahmedabad' => $iimAhmedabadCourses,
        ];

        // Create courses for each college
        foreach ($colleges as $college) {
            $courses = $coursesByCollege[$college->slug] ?? [];
            
            foreach ($courses as $course) {
                Course::create(array_merge($course, [
                    'id' => Str::uuid(),
                    'college_id' => $college->id,
                    'duration' => json_encode([
                        'years' => 4,
                        'semesters' => 8,
                    ]),
                    'eligibility' => json_encode([
                        '12th with PCM with minimum 75% marks',
                        'JEE Main and Advanced qualification',
                    ]),
                    'curriculum' => json_encode([
                        'Semester 1' => ['Introduction to Programming', 'Digital Logic', 'Mathematics I'],
                        'Semester 2' => ['Data Structures', 'Computer Architecture', 'Mathematics II'],
                    ]),
                    'fees' => json_encode([
                        'tuition' => 200000,
                        'hostel' => 50000,
                        'other' => 20000,
                        'total' => 270000,
                        'currency' => 'INR',
                    ]),
                    'seats' => json_encode([
                        'total' => 120,
                        'general' => 60,
                        'sc' => 20,
                        'st' => 10,
                        'obc' => 30,
                    ]),
                    'is_active' => true,
                ]));
            }
        }
    }
}
