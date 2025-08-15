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

      <div className="container flex items-center justify-center pt-[clamp(4px,2vw,32px)]">
        <p className="text-[25px] sm:text-3xl md:text-5xl text-[#001F5D] font-extrabold mt-5 text-center">
          Các khóa học tại trung tâm
        </p>
      </div>

      {/* THCS */}
      <section className="my-20 pt-2" id="thcs">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* left section */}
            <div className="leftSec">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#FF5722]">
                Chương trình Trung học cơ sở
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-normal text-[#FF7043]">
                Dành cho học sinh cấp 2
              </p>
            </div>
          </div>

          <CourseSliderTHCS items={5} />
        </div>
      </section>

      {/* THPT */}
      <section className="my-20 pt-2" id="thpt">
        <div className="container">
          <div className="flex items-center justify-between">
            {/* left section */}
            <div className="leftSec">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#0F7B4B]">
                Chương trình Trung học phổ thông
              </h3>
              <p className="text-sm sm:text-base md:text-lg font-normal text-[#2BAE66]">
                Dành cho học sinh cấp 3
              </p>
            </div>
          </div>

          <CourseSliderTHPT items={4} />
        </div>
      </section>

      <div className="leftSec container">
        <h3 className="text-[22px] font-semibold pt-2">
          Các khóa học Ielts - Toeic
        </h3>
        <p className="text-[15px] font-normal">Dành cho mọi học sinh</p>
      </div>

      <IeltsToeic />
      <RecruitmentSection />
      <CustomerReviews />
    </>
  );
};

export default Home;
