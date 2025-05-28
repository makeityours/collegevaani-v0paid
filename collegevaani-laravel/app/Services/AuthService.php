<?php

namespace App\Services;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;

class AuthService
{
    /**
     * Authenticate user and generate token
     *
     * @param string $email
     * @param string $password
     * @return array
     * @throws ValidationException
     */
    public function authenticate(string $email, string $password): array
    {
        $user = User::where('email', $email)->first();

        if (!$user || !Hash::check($password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        if (!$user->is_active) {
            throw ValidationException::withMessages([
                'email' => ['This account has been deactivated.'],
            ]);
        }

        // Delete any existing tokens for this user
        $user->tokens()->delete();

        // Create new token
        $token = $user->createToken('auth_token', ['*'], now()->addDays(7));

        return [
            'user' => $user->only(['id', 'name', 'email', 'role', 'is_verified', 'avatar']),
            'token' => $token->plainTextToken,
        ];
    }

    /**
     * Register a new user
     *
     * @param array $userData
     * @return User
     */
    public function register(array $userData): User
    {
        // Set defaults
        $userData['role'] = $userData['role'] ?? 'student';
        $userData['is_verified'] = false;
        $userData['is_active'] = true;
        $userData['password'] = Hash::make($userData['password']);
        
        // Create user
        return User::create($userData);
    }

    /**
     * Logout the authenticated user
     *
     * @param Request $request
     * @return void
     */
    public function logout(Request $request): void
    {
        $request->user()->currentAccessToken()->delete();
    }

    /**
     * Get authenticated user
     *
     * @param Request $request
     * @return User
     * @throws AuthenticationException
     */
    public function getAuthenticatedUser(Request $request): User
    {
        $user = $request->user();
        
        if (!$user) {
            throw new AuthenticationException('Unauthenticated');
        }
        
        return $user;
    }

    /**
     * Change password for authenticated user
     *
     * @param User $user
     * @param string $currentPassword
     * @param string $newPassword
     * @return bool
     * @throws ValidationException
     */
    public function changePassword(User $user, string $currentPassword, string $newPassword): bool
    {
        if (!Hash::check($currentPassword, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The current password is incorrect.'],
            ]);
        }
        
        $user->password = Hash::make($newPassword);
        return $user->save();
    }

    /**
     * Hash a token for secure storage
     *
     * @param string $token
     * @return string
     */
    public static function hashToken(string $token): string
    {
        return hash('sha256', $token);
    }

    /**
     * Generate a random token
     *
     * @return string
     */
    public static function generateToken(): string
    {
        return Str::random(40);
    }
} 