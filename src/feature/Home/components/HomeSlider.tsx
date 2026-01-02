import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay,  } from "swiper/modules";

import '../../../../node_modules/swiper/swiper.css';

import slider1 from "../../../assets/images/slider-image-1.jpeg";
import slider2 from "../../../assets/images/slider-image-2.jpeg";
import slider3 from "../../../assets/images/slider-image-3.jpeg";

export const HomeSlider = () => {
  return (
    <div className="grid grid-cols-12 my-6">
      <div className="col-span-12 md:col-span-8 px-2 md:px-0">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000 }}
          loop={true}
          className="h-full rounded-l-lg" 
        >
          <SwiperSlide>
            <img className="w-full h-full object-cover" src={slider1} alt="slide 1" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full h-full object-cover" src={slider2} alt="slide 2" />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-full h-full object-cover" src={slider3} alt="slide 3" />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="hidden md:col-span-4 md:flex flex-col">
        <div className="h-1/2">
          <img className="w-full h-full object-cover rounded-tr-lg" src={slider2} alt="static 1" />
        </div>
        <div className="h-1/2">
          <img className="w-full h-full object-cover rounded-br-lg" src={slider3} alt="static 2" />
        </div>
      </div>
    </div>
  );
};