import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import CourseItemTHCS from "../CourseItemTHCS";

const CourseSliderTHPT = (props) => {
  return (
    <div className="productsSlider">
      <div className="container !w-full">
        <Swiper
          slidesPerView={props.items}
          spaceBetween={15}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <CourseItemTHCS />
          </SwiperSlide>
          <SwiperSlide>
            <CourseItemTHCS />
          </SwiperSlide>
          <SwiperSlide>
            <CourseItemTHCS />
          </SwiperSlide>
          <SwiperSlide>
            <CourseItemTHCS />
          </SwiperSlide>
          <SwiperSlide>
            <CourseItemTHCS />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CourseSliderTHPT;
