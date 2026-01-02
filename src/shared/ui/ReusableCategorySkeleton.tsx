import { CategoriesSkeleton } from "./CategoriesSkeleton";

 export const ReusableCategorySkeleton = ({ items = 6 }: { items?: number }) => {
  return (
    <div className=" gap-7 container mx-auto mt-12 grid lg:grid-cols-4 xl:grid-cols-6">
      {Array.from({ length: items }, (_, index) => (
        <CategoriesSkeleton key={index} />
      ))}
    </div>
  );
};

