import { cartInfoAtom } from "@feature/Cart/atoms/cart-atom";
import { Button, Input } from "@shared/ui";
import { axiosInstance } from "../../axiosConfig/axiosInstance";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { handleAxiosError } from "@feature/Cart/helper";

type IFormInput = {
  shippingAddress: {
    city: string;
    phone: string;
    details: string;
  };
};

export default function Checkout() {
  const { cartId } = cartInfoAtom.useValue();
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit } = useForm<IFormInput>({
    defaultValues: {
      shippingAddress: {
        details: "",
        phone: "",
        city: "",
      },
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (values) => {
    console.log(values);

    if (!cartId) return toast.error("Cart is empty!");
    if (selectedPayment === "cash") createCashOrder(values);
    else {
      checkoutSession(values);
    }
  };

  const createCashOrder = async (values: IFormInput) => {
    setIsLoading(true);
    try {
      await axiosInstance.post(`api/v1/orders/${cartId}`, {
        shippingAddress: values.shippingAddress,
      });
      toast.success("Order Created Successfully");
      cartInfoAtom.update({
        numOfCartItems: 0,
        products: [],
        totalCartPrice: 0,
      });
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };
  const checkoutSession = async (values: IFormInput) => {
    setIsLoading(true);
    try {
      const { data } = await axiosInstance.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress: values.shippingAddress },
      );
      console.log(data);
      
      if (data.status === "success") {
        toast.loading("Redirecting to payment...");
        window.location.href = data.session.url;
      }
    } catch (error) {
      handleAxiosError(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 px-2">Checkout</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid lg:grid-cols-3 gap-8 items-start"
        >
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 gap-4">
              <Input
                placeholder="City"
                type="text"
                {...register("shippingAddress.city")}
              />
              <Input
                placeholder="Phone number"
                type="tel"
                {...register("shippingAddress.phone")}
              />
              <textarea
                className="w-full border-gray-200 p-3 border rounded-xl focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-100 transition-all min-h-[120px] resize-none"
                placeholder="Detailed address (Street, Building...)"
                {...register("shippingAddress.details")}
              ></textarea>
            </div>
          </div>

          <div className="lg:col-span-1 bg-white rounded-3xl shadow-lg p-6 border border-gray-50 sticky top-5">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Order Summary
            </h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span className="font-medium text-gray-800">EGP 80,498.95</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Delivery</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <hr className="border-gray-100 my-4" />
              <div className="flex justify-between items-center text-lg font-bold text-gray-900">
                <span>Total</span>
                <span className="text-pink-500">EGP 81,498.95</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 px-1">
                Payment Method
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="radio"
                    id="cash"
                    value="cash"
                    className="peer hidden"
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    checked={selectedPayment === "cash"}
                  />
                  <label
                    htmlFor="cash"
                    className="block border-2 border-gray-100 rounded-xl p-3 text-center cursor-pointer peer-checked:border-pink-600 peer-checked:bg-pink-50 hover:bg-gray-50 transition-all"
                  >
                    <span className="text-xs font-bold text-gray-700 uppercase">
                      Cash
                    </span>
                  </label>
                </div>

                <div className="relative">
                  <input
                    type="radio"
                    id="online"
                    value="online"
                    className="peer hidden"
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    checked={selectedPayment === "online"}
                  />
                  <label
                    htmlFor="online"
                    className="block border-2 border-gray-100 rounded-xl p-3 text-center cursor-pointer peer-checked:border-pink-600 peer-checked:bg-pink-50 hover:bg-gray-50 transition-all"
                  >
                    <span className="text-xs font-bold text-gray-700 uppercase">
                      Online
                    </span>
                  </label>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className={`w-full h-14 rounded-full bg-pink-500 hover:bg-pink-600 ${isLoading ? "cursor-not-allowed disabled:cursor-not-allowed bg-pink-300" : ""}`}
            >
              {isLoading ? "loading" : "Confirm Order"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
