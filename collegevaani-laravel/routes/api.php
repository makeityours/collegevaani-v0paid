<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VerificationController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\CollegeController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\ApplicationController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\LeadController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::prefix('v1')->group(function () {
    // Authentication routes - rate limited to prevent brute force
    Route::middleware(['throttle:auth'])->group(function () {
        Route::post('/auth/login', [AuthController::class, 'login']);
        Route::post('/auth/register', [AuthController::class, 'register']);
        
        // Email verification routes
        Route::post('/email/verify', [VerificationController::class, 'verify']);
        Route::post('/email/resend', [VerificationController::class, 'resend']);
        
        // Password reset routes
        Route::post('/password/forgot', [PasswordResetController::class, 'forgotPassword']);
        Route::post('/password/validate-token', [PasswordResetController::class, 'validateToken']);
        Route::post('/password/reset', [PasswordResetController::class, 'resetPassword']);
    });
    
    // Public college and course routes - standard rate limit
    Route::middleware(['throttle:api'])->group(function () {
        Route::get('/colleges', [CollegeController::class, 'index']);
        Route::get('/colleges/{slug}', [CollegeController::class, 'show']);
        Route::post('/colleges/compare', [CollegeController::class, 'compare']);
        
        Route::get('/courses', [CourseController::class, 'index']);
        Route::get('/courses/{id}', [CourseController::class, 'show']);
        Route::get('/colleges/{collegeSlug}/courses', [CourseController::class, 'getByCollege']);
        Route::get('/colleges/{collegeSlug}/courses/{courseSlug}', [CourseController::class, 'showBySlug']);
        
        // Lead creation route (public)
        Route::post('/leads', [LeadController::class, 'store']);
    });
    
    // Razorpay webhook - no rate limit to ensure all callbacks are processed
    Route::post('/payments/webhook', [PaymentController::class, 'webhook']);
    
    // Protected routes
    Route::middleware('auth:sanctum')->group(function () {
        // User routes
        Route::get('/user/me', [AuthController::class, 'me']);
        Route::post('/auth/logout', [AuthController::class, 'logout']);
        
        // Application routes - standard authenticated rate limit
        Route::middleware(['throttle:api'])->group(function () {
            Route::get('/applications', [ApplicationController::class, 'index']);
            Route::get('/applications/{id}', [ApplicationController::class, 'show']);
            Route::post('/applications', [ApplicationController::class, 'store']);
            Route::put('/applications/{id}', [ApplicationController::class, 'update']);
            Route::post('/applications/{id}/submit', [ApplicationController::class, 'submit']);
            Route::delete('/applications/{id}', [ApplicationController::class, 'destroy']);
        });
        
        // Payment routes - separate rate limit for financial transactions
        Route::middleware(['throttle:payment'])->group(function () {
            Route::get('/payments', [PaymentController::class, 'index']);
            Route::get('/payments/{id}', [PaymentController::class, 'show']);
            Route::post('/payments/create-order', [PaymentController::class, 'createOrder']);
            Route::post('/payments/verify', [PaymentController::class, 'verifyPayment']);
        });
        
        // Routes for counselors and admin
        Route::middleware('role:counselor,admin')->group(function () {
            Route::middleware(['throttle:api'])->group(function () {
                Route::get('/leads/my-leads', [LeadController::class, 'myLeads']);
                Route::get('/leads/{id}', [LeadController::class, 'show']);
                Route::put('/leads/{id}', [LeadController::class, 'update']);
                Route::post('/leads/{id}/notes', [LeadController::class, 'addNote']);
                Route::post('/leads/{id}/status', [LeadController::class, 'updateStatus']);
            });
        });
        
        // Admin-only routes
        Route::middleware('role:admin')->group(function () {
            Route::middleware(['throttle:api'])->group(function () {
                // College management
                Route::post('/colleges', [CollegeController::class, 'store']);
                Route::put('/colleges/{id}', [CollegeController::class, 'update']);
                Route::delete('/colleges/{id}', [CollegeController::class, 'destroy']);
                
                // Course management
                Route::post('/courses', [CourseController::class, 'store']);
                Route::put('/courses/{id}', [CourseController::class, 'update']);
                Route::delete('/courses/{id}', [CourseController::class, 'destroy']);
                
                // Application management
                Route::get('/admin/applications', [ApplicationController::class, 'getAllApplications']);
                Route::post('/applications/{id}/status', [ApplicationController::class, 'updateStatus']);
                
                // Payment management
                Route::get('/admin/payments', [PaymentController::class, 'getAllPayments']);
                
                // Lead management
                Route::get('/leads', [LeadController::class, 'index']);
                Route::post('/leads/{id}/assign', [LeadController::class, 'assign']);
                Route::delete('/leads/{id}', [LeadController::class, 'destroy']);
            });
        });
    });
}); 