'use client';

interface TickerItem {
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
        .ticker-track { animation: ticker-scroll 32s linear infinite; }
        .ticker-track:hover { animation-play-state: paused; }
      `}</style>

      <div className="relative w-full overflow-hidden bg-[var(--color-obsidian)] border-b border-white/10 h-9 flex items-center">
        <div className="flex items-center whitespace-nowrap ticker-track">
          {items.map((t, i) => (
            <span key={i} className="flex items-center mx-6 gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[var(--color-gold)]">
                {t.symbol}
              </span>
              <span className="text-[11px] font-mono text-white">
                ${t.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              <span className={`text-[11px] font-mono ${t.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {t.change24h >= 0 ? '▲' : '▼'} {Math.abs(t.change24h).toFixed(2)}%
              </span>
              <span className="text-[var(--color-gold)]/40 text-sm select-none mx-2">·</span>
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
