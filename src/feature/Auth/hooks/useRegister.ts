import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerServices } from "../services/authServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ErrorResponseType, TInputRegisterForm } from "../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../validation/authValidation";
import type { AxiosError } from "axios";

export const useRegister = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputRegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TInputRegisterForm) => registerServices(data),
    onSuccess: () => {
      toast.success("register successfully");
      navigate("/login");
    },
    onError: (error: unknown) => {
      const errorObj = error as AxiosError<ErrorResponseType>;

      toast.error(errorObj?.response?.data?.message || "Something went wrong");
    },
  });
  const onSubmit: SubmitHandler<TInputRegisterForm> = (data) => {
    mutate(data);
  };

  return { onSubmit, register, handleSubmit, isPending, errors };
};
