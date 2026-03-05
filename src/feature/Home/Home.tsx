import { HomeSlider, HomeCategoriesSlider } from "./components/index";
import HomeProducts from "./components/HomeProducts.tsx";

export const Home = () => {
  return (
    <div>
      <div className="container mx-auto bg-white">
        <HomeSlider />
        <HomeCategoriesSlider />
        <HomeProducts />
      </div>
    </div>
  );
};
