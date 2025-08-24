// src/components/CourseSilderTHPT.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useJson } from "../../hooks/useJson";
import { useLazyJson } from "../../hooks/useLazyJson";
import ModalPortal from "../ModalPortal";
import { useState } from "react";
import CourseItemTHPT from "../CourseItemTHPT";

const COURSES_URL = `${import.meta.env.BASE_URL}data/thpt.json`;
const SCHEDULE_URL = `${import.meta.env.BASE_URL}schedules/thpt.json`;
const ZALO_LINK = "https://zalo.me/0369984849";

const CourseSilderTHPT = ({ items }) => {
  const {
    data: coursesData,
    loading: loadingCourses,
    error: errorCourses,
  } = useJson(COURSES_URL, { ttl: 120000 });
  const {
    data: scheduleData,
    loading: loadingSchedule,
    error: errorSchedule,
    load: loadSchedule,
  } = useLazyJson();
  const courses = coursesData?.dataTHPT ?? [];

  const [selectedCourse, setSelectedCourse] = useState(null);
  const loading = loadingCourses || loadingSchedule;
  const error = errorCourses || errorSchedule;

  function openCourse(course) {
    setSelectedCourse(course);
    if (!scheduleData) loadSchedule(SCHEDULE_URL).catch(() => {});
  }

  return (
    <>
      <div className="productsSlider">
        <div className="container !w-full px-0 sm:px-0">
          <Swiper
            navigation
            modules={[Navigation]}
            className="mySwiper"
            spaceBetween={20}
            breakpoints={{
              0: { slidesPerView: 2, spaceBetween: 12 },
              480: { slidesPerView: 2, spaceBetween: 12 },
              640: { slidesPerView: 2, spaceBetween: 12 },
              768: { slidesPerView: 3, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 18 },
              1280: { slidesPerView: items || 4, spaceBetween: 24 },
            }}
          >
            {courses.map((c, idx) => (
              <SwiperSlide key={c.id ?? idx}>
                <div>
                  <CourseItemTHPT
                    course={c}
                    onOpen={openCourse}
                    loading={loadingCourses}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {loading && (
        <div className="text-sm text-slate-600 mt-4">Đang tải dữ liệu...</div>
      )}
      {error && (
        <div className="text-sm text-red-600 mt-4">
          Lỗi khi tải dữ liệu: {error.message}
        </div>
      )}

      {selectedCourse && (
        <ModalPortal
          title={selectedCourse.title ?? "Chi tiết khóa"}
          schedule={scheduleData?.schedulesByCourse?.[selectedCourse.id] ?? []}
          loadingSchedule={loadingSchedule}
          onClose={() => setSelectedCourse(null)}
          ctaLink={ZALO_LINK}
        />
      )}
    </>
  );
};

export default CourseSilderTHPT;
