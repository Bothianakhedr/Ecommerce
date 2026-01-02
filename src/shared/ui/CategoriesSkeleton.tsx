export const CategoriesSkeleton = () => {
  return (
    <div
      role="status"
      className="flex flex-col mb-8 items-center justify-center animate-pulse w-full"
    >
      <div className="w-full aspect-square bg-gray-300 rounded-md mb-3"></div>
      <div className="h-3 bg-gray-300 rounded-full w-24"></div>
    </div>
  );
};
