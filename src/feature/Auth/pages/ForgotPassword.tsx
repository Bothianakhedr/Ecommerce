import { forgotPasswordServices } from "@feature/Auth/services/authServices";
import type { TInputForgotPasswordForm } from "@feature/Auth/types/types";
import { ForgotPasswordSchema } from "@feature/Auth/validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ErrorMessage, Input } from "@shared/ui";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TInputForgotPasswordForm>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TInputForgotPasswordForm) =>
      forgotPasswordServices(data),
    onSuccess: () => toast.success("Reset code sent to your email"),
    onError: () => toast.error("Email not found."),
  });
  const onSubmit: SubmitHandler<TInputForgotPasswordForm> = (data) => {
    mutate(data);
    setTimeout(() => {
      navigate("/verifyCode");
    }, 2000);
  };

  return (
  <>
  <Helmet><title>Forgot password</title></Helmet>
    <div className="container mx-auto px-3 md:px-0 mt-8 max-w-xl">
      <h2 className="text-pink-500 text-2xl font-semibold dark:text-white">
        Forgot Password ?
      </h2>
      <p className="text-gray-600 my-2 italic dark:text-white">
        Enter your email and we'll send you a password reset link.{" "}
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input placeholder="Email ...." {...register("email")} />
        </div>
        {errors?.email && <ErrorMessage msg={errors.email.message} />}
        <Button disabled={isPending} className="mt-2 block">
          {isPending ? (
            <ThreeCircles
              visible={true}
              height="20"
              width="20"
              color="#661052"
              ariaLabel="three-circles-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </div>
  </>
  );
};
