'use client';

import { useRef, useEffect } from 'react';

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  opacity: number; size: number;
  depth: number;
}

export default function WebGLHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf: number;
    let particles: Particle[] = [];

    const init = () => {
      const count = Math.max(90, Math.min(150, Math.floor((canvas.width * canvas.height) / 14000)));
      particles = Array.from({ length: count }, () => ({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        vx:      (Math.random() - 0.5) * 0.28,
        vy:      (Math.random() - 0.5) * 0.28,
        opacity: Math.random() * 0.18 + 0.06,
        size:    Math.random() * 2.4 + 0.55,
        depth:   Math.random(),
      }));
    };

    const resize = () => {
      const { offsetWidth: w, offsetHeight: h } = canvas;
      // Preserve particle positions proportionally
      const scaleX = w / (canvas.width  || 1);
      const scaleY = h / (canvas.height || 1);
      particles.forEach(p => { p.x *= scaleX; p.y *= scaleY; });
      canvas.width  = w;
      canvas.height = h;
      if (particles.length === 0) init();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const horizonY = canvas.height * 0.58;
      const vanishingX = canvas.width * 0.5;
      const gradient = ctx.createRadialGradient(vanishingX, horizonY, 20, vanishingX, horizonY, canvas.width * 0.7);
      gradient.addColorStop(0, 'rgba(212,175,55,0.22)');
      gradient.addColorStop(0.42, 'rgba(212,175,55,0.06)');
      gradient.addColorStop(1, 'rgba(212,175,55,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.strokeStyle = 'rgba(212,175,55,0.085)';
      ctx.lineWidth = 1;
      for (let i = -5; i <= 5; i++) {
        ctx.beginPath();
        ctx.moveTo(vanishingX, horizonY);
        ctx.lineTo(canvas.width * (0.5 + i * 0.18), canvas.height);
        ctx.stroke();
      }
      for (let y = horizonY + 28; y < canvas.height; y += Math.max(18, (y - horizonY) * 0.22)) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.restore();

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (0.7 + p.depth), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.opacity})`;
        ctx.fill();

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0)             p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0)             p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      }
      raf = requestAnimationFrame(draw);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    init();
    draw();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-90 mix-blend-screen"
      style={{ zIndex: 1 }}
      aria-hidden
    />
  );
}
