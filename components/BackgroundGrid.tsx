"use client";

export default function BackgroundGrid() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Subtle Radial Gradient for depth */}
      <div className="absolute inset-0 bg-background [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,transparent_70%,var(--background)_100%)]"></div>
    </div>
  );
}
