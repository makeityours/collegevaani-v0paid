<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CollegeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'logo' => $this->logo,
            'images' => json_decode($this->images, true),
            'location' => json_decode($this->location, true),
            'contact' => json_decode($this->contact, true),
            'type' => $this->type,
            'category' => $this->category,
            'accreditation' => json_decode($this->accreditation, true),
            'rankings' => json_decode($this->rankings, true),
            'facilities' => json_decode($this->facilities, true),
            'fees' => json_decode($this->fees, true),
            'admissions' => json_decode($this->admissions, true),
            'stats' => json_decode($this->stats, true),
            'is_verified' => (bool) $this->is_verified,
            'is_active' => (bool) $this->is_active,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
