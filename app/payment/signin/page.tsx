"use client";

import { useState } from "react";
import { Button, Input, Alert, Spinner } from "@/components/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePayment } from "@/context/payment-context";
import { formatCurrency } from "@/lib/utils";
import { authService } from "@/lib/services/auth";
import { ApiError } from "@/lib/api/client";

export default function SignInPage() {
  const router = useRouter();
  const { amount, currency, merchantName, setIsAuthenticated } = usePayment();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await authService.signIn({ email, password });
      setIsAuthenticated(true);
      router.push("/payment/confirm");
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError("An error occurred. Please try again.");
      }
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/payment/method");
  };

  return (
    <div className="w-full max-w-[586px] bg-white dark:bg-neutral-900 rounded-3xl p-6 space-y-6">
      <button
        onClick={handleBack}
        className="flex items-center gap-2 text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-50 transition-colors"
      >
        <Image
          src="/assets/arrow-left-icon.svg"
          alt="arrow-left"
          width={24}
          height={24}
        />
        Change Payment Method
      </button>

      <div className="flex flex-col items-center gap-4 w-[320px] mx-auto">
        <Image
          src="/assets/logo.svg"
          alt="Belyfted"
          width={84}
          height={66}
          priority
        />
        <p className="text-center text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Choose your secure payment method for {merchantName}
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg px-2 py-4 flex justify-between items-center">
          <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
            Total Payment
          </p>
          <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-50">
            {currency} {formatCurrency(amount)}
          </p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-neutral-800 dark:text-neutral-50 mb-2">
              Sign in
            </h2>
            <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Sign in to authorize your payment
            </p>
          </div>

          <div className="space-y-4">
            {error && <Alert variant="error">{error}</Alert>}

            <Input
              label="Username"
              type="email"
              placeholder=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-yellow-light hover:bg-yellow-light-hover rounded-lg"
            >
              {isLoading && <Spinner />}
              Log in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
