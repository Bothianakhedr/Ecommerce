import { cartInfoAtom } from "@feature/Cart/atoms/cart-atom";
import { axiosInstance } from "../../../axiosConfig/axiosInstance";
import { handleAxiosError } from "@feature/Cart/helper";
import toast from "react-hot-toast";

export async function getProductDetails(id: string) {
  const { data } = await axiosInstance.get(`/api/v1/products/${id}`);
  return data;
}



  export async function addProductToCart(productId: string | undefined) {
    try {
      const { data } = await axiosInstance.post("api/v2/cart", { productId });
   toast.success(data.message)
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