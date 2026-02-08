import { authAtom } from "@feature/Auth/atoms/auth-atom";
import { axiosInstance } from "../../../axiosConfig/axiosInstance";
import toast from "react-hot-toast";
import { atom } from "@mongez/react-atom";
import type { CartInfo } from "../types";

export const cartInfoAtom = atom<CartInfo>({
  key: "cart",
  default: {
    numOfCartItems: 0,
    totalCartPrice: 0,
    products: [],
  },
  actions: {
    addProductToCart: async (productId: string) => {
      const token = authAtom.value;
      try {
        const { data } = await axiosInstance.post(
          "api/v1/cart",
          { productId },
          {
            headers: { token },
          },
        );
        toast.success(data.message);
        cartInfoAtom.update({
          numOfCartItems: data.numOfCartItems,
          totalCartPrice: data.data.totalCartPrice,
          products: data.data.products,
        });
      } catch (error) {
        console.log(error);
      }
    },
    getCartItems: async () => {
      const token = authAtom.value;
      try {
        const { data } = await axiosInstance.get("api/v1/cart", {
          headers: {
            token,
          },
        });
        console.log(data);
        cartInfoAtom.update({
          numOfCartItems: data.numOfCartItems,
          totalCartPrice: data.data.totalCartPrice,
          products: data.data.products,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
});
