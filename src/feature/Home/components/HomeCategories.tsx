import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../../services/AllCategories";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { ReusableCategorySkeleton } from "../../../shared/ui/ReusableCategorySkeleton";

export const HomeCategoriesSlider = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategories,
  });

  if (isLoading) return <ReusableCategorySkeleton />;
  if (isError) return <h2 className="text-red-500">{error.message}</h2>;

  const categories = data?.data;

  return (
    <div className="my-8">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2000 }}
        slidesPerView={6}
        spaceBetween={8}
        loop={true}
        breakpoints={{
          300: { slidesPerView: 2 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {categories?.map((cat) => (
          <SwiperSlide key={cat._id}>
            <div className="text-center">
              <img
                className="h-56 w-full object-cover rounded-md"
                src={cat.image}
                alt={cat.name}
              />
              <h3 className="mt-2 text-sm font-semibold">{cat.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
