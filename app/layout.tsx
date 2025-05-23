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

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL || "https://divineencounters.org";

const baseAppName = process.env.NEXT_PUBLIC_APP_NAME || "Divine Encounters";

export const metadata = {
  title: {
    default: baseAppName,
    template: "%s | " + baseAppName,
  },
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
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
      name: baseAppName,
      url: baseUrl,
    },
  ],
  creator: baseAppName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: baseAppName,
    description:
      "Stories of faith, spirituality, and divine experiences from around the world.",
    siteName: baseAppName,
  },
  twitter: {
    card: "summary_large_image",
    title: baseAppName,
    description:
      "Stories of faith, spirituality, and divine experiences from around the world.",
    creator: "@divineencounters",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: baseUrl + "/site.webmanifest",
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
            <Suspense fallback={null}>
              <div className="flex-1">{children}</div>
            </Suspense>
            <NewsletterSignup />
            <SiteFooter />
          </div>
          <Toaster richColors />
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
        </ThemeProvider>{" "}
      </body>
    </html>
  );
}
