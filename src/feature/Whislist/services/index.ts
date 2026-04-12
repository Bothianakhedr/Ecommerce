import { axiosInstance } from "../../../axiosConfig/axiosInstance";
import toast from "react-hot-toast";
import { wishlistAtom } from "../atoms/wishlistAtom";
import { handleAxiosError } from "@feature/Cart/helper";

  export async function addProductToWishlist (productId: string)  {
      try {
        const { data } = await axiosInstance.post("api/v1/wishlist", {
          productId,
        });
        toast.success(data.message);
        getUserWishlist()
      } catch (error) {
        handleAxiosError(error);
      }
    }
    export async function getUserWishlist() {
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
    }
     export async function removeProductFromWishlist(productId: string)  {
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
    }