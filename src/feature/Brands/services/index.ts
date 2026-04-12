import { axiosInstance } from "../../../axiosConfig/axiosInstance";

export function getAllBrands() {
  return axiosInstance.get("api/v1/brands");
}
