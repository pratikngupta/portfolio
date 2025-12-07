"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  size: number;
}

export default function NetworkParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let mouse = { x: -1000, y: -1000 };

    // Theme Colors (Terminal Green)
    // Theme Colors (Terminal Blue)
    const particleColor = "rgba(0, 191, 255, 0.3)"; // #00BFFF
    const lineColor = "rgba(0, 191, 255, 0.1)";
    const connectionDistance = 150;
    const mouseDistance = 200;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      // Adjust particle count based on screen size
      const numberOfParticles = (canvas.width * canvas.height) / 15000;

      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 0.5, // Slow movement
          dy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear only, see CSS for bg

      // Update and draw particles
      particles.forEach((p, i) => {
        // Move
        p.x += p.dx;
        p.y += p.dy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // Connect to other particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1 - dist / connectionDistance;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }

        // Connect to mouse
        const mouseDist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (mouseDist < mouseDistance) {
          ctx.beginPath();
          ctx.strokeStyle = "rgba(0, 255, 0, 0.2)";
          ctx.lineWidth = 1 - mouseDist / mouseDistance;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();

          // Subtle attraction to mouse
          if (mouseDist > 50) {
            p.x += (mouse.x - p.x) * 0.005;
            p.y += (mouse.y - p.y) * 0.005;
          }
        }
      });

      requestAnimationFrame(drawParticles);
    };

    // Event Listeners
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    // Init
    resize();
    const animId = requestAnimationFrame(drawParticles);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none select-none bg-[#0c0c0c]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Optional Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(12,12,12,0.8)_100%)]"></div>
    </div>
  );
}
