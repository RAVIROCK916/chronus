import type { Metadata } from "next";

import { Providers } from "@/components/providers/providers";
import { Toaster } from "@/components/ui/sonner";

import { GeistSans } from "geist/font/sans";

import "./globals.css";
import "./fonts.css";

export const metadata: Metadata = {
  title: "Chronus",
  description: "A personal task management app",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={GeistSans.className}
      suppressHydrationWarning={true}
    >
      <head>
        {/* <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        /> */}
      </head>
      <body>
        <Providers>{children}</Providers>
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
