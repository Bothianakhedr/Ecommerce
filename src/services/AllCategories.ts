import { axiosInstance } from "../axiosConfig/axiosInstance";
import { type TCategoryResponse } from "../types";

export async function getAllCategories() {
  const { data } = await axiosInstance.get<TCategoryResponse>("api/v1/categories");
  return data;
}
