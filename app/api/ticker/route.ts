import { NextResponse } from 'next/server';

export const revalidate = 60; // ISR: refresh every 60s

interface CoinGeckoResponse {
  bitcoin?:  { usd: number; usd_24h_change: number };
  ethereum?: { usd: number; usd_24h_change: number };
  solana?:   { usd: number; usd_24h_change: number };
}

const FALLBACK = [
  { symbol: 'BTC', price: 0, change24h: 0 },
  { symbol: 'ETH', price: 0, change24h: 0 },
  { symbol: 'SOL', price: 0, change24h: 0 },
];

export async function GET() {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true',
      { next: { revalidate: 60 } }
    );

    if (!res.ok) return NextResponse.json(FALLBACK);

    const data: CoinGeckoResponse = await res.json();

    const tickers = [
      { symbol: 'BTC', price: data.bitcoin?.usd ?? 0,  change24h: data.bitcoin?.usd_24h_change ?? 0 },
      { symbol: 'ETH', price: data.ethereum?.usd ?? 0, change24h: data.ethereum?.usd_24h_change ?? 0 },
      { symbol: 'SOL', price: data.solana?.usd ?? 0,   change24h: data.solana?.usd_24h_change ?? 0 },
    ];

    return NextResponse.json(tickers, {
      headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120' },
    });
  } catch {
    return NextResponse.json(FALLBACK);
  }
}
