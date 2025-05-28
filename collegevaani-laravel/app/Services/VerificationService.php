<?php

namespace App\Services;

use App\Models\User;
use App\Models\VerificationToken;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class VerificationService
{
    /**
     * Generate a verification token for a user
     *
     * @param User $user
     * @return string The plain text token
     */
    public function generateVerificationToken(User $user): string
    {
        $plainToken = AuthService::generateToken();
        $hashedToken = AuthService::hashToken($plainToken);
        
        // Expire any existing tokens
        VerificationToken::where('user_id', $user->id)
            ->where('is_used', false)
            ->update(['is_used' => true]);
        
        // Create new token
        VerificationToken::create([
            'user_id' => $user->id,
            'token' => $hashedToken,
            'is_used' => false,
            'expires_at' => Carbon::now()->addHours(24),
        ]);
        
        return $plainToken;
    }
    
    /**
     * Verify a user's email using their verification token
     *
     * @param string $userId
     * @param string $token
     * @return bool
     * @throws ValidationException
     * @throws ModelNotFoundException
     */
    public function verifyEmail(string $userId, string $token): bool
    {
        $hashedToken = AuthService::hashToken($token);
        
        $tokenRecord = VerificationToken::where('user_id', $userId)
            ->where('token', $hashedToken)
            ->where('is_used', false)
            ->first();
        
        if (!$tokenRecord) {
            throw ValidationException::withMessages([
                'token' => ['Verification token is invalid or has already been used.'],
            ]);
        }
        
        if (Carbon::now()->isAfter($tokenRecord->expires_at)) {
            throw ValidationException::withMessages([
                'token' => ['Verification token has expired.'],
            ]);
        }
        
        DB::transaction(function () use ($tokenRecord, $userId) {
            // Mark token as used
            $tokenRecord->is_used = true;
            $tokenRecord->used_at = Carbon::now();
            $tokenRecord->save();
            
            // Update user verification status
            $user = User::findOrFail($userId);
            $user->is_verified = true;
            $user->email_verified_at = Carbon::now();
            $user->save();
        });
        
        return true;
    }
    
    /**
     * Request a new verification email
     *
     * @param User $user
     * @return string
     * @throws ValidationException
     */
    public function requestNewVerificationEmail(User $user): string
    {
        if ($user->is_verified) {
            throw ValidationException::withMessages([
                'email' => ['This email is already verified.'],
            ]);
        }
        
        return $this->generateVerificationToken($user);
    }
} 