import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Luxora Payments — Close High-Value Buyers Using Crypto",
  description:
    "Institutional-grade OTC crypto infrastructure for HNWI merchants and dealerships. Accept Bitcoin, Ethereum, and USDC payments with dedicated white-glove support.",
  keywords: [
    "crypto OTC trading", "HNWI liquidity", "high-value crypto exchange",
    "merchant crypto payments", "institutional crypto", "OTC desk",
    "luxury crypto payments", "Luxora Payments", "crypto wire transfer",
    "B2B crypto settlement", "stablecoin payments", "bitcoin OTC",
    "ethereum OTC", "crypto for business", "accept bitcoin payments", "dealership crypto",
  ],
  alternates: { canonical: "https://www.luxorapayments.com" },
  openGraph: {
    title: "Luxora Payments — The Sovereign Standard for Crypto",
    description:
      "Never lose a high-value buyer because they want to pay in crypto. Institutional OTC infrastructure for HNWI merchants.",
    type: "website",
    url: "https://www.luxorapayments.com",
    siteName: "Luxora Payments",
    images: [{
      url: "https://www.luxorapayments.com/assets/luxora-canva-logo-hero.jpg",
      width: 1200,
      height: 630,
      alt: "Luxora Payments — Institutional Crypto Infrastructure",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxora Payments — Close High-Value Buyers Using Crypto",
    description: "Institutional-grade OTC crypto infrastructure for HNWI merchants.",
    images: ["https://www.luxorapayments.com/assets/luxora-canva-logo-hero.jpg"],
  },
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "Luxora Payments",
  url: "https://www.luxorapayments.com",
  logo: "https://www.luxorapayments.com/assets/luxora-canva-logo-hero.jpg",
  description:
    "Institutional-grade OTC crypto trading and payment solutions for HNWIs, dealerships, and high-ticket retailers.",
  serviceType: "CryptocurrencyExchange",
  areaServed: "Worldwide",
  currenciesAccepted: "BTC, ETH, USDC, USDT",
  paymentAccepted: "Cryptocurrency",
  priceRange: "$$$",
  contactPoint: {
    "@type": "ContactPoint",
    email: "partners@luxorapayments.com",
    contactType: "customer service",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Luxora Merchant Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "OTC Bitcoin Settlement" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Crypto Payment Gateway" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "HNWI Liquidity Desk" } },
    ],
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
