<?php

namespace App\Http\Requests\Api\Lead;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class UpdateLeadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return Auth::check() && in_array(Auth::user()->role, ['admin', 'counselor']);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255',
            'phone' => 'sometimes|string|max:20',
            'course' => 'sometimes|string|max:255',
            'budget' => 'sometimes|nullable|string|max:100',
            'timeline' => 'sometimes|nullable|string|max:100',
            'message' => 'sometimes|nullable|string|max:1000',
            'source' => 'sometimes|nullable|string|max:100',
            'status' => 'sometimes|string|in:new,contacted,qualified,converted,lost',
            'score' => 'sometimes|integer',
            'notes' => 'sometimes|array',
        ];
    }
} 