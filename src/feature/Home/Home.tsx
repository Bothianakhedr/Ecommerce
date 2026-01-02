import { useQuery } from "@tanstack/react-query";
import { HomeCategoriesSlider } from "./components/HomeCategories";
import { HomeSlider } from "./components/HomeSlider";
import { getAllProducts } from "../../services/allProducts";
import { ProductCard } from "../../shared/ui/ProductCard";
import { ReusableProductSkeleton } from "../../shared/ui/ReusableProductSkeleton";

export const Home = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  if (isLoading) return <ReusableProductSkeleton items={12} />;
  if (isError) return <h2>{error.message}</h2>;

  const allProducts = data?.data;

  return (
    <div>
      <div className="container mx-auto">
        <HomeSlider />
        <HomeCategoriesSlider />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-15 gap-7">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
