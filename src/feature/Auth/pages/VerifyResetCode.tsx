import { zodResolver } from "@hookform/resolvers/zod";
import { Button, ErrorMessage, Input } from "@shared/ui";
import { useForm, type SubmitHandler } from "react-hook-form";
import { VerifyResetCodeSchema } from "../validation/authValidation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { verifyResetCode } from "../services/authServices";
import { ThreeCircles } from "react-loader-spinner";
import type { VerifyResetCodeType } from "../types/types";

export const VerifyResetCode = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyResetCodeType>({
    resolver: zodResolver(VerifyResetCodeSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: VerifyResetCodeType) => verifyResetCode(data),
    onSuccess: () => toast.success("Code verified successfully"),
    onError: () => toast.error("Verified Code invalid"),
  });

  const onSubmit: SubmitHandler<VerifyResetCodeType> = (data) => {
    console.log(data);
    mutate(data);
  };
  return (
    <div className="container mx-auto px-3 md:px-0 mt-8 max-w-xl">
      <h2 className="text-pink-500 text-2xl font-semibold">
        Verification Code
      </h2>
      <p className="text-gray-600 my-2 italic">
        Verification code has been sent to your inbox. Please copy it to the
        input box below.{" "}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            placeholder="Verification Code..."
            {...register("resetCode")}
          />
        </div>
        {errors.resetCode && <ErrorMessage msg={errors.resetCode.message} />}
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
            "Verify Code"
          )}
        </Button>{" "}
      </form>
    </div>
  );
};
