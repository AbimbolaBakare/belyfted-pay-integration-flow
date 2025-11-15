"use client";

import { Button } from "@/components/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePayment } from "@/context/payment-context";
import { formatCurrency } from "@/lib/utils";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const { amount, currency, merchantName } = usePayment();

  const handleReturnToMerchant = () => {
    router.push("/payment/redirect");
  };

  return (
    <div className="w-full max-w-[396px] flex flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="relative w-[132px] h-[125px]">
          <Image
            src="/assets/success-icon.svg"
            alt="Success"
            fill
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-6 w-full">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 text-center">
            Payment Successful
          </h1>

          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 text-center">
            Your payment of {currency} {formatCurrency(amount)} to {merchantName} has been
            processed successfully via Belyfted Wallet.
          </p>

          <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-300 dark:border-neutral-600">
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Merchant Name
              </p>
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-50">
                {merchantName}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Payment Amount
              </p>
              <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-50">
                {currency} {formatCurrency(amount)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={handleReturnToMerchant} className="w-full">
        Back to {merchantName}
      </Button>
    </div>
  );
}

