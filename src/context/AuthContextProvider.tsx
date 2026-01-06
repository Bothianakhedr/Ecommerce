import { useState, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(function () {
    return localStorage.getItem("token");
  });

  function handelLogout (){
    localStorage.removeItem("token")
    setToken(null)
  }
  return (
    <AuthContext.Provider value={{ token, setToken , handelLogout }}>
      {children}
    </AuthContext.Provider>
  );
}
