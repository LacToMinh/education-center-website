import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";
import CourseItemTHPT from "../CourseItemTHPT";

const CourseSilderTHPT = (props) => {
  return (
    <div className="productsSlider">
      <div className="container !w-full">
        <Swiper
          slidesPerView={props.items}
          spaceBetween={50}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
        >
          <SwiperSlide>
            <CourseItemTHPT />
          </SwiperSlide>
          <SwiperSlide>
            <CourseItemTHPT />
          </SwiperSlide>
          <SwiperSlide>
            <CourseItemTHPT />
          </SwiperSlide>
          <SwiperSlide>
            <CourseItemTHPT />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default CourseSilderTHPT;
