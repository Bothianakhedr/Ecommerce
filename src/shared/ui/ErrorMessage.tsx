export const ErrorMessage = ({ msg }: { msg: string | undefined }) => {
  return <span className="text-pink-600 text-[12px] font-semibold">{msg}</span>;
};
