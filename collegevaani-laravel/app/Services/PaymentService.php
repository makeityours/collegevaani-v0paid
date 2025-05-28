<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Razorpay\Api\Api as RazorpayApi;
use Illuminate\Support\Facades\DB;

class PaymentService
{
    protected RazorpayApi $razorpay;

    /**
     * Create a new PaymentService instance.
     */
    public function __construct()
    {
        // Initialize Razorpay API with credentials from environment variables
        $this->razorpay = new RazorpayApi(
            config('services.razorpay.key_id'),
            config('services.razorpay.key_secret')
        );
    }

    /**
     * Get payments for a specific user
     *
     * @param string $userId
     * @param array $filters
     * @return LengthAwarePaginator
     */
    public function getUserPayments(string $userId, array $filters = []): LengthAwarePaginator
    {
        $query = Payment::where('user_id', $userId);
        
        return $this->applyFilters($query, $filters);
    }
    
    /**
     * Get all payments (admin only)
     *
     * @param array $filters
     * @return LengthAwarePaginator
     * @throws \Exception
     */
    public function getAllPayments(array $filters = []): LengthAwarePaginator
    {
        // Only admin can view all payments
        $user = Auth::user();
        if (!$user || $user->role !== 'admin') {
            throw new \Exception('Unauthorized access', 403);
        }
        
        $query = Payment::query();
        
        // Filter by user_id if provided
        if (!empty($filters['user_id'])) {
            $query->where('user_id', $filters['user_id']);
        }
        
        return $this->applyFilters($query, $filters);
    }
    
    /**
     * Apply common filters to payment queries
     *
     * @param Builder $query
     * @param array $filters
     * @return LengthAwarePaginator
     */
    private function applyFilters(Builder $query, array $filters): LengthAwarePaginator
    {
        // Apply status filter
        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }
        
        // Apply sorting
        $sortField = $filters['sort'] ?? 'created_at';
        $sortOrder = $filters['order'] ?? 'desc';
        $query->orderBy($sortField, $sortOrder);
        
        // Set pagination
        $perPage = $filters['per_page'] ?? 20;
        
