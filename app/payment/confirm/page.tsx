"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePayment } from "@/context/payment-context";
import { formatCurrency, getCurrencyIcon } from "@/lib/utils";
import { Wallet } from "@/lib/types/payment";
import { WalletDropdown } from "@/components/payment/wallet-dropdown";
import { CurrencyConversionBox } from "@/components/payment/currency-conversion-box";
import { PinModal } from "@/components/payment/pin-modal";

export default function ConfirmPaymentPage() {
  const router = useRouter();
  const {
    amount,
    currency,
    merchantName,
    selectedWallet,
    setSelectedWallet,
    user,
  } = usePayment();
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pinError, setPinError] = useState("");

  useEffect(() => {
    if (!user) {
      router.push("/payment/signin");
    }
  }, [user, router]);

  if (!user || !user.wallets || user.wallets.length === 0) {
    return null;
  }

  const currentWallet = selectedWallet || user.wallets[0];
  const hasInsufficientBalance = currentWallet.balance < amount;
  const isCurrencyDifferent = currentWallet.currency !== currency;

  const exchangeRate = 2000;
  const convertedAmount = isCurrencyDifferent ? amount * exchangeRate : amount;

  const handleConfirmPayment = () => {
    if (!hasInsufficientBalance) {
      setShowPinModal(true);
    }
  };

  const handlePinConfirm = async (pin: string) => {
    setPinError("");
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsProcessing(false);

    if (pin === "1234") {
      setShowPinModal(false);
      router.push("/payment/success");
    } else if (pin === "0000") {
      setShowPinModal(false);
      router.push("/payment/failed");
    } else {
      setPinError("Incorrect PIN. Please try again.");
    }
  };

  const handlePinClose = () => {
    setShowPinModal(false);
  };

  const handleCancelPayment = () => {
    router.push("/payment/method");
  };

  const handleWalletSelect = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setShowWalletDropdown(false);
  };

  return (
    <div className="w-full max-w-[624px] bg-white dark:bg-neutral-900 rounded-[24px] p-6 flex flex-col items-center gap-6">
      <Image
        src="/assets/logo.svg"
        alt="Belyfted"
        width={84}
        height={66}
        className="object-contain"
      />

      <div className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold text-neutral-800 dark:text-neutral-50">
            Confirm Wallet Payment
          </h1>
          <p className="text-base font-medium text-neutral-500 dark:text-neutral-400">
            Select your source wallet and confirm final amount
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800 rounded-lg p-3 flex flex-col gap-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-300 dark:border-neutral-600">
            <p className="text-base font-medium text-neutral-500 dark:text-neutral-400">
              Merchant Name
            </p>
            <p className="text-base font-semibold text-neutral-800 dark:text-neutral-50">
              {merchantName}
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2 relative">
              <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                Pay From
              </p>
              <button
                onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                className="border border-neutral-300 dark:border-neutral-600 rounded-lg px-3 py-4 md:px-4 md:py-5 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <Image
                    src={getCurrencyIcon(currentWallet.currency)}
                    alt={currentWallet.currency}
                    width={24}
                    height={24}
                    className="shrink-0"
                  />
                  <p className="text-sm md:text-base font-medium text-neutral-800 dark:text-neutral-50 truncate">
                    Belyfted {currentWallet.currency} Wallet -{" "}
                    {currentWallet.currency}{" "}
                    {formatCurrency(currentWallet.balance)}
                  </p>
                </div>
                <Image
                  src="/assets/arrow-right-icon.svg"
                  alt="arrow-right"
                  width={24}
                  height={24}
                  className="shrink-0"
                />
              </button>

              {showWalletDropdown && (
                <WalletDropdown
                  wallets={user.wallets}
                  currentWallet={currentWallet}
                  onSelect={handleWalletSelect}
                />
              )}
            </div>

            <div className="flex flex-col gap-2 pb-2">
              <div className="flex items-center justify-between">
                <p className="text-base font-medium text-neutral-500 dark:text-neutral-400">
                  Available Balance
                </p>
                <p className="text-base font-semibold text-neutral-800 dark:text-neutral-50">
                  {currentWallet.currency}{" "}
                  {formatCurrency(currentWallet.balance)}
                </p>
              </div>
              {hasInsufficientBalance && (
                <p className="text-sm font-medium text-red-500 dark:text-red-400 text-right">
                  Insufficient balance
                </p>
              )}
            </div>

            {isCurrencyDifferent && (
              <CurrencyConversionBox
                transactionCurrency={currency}
                transactionAmount={amount}
                walletCurrency={currentWallet.currency}
                exchangeRate={exchangeRate}
              />
            )}

            <div className="flex items-center justify-between">
              <p className="text-base font-medium text-neutral-500 dark:text-neutral-400">
                Payment Amount
              </p>
              <p className="text-xl font-bold text-neutral-800 dark:text-neutral-50">
                {isCurrencyDifferent
                  ? `${formatCurrency(convertedAmount)} ${currentWallet.currency}`
                  : `${currency} ${formatCurrency(amount)}`}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        <Button
          onClick={handleConfirmPayment}
          disabled={hasInsufficientBalance}
        >
          Confirm and Pay Now
        </Button>

        <Button onClick={handleCancelPayment} variant="secondary">
          Cancel Payment
        </Button>

        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 text-center">
          Your transaction is secured by Belyfted&apos;s encryption protocols.
        </p>
      </div>

      {showPinModal && (
        <PinModal
          onClose={handlePinClose}
          onConfirm={handlePinConfirm}
          isLoading={isProcessing}
          error={pinError}
        />
      )}
    </div>
  );
}
