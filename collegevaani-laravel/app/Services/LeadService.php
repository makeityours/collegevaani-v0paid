<?php

namespace App\Services;

use App\Models\Lead;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;

class LeadService
{
    /**
     * Get all leads with optional filters (admin and counselor only)
     *
     * @param array $filters
     * @return LengthAwarePaginator
     * @throws \Exception
     */
    public function getAllLeads(array $filters = []): LengthAwarePaginator
    {
        // Only admin and counselors can view all leads
        $user = Auth::user();
        if (!$user || !in_array($user->role, ['admin', 'counselor'])) {
            throw new \Exception('Unauthorized access', 403);
        }
        
        $query = Lead::query();
        
        // Filter by assigned_to if provided
        if (!empty($filters['assigned_to'])) {
            $query->where('assigned_to', $filters['assigned_to']);
        }
        
        return $this->applyFilters($query, $filters);
    }
    
    /**
     * Get leads assigned to a specific counselor
     *
     * @param string $userId
     * @param array $filters
     * @return LengthAwarePaginator
     * @throws \Exception
     */
    public function getAssignedLeads(string $userId, array $filters = []): LengthAwarePaginator
    {
        // Only counselors can access their assigned leads
        $user = User::find($userId);
        if (!$user || $user->role !== 'counselor') {
            throw new \Exception('Unauthorized access', 403);
        }
        
        $query = Lead::where('assigned_to', $userId);
        
        return $this->applyFilters($query, $filters);
    }
    
