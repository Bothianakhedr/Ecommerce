import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import type { TProduct } from "../../types";

export const ProductCard = ({ product }: { product: TProduct }) => {
  const {
    title,
    category,
    price,
    ratingsAverage,
    imageCover,
    priceAfterDiscount,
    _id,
  } = product;

  return (
    <div className="group shadow-md hover:shadow-xl rounded-md overflow-hidden transition-all duration-300 bg-white">
      <div className="relative overflow-hidden">
        <img
          className="w-full transition-transform duration-500 group-hover:scale-105"
          src={imageCover}
          alt={title}
        />

        {priceAfterDiscount && (
          <span className="absolute top-2 left-2 z-10 bg-pink-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
            {Math.round(100 - (priceAfterDiscount / price) * 100)}%
          </span>
        )}

        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex items-center gap-3">
            <Link
              to={""}
              title="Add to wishlist"
              className="bg-white text-pink-500 w-9 h-9  hover:bg-pink-500 hover:text-white transition-all duration-300 rounded-full flex items-center justify-center shadow-lg"
            >
              <FaHeart />
            </Link>
            <Link
              to={""}
              title="Add to cart"
              className="bg-white text-pink-500 w-9 h-9 hover:bg-pink-500 hover:text-white transition-all duration-300 rounded-full flex items-center justify-center shadow-lg"
            >
              <FaCartPlus />
            </Link>
            <Link
              to={`/product/${_id}`}
              className="bg-white text-pink-500 w-9 h-9 hover:bg-pink-500 hover:text-white transition-all duration-300 rounded-full flex items-center justify-center shadow-lg"
            >
              <FaRegEye />
            </Link>
          </div>
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-pink-600 text-xs font-medium mb-1">
          {category.name}
        </h3>
        <h2
          className="text-gray-800 font-bold line-clamp-1 mb-2 h-6"
          title={title}
        >
          {title}
        </h2>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {priceAfterDiscount ? (
              <>
                <span className="text-gray-900 font-bold">
                  {priceAfterDiscount} L.E
                </span>
                <del className="text-gray-400 text-xs">{price} L.E</del>
              </>
            ) : (
              <span className="text-gray-900 font-bold">{price} L.E</span>
            )}
          </div>

          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-md">
            <FaStar className="text-yellow-400 text-sm" />
            <span className="text-sm font-semibold text-gray-700">
              {ratingsAverage}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
