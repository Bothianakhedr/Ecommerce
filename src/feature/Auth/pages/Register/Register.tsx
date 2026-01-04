import { RegisterInput } from "@feature/Auth/data/data";
import { useRegister } from "@feature/Auth/hooks/useRegister";
import { ThreeCircles } from "react-loader-spinner";
import { Button, ErrorMessage, Input } from "@shared/ui";
import type { InputAttributeRegister } from "@feature/Auth/types/types";

export const Register = () => {
  const { handleSubmit, isPending, onSubmit, register, errors } = useRegister();

  // render
  const renderRegisterInput = RegisterInput.map(
    ({ label, name, type }: InputAttributeRegister) => (
      <div key={name}>
        <label className="text-sm text-gray-600" htmlFor="">
          {label}
        </label>
        {type == "password" }
        <Input type={type} {...register(name)} />
        {errors?.[name] && <ErrorMessage msg={errors?.[name].message} />}
      </div>
    )
  );
  return (
    <div>
      <div className="container mx-auto px-3 md:px-0 max-w-3xl mt-11 space-y-3">
        <h2 className="text-pink-500 text-2xl font-semibold">Register Now</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderRegisterInput}
          <Button disabled={isPending} className="mt-3">
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
              "Submit"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
