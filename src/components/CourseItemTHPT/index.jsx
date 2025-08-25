// src/components/CourseItemTHPT.jsx
import { useState } from "react";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_but_chi.png";
import Reveal from "../Reveal";

const ZALO_LINK = "https://zalo.me/0369984849";

const CourseItemTHPT = ({ course, onOpen, loading }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  return (
    <>
      <Reveal>
        <div
          className="thcs-card group relative overflow-hidden w-full rounded-lg my-4 shadow-[0_1px_8px_rgba(0,0,0,0.1)] bg-white
                       h-[245px] sm:h-[360px] md:h-[355px] lg:h-[350px] xl:h-[350px] 2xl:h-[390px]"
          onMouseEnter={() => setHoverIndex(course.id)}
          onMouseLeave={() => setHoverIndex(null)}
        >
          <div className="relative w-full overflow-hidden z-0">
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.7), rgba(255,255,255,0.9), transparent)",
                transform:
                  hoverIndex === course.id
                    ? "rotate(45deg) translate(50%, 50%)"
                    : "rotate(45deg) translate(-100%, -100%)",
                opacity: hoverIndex === course.id ? 1 : 0,
                transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
                pointerEvents: "none",
                zIndex: 5,
              }}
            />
            <div className="absolute top-0 right-1.5 z-10">
              <span
                className="relative inline-block bg-gradient-to-r from-[#016828] via-[#01963a] to-[#016828] text-white
                        text-[11px] sm:text-[13px] font-bold uppercase tracking-wide px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-l-sm shadow
                        after:content-[''] after:absolute after:-right-2 after:top-0 after:border-t-[18px] sm:after:border-t-[20px]
                        after:border-b-[18px] sm:after:border-b-[20px] after:border-l-[8px] after:border-t-transparent
                        after:border-b-transparent after:border-l-[#016828]"
              >
                THPT
              </span>
            </div>

            <button
              type="button"
              onClick={() => onOpen(course)}
              disabled={loading}
              className={`card-img w-full overflow-hidden relative z-[1] transition-all duration-500 hover:scale-105
                           h-[160px] sm:h-[220px] md:h-[250px] ${
                             loading ? "opacity-60 cursor-not-allowed" : ""
                           }`}
            >
              <img
                src={course.image ?? "/ly.png"}
                alt={course.title ?? "Khóa học"}
                className="pt-3 w-[90%] md:w-[100%] lg:w-[70%] xl:w-[75%] 2xl:w-[76%] mx-auto object-cover p-1"
              />
            </button>

            <div
              className="hidden lg:flex absolute bottom-[-58px] left-1/2 -translate-x-1/2 z-50 items-center px-2 py-1.5 sm:px-2 sm:py-2
                              bg-[#eb7d00] rounded-md shadow-md transition-all duration-500 group-hover:bottom-[10px] sm:group-hover:bottom-[14px] cursor-pointer"
              onClick={() => onOpen(course)}
            >
              <button
                className="inline-flex items-center justify-center w-[36px] sm:w-[45px]"
                aria-label="Xem chi tiết"
              >
                <FaRegEye className="text-[20px] sm:text-[26px] text-white" />
              </button>
              <span className="font-semibold ml-1 text-white text-xs sm:text-sm">
                Chi tiết
              </span>
            </div>
          </div>

          <div className="info px-2.5 mt-[-10px] md:mt-[-20px] lg:mt-[-25px] 2xl:mt-[10px] sm:mt-[2px] sm:px-[10px] z-0 relative">
            <h6 className="title capitalize font-bold text-[16px] sm:text-[22px] text-black text-center">
              {course.title}
            </h6>
            <div className="flex items-center gap-2 sm:gap-3 justify-center">
              <span className="price font-bold text-[14px] sm:text-[17px] text-green-700">
                {course.price
                  ? `${course.price.toLocaleString()}₫`
                  : "399,000₫"}
              </span>
              <span className="old-price line-through text-gray-400 text-xs sm:text-base">
                {course.oldPrice
                  ? `${course.oldPrice.toLocaleString()}₫`
                  : "499,000₫"}
              </span>
            </div>

            <div className="flex w-full items-center">
              <div className="w-[24%] sm:w-[20%] flex justify-end mt-1.5 sm:mt-2">
                <Link to={ZALO_LINK} target="_blank" rel="noopener noreferrer">
                  <img
                    src={logo}
                    className="w-[60%] sm:w-[70%] p-1 border border-gray-300 sm:border-gray-400 rounded-full"
                    alt="Zalo"
                  />
                </Link>
              </div>
              <div className="w-[76%] sm:w-[80%]">
                <span
                  className="promo-pill flex items-center ml-3 sm:ml-[54px] justify-center mt-1.5 sm:mt-2 px-2.5 sm:px-[12px] py-[3px] sm:py-[4px]
                               rounded-full text-[11px] sm:text-[14px] w-fit text-white font-semibold shadow-md"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #001F5D, #022f8a, #043cac, #0972DA)",
                  }}
                >
                  Giảm 10%
                </span>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </>
  );
};

export default CourseItemTHPT;
