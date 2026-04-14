import { useSearchParams } from "react-router-dom";
import type { TProduct } from "types";

type AsideProps = {
  allProducts: TProduct[] | undefined;
};

export default function Aside({ allProducts }: AsideProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = allProducts
    ? [...new Set(allProducts.map((product) => product.category.name))]
    : [];
  const brands = allProducts
    ? [...new Set(allProducts.map((product: TProduct) => product.brand.name))]
    : [];

    
  const handleBrandChange = (brandName: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.get("brand") === brandName) {
      params.delete("brand");
    } else {
      params.set("brand", brandName);
    }
    console.log([...params]);
    
    setSearchParams(params);
  };

  const handleCategoryChange = (categoryName: string) => {
    const params = new URLSearchParams(searchParams);
    if (params.get("category") === categoryName) {
      params.delete("category");
    } else {
      params.set("category", categoryName);
    }

console.log([...searchParams]); 
    

    setSearchParams(params);
  };

  return (
    <aside
      id="default-sidebar"
      className="rounded-md hidden md:block p-1.5 shadow mt-15  w-64 h-full transition-transform -translate-x-full sm:translate-x-0 dark:bg-gray-800"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft  border-default">
        <h2 className="text-[13px] font-semibold uppercase dark:text-white">Categories</h2>
        <ul className="space-y-1 font-medium">
          {categories.map((name) => (
            <li key={name} className="w-36 mt-3">
              <input
                id={name} 
                type="checkbox"
                className="w-4 h-4 rounded-xs bg-neutral-secondary-medium"
                checked={searchParams.get("category") === name}
                onChange={() => handleCategoryChange(name)}
              />
              <label
                htmlFor={name}
                className="select-none ms-2 text-sm font-medium text-heading cursor-pointer dark:text-gray-200"
              >
                {name}
              </label>
            </li>
          ))}
        </ul>
        <div className="h-0.5 bg-gray-100 w-32 my-3"></div>
        <h2 className="text-[13px] font-semibold uppercase dark:text-white">Brands</h2>
        <ul className="space-y-1 font-medium">
          {brands.map((name) => (
            <li key={name} className="w-36 mt-3">
              <input
                id={name} //defacto
                type="checkbox"
                className="w-4 h-4 rounded-xs bg-neutral-secondary-medium"
                checked={searchParams.get("brand") === name}
                onChange={() => handleBrandChange(name)}
              />
              <label
                htmlFor={name}
                className="select-none ms-2 text-sm font-medium text-heading cursor-pointer dark:text-gray-200"
              >
                {name}
              </label>
            </li>
          ))}
        </ul>
        <div className="h-0.5 bg-gray-100 w-32 my-3"></div>
      </div>
    </aside>
  );
}
