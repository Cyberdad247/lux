// Lazy singleton — one popup DOM node for the whole session
let instance: { open: () => void; close: () => void } | null = null;

export async function openTypeform() {
  if (typeof window === 'undefined') return;
  if (!instance) {
    const { createPopup } = await import('@typeform/embed');
    instance = createPopup('hdu5Fujq', {
      hideHeaders: true,
      hideFooter: true,
      size: 80,
    });
  }
  instance.open();
}
