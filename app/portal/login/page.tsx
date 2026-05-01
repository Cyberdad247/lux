'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/portal/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        router.push(params.get('next') ?? '/portal');
      } else {
        setError('Invalid credentials.');
      }
    } catch {
      setError('Request failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-[10px] font-semibold tracking-widest text-[var(--color-gold)] uppercase mb-2">
          Access Key
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
          placeholder="••••••••"
          className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-gold)] focus:border-transparent transition-all placeholder:text-white/20 disabled:opacity-40"
        />
      </div>
      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-[var(--color-gold)] py-3.5 text-sm font-bold tracking-widest text-[var(--color-obsidian)] uppercase hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        {loading ? 'Authenticating…' : 'Enter Portal'}
      </button>
    </form>
  );
}

export default function PortalLogin() {
  return (
    <main className="min-h-screen bg-[var(--color-obsidian)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-8 shadow-xl">
        <p className="text-[10px] tracking-[0.4em] text-[var(--color-gold)] uppercase font-semibold text-center mb-1">
          Luxora Payments
        </p>
        <h1 className="text-2xl font-bold text-white text-center tracking-tight mb-8">
          Portal Access
        </h1>
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
