import { useQuery } from "@tanstack/react-query";
import { getAllBrands } from "../services";
import { Loading } from "@shared/ui/Loading";
import toast from "react-hot-toast";
import type { BrandType } from "../types";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const Brands = () => {
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["allBrands"],
    queryFn: getAllBrands,
  });

  if (isLoading) return <Loading />;
  if (isError) return toast.error(error.message);
  const allBrands = data?.data?.data;

  return (
    <>
      <Helmet>
        <title>Brands</title>
      </Helmet>

      <div className="container mx-auto mt-10 md:grid gap-7  lg:grid-cols-2 xl:grid-cols-3">
        {allBrands?.map((brand: BrandType) => (
          <Link
            to={`/products?brand=${brand._id}`}
            key={brand._id}
            className="shadow-md text-center rounded-md "
          >
            <img
              className="h-56 w-full object-cover rounded-md"
              src={brand.image}
              alt={brand.name}
            />
          </Link>
        ))}
      </div>
    </>
  );
};
