'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { openTypeform } from '@/lib/typeformPopup';

const UrgencyCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full border-t border-white/10 bg-[var(--color-obsidian-lift)] py-24 text-center"
    >
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          CLOSE HIGH-VALUE BUYERS<br className="hidden sm:block" /> USING CRYPTO
        </h2>
        <p className="mb-4 text-lg text-white/70 md:text-xl">
          Never lose a serious buyer because they want to pay in crypto.
        </p>
        <p className="mb-3 text-base font-semibold text-[var(--color-gold)]">
          One deal could be $50,000+.
        </p>
        <p className="mb-10 text-sm tracking-[0.25em] uppercase text-white/35">
          DONT MISS THE NEXT WAVE OF PAYMENTS
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <motion.button
            onClick={openTypeform}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-[var(--color-gold)] px-9 py-3.5 text-base font-bold text-[var(--color-obsidian)] transition-opacity hover:opacity-90"
          >
            Start Application
          </motion.button>
          <motion.a
            href="mailto:partners@luxorapayments.com"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-[var(--color-gold)] px-9 py-3.5 text-base font-bold text-[var(--color-gold)] transition-colors hover:bg-[var(--color-gold)] hover:text-[var(--color-obsidian)]"
          >
            Speak With Our Team
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
};

export default UrgencyCTA;
