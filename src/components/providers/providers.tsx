"use client";

import { ThemeProvider } from "@/components/providers/theme-provider";
import ApolloWrapper from "@/components/providers/apollo-wrapper";
import ReactReduxWrapper from "@/components/providers/react-redux-wrapper";
import { PostHogProvider } from "./posthog-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ApolloWrapper>
      <PostHogProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ReactReduxWrapper>{children}</ReactReduxWrapper>
        </ThemeProvider>
      </PostHogProvider>
    </ApolloWrapper>
  );
}
