"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

export default function Neofetch() {
  const [uptime, setUptime] = useState<string>("0h 0m");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const start = new Date("2021-09-01").getTime();
    const updateUptime = () => {
      const diff = new Date().getTime() - start;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      setUptime(`${days} days`);
    };
    updateUptime();
  }, []);

  const THEMES = [
    {
      name: "dark",
      color: "bg-black",
      border: "border-white/20",
      title: "Cyber Blue (Dark)",
    },
    {
      name: "one-light-pro",
      color: "bg-[#fdf6e3]",
      border: "border-stone-300",
      title: "Solarized Light",
    },
    { name: "nord", color: "bg-[#88c0d0]", border: "", title: "Nord" },
    { name: "obsidian", color: "bg-[#7b6cbd]", border: "", title: "Obsidian" },
    {
      name: "vscode-modern-dark",
      color: "bg-[#007acc]",
      border: "",
      title: "VS Code Dark",
    },
  ];

  return (
    <div className="font-mono text-sm text-muted-foreground select-none">
      <div className="flex flex-col xl:flex-row gap-8 xl:gap-12 items-center xl:items-center text-base">
        {/* Photo / Logo */}
        <div className="relative shrink-0">
          <div className="relative h-32 w-32 xl:h-48 xl:w-48 overflow-hidden rounded-full border-4 border-muted bg-muted shadow-2xl">
            {/* Make sure to add your photo as 'public/profile.png' */}
            <Image
              src="/profile.png"
              alt="Pratik Gupta"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 128px, 192px"
              priority
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                target.style.display = "none";
                target.parentElement!.classList.add(
                  "flex",
                  "items-center",
                  "justify-center"
                );
                target.parentElement!.innerHTML = `<span class="text-xs text-center p-2">Add profile.png to public/</span>`;
              }}
            />
          </div>
        </div>

        {/* Info Map */}
        <div className="flex flex-col justify-center gap-2 w-full pt-4 items-center xl:items-start">
          <div className="flex flex-col gap-1 items-center xl:items-start">
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
            <span className="text-primary font-bold whitespace-nowrap">
              Role:
            </span>
            <span className="text-foreground whitespace-nowrap">
              Software Engineer
            </span>

            <span className="text-primary font-bold whitespace-nowrap">
              Focus:
            </span>
            <span className="text-foreground whitespace-nowrap">
              AI &amp; Robotics
            </span>

            <span className="text-primary font-bold whitespace-nowrap">
              Passion:
            </span>
            <span className="text-foreground whitespace-nowrap">
              Innovation
            </span>

            <span className="text-primary font-bold whitespace-nowrap">
              Problem_Solving:
            </span>
            <span className="text-foreground whitespace-nowrap">
              Embedded Systems
            </span>

            <span className="text-primary font-bold whitespace-nowrap">
              Uptime:
            </span>
            <span className="text-foreground whitespace-nowrap">{uptime}</span>

            <span className="text-primary font-bold whitespace-nowrap">
              Shell:
            </span>
            <span className="text-foreground whitespace-nowrap">zsh 5.9</span>
          </div>

          {/* Prominent Theme Switcher Section */}
          <div className="mt-8 pt-4 border-t border-dashed border-muted-foreground/30 w-full">
            <div className="flex flex-col gap-3">
              <span className="text-primary font-bold tracking-wide text-sm opacity-80">
                [ Select System Theme ]
              </span>
              <div className="flex gap-4 items-center">
                {mounted
                  ? THEMES.map((t) => (
                      <button
                        key={t.name}
                        onClick={() => setTheme(t.name)}
                        className={`h-5 w-5 rounded-full ${t.color} ${
                          t.border
                        } hover:scale-110 transition-all ${
                          theme === t.name ||
                          (t.name === "dark" && theme === "system")
                            ? "ring-2 ring-primary ring-offset-2 ring-offset-black shadow-lg shadow-primary/20"
                            : "opacity-60 hover:opacity-100"
                        }`}
                        title={t.title}
                      />
                    ))
                  : /* Skeleton / Loading state to match structure but neutral style */
                    Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-5 w-5 rounded-full bg-muted/20 border border-muted"
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 text-xs leading-relaxed max-w-sm text-balance">
        &quot;Building resilient systems at the intersection of AI, robotics, and
        cloud-native infrastructure — from PX4 firmware to CNN/Transformer
        architectures.&quot;
      </div>
    </div>
  );
}
