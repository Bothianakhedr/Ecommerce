import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/allProducts";

export default function useProduct() {
  const response = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  });

  return response;
}
