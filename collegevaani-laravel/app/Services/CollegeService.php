<?php

namespace App\Services;

use App\Models\College;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class CollegeService
{
    /**
     * Get paginated list of colleges with filters
     *
     * @param array $filters
     * @return LengthAwarePaginator
     */
    public function getColleges(array $filters = []): LengthAwarePaginator
    {
        $query = College::query()->where('is_active', true);

        // Apply type filter
        if (!empty($filters['type'])) {
            $query->where('type', $filters['type']);
        }

        // Apply category filter
        if (!empty($filters['category'])) {
            $query->where('category', $filters['category']);
        }

        // Apply location filter
        if (!empty($filters['location'])) {
            $query->whereJsonContains('location->city', $filters['location'])
                ->orWhereJsonContains('location->state', $filters['location']);
        }

        // Apply search filter
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%{$search}%")
                    ->orWhere('description', 'LIKE', "%{$search}%")
                    ->orWhereJsonContains('location->city', $search)
                    ->orWhereJsonContains('location->state', $search);
            });
        }

        // Apply sorting
        $sortField = $filters['sort'] ?? 'name';
        $sortOrder = $filters['order'] ?? 'asc';

        // Special handling for JSON fields
        if ($sortField === 'ranking') {
            $query->orderByRaw("JSON_EXTRACT(rankings, '$[0].score') {$sortOrder}");
        } elseif ($sortField === 'fees') {
            $query->orderByRaw("JSON_EXTRACT(fees, '$.average') {$sortOrder}");
        } else {
            $query->orderBy($sortField, $sortOrder);
        }

        // Set pagination
        $perPage = $filters['per_page'] ?? 20;

        return $query->paginate($perPage);
    }

    /**
     * Get a college by its slug
     *
     * @param string $slug
     * @return College
     * @throws \Exception
     */
    public function getCollegeBySlug(string $slug): College
    {
        $college = College::where('slug', $slug)
            ->where('is_active', true)
            ->first();

        if (!$college) {
            throw new \Exception('College not found', 404);
        }

        return $college;
    }

    /**
     * Compare multiple colleges
     *
     * @param array $slugs
     * @return Collection
     */
    public function compareColleges(array $slugs): Collection
    {
        return College::whereIn('slug', $slugs)
            ->where('is_active', true)
            ->get();
    }

    /**
     * Create a new college
     *
     * @param array $data
     * @return College
     */
    public function createCollege(array $data): College
    {
        // Generate slug from name if not provided
        if (!isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        // Ensure JSON fields are properly formatted
        foreach (['images', 'location', 'contact', 'accreditation', 'rankings', 
                  'facilities', 'fees', 'admissions', 'stats'] as $jsonField) {
            if (isset($data[$jsonField]) && is_array($data[$jsonField])) {
                $data[$jsonField] = json_encode($data[$jsonField]);
            }
        }

        return College::create($data);
    }

    /**
     * Update an existing college
     *
     * @param string $id
     * @param array $data
     * @return College
     * @throws \Exception
     */
    public function updateCollege(string $id, array $data): College
    {
        $college = College::find($id);

        if (!$college) {
            throw new \Exception('College not found', 404);
        }

        // Generate slug from name if name is updated and slug isn't provided
        if (isset($data['name']) && !isset($data['slug'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        // Ensure JSON fields are properly formatted
        foreach (['images', 'location', 'contact', 'accreditation', 'rankings', 
                  'facilities', 'fees', 'admissions', 'stats'] as $jsonField) {
            if (isset($data[$jsonField]) && is_array($data[$jsonField])) {
                $data[$jsonField] = json_encode($data[$jsonField]);
            }
        }

        $college->update($data);
        return $college->fresh();
    }

    /**
     * Delete a college
     *
     * @param string $id
     * @return bool
     * @throws \Exception
     */
    public function deleteCollege(string $id): bool
    {
        $college = College::find($id);

        if (!$college) {
            throw new \Exception('College not found', 404);
        }

        return $college->delete();
    }
} 