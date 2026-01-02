import { ProductSkeleton } from "./ProductSkeleton";

export const ReusableProductSkeleton = ({ items }: { items: number }) => {
  return (
    <div className=" container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-10">
      {Array.from({ length: items }, (_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
};
