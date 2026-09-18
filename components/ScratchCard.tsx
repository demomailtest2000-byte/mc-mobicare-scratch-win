'use client';

import { useEffect, useRef, useState } from 'react';

export function ScratchCard({ onRevealed }: { onRevealed: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const drawCover = () => {
      const box = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = Math.round(box.width * ratio);
      canvas.height = Math.round(box.height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.globalCompositeOperation = 'source-over';
      const gradient = context.createLinearGradient(0, 0, box.width, box.height);
      gradient.addColorStop(0, '#1627a8'); gradient.addColorStop(1, '#4056cf');
      context.fillStyle = gradient; context.fillRect(0, 0, box.width, box.height);
      context.fillStyle = '#ffffff'; context.textAlign = 'center'; context.font = '700 21px Arial';
      context.fillText('SCRATCH HERE', box.width / 2, box.height / 2 - 5);
      context.font = '14px Arial'; context.fillText('Swipe with your finger to reveal', box.width / 2, box.height / 2 + 24);
    };
    drawCover(); window.addEventListener('resize', drawCover);
    return () => window.removeEventListener('resize', drawCover);
  }, []);

  function scratch(event: React.PointerEvent<HTMLCanvasElement>) {
    if (revealed) return;
    const canvas = canvasRef.current; const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const box = canvas.getBoundingClientRect(); context.globalCompositeOperation = 'destination-out';
    context.beginPath(); context.arc(event.clientX - box.left, event.clientY - box.top, 30, 0, Math.PI * 2); context.fill();
    const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
    let cleared = 0;
    for (let index = 3; index < pixels.length; index += 64) if (pixels[index] < 32) cleared += 1;
    if (cleared / (pixels.length / 64) > 0.35) {
      setRevealed(true); canvas.style.opacity = '0'; onRevealed();
    }
  }

  return <canvas ref={canvasRef} className="scratch-canvas" aria-label="Scratch card: drag to reveal your gift"
    onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); scratch(event); }}
    onPointerMove={(event) => { if (event.currentTarget.hasPointerCapture(event.pointerId)) scratch(event); }} />;
}
