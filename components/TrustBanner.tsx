'use client';

const TrustBanner = () => {
  return (
    <div className="w-full border-b border-white/10 bg-[#0A0A0B]/95 px-4 py-2.5 text-center backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-1 text-[10px] font-medium uppercase tracking-[0.24em] sm:flex-row sm:gap-4 sm:text-[11px]">
        <span className="text-[var(--color-gold)]">Instant global payments</span>
        <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
        <span className="text-white/55">Dealerships and high-ticket retailers</span>
        <span className="hidden h-1 w-1 rounded-full bg-white/25 sm:block" />
        <span className="text-white/38">Currently onboarding select U.S. businesses</span>
      </div>
    </div>
  );
};

export default TrustBanner;
