"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePayment } from "@/context/payment-context";
import Image from "next/image";

export default function RedirectPage() {
  const router = useRouter();
  const { merchantName } = usePayment();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="w-full max-w-[396px] flex flex-col items-center gap-6">
      <div className="w-[54px] h-[54px] flex items-center justify-center">
        <Image
          src="/assets/redirect-icon.svg"
          alt="redirect"
          width={42}
          height={42}
          className="animate-spin"
        />
      </div>

      <div className="flex flex-col gap-6 text-center">
        <h1 className="text-base font-medium text-neutral-800 dark:text-neutral-50">
          Redirecting you back to {merchantName}
        </h1>

        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Thank you for using Belyfted Pay
        </p>
      </div>
    </div>
  );
}