        return $query->paginate($perPage);
    }
    
    /**
     * Get a specific payment by ID
     *
     * @param string $id
     * @param string $userId
     * @return Payment
     * @throws \Exception
     */
    public function getPaymentById(string $id, string $userId): Payment
    {
        $payment = Payment::find($id);
        
        if (!$payment) {
            throw new \Exception('Payment not found', 404);
        }
        
        // Check authorization
        $this->checkPaymentAccess($payment, $userId);
        
        return $payment;
    }
    
    /**
     * Create a new Razorpay order
     *
     * @param array $data
     * @return array
     * @throws \Exception
     */
    public function createOrder(array $data): array
    {
        // Validate user
        $user = User::find($data['user_id']);
        if (!$user) {
            throw new \Exception('User not found', 404);
        }
        
        // Prepare the order data for Razorpay
        $orderData = [
            'receipt' => 'rcpt_' . Str::uuid()->toString(),
            'amount' => $data['amount'] * 100, // Convert to paisa
            'currency' => $data['currency'] ?? 'INR',
            'notes' => [
                'user_id' => $user->id,
                'user_email' => $user->email,
                'payment_for' => $data['payment_for'] ?? 'application',
                'description' => $data['description'] ?? '',
            ],
        ];
        
        // Create the order in Razorpay
        try {
            $razorpayOrder = $this->razorpay->order->create($orderData);
        } catch (\Exception $e) {
            \Log::error('Razorpay order creation failed: ' . $e->getMessage(), [
                'data' => $orderData,
                'exception' => $e,
            ]);
            throw new \Exception('Failed to create payment order: ' . $e->getMessage(), 500);
        }
        
        // Store the order in our database
        $payment = Payment::create([
            'user_id' => $user->id,
            'order_id' => $razorpayOrder->id,
            'amount' => $data['amount'],
            'currency' => $data['currency'] ?? 'INR',
            'status' => 'pending',
            'gateway' => 'razorpay',
            'metadata' => json_encode([
                'payment_for' => $data['payment_for'] ?? 'application',
                'description' => $data['description'] ?? '',
                'razorpay_receipt' => $orderData['receipt'],
            ]),
        ]);
        
        // Return the order details for the frontend
        return [
            'payment_id' => $payment->id,
            'order_id' => $razorpayOrder->id,
            'amount' => $data['amount'],
            'currency' => $data['currency'] ?? 'INR',
            'key_id' => config('services.razorpay.key_id'),
            'prefill' => [
                'name' => $user->name,
                'email' => $user->email,
                // Phone would be added here if available
            ],
            'notes' => $orderData['notes'],
        ];
    }
    
    /**
     * Verify and process a completed payment
     *
     * @param array $data
     * @return Payment
     * @throws \Exception
     */
    public function verifyPayment(array $data): Payment
    {
        // Get the payment and order from our database
        $payment = Payment::where('order_id', $data['razorpay_order_id'])->first();
        
        if (!$payment) {
            throw new \Exception('Payment not found', 404);
        }
        
        // Verify the payment signature
        $expectedSignature = hash_hmac(
            'sha256',
            $data['razorpay_order_id'] . '|' . $data['razorpay_payment_id'],
            config('services.razorpay.key_secret')
        );
        
        if ($expectedSignature !== $data['razorpay_signature']) {
            $payment->status = 'failed';
            $payment->save();
            throw new \Exception('Payment verification failed: Invalid signature', 400);
        }
        
        // Get payment details from Razorpay to confirm the payment status
        try {
            $razorpayPayment = $this->razorpay->payment->fetch($data['razorpay_payment_id']);
            
            if ($razorpayPayment->status !== 'captured') {
                throw new \Exception('Payment not captured by Razorpay', 400);
            }
            
            // Use a database transaction to ensure data integrity
            return DB::transaction(function () use ($payment, $data, $razorpayPayment) {
                // Update our payment record
                $payment->payment_id = $data['razorpay_payment_id'];
                $payment->status = 'completed';
                
                // Add additional payment details to metadata
                $metadata = json_decode($payment->metadata, true) ?: [];
                $metadata['razorpay_payment_id'] = $data['razorpay_payment_id'];
                $metadata['razorpay_signature'] = $data['razorpay_signature'];
                $metadata['payment_method'] = $razorpayPayment->method ?? null;
                $payment->metadata = json_encode($metadata);
                
                $payment->save();
                
                // TODO: Trigger any post-payment actions (like upgrading subscription, etc.)
                
                return $payment;
            });
        } catch (\Exception $e) {
            \Log::error('Razorpay payment verification failed: ' . $e->getMessage(), [
                'data' => $data,
                'exception' => $e,
            ]);
            
            $payment->status = 'failed';
            $payment->save();
            
            throw new \Exception('Payment verification failed: ' . $e->getMessage(), 400);
        }
    }
    
    /**
     * Handle webhook events from Razorpay
     *
     * @param array $payload
     * @return bool
     * @throws \Exception
     */
    public function handleWebhook(array $payload): bool
    {
        // Verify webhook signature if available
        if (isset($payload['event']) && isset($payload['payload']) && isset($payload['signature'])) {
            $webhookSecret = config('services.razorpay.webhook_secret');
            
            if (!$webhookSecret) {
                \Log::warning('Razorpay webhook secret not configured');
            } else {
                $expectedSignature = hash_hmac('sha256', json_encode($payload['payload']), $webhookSecret);
                
                if ($expectedSignature !== $payload['signature']) {
                    throw new \Exception('Invalid webhook signature', 400);
                }
            }
            
            // Process based on event type
            switch ($payload['event']) {
                case 'payment.authorized':
                    // Payment is authorized but not yet captured
                    $paymentId = $payload['payload']['payment']['entity']['id'] ?? null;
                    if ($paymentId) {
                        $this->updatePaymentFromWebhook($paymentId, 'pending');
                    }
                    break;
                    
                case 'payment.captured':
                    // Payment is successfully captured
                    $paymentId = $payload['payload']['payment']['entity']['id'] ?? null;
                    if ($paymentId) {
                        $this->updatePaymentFromWebhook($paymentId, 'completed');
                    }
                    break;
                    
                case 'payment.failed':
                    // Payment has failed
                    $paymentId = $payload['payload']['payment']['entity']['id'] ?? null;
                    if ($paymentId) {
                        $this->updatePaymentFromWebhook($paymentId, 'failed');
                    }
                    break;
                    
                case 'refund.created':
                    // Payment has been refunded
                    $paymentId = $payload['payload']['refund']['entity']['payment_id'] ?? null;
                    if ($paymentId) {
                        $this->updatePaymentFromWebhook($paymentId, 'refunded');
                    }
                    break;
                    
                default:
                    // Log other events
                    \Log::info('Unhandled Razorpay webhook event: ' . ($payload['event'] ?? 'unknown'));
                    break;
            }
        }
        
        return true;
    }
    
    /**
     * Update payment status from webhook event
     *
     * @param string $razorpayPaymentId
     * @param string $status
     * @return bool
     */
    private function updatePaymentFromWebhook(string $razorpayPaymentId, string $status): bool
    {
        $payment = Payment::where('payment_id', $razorpayPaymentId)->first();
        
        if (!$payment) {
            \Log::warning('Payment not found for Razorpay payment ID: ' . $razorpayPaymentId);
            return false;
        }
        
        $payment->status = $status;
        $payment->save();
        
        // TODO: Trigger any status-specific actions
        
        return true;
    }
    
    /**
     * Check if a user has access to a payment
     *
     * @param Payment $payment
     * @param string $userId
     * @return bool
     * @throws \Exception
     */
    private function checkPaymentAccess(Payment $payment, string $userId): bool
    {
        $user = User::find($userId);
        
        // Admins have access to all payments
        if ($user->role === 'admin') {
            return true;
        }
        
        // Regular users can only access their own payments
        if ($payment->user_id !== $userId) {
            throw new \Exception('Unauthorized access to this payment', 403);
        }
        
        return true;
    }
} 