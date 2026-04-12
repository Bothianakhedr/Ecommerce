
import { atom } from "@mongez/react-atom";
import type { CartInfo } from "../types";

export const cartInfoAtom = atom<CartInfo>({
  key: "cart",
  default: {
    numOfCartItems: 0,
    totalCartPrice: 0,
    products: [],
    cartId: "",
  },
  
});
