import { handleAxiosError } from "@feature/Cart/helper";
import { axiosInstance } from "../../../axiosConfig/axiosInstance";
import type React from "react";
import type { SetStateAction } from "react";
import type { OrderResponse } from "../types";

export async function getUserOrders(
  id: string,
  setOrders: React.Dispatch<SetStateAction<OrderResponse[] |null>>,
) {
  try {
    const { data } = await axiosInstance.get(`api/v1/orders/user/${id}`);
    setOrders(data);
  } catch (error) {
    handleAxiosError(error);
  }
}
