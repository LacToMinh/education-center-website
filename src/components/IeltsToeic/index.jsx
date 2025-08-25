import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiBookOpen, FiClock, FiStar, FiChevronRight } from "react-icons/fi";
import text_dayhocvaluyenthi from "../../assets/text_dayhocvaluyenthi.png";
import { BulletList } from "../List";

export default function IeltsToeic({
  leftImage = "/images/others/ielts.png",
  rightImage = "/images/others/toeic.png",
  logoImage = "/images/icons/logo_but_chi.png",
  headlineTop = "HỆ THỐNG",
  bullets = [
    "Nâng tầm tiếng Anh",
    "Chinh phục IELTS & TOEIC cùng dayhocvaluyenthi.com",
  ],
  leftCourse = {
    title: "IELTS",
    level: "Band 4.0 → 7.0",
    hours: "36 giờ/khoá",
    price: "3.490.000đ/tháng",
    bullets: [
      "Lộ trình cá nhân hoá",
      "Speaking sửa trực tiếp",
      "Test Cambridge tuần",
    ],
    detailHref: "/khoa-hoc/ielts",
    zaloHref: "https://zalo.me/0369984849",
    themeFrom: "#ff3b30",
    themeTo: "#ff7a59",
    textColor: "white",
  },
  rightCourse = {
    title: "TOEIC",
    level: "450+ → 800+",
    hours: "32 giờ/khoá",
    price: "2.490.000đ/tháng",
    bullets: [
      "Ngân hàng 2000+ câu",
      "Chiến thuật Part 5–7",
      "Thi thử chuẩn IIG",
    ],
    detailHref: "/khoa-hoc/toeic",
    zaloHref: "https://zalo.me/0369984849",
    themeFrom: "#1e6ee9",
    themeTo: "#00a2ff",
    textColor: "white",
  },
}) {
  const ease = [0.22, 1, 0.36, 1];
  const leftVariant = {
    hidden: { opacity: 0, x: -200, scale: 0.96 },
    show: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.5, ease } },
  };
  const rightVariant = {
    hidden: { opacity: 0, x: 200, scale: 0.96 },
    show: { opacity: 1, x: 0, scale: 1, transition: { duration: 1.5, ease } },
  };
  const centerBlock = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
  };
  const fromTop = {
    hidden: { opacity: 0, y: -80 },
    show: { opacity: 1, y: 0, transition: { duration: 1.2, ease } },
  };
  const dividerVar = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 1 } },
  };
  const listVar = {
    hidden: {},
    show: { transition: { staggerChildren: 0.25, delayChildren: 0.3 } },
  };
  const fromBottom = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
  };

  const [openIdx, setOpenIdx] = useState(null); // 0 = left, 1 = right

  const Poster = ({ imgSrc, alt, variants, course, idx }) => (
    <motion.figure
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      className="relative group h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden will-change-transform rounded-2xl"
      onMouseLeave={() => setOpenIdx(null)}
    >
      <img
        src={imgSrc}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
        draggable={false}
      />

      {/* overlay click/hover */}
      <button
        type="button"
        aria-label={`Xem thông tin khoá ${course.title}`}
        onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
        className={`absolute inset-0 w-full h-full text-left transition-opacity duration-500
          ${
            openIdx === idx
              ? "opacity-100"
              : "opacity-0 md:group-hover:opacity-100"
          }`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
        <div
          className={`absolute left-3 right-3 bottom-3 md:left-4 md:right-4 md:bottom-4 
                      translate-y-6 md:translate-y-3 
                      ${
                        openIdx === idx
                          ? "translate-y-0"
                          : "md:group-hover:translate-y-0"
                      }
                      transition-transform duration-500`}
        >
          <div className="rounded-2xl p-4 md:p-5 bg-white/90 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg md:text-xl font-bold text-slate-900">
                {course.title} – {course.level}
              </h3>
              <span
                className="text-[12px] font-semibold px-2.5 py-1 rounded-lg text-white shadow"
                style={{
                  background: `linear-gradient(135deg, ${course.themeFrom}, ${course.themeTo})`,
                }}
              >
                Hot
              </span>
            </div>

            <div className="flex flex-wrap gap-4 text-[14px] text-slate-700 mb-3">
              <span className="inline-flex items-center gap-1">
                <FiBookOpen className="opacity-70" /> {course.level}
              </span>
              <span className="inline-flex items-center gap-1">
                <FiClock className="opacity-70" /> {course.hours}
              </span>
              <span className="inline-flex items-center gap-1">
                <FiStar className="opacity-70" /> Cam kết tiến bộ
              </span>
            </div>

            <div className="mb-3">
              <span
                className="inline-flex items-center px-3 py-1 rounded-lg font-bold"
                style={{
                  color: course.textColor,
                  background: `linear-gradient(135deg, ${course.themeFrom}, ${course.themeTo})`,
                }}
              >
                {course.price}
              </span>
            </div>

            {/* Bullets – dùng BulletList để canh đẹp */}
            <BulletList
              items={course.bullets}
              dotColor={course.themeFrom}
              cols={2}
              className="mb-4"
              textClass="text-[14px] text-slate-700"
            />

            <div className="flex flex-wrap gap-3">
              <Link
                to={course.detailHref}
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95"
                style={{
                  background: `linear-gradient(135deg, ${course.themeFrom}, ${course.themeTo})`,
                }}
              >
                Xem chi tiết <FiChevronRight />
              </Link>
              <a
                href={course.zaloHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border border-slate-300 text-slate-800 hover:bg-slate-50"
              >
                Đăng ký qua Zalo
              </a>
            </div>
          </div>
        </div>
      </button>
    </motion.figure>
  );

  return (
    <section className="container mx-auto" id="ielts-toeic">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 my-8">
        <Poster
          imgSrc={leftImage}
          alt="IELTS"
          variants={leftVariant}
          course={leftCourse}
          idx={0}
        />

        {/* CENTER block giữ hiệu ứng cũ */}
        <motion.div
          variants={centerBlock}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="flex flex-col items-center justify-center text-center bg-white px-4 py-6"
        >
          <motion.img
            src={logoImage}
            alt="Logo"
            variants={fromTop}
            className="mb-3 h-28 w-28 object-contain"
          />
          <motion.p
            variants={fromTop}
            className="tracking-[0.5em] text-xs font-extrabold text-black mb-1"
          >
            {headlineTop}
          </motion.p>
          <motion.h2
            variants={fromTop}
            className="text-3xl font-bold text-[#0a1b50]"
          >
            <img src={text_dayhocvaluyenthi} alt="dayhocvaluyenthi.com" />
          </motion.h2>
          <motion.div
            variants={dividerVar}
            className="my-10 h-[2px] w-[20%] bg-black"
          />
          <motion.ul variants={listVar} className="space-y-2">
            {bullets.map((b, i) => (
              <motion.li
                key={i}
                variants={fromBottom}
                className="text-[22px] sm:text-[24px] font-medium text-black"
              >
                {b}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <Poster
          imgSrc={rightImage}
          alt="TOEIC"
          variants={rightVariant}
          course={rightCourse}
          idx={1}
        />
      </div>

      <p className="mt-2 text-center text-sm text-slate-500 md:hidden">
        Nhấp vào poster để xem thông tin khoá học.
      </p>
    </section>
  );
}
