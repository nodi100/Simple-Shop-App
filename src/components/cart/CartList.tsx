"use client";

import { useMemo } from "react";
import CartItem from "./CartItem";
import { useCartStore } from "@/store/cartStore";

export default function CartList() {
  const { cart } = useCartStore();

  const total = useMemo(
    () =>
      cart?.items.reduce(
        (sum, item) => sum + item.product.cost * item.quantity,
        0
      ) || 0,
    [cart?.items]
  );

  if (!cart || cart.items.length === 0) return <p>Your cart is empty.</p>;

  return (
    <div>
      {cart?.items.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Cart Summary</h2>
        <p>Total: ${total?.toFixed(2)}</p>
      </div>
    </div>
  );
}
