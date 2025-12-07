import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";
import NetworkParticles from "@/components/NetworkParticles";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Terminal from "@/components/Terminal";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/ThemeProvider";

// Monaspace Fonts
import "@fontsource/monaspace-neon";
import "@fontsource/monaspace-krypton";
import "@fontsource/monaspace-radon";

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pratik Gupta | Portfolio",
  description: "Software Engineering Student & AI Enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={cn(
          caveat.variable,
          "antialiased min-h-screen flex flex-col bg-background text-foreground font-sans leading-relaxed selection:bg-teal-300 selection:text-teal-900"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={[
            "light",
            "dark",
            "nord",
            "obsidian",
            "one-dark-pro",
            "one-light-pro",
            "vscode-modern-dark",
            "vscode-light",
          ]}
        >
          <Navbar />
          <NetworkParticles />
          <main className="flex-1 pt-14">{children}</main>
          <SpeedInsights />
          <Analytics />
          <Terminal />
        </ThemeProvider>
      </body>
    </html>
  );
}
