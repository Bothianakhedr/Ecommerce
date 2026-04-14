import { z } from "zod";

 export const checkoutSchema = z.object({
  shippingAddress: z.object({
    city: z.string().min(1, "City is required").trim(),
    phone: z.string().min(10, "Phone is required").trim(),
    details: z.string().min(5, "Details are required").trim(),
  }),
});