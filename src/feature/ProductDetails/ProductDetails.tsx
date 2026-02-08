import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loading } from "@shared/ui/Loading";
import ReactImageGallery from "react-image-gallery";
import { Button } from "@shared/ui";
import { getProductDetails } from "../../services/getProductDetails";
import type { TProductDetailsSubCategory } from "types";
import { useEffect } from "react";
import { cartInfoAtom } from "@feature/Cart/atoms/cart-atom";
export const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => getProductDetails(id!),
    enabled: !!id,
  });

  const productDetails = data?.data;
  const imageList = productDetails?.images?.map((imageURL: string) => {
    return {
      original: imageURL,
      thumbnail: imageURL,
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  if (isLoading) return <Loading />;
  if (isError) return toast.error(error.message);

  return (
    <>
      <div className="md:grid grid-cols-12 py-8">
        <div className="col-span-4">
          <ReactImageGallery
            showFullscreenButton={false}
            showBullets={false}
            showNav={false}
            showPlayButton={false}
            items={imageList}
          />
        </div>
        <div className="col-span-8 text-center md:text-left mt-10 md:mt-5  px-5">
          <h2 className="font-bold text-2xl">{productDetails.title}</h2>
          <div className="flex items-center gap-2 mt-3 justify-center md:justify-start">
            <FaStar className="text-yellow-400" />
            <span>{productDetails.ratingsAverage} / 5</span>
            <span className="text-gray-500">
              ({productDetails.ratingsQuantity} reviews)
            </span>
          </div>

          <span className="text-2xl font-semibold mt-2 block ">
            {productDetails.price} EGP
          </span>
          {productDetails.quantity > 0 ? (
            <span className="text-green-600 text-sm">In stock</span>
          ) : (
            <span className="text-red-600 text-sm">Out of stock</span>
          )}
          <p className=" mt-3 whitespace-pre-line text-gray-600 ">
            {productDetails.description}
          </p>
          <h3 className="font-semibold mt-2">
            Category:{" "}
            <span className="text-pink-500">
              {productDetails.category.name}
            </span>
          </h3>
          {productDetails.subcategory.map((sub: TProductDetailsSubCategory) => (
            <span
              key={sub._id}
              className="bg-gray-100 rounded-md inline-block px-2 py-1 text-sm mt-2"
            >
              {sub.name}
            </span>
          ))}

          <div className="flex items-center gap-2 mt-3">
            <img
              src={productDetails.brand.image}
              alt={productDetails.brand.name}
              className="w-10 h-10 object-contain"
            />
            <span className="font-semibold">{productDetails.brand.name}</span>
          </div>

          <Button
            onClick={() => cartInfoAtom.addProductToCart(productDetails.id)}
            className="w-full"
            disabled={productDetails.quantity === 0}
          >
            {productDetails.quantity === 0 ? "Out of Stock" : "+ Add to Cart"}
          </Button>
        </div>
      </div>
    </>
  );
};
