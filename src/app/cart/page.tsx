"use client";
import { useState, useEffect } from "react";
import CartList from "@/components/cart/CartList";
import UpdateModal from "@/components/modal/Modal";
import { useCartStore } from "@/store/cartStore";
import { useCart } from "@/hooks/useCart";
import Loader from "@/components/loading/Loader";

export default function CartPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { pendingChanges, clearPendingChanges } = useCartStore();
  const { loading, refetch } = useCart();

  useEffect(() => {
    if (pendingChanges?.length > 0) {
      setIsModalOpen(true);
    }
  }, [pendingChanges]);

  const handleClose = async () => {
    await refetch();
    clearPendingChanges();
    setIsModalOpen(false);
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <CartList />
      <UpdateModal
        isOpen={isModalOpen}
        onClose={handleClose}
        title="Available quantities changed"
        closeBtnText="Okey"
      >
        <ul className="space-y-2">
          {pendingChanges.map(({ _id, title, newQuantity }) => (
            <li key={_id} className="p-3 rounded-md shadow-sm bg-gray-100">
              {newQuantity > 0 ? (
                <span className="text-green-600 font-medium">
                  Quantity of <span className="font-bold">{title}</span> changed
                  to {newQuantity} in your cart.
                </span>
              ) : (
                <span className="text-red-600 font-medium">
                  <span className="font-bold">{title}</span> removed from your
                  cart.
                </span>
              )}
            </li>
          ))}
        </ul>
      </UpdateModal>
    </div>
  );
}
