import type { Metadata } from "next";

import { Providers } from "@/components/providers/providers";
import { Toaster } from "@/components/ui/sonner";

import { GeistSans } from "geist/font/sans";

import "./globals.css";
import "./fonts.css";

import AuthCheck from "@/components/shared/auth-check";

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
      <body>
        <Providers>{children}</Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
