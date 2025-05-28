<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Lead\CreateLeadRequest;
use App\Http\Requests\Api\Lead\UpdateLeadRequest;
use App\Http\Resources\LeadResource;
use App\Http\Resources\LeadCollection;
use App\Services\LeadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    protected LeadService $leadService;

    /**
     * Create a new LeadController instance.
     *
     * @param LeadService $leadService
     */
    public function __construct(LeadService $leadService)
    {
        $this->leadService = $leadService;
    }

    /**
     * Get all leads with optional filters (admin and counselor only)
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'status' => 'sometimes|string|in:new,contacted,qualified,converted,lost',
            'assigned_to' => 'sometimes|uuid|exists:users,id',
            'source' => 'sometimes|string',
            'search' => 'sometimes|string|max:100',
            'sort' => 'sometimes|string|in:created_at,score,name',
            'order' => 'sometimes|string|in:asc,desc',
            'per_page' => 'sometimes|integer|min:1|max:100',
        ]);

        $leads = $this->leadService->getAllLeads($filters);

        return response()->json([
            'success' => true,
            'data' => new LeadCollection($leads),
        ]);
    }

    /**
     * Get leads assigned to the authenticated user (counselor only)
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function myLeads(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'status' => 'sometimes|string|in:new,contacted,qualified,converted,lost',
            'source' => 'sometimes|string',
            'search' => 'sometimes|string|max:100',
            'sort' => 'sometimes|string|in:created_at,score,name',
            'order' => 'sometimes|string|in:asc,desc',
            'per_page' => 'sometimes|integer|min:1|max:100',
        ]);

        $leads = $this->leadService->getAssignedLeads(auth()->id(), $filters);

        return response()->json([
            'success' => true,
            'data' => new LeadCollection($leads),
        ]);
    }

    /**
     * Get a specific lead by ID
     *
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        try {
            $lead = $this->leadService->getLeadById($id);
            return response()->json([
                'success' => true,
                'data' => new LeadResource($lead),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Create a new lead
     *
     * @param CreateLeadRequest $request
     * @return JsonResponse
     */
    public function store(CreateLeadRequest $request): JsonResponse
    {
        try {
            $lead = $this->leadService->createLead($request->validated());
            
            return response()->json([
                'success' => true,
                'message' => 'Lead created successfully',
                'data' => new LeadResource($lead),
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update an existing lead (admin and counselor only)
     *
     * @param UpdateLeadRequest $request
     * @param string $id
     * @return JsonResponse
     */
    public function update(UpdateLeadRequest $request, string $id): JsonResponse
    {
        try {
            $lead = $this->leadService->updateLead($id, $request->validated());
            
            return response()->json([
                'success' => true,
                'message' => 'Lead updated successfully',
                'data' => new LeadResource($lead),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    /**
     * Add a note to a lead (admin and counselor only)
     *
     * @param Request $request
     * @param string $id
     * @return JsonResponse
     */
    public function addNote(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'note' => 'required|string|max:1000',
        ]);

        try {
            $lead = $this->leadService->addNote($id, $validated['note'], auth()->id());
            
            return response()->json([
                'success' => true,
                'message' => 'Note added successfully',
                'data' => new LeadResource($lead),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    /**
     * Update lead status (admin and counselor only)
     *
     * @param Request $request
     * @param string $id
     * @return JsonResponse
     */
    public function updateStatus(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'status' => 'required|string|in:new,contacted,qualified,converted,lost',
            'note' => 'sometimes|string|max:1000',
        ]);

        try {
            $lead = $this->leadService->updateStatus(
                $id, 
                $validated['status'], 
                $validated['note'] ?? null,
                auth()->id()
            );
            
            return response()->json([
                'success' => true,
                'message' => 'Lead status updated successfully',
                'data' => new LeadResource($lead),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    /**
     * Assign a lead to a counselor (admin only)
     *
     * @param Request $request
     * @param string $id
     * @return JsonResponse
     */
    public function assign(Request $request, string $id): JsonResponse
    {
        $validated = $request->validate([
            'counselor_id' => 'required|uuid|exists:users,id',
            'note' => 'sometimes|string|max:1000',
        ]);

        try {
            $lead = $this->leadService->assignLead(
                $id, 
                $validated['counselor_id'], 
                $validated['note'] ?? null,
                auth()->id()
            );
            
            return response()->json([
                'success' => true,
                'message' => 'Lead assigned successfully',
                'data' => new LeadResource($lead),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }

    /**
     * Delete a lead (admin only)
     *
     * @param string $id
     * @return JsonResponse
     */
    public function destroy(string $id): JsonResponse
    {
        try {
            $this->leadService->deleteLead($id);
            
            return response()->json([
                'success' => true,
                'message' => 'Lead deleted successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], $e->getCode() ?: 500);
        }
    }
} 