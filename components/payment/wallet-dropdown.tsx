import Image from "next/image";
import { Wallet } from "@/lib/types/payment";
import { formatCurrency, getCurrencyIcon } from "@/lib/utils";

interface WalletDropdownProps {
  wallets: Wallet[];
  currentWallet: Wallet;
  onSelect: (wallet: Wallet) => void;
}

export const WalletDropdown = ({
  wallets,
  currentWallet,
  onSelect,
}: WalletDropdownProps) => {
  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-lg overflow-hidden z-10">
      {wallets.map((wallet) => (
        <button
          key={wallet.id}
          onClick={() => onSelect(wallet)}
          className={`w-full px-2 py-3 flex items-center gap-2 transition-colors cursor-pointer ${
            currentWallet.id === wallet.id
              ? "bg-primary-100 dark:bg-neutral-700"
              : "hover:bg-primary-50 dark:hover:bg-neutral-700"
          }`}
        >
          <Image
            src={getCurrencyIcon(wallet.currency)}
            alt={wallet.currency}
            width={16}
            height={16}
          />
          <p className="text-sm font-medium text-neutral-800 dark:text-neutral-50">
            Belyfted {wallet.currency} Wallet - {wallet.currency}{" "}
            {formatCurrency(wallet.balance)}
          </p>
        </button>
      ))}
    </div>
  );
};

