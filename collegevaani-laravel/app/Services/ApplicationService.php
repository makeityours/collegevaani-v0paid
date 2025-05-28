<?php

namespace App\Services;

use App\Models\Application;
use App\Models\College;
use App\Models\Course;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ApplicationService
{
    /**
     * Get applications for a specific user
     *
     * @param string $userId
     * @param array $filters
     * @return LengthAwarePaginator
     */
    public function getUserApplications(string $userId, array $filters = []): LengthAwarePaginator
    {
        $query = Application::where('user_id', $userId);
        
        return $this->applyFilters($query, $filters);
    }
    
    /**
     * Get all applications (admin and counselor only)
     *
     * @param array $filters
     * @return LengthAwarePaginator
     * @throws \Exception
     */
    public function getAllApplications(array $filters = []): LengthAwarePaginator
    {
        // Only admin and counselors can view all applications
        $user = Auth::user();
        if (!$user || !in_array($user->role, ['admin', 'counselor'])) {
            throw new \Exception('Unauthorized access', 403);
        }
        
        $query = Application::query();
        
        // Filter by user_id if provided
        if (!empty($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }
        
        return $this->applyFilters($query, $filters);
    }
    
    /**
     * Apply common filters to application queries
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
        
        // Apply college filter
        if (!empty($filters['college_id'])) {
            $query->where('college_id', $filters['college_id']);
        }
        
        // Apply course filter
        if (!empty($filters['course_id'])) {
            $query->where('course_id', $filters['course_id']);
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
     * Get a specific application by ID
     *
     * @param string $id
     * @param string $userId
     * @return Application
     * @throws \Exception
     */
    public function getApplicationById(string $id, string $userId): Application
    {
        $application = Application::find($id);
        
        if (!$application) {
            throw new \Exception('Application not found', 404);
        }
        
        // Check authorization
        $this->checkApplicationAccess($application, $userId);
        
        return $application;
    }
    
    /**
     * Create a new application
     *
     * @param array $data
     * @return Application
     * @throws \Exception
     */
    public function createApplication(array $data): Application
    {
        // Verify college exists
        $college = College::find($data['college_id']);
        if (!$college) {
            throw new \Exception('College not found', 404);
        }
        
        // Verify course exists
        $course = Course::find($data['course_id']);
        if (!$course) {
            throw new \Exception('Course not found', 404);
        }
        
        // Verify course belongs to college
        if ($course->college_id !== $college->id) {
            throw new \Exception('Course does not belong to the specified college', 422);
        }
        
        // Set default status to draft
        $data['status'] = 'draft';
        
        // Ensure JSON fields are properly formatted
        foreach (['documents', 'personal_info'] as $jsonField) {
            if (isset($data[$jsonField]) && is_array($data[$jsonField])) {
                $data[$jsonField] = json_encode($data[$jsonField]);
            }
        }
        
        return Application::create($data);
    }
    
    /**
     * Update an existing application
     *
     * @param string $id
     * @param string $userId
     * @param array $data
     * @return Application
     * @throws \Exception
     */
    public function updateApplication(string $id, string $userId, array $data): Application
    {
        $application = Application::find($id);
        
        if (!$application) {
            throw new \Exception('Application not found', 404);
        }
        
        // Check authorization
        $this->checkApplicationAccess($application, $userId);
        
        // Check if application can be updated
        if ($application->status !== 'draft') {
            throw new \Exception('Only draft applications can be updated', 422);
        }
        
        // If college_id or course_id is being updated, validate them
        if (isset($data['college_id']) || isset($data['course_id'])) {
            $collegeId = $data['college_id'] ?? $application->college_id;
            $courseId = $data['course_id'] ?? $application->course_id;
            
            // Verify college exists
            $college = College::find($collegeId);
            if (!$college) {
                throw new \Exception('College not found', 404);
            }
            
            // Verify course exists
            $course = Course::find($courseId);
            if (!$course) {
                throw new \Exception('Course not found', 404);
            }
            
            // Verify course belongs to college
            if ($course->college_id !== $college->id) {
                throw new \Exception('Course does not belong to the specified college', 422);
            }
        }
        
        // Ensure JSON fields are properly formatted
        foreach (['documents', 'personal_info'] as $jsonField) {
            if (isset($data[$jsonField]) && is_array($data[$jsonField])) {
                $data[$jsonField] = json_encode($data[$jsonField]);
            }
        }
        
        $application->update($data);
        return $application->fresh();
    }
    
    /**
     * Submit an application
     *
     * @param string $id
     * @param string $userId
     * @return Application
     * @throws \Exception
     */
    public function submitApplication(string $id, string $userId): Application
    {
        $application = Application::find($id);
        
        if (!$application) {
            throw new \Exception('Application not found', 404);
        }
        
        // Check authorization
        $this->checkApplicationAccess($application, $userId);
        
        // Check if application can be submitted
        if ($application->status !== 'draft') {
            throw new \Exception('Only draft applications can be submitted', 422);
        }
        
        // Validate that personal_info is complete
        $personalInfo = json_decode($application->personal_info, true);
        $requiredFields = [
            'name', 'email', 'phone', 'address', 'education', 'date_of_birth'
        ];
        
        foreach ($requiredFields as $field) {
            if (empty($personalInfo[$field])) {
                throw new \Exception("Personal information is incomplete. Missing: {$field}", 422);
            }
        }
        
        // Use a database transaction to ensure data integrity
        return DB::transaction(function () use ($application) {
            // Update application status to submitted
            $application->status = 'submitted';
            $application->submitted_at = now();
            $application->save();
            
            // TODO: Send notification to admins and counselors
            
            return $application->fresh();
        });
    }
    
    /**
     * Update application status (admin and counselor only)
     *
     * @param string $id
     * @param string $status
     * @param string|null $notes
     * @return Application
     * @throws \Exception
     */
    public function updateApplicationStatus(string $id, string $status, ?string $notes = null): Application
    {
        // Only admin and counselors can update application status
        $user = Auth::user();
        if (!$user || !in_array($user->role, ['admin', 'counselor'])) {
            throw new \Exception('Unauthorized access', 403);
        }
        
        $application = Application::find($id);
        
        if (!$application) {
            throw new \Exception('Application not found', 404);
        }
        
        // Check if application can have its status updated
        if ($application->status === 'draft') {
            throw new \Exception('Draft applications cannot have their status updated', 422);
        }
        
        // Update application status
        $application->status = $status;
        
        // If status is being updated to under_review, set reviewed_at
        if ($status === 'under_review') {
            $application->reviewed_at = now();
        }
        
        // Add notes if provided
        if ($notes) {
            $personalInfo = json_decode($application->personal_info, true);
            $personalInfo['admin_notes'] = $notes;
            $application->personal_info = json_encode($personalInfo);
        }
        
        $application->save();
        
        // TODO: Send notification to the applicant
        
        return $application->fresh();
    }
    
    /**
     * Delete an application
     *
     * @param string $id
     * @param string $userId
     * @return bool
     * @throws \Exception
     */
    public function deleteApplication(string $id, string $userId): bool
    {
        $application = Application::find($id);
        
        if (!$application) {
            throw new \Exception('Application not found', 404);
        }
        
        // Check authorization
        $this->checkApplicationAccess($application, $userId);
        
        // Only draft applications can be deleted by the user
        $user = User::find($userId);
        if ($user->role !== 'admin' && $application->status !== 'draft') {
            throw new \Exception('Only draft applications can be deleted', 422);
        }
        
        return $application->delete();
    }
    
    /**
     * Check if a user has access to an application
     *
     * @param Application $application
     * @param string $userId
     * @return bool
     * @throws \Exception
     */
    private function checkApplicationAccess(Application $application, string $userId): bool
    {
        $user = User::find($userId);
        
        // Admins and counselors have access to all applications
        if (in_array($user->role, ['admin', 'counselor'])) {
            return true;
        }
        
        // Regular users can only access their own applications
        if ($application->user_id !== $userId) {
            throw new \Exception('Unauthorized access to this application', 403);
        }
        
        return true;
    }
} 