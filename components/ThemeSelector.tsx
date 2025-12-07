"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const themes = [
  { name: "Light", id: "light" },
  { name: "Dark", id: "dark" },
  { name: "Nord", id: "nord" },
  { name: "Obsidian", id: "obsidian" },
  { name: "One Dark Pro", id: "one-dark-pro" },
  { name: "One Light Pro", id: "one-light-pro" },
  { name: "VS Code Dark", id: "vscode-modern-dark" },
  { name: "VS Code Light", id: "vscode-light" },
];

export default function ThemeSelector() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Toggle theme"
      >
        <Palette className="h-6 w-6" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 bottom-full mb-2 z-50 w-48 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-800 dark:bg-black"
          >
            <div className="flex flex-col p-2">
              <span className="mb-2 px-2 text-xs font-semibold uppercase text-neutral-500">
                Select Theme
              </span>
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "flex items-center rounded-md px-2 py-2 text-sm text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800",
                    theme === t.id
                      ? "bg-neutral-100 font-medium text-black dark:bg-neutral-900 dark:text-white"
                      : "text-neutral-600 dark:text-neutral-400"
                  )}
                >
                  <span
                    className={cn(
                      "mr-2 h-3 w-3 rounded-full border border-neutral-300"
                      // Add color previews if desired, or just use css var reference
                    )}
                    style={{
                      backgroundColor:
                        t.id === "light" || t.id.includes("light")
                          ? "#fff"
                          : t.id === "nord"
                          ? "#2e3440"
                          : t.id === "obsidian"
                          ? "#111111"
                          : t.id === "one-dark-pro"
                          ? "#282c34"
                          : t.id === "vscode-modern-dark"
                          ? "#1f1f1f"
                          : "#000",
                    }}
                  />
                  {t.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
