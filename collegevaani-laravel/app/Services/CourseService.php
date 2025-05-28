<?php

namespace App\Services;

use App\Models\College;
use App\Models\Course;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class CourseService
{
    /**
     * Get paginated list of courses with filters
     *
     * @param array $filters
     * @return LengthAwarePaginator
     */
    public function getCourses(array $filters = []): LengthAwarePaginator
    {
        $query = Course::query()->where('is_active', true);

        // Apply college filter
        if (!empty($filters['college_id'])) {
            $query->where('college_id', $filters['college_id']);
        }

        // Apply category filter
        if (!empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        // Apply degree filter
        if (!empty($filters['degree'])) {
            $query->where('degree', $filters['degree']);
        }

        // Apply search filter
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%");
            });
        }

        // Apply sorting
        $sortField = $filters['sort'] ?? 'name';
        $sortOrder = $filters['order'] ?? 'asc';

        // Special handling for JSON fields
        if ($sortField === 'fees') {
            $query->orderByRaw("JSON_EXTRACT(fees, '$.total') {$sortOrder}");
        } elseif ($sortField === 'duration') {
            $query->orderByRaw("JSON_EXTRACT(duration, '$.years') {$sortOrder}");
        } else {
            $query->orderBy($sortField, $sortOrder);
        }

        // Set pagination
        $perPage = $filters['per_page'] ?? 20;

        return $query->paginate($perPage);
    }

    /**
     * Get a course by its ID
     *
     * @param string $id
     * @return Course
     * @throws \Exception
     */
    public function getCourseById(string $id): Course
    {
        $course = Course::where('id', $id)
            ->where('is_active', true)
            ->first();

        if (!$course) {
            throw new \Exception('Course not found', 404);
        }

        return $course;
    }

    /**
     * Get a course by college slug and course slug
     *
     * @param string $collegeSlug
     * @param string $courseSlug
     * @return Course
     * @throws \Exception
     */
    public function getCourseBySlug(string $collegeSlug, string $courseSlug): Course
    {
        $college = College::where('slug', $collegeSlug)
            ->where('is_active', true)
            ->first();

        if (!$college) {
            throw new \Exception('College not found', 404);
        }

        $course = Course::where('college_id', $college->id)
            ->where('slug', $courseSlug)
            ->where('is_active', true)
            ->first();

        if (!$course) {
            throw new \Exception('Course not found', 404);
        }

        return $course;
    }

    /**
     * Create a new course
     *
     * @param array $data
     * @return Course
     * @throws \Exception
     */
    public function createCourse(array $data): Course
    {
        // Verify college exists
        $college = College::find($data['college_id']);
        if (!$college) {
            throw new \Exception('College not found', 404);
        }

        // Generate slug from name if not provided
        if (!isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        // Ensure JSON fields are properly formatted
        foreach (['duration', 'eligibility', 'curriculum', 'fees', 'seats'] as $jsonField) {
            if (isset($data[$jsonField]) && is_array($data[$jsonField])) {
                $data[$jsonField] = json_encode($data[$jsonField]);
            }
        }

        // Check for duplicate slug in the same college
        $existingCourse = Course::where('college_id', $data['college_id'])
            ->where('slug', $data['slug'])
            ->first();

        if ($existingCourse) {
            throw new \Exception('A course with this slug already exists for this college', 422);
        }

        return Course::create($data);
    }

    /**
     * Update an existing course
     *
     * @param string $id
     * @param array $data
     * @return Course
     * @throws \Exception
     */
    public function updateCourse(string $id, array $data): Course
    {
        $course = Course::find($id);

        if (!$course) {
            throw new \Exception('Course not found', 404);
        }

        // Generate slug from name if name is updated and slug isn't provided
        if (isset($data['name']) && !isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        // Ensure JSON fields are properly formatted
        foreach (['duration', 'eligibility', 'curriculum', 'fees', 'seats'] as $jsonField) {
            if (isset($data[$jsonField]) && is_array($data[$jsonField])) {
                $data[$jsonField] = json_encode($data[$jsonField]);
            }
        }

        // Check for duplicate slug if changed
        if (isset($data['slug']) && $data['slug'] !== $course->slug) {
            $collegeId = $data['college_id'] ?? $course->college_id;
            $existingCourse = Course::where('college_id', $collegeId)
                ->where('slug', $data['slug'])
                ->where('id', '!=', $id)
                ->first();

            if ($existingCourse) {
                throw new \Exception('A course with this slug already exists for this college', 422);
            }
        }

        $course->update($data);
        return $course->fresh();
    }

    /**
     * Delete a course
     *
     * @param string $id
     * @return bool
     * @throws \Exception
     */
    public function deleteCourse(string $id): bool
    {
        $course = Course::find($id);

        if (!$course) {
            throw new \Exception('Course not found', 404);
        }

        return $course->delete();
    }
} 