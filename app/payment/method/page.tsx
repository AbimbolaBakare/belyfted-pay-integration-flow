"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/utils";

export default function PaymentMethodPage() {
  const router = useRouter();
  const amount = 12000.0;
  const currency = "GBP";
  const merchantName = "Jumia Limited";

  const handlePayWithWallet = () => {
    console.log("Pay with wallet clicked");
  };

  const handleChangePaymentMethod = () => {
    router.push("/");
  };

  return (
    <div className="w-full max-w-[618px] bg-white dark:bg-neutral-900 rounded-2xl p-6">
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 w-full max-w-[320px]">
            <Image
              src="/assets/logo.svg"
              alt="Belyfted"
              width={84}
              height={66}
              priority
            />
            <p className="text-center text-base font-medium text-neutral-500 dark:text-neutral-400">
              Choose your secure payment method for {merchantName}
            </p>
          </div>

          <div className="w-full space-y-5">
            <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-2 py-4 flex justify-between items-center">
              <p className="text-base font-medium text-neutral-500 dark:text-neutral-400">
                Total Payment
              </p>
              <p className="text-base font-semibold text-neutral-800 dark:text-neutral-50">
                {currency} {formatCurrency(amount)}
              </p>
            </div>

            <button
              onClick={handlePayWithWallet}
              className="w-full bg-primary-0 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg p-4 flex items-center gap-4 hover:bg-primary-50 dark:hover:bg-neutral-800 transition-all cursor-pointer"
            >
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                <Image
                  src="/assets/wallet-icon.svg"
                  alt="wallet"
                  width={24}
                  height={24}
                />
              </div>
              
              <div className="flex-1 text-left">
                <p className="text-base font-semibold text-neutral-800 dark:text-neutral-50">
                  Pay with Wallet (Belyfted)
                </p>
                <p className="text-sm font-medium text-green-700 dark:text-green-500">
                  Fast and Secure
                </p>
              </div>
            </button>

            <button
              onClick={handleChangePaymentMethod}
              className="w-full text-center text-sm font-medium text-primary-500 dark:text-primary-400 underline hover:opacity-80 transition-opacity"
            >
              Change Payment Method
            </button>
          </div>
        </div>
      </div>
  );
}
