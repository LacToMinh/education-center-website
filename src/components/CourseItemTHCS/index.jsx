import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { FaRegEye } from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_but_chi.png";

const ZALO_LINK = "https://zalo.me/0369984849";

// Dữ liệu lịch học (sửa tại đây)
const schedule = [
  {
    grade: "Lớp 6",
    days: "Thứ 5 – 7",
    note: "Thứ 3 tăng cường",
    shift: "CA 1",
    time: "18:00 – 19:30",
  },
  {
    grade: "Lớp 7",
    days: "Thứ 5 – 7",
    note: "Thứ 3 tăng cường",
    shift: "CA 1",
    time: "16:30 – 18:00",
  },
  {
    grade: "Lớp 8",
    days: "Thứ 4 – 6",
    note: "Thứ 2 tăng cường",
    shift: "CA 1",
    time: "18:00 – 19:30",
  },
  {
    grade: "Lớp 9",
    days: "Thứ 4 – 6",
    note: "Thứ 2 tăng cường",
    shift: "CA 2",
    time: "19:30 – 21:00",
  },
];

/** Modal portal: render thẳng lên document.body để không bị clip/overflow */
function ModalPortal({ children, onClose }) {
  // khóa scroll + ESC
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
      onClick={onClose} // click nền -> đóng
    >
      <div
        className="relative w-[92vw] max-w-[980px] max-h-[86vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()} // chặn nổi bọt
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

        {/* header modal */}
        <div className="px-6 pt-6 pb-3 text-center">
          <div className="text-center inline-block px-4 py-1 rounded-full bg-indigo-50 text-indigo-700 font-extrabold">
            2 CA
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-[#001F5D] text-center">
            ANH THCS
          </h2>
        </div>

        {/* nội dung (scroll) */}
        <div className="px-6 pb-4 overflow-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {schedule.map((r, i) => (
              <div
                key={i}
                className="rounded-2xl border border-slate-200 p-5 bg-slate-50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg font-extrabold text-[#0a1b50]">
                    {r.grade}
                  </span>
                  <span className="text-xs font-bold px-2 py-1 rounded bg-indigo-600 text-white">
                    {r.shift}
                  </span>
                </div>
                <div className="mt-2 text-[15px]">
                  <div className="font-semibold">📅 {r.days}</div>
                  <div className="text-slate-600">({r.note})</div>
                  <div className="mt-1 font-semibold">🕒 {r.time}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-6 text-slate-600 leading-relaxed text-center">
            Lịch học linh hoạt theo ca. Nội dung bám sát – tăng cường kỹ năng
            cho học sinh THCS.
          </p>
        </div>

        {/* footer (nút đăng ký) */}
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

export default function CourseItemTHCS() {
  const [hover, setHover] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Card khóa học */}
      <div
        className="group relative overflow-hidden w-full rounded-lg my-6 shadow-[0_1px_8px_rgba(0,0,0,0.1)] h-[375px] bg-white"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className="relative w-full overflow-hidden z-10">
          {/* dải sáng hover */}
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

          {/* ribbon */}
          <div className="absolute top-0 right-1.5 z-10">
            <span className="relative inline-block bg-gradient-to-r from-[#fb1f02] via-[#eb7d00] to-[#fb1f02] text-white text-[13px] font-bold uppercase tracking-wide px-3 py-1 rounded-l-sm shadow after:content-[''] after:absolute after:-right-2 after:top-0 after:border-t-[20px] after:border-b-[20px] after:border-l-[8px] after:border-t-transparent after:border-b-transparent after:border-l-[#fb1f02]">
              THCS
            </span>
          </div>

          {/* Ảnh (bấm mở popup) */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="h-[250px] w-full overflow-hidden relative z-[1] hover:scale-105 transition-all duration-500"
          >
            <img
              src="/ly.png"
              alt="Toán THCS"
              className="w-full p-2 object-cover"
            />
          </button>

          {/* nút Chi tiết nổi */}
          <div className="absolute bottom-[-55px] left-[30%] z-10 flex items-center px-2 py-2 bg-[#eb7d00] rounded-md shadow-md transition-all duration-500 group-hover:bottom-[14px]">
            <button
              onClick={() => setOpen(true)}
              className="inline-flex items-center justify-center w-[45px]"
              aria-label="Xem chi tiết"
            >
              <FaRegEye className="text-[26px] text-white" />
            </button>
            <span className="font-semibold ml-1 text-white">Chi tiết</span>
          </div>
        </div>

        {/* info & giá */}
        <div className="info px-[10px] z-10 relative">
          <h6 className="capitalize font-bold text-[22px] text-black flex justify-center m-auto">
            Toán
          </h6>
          <div className="flex items-center gap-3 justify-center">
            <span className="font-bold text-[17px] text-green-700">
              399,000₫
            </span>
            <span className="line-through text-gray-400">499,000₫</span>
          </div>
          <div className="flex w-full items-center">
            <div className="w-[20%] flex justify-end mt-2">
              <Link to={ZALO_LINK} target="_blank" rel="noopener noreferrer">
                <img
                  src={logo}
                  className="w-[70%] p-1 border border-gray-400 rounded-full"
                  alt="Zalo"
                />
              </Link>
            </div>
            <div className="w-[80%]">
              <span
                className="flex items-center ml-7 justify-center mt-2 px-[12px] py-[4px] rounded-full text-[14px] w-fit text-white font-semibold shadow-md"
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

      {/* Popup render lên body (portal) */}
      {open && <ModalPortal onClose={() => setOpen(false)} />}
    </>
  );
}
