import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "uumax — AI Agent Config Marketplace",
    template: "%s | uumax",
  },
  description:
    "Discover, share, and sell production-ready configurations for AI coding agents. CLAUDE.md, Cursor rules, MCP configs, and more.",
  keywords: [
    "AI agent",
    "Claude Code",
    "Cursor",
    "CLAUDE.md",
    "config",
    "marketplace",
    "developer tools",
  ],
  openGraph: {
    title: "uumax — AI Agent Config Marketplace",
    description:
      "Production-ready configs for Claude Code, Cursor, OpenClaw, and more.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
