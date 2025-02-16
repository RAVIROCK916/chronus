import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";

import { Providers } from "@/components/providers/providers";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Chronus",
  description: "A personal task management app",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="dark bg-background text-foreground">
        <Providers>{children}</Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
