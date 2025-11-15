import Image from "next/image";
import { formatCurrency } from "@/lib/utils";

interface CurrencyConversionBoxProps {
  transactionCurrency: string;
  transactionAmount: number;
  walletCurrency: string;
  exchangeRate: number;
}

export const CurrencyConversionBox = ({
  transactionCurrency,
  transactionAmount,
  walletCurrency,
  exchangeRate,
}: CurrencyConversionBoxProps) => {
  return (
    <div className="bg-yellow-light-hover dark:bg-yellow-light/20 border border-yellow-normal rounded-[15px] p-4 opacity-80">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <Image
            src="/assets/swap-icon.svg"
            alt="swap"
            width={24}
            height={24}
          />
          <p className="text-base font-semibold text-yellow-darker dark:text-yellow-light">
            Currency Conversion Applied
          </p>
        </div>

        <div className="flex flex-col gap-2 pb-3 border-b border-neutral-300">
          <div className="flex items-center justify-between text-sm text-neutral-800 dark:text-neutral-100">
            <p className="font-medium">Transaction Amount</p>
            <p className="font-semibold">
              {transactionCurrency} {formatCurrency(transactionAmount)}
            </p>
          </div>
          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
            is being converted to your wallet currency ({walletCurrency}).
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-neutral-800 dark:text-neutral-100">
          <p className="font-medium">Exchange Rate</p>
          <p className="font-semibold">
            1 {transactionCurrency} = {exchangeRate} {walletCurrency}
          </p>
        </div>
      </div>
    </div>
  );
};
