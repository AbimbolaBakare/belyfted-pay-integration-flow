"use client";

import { useState } from "react";
import { Button, Radio, ThemeToggle } from "@/components/ui";
import { PaymentMethod } from "@/lib/types/payment";

const paymentMethods = [
  {
    id: "belyfted" as PaymentMethod,
    label: "Belyfted Pay",
    description:
      "Pay from your Belyfted wallet or pay with your bank app, no cards need.",
    available: true,
  },
  {
    id: "card" as PaymentMethod,
    label: "Credit/Debit Card",
    description: undefined,
    available: false,
  },
];

export default function Home() {
  const [selectedMethod, setSelectedMethod] =
    useState<PaymentMethod>("belyfted");
  const amount = 12.0;
  const currency = "GBP";

  const selectedPaymentMethod = paymentMethods.find(
    (m) => m.id === selectedMethod
  );
  const isPaymentAvailable = selectedPaymentMethod?.available ?? false;

  const handlePayment = () => {
    if (!isPaymentAvailable) return;
    window.location.href = "/payment/method";
  };

  const getButtonText = () => {
    if (selectedMethod === "card") {
      return `Pay ${currency} ${amount.toFixed(2)} with Card`;
    }
    return `Pay ${currency} ${amount.toFixed(2)} with Belyfted Pay`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 md:px-8">
      <div className="w-full max-w-lg space-y-10">
        <div>
          <h1 className="text-3xl font-semibold text-neutral-800 dark:text-neutral-50">
            Check Out
          </h1>
        </div>

        <div className="space-y-5">
          <h2 className="text-base font-semibold text-neutral-800 dark:text-neutral-50">
            Select your payment method
          </h2>

          <div className="space-y-8">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`rounded-lg border transition-all cursor-pointer ${
                  selectedMethod === method.id
                    ? "bg-primary-0 border-primary-500 dark:bg-neutral-900 dark:border-primary-500"
                    : "bg-transparent border-transparent dark:bg-transparent"
                } p-2`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <Radio
                  name="payment-method"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                  label={method.label}
                  description={method.description}
                />
              </div>
            ))}

            {!isPaymentAvailable && (
              <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
                This payment method is currently unavailable
              </p>
            )}

            <Button
              variant="primary"
              fullWidth
              onClick={handlePayment}
              disabled={!isPaymentAvailable}
            >
              {getButtonText()}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
