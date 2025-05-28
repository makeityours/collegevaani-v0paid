<?php

namespace Database\Seeders;

use App\Models\College;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CollegeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Sample colleges
        $colleges = [
            [
                'name' => 'Indian Institute of Technology, Delhi',
                'slug' => 'iit-delhi',
                'description' => 'IIT Delhi is one of the most prestigious engineering institutes in India.',
                'logo' => 'https://example.com/logos/iit-delhi.png',
                'type' => 'government',
                'category' => 'engineering',
                'location' => json_encode([
                    'address' => 'Hauz Khas',
                    'city' => 'New Delhi',
                    'state' => 'Delhi',
                    'country' => 'India',
                    'pincode' => '110016',
                ]),
                'contact' => json_encode([
                    'phone' => '+91-11-26591999',
                    'email' => 'info@iitd.ac.in',
                    'website' => 'https://home.iitd.ac.in/',
                ]),
                'is_verified' => true,
                'is_active' => true,
            ],
            [
                'name' => 'All India Institute of Medical Sciences, Delhi',
                'slug' => 'aiims-delhi',
                'description' => 'AIIMS Delhi is a premier medical institute in India.',
                'logo' => 'https://example.com/logos/aiims-delhi.png',
                'type' => 'government',
                'category' => 'medical',
                'location' => json_encode([
                    'address' => 'Ansari Nagar',
                    'city' => 'New Delhi',
                    'state' => 'Delhi',
                    'country' => 'India',
                    'pincode' => '110029',
                ]),
                'contact' => json_encode([
                    'phone' => '+91-11-26588500',
                    'email' => 'info@aiims.edu',
                    'website' => 'https://www.aiims.edu/',
                ]),
                'is_verified' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Indian Institute of Management, Ahmedabad',
                'slug' => 'iim-ahmedabad',
                'description' => 'IIM Ahmedabad is a premier management institute in India.',
                'logo' => 'https://example.com/logos/iim-ahmedabad.png',
                'type' => 'government',
                'category' => 'management',
                'location' => json_encode([
                    'address' => 'Vastrapur',
                    'city' => 'Ahmedabad',
                    'state' => 'Gujarat',
                    'country' => 'India',
                    'pincode' => '380015',
                ]),
                'contact' => json_encode([
                    'phone' => '+91-79-66324000',
                    'email' => 'info@iima.ac.in',
                    'website' => 'https://www.iima.ac.in/',
                ]),
                'is_verified' => true,
                'is_active' => true,
            ],
        ];

        foreach ($colleges as $college) {
            College::create(array_merge($college, [
                'id' => Str::uuid(),
                'images' => json_encode([]),
                'accreditation' => json_encode(['NAAC A++', 'UGC']),
                'rankings' => json_encode([
                    ['agency' => 'NIRF', 'rank' => 1, 'year' => 2023],
                ]),
                'facilities' => json_encode(['Library', 'Sports Complex', 'Hostel', 'Cafeteria']),
                'fees' => json_encode([
                    'tuition' => ['min' => 200000, 'max' => 500000, 'currency' => 'INR'],
                    'hostel' => ['min' => 50000, 'max' => 100000, 'currency' => 'INR'],
                ]),
                'admissions' => json_encode([
                    'process' => 'Entrance Exam followed by Counselling',
                    'eligibility' => ['12th with PCM', 'JEE Main', 'JEE Advanced'],
                    'exams' => ['JEE Main', 'JEE Advanced'],
                    'deadlines' => [
                        ['type' => 'Application', 'date' => '2023-12-31'],
                    ],
                ]),
                'stats' => json_encode([
                    'totalStudents' => 10000,
                    'facultyCount' => 500,
                    'placementRate' => 95,
                    'averagePackage' => 1500000,
                ]),
            ]));
        }
    }
}
