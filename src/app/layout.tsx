import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";
import {
  LayoutWrapper,
  LoadingScreen,
  ProgressBar,
  ScrollToTop,
} from "@/components";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib";
import { PostHogPageView, PostHogProvider, ThemeProvider } from "@/providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://sahiljadhav.vercel.app"),
  title: {
    default: "Sahil Jadhav | Fullstack Developer",
    template: "%s | Sahil Jadhav",
  },
  description:
    "Fullstack developer crafting modern web experiences with React, Next.js, and Three.js. Building performant, accessible, and visually stunning applications.",
  keywords: [
    "Sahil Jadhav",
    "Fullstack Developer",
    "React Developer",
    "Next.js",
    "Three.js",
    "Web Developer",
    "Portfolio",
    "India",
  ],
  authors: [{ name: "Sahil Jadhav", url: "https://sahiljadhav.vercel.app" }],
  creator: "Sahil Jadhav",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sahiljadhav.vercel.app",
    siteName: "Sahil Jadhav",
    title: "Sahil Jadhav | Fullstack Developer",
    description:
      "Fullstack developer crafting modern web experiences with React, Next.js, and Three.js.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sahil Jadhav - Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Jadhav | Fullstack Developer",
    description:
      "Fullstack developer crafting modern web experiences with React, Next.js, and Three.js.",
    images: ["/og-image.png"],
    creator: "@sahiljadhav",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            <PostHogPageView />
            <LoadingScreen />
            <ScrollToTop />
            <ProgressBar />
            <LayoutWrapper>{children}</LayoutWrapper>
          </ThemeProvider>
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
