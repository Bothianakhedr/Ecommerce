import type { ReactNode } from "react";

type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};
export const Button = ({ children, ...rest }: TButtonProps) => {
  return (
    <button
      className="w-full md:w-auto bg-pink-600 hover:bg-pink-700 text-white transition-colors px-8 py-2 rounded-md cursor-pointer"
      {...rest}
    >
      {children}
    </button>
  );
};
