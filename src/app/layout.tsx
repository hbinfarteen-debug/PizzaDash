import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pizza Dash — Bulawayo's Finest Pizza Delivery",
  description:
    "Fresh, hand-crafted wood-fired pizza delivered to your door in Bulawayo. Six signature flavors, 24-hour proofed dough, and WhatsApp ordering. Open daily 10am–9pm.",
  keywords: [
    "Pizza Dash",
    "Bulawayo pizza",
    "pizza delivery Bulawayo",
    "wood-fired pizza Zimbabwe",
    "pizza delivery",
    "WhatsApp pizza order",
    "Bulawayo restaurant",
  ],
  authors: [{ name: "Pizza Dash" }],
  openGraph: {
    title: "Pizza Dash — Bulawayo's Finest Pizza",
    description:
      "Fresh, hand-crafted wood-fired pizza delivered across Bulawayo. Order via WhatsApp.",
    type: "website",
    locale: "en_ZW",
    siteName: "Pizza Dash",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizza Dash — Bulawayo's Finest Pizza",
    description:
      "Fresh, hand-crafted wood-fired pizza delivered across Bulawayo. Order via WhatsApp.",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍕</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${plusJakarta.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}