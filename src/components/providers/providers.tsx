"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import ApolloWrapper from "@/components/providers/apollo-wrapper";
import ReactReduxWrapper from "@/components/providers/react-redux-wrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <ReactReduxWrapper>{children}</ReactReduxWrapper>
      </ThemeProvider>
    </ApolloWrapper>
  );
}
