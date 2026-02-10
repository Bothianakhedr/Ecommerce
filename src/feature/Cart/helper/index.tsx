import Swal from "sweetalert2";
import { cartInfoAtom } from "../atoms/cart-atom";
import toast from "react-hot-toast";
import axios from "axios";
export function handleClearCart() {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ec4899",
    cancelButtonColor: "#64748b",
    confirmButtonText: "Yes, clear it!",
  }).then((result) => {
    if (result.isConfirmed) {
      cartInfoAtom.clearUserCart();
      toast.success("Cart cleared successfully");
    }
  });
}

export function handleAxiosError(error: unknown) {
  if (axios.isAxiosError(error)) {
    toast.error(error.message);
  }
}
