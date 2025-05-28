<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\Payment\CreateOrderRequest;
use App\Http\Requests\Api\Payment\VerifyPaymentRequest;
use App\Http\Resources\PaymentResource;
use App\Http\Resources\PaymentCollection;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected PaymentService $paymentService;

    /**
     * Create a new PaymentController instance.
     *
     * @param PaymentService $paymentService
     */
    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    /**
     * Get payments for the authenticated user
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'status' => 'sometimes|string|in:pending,completed,failed,refunded',
            'sort' => 'sometimes|string|in:created_at,amount',
            'order' => 'sometimes|string|in:asc,desc',
            'per_page' => 'sometimes|integer|min:1|max:100',
        ]);

        $payments = $this->paymentService->getUserPayments(
            auth()->id(),
            $filters
        );

        return response()->json([
            'success' => true,
            'data' => new PaymentCollection($payments),
        ]);
    }

    /**
     * Get all payments (admin only)
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getAllPayments(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'status' => 'sometimes|string|in:pending,completed,failed,refunded',
            'user_id' => 'sometimes|uuid',
            'sort' => 'sometimes|string|in:created_at,amount',
            'order' => 'sometimes|string|in:asc,desc',
            'per_page' => 'sometimes|integer|min:1|max:100',
        ]);

        $payments = $this->paymentService->getAllPayments($filters);

        return response()->json([
            'success' => true,
            'data' => new PaymentCollection($payments),
        ]);
    }

    /**
     * Get a specific payment by ID
     *
     * @param string $id
     * @return JsonResponse
     */
    public function show(string $id): JsonResponse
    {
        try {
            $payment = $this->paymentService->getPaymentById($id, auth()->id());
            
            return response()->json([
                'success' => true,
                'data' => new PaymentResource($payment),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Create a new Razorpay order
     *
     * @param CreateOrderRequest $request
     * @return JsonResponse
     */
    public function createOrder(CreateOrderRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $data['user_id'] = auth()->id();
            
            $order = $this->paymentService->createOrder($data);
            
            return response()->json([
                'success' => true,
                'message' => 'Order created successfully',
                'data' => $order,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Verify and process a completed payment
     *
     * @param VerifyPaymentRequest $request
     * @return JsonResponse
     */
    public function verifyPayment(VerifyPaymentRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $payment = $this->paymentService->verifyPayment($data);
            
            return response()->json([
                'success' => true,
                'message' => 'Payment verified successfully',
                'data' => new PaymentResource($payment),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 400);
        }
    }

    /**
     * Handle Razorpay webhook events
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function webhook(Request $request): JsonResponse
    {
        try {
            $this->paymentService->handleWebhook($request->all());
            
            return response()->json([
                'success' => true,
                'message' => 'Webhook processed successfully',
            ]);
        } catch (\Exception $e) {
            // Log error but return 200 to prevent Razorpay from retrying
            \Log::error('Razorpay webhook error: ' . $e->getMessage(), [
                'payload' => $request->all(),
                'exception' => $e,
            ]);
            
            return response()->json([
                'success' => false,
                'message' => 'Webhook processing error',
            ]);
        }
    }
} 