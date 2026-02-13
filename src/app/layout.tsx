import type { Metadata } from "next";

import "./globals.css";
import { spaceGrotesk, inter, jetbrainsMono } from "@/lib";
import { ThemeProvider } from "@/providers";
import { Footer, Navbar } from "@/components";

export const metadata: Metadata = {
  title: {
    default: "Sahil Jadhav | Fullstack Developer",
    template: "%s | Sahil Jadhav",
  },
  description:
    "Fullstack developer crafting fast, responsive, and visually stunning web experiences.",
  keywords: [
    "Sahil Jadhav",
    "Fullstack Developer",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: "Sahil Jadhav" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sahiljadhav.vercel.app",
    siteName: "Sahil Jadhav",
    title: "Sahil Jadhav | Fullstack Developer",
    description:
      "Fullstack developer crafting fast, responsive, and visually stunning web experiences.",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@dev_takeru",
  },
  robots: {
    index: true,
    follow: true,
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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
