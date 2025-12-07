import type { Metadata } from "next";
import { Caveat } from "next/font/google";
import "./globals.css";
import NetworkParticles from "@/components/NetworkParticles";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Terminal from "@/components/Terminal";
import MobileCommandBar from "@/components/MobileCommandBar";
import Footer from "@/components/Footer";
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
          "antialiased min-h-screen flex flex-col pt-16 lg:pt-0 bg-background text-foreground font-sans leading-relaxed selection:bg-teal-300 selection:text-teal-900"
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
          <NetworkParticles />
          <main className="flex-1 pb-24 lg:pb-0">{children}</main>
          <SpeedInsights />
          <Terminal />
          <MobileCommandBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
