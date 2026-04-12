import { atom } from "@mongez/react-atom";
import { axiosInstance } from "../../../axiosConfig/axiosInstance";
import toast from "react-hot-toast";
import { handleAxiosError } from "@feature/Cart/helper";

export const wishlistAtom = atom({
  key: "wishlist",
  default: {
    count: 0,
    wishlistData: [],
  },
  actions: {
    addProductToWishlist: async (productId: string) => {
      try {
        const { data } = await axiosInstance.post("api/v1/wishlist", {
          productId,
        });
        toast.success(data.message);
        console.log(data);
      } catch (error) {
        handleAxiosError(error);
      }
    },
    getUserWishlist: async () => {
      try {
        const { data } = await axiosInstance.get("api/v1/wishlist");
        wishlistAtom.update({
          wishlistData: data.data,
          count: data.count,
        });
        return data;
      } catch (error) {
        handleAxiosError(error);
      }
    },
    removeProductFromWishlist: async (productId: string) => {
      try {
        const { data } = await axiosInstance.delete(
          `api/v1/wishlist/${productId}`,
        );
        console.log(data);

        wishlistAtom.update({
          count: data.count,
          wishlistData: data.data,
        });
        wishlistAtom.getUserWishlist();
        toast.success("product deleted successfully");
      } catch (error) {
        handleAxiosError(error);
      }
    },
  },
});
