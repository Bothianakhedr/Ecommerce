import { axiosInstance } from "../../../axiosConfig/axiosInstance";
import toast from "react-hot-toast";
import { atom } from "@mongez/react-atom";
import type { CartInfo } from "../types";
import axios from "axios";

export const cartInfoAtom = atom<CartInfo>({
  key: "cart",
  default: {
    numOfCartItems: 0,
    totalCartPrice: 0,
    products: [],
  },
  actions: {
    addProductToCart: async (productId: string) => {
      try {
        const { data } = await axiosInstance.post("api/v1/cart", { productId });
        toast.success(data.message);
        cartInfoAtom.update({
          numOfCartItems: data.numOfCartItems,
          totalCartPrice: data.data.totalCartPrice,
          products: data.data.products,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.message);
        }
      }
    },
    getCartItems: async () => {
      try {
        const { data } = await axiosInstance.get("api/v1/cart");
        cartInfoAtom.update({
          numOfCartItems: data.numOfCartItems,
          totalCartPrice: data.data.totalCartPrice,
          products: data.data.products,
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(error.message);
        }
      }
    },
  },
});
