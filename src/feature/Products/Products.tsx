import { ProductCard } from "@shared/ui/ProductCard";
import { ReusableProductSkeleton } from "@shared/ui/ReusableProductSkeleton";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../../services/allProducts";
import Aside from "./components/Aside";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedBrand = searchParams.get("brand");
  const selectedCategory = searchParams.get("category");

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  if (isLoading) return <ReusableProductSkeleton items={12} />;
  if (isError) return toast.error(error.message);

  const allProducts = data?.data;

  const filteredProducts = allProducts?.filter((product) => {
    const matchBrand = selectedBrand
      ? product.brand?.name === selectedBrand
      : true;

    const matchCategory = selectedCategory
      ? product.category?.name === selectedCategory
      : true;

    return matchBrand && matchCategory;
  });

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        <Aside allProducts={allProducts} />

        <div className="flex-1 md:my-15">
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-7">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center border-2 border-dashed border-pink-200 rounded-xl">
              <div className="text-5xl mb-4">🔍</div>
              <h2 className="text-2xl font-bold text-gray-800">
                No Results Found
              </h2>
              <p className="text-gray-500 mt-2 max-w-sm">
                We couldn't find any products matching your current filters. Try
                adjusting your selection or clear all filters.
              </p>

              <button
                onClick={() => setSearchParams({})}
                className="mt-6 px-8 py-2 cursor-pointer bg-pink-600 text-white font-medium rounded-lg hover:bg-pink-700 transition-colors shadow-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
