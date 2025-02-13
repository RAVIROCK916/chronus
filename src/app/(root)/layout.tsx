import type { Metadata } from "next";
import "../globals.css";
import "../fonts.css";

import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Chronus",
  description: "A personal task management app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="dark bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
