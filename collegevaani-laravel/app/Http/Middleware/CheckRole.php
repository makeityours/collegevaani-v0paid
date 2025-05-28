<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        if (!$request->user()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], 401);
        }

        $userRole = $request->user()->role;
        
        // If no roles are specified or user is admin, allow all
        if (empty($roles) || $userRole === 'admin') {
            return $next($request);
        }
        
        // Check if user has one of the required roles
        if (in_array($userRole, $roles)) {
            return $next($request);
        }
        
        return response()->json([
            'success' => false,
            'message' => 'You do not have permission to access this resource',
        ], 403);
    }
}
