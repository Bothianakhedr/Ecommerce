import { axiosInstance } from "../../../axiosConfig/axiosInstance";
import { cartInfoAtom } from "../atoms/cart-atom";
import { handleAxiosError } from "../helper";
import toast from "react-hot-toast";

export async function getCartItems() {
  try {
    const { data } = await axiosInstance.get("api/v2/cart");
    cartInfoAtom.update({
      numOfCartItems: data.numOfCartItems,
      totalCartPrice: data.data.totalCartPrice,
      products: data.data.products,
      cartId: data.cartId,
    });
  } catch (error) {
    handleAxiosError(error);
  }
}

export async function updateCartProductQuantity(
  productId: string,
  newCount: number,
) {
  try {
    const { data } = await axiosInstance.put(`api/v1/cart/${productId}`, {
      count: newCount,
    });
    cartInfoAtom.update({
      numOfCartItems: data.numOfCartItems,
      totalCartPrice: data.data.totalCartPrice,
      products: data.data.products,
    });
  } catch (error) {
    handleAxiosError(error);
  }
}
export async function deleteCartItem(productId: string) {
  try {
    const { data } = await axiosInstance.delete(`api/v2/cart/${productId}`);
    cartInfoAtom.update({
      numOfCartItems: data.numOfCartItems,
      totalCartPrice: data.data.totalCartPrice,
      products: data.data.products,
    });
    toast.success("product deleted successfully");
  } catch (error) {
    handleAxiosError(error);
  }
}
export async function clearUserCart() {
  try {
    await axiosInstance.delete("api/v2/cart");
    cartInfoAtom.update({
      products: [],
      numOfCartItems: 0,
      totalCartPrice: 0,
    });
  } catch (error) {
    handleAxiosError(error);
  }
}
