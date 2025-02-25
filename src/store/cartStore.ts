import { create } from "zustand";
import { CartState } from "../types/cart";

export const useCartStore = create<CartState>((set) => ({
  cart: null,
  pendingChanges: [],

  setCart: (cart) => set({ cart }),

  addPendingChange: (item) =>
    set((state) => {
      const existingIndex = state.pendingChanges.findIndex(
        (change) => change._id === item._id
      );

      return {
        pendingChanges:
          existingIndex !== -1
            ? state.pendingChanges.map((change, index) =>
                index === existingIndex
                  ? { ...change, newQuantity: item.newQuantity }
                  : change
              )
            : [...state.pendingChanges, item],
      };
    }),

  clearPendingChanges: () => set({ pendingChanges: [] }),
}));
