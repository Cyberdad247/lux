import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxora — The Sovereign Standard",
  description:
    "Uncompromising crypto infrastructure. Dedicated support. The invisible gate for HNWI merchants.",
  keywords: ["crypto OTC", "HNWI", "high-value liquidity", "merchant crypto", "Luxora"],
  openGraph: {
    title: "Luxora — The Sovereign Standard",
    description: "Uncompromising crypto infrastructure for high-value merchants.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Luxora",
  description:
    "The sovereign standard for high-value crypto liquidity. Dedicated OTC infrastructure for HNWI merchants.",
  serviceType: "CryptocurrencyExchange",
  areaServed: "Worldwide",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Luxora Merchant Services",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
