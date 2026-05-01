'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function RefCapture() {
  const params = useSearchParams();
  useEffect(() => {
    const ref = params.get('ref');
    if (ref && /^[a-zA-Z0-9_-]{1,64}$/.test(ref)) {
      sessionStorage.setItem('lx_ref', ref);
    }
  }, [params]);
  return null;
}