    /**
     * Apply common filters to lead queries
     *
     * @param Builder $query
     * @param array $filters
     * @return LengthAwarePaginator
     */
    private function applyFilters(Builder $query, array $filters): LengthAwarePaginator
    {
        // Apply status filter
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        
        // Apply source filter
        if (!empty($filters['source'])) {
            $query->where('source', $filters['source']);
        }
        
        // Apply search filter
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('email', 'LIKE', "%{$search}%")
                    ->orWhere('phone', 'LIKE', "%{$search}%")
                    ->orWhere('course', 'LIKE', "%{$search}%");
            });
        }
        
        // Apply sorting
        $sortField = $filters['sort'] ?? 'created_at';
        $sortOrder = $filters['order'] ?? 'desc';
        $query->orderBy($sortField, $sortOrder);
        
        // Set pagination
        $perPage = $filters['per_page'] ?? 20;
        
        return $query->paginate($perPage);
    }
    
    /**
     * Get a specific lead by ID
     *
     * @param string $id
     * @return Lead
     * @throws \Exception
     */
    public function getLeadById(string $id): Lead
    {
        // Only admin and counselors can view leads
        $user = Auth::user();
        if (!$user || !in_array($user->role, ['admin', 'counselor'])) {
            throw new \Exception('Unauthorized access', 403);
        }
        
        $lead = Lead::find($id);
        
        if (!$lead) {
            throw new \Exception('Lead not found', 404);
        }
        
        // Counselors can only view leads assigned to them
        if ($user->role === 'counselor' && $lead->assigned_to !== $user->id) {
            throw new \Exception('Unauthorized access to this lead', 403);
        }
        
        return $lead;
    }
    
    /**
     * Create a new lead
     *
     * @param array $data
     * @return Lead
     */
    public function createLead(array $data): Lead
    {
        // Set default values
        $data['status'] = $data['status'] ?? 'new';
        $data['score'] = $data['score'] ?? $this->calculateLeadScore($data);
        
        // Format notes field
        if (isset($data['notes']) && is_array($data['notes'])) {
            $data['notes'] = json_encode($data['notes']);
        } elseif (!isset($data['notes'])) {
            $data['notes'] = json_encode([]);
        }
        
        return Lead::create($data);
    }
    
    /**
     * Update an existing lead
     *
     * @param string $id
     * @param array $data
     * @return Lead
     * @throws \Exception
     */
    public function updateLead(string $id, array $data): Lead
    {
        // Only admin and counselors can update leads
        $user = Auth::user();
        if (!$user || !in_array($user->role, ['admin', 'counselor'])) {
            throw new \Exception('Unauthorized access', 403);
        }
        
        $lead = Lead::find($id);
        
        if (!$lead) {
            throw new \Exception('Lead not found', 404);
        }
        
        // Counselors can only update leads assigned to them
        if ($user->role === 'counselor' && $lead->assigned_to !== $user->id) {
            throw new \Exception('Unauthorized access to this lead', 403);
        }
        
        // Format notes field if provided
        if (isset($data['notes']) && is_array($data['notes'])) {
            $data['notes'] = json_encode($data['notes']);
        }
        
        // Recalculate score if relevant fields changed
        $scoreFields = ['course', 'budget', 'timeline'];
        $shouldRecalculateScore = false;
        
        foreach ($scoreFields as $field) {
            if (isset($data[$field]) && $data[$field] !== $lead->$field) {
                $shouldRecalculateScore = true;
                break;
            }
        }
        
        if ($shouldRecalculateScore) {
            $mergedData = array_merge($lead->toArray(), $data);
            $data['score'] = $this->calculateLeadScore($mergedData);
        }
        
        $lead->update($data);
        return $lead->fresh();
    }
    
    /**
     * Add a note to a lead
     *
     * @param string $id
     * @param string $note
     * @param string $userId
     * @return Lead
     * @throws \Exception
     */
    public function addNote(string $id, string $note, string $userId): Lead
    {
        // Only admin and counselors can add notes
        $user = User::find($userId);
        if (!$user || !in_array($user->role, ['admin', 'counselor'])) {
            throw new \Exception('Unauthorized access', 403);
        }
        
        $lead = Lead::find($id);
        
        if (!$lead) {
            throw new \Exception('Lead not found', 404);
        }
        
        // Counselors can only add notes to leads assigned to them
        if ($user->role === 'counselor' && $lead->assigned_to !== $user->id) {
            throw new \Exception('Unauthorized access to this lead', 403);
        }
        
        // Add the new note
        $notes = json_decode($lead->notes, true) ?: [];
        $notes[] = [
            'text' => $note,
            'user_id' => $userId,
            'user_name' => $user->name,
            'timestamp' => now()->toIso8601String(),
        ];
        
        $lead->notes = json_encode($notes);
        $lead->save();
        
        return $lead->fresh();
    }
    
    /**
     * Update lead status
     *
     * @param string $id
     * @param string $status
     * @param string|null $note
     * @param string $userId
     * @return Lead
     * @throws \Exception
     */
    public function updateStatus(string $id, string $status, ?string $note, string $userId): Lead
    {
        // Only admin and counselors can update lead status
        $user = User::find($userId);
        if (!$user || !in_array($user->role, ['admin', 'counselor'])) {
            throw new \Exception('Unauthorized access', 403);
        }
        
        $lead = Lead::find($id);
        
        if (!$lead) {
            throw new \Exception('Lead not found', 404);
        }
        
        // Counselors can only update status of leads assigned to them
        if ($user->role === 'counselor' && $lead->assigned_to !== $user->id) {
            throw new \Exception('Unauthorized access to this lead', 403);
        }
        
        // Update the status
        $lead->status = $status;
        
        // Add status change note if provided
        if ($note) {
            $notes = json_decode($lead->notes, true) ?: [];
            $notes[] = [
                'text' => "Status changed to {$status}: {$note}",
                'user_id' => $userId,
                'user_name' => $user->name,
                'timestamp' => now()->toIso8601String(),
            ];
            
            $lead->notes = json_encode($notes);
        }
        
        $lead->save();
        
        return $lead->fresh();
    }
    
    /**
     * Assign a lead to a counselor
     *
     * @param string $id
     * @param string $counselorId
     * @param string|null $note
     * @param string $userId
     * @return Lead
     * @throws \Exception
     */
    public function assignLead(string $id, string $counselorId, ?string $note, string $userId): Lead
    {
        // Only admin can assign leads
        $user = User::find($userId);
        if (!$user || $user->role !== 'admin') {
            throw new \Exception('Unauthorized access', 403);
        }
        
        $lead = Lead::find($id);
        
        if (!$lead) {
            throw new \Exception('Lead not found', 404);
        }
        
        // Verify counselor exists and has the counselor role
        $counselor = User::find($counselorId);
        if (!$counselor || $counselor->role !== 'counselor') {
            throw new \Exception('Invalid counselor', 422);
        }
        
        // Update the assigned_to field
        $lead->assigned_to = $counselorId;
        
        // Add assignment note if provided
        if ($note || $lead->assigned_to !== $counselorId) {
            $notes = json_decode($lead->notes, true) ?: [];
            $notes[] = [
                'text' => $note ?: "Assigned to counselor: {$counselor->name}",
                'user_id' => $userId,
                'user_name' => $user->name,
                'timestamp' => now()->toIso8601String(),
            ];
            
            $lead->notes = json_encode($notes);
        }
        
        $lead->save();
        
        // TODO: Send notification to the counselor
        
        return $lead->fresh();
    }
    
    /**
     * Delete a lead
     *
     * @param string $id
     * @return bool
     * @throws \Exception
     */
    public function deleteLead(string $id): bool
    {
        // Only admin can delete leads
        $user = Auth::user();
        if (!$user || $user->role !== 'admin') {
            throw new \Exception('Unauthorized access', 403);
        }
        
        $lead = Lead::find($id);
        
        if (!$lead) {
            throw new \Exception('Lead not found', 404);
        }
        
        return $lead->delete();
    }
    
    /**
     * Calculate a score for the lead based on its details
     *
     * @param array $data
     * @return int
     */
    private function calculateLeadScore(array $data): int
    {
        $score = 0;
        
        // Score based on course
        if (!empty($data['course'])) {
            // Higher scores for professional or high-value courses
            $highValueCourses = ['B.Tech', 'MBA', 'MBBS', 'MS', 'Engineering', 'Medical'];
            foreach ($highValueCourses as $course) {
                if (stripos($data['course'], $course) !== false) {
                    $score += 10;
                    break;
                }
            }
        }
        
        // Score based on budget
        if (!empty($data['budget'])) {
            // Extract numeric value from budget string if possible
            preg_match('/(\d+)/', $data['budget'], $matches);
            if (!empty($matches[1])) {
                $budgetValue = (int) $matches[1];
                if ($budgetValue > 500000) {
                    $score += 15;
                } elseif ($budgetValue > 200000) {
                    $score += 10;
                } elseif ($budgetValue > 100000) {
                    $score += 5;
                }
            }
        }
        
        // Score based on timeline
        if (!empty($data['timeline'])) {
            if (stripos($data['timeline'], 'immediate') !== false || 
                stripos($data['timeline'], 'urgent') !== false) {
                $score += 15;
            } elseif (stripos($data['timeline'], 'month') !== false) {
                $score += 10;
            } elseif (stripos($data['timeline'], 'quarter') !== false) {
                $score += 5;
            }
        }
        
        // Score based on source
        if (!empty($data['source'])) {
            $highQualitySources = ['referral', 'direct', 'partner'];
            if (in_array(strtolower($data['source']), $highQualitySources)) {
                $score += 10;
            }
        }
        
        return $score;
    }
} 