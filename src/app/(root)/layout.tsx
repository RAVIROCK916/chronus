import type { Metadata } from "next";
import "../globals.css";
import "../fonts.css";

import { ThemeProvider } from "@/components/theme-provider";
import ApolloWrapper from "@/components/apollo-wrapper";

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
    <ApolloWrapper>
      <html lang="en" suppressHydrationWarning={true}>
        <body className="dark bg-background text-foreground">
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ApolloWrapper>
  );
}
