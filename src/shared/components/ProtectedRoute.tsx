import { authAtom } from "@feature/Auth/atoms/auth-atom";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = authAtom.useValue();
  if (token) return children;

  return <Navigate to={"/login"} />;
}
