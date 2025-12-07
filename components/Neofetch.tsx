"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Neofetch() {
  const [uptime, setUptime] = useState<string>("0h 0m");
  const [lines, setLines] = useState<number>(0);

  useEffect(() => {
    // Calculate uptime as before
    const start = new Date("2024-01-01").getTime();
    const diff = new Date().getTime() - start;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    setUptime(`${days} days`);

    // Animation loop: reveal one line every 50ms
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setLines(count);
      if (count > 20) clearInterval(interval); // Stop after enough steps
    }, 50);

    return () => clearInterval(interval);
  }, []);

  // Helper to conditionally render lines based on step
  const show = (step: number) => (lines >= step ? "opacity-100" : "opacity-0");

  return (
    <div className="font-mono text-sm text-muted-foreground select-none">
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-center xl:items-center text-base">
        {/* Photo / Logo - Delayed fade in */}
        <div
          className={`relative shrink-0 transition-opacity duration-700 ${
            Math.max(0, lines - 5) > 0 ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-32 w-32 xl:h-48 xl:w-48 overflow-hidden rounded-full border-4 border-muted bg-muted shadow-2xl">
            {/* Make sure to add your photo as 'public/profile.png' */}
            <img
              src="/profile.png"
              alt="Pratik Gupta"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.parentElement!.classList.add(
                  "flex",
                  "items-center",
                  "justify-center"
                );
                e.currentTarget.parentElement!.innerHTML = `<span class="text-xs text-center p-2">Add profile.png to public/</span>`;
              }}
            />
          </div>
        </div>

        {/* Info Map */}
        <div className="flex flex-col justify-center gap-2 w-full pt-4 items-center xl:items-start">
          <div
            className={`flex flex-col gap-1 items-center xl:items-start transition-opacity duration-100 ${show(
              1
            )}`}
          >
            <div className="flex gap-1 text-lg xl:text-xl tracking-wide">
              <span className="text-primary font-bold">pratik</span>
              <span className="text-muted-foreground">@</span>
              <span className="text-primary font-bold">portfolio</span>
            </div>
            <div className="text-muted-foreground font-mono leading-none">
              ---------------------------
            </div>
          </div>

          <div className="grid grid-cols-[min-content_1fr] gap-x-4 gap-y-1 w-fit">
            <span
              className={`text-primary font-bold whitespace-nowrap transition-opacity duration-100 ${show(
                2
              )}`}
            >
              Role:
            </span>
            <span
              className={`text-white whitespace-nowrap transition-opacity duration-100 ${show(
                2
              )}`}
            >
              Software Engineer
            </span>

            <span
              className={`text-primary font-bold whitespace-nowrap transition-opacity duration-100 ${show(
                3
              )}`}
            >
              Focus:
            </span>
            <span
              className={`text-white whitespace-nowrap transition-opacity duration-100 ${show(
                3
              )}`}
            >
              Cloud-Native & AI
            </span>

            <span
              className={`text-primary font-bold whitespace-nowrap transition-opacity duration-100 ${show(
                4
              )}`}
            >
              Passion:
            </span>
            <span
              className={`text-white whitespace-nowrap transition-opacity duration-100 ${show(
                4
              )}`}
            >
              Innovation
            </span>

            <span
              className={`text-primary font-bold whitespace-nowrap transition-opacity duration-100 ${show(
                5
              )}`}
            >
              Problem_Solving:
            </span>
            <span
              className={`text-white whitespace-nowrap transition-opacity duration-100 ${show(
                5
              )}`}
            >
              Data-Intensive
            </span>

            <span
              className={`text-primary font-bold whitespace-nowrap transition-opacity duration-100 ${show(
                6
              )}`}
            >
              Uptime:
            </span>
            <span
              className={`text-white whitespace-nowrap transition-opacity duration-100 ${show(
                6
              )}`}
            >
              {uptime}
            </span>

            <span
              className={`text-primary font-bold whitespace-nowrap transition-opacity duration-100 ${show(
                7
              )}`}
            >
              Shell:
            </span>
            <span
              className={`text-white whitespace-nowrap transition-opacity duration-100 ${show(
                7
              )}`}
            >
              zsh 5.9
            </span>
          </div>

          {/* Color Palette Strip */}
          <div
            className={`mt-4 flex gap-2 transition-opacity duration-100 ${show(
              8
            )}`}
          >
            <div className="h-3 w-3 rounded-full bg-black border border-white/20"></div>
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <div className="h-3 w-3 rounded-full bg-green-500"></div>
            <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
            <div className="h-3 w-3 rounded-full bg-blue-500"></div>
            <div className="h-3 w-3 rounded-full bg-magenta-500"></div>
            <div className="h-3 w-3 rounded-full bg-cyan-500"></div>
            <div className="h-3 w-3 rounded-full bg-white"></div>
          </div>
        </div>
      </div>

      <div
        className={`mt-6 text-xs leading-relaxed max-w-sm text-balance transition-opacity duration-500 ${show(
          9
        )}`}
      >
        &quot;I am passionate about leveraging cloud-native technologies and
        advanced AI to drive innovation and solve complex, data-intensive
        problems.&quot;
      </div>
    </div>
  );
}
