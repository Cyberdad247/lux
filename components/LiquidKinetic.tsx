'use client';

import { useEffect, useRef, useState } from 'react';

export default function LiquidKinetic() {
  const [pos, setPos]           = useState({ x: -200, y: -200 });
  const [intensity, setIntensity] = useState(0.04);
  const lastPos = useRef({ x: 0, y: 0 });
  const velRef  = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const dx = e.clientX - lastPos.current.x;
      const dy = e.clientY - lastPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // EMA decay + DNA velocity_factor 0.07, max 0.13
      velRef.current = velRef.current * 0.88 + (speed / 100) * 0.12;
      setIntensity(Math.min(0.04 + velRef.current * 0.07, 0.13));
      setPos({ x: e.clientX, y: e.clientY });
      lastPos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const ringOpacity  = 0.4 + intensity * 4.6;
  const glowRadius   = Math.round(6 + intensity * 50);
  const glowOpacity  = intensity * 1.8;

  return (
    <div
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{ left: pos.x, top: pos.y }}
      aria-hidden
    >
      <div className="relative w-5 h-5">
        <div
          className="absolute inset-0 rounded-full border"
          style={{
            borderColor: `rgba(212,175,55,${ringOpacity})`,
            boxShadow:   `0 0 ${glowRadius}px rgba(212,175,55,${glowOpacity})`,
            transition:  'border-color 80ms linear, box-shadow 80ms linear',
          }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-[#D4AF37]" />
      </div>
    </div>
  );
}
