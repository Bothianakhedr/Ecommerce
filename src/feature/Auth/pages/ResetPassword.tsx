import { resetPasswordServices } from "@feature/Auth/services/authServices";
import type { TInputResetPasswordForm } from "@feature/Auth/types/types";
import { ResetPasswordSchema } from "@feature/Auth/validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ErrorMessage, Input } from "@shared/ui";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export const ResetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TInputResetPasswordForm>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: TInputResetPasswordForm) => resetPasswordServices(data),
    onSuccess: () => {
      toast.success("Password updated successfully");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  const onSubmit: SubmitHandler<TInputResetPasswordForm> = (data) => {
    mutate(data);
  };

  return (
    <>
    <Helmet><title>Reset Password</title></Helmet>
    <div className="container mx-auto px-3 md:px-0 mt-8 max-w-xl">
      <h2 className="text-pink-500 text-2xl font-semibold">Reset Password ?</h2>
      <p className="text-gray-600 my-2 italic dark:text-white">
        Create your new password to regain access
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input placeholder="Email ...." {...register("email")} />
        </div>
        {errors?.email && <ErrorMessage msg={errors.email.message} />}
        <div className="mt-3">
          <Input placeholder="New Password ...." {...register("newPassword")} />
        </div>
        {errors?.newPassword && (
          <ErrorMessage msg={errors.newPassword.message} />
        )}
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
