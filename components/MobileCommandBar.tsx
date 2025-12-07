"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Terminal } from "lucide-react";

export default function MobileCommandBar() {
  const [input, setInput] = useState("");
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();

    switch (trimmed) {
      case "home":
      case "cd ~":
      case "cd":
        router.push("/");
        break;
      case "proj":
      case "cd projects":
        router.push("/projects");
        break;
      case "exp":
      case "cd experience":
        router.push("/experience");
        break;
      case "blog":
      case "cd blog":
        router.push("/blog");
        break;
      case "resume":
      case "cat resume.pdf":
        router.push("/resume");
        break;
      default:
        // Attempt simple navigation if it matches a known route
        if (["projects", "experience", "blog"].includes(trimmed)) {
          router.push(`/${trimmed}`);
        }
        break;
    }
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input);
    }
  };

  const insertText = (text: string) => {
    setInput((prev) => prev + text);
    inputRef.current?.focus();
  };

  // Termux-style extra keys
  const extraKeys = [
    { label: "ESC", action: () => setInput("") },
    { label: "HOME", action: () => handleCommand("home") },
    { label: "PROJ", action: () => handleCommand("proj") },
    { label: "EXP", action: () => handleCommand("exp") },
    { label: "BLOG", action: () => handleCommand("blog") },
    { label: "/", action: () => insertText("/") },
    { label: "~", action: () => insertText("~") },
    { label: "TAB", action: () => {} }, // Visual placeholder for now
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex flex-col bg-[#0c0c0c] border-t border-primary/20 lg:hidden font-mono text-sm">
      {/* Extra Keys Row */}
      <div className="flex w-full overflow-x-auto bg-[#1a1a1a] py-1 px-2 gap-2 no-scrollbar">
        {extraKeys.map((key) => (
          <button
            key={key.label}
            onClick={key.action}
            className="flex-shrink-0 min-w-[3rem] h-8 bg-[#2a2a2a] text-primary rounded-sm hover:bg-primary/20 active:bg-primary/40 transition-colors flex items-center justify-center font-bold shadow-sm"
          >
            {key.label}
          </button>
        ))}
      </div>

      {/* Input Row */}
      <div className="flex items-center px-3 py-2 gap-2">
        <span className="text-primary font-bold shrink-0">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/30 caret-primary h-full"
          placeholder="Type command..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <div className="w-2 h-4 bg-primary animate-pulse" />
      </div>
    </div>
  );
}
