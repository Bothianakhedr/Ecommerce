import { Link } from "react-router-dom";
import { FaCartPlus, FaTrashAlt } from "react-icons/fa";
import { cartInfoAtom } from "../atoms/cart-atom";
import type { CartProduct } from "../types";
import { Button } from "@shared/ui";
import { handleClearCart } from "../helper";
import { Helmet } from "react-helmet-async";
import { deleteCartItem, updateCartProductQuantity } from "../services";

export const Cart = () => {
  const { products, totalCartPrice } = cartInfoAtom.useValue();

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <section className="p-4 md:p-9 bg-white dark:bg-gray-900 min-h-screen">
        <div className="container mx-auto bg-gray-50 rounded-xl p-4 md:p-7 dark:bg-gray-800 shadow-sm">
          <h2 className="text-xl md:text-2xl font-semibold mb-4 text-pink-600 flex items-center gap-2">
            <span>Shop Cart</span>
            <FaCartPlus />
          </h2>

          {products.length > 0 && (
            <div className="text-pink-600 font-semibold bg-pink-100 w-full md:w-fit p-3 rounded-lg mb-6 flex justify-between items-center md:block">
              <span className="text-sm md:text-base">Total Price:</span>
              <span className="text-xl md:text-2xl ml-2">{totalCartPrice} L.E</span>
            </div>
          )}

          {products.length === 0 ? (
            <div className="py-16 flex flex-col justify-center items-center text-center">
              <div className="w-20 h-20 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <FaCartPlus className="text-4xl text-pink-500" />
              </div>
              <h3 className="text-lg font-semibold dark:text-white">Your cart is empty!</h3>
              <Link
                to="/"
                className="bg-pink-500 hover:bg-pink-600 transition-colors rounded-full px-6 py-2 text-white text-sm mt-4 shadow-md"
              >
                ADD YOUR FIRST PRODUCT
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {products.map((product: CartProduct) => (
                <div
                  key={product?.product?.id}
                  className="flex flex-col sm:flex-row items-center justify-between border-b border-gray-200 pb-6 pt-4 px-2 gap-4 hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors rounded-lg"
                >
                  <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto text-center sm:text-left">
                    <img
                      src={product.product.imageCover}
                      alt="product"
                      className="w-28 h-28 md:w-24 md:h-24 object-contain bg-white border border-pink-100 rounded-xl shadow-sm"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-slate-800 dark:text-white line-clamp-1">
                        {product.product.title}
                      </h3>
                      <p className="text-pink-600 font-bold text-lg mb-2">
                        {product.price} L.E
                      </p>

                      <button
                        className="flex items-center bg-red-100 p-1 rounded mx-auto sm:mx-0 cursor-pointer gap-2 text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
                        onClick={() => deleteCartItem(product?.product?.id)}
                      >
                        <FaTrashAlt  /> REMOVE
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 bg-white dark:bg-gray-900 p-2 rounded-lg border border-gray-100 dark:border-gray-700">
                    <button
                      className="w-10 h-10 flex items-center cursor-pointer justify-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md hover:bg-pink-500 hover:text-white transition-colors font-bold text-xl"
                      onClick={() => updateCartProductQuantity(product?.product?.id, product.count - 1)}
                      disabled={product.count <= 1}
                    >
                      -
                    </button>

                    <span className="text-lg font-bold w-8 text-center dark:text-white">
                      {product.count}
                    </span>

                    <button
                      className="w-10 h-10 flex items-center cursor-pointer justify-center bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-md hover:bg-pink-500 hover:text-white transition-colors font-bold text-xl"
                      onClick={() => updateCartProductQuantity(product?.product?.id, product.count + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center mt-8 gap-4">
            {products.length > 0 && (
              <Button 
                onClick={handleClearCart} 
                className="w-full sm:w-fit order-2 sm:order-1 bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Clear All Cart
              </Button>
            )}
            
            {products.length > 0 && (
              <Link
                to="/checkout"
                className="w-full sm:w-fit order-1 sm:order-2 bg-pink-500 hover:bg-pink-600 text-white text-center font-bold px-10 py-3 rounded-xl shadow-lg transition-transform active:scale-95"
              >
                Checkout Now
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};