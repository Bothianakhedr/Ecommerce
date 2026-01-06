
import { Products } from "@feature/Products/Products";
import { HomeSlider , HomeCategoriesSlider } from "./components/index";

export const Home = () => {
  return (
    <div>
      <div className="container mx-auto">
        <HomeSlider />
        <HomeCategoriesSlider />
        <Products />
      </div>
    </div>
  );
};
