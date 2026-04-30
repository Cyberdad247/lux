'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface MerchantApplyFormProps {
  refCode?: string;
}

const BUSINESS_TYPES = ['Exotic Cars', 'Jewelry & Watches', 'Boutique Hotels', 'Luxury Furniture'];
const VOLUMES = ['Under $50k', '$50k – $250k', '$250k – $1M', 'Over $1M'];

const SELECT_ARROW = `url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23D4AF37'%3E%3Cpath fill-rule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clip-rule='evenodd' /%3E%3C/svg%3E")`;

export default function MerchantApplyForm({ refCode = '' }: MerchantApplyFormProps) {
  const [state, setState] = useState<FormState>('idle');
  const [fields, setFields] = useState({
    businessName: '',
    businessType: BUSINESS_TYPES[0],
    email: '',
    monthlyVolume: VOLUMES[0],
  });

  const set = (k: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFields(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state !== 'idle') return;
    setState('submitting');
    try {
      const res = await fetch('/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, refCode }),
      });
      setState(res.ok ? 'success' : 'error');
    } catch {
      setState('error');
    }
  };

  const inputCls = 'w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all placeholder:text-white/30 disabled:opacity-40';
  const selectStyle = { backgroundImage: SELECT_ARROW, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center', backgroundSize: '1.25em' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl"
    >
      {/* Overlay states */}
      <AnimatePresence mode="wait">
        {state === 'submitting' && (
          <motion.div
            key="submitting"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--color-obsidian)]/92 rounded-2xl"
          >
            <motion.div
              className="relative w-20 h-20"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
            >
              <div className="absolute inset-0 rounded-full"
                style={{ background: 'conic-gradient(from 0deg, var(--color-gold) 0%, transparent 60%)' }} />
              <div className="absolute inset-1.5 rounded-full bg-[var(--color-obsidian)]" />
            </motion.div>
            <p className="mt-4 text-sm tracking-[0.3em] text-[var(--color-gold)] uppercase font-semibold">Authenticating…</p>
          </motion.div>
        )}

        {state === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--color-obsidian)]/92 rounded-2xl text-center px-8"
          >
            <svg className="w-16 h-16 text-[var(--color-gold)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <motion.path
                strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
              />
            </svg>
            <motion.h3
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              className="mt-4 text-xl font-bold text-[var(--color-gold)] tracking-wide"
            >
              MERCHANT ACCESS REQUESTED
            </motion.h3>
            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
              className="mt-2 text-sm text-white/60"
            >
              Our team will contact you within 24 hours.
            </motion.p>
          </motion.div>
        )}

        {state === 'error' && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[var(--color-obsidian)]/92 rounded-2xl text-center px-8"
          >
            <p className="text-red-400 font-semibold mb-4">Submission failed. Please try again.</p>
            <button onClick={() => setState('idle')} className="text-[var(--color-gold)] text-sm underline">Retry</button>
          </motion.div>
        )}
      </AnimatePresence>

      <h2 className="text-2xl font-bold text-white mb-1 text-center tracking-tight">Apply for Access</h2>
      <p className="text-white/40 text-sm text-center mb-8">Sovereign Merchants Only</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="businessName" className="block text-xs font-semibold tracking-widest text-[var(--color-gold)] uppercase mb-2">Business Name</label>
          <input id="businessName" type="text" required placeholder="e.g. Prestige Motors LLC"
            className={inputCls} value={fields.businessName} onChange={set('businessName')} disabled={state !== 'idle'} />
        </div>
        <div>
          <label htmlFor="businessType" className="block text-xs font-semibold tracking-widest text-[var(--color-gold)] uppercase mb-2">Business Type</label>
          <select id="businessType" required className={`${inputCls} appearance-none`} style={selectStyle}
            value={fields.businessType} onChange={set('businessType')} disabled={state !== 'idle'}>
            {BUSINESS_TYPES.map(t => <option key={t} value={t} className="bg-[var(--color-obsidian)] text-white">{t}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold tracking-widest text-[var(--color-gold)] uppercase mb-2">Email Address</label>
          <input id="email" type="email" required placeholder="you@business.com"
            className={inputCls} value={fields.email} onChange={set('email')} disabled={state !== 'idle'} />
        </div>
        <div>
          <label htmlFor="volume" className="block text-xs font-semibold tracking-widest text-[var(--color-gold)] uppercase mb-2">Monthly Volume</label>
          <select id="volume" required className={`${inputCls} appearance-none`} style={selectStyle}
            value={fields.monthlyVolume} onChange={set('monthlyVolume')} disabled={state !== 'idle'}>
            {VOLUMES.map(v => <option key={v} value={v} className="bg-[var(--color-obsidian)] text-white">{v}</option>)}
          </select>
        </div>
        {refCode && <input type="hidden" name="refCode" value={refCode} />}

        <button type="submit" disabled={state !== 'idle'}
          className="w-full mt-2 rounded-full bg-[var(--color-gold)] py-3.5 text-sm font-bold tracking-widest text-[var(--color-obsidian)] uppercase hover:opacity-90 transition-opacity disabled:opacity-40">
          Submit Application
        </button>
      </form>
    </motion.div>
  );
}
