"use client";

import { Button } from "@/components/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePayment } from "@/context/payment-context";

export default function PaymentFailedPage() {
  const router = useRouter();
  const { merchantName } = usePayment();

  const handleRetry = () => {
    router.push("/payment/redirect");
  };

  return (
    <div className="w-full max-w-[396px] flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-6 w-full">
        <div className="w-[77px] h-[77px] rounded-full bg-red-100 dark:bg-red-800/20 flex items-center justify-center">
          <Image
            src="/assets/failed-icon.svg"
            alt="failed"
            width={70}
            height={70}
          />
        </div>

        <div className="flex flex-col gap-6 w-full">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50 text-center">
            Payment Failed
          </h1>

          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 text-center">
            The transaction could not be completed. Please check your details or
            try a different payment method.
          </p>

          <div className="border border-red-500 dark:bg-red-800/20 rounded-lg p-3">
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-50">
              <span className="font-bold text-red-800">Possible issues:</span>
              <br /> Insufficient funds, wallet login expired, or bank rejected
              the transaction.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 w-full">
        <Button onClick={handleRetry} className="w-full">
          Return to {merchantName}
        </Button>
      </div>
    </div>
  );
}
