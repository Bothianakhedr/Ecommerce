import { loginInput } from "@feature/Auth/data/data";
import { ThreeCircles } from "react-loader-spinner";
import { Button, ErrorMessage, Input } from "@shared/ui";
import type { InputAttributeLogin } from "@feature/Auth/types/types";
import { useLogin } from "@feature/Auth/hooks/useLogin";
import { Link } from "react-router-dom";

export const Login = () => {
  const { handleSubmit, isPending, onSubmit, register, errors } = useLogin();

  // render
  const renderLoginInput = loginInput.map(
    ({ label, name, type }: InputAttributeLogin) => (
      <div key={name}>
        <label className="text-sm text-gray-600" htmlFor="">
          {label}
        </label>
        <Input type={type} {...register(name)} />
        {errors?.[name] && <ErrorMessage msg={errors?.[name].message} />}
        {type === "password" && (
          <div className=" text-sky-500 hover:text-sky-600 font-semibold transition underline text-end my-1   text-[13px]">
            <Link to={"/forgotPassword"}>ForgotPassword?</Link>
          </div>
        )}
      </div>
    )
  );
  return (
    <div>
      <div className="container mx-auto px-4 md:px-0 max-w-3xl mt-11 space-y-3">
        <h2 className="text-pink-500 text-2xl font-semibold">Login Now</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {renderLoginInput}
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
