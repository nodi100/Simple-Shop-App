import React, { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@apollo/client";
import { ADD_ITEM } from "@/graphql/mutations";
import { useCartStore } from "@/store/cartStore";
import { useValidation } from "@/hooks/useValidation";
import { cartAddItemSchema } from "@/validation/schemas";
import { AddItemArgs, AddItemResponse } from "@/types/graphql";
import { getErrorMessage } from "@/utils/helpers";
import Button from "../button/Button";
import Loader from "../loading/Loader";
import { AddToCartProps } from "./types";

const AddToCart = ({ productId, productQuantity }: AddToCartProps) => {
  const [quantity, setQuantity] = useState<number>(0);
  const [showInput, setShowInput] = useState<boolean>(false);
  const { error, validate } = useValidation(cartAddItemSchema);
  const { setCart } = useCartStore();

  const [addItemToCart, { loading }] = useMutation<
    AddItemResponse,
    { input: AddItemArgs }
  >(ADD_ITEM, {
    onCompleted: (data) => {
      if (data.addItem) {
        setCart(data.addItem);
        toast.success("Item added to cart successfully");
        setShowInput(false);
      }
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });

  const handleCancel = () => {
    setShowInput(false);
    setQuantity(0);
  };

  const handleAddToCart = (productId: string, quantity: number) => {
    const validatedInput = validate({ productId, quantity });
    if (!validatedInput) return;
    addItemToCart({
      variables: {
        input: validatedInput,
      },
    });
  };

  return (
    <div>
      {loading && <Loader />}

      {showInput && (
        <div className="flex flex-col mt-2">
          <label className="text-gray-700 text-sm font-medium" />
          Enter Quantity
          <input
            autoFocus
            className="mb-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            onKeyDown={(e) => {
              if (e.key === "." || e.key === "," || e.key === "+") {
                e.preventDefault();
              }
            }}
            onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
            min={1}
            max={productQuantity}
          />
          <div>
            <Button
              onClick={() => handleAddToCart(productId, quantity)}
              disabled={loading}
            >
              Add to Cart
            </Button>
            <Button onClick={handleCancel} variant="danger" className="ml-2">
              Cancel
            </Button>
          </div>
        </div>
      )}
      {!showInput && (
        <Button onClick={() => setShowInput(true)} disabled={loading}>
          Add to Cart
        </Button>
      )}
      {!!error && (
        <p className="text-red-600 text-sm font-medium mt-1">{error}</p>
      )}
    </div>
  );
};

export default AddToCart;
