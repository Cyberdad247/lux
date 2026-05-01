'use client';

const ContactFooter = () => (
  <footer className="w-full border-t border-white/10 bg-[var(--color-obsidian)] py-16">
    <div className="mx-auto max-w-6xl px-6">
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
        <div className="space-y-4">
          <div className="text-[10px] tracking-[0.45em] uppercase text-[var(--color-gold)]">Speak with our team</div>
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            We assist businesses with onboarding and high-value transactions.
          </h2>
          <p className="max-w-2xl text-sm leading-7 text-white/55">
            We can set up anyone in the world on any part of the globe. It pays to partner with Luxora.
          </p>
          <p className="text-sm tracking-[0.28em] uppercase text-white/35">
            DONT MISS THE NEXT WAVE OF PAYMENTS
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs tracking-[0.35em] uppercase text-white/35">Contact us at</p>
          <div className="mt-4 space-y-3 text-sm">
            <a className="block text-[var(--color-gold)] hover:underline" href="mailto:partners@luxorapayments.com">
              partners@luxorapayments.com
            </a>
            <a className="block text-[var(--color-gold)] hover:underline" href="mailto:onboarding@luxorapayments.com">
              onboarding@luxorapayments.com
            </a>
          </div>
          <div className="mt-6 border-t border-white/10 pt-4 text-xs tracking-[0.24em] uppercase text-white/30">
            Instant global payments
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/30">
        © 2026 Luxora Payments. All rights reserved.
      </div>
    </div>
  </footer>
);

export default ContactFooter;
