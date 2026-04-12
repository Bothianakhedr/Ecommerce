import { atom } from "@mongez/react-atom";

export const wishlistAtom = atom({
  key: "wishlist",
  default: {
    count: 0,
    wishlistData: [],
  },
});
