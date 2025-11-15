import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ThemeToggle } from "@/components/ui";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Belyfted Pay Integration Flow",
  description:
    "Pay seamlessly with Belyfted Pay: Fast and secure wallet payments",
  keywords: [
    "payment gateway",
    "wallet payment",
    "secure checkout",
    "belyfted",
    "multi-currency",
  ],
  authors: [{ name: "Belyfted" }],
  openGraph: {
    title: "Belyfted Pay - Secure Payment Integration",
    description: "Fast and secure wallet payments with Belyfted Pay",
    type: "website",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: "Belyfted Pay",
    description: "Secure wallet payments made easy",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased`}>
        <ThemeProvider>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
