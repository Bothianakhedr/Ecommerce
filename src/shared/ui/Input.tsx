import type React from "react";

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {};
export const Input = ({  ...rest }: TInputProps) => {
  return (
    <input
      className="w-full border-gray-300 p-1.5 border rounded-md focus:outline-0 focus:border-pink-500 focus:ring-1 focus:ring-pink-600"
      {...rest}
    />
  );
};
