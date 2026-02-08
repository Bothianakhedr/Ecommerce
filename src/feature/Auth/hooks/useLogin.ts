import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginServices } from "../services/authServices";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { ErrorResponseType, TInputLoginForm } from "../types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validation/authValidation";
import type { AxiosError } from "axios";
import { authAtom } from "../atoms/auth-atom";

export const useLogin = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputLoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TInputLoginForm) => loginServices(data),
    onSuccess: (responseData) => {
      toast.success("login successfully");
      localStorage.setItem("token", responseData.token);
      authAtom.update(responseData.token);
      console.log(responseData.token);
      

      navigate("/");
    },
    onError: (error: unknown) => {
      const errorObj = error as AxiosError<ErrorResponseType>;
      toast.error(errorObj?.response?.data?.message || "Something went wrong");
    },
  });
  const onSubmit: SubmitHandler<TInputLoginForm> = (data) => {
    mutate(data);
  };

  return { onSubmit, register, handleSubmit, isPending, errors };
};
