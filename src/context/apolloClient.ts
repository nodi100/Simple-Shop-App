import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getCookie } from "cookies-next";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
});

const authLink = setContext((_, { headers }) => {
  const token = getCookie("authToken");

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink = () => {
  if (typeof window === "undefined") return null;
  const url =
    process.env.NEXT_PUBLIC_GRAPHQL_WS || "wss://take-home-be.onrender.com/api";
  return new GraphQLWsLink(
    createClient({
      url,
      connectionParams: () => ({
        authToken: getCookie("authToken"),
      }),
      on: {
        connected: () => console.log("WebSocket connected successfully"),
        error: (err) => console.error("WebSocket error:", err),
        closed: () => console.log("WebSocket connection closed"),
      },
      retryAttempts: 5,
      shouldRetry: () => true,
    })
  );
};

const createSplitLink = () => {
  const ws = wsLink();

  if (!ws) return from([authLink, httpLink]);

  return split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    ws,
    from([authLink, httpLink])
  );
};

export const createApolloClient = () => {
  return new ApolloClient({
    link: createSplitLink(),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
      },
      mutate: {
        fetchPolicy: "no-cache",
      },
      watchQuery: {
        fetchPolicy: "network-only",
      },
    },
  });
};
