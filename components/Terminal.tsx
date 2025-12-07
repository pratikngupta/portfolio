"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Terminal as TerminalIcon, X, Minus, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import portfolioData from "@/data/portfolio.json";

type LogEntry = {
  type: "command" | "output" | "error";
  content: string;
};

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<LogEntry[]>([
    { type: "output", content: "Welcome to PortfolioOS v1.0.0" },
    { type: "output", content: "Type 'help' for a list of commands." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  // Keyboard shortcut (Cmd+K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    if (!trimmedCmd) return;

    const [command, ...args] = trimmedCmd.split(" ");
    const arg = args.join(" "); // Simple single argument support for now

    const newHistory: LogEntry[] = [
      ...history,
      { type: "command", content: trimmedCmd },
    ];

    switch (command.toLowerCase()) {
      case "help":
        newHistory.push({
          type: "output",
          content: `Available commands:
  ls        List directories and files
  cd [dir]  Navigate to directory (page)
  cat [file] View file content
  clear     Clear terminal history
  whoami    Display user info
  exit      Close terminal`,
        });
        break;

      case "ls":
        // Mock file system based on routing
        newHistory.push({
          type: "output",
          content: `directories:
  projects/
  experience/
  blog/

files:
  about.md
  resume.pdf`,
        });
        break;

      case "cd":
        if (!arg) {
          router.push("/");
          newHistory.push({
            type: "output",
            content: "Changed directory to ~/",
          });
        } else if (arg === ".." || arg === "../") {
          // Simple back logic or home
          router.push("/");
          newHistory.push({
            type: "output",
            content: "Changed directory to ~/",
          });
        } else {
          const validRoutes = ["projects", "experience", "blog"];
          const target = arg.replace(/\/$/, ""); // remove trailing slash
          if (validRoutes.includes(target)) {
            router.push(`/${target}`);
            newHistory.push({
              type: "output",
              content: `Changed directory to /${target}`,
            });
          } else {
            newHistory.push({
              type: "error",
              content: `cd: no such file or directory: ${arg}`,
            });
          }
        }
        break;

      case "cat":
        if (!arg) {
          newHistory.push({
            type: "error",
            content: "cat: missing file operand",
          });
        } else if (arg === "about.md") {
          // Flatten about paragraphs for display
          const aboutText = portfolioData.about.paragraphs.join("\n\n");
          newHistory.push({ type: "output", content: aboutText });
        } else if (arg === "resume.pdf") {
          newHistory.push({ type: "output", content: "Opening resume..." });
          router.push("/resume");
        } else {
          newHistory.push({
            type: "error",
            content: `cat: ${arg}: No such file or directory`,
          });
        }
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return; // Early return to avoid setting input again

      case "whoami":
        newHistory.push({ type: "output", content: "visitor@portfolio" });
        break;

      case "exit":
        setIsOpen(false);
        break;

      default:
        newHistory.push({
          type: "error",
          content: `command not found: ${command}`,
        });
    }

    setHistory(newHistory);
    setInput("");
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 active:scale-95"
        aria-label="Open Terminal"
      >
        <TerminalIcon className="h-6 w-6" />
      </button>
    );
  }

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-4 right-4 z-50 flex h-10 w-fit items-center gap-2 rounded-md border border-primary bg-background px-4 py-2 font-mono text-sm text-primary shadow-lg"
      >
        <TerminalIcon className="h-4 w-4" />
        <span>Terminal</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 md:p-0">
      <div className="w-full max-w-2xl overflow-hidden rounded-lg border border-primary bg-background/90 shadow-2xl font-mono text-sm md:text-base">
        {/* Title Bar */}
        <div className="flex items-center justify-between border-b border-primary/30 bg-primary/10 px-4 py-2">
          <div className="flex items-center gap-2 text-primary">
            <TerminalIcon className="h-4 w-4" />
            <span className="font-bold">
              user@portfolio:~{pathname === "/" ? "" : pathname}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="p-1 hover:text-white transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:text-destructive transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Terminal Content */}
        <div
          ref={scrollRef}
          className="flex h-[60vh] flex-col overflow-y-auto p-4 text-foreground custom-scrollbar"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((entry, index) => (
            <div key={index} className="mb-1 whitespace-pre-wrap break-words">
              {entry.type === "command" && (
                <div className="flex gap-2 text-muted-foreground">
                  <span className="text-primary">$</span>
                  <span>{entry.content}</span>
                </div>
              )}
              {entry.type === "output" && (
                <div className="text-foreground pl-4">{entry.content}</div>
              )}
              {entry.type === "error" && (
                <div className="text-destructive pl-4">{entry.content}</div>
              )}
            </div>
          ))}

          {/* Input Area */}
          <form onSubmit={onSubmit} className="flex gap-2">
            <span className="text-primary">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-foreground caret-primary"
              autoFocus
              autoComplete="off"
              spellCheck="false"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
