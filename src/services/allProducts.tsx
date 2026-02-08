import { axiosInstance } from "../axiosConfig/axiosInstance";
import { type TProductResponse } from "../types";

export async function getAllProducts() {
  const { data } = await axiosInstance.get<TProductResponse>("api/v1/products");
  return data;
}
