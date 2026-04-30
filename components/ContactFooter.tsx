'use client';

const ContactFooter = () => (
  <footer className="w-full border-t border-white/10 bg-[#0A0A0B] py-12 text-center">
    <div className="mx-auto max-w-6xl px-6">
      <div className="mb-2 text-2xl font-extrabold tracking-widest text-[var(--color-gold)]">LUXORA</div>
      <p className="mb-4 text-sm text-white/50">Professional Crypto Transaction Infrastructure</p>
      <a
        href="mailto:partners@luxorapayments.com"
        className="mb-6 inline-block text-sm text-[var(--color-gold)] hover:underline"
      >
        partners@luxorapayments.com
      </a>
      <p className="text-xs text-white/30">© 2026 Luxora Payments. All rights reserved.</p>
    </div>
  </footer>
);

export default ContactFooter;
