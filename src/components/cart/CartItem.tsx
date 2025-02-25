import { useCart } from "@/hooks/useCart";
import { useValidation } from "@/hooks/useValidation";
import {
  cartRemoveItemSchema,
  cartUpdateItemQuantitySchema,
} from "@/validation/schemas";
import { CartItem as CartItemType } from "@/types/cart";
import Button from "../button/Button";

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateCartItem, removeCartItem } = useCart();

  const { error: updateError, validate: validateUpdate } = useValidation(
    cartUpdateItemQuantitySchema
  );

  const { error: removeError, validate: validateRemove } =
    useValidation(cartRemoveItemSchema);

  const handleUpdateItem = (id: string, quantity: number) => {
    const validatedInput = validateUpdate({ cartItemId: id, quantity });
    if (!validatedInput) return;

    updateCartItem(id, quantity);
  };

  const handleRemove = (id: string) => {
    const validatedInput = validateRemove({ cartItemId: id });
    if (!validatedInput) return;

    removeCartItem(id);
  };

  return (
    <div className="border p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold">{item.product.title}</h3>
      <p>Quantity: {item.quantity}</p>
      <p>Price: ${(item.product.cost * item.quantity).toFixed(2)}</p>
      <div className="flex gap-2 mt-2">
        <Button
          onClick={() => handleUpdateItem(item._id, item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </Button>
        <Button onClick={() => handleUpdateItem(item._id, item.quantity + 1)}>
          +
        </Button>
        <Button onClick={() => handleRemove(item._id)} variant="danger">
          Remove
        </Button>
      </div>
      {(!!updateError || !!removeError) && (
        <p className="mt-2 text-red-600 text-sm font-medium mt-1">
          {updateError || removeError}
        </p>
      )}
    </div>
  );
}
