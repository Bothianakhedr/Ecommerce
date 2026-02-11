import { axiosInstance } from "../../../axiosConfig/axiosInstance";
import toast from "react-hot-toast";
import { atom } from "@mongez/react-atom";
import type { CartInfo } from "../types";
import { handleAxiosError } from "../helper";

export const cartInfoAtom = atom<CartInfo>({
  key: "cart",
  default: {
    numOfCartItems: 0,
    totalCartPrice: 0,
    products: [],
  },
  actions: {
    getCartItems: async () => {
      try {
        const { data } = await axiosInstance.get("api/v1/cart");
        console.log(data);
        
        cartInfoAtom.update({
          numOfCartItems: data.numOfCartItems,
          totalCartPrice: data.data.totalCartPrice,
          products: data.data.products,
        });
      } catch (error) {
        handleAxiosError(error);
      }
    },
    addProductToCart: async (productId: string) => {
      try {
        const { data } = await axiosInstance.post("api/v1/cart", { productId });
        toast.success(data.message);
        cartInfoAtom.getCartItems();
      } catch (error) {
        handleAxiosError(error);
      }
    },
    updateCartProductQuantity: async (productId: string, newCount: number) => {
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
    },
    deleteCartItem: async (productId: string) => {
      try {
        const { data } = await axiosInstance.delete(`api/v1/cart/${productId}`);
        cartInfoAtom.update({
          numOfCartItems: data.numOfCartItems,
          totalCartPrice: data.data.totalCartPrice,
          products: data.data.products,
        });
        toast.success("product deleted successfully");
      } catch (error) {
        handleAxiosError(error);
      }
    },
    clearUserCart: async () => {
      try {
        await axiosInstance.delete("api/v1/cart");
        cartInfoAtom.update({
          products: [],
          numOfCartItems: 0,
          totalCartPrice: 0,
        });
      } catch (error) {
        handleAxiosError(error);
      }
    },
  },
});
