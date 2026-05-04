import Hero from "@/components/Hero";
import MagicButton from "@/components/MagicButton";
import TrustBanner from "@/components/TrustBanner";
import TickerBar from "@/components/TickerBar";
import FeaturesGrid from "@/components/FeaturesGrid";
import UrgencyCTA from "@/components/UrgencyCTA";
import ContactFooter from "@/components/ContactFooter";
import VipSection from "@/components/VipSection";
import SectionReveal from "@/components/SectionReveal";
import RefCapture from "@/components/RefCapture";
import Image from "next/image";
import { Suspense } from "react";

const TICKER_FALLBACK = [
  { symbol: "BTC",  price: 0, change24h: 0 },
  { symbol: "ETH",  price: 0, change24h: 0 },
  { symbol: "SOL",  price: 0, change24h: 0 },
  { symbol: "USDC", price: 1, change24h: 0 },
];

async function getTickers() {
  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,usd-coin&vs_currencies=usd&include_24hr_change=true",
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return TICKER_FALLBACK;
    const data = await res.json();
    return [
      { symbol: "BTC",  price: data.bitcoin?.usd           ?? 0, change24h: data.bitcoin?.usd_24h_change           ?? 0 },
      { symbol: "ETH",  price: data.ethereum?.usd          ?? 0, change24h: data.ethereum?.usd_24h_change          ?? 0 },
      { symbol: "SOL",  price: data.solana?.usd             ?? 0, change24h: data.solana?.usd_24h_change             ?? 0 },
      { symbol: "USDC", price: data["usd-coin"]?.usd       ?? 1, change24h: data["usd-coin"]?.usd_24h_change       ?? 0 },
    ];
  } catch {
    return TICKER_FALLBACK;
  }
}

export default async function Home() {
  const tickers = await getTickers();

  return (
    <main className="bg-[var(--color-obsidian)]">
      <Suspense fallback={null}><RefCapture /></Suspense>
      <TickerBar tickers={tickers} />
      <TrustBanner />

      <Hero>
        {/* Luxora Logo */}
        <div className="mb-6 sm:mb-10 fade-up" style={{ animationDelay: "0.1s" }}>
          <Image
            src="/assets/luxora-logo.jpg"
            alt="Luxora Crypto Payments"
            width={300}
            height={300}
            className="h-28 w-28 rounded-full object-cover object-top drop-shadow-[0_0_32px_rgba(212,175,55,0.5)] sm:h-36 sm:w-36"
            priority
          />
        </div>

        {/* Headline — mask-reveal */}
        <div className="mb-4 overflow-hidden">
          <h1
            className="mask-reveal text-[clamp(1.8rem,8.5vw,4rem)] lg:text-6xl font-extralight tracking-normal text-white leading-tight"
            style={{ animationDelay: "0.3s" }}
          >
            <span className="block lg:inline">CLOSE</span>
            <span className="hidden lg:inline"> </span>
            <span className="block lg:inline">HIGH-VALUE</span>
            <span className="hidden lg:inline"> </span>
            <span className="block lg:inline">BUYERS</span>
            <br />
            <span className="text-[var(--color-gold)]">USING CRYPTO.</span>
          </h1>
        </div>

        {/* Sub-text */}
        <p
          className="fade-up text-white/55 text-sm sm:text-lg tracking-wider font-light mb-10 sm:mb-16 max-w-xl px-1"
          style={{ animationDelay: "0.7s" }}
        >
          Never lose a serious buyer because they want to pay in crypto.
          <span className="block mt-3 text-white/75">
            One deal could be $50,000+.
          </span>
        </p>

        {/* Primary CTA */}
        <div className="fade-up flex flex-col items-center gap-4" style={{ animationDelay: "1.0s" }}>
          <MagicButton label="Start Application" />
          <a
            href="mailto:partners@luxorapayments.com"
            className="rounded-full border border-white/15 px-6 py-3 text-[11px] font-semibold tracking-[0.22em] uppercase text-white/70 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)]"
          >
            Speak With Our Team
          </a>
          <p className="max-w-sm text-center text-[11px] tracking-[0.18em] uppercase text-white/38">
            Currently onboarding dealerships and high-ticket retailers
          </p>
        </div>

        {/* Trust indicators */}
        <div
          className="fade-up mt-12 sm:mt-20 flex flex-wrap justify-center gap-3 sm:gap-4"
          style={{ animationDelay: "1.3s" }}
        >
          {["CLOSE DEALS", "INSTANT USD", "GLOBAL ONBOARDING", "WHITE-GLOVE SETUP"].map((tag) => (
            <div
              key={tag}
              className="relative overflow-hidden rounded-2xl border border-white/10"
              style={{ minWidth: "min(42vw, 130px)" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center scale-110"
                style={{ backgroundImage: "url('/assets/card-bg.png')" }}
              />
              <div className="absolute inset-0 bg-[var(--color-obsidian)]/75" />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)]/08 to-transparent" />
              <div className="relative z-10 px-5 py-3 text-[10px] tracking-[0.3em] text-white/60 uppercase font-medium text-center">
                {tag}
              </div>
            </div>
          ))}
        </div>
      </Hero>

      <SectionReveal delay={0.05}><FeaturesGrid /></SectionReveal>
      <SectionReveal delay={0.08}><UrgencyCTA /></SectionReveal>
      <SectionReveal delay={0.05}><ContactFooter /></SectionReveal>
      <SectionReveal delay={0.05}><VipSection /></SectionReveal>
    </main>
  );
}
