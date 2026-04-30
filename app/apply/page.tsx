import TypeformWidget from '@/components/TypeformWidget';
import Link from 'next/link';

export const metadata = {
  title: 'Apply for Access — Luxora Payments',
  description: 'Sovereign merchant application for crypto payment acceptance.',
};

export default function ApplyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-obsidian)] flex flex-col">
      {/* Prestige header bar */}
      <div className="shrink-0 h-14 flex items-center justify-between px-6 border-b border-white/10">
        <Link href="/" className="text-[10px] tracking-[0.35em] text-white/30 uppercase hover:text-white/60 transition-colors">
          ← Back
        </Link>
        <span className="text-[10px] tracking-[0.4em] text-[var(--color-gold)] uppercase font-semibold">
          Luxora Payments — Merchant Access
        </span>
        <span className="w-16" />
      </div>

      {/* Full-height Typeform embed */}
      <div className="flex-1" style={{ height: 'calc(100vh - 3.5rem)' }}>
        <TypeformWidget />
      </div>
    </main>
  );
}
