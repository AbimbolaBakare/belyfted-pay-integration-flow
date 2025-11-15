"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Wallet } from "@/lib/types/payment";

interface PaymentContextType {
  amount: number;
  currency: string;
  merchantName: string;
  selectedWallet: Wallet | null;
  isAuthenticated: boolean;
  setAmount: (amount: number) => void;
  setCurrency: (currency: string) => void;
  setMerchantName: (name: string) => void;
  setSelectedWallet: (wallet: Wallet | null) => void;
  setIsAuthenticated: (isAuth: boolean) => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [amount, setAmount] = useState<number>(12000.0);
  const [currency, setCurrency] = useState<string>("GBP");
  const [merchantName, setMerchantName] = useState<string>("Jumia Limited");
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  return (
    <PaymentContext.Provider
      value={{
        amount,
        currency,
        merchantName,
        selectedWallet,
        isAuthenticated,
        setAmount,
        setCurrency,
        setMerchantName,
        setSelectedWallet,
        setIsAuthenticated,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};

