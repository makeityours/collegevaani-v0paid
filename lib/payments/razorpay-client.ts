"use client"

interface RazorpayConfig {
  razorpayKeyId: string
  currency: string
  companyName: string
  theme: {
    color: string
  }
}

interface PaymentOptions {
  amount: number
  orderId: string
  description: string
  customerEmail?: string
  customerName?: string
  customerPhone?: string
}

class RazorpayClient {
  private config: RazorpayConfig | null = null
  private isLoaded = false

  async initialize(): Promise<void> {
    if (this.isLoaded) return

    try {
      // Fetch config from secure server endpoint
      const response = await fetch("/api/payments/config")
      const data = await response.json()

      if (!data.success) {
        throw new Error("Failed to load payment configuration")
      }

      this.config = data.config

      // Load Razorpay script
      await this.loadRazorpayScript()
      this.isLoaded = true
    } catch (error) {
      console.error("Failed to initialize Razorpay:", error)
      throw error
    }
  }

  private loadRazorpayScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window !== "undefined" && (window as any).Razorpay) {
        resolve()
        return
      }

      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = () => resolve()
      script.onerror = () => reject(new Error("Failed to load Razorpay script"))
      document.head.appendChild(script)
    })
  }

  async createPayment(options: PaymentOptions): Promise<void> {
    if (!this.isLoaded || !this.config) {
      await this.initialize()
    }

    if (!this.config) {
      throw new Error("Payment configuration not available")
    }

    return new Promise((resolve, reject) => {
      const razorpayOptions = {
        key: this.config!.razorpayKeyId,
        amount: options.amount,
        currency: this.config!.currency,
        order_id: options.orderId,
        name: this.config!.companyName,
        description: options.description,
        theme: this.config!.theme,
        prefill: {
          email: options.customerEmail,
          name: options.customerName,
          contact: options.customerPhone,
        },
        handler: (response: any) => {
          resolve(response)
        },
        modal: {
          ondismiss: () => {
            reject(new Error("Payment cancelled by user"))
          },
        },
      }

      const razorpay = new (window as any).Razorpay(razorpayOptions)
      razorpay.open()
    })
  }
}

export const razorpayClient = new RazorpayClient()
