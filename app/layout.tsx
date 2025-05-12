import { Analytics } from "@/components/analytics";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Divine Encounters",
    template: "%s | Divine Encounters",
  },
  description:
    "Stories of faith, spirituality, and divine experiences from around the world.",
  keywords: [
    "spirituality",
    "faith",
    "religion",
    "divine encounters",
    "testimonials",
  ],
  authors: [
    {
      name: "Divine Encounters",
      url: "https://divineencounters.org",
    },
  ],
  creator: "Divine Encounters",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://divineencounters.org",
    title: "Divine Encounters",
    description:
      "Stories of faith, spirituality, and divine experiences from around the world.",
    siteName: "Divine Encounters",
  },
  twitter: {
    card: "summary_large_image",
    title: "Divine Encounters",
    description:
      "Stories of faith, spirituality, and divine experiences from around the world.",
    creator: "@divineencounters",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "https://divineencounters.org/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background font-sans `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <Suspense>
              <div className="flex-1">{children}</div>
            </Suspense>
            <NewsletterSignup />
            <SiteFooter />
          </div>
          <Toaster richColors />
          <Analytics />
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}
