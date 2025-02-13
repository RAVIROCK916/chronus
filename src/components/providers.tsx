"use client";

import { ThemeProvider } from "@/components/theme-provider";
import ApolloWrapper from "@/components/apollo-wrapper";
import ReactReduxWrapper from "@/components/react-redux-wrapper";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <ReactReduxWrapper>{children}</ReactReduxWrapper>
      </ThemeProvider>
    </ApolloWrapper>
  );
}
