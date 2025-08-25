import Tab from "@mui/material/Tab";
import BannerSilder from "../../components/BannerSilder";
import CourseSilder from "../../components/CourseSilderTHPT";
import Tabs from "@mui/material/Tabs";
import { useEffect, useState } from "react";
import CourseSliderTHCS from "../../components/CourseSilderTHCS";
import CourseSliderTHPT from "../../components/CourseSilderTHPT";
import FeatureStrip from "../../components/FeatureStrip";
import StatsStrip from "../../components/UseInView";
import IeltsToeic from "../../components/IeltsToeic";
import RecruitmentSection from "../../components/Recruitment";
import CustomerReviews from "../../components/CustomerReviews";
import { useLocation, useNavigate } from "react-router-dom";
import MiniChatbot from "../../components/MiniChatbot";
import CourseSliderCombo from "../../components/CourseSliderCombo";
const Home = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const id = location.state?.scrollTo;
    if (!id) return;

    setTimeout(() => {
      const headerH = document.querySelector("header")?.offsetHeight ?? 0;
      const el = document.getElementById(id);
      if (!el) return;

      const top =
        el.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
      window.scrollTo({ top, behavior: "smooth" });

      // XÓA state để reload sau không còn cuộn nữa
      navigate(location.pathname, { replace: true, state: {} });
      // (hoặc dùng: window.history.replaceState(null, "", location.pathname))
    }, 0);
  }, [location.state, location.pathname, navigate]);

  return (
    <>
      <BannerSilder />
      <FeatureStrip />
      <StatsStrip />

      <div className="container flex items-center justify-center pt-[clamp(4px,2vw,32px)] overflow-hidden pb-2">
        <p className="text-[23px] sm:text-3xl md:text-5xl text-[#001F5D] font-extrabold mt-5 text-center">
          Các khóa học tại trung tâm
        </p>
      </div>

      {/* THCS */}
      <section className="my-20 pt-2" id="thcs">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* left section */}
            <div className="leftSec">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
                Chương trình Trung học cơ sở
              </h3>
              <p className="text-[15px] sm:text-base md:text-lg font-medium text-[#ff4f1a]">
                Dành cho học sinh cấp 2
              </p>
            </div>
          </div>

          <CourseSliderTHCS items={5} />
        </div>
        <p className="container mt-2 text-center text-[14px] text-slate-500 md:hidden">
          Nhấp vào mũi tên hoặc lướt qua để xem thêm.
        </p>
      </section>

      {/* THPT */}
      <section className="my-20 pt-2" id="thpt">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* left section */}
            <div className="leftSec">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-black">
                Chương trình Trung học phổ thông
              </h3>
              <p className="text-[15px] sm:text-base md:text-lg font-medium text-[#147e44]">
                Dành cho học sinh cấp 3
              </p>
            </div>
          </div>

          <CourseSliderTHPT items={4} />
        </div>
        <p className="container mt-2 text-center text-[14px] text-slate-500 md:hidden">
          Nhấp vào mũi tên hoặc lướt qua để xem thêm.
        </p>
      </section>

      <section className="mt-[-40px]">
        <div className="container">
          <div className="flex items-center justify-between">
            <p className="text-[15px] sm:text-base md:text-lg font-medium text-[#5a0394]">
              Các khóa học combo
            </p>
          </div>
          <CourseSliderCombo />
        </div>
        <p className="container mt-2 text-center text-[14px] text-slate-500 md:hidden">
          Nhấp vào mũi tên hoặc lướt qua để xem thêm.
        </p>
      </section>

      <div className="leftSec container pt-20">
        <h3 className="text-[22px] font-semibold pt-2">
          Các khóa học Ielts - Toeic
        </h3>
        <p className="text-[16px] font-normal">Dành cho mọi học sinh</p>
      </div>

      <IeltsToeic />
      <RecruitmentSection />
      <CustomerReviews />

      <MiniChatbot />
    </>
  );
};

export default Home;
