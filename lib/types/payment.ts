export type PaymentMethod = "belyfted" | "card";

export type Currency = "GBP" | "NGN";

export interface Wallet {
  id: string;
  currency: Currency;
  balance: number;
}

export interface PaymentDetails {
  merchantName: string;
  amount: number;
  currency: Currency;
}
