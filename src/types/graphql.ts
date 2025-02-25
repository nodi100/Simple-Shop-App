import type { Cart } from "./cart";

export type AddItemArgs = {
  productId: string;
  quantity: number;
};

export type AddItemResponse = {
  addItem: Cart;
};

export type RemoveItemArgs = {
  cartItemId: string;
};

export type RemoveItemResponse = {
  removeItem: Cart;
};

export type UpdateItemQuantityArgs = {
  cartItemId: string;
  quantity: number;
};

export type UpdateItemQuantityResponse = {
  updateItemQuantity: Cart;
};
