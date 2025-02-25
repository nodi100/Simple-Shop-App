import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { cookies } from "next/headers";

export async function getServerSideApolloClient() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("authToken")?.value;

  const httpLink = createHttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
    headers: {
      authorization: authToken ? `Bearer ${authToken}` : "",
    },
  });

  return new ApolloClient({
    ssrMode: true,
    link: httpLink,
    cache: new InMemoryCache(),
  });
}
