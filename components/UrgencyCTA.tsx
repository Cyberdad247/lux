'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const UrgencyCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px 0px' });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 48 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="w-full border-t border-white/10 bg-[#0D0D0F] py-24 text-center"
    >
      <div className="mx-auto max-w-4xl px-6">
        <h2 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          CLOSE HIGH-VALUE BUYERS<br className="hidden sm:block" /> USING CRYPTO
        </h2>
        <p className="mb-4 text-lg text-white/70 md:text-xl">
          We make sure you never lose a serious buyer just because they want to pay in crypto.
        </p>
        <p className="mb-10 text-base font-semibold text-[#C9A84C]">
          Now onboarding a limited number of businesses ahead of the next market cycle.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-[#C9A84C] px-9 py-3.5 text-base font-bold text-[#0A0A0B] transition-opacity hover:opacity-90"
          >
            Start Accepting Today
          </motion.a>
          <motion.a
            href="#"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full border border-[#C9A84C] px-9 py-3.5 text-base font-bold text-[#C9A84C] transition-colors hover:bg-[#C9A84C] hover:text-[#0A0A0B]"
          >
            Request Concierge Access
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
};

export default UrgencyCTA;
