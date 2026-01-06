import { createContext, type SetStateAction } from "react";

type AuthContextType = {
  token: string | null;
  setToken: React.Dispatch<SetStateAction<string | null>>;
  handelLogout: () => void;
};
export const AuthContext = createContext<AuthContextType>({
  token: "",
  setToken: () => {},
  handelLogout: () => {},
});
