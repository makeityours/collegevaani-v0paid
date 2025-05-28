<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Application\CreateApplicationRequest;
use App\Http\Requests\Api\Application\UpdateApplicationRequest;
use App\Http\Resources\ApplicationResource;
use App\Http\Resources\ApplicationCollection;
use App\Services\ApplicationService;
use App\Traits\ApiResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApplicationController extends Controller
{
    use ApiResponses;
    
    protected ApplicationService $applicationService;

    /**
     * Create a new ApplicationController instance.
     *
     * @param ApplicationService $applicationService
     */
    public function __construct(ApplicationService $applicationService)
    {
        $this->applicationService = $applicationService;
    }

    /**
     * Get applications for the authenticated user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $filters = $request->validate([
                'status' => 'sometimes|string|in:draft,submitted,under_review,accepted,rejected,waitlisted',
                'college_id' => 'sometimes|uuid',
                'course_id' => 'sometimes|uuid',
                'sort' => 'sometimes|string|in:created_at,updated_at,submitted_at',
                'order' => 'sometimes|string|in:asc,desc',
                'per_page' => 'sometimes|integer|min:1|max:100',
            ]);

            $applications = $this->applicationService->getUserApplications(
                auth()->id(),
                $filters
            );

            return $this->successResponse(new ApplicationCollection($applications));
        } catch (\Throwable $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Get all applications (admin and counselor only)
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getAllApplications(Request $request): JsonResponse
    {
        try {
            $filters = $request->validate([
                'status' => 'sometimes|string|in:draft,submitted,under_review,accepted,rejected,waitlisted',
                'college_id' => 'sometimes|uuid',
                'course_id' => 'sometimes|uuid',
                'user_id' => 'sometimes|uuid',
                'sort' => 'sometimes|string|in:created_at,updated_at,submitted_at',
                'order' => 'sometimes|string|in:asc,desc',
                'per_page' => 'sometimes|integer|min:1|max:100',
            ]);

            $applications = $this->applicationService->getAllApplications($filters);

            return $this->successResponse(new ApplicationCollection($applications));
        } catch (\Throwable $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Get a specific application
     *
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        try {
            $application = $this->applicationService->getApplicationById($id, auth()->id());
            return $this->successResponse(new ApplicationResource($application));
        } catch (\Throwable $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Create a new application
     *
     * @param CreateApplicationRequest $request
     * @return JsonResponse
     */
    public function store(CreateApplicationRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $data['user_id'] = auth()->id();
            
            $application = $this->applicationService->createApplication($data);
            
            return $this->successResponse(
                new ApplicationResource($application),
                'Application created successfully',
                201
            );
        } catch (\Throwable $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Update an existing application
     *
     * @param UpdateApplicationRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(UpdateApplicationRequest $request, string $id): JsonResponse
    {
        try {
            $application = $this->applicationService->updateApplication(
                $id,
                auth()->id(),
                $request->validated()
            );
            
            return $this->successResponse(
                new ApplicationResource($application),
                'Application updated successfully'
            );
        } catch (\Throwable $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Submit an application
     *
     * @param string $id
     * @return JsonResponse
     */
    public function submit(string $id): JsonResponse
    {
        try {
            $application = $this->applicationService->submitApplication($id, auth()->id());
            
            return $this->successResponse(
                new ApplicationResource($application),
                'Application submitted successfully'
            );
        } catch (\Throwable $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Update application status (admin and counselor only)
     *
     * @param Request $request
     * @param string $id
     * @return JsonResponse
     */
    public function updateStatus(Request $request, string $id): JsonResponse
    {
        try {
            $validated = $request->validate([
                'status' => 'required|string|in:under_review,accepted,rejected,waitlisted',
                'notes' => 'sometimes|string',
            ]);

            $application = $this->applicationService->updateApplicationStatus(
                $id,
                $validated['status'],
                $validated['notes'] ?? null
            );
            
            return $this->successResponse(
                new ApplicationResource($application),
                'Application status updated successfully'
            );
        } catch (\Throwable $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Delete an application
     *
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $this->applicationService->deleteApplication($id, auth()->id());
            
            return $this->successResponse(
                null,
                'Application deleted successfully'
            );
        } catch (\Throwable $e) {
            return $this->handleException($e);
        }
    }
} 