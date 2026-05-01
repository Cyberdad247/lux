'use client';

import GlassPanel from '@/components/GlassPanel';

const features = [
  {
    headline: 'Close High-Value Buyers',
    description: 'Built specifically for high-ticket transactions that need to move without friction or confusion.',
  },
  {
    headline: 'Built For Crypto Buyers',
    description: 'Designed to help close crypto buyers without losing the deal to payment hesitation.',
  },
  {
    headline: 'Flexible Deal Structuring',
    description: 'Adapt payment flow per transaction so your team can close the right deal the right way.',
  },
  {
    headline: 'White-Glove Onboarding',
    description: 'Real support for businesses preparing to move into the next crypto wave.',
  },
];

const FeatureCard = ({ headline, description, index }: { headline: string; description: string; index: number }) => (
  <GlassPanel
    delay={index * 0.1}
    whileHover={{ scale: 1.02 }}
    className="group flex flex-col gap-4 hover:border-[var(--color-gold)] hover:shadow-[0_0_24px_rgba(212,175,55,0.3)] transition-shadow duration-300 relative overflow-hidden"
  >
    {/* VP-04: shimmer top-edge on hover */}
    <div className="absolute top-0 left-0 right-0 h-px overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <div className="shimmer absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-gold)] to-transparent" />
    </div>
    <div className="h-8 w-8 rounded-full bg-[var(--color-gold)] opacity-80 group-hover:opacity-100 transition-opacity" />
    <h3 className="text-xl font-bold text-white">{headline}</h3>
    <p className="text-sm leading-relaxed text-white/60">{description}</p>
  </GlassPanel>
);

const FeaturesGrid = () => (
  <section className="w-full bg-[var(--color-obsidian)] py-20">
    <div className="mx-auto max-w-5xl px-6">
      <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-[var(--color-gold)]">
        Why Luxora
      </h2>
      <p className="mb-12 text-center text-3xl font-bold text-white">
        Trusted by businesses preparing for the next crypto wave
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesGrid;
