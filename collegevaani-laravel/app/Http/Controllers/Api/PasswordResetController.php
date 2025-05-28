<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\PasswordReset\ForgotPasswordRequest;
use App\Http\Requests\Api\PasswordReset\ResetPasswordRequest;
use App\Services\PasswordResetService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class PasswordResetController extends Controller
{
    protected PasswordResetService $passwordResetService;

    /**
     * Create a new PasswordResetController instance.
     *
     * @param PasswordResetService $passwordResetService
     */
    public function __construct(PasswordResetService $passwordResetService)
    {
        $this->passwordResetService = $passwordResetService;
    }

    /**
     * Request a password reset token
     *
     * @param ForgotPasswordRequest $request
     * @return JsonResponse
     */
    public function forgotPassword(ForgotPasswordRequest $request): JsonResponse
    {
        try {
            $result = $this->passwordResetService->generateResetToken(
                $request->input('email')
            );
            
            if ($result) {
                // TODO: Send password reset email with token
            }
            
            // Always return success even if email doesn't exist for security reasons
            return response()->json([
                'success' => true,
                'message' => 'Password reset instructions sent to your email if it exists in our system',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'There was an error processing your request',
            ], 500);
        }
    }

    /**
     * Validate reset token
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function validateToken(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'userId' => 'required|uuid|exists:users,id',
            'token' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $isValid = $this->passwordResetService->validateResetToken(
                $request->input('userId'),
                $request->input('token')
            );
            
            return response()->json([
                'success' => true,
                'data' => [
                    'isValid' => $isValid,
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Reset password with token
     *
     * @param ResetPasswordRequest $request
     * @return JsonResponse
     */
    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        try {
            $this->passwordResetService->resetPassword(
                $request->input('userId'),
                $request->input('token'),
                $request->input('password')
            );
            
            return response()->json([
                'success' => true,
                'message' => 'Password reset successfully',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }
}
