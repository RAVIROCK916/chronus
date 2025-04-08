import { HttpLink } from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
} from "@apollo/experimental-nextjs-app-support";
import { SERVER_URL } from "@/constants";

let apolloClient: ApolloClient<any> | null = null;

export default function makeClient() {
  if (apolloClient) return apolloClient;

  const httpLink = new HttpLink({
    uri: SERVER_URL,
    credentials: "include",
    fetchOptions: { cache: "no-store" },
  });

  apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
  });

  return apolloClient;
}
