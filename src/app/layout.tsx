import type { Metadata } from "next";

import { Providers } from "@/components/providers/providers";
import { Toaster } from "@/components/ui/sonner";

import { GeistSans } from "geist/font/sans";

import "./globals.css";
import "./fonts.css";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PostHogPageView = dynamic(
  () => import("@/components/shared/posthog-pageview"),
  { ssr: false },
);

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
        <Providers>
          {children}
          <Suspense fallback={null}>
            <PostHogPageView />
          </Suspense>
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
