import Hero from "@/components/Hero";
import MagicButton from "@/components/MagicButton";
import TrustBanner from "@/components/TrustBanner";
import FeaturesGrid from "@/components/FeaturesGrid";
import UrgencyCTA from "@/components/UrgencyCTA";
import ContactFooter from "@/components/ContactFooter";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#0A0A0B]">
      <TrustBanner />

      <Hero>
        {/* Luxora Logo */}
        <div className="mb-10 fade-up" style={{ animationDelay: "0.1s" }}>
          <Image
            src="/assets/logo.png"
            alt="Luxora"
            width={96}
            height={96}
            className="object-contain drop-shadow-[0_0_32px_rgba(212,175,55,0.5)]"
            priority
          />
        </div>

        {/* Headline — mask-reveal */}
        <div className="mb-4 overflow-hidden">
          <h1
            className="mask-reveal text-4xl sm:text-6xl font-extralight tracking-tight text-white leading-tight"
            style={{ animationDelay: "0.3s" }}
          >
            CLOSE HIGH-VALUE BUYERS
            <br />
            <span className="text-[#D4AF37]">USING CRYPTO.</span>
          </h1>
        </div>

        {/* Sub-text */}
        <p
          className="fade-up text-white/50 text-base sm:text-lg tracking-wider font-light mb-16 max-w-xl"
          style={{ animationDelay: "0.7s" }}
        >
          We make sure you never lose a serious buyer just because they want to pay in crypto.
        </p>

        {/* Primary CTA */}
        <div className="fade-up" style={{ animationDelay: "1.0s" }}>
          <MagicButton href="/ref/merchant" label="START ACCEPTING TODAY" />
        </div>

        {/* Trust indicators */}
        <div
          className="fade-up mt-20 flex flex-wrap justify-center gap-4"
          style={{ animationDelay: "1.3s" }}
        >
          {["NO CHARGEBACKS", "INSTANT USD", "LOWER FEES", "WHITE-GLOVE SETUP"].map((tag) => (
            <div
              key={tag}
              className="relative overflow-hidden rounded-2xl border border-white/10"
              style={{ minWidth: "130px" }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center scale-110"
                style={{ backgroundImage: "url('/assets/card-bg.png')" }}
              />
              <div className="absolute inset-0 bg-[#0A0A0B]/75" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/08 to-transparent" />
              <div className="relative z-10 px-5 py-3 text-[10px] tracking-[0.3em] text-white/60 uppercase font-medium text-center">
                {tag}
              </div>
            </div>
          ))}
        </div>
      </Hero>

      <FeaturesGrid />
      <UrgencyCTA />
      <ContactFooter />
    </main>
  );
}
