import type { ReactNode } from "react";

type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  className?: string;
};
export const Button = ({ className, children, ...rest }: TButtonProps) => {
  return (
    <button
      className={`bg-pink-600 hover:bg-pink-700 text-white transition-colors px-8 py-2 rounded-md cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-500 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
