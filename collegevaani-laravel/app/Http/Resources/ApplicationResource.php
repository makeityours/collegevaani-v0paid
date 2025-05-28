<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ApplicationResource extends JsonResource
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
            'user_id' => $this->user_id,
            'user' => $this->when($this->relationLoaded('user'), function () {
                return new UserResource($this->user);
            }),
            'college_id' => $this->college_id,
            'college' => $this->when($this->relationLoaded('college'), function () {
                return new CollegeResource($this->college);
            }),
            'course_id' => $this->course_id,
            'course' => $this->when($this->relationLoaded('course'), function () {
                return new CourseResource($this->course);
            }),
            'status' => $this->status,
            'documents' => json_decode($this->documents, true),
            'personal_info' => json_decode($this->personal_info, true),
            'submitted_at' => $this->submitted_at ? $this->submitted_at->toIso8601String() : null,
            'reviewed_at' => $this->reviewed_at ? $this->reviewed_at->toIso8601String() : null,
            'created_at' => $this->created_at->toIso8601String(),
            'updated_at' => $this->updated_at->toIso8601String(),
        ];
    }
} 