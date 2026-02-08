import { atom } from "@mongez/react-atom";
export const authAtom = atom({
  key: "auth",
  default: localStorage.getItem("token"),
});
