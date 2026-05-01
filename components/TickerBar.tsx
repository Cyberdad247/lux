'use client';

export interface TickerItem {
  symbol: string;
  price: number;
  change24h: number;
}

interface TickerBarProps {
  tickers: TickerItem[];
}

export default function TickerBar({ tickers }: TickerBarProps) {
  if (!tickers?.length) return null;

  const items = [...tickers, ...tickers]; // duplicate for seamless loop

  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track { animation: ticker-scroll 36s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="relative w-full overflow-hidden bg-[var(--color-obsidian)] border-b border-white/10 h-9 flex items-center">
        {/* LIVE badge */}
        <div className="flex-shrink-0 flex items-center gap-1.5 pl-4 pr-3 border-r border-white/[0.08]">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[9px] font-light tracking-[0.3em] uppercase text-emerald-400/80 select-none">
            Live
          </span>
        </div>

        <div className="flex items-center whitespace-nowrap ticker-track overflow-hidden">
          {items.map((t, i) => (
            <span key={i} className="flex items-center mx-6 gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                {t.symbol}
              </span>
              <span className="text-[11px] font-mono text-white">
                ${t.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`text-[11px] font-mono ${t.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {t.change24h >= 0 ? '▲' : '▼'} {Math.abs(t.change24h).toFixed(2)}%
              </span>
              <span className="text-[#D4AF37]/40 text-sm select-none mx-2">·</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
