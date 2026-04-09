import { axiosInstance } from "../../../axiosConfig/axiosInstance";
import type { CheckoutParams } from "../types";
import { handleAxiosError } from "@feature/Cart/helper";
import toast from "react-hot-toast";
import { cartInfoAtom } from "@feature/Cart/atoms/cart-atom";

export const createCashOrder = async ({
  values,
  cartId,
  setIsLoading,
  setCheckoutInformation,
}: CheckoutParams) => {
  setIsLoading(true);
  try {
    const { data } = await axiosInstance.post(`api/v1/orders/${cartId}`, {
      shippingAddress: values.shippingAddress,
    });
    toast.success("Order Created Successfully");
    setCheckoutInformation?.(data.data);

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
export const checkoutSession = async ({
  values,
  cartId,
  setIsLoading,
  setCheckoutInformation,
}: CheckoutParams) => {
  setIsLoading(true);
  try {
    const { data } = await axiosInstance.post(
      `api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
      { shippingAddress: values.shippingAddress },
    );
    setCheckoutInformation?.(data?.data);

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
