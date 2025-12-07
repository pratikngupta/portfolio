"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Neofetch() {
  const [uptime, setUptime] = useState<string>("0h 0m");

  useEffect(() => {
    const start = new Date("2024-01-01").getTime();
    const updateUptime = () => {
      const diff = new Date().getTime() - start;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      setUptime(`${days} days`);
    };
    updateUptime();
  }, []);

  return (
    <div className="font-mono text-sm text-muted-foreground select-none">
      <div className="flex flex-col xl:flex-row gap-6 items-start">
        {/* Photo / Logo */}
        <div className="relative shrink-0">
          <div className="h-32 w-32 xl:h-40 xl:w-40 overflow-hidden rounded-full border-2 border-primary/50 bg-muted">
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
        <div className="flex flex-col justify-center gap-1 w-full">
          <div className="flex gap-2 text-base xl:text-lg">
            <span className="text-primary font-bold">pratik</span>
            <span className="text-muted-foreground">@</span>
            <span className="text-primary font-bold">portfolio</span>
          </div>
          <div className="h-px w-full bg-muted-foreground/30 my-1" />

          <div className="grid grid-cols-[min-content_1fr] gap-x-4 gap-y-1">
            <span className="text-cyan-400 font-bold whitespace-nowrap">
              Role:
            </span>
            <span className="text-white">Software Engineer</span>

            <span className="text-cyan-400 font-bold whitespace-nowrap">
              Focus:
            </span>
            <span className="text-white">Cloud-Native & AI</span>

            <span className="text-cyan-400 font-bold whitespace-nowrap">
              Passion:
            </span>
            <span className="text-white">Innovation</span>

            <span className="text-cyan-400 font-bold whitespace-nowrap">
              Problem_Solving:
            </span>
            <span className="text-white">Data-Intensive</span>

            <span className="text-cyan-400 font-bold whitespace-nowrap">
              Uptime:
            </span>
            <span className="text-white">{uptime}</span>

            <span className="text-cyan-400 font-bold whitespace-nowrap">
              Shell:
            </span>
            <span className="text-white">zsh 5.9</span>
          </div>

          {/* Color Palette Strip */}
          <div className="mt-4 flex gap-2">
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

      <div className="mt-6 text-xs leading-relaxed max-w-sm text-balance">
        &quot;I am passionate about leveraging cloud-native technologies and
        advanced AI to drive innovation and solve complex, data-intensive
        problems.&quot;
      </div>
    </div>
  );
}
