import { ProductCard } from "@shared/ui/ProductCard";
import { ReusableProductSkeleton } from "@shared/ui/ReusableProductSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services//allProducts";

export const Products = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  if (isLoading) return <ReusableProductSkeleton items={12} />;
  if (isError) return <h2>{error.message}</h2>;

  const allProducts = data?.data;

  return (
    <div className=" container mx-auto grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-15 gap-7">
      {allProducts?.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
