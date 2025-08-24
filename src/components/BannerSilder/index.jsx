import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";

const BannerSlider = () => {
  return (
    // Chiều cao responsive + chặn tràn
    <div className="relative w-full h-[52vh] md:h-[62vh] lg:h-[78vh] overflow-hidden mb-[30px]">
      <Swiper
        navigation
        modules={[Navigation, Autoplay]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        className="w-full h-full"
      >
        {[
          "/banner_ky_niem.png",
          "/co_so_vat_chat.png",
          "/ielts_banner.png",
          "/toeic_banner.png",
          "/hoi_thi_ve.png",
        ].map((src, i) => (
          <SwiperSlide key={i}>
            {/* Ảnh fill khung, crop đẹp */}
            <img
              src={src}
              alt={`banner ${i + 1}`}
              className="w-full h-full object-fill object-center select-none pointer-events-none"
              draggable={false}
              loading={i === 0 ? "eager" : "lazy"}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
