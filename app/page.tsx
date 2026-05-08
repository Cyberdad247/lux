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
        <div className="logo-reveal mb-4 w-full max-w-[min(84vw,340px)] sm:mb-8 sm:max-w-[min(86vw,520px)]" style={{ animationDelay: "0.12s" }}>
          <div className="relative overflow-hidden rounded-[18px] border border-[var(--color-gold)]/25 bg-black/70 shadow-[0_0_54px_rgba(212,175,55,0.28),0_18px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <Image
              src="/assets/luxora-canva-logo-hero.jpg"
              alt="Luxora Crypto Payments"
              width={3024}
              height={1664}
              className="block h-auto w-full object-contain saturate-110"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.03] via-transparent to-black/20" />
            <div className="pointer-events-none absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--color-gold-glow)]/70 to-transparent" />
            <div
              className="logo-glint pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-[var(--color-gold-glow)]/35 to-transparent blur-sm"
              style={{ animationDelay: "0.34s" }}
            />
          </div>
        </div>

        {/* Hero tagline — primary message */}
        <h1
          className="fade-up mb-3 px-2 text-center font-extralight leading-[1.02] tracking-tight text-white sm:mb-5"
          style={{ animationDelay: "0.42s" }}
        >
          <span className="block whitespace-nowrap text-[clamp(0.92rem,4vw,2.5rem)]">
            Accept{" "}
            <span className="italic text-[var(--color-gold)]">Bitcoin</span>{" "}
            Payments for your business
          </span>
          <span className="mt-1 block italic text-[clamp(0.92rem,4vw,2.5rem)] text-[var(--color-gold)] sm:mt-2">
            today
          </span>
        </h1>

        {/* Supporting value prop — demoted from H1 */}
        <div className="mb-3 overflow-hidden sm:mb-5">
          <p
            className="mask-reveal text-[11px] font-medium uppercase tracking-[0.32em] text-white/55 sm:text-xs sm:tracking-[0.38em]"
            style={{ animationDelay: "0.7s" }}
          >
            Close high-value buyers <span className="text-[var(--color-gold)]/85">using crypto</span>
          </p>
        </div>

        {/* Sub-text */}
        <p
          className="fade-up mb-4 max-w-[21rem] px-2 text-sm font-light leading-6 tracking-wide text-white/64 sm:mb-12 sm:max-w-xl sm:text-lg sm:tracking-wider"
          style={{ animationDelay: "0.86s" }}
        >
          <span className="block">Never lose a serious buyer</span>
          <span className="block">because they want to pay in crypto.</span>
          <span className="mt-2 block text-white/78 sm:mt-3">
            One deal could be $50,000+.
          </span>
        </p>

        {/* Primary CTA */}
        <div className="fade-up flex flex-col items-center gap-3 sm:gap-4" style={{ animationDelay: "1.0s" }}>
          <MagicButton label="Start Application" />
          <a
            href="mailto:partners@luxorapayments.com"
            className="rounded-full border border-white/30 px-10 py-5 text-sm font-bold uppercase tracking-[0.26em] text-white/85 transition-colors hover:border-[var(--color-gold)] hover:text-[var(--color-gold)] sm:px-14 sm:py-6 sm:text-base sm:tracking-[0.3em]"
          >
            Speak With Our Team
          </a>
          <p className="max-w-sm text-center text-[11px] tracking-[0.18em] uppercase text-white/38">
            Currently onboarding dealerships and high-ticket retailers
          </p>
        </div>

        {/* Trust indicators */}
        <div
          className="fade-up mt-8 flex max-w-2xl flex-wrap justify-center gap-2.5 sm:mt-14 sm:gap-4"
          style={{ animationDelay: "1.3s" }}
        >
          {["CLOSE DEALS", "INSTANT USD", "GLOBAL ONBOARDING", "WHITE-GLOVE SETUP"].map((tag) => (
            <div
              key={tag}
              className="relative overflow-hidden rounded-2xl border border-white/10"
              style={{ minWidth: "min(42vw, 128px)" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center scale-110"
                style={{ backgroundImage: "url('/assets/card-bg.png')" }}
              />
              <div className="absolute inset-0 bg-[var(--color-obsidian)]/75" />
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-gold)]/08 to-transparent" />
              <div className="relative z-10 px-4 py-2.5 text-center text-[9px] font-medium uppercase tracking-[0.22em] text-white/60 sm:px-5 sm:py-3 sm:text-[10px] sm:tracking-[0.3em]">
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
