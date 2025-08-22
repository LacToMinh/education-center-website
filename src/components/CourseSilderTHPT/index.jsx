import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import CourseItemTHPT from "../CourseItemTHPT";

const CourseSilderTHPT = (props) => {
  return (
    <div className="productsSlider">
      <div className="container !w-full px-0 sm:px-0">
        <Swiper
          navigation
          modules={[Navigation]}
          className="mySwiper"
          // Khoảng cách slide: nhỏ hơn trên mobile cho vừa 2 box
          spaceBetween={10}
          breakpoints={{
            0: { slidesPerView: 2, spaceBetween: 14 }, // ✅ Mobile: 2 box / hàng
            480: { slidesPerView: 2, spaceBetween: 1 }, // Small
            640: { slidesPerView: 2, spaceBetween: 12 }, // Tablet nhỏ
            768: { slidesPerView: 3, spaceBetween: 14 }, // Tablet ngang
            1024: { slidesPerView: props.items || 3, spaceBetween: 15 }, // Desktop
            1280: { slidesPerView: props.items || 4, spaceBetween: 30 }, // Màn rộng
          }}
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
