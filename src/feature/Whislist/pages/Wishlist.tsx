import { useQuery } from "@tanstack/react-query";
import { wishlistAtom } from "../atoms/wishlistAtom";
import { Loading } from "@shared/ui/Loading";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { cartInfoAtom } from "@feature/Cart/atoms/cart-atom";
import type { wishlistProductType } from "../types";

export function Wishlist() {
  const { wishlistData, count } = wishlistAtom.useValue();
  console.log(wishlistData, count);

  const { isLoading, isError, error } = useQuery({
    queryKey: ["wishlist"],
    queryFn: wishlistAtom.getUserWishlist,
  });
  if (isLoading) return <Loading />;
  if (isError) return toast.error(error.message);
  return (
    <section>
      <div className="container mx-auto px-4">
        <div className="flex items-center flex-col py-8">
          <FaRegHeart className="text-4xl text-pink-500" />
          <h2 className="text-4xl italic mt-3 font-bold">My Wishlist</h2>
          <p className="text-gray-500 mt-2">You have {count} items</p>
        </div>

        <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-md rounded-lg border border-gray-200">
          <table className="w-full table-fixed text-sm text-left rtl:text-right text-body">
            <thead className="text-sm text-body bg-neutral-secondary-medium border-b border-gray-200">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium w-2/5">
                  Product name
                </th>
                <th scope="col" className="px-6 py-4 font-medium w-1/5">
                  Category
                </th>
                <th scope="col" className="px-6 py-4 font-medium w-1/5">
                  Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 font-medium w-1/5 text-center "
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {wishlistData.map((product: wishlistProductType) => (
                <tr
                  key={product._id}
                  className="bg-neutral-primary-soft border-b border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 flex items-center gap-4 font-medium text-heading whitespace-nowrap overflow-hidden text-ellipsis"
                  >
                    <MdDeleteOutline
                      onClick={() =>
                        wishlistAtom.removeProductFromWishlist(product._id)
                      }
                      className="text-gray-500 text-xl cursor-pointer"
                    />
                    <img
                      className="w-12 h-12 object-cover rounded"
                      src={product.imageCover}
                      alt=""
                    />
                    <span className="truncate">{product.title}</span>
                  </th>
                  <td className="px-6 py-4 truncate">
                    {product.category?.name}
                  </td>
                  <td className="px-6 py-4 font-bold">{product.price} EGP</td>
                  <td className="px-6 py-4 text-center ">
                    <button
                      onClick={() => cartInfoAtom.addProductToCart(product._id)}
                      className="font-medium cursor-pointer text-white bg-pink-600 px-4 py-2 rounded-md hover:bg-pink-700 transition-colors w-full sm:w-auto"
                    >
                      Add To Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
