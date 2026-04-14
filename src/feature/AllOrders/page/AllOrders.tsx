import { authAtom } from "@feature/Auth/atoms/auth-atom";
import { useEffect, useState } from "react";
import type { OrderCartItems, OrderResponse, TokenPayload } from "../types";
import { Loading } from "@shared/ui/Loading";
import { Link } from "react-router-dom";
import { getUserOrders } from "../services";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet-async";

export function AllOrders() {
  const [orders, setOrders] = useState<OrderResponse[] | null>(null);
  const token = authAtom.useValue();

  const id = token ? jwtDecode<TokenPayload>(token).id : null;

  useEffect(() => {
    if (id) {
      getUserOrders(id, setOrders);
    }
  }, [id]);

  return (
    <>
    <Helmet>
      <title>Orders</title>
    </Helmet>
    <section className="min-h-screen bg-gray-50 py-12 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-center mb-10 px-2">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight dark:text-white">
            Order History
          </h1>
          <span className="bg-pink-100 text-pink-600 px-4 py-1.5 rounded-full text-sm font-bold ">
            Orders
          </span>
        </div>

        {!orders ? (
          <Loading />
        ) : (
          orders?.map((order: OrderResponse) => (
            <div key={order.id} className="space-y-8 ">
              <div className="bg-white my-5 shadow-sm border rounded-xl p-3 border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300  dark:bg-gray-800">
                <div className="bg-gray-50/50  p-6 border-b border-gray-100 flex flex-col  md:flex-row flex-wrap justify-between items-center gap-4 rounded dark:bg-gray-800  ">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1  dark:text-white">
                        Order Number
                      </p>
                      <p className="text-sm font-bold text-gray-600  dark:text-white">
                        #{order.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {order.isDelivered ? (
                      <span
                        className={`px-4 py-1.5 rounded-md text-[14px] font-bold uppercase tracking-wider text-white bg-red-500 `}
                      >
                        تم التوصيل
                      </span>
                    ) : (
                      <span
                        className={`px-4 py-1.5 rounded-md text-[14px] font-bold uppercase tracking-wider text-white bg-blue-500 `}
                      >
                        قيد التوصيل
                      </span>
                    )}
                    {order.isPaid ? (
                      <span
                        className={`px-4 py-1.5 rounded-md text-[14px] font-bold uppercase tracking-wider text-white bg-green-500 `}
                      >
                        تم الدفع
                      </span>
                    ) : (
                      <span
                        className={`px-4 py-1.5 rounded-md text-[14px] font-bold uppercase tracking-wider text-white bg-red-500 `}
                      >
                        غير مدفوع
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-6">
                    {order.cartItems.map((product: OrderCartItems) => (
                      <div
                        key={product.product._id}
                        className="flex items-center gap-5"
                      >
                        <div className="relative">
                          <img
                            src={product.product.imageCover}
                            className="w-20 h-20 object-cover rounded-2xl border border-gray-100 shadow-sm"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800 text-base  dark:text-white">
                            {product.product.title}
                          </h3>
                          <p className="text-pink-500 font-semibold text-sm  dark:text-white">
                            {product.price} EGP
                          </p>
                        </div>
                        <Link
                          to={`/product/${product.product._id}`}
                          className="hidden md:block bg-gray-50 hover:bg-gray-100 text-gray-600 text-xs rounded-xl py-2 px-4 border border-gray-200"
                        >
                          View Product
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
    </>
  );
}
