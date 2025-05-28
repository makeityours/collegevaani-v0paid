<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;

trait ApiResponses
{
    /**
     * Return a success JSON response.
     *
     * @param array|string $data
     * @param string|null $message
     * @param int $code
     * @return JsonResponse
     */
    protected function successResponse($data, ?string $message = null, int $code = 200): JsonResponse
    {
        $response = [
            'success' => true,
        ];

        if ($message) {
            $response['message'] = $message;
        }

        if (is_array($data) || is_object($data)) {
            $response['data'] = $data;
        } elseif (!is_null($data)) {
            $response['data'] = $data;
        }

        return response()->json($response, $code);
    }

    /**
     * Return an error JSON response.
     *
     * @param string $message
     * @param int $code
     * @param array|null $data
     * @return JsonResponse
     */
    protected function errorResponse(string $message, int $code, ?array $data = null): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        if (!is_null($data)) {
            $response['data'] = $data;
        }

        return response()->json($response, $code);
    }

    /**
     * Handle exceptions and return appropriate JSON response
     *
     * @param \Exception|\Throwable $exception
     * @return JsonResponse
     */
    protected function handleException(\Throwable $exception): JsonResponse
    {
        // Log the exception
        \Log::error($exception->getMessage(), [
            'exception' => $exception,
            'file' => $exception->getFile(),
            'line' => $exception->getLine(),
            'trace' => $exception->getTraceAsString()
        ]);

        // Handle validation errors
        if ($exception instanceof ValidationException) {
            return $this->errorResponse(
                'Validation error',
                422,
                ['errors' => $exception->errors()]
            );
        }

        // Handle HTTP exceptions
        if ($exception instanceof HttpException) {
            return $this->errorResponse(
                $exception->getMessage(),
                $exception->getStatusCode()
            );
        }

        // Handle application exceptions with status codes
        if (method_exists($exception, 'getCode') && $exception->getCode() >= 400 && $exception->getCode() < 600) {
            return $this->errorResponse(
                $exception->getMessage(),
                $exception->getCode()
            );
        }

        // Default to 500 error for all other exceptions
        return $this->errorResponse(
            config('app.debug') ? $exception->getMessage() : 'An unexpected error occurred',
            500
        );
    }
} 