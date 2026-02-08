import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { cartInfoAtom } from "../atoms/cart-atom";
import type { CartProduct } from "../types";
import { FaTrashAlt } from "react-icons/fa";

export const Cart = () => {
  const { products, totalCartPrice } = cartInfoAtom.useValue();
console.log(products);

  return (
    <section className="p-9">
      <div className="container mx-auto bg-gray-50 rounded-md p-7">
        <h2 className="text-2xl font-semibold mb-2 text-pink-500 flex items-center gap-2">
          <span>Shop Cart</span>
          <span>
            <FaCartPlus />
          </span>
        </h2>
        {products.length > 0 && (
          <p className="text-pink-600 font-semibold bg-pink-100 w-fit p-2 rounded">
            Total Price: <span className="text-2xl">{totalCartPrice}</span> L.E
          </p>
        )}

        {products.length === 0 ? (
          <div className="py-16 flex flex-col justify-center items-center">
            <div className="w-16 mb-4 h-16 rounded-full bg-gray-100 flex items-center justify-center">
              <FaCartPlus className="text-3xl text-pink-500" />
            </div>
            <h3 className="text-lg font-semibold">Your cart is empty!</h3>

            <Link
              to="/"
              className="bg-pink-500 hover:bg-pink-400 transition-colors rounded p-2 text-white text-sm mt-2"
            >
              ADD YOUR FIRST PRODUCT TO CART
            </Link>
          </div>
        ) : (
          <div>
            {products.map((product: CartProduct) => (
              <div
                key={product?.product?.id}
                className="flex items-center justify-between border-b border-gray-200 py-4 px-2 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={product.product.imageCover}
                    alt="product"
                    className="w-24 h-24 object-contain bg-white border rounded"
                  />

                  <div>
                    <h3 className="font-semibold text-lg text-slate-800">
                      {product.product.title}
                    </h3>
                    <p className="text-pink-600 font-medium">
                      {product.price} L.E
                    </p>

                    <button
                      className="mt-2 flex items-center gap-2 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-md text-sm transition-all"
                      onClick={() => {
                        /* هنا هننادي removeItem من الـ Atom */
                      }}
                    >
                      <FaTrashAlt /> REMOVE
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-pink-500 text-white rounded-md hover:bg-pink-600 font-bold"
                    onClick={() => {
                      /* أكشن تقليل الكمية */
                    }}
                  >
                    -
                  </button>

                  <span className="text-lg font-semibold w-5 text-center">
                    {product.count}
                  </span>

                  <button
                    className="w-8 h-8 flex items-center justify-center bg-pink-500 text-white rounded-md hover:bg-pink-600 font-bold"
                    onClick={() => {
                      /* أكشن زيادة الكمية */
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
