import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Nguyễn Văn A",
    content:
      "Chương trình học rất hay, giáo viên tận tâm và hỗ trợ nhiệt tình.",
  },
  {
    name: "Trần Thị B",
    content: "Con tôi tiến bộ rõ rệt chỉ sau 3 tháng học.",
  },
  {
    name: "Lê Văn C",
    content: "Môi trường học tập thân thiện, cơ sở vật chất tốt.",
  },
  {
    name: "Phạm Thị D",
    content: "Giáo trình khoa học, dễ hiểu, phù hợp với học sinh.",
  },
  { name: "Hoàng Văn E", content: "Rất hài lòng về chất lượng giảng dạy." },
];

// Hàm lấy chữ cái đầu của tên cuối
const getLastNameInitial = (fullName) => {
  const parts = fullName.trim().split(" ");
  return parts[parts.length - 1].charAt(0).toUpperCase();
};

export default function CustomerReviews() {
  return (
    <div className="w-full py-16 lg:py-24 bg-gray-50">
      <h2 className="text-center text-[26px] md:text-3xl lg:text-4xl font-bold mb-10 md:mb-12 lg:mb-16 text-slate-800">
        Đánh giá của khách hàng
      </h2>
      <div className="max-w-6xl mx-auto px-4">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
          slidesPerView={3}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white shadow-md rounded-lg p-6 h-full flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xl font-bold mb-4">
                  {getLastNameInitial(review.name)}
                </div>
                <p className="text-gray-600 italic mb-4">“{review.content}”</p>
                <h3 className="font-semibold text-slate-800">{review.name}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
