import { createContext, type Dispatch, type SetStateAction } from "react";

type ThemeContextType = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextType >({
  theme: "",
  setTheme: () => {},
});
