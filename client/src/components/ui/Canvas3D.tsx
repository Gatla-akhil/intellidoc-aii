import React, { useEffect, useRef } from 'react';

export const Canvas3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const nodes = [
      { label: 'Invoice #INV-8849', color: '#06b6d4', r: 35, speed: 0.01 },
      { label: 'MSA Contract 2026', color: '#818cf8', r: 28, speed: 0.015 },
      { label: 'Resume Dr. Vance', color: '#c084fc', r: 30, speed: 0.008 },
      { label: 'Tax W-2 Record', color: '#34d399', r: 25, speed: 0.012 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      angle += 0.005;

      // Draw Orbit Center Node
      ctx.beginPath();
      ctx.arc(centerX, centerY, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#06b6d4';
      ctx.shadowBlur = 20;
      ctx.shadowColor = '#06b6d4';
      ctx.fill();

      // Render orbiting 3D Document Nodes
      nodes.forEach((node, i) => {
        const orbitRadius = 110 + i * 25;
        const currentAngle = angle * (i % 2 === 0 ? 1 : -1) + (i * Math.PI) / 2;
        const x = centerX + Math.cos(currentAngle) * orbitRadius;
        const y = centerY + Math.sin(currentAngle) * (orbitRadius * 0.45); // Elliptical 3D perspective

        // Connection Line to center
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = 'rgba(6, 182, 212, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Node Circle
        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = node.color;
        ctx.fill();

        // Node Label
        ctx.font = '10px Plus Jakarta Sans, sans-serif';
        ctx.fillStyle = '#f8fafc';
        ctx.fillText(node.label, x + 12, y + 3);
      });

      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="w-full flex items-center justify-center p-2">
      <canvas ref={canvasRef} width={650} height={260} className="w-full h-auto max-w-[650px]" />
    </div>
  );
};
