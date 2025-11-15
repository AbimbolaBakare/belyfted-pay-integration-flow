const CURRENCY_ICONS: Record<string, string> = {
  GBP: "/assets/uk-icon.svg",
  NGN: "/assets/nigeria-icon.svg",
};

export const getCurrencyIcon = (currency: string) =>
  CURRENCY_ICONS[currency] || "/assets/wallet-icon.svg";

