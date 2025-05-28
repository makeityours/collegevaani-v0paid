<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
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
            'college_id' => $this->college_id,
            'college' => $this->when($this->relationLoaded('college'), function () {
                return new CollegeResource($this->college);
            }),
            'category' => $this->category,
            'degree' => $this->degree,
            'duration' => json_decode($this->duration, true),
            'eligibility' => json_decode($this->eligibility, true),
            'curriculum' => json_decode($this->curriculum, true),
            'fees' => json_decode($this->fees, true),
            'seats' => json_decode($this->seats, true),
            'is_active' => (bool) $this->is_active,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
}
