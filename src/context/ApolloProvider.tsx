"use client";
import { ApolloProvider } from "@apollo/client";
import { createApolloClient } from "./apolloClient";

export function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = createApolloClient();
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
