import { axiosInstance } from "../axiosConfig/axiosInstance";

export async function getProductDetails(id: string) {
  const { data } = await axiosInstance.get(`/api/v1/products/${id}`);
  return data;
}
