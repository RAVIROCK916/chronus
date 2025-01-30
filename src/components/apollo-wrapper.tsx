"use client";

import makeClient from "@/lib/apollo";
import { ApolloNextAppProvider } from "@apollo/experimental-nextjs-app-support";

const ApolloWrapper = ({ children }: React.PropsWithChildren) => {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
};
export default ApolloWrapper;
