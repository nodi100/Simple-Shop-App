import { getServerSideApolloClient } from "./serverSideApollo";
import { GET_PRODUCTS } from "@/graphql/queries";

export async function getProducts() {
  const client = await getServerSideApolloClient();
  const { data } = await client.query({
    query: GET_PRODUCTS,
  });

  return data?.getProducts?.products || [];
}
