import type { Product } from "./products";

export type Cart = {
  _id: string;
  hash: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
};

export type CartItem = {
  _id: string;
  cartId: string;
  product: Product;
  quantity: number;
  updatedAt: string;
  addedAt: string;
};

export type ChangeItem = {
  _id: string;
  title: string;
  newQuantity: number;
};

export interface CartState {
  cart: Cart | null;
  pendingChanges: ChangeItem[];
  setCart: (cart: Cart) => void;
  addPendingChange: (item: ChangeItem) => void;
  clearPendingChanges: () => void;
}
