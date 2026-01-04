import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required!")
      .min(3, "Name must be at least 3 characters")
      .trim(),
    email: z
      .string()
      .nonempty("email is required!")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
      .trim(),
    password: z
      .string()
      .nonempty("password is required!")
      .min(6, "Password must be at least 6 characters long")
      .trim(),
    rePassword: z.string().trim().nonempty("Confirm password is required!"),

    phone: z.string().nonempty("phone is required!").trim(),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "password and rePassword do not match ",
    path: ["rePassword"],
  });
export const loginSchema = z.object({
  email: z
    .string()
    .nonempty("email is required!")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .trim(),
  password: z
    .string()
    .nonempty("password is required!")
    .min(6, "Password must be at least 6 characters long")
    .trim(),
});
export const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .nonempty("email is required!")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .trim(),
});
