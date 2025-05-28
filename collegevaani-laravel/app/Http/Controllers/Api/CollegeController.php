<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\College\CreateCollegeRequest;
use App\Http\Requests\Api\College\UpdateCollegeRequest;
use App\Http\Resources\CollegeResource;
use App\Http\Resources\CollegeCollection;
use App\Models\College;
use App\Services\CollegeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CollegeController extends Controller
{
    protected CollegeService $collegeService;

    /**
     * Create a new CollegeController instance.
     *
     * @param CollegeService $collegeService
     */
    public function __construct(CollegeService $collegeService)
    {
        $this->collegeService = $collegeService;
    }

    /**
     * Get a paginated list of colleges with optional filters
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'type' => 'sometimes|string|in:government,private,deemed,autonomous',
            'category' => 'sometimes|string',
            'location' => 'sometimes|string',
            'search' => 'sometimes|string|max:100',
            'sort' => 'sometimes|string|in:name,ranking,fees',
            'order' => 'sometimes|string|in:asc,desc',
            'per_page' => 'sometimes|integer|min:1|max:100',
        ]);

        $colleges = $this->collegeService->getColleges($filters);

        return response()->json([
            'success' => true,
            'data' => new CollegeCollection($colleges),
        ]);
    }

    /**
     * Get a specific college by slug
     *
     * @param string $slug
     * @return JsonResponse
     */
    public function show(string $slug): JsonResponse
    {
        try {
            $college = $this->collegeService->getCollegeBySlug($slug);
            return response()->json([
                'success' => true,
                'data' => new CollegeResource($college),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Compare multiple colleges
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function compare(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'slugs' => 'required|array|min:2|max:5',
            'slugs.*' => 'required|string|exists:colleges,slug',
        ]);

        $colleges = $this->collegeService->compareColleges($validated['slugs']);

        return response()->json([
            'success' => true,
            'data' => CollegeResource::collection($colleges),
        ]);
    }

    /**
     * Create a new college (admin only)
     *
     * @param CreateCollegeRequest $request
     * @return JsonResponse
     */
    public function store(CreateCollegeRequest $request): JsonResponse
    {
        try {
            $college = $this->collegeService->createCollege($request->validated());
            return response()->json([
                'success' => true,
                'message' => 'College created successfully',
                'data' => new CollegeResource($college),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update an existing college (admin only)
     *
     * @param UpdateCollegeRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(UpdateCollegeRequest $request, string $id): JsonResponse
    {
        try {
            $college = $this->collegeService->updateCollege($id, $request->validated());
            return response()->json([
                'success' => true,
                'message' => 'College updated successfully',
                'data' => new CollegeResource($college),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    /**
     * Delete a college (admin only)
     *
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $this->collegeService->deleteCollege($id);
            return response()->json([
                'success' => true,
                'message' => 'College deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }
} 