'use client';

import { motion } from 'framer-motion';

const features = [
  {
    headline: 'No Chargebacks',
    description: 'Eliminate fraud risk on high-ticket deals. Every crypto transaction is final — no reversals, no disputes.',
  },
  {
    headline: 'Instant USD Settlement',
    description: 'Auto-convert to USD the moment payment clears. Zero market exposure, zero volatility risk.',
  },
  {
    headline: 'Lower Fees',
    description: 'Stop losing margin to Visa and Mastercard. Crypto rails cost a fraction of traditional card processing.',
  },
  {
    headline: 'Crypto Buyer Network',
    description: 'Get listed on our exclusive Crypto-Friendly Dealer directory — so high-net-worth buyers find you first.',
  },
];

const FeatureCard = ({ headline, description }: { headline: string; description: string }) => (
  <motion.div
    className="group flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
    whileHover={{ scale: 1.02, boxShadow: '0 0 24px rgba(201,168,76,0.35)' }}
    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    style={{ borderColor: undefined }}
    whileFocus={{ borderColor: '#C9A84C' }}
  >
    <div className="h-8 w-8 rounded-full bg-[#C9A84C] opacity-90 group-hover:opacity-100 transition-opacity" />
    <h3 className="text-xl font-bold text-white">{headline}</h3>
    <p className="text-sm leading-relaxed text-white/60">{description}</p>
  </motion.div>
);

const FeaturesGrid = () => (
  <section className="w-full bg-[#0A0A0B] py-20">
    <div className="mx-auto max-w-5xl px-6">
      <h2 className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-[#C9A84C]">
        Why Luxora
      </h2>
      <p className="mb-12 text-center text-3xl font-bold text-white">
        Built specifically for high-ticket transactions
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesGrid;
