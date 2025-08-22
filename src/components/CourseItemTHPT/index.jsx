import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_but_chi.png";
import Reveal from "../Reveal";
import { useJson } from "../../hooks/useJson";

const ZALO_LINK = "https://zalo.me/0369984849";

// const scheduleTHPT = [
//   {
//     grade: "Lớp 10",
//     days: "Thứ 2 – 4",
//     note: "Thứ 6 tăng cường",
//     shift: "CA 1",
//     time: "18:00 – 19:30",
//   },
//   {
//     grade: "Lớp 10",
//     days: "Thứ 3 – 5",
//     note: "Ôn chuyên đề",
//     shift: "CA 2",
//     time: "19:30 – 21:00",
//   },
//   {
//     grade: "Lớp 11",
//     days: "Thứ 2 – 4",
//     note: "Thực hành đề",
//     shift: "CA 1",
//     time: "16:30 – 18:00",
//   },
//   {
//     grade: "Lớp 12",
//     days: "Thứ 3 – 5",
//     note: "Luyện thi TN THPT",
//     shift: "CA 2",
//     time: "19:30 – 21:00",
//   },
// ];

/** Modal portal: render lên document.body để phủ toàn trang */
function ModalPortal({ title = "TOÁN THPT", schedule = [], onClose }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-[92vw] max-w-[980px] max-h-[86vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* nút đóng */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
          aria-label="Đóng"
          autoFocus
        >
          ✕
        </button>

        {/* header */}
        <div className="px-6 pt-6 pb-3 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-emerald-50 text-emerald-700 font-extrabold">
            2 CA
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-[#001F5D]">
            {title}
          </h2>
        </div>

        {/* nội dung (scroll) */}
        <div className="px-6 pb-4 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {schedule.map((r, i) => (
              <Reveal key={i} delayMs={80 * i}>
                <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold text-[#0a1b50]">
                      {r.grade}
                    </span>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-600 text-white">
                      {r.shift}
                    </span>
                  </div>
                  <div className="mt-2 text-[15px]">
                    <div className="font-semibold">📅 {r.days}</div>
                    <div className="text-slate-600">({r.note})</div>
                    <div className="mt-1 font-semibold">🕒 {r.time}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="mt-6 text-slate-600 leading-relaxed text-center">
            Lộ trình bám sát – luyện đề chuẩn cấu trúc, phù hợp học sinh THPT.
          </p>
        </div>

        {/* footer */}
        <div className="px-6 pb-6 pt-4">
          <a
            href={ZALO_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center rounded-2xl bg-[#001F5D] py-4 text-white text-[18px] font-semibold hover:opacity-95 active:scale-[0.99] transition"
          >
            ĐĂNG KÝ
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

const CourseItemTHPT = () => {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);
  const DATA_URL = `${import.meta.env.BASE_URL}schedules/thpt.json`;
  const { data, loading, error } = useJson(DATA_URL);

  return (
    <>
      <Reveal>
        <div
          className="thcs-card group relative overflow-hidden w-full rounded-lg my-4 shadow-[0_1px_8px_rgba(0,0,0,0.1)] bg-white
                   h-[245px] sm:h-[360px] md:h-[355px] lg:h-[380px]"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <div className="relative w-full overflow-hidden z-10">
            <div
              style={{
                position: "absolute",
                top: "-50%",
                left: "-50%",
                width: "200%",
                height: "200%",
                background:
                  "linear-gradient(to right, transparent, rgba(255,255,255,0.7), rgba(255,255,255,0.9), transparent)",
                transform: hover
                  ? "rotate(45deg) translate(50%, 50%)"
                  : "rotate(45deg) translate(-100%, -100%)",
                opacity: hover ? 1 : 0,
                transition: "transform 0.5s ease-out, opacity 0.5s ease-out",
                pointerEvents: "none",
                zIndex: 5,
              }}
            />
            {/* ribbon nhỏ hơn trên mobile */}
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

            {/* Ảnh (nhỏ lại trên mobile) */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              disabled={loading}
              className={`card-img w-full overflow-hidden relative z-[1] transition-all duration-500 hover:scale-105
                       h-[160px] sm:h-[220px] md:h-[250px] ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              <img
                src="/ly.png"
                alt="Toán THCS"
                className="pt-4 w-[90%] md:w-[100%] lg:w-[90%] mx-auto object-cover p-1"
              />
            </button>

            {/* nút Chi tiết – canh giữa, nhỏ hơn trên mobile */}
            <div
              className="hidden lg:flex absolute bottom-[-48px] left-1/2 -translate-x-1/2 z-10 items-center px-2 py-1.5 sm:px-2 sm:py-2
                          bg-[#eb7d00] rounded-md shadow-md transition-all duration-500 group-hover:bottom-[10px] sm:group-hover:bottom-[14px] cursor-pointer"
              onClick={() => setOpen(true)}
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

          {/* info & giá (font nhỏ hơn trên mobile) */}
          <div className="info px-2.5 mt-[-10px] md:mt-[-20px] lg:mt-[-10px] sm:mt-[2px] sm:px-[10px] z-10 relative">
            <h6 className="title capitalize font-bold text-[16px] sm:text-[22px] text-black text-center">
              Toán
            </h6>
            <div className="flex items-center gap-2 sm:gap-3 justify-center">
              <span className="price font-bold text-[14px] sm:text-[17px] text-green-700">
                399,000₫
              </span>
              <span className="old-price line-through text-gray-400 text-xs sm:text-base">
                499,000₫
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

      {/* Popup phủ toàn trang bằng portal */}
      {open && (
        <ModalPortal
          title="TOÁN THPT"
          schedule={data?.schedule ?? []}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default CourseItemTHPT;
