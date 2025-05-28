<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Course\CreateCourseRequest;
use App\Http\Requests\Api\Course\UpdateCourseRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\CourseCollection;
use App\Services\CourseService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    protected CourseService $courseService;

    /**
     * Create a new CourseController instance.
     *
     * @param CourseService $courseService
     */
    public function __construct(CourseService $courseService)
    {
        $this->courseService = $courseService;
    }

    /**
     * Get a paginated list of courses with optional filters
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'college_id' => 'sometimes|uuid',
            'category' => 'sometimes|string',
            'degree' => 'sometimes|string|in:diploma,undergraduate,postgraduate,doctoral',
            'search' => 'sometimes|string|max:100',
            'sort' => 'sometimes|string|in:name,fees,duration',
            'order' => 'sometimes|string|in:asc,desc',
            'per_page' => 'sometimes|integer|min:1|max:100',
        ]);

        $courses = $this->courseService->getCourses($filters);

        return response()->json([
            'success' => true,
            'data' => new CourseCollection($courses),
        ]);
    }

    /**
     * Get courses for a specific college
     *
     * @param Request $request
     * @param string $collegeId
     * @return JsonResponse
     */
    public function getByCollege(Request $request, string $collegeId): JsonResponse
    {
        $filters = $request->validate([
            'category' => 'sometimes|string',
            'degree' => 'sometimes|string|in:diploma,undergraduate,postgraduate,doctoral',
            'search' => 'sometimes|string|max:100',
            'sort' => 'sometimes|string|in:name,fees,duration',
            'order' => 'sometimes|string|in:asc,desc',
            'per_page' => 'sometimes|integer|min:1|max:100',
        ]);

        // Add college_id to filters
        $filters['college_id'] = $collegeId;

        $courses = $this->courseService->getCourses($filters);

        return response()->json([
            'success' => true,
            'data' => new CourseCollection($courses),
        ]);
    }

    /**
     * Get a specific course by ID
     *
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        try {
            $course = $this->courseService->getCourseById($id);
            return response()->json([
                'success' => true,
                'data' => new CourseResource($course),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Get a specific course by college slug and course slug
     *
     * @param string $collegeSlug
     * @param string $courseSlug
     * @return JsonResponse
     */
    public function showBySlug(string $collegeSlug, string $courseSlug): JsonResponse
    {
        try {
            $course = $this->courseService->getCourseBySlug($collegeSlug, $courseSlug);
            return response()->json([
                'success' => true,
                'data' => new CourseResource($course),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Create a new course (admin only)
     *
     * @param CreateCourseRequest $request
     * @return JsonResponse
     */
    public function store(CreateCourseRequest $request): JsonResponse
    {
        try {
            $course = $this->courseService->createCourse($request->validated());
            return response()->json([
                'success' => true,
                'message' => 'Course created successfully',
                'data' => new CourseResource($course),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update an existing course (admin only)
     *
     * @param UpdateCourseRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(UpdateCourseRequest $request, string $id): JsonResponse
    {
        try {
            $course = $this->courseService->updateCourse($id, $request->validated());
            return response()->json([
                'success' => true,
                'message' => 'Course updated successfully',
                'data' => new CourseResource($course),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    /**
     * Delete a course (admin only)
     *
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $this->courseService->deleteCourse($id);
            return response()->json([
                'success' => true,
                'message' => 'Course deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }
} 