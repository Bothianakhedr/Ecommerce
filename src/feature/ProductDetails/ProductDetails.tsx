import { useParams } from "react-router-dom";
import { axiosInstance } from "../../axiosConfig/axiosInstance";
import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Loading } from "@shared/ui/Loading";
import ReactImageGallery from "react-image-gallery";

import { Button } from "@shared/ui";
export const ProductDetails = () => {
  const { id } = useParams();

  function getProductDetails() {
    return axiosInstance.get(`/api/v1/products/${id}`);
  }
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: getProductDetails,
  });

  const productDetails = data?.data?.data;

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
        <div className="col-span-5">
          <ReactImageGallery
            showFullscreenButton={false}
            showBullets={false}
            showNav={false}
            showPlayButton={false}
            items={imageList}
          />
        </div>
        <div className="col-span-7 text-center md:text-left mt-10 md:mt-5  px-5">
          <h2 className="font-bold text-2xl">{productDetails.title}</h2>
          <span className="text-xl font-semibold mt-2 block text-pink-500">
            {productDetails.price} EGP
          </span>
          <p className="text-gray-600 mt-3 ">{productDetails.description}</p>
          <h3 className="text-pink-600 mt-2 font-semibold">
            {productDetails.category.name}
          </h3>
          <h5 className="bg-pink-500 mx-auto md:mx-0 text-white w-fit px-2 py-1 mt-2 rounded">
            Brand: {productDetails.brand.name}
          </h5>
          <div className="flex items-center gap-2 mt-3 justify-center md:justify-start">
            <FaStar className="text-yellow-400" />
            <span>{productDetails.ratingsAverage} / 5</span>
            <span className="text-gray-500">
              ({productDetails.ratingsQuantity} reviews)
            </span>
          </div>

          <Button className="mt-2 ">ADD TO CART</Button>
        </div>
      </div>
    </>
  );
};
