import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// Link nhận hồ sơ (đổi theo của bạn)
const APPLY_LINK = "https://zalo.me/0369984849";

const JOBS = [
  {
    id: "hrm",
    title: "Quản lý nhân sự",
    badge: "Full-time",
    summary:
      "Phụ trách tuyển dụng – đào tạo – chấm công – lương thưởng; xây dựng văn hoá nội bộ.",
    responsibilities: [
      "Xây dựng kế hoạch tuyển dụng theo từng quý.",
      "Onboarding, đào tạo quy trình – KPI.",
      "Quản lý hồ sơ lao động, HĐLĐ, BHXH.",
      "Tổng hợp chấm công, đề xuất lương thưởng – phúc lợi.",
      "Tổ chức hoạt động gắn kết nội bộ.",
    ],
    requirements: [
      "Tốt nghiệp CĐ/ĐH khối Kinh tế/Quản trị/Nhân sự.",
      "Kinh nghiệm HR 1–2 năm (ưu tiên giáo dục).",
      "Thành thạo Excel, giao tiếp tốt, bảo mật thông tin.",
    ],
  },
  {
    id: "teacher",
    title: "Giáo viên",
    badge: "Part-time / Full-time",
    summary:
      "Giảng dạy theo giáo trình trung tâm; theo sát tiến độ – kết quả học viên.",
    responsibilities: [
      "Soạn giáo án bám sát chương trình & mục tiêu lớp.",
      "Giảng dạy, quản lý lớp, phối hợp trợ giảng.",
      "Đánh giá định kỳ, phản hồi phụ huynh/học viên.",
      "Tham gia đào tạo nội bộ, nâng cao chuyên môn.",
    ],
    requirements: [
      "Tốt nghiệp CĐ/ĐH chuyên ngành phù hợp.",
      "Phát âm/kiến thức chuẩn (với môn tiếng Anh: ưu tiên IELTS/TOEIC).",
      "Kỹ năng sư phạm, truyền đạt dễ hiểu, đúng giờ.",
    ],
  },
  {
    id: "ta",
    title: "Trợ giảng",
    badge: "Part-time",
    summary:
      "Hỗ trợ giáo viên trên lớp, chấm bài – theo dõi tiến độ học viên.",
    responsibilities: [
      "Điểm danh, sắp xếp lớp, hỗ trợ dụng cụ học tập.",
      "Chấm bài, giải đáp thắc mắc của học viên.",
      "Ghi nhận tiến độ – thái độ học tập để báo cáo.",
      "Phối hợp tổ chức kiểm tra định kỳ.",
    ],
    requirements: [
      "Sinh viên năm 2+ hoặc đã tốt nghiệp.",
      "Nắm chắc kiến thức bộ môn; giao tiếp thân thiện.",
      "Chủ động, trách nhiệm, yêu thích làm việc với học sinh.",
    ],
  },
  {
    id: "reception",
    title: "Lễ tân",
    badge: "Part-time / Full-time",
    summary:
      "Đón tiếp phụ huynh – học viên, tư vấn khoá học, hỗ trợ thủ tục & CSKH.",
    responsibilities: [
      "Tiếp nhận – giải đáp thông tin khóa học tại quầy/điện thoại.",
      "Hướng dẫn nhập học, thu phí – xuất hoá đơn.",
      "Quản lý lịch phòng – lớp, hỗ trợ sự kiện.",
      "CSKH sau ghi danh, nhắc lịch học/thi.",
    ],
    requirements: [
      "Ngoại hình ưa nhìn, giao tiếp tốt, thân thiện.",
      "Tin học văn phòng cơ bản.",
      "Ưu tiên có kinh nghiệm CSKH/lễ tân.",
    ],
  },
];

/* ---------- Modal (portal) ---------- */
function JobModal({ job, onClose }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!job) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-[94vw] max-w-[1100px] max-h-[88vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
          aria-label="Đóng"
          autoFocus
        >
          ✕
        </button>

        <div className="px-6 pt-6 pb-3 text-center">
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
            {job.badge}
          </div>
          <h2 className="mt-2 text-3xl font-extrabold text-[#001F5D]">{job.title}</h2>
          <p className="mt-2 text-slate-600">{job.summary}</p>
        </div>

        <div className="px-6 pb-4 overflow-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-bold text-[#0a1b50] mb-3">📌 Trách nhiệm</h3>
            <ul className="space-y-2 list-disc pl-5 text-[15px] leading-6">
              {job.responsibilities.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50">
            <h3 className="font-bold text-[#0a1b50] mb-3">✅ Yêu cầu</h3>
            <ul className="space-y-2 list-disc pl-5 text-[15px] leading-6">
              {job.requirements.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2">
          <a
            href={APPLY_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center rounded-2xl bg-[#001F5D] py-4 text-white text-[18px] font-semibold hover:opacity-95 active:scale-[0.99] transition"
          >
            ỨNG TUYỂN NGAY
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}

/* ---------- Section Tuyển dụng (cards đồng nhất chiều cao) ---------- */
export default function RecruitmentSection() {
  const [activeJob, setActiveJob] = useState(null);

  return (
    <section className="container mx-auto px-4 py-24" id="tuyendung">
      <header className="mb-20 flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#001F5D]">
          Tuyển dụng
        </h2>
        <p className="text-slate-600 mt-1 text-center">
          Cùng chúng tôi xây dựng môi trường học tập vui vẻ – hiệu quả.
        </p>
      </header>

      {/* items-stretch đảm bảo các card cao đều nhau */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {JOBS.map((job) => (
          <article
            key={job.id}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition"
          >
            {/* Phần trên */}
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-extrabold text-slate-800">
                  {job.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-700">
                  {job.badge}
                </span>
              </div>
              <p className="mt-3 text-slate-600">{job.summary}</p>
            </div>

            {/* Footer luôn ở đáy card */}
            <div className="mt-5 flex items-center justify-between">
              <button
                className="text-[#001F5D] font-semibold underline underline-offset-4 hover:no-underline"
                onClick={() => setActiveJob(job)}
              >
                Xem chi tiết
              </button>
              <a
                href={APPLY_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#001F5D] text-white px-3 py-2 text-sm font-semibold hover:opacity-95"
              >
                Ứng tuyển
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Modal */}
      {activeJob && (
        <JobModal job={activeJob} onClose={() => setActiveJob(null)} />
      )}
    </section>
  );
}
