"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ThemeSelector from "@/components/ThemeSelector";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Resume", href: "/resume" },
  ];

  const [isOpen, setIsOpen] = useState(false);

  // Hide Navbar on Desktop Home only (since sidebar exists there)
  // Visible on Mobile Home (sidebar hidden)
  // Visible everywhere else
  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full border-b border-white/20 bg-background text-foreground font-mono",
        pathname === "/" ? "md:hidden" : ""
      )}
    >
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-lg font-bold text-primary hover:bg-primary hover:text-background px-2 py-1 transition-none"
          >
            ~/portfolio
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center">
            {links.map((link, index) => (
              <div key={link.href} className="flex items-center">
                {index > 0 && (
                  <span className="text-muted-foreground mx-2">|</span>
                )}
                <Link
                  href={link.href}
                  className={cn(
                    "text-sm font-medium px-2 py-0.5 transition-none",
                    pathname === link.href
                      ? "bg-primary text-background font-bold"
                      : "text-muted-foreground hover:text-primary hover:underline hover:decoration-2 hover:underline-offset-4"
                  )}
                >
                  [{link.name}]
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-primary font-bold border border-primary/30 px-2 py-1 text-sm bg-primary/10 active:bg-primary active:text-background"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "[ Close ]" : "[ Menu ]"}
          </button>
          <ThemeSelector />
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-white/20 bg-background absolute w-full left-0 flex flex-col p-4 gap-2 shadow-xl">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-sm font-medium px-2 py-2 transition-none border-l-2 border-transparent hover:bg-primary/5",
                pathname === link.href
                  ? "border-primary text-primary font-bold bg-primary/10"
                  : "text-muted-foreground hover:border-primary/50 hover:text-foreground"
              )}
            >
              <span className="mr-2">&gt;</span>
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
