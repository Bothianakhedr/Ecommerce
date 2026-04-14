import { useQuery } from "@tanstack/react-query";
import { wishlistAtom } from "../atoms/wishlistAtom";
import { Loading } from "@shared/ui/Loading";
import toast from "react-hot-toast";
import { FaRegHeart } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import type { wishlistProductType } from "../types";
import { addProductToCart } from "@feature/ProductDetails/services/getProductDetails";
import { getUserWishlist, removeProductFromWishlist } from "../services";
import { Helmet } from "react-helmet-async";

export function Wishlist() {
  const { wishlistData, count } = wishlistAtom.useValue();

  const { isLoading, isError, error } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getUserWishlist,
  });

  if (isLoading) return <Loading />;
  if (isError) {
    toast.error(error.message);
    return null; 
  }

  return (
    <>
      <Helmet>
        <title>Wishlist</title>
      </Helmet>
      <section className="py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          <div className="flex items-center flex-col mb-10">
            <div className="bg-pink-100 p-4 rounded-full mb-4">
               <FaRegHeart className="text-4xl text-pink-500" />
            </div>
            <h2 className="text-3xl md:text-4xl italic font-bold dark:text-white">My Wishlist</h2>
            <p className="text-gray-500 mt-2 dark:text-gray-400">You have {count} items</p>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
            
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right">
                <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-300">
                  <tr>
                    <th className="px-6 py-4 font-bold">Product</th>
                    <th className="px-6 py-4 font-bold">Category</th>
                    <th className="px-6 py-4 font-bold">Price</th>
                    <th className="px-6 py-4 font-bold text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {wishlistData.map((product: wishlistProductType) => (
                    <tr key={product._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <MdDeleteOutline 
                            onClick={() => removeProductFromWishlist(product._id)}
                            className="text-2xl text-red-400 hover:text-red-600 cursor-pointer transition-colors" 
                          />
                          <img className="w-16 h-16 object-cover rounded-lg shadow-sm" src={product.imageCover} alt={product.title} />
                          <span className="font-semibold text-gray-800 dark:text-white truncate max-w-[200px]">
                            {product.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{product.category?.name}</td>
                      <td className="px-6 py-4 font-bold text-pink-600 dark:text-pink-400">{product.price} EGP</td>
                      <td className="px-6 py-4 text-center">
                        <button 
                          onClick={() => addProductToCart(product._id)}
                          className="bg-pink-600 hover:bg-pink-700 text-white px-5 py-2 rounded-xl transition-all shadow-md active:scale-95"
                        >
                          Add To Cart
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-gray-100 dark:divide-gray-700">
              {wishlistData.map((product: wishlistProductType) => (
                <div key={product._id} className="p-4 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <img className="w-24 h-24 object-cover rounded-xl shadow-sm" src={product.imageCover} alt={product.title} />
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-gray-800 dark:text-white line-clamp-2">{product.title}</h3>
                          <MdDeleteOutline 
                            onClick={() => removeProductFromWishlist(product._id)}
                            className="text-2xl text-red-500" 
                          />
                        </div>
                        <p className="text-sm text-gray-500">{product.category?.name}</p>
                      </div>
                      <p className="font-bold text-pink-600">{product.price} EGP</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => addProductToCart(product._id)}
                    className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold active:scale-[0.98] transition-transform"
                  >
                    Add To Cart
                  </button>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
