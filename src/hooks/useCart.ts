"use client";

import { useQuery, useMutation, useSubscription } from "@apollo/client";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { useCartStore } from "../store/cartStore";
import { GET_CART } from "../graphql/queries";
import { CART_ITEM_UPDATE } from "../graphql/subscriptions";
import { REMOVE_ITEM, UPDATE_ITEM_QUANTITY } from "@/graphql/mutations";
import { getErrorMessage } from "@/utils/helpers";
import {
  RemoveItemArgs,
  RemoveItemResponse,
  UpdateItemQuantityArgs,
  UpdateItemQuantityResponse,
} from "@/types/graphql";

export const useCart = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { cart, setCart, addPendingChange } = useCartStore();

  const {
    loading: getCartLoading,
    error: getCartError,
    refetch,
  } = useQuery(GET_CART, {
    fetchPolicy: "network-only",
    skip: cart !== null,
    onCompleted: (data) => {
      if (data?.getCart) {
        setCart(data.getCart);
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const [removeItem, { loading: removeLoading, error: removeError }] =
    useMutation<RemoveItemResponse, { input: RemoveItemArgs }>(REMOVE_ITEM);

  const [updateItemQuantity, { loading: updateLoading, error: updateError }] =
    useMutation<UpdateItemQuantityResponse, { input: UpdateItemQuantityArgs }>(
      UPDATE_ITEM_QUANTITY
    );

  const handleCartNavigation = () => {
    if (pathname !== "/cart") {
      router.push("/cart");
    }
  };

  // Subscription
  useSubscription(CART_ITEM_UPDATE, {
    onData: ({ data }) => {
      if (data?.data?.cartItemUpdate) {
        const { event, payload } = data.data.cartItemUpdate;
        if (event === "ITEM_OUT_OF_STOCK") {
          addPendingChange({
            _id: payload.product._id,
            title: payload.product.title,
            newQuantity: 0,
          });
        }
        if (event === "ITEM_QUANTITY_UPDATED") {
          addPendingChange({
            _id: payload.product._id,
            title: payload.product.title,
            newQuantity: payload.quantity,
          });
        }
      }
      handleCartNavigation();
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleRemoveItem = async (cartItemId: string) => {
    try {
      const { data } = await removeItem({
        variables: { input: { cartItemId } },
      });
      if (data?.removeItem) {
        setCart(data.removeItem);
        toast.success("Item removed from cart successfully");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const handleUpdateItemQuantity = async (
    cartItemId: string,
    quantity: number
  ) => {
    try {
      const { data } = await updateItemQuantity({
        variables: { input: { cartItemId, quantity } },
      });
      if (data?.updateItemQuantity) {
        setCart(data.updateItemQuantity);
        toast.success("Item quantity changed successfully");
      }
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return {
    loading: getCartLoading || removeLoading || updateLoading,
    error: getCartError || removeError || updateError,
    refetch,
    updateCartItem: handleUpdateItemQuantity,
    removeCartItem: handleRemoveItem,
  };
};
