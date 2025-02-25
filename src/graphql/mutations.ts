import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation Register {
    register {
      token
      cartId
    }
  }
`;

export const ADD_ITEM = gql`
  mutation AddItemToCart($input: AddItemArgs!) {
    addItem(input: $input) {
      _id
      hash
      items {
        _id
        product {
          _id
          title
          cost
        }
        quantity
      }
      createdAt
      updatedAt
    }
  }
`;

export const REMOVE_ITEM = gql`
  mutation RemoveItem($input: RemoveItemArgs!) {
    removeItem(input: $input) {
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

export const UPDATE_ITEM_QUANTITY = gql`
  mutation UpdateItemQuantity($input: UpdateItemQuantityArgs!) {
    updateItemQuantity(input: $input) {
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
