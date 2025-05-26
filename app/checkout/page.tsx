"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { SecurePaymentButton } from "@/components/payments/secure-payment-button"

const plans = [
  { name: "Basic", price: 10 },
  { name: "Standard", price: 20 },
  { name: "Premium", price: 30 },
]

export default function CheckoutPage() {
  const [selectedPlan, setSelectedPlan] = useState(plans[0])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const router = useRouter()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-5">Checkout</h1>

      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-2">Select a Plan</h2>
        <div className="flex space-x-4">
          {plans.map((plan) => (
            <button
              key={plan.name}
              className={`px-4 py-2 rounded-md ${
                selectedPlan.name === plan.name
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              onClick={() => setSelectedPlan(plan)}
            >
              {plan.name} - ₹{plan.price}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full px-4 py-2 border rounded-md mb-2"
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md mb-2"
          onChange={handleInputChange}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="w-full px-4 py-2 border rounded-md mb-2"
          onChange={handleInputChange}
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Payment</h2>
        <SecurePaymentButton
          amount={selectedPlan.price * 100} // Convert to paise
          description={`${selectedPlan.name} Plan Subscription`}
          customerEmail={formData.email}
          customerName={formData.name}
          customerPhone={formData.phone}
          onSuccess={(response) => {
            // Handle successful payment
            router.push("/dashboard?payment=success")
          }}
        >
          Complete Payment ₹{selectedPlan.price}
        </SecurePaymentButton>
      </div>
    </div>
  )
}
