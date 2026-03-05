import { ProductCard } from "@shared/ui/ProductCard";
import { ReusableProductSkeleton } from "@shared/ui/ReusableProductSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../../services/allProducts";
import type { TProduct } from "types";

export default function HomeProducts() {
    const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  if (isLoading) return <ReusableProductSkeleton items={12} />;
  if (isError) return <h2>{error.message}</h2>;

  const allProducts = data?.data;

  return (
    <div className="grid md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 py-15 gap-7 dark:bg-gray-900">
      {allProducts?.map((product:TProduct) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
