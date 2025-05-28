<?php

namespace App\Http\Requests\Api\Lead;

use Illuminate\Foundation\Http\FormRequest;

class CreateLeadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true; // Public endpoint, anyone can create a lead
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'course' => 'required|string|max:255',
            'budget' => 'nullable|string|max:100',
            'timeline' => 'nullable|string|max:100',
            'message' => 'nullable|string|max:1000',
            'source' => 'nullable|string|max:100',
            'status' => 'nullable|string|in:new,contacted,qualified,converted,lost',
            'score' => 'nullable|integer',
            'notes' => 'nullable|array',
            'assigned_to' => 'nullable|uuid|exists:users,id'
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Please provide your name',
            'email.required' => 'Please provide your email address',
            'email.email' => 'Please provide a valid email address',
            'phone.required' => 'Please provide your phone number',
            'course.required' => 'Please specify which course you are interested in',
        ];
    }
} 