import { HomeSlider, HomeCategoriesSlider } from "./components/index";
import HomeProducts from "./components/HomeProducts.tsx";
import { Helmet } from "react-helmet-async";

export const Home = () => {
  return (
    <>
    <Helmet>
      <title>Home</title>
    </Helmet>
      <div className="container mx-auto bg-white">
        <HomeSlider />
        <HomeCategoriesSlider />
        <HomeProducts />
      </div>
    </>
  );
};
