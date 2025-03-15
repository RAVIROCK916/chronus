"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import ApolloWrapper from "@/components/providers/apollo-wrapper";
import ReactReduxWrapper from "@/components/providers/react-redux-wrapper";
import { AuthGuard } from "../auth/auth-guard";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      {/* <AuthGuard> */}
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <ReactReduxWrapper>{children}</ReactReduxWrapper>
      </ThemeProvider>
      {/* </AuthGuard> */}
    </ApolloWrapper>
  );
}
