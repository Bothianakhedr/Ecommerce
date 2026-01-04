import { forgotPasswordServices } from "@feature/Auth/services/authServices";
import { ForgotPasswordSchema } from "@feature/Auth/validation/authValidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ErrorMessage, Input } from "@shared/ui";
import { useMutation } from "@tanstack/react-query";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { ThreeCircles } from "react-loader-spinner";

type ForgetPasswordInput = {
  email: string;
};
export const ForgotPassword = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ForgetPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: ForgetPasswordInput) => forgotPasswordServices(data),
    onSuccess: () => toast.success("Check your email for reset link"),
    onError: () => toast.error("Something went wrong"),
  });
  const onSubmit: SubmitHandler<ForgetPasswordInput> = (data) => {
    mutate(data);
  };

  return (
    <div className="container mx-auto px-3 md:px-0 mt-8 max-w-xl">
      <h2 className="text-pink-500 text-2xl font-semibold">
        Forgot Password ?
      </h2>
      <p className="text-gray-600 my-2 italic">
        sign in with your email instead , no password needed!
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
  );
};
