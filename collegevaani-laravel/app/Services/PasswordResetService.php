<?php

namespace App\Services;

use App\Models\User;
use App\Models\PasswordResetToken;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class PasswordResetService
{
    /**
     * Generate a password reset token for a user
     *
     * @param string $email
     * @return array|null
     */
    public function generateResetToken(string $email): ?array
    {
        $user = User::where('email', $email)->where('is_active', true)->first();
        
        if (!$user) {
            // Don't reveal that the user doesn't exist for security reasons
            return null;
        }
        
        $plainToken = AuthService::generateToken();
        $hashedToken = AuthService::hashToken($plainToken);
        
        // Expire any existing tokens
        PasswordResetToken::where('user_id', $user->id)
            ->where('is_used', false)
            ->update(['is_used' => true]);
        
        // Create new token
        PasswordResetToken::create([
            'user_id' => $user->id,
            'token' => $hashedToken,
            'is_used' => false,
            'expires_at' => Carbon::now()->addHour(),
        ]);
        
        return [
            'token' => $plainToken,
            'userId' => $user->id,
        ];
    }
    
    /**
     * Validate a password reset token
     *
     * @param string $userId
     * @param string $token
     * @return bool
     */
    public function validateResetToken(string $userId, string $token): bool
    {
        $hashedToken = AuthService::hashToken($token);
        
        $tokenRecord = PasswordResetToken::where('user_id', $userId)
            ->where('token', $hashedToken)
            ->where('is_used', false)
            ->first();
        
        if (!$tokenRecord) {
            return false;
        }
        
        return !Carbon::now()->isAfter($tokenRecord->expires_at);
    }
    
    /**
     * Reset a user's password using a valid token
     *
     * @param string $userId
     * @param string $token
     * @param string $newPassword
     * @return bool
     * @throws ValidationException
     * @throws ModelNotFoundException
     */
    public function resetPassword(string $userId, string $token, string $newPassword): bool
    {
        $hashedToken = AuthService::hashToken($token);
        
        $tokenRecord = PasswordResetToken::where('user_id', $userId)
            ->where('token', $hashedToken)
            ->where('is_used', false)
            ->first();
        
        if (!$tokenRecord) {
            throw ValidationException::withMessages([
                'token' => ['Reset token not found or already used.'],
            ]);
        }
        
        if (Carbon::now()->isAfter($tokenRecord->expires_at)) {
            throw ValidationException::withMessages([
                'token' => ['Reset token has expired.'],
            ]);
        }
        
        DB::transaction(function () use ($tokenRecord, $userId, $newPassword) {
            // Mark token as used
            $tokenRecord->is_used = true;
            $tokenRecord->used_at = Carbon::now();
            $tokenRecord->save();
            
            // Update user password
            $user = User::findOrFail($userId);
            $user->password = Hash::make($newPassword);
            $user->save();
            
            // Revoke all tokens
            $user->tokens()->delete();
        });
        
        return true;
    }
} 