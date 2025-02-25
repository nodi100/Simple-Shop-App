import { gql } from "@apollo/client";

export const GET_CART = gql`
  query GetCart {
    getCart {
      _id
      items {
        _id
        product {
          _id
          title
          cost
        }
        quantity
      }
    }
  }
`;

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      products {
        _id
        title
        cost
        availableQuantity
      }
    }
  }
`;
