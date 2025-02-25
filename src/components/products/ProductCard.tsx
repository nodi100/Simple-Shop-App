import AddToCart from "../addToCart/AddToCart";
import { Product } from "@/types/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded-lg flex flex-col justify-between">
      <h3 className="text-lg font-semibold">{product.title}</h3>
      <p>Price: ${product.cost}</p>
      <p>Available: {product.availableQuantity}</p>
      <AddToCart
        productId={product._id}
        productQuantity={product.availableQuantity}
      />
    </div>
  );
}
