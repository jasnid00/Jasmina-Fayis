import React, { useRef, useState, useEffect } from 'react';

interface RosePetalsProps {
  enabled?: boolean;
}

export const RosePetals: React.FC<RosePetalsProps> = ({ enabled = true }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isEnabled, setIsEnabled] = useState(enabled);
  const [density] = useState<'gentle' | 'lush'>('gentle');

  const petalColors = [
    '#6b1024',
    '#84162e',
    '#9e1f3a',
    '#b84d63',
    '#d98294',
    '#f2b8c3',
  ];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsEnabled(false);
    }
  }, []);

  useEffect(() => {
    if (!isEnabled) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (canvas) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);

    const count =
      density === 'lush'
        ? width < 768
          ? 24
          : 45
        : width < 768
        ? 14
        : 28;

    const createPetal = (initialY?: number) => ({
      x: Math.random() * width,
      y: initialY === undefined ? Math.random() * -height * 0.5 : initialY,
      size: Math.random() * 12 + 10,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 1.5,
      flip: Math.random() * Math.PI,
      flipSpeed: Math.random() * 0.03 + 0.01,
      opacity: Math.random() * 0.45 + 0.45,
      color: petalColors[Math.floor(Math.random() * petalColors.length)],
      swayAmplitude: Math.random() * 25 + 15,
      swayFrequency: Math.random() * 0.008 + 0.004,
      swayOffset: Math.random() * Math.PI * 2,
    });

    const petals: ReturnType<typeof createPetal>[] = [];
    for (let i = 0; i < count; i++) {
      petals.push(createPetal(Math.random() * height));
    }

    let frame = 0;
    const drawPetal = (p: ReturnType<typeof createPetal>) => {
      ctx.save();
      const sway = Math.sin(frame * p.swayFrequency + p.swayOffset) * p.swayAmplitude;
      ctx.translate(p.x + sway, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.scale(1, Math.cos(p.flip));
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;

      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.6, p.size * 1.1, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size * 1.1, p.size * 0.5, -p.size * 0.9, -p.size * 0.6, 0, -p.size);
      ctx.fill();

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.7);
      ctx.lineTo(0, p.size * 0.7);
      ctx.stroke();

      ctx.restore();
    };

    const loop = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);
      petals.forEach((p, idx) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        p.flip += p.flipSpeed;

        if (p.y > height + 40 || p.x < -60 || p.x > width + 60) {
          petals[idx] = createPetal(-20);
        }
        drawPetal(p);
      });
      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isEnabled, density]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
    />
  );
};
