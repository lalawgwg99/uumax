import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OnboardingBanner } from "@/components/layout/OnboardingBanner";
import { getAllConfigs } from "@/lib/configs";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://uumax.pages.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "uumax — AI Agent Config Marketplace",
    template: "%s | uumax",
  },
  description:
    "Discover, share, and sell production-ready configurations for AI coding agents.",
  keywords: ["AI agent config", "CLAUDE.md", "cursorrules", "Claude Code", "Cursor", "OpenClaw", "Windsurf", "AI coding", "agent configuration"],
  openGraph: {
    type: "website",
    siteName: "uumax",
    images: [{ url: `${SITE_URL}/og/default.svg`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: [`${SITE_URL}/og/default.svg`],
  },
  alternates: {
    languages: {
      'en': `${SITE_URL}/en`,
      'zh-TW': `${SITE_URL}/zh-TW`,
    },
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Header />
            <OnboardingBanner />
            <main className="flex-1">{children}</main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
