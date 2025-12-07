"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ThemeSelector from "@/components/ThemeSelector";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Experience", href: "/experience" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Resume", href: "/resume" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/20 bg-background text-foreground font-mono">
      <div className="mx-auto flex h-14 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-lg font-bold text-primary hover:bg-primary hover:text-background px-2 py-1 transition-none"
          >
            ~/portfolio
          </Link>
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
          {/* Mobile menu link placeholder or simple list for mobile */}
          <div className="flex md:hidden gap-4 overflow-x-auto">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-medium px-1 py-0.5 whitespace-nowrap",
                  pathname === link.href
                    ? "bg-primary text-background"
                    : "text-muted-foreground"
                )}
              >
                [{link.name}]
              </Link>
            ))}
          </div>
          <ThemeSelector />
        </div>
      </div>
    </nav>
  );
}
