"use server";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { cookies } from "next/headers";
import { REGISTER_MUTATION } from "@/graphql/mutations";

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API,
    fetch: fetch,
  }),
  cache: new InMemoryCache(),
  defaultOptions: {
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
});

export async function registerVisitor() {
  try {
    const { data } = await client.mutate({
      mutation: REGISTER_MUTATION,
    });

    const token = data?.register?.token;

    const cookieStore = await cookies();

    if (token) {
      cookieStore.set("authToken", token, {
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
        sameSite: "strict",
      });
    }

    return { success: true, token };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "Registration failed" };
  } finally {
    client.stop();
  }
}
