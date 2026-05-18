export function openBitflowApplication() {
  if (typeof window === 'undefined') return;
  const ref = sessionStorage.getItem('lx_ref') ?? undefined;
  const base = 'https://merchant.getbitflow.com/sign-up';
  const params = new URLSearchParams({ code: 'BF-185C14' });
  if (ref && /^[a-zA-Z0-9_-]{1,64}$/.test(ref)) params.set('ref', ref);
  window.open(`${base}?${params.toString()}`, '_blank', 'noopener,noreferrer');
}

// Legacy alias — kept for components still calling openTypeform()
export const openTypeform = openBitflowApplication;
