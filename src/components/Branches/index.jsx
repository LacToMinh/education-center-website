// BranchesPro.jsx
import React, { useState, useEffect } from "react";
import {
  FiMapPin,
  FiPhone,
  FiClock,
  FiExternalLink,
  FiMap,
  FiX,
} from "react-icons/fi";
import ScrollToTop from "../../utils/ScrollToTop";

export default function BranchesPro() {
  // ===== DATA mẫu – thay bằng dữ liệu thật của bạn =====
  const branches = [
    {
      name: "Chi nhánh Sở Sao",
      address: "69/3 ĐT741, Tân Định, Bến Cát, Bình Dương",
      phone: "0369984849",
      hours: "T2–CN · 08:00–21:00",
      mapUrl:
        "https://maps.app.goo.gl/n13qo55fCzGqLmweA",
      // Embed phải có dạng https://www.google.com/maps/embed?pb=...
      embed:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.047862670519!2d106.63528544696335!3d11.035035961187655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d100552d68ed%3A0x982e0b653a3025c0!2sTU%E1%BB%86%20NAM%20GROUP%20BUILDING!5e0!3m2!1svi!2s!4v1756128094557!5m2!1svi!2s",
      image: "/images/maps/so-sao.png",
    },
    {
      name: "Chi nhánh Thịnh Gia",
      address: "B1-01 Đ. N1, KĐT Thịnh Gia, Bến Cát, Bình Dương",
      phone: "0369984849",
      hours: "T2–CN · 08:00–21:00",
      mapUrl: "https://maps.app.goo.gl/gt81vnwUDA6Ucrnp8",
      embed:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3915.5821653759735!2d106.6234703!3d11.0699205!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174cd7497ee1151%3A0x8d2ba4900f2340ea!2zVHJ1bmcgdMOibSBk4bqheSBo4buNYyB2w6AgbHV54buHbiB0aGkgVE5lZHU!5e0!3m2!1svi!2s!4v1755000275221!5m2!1svi!2s",
      image: "/images/maps/thinh_gia.jpg",
    },
  ];

  const [openMapIdx, setOpenMapIdx] = useState(null);
  const [openImage, setOpenImage] = useState(null); // string url

  return (
    <>
      <ScrollToTop />
      <section className="max-w-[75%] mx-auto py-14">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#001F5D]/10 text-[#001F5D] text-xs font-semibold">
          Hệ thống chi nhánh
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#001F5D] mt-3">
          Gần bạn – tiện bạn
        </h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
          Đến cơ sở gần nhất để được tư vấn - Chúng tôi luôn sẵn sàng hỗ trợ!
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-8">
        {branches.map((b, idx) => (
          <article
            key={b.name}
            className="p-[1px] rounded-3xl bg-gradient-to-br from-[#001F5D]/20 via-transparent to-[#0ea5e9]/30 transition-transform duration-300 hover:scale-[1.01]"
          >
            <div className="rounded-3xl bg-white/90 backdrop-blur shadow-[0_10px_30px_rgba(2,6,23,0.08)] grid grid-cols-1 md:grid-cols-2 z-0">
              {/* IMAGE (click to open) */}
              <figure
                className="relative overflow-hidden rounded-3xl md:rounded-l-3xl md:rounded-r-none aspect-[16/9] md:aspect-[5/4] md:h-[360px] lg:h-[420px] cursor-pointer"
                onClick={() => setOpenImage(b.image)}
                aria-label={`Xem ảnh ${b.name}`}
              >
                <img
                  src={b.image}
                  alt={b.name}
                  loading="lazy"
                  className="max-w-full max-h-full mx-auto sm:mx-0 md:mx-0 lg:mx-0 xl:mx-0 2xl:mx-auto object-contain object-center transition-transform duration-700 hover:scale-[1.03]"
                />

                {/* overlay: visible on mobile, hidden on md/lg/xl, visible again on 2xl */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent block md:hidden 2xl:block" />

                <div className="absolute bottom-3 left-3 right-3">
                  <span className="inline-flex items-center rounded-xl bg-slate-900/85 px-3 py-1 text-sm font-semibold text-white shadow-md backdrop-blur-sm">
                    {b.name}
                  </span>
                </div>
              </figure>

              {/* INFO */}
              <div className="p-5 md:p-7 z-20">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3">
                  {b.name}
                </h3>

                <dl className="space-y-3 text-[15px]">
                  <InfoRow
                    icon={<FiMapPin />}
                    label="Địa chỉ"
                    value={b.address || "Đang cập nhật"}
                  />
                  <InfoRow
                    icon={<FiClock />}
                    label="Giờ mở cửa"
                    value={b.hours}
                  />
                  <InfoRow
                    icon={<FiPhone />}
                    label="Điện thoại"
                    value={
                      <a
                        href={`tel:${b.phone}`}
                        className="font-semibold text-emerald-700 hover:underline"
                      >
                        {formatPhone(b.phone)}
                      </a>
                    }
                  />
                </dl>

                <div className="mt-5 flex flex-col gap-3">
                  {/* Hàng 1: Chỉ đường + Xem bản đồ */}
                  <div className="flex sm:flex-col sm:w-fit gap-3 justify-between sm:justify-normal">
                    {b.mapUrl && (
                      <a
                        href={b.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-[#001F5D] text-white px-[12px] sm:px-4 py-2 text-sm font-semibold hover:opacity-95"
                      >
                        <FiExternalLink />
                        <span className="text-[13px] sm:text[14px]">
                          Chỉ đường
                        </span>
                      </a>
                    )}
                    {b.embed && (
                      <button
                        onClick={() => setOpenMapIdx(idx)}
                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-[12px] sm:px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                      >
                        <FiMap />
                        <span className="text-[13px] sm:text[14px]">
                          Xem bản đồ
                        </span>
                      </button>
                    )}
                  </div>

                  {/* Hàng 2: Gọi ngay */}
                  <a
                    href={`tel:${b.phone}`}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100"
                  >
                    <FiPhone />
                    Gọi ngay
                  </a>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Map Modal */}
      {openMapIdx !== null && branches[openMapIdx]?.embed && (
        <MapModal
          title={branches[openMapIdx].name}
          embedUrl={branches[openMapIdx].embed}
          onClose={() => setOpenMapIdx(null)}
        />
      )}

      {/* Image Modal */}
      {openImage && (
        <ImageModal imageUrl={openImage} onClose={() => setOpenImage(null)} />
      )}
    </section>
    </>
  );
}

/* ---------- Sub components ---------- */

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-slate-500">{icon}</div>
      <div className="min-w-[88px] text-slate-500">{label}</div>
      <div className="text-slate-900">{value}</div>
    </div>
  );
}

function MapModal({ title, embedUrl, onClose }) {
  // ESC to close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Card */}
      <div
        className="relative z-10 w-[92%] max-w-3xl rounded-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h4 className="text-[15px] font-semibold text-slate-800">
            Bản đồ – {title}
          </h4>
          <button
            className="p-2 rounded-lg hover:bg-slate-100"
            onClick={onClose}
            aria-label="Đóng"
          >
            <FiX className="text-slate-600" />
          </button>
        </div>
        <div className="aspect-[16/10]">
          <iframe
            title={`Map of ${title}`}
            src={embedUrl}
            width="100%"
            height="100%"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}

function ImageModal({ imageUrl, onClose }) {
  // ESC to close
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop (click to close) */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      {/* Content */}
      <div
        className="relative z-10 max-w-5xl w-[92%] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute -top-3 -right-3 md:top-2 md:right-2 p-2 rounded-full bg-white shadow-md hover:bg-white/90 z-10"
          onClick={onClose}
          aria-label="Đóng"
        >
          <FiX className="text-slate-700 text-xl" />
        </button>
        {/* Image */}
        <img
          src={imageUrl}
          alt="Preview"
          className="max-h-[85vh] w-auto h-auto rounded-xl shadow-2xl object-contain"
        />
      </div>
    </div>
  );
}

/* ---------- Utils ---------- */
function formatPhone(p) {
  if (!p) return "";
  const digits = p.replace(/\D/g, "");
  return digits.replace(/(\d{4})(\d{3})(\d{3})/, "$1 $2 $3");
}
