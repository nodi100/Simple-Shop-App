import ProductList from "@/components/products/ProductList";
import { getProducts } from "@/lib/serverRequests";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="px-4 py-2 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to my shop</h1>
      <ProductList products={products} />
    </div>
  );
}
