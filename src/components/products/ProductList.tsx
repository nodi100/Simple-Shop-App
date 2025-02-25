"use client";

import { useCart } from "@/hooks/useCart";
import ProductCard from "./ProductCard";
import { Product } from "@/types/products";

export default function ProductList({ products }: { products: Product[] }) {
  useCart();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product: Product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
