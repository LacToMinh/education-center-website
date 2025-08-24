import { useEffect } from "react";
import ReactDOM from "react-dom";
import Reveal from "../Reveal";

const DEFAULT_ZALO_LINK = "https://zalo.me/0369984849";

export default function ModalPortal({
  title = "TOÁN THPT",
  schedule = [],
  loadingSchedule = false, // <-- nhận prop loading
  onClose,
  ctaLink = DEFAULT_ZALO_LINK
}) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const ctaClass =
    "block w-full text-center rounded-2xl py-4 text-white text-[18px] font-semibold hover:opacity-95 active:scale-[0.99] transition";
  const ctaEnabledStyle = " bg-[#001F5D]";
  const ctaDisabledStyle = " bg-slate-400 pointer-events-none";

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
            {schedule.length} CA
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-[#001F5D]">
            {title}
          </h2>
        </div>

        {/* nội dung (scroll) */}
        <div className="px-6 pb-4 overflow-auto relative">
          {/* Loading overlay / spinner */}
          {loadingSchedule && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full border-4 border-slate-300 border-t-transparent animate-spin" />
                <div className="text-slate-700 font-medium">Đang tải lịch...</div>
              </div>
            </div>
          )}

          {/* Nếu không loading và không có lịch */}
          {!loadingSchedule && (!schedule || schedule.length === 0) && (
            <div className="py-10 text-center text-slate-600">
              Chưa có lịch chi tiết cho khóa này. Vui lòng liên hệ để biết thêm.
            </div>
          )}

          {/* Nếu có schedule, hiển thị grid (kể cả khi loadingSchedule === true thì overlay sẽ hiện ở trên) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {(schedule && schedule.length > 0 ? schedule : new Array(4).fill(null)).map((r, i) => (
              <Reveal key={i} delayMs={80 * i}>
                <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50 min-h-[110px]">
                  {r ? (
                    <>
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
                    </>
                  ) : (
                    // skeleton khi chưa có data (fallback)
                    <div className="animate-pulse">
                      <div className="h-5 w-3/5 bg-slate-200 rounded mb-3" />
                      <div className="h-4 w-1/2 bg-slate-200 rounded mb-2" />
                      <div className="h-4 w-2/3 bg-slate-200 rounded" />
                    </div>
                  )}
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
            href={loadingSchedule ? undefined : ctaLink}
            target={loadingSchedule ? undefined : "_blank"}
            rel={loadingSchedule ? undefined : "noopener noreferrer"}
            className={ctaClass + (loadingSchedule ? ctaDisabledStyle : ctaEnabledStyle)}
            aria-disabled={loadingSchedule}
            onClick={(e) => {
              if (loadingSchedule) e.preventDefault();
            }}
          >
            {loadingSchedule ? "Vui lòng đợi..." : "ĐĂNG KÝ"}
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
