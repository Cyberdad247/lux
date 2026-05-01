import GlassPanel from '@/components/GlassPanel';
import Link from 'next/link';

export const metadata = {
  title: 'Merchant Portal — Luxora Payments',
};

export default function PortalPage() {
  return (
    <main className="min-h-screen bg-[var(--color-obsidian)] p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Merchant Command Portal</h1>
            <p className="text-white/30 mt-1 text-[10px] tracking-[0.4em] uppercase">Sovereign Access</p>
          </div>
          <Link
            href="/api/portal/logout"
            className="text-[10px] tracking-widest text-white/30 uppercase hover:text-white/60 transition-colors"
          >
            Sign Out
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          <GlassPanel delay={0}>
            <p className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.3em] font-semibold mb-4">
              Active Transactions
            </p>
            <p className="text-5xl font-bold text-white tabular-nums">—</p>
            <p className="text-white/30 text-xs mt-3">Live feed — connect Supabase to activate</p>
          </GlassPanel>

          <GlassPanel delay={0.12}>
            <p className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.3em] font-semibold mb-4">
              Settlement Status
            </p>
            <p className="text-5xl font-bold text-white">—</p>
            <p className="text-white/30 text-xs mt-3">Last settlement: awaiting data</p>
          </GlassPanel>

          <GlassPanel delay={0.24}>
            <p className="text-[var(--color-gold)] text-[10px] uppercase tracking-[0.3em] font-semibold mb-4">
              Referral Code
            </p>
            <p className="text-2xl font-mono font-bold text-white tracking-[0.2em]">—</p>
            <p className="text-white/30 text-xs mt-3">Linked to your merchant account</p>
          </GlassPanel>
        </div>

        <p className="mt-16 text-center text-[10px] tracking-widest text-white/20 uppercase">
          Luxora Payments · Sovereign Infrastructure · v1.0
        </p>
      </div>
    </main>
  );
}
