// Timetable.jsx
import React, { useMemo, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import ScrollToTop from "../../utils/ScrollToTop";

/* ====== DATA MẪU ====== */
const TTB_DATA = {
  6: [
    {
      day: 2,
      start: "16:30",
      end: "18:00",
      subject: "Toán",
      room: "P201",
      teacher: "Thầy Lâm",
    },
    {
      day: 3,
      start: "16:30",
      end: "18:00",
      subject: "Lý",
      room: "P201",
      teacher: "Thầy Lưu",
    },
    {
      day: 4,
      start: "18:00",
      end: "19:30",
      subject: "Anh",
      room: "P202",
      teacher: "Cô Quyền",
    },
    {
      day: 7,
      start: "18:00",
      end: "19:30",
      subject: "Văn",
      room: "P101",
      teacher: "Cô Nhi",
    },
    {
      day: 7,
      start: "18:00",
      end: "19:30",
      subject: "Anh",
      room: "P101",
      teacher: "Cô My",
    },
  ],
  7: [
    {
      day: 3,
      start: "16:30",
      end: "18:00",
      subject: "Toán",
      room: "P201",
      teacher: "Thầy Minh",
    },
    {
      day: 3,
      start: "16:30",
      end: "18:00",
      subject: "Văn",
      room: "P201",
      teacher: "Cô Linh",
    },
    {
      day: 5,
      start: "18:00",
      end: "19:30",
      subject: "Anh",
      room: "P202",
      teacher: "Cô Quyền",
    },
    {
      day: 7,
      start: "18:00",
      end: "19:30",
      subject: "Lý",
      room: "P103",
      teacher: "Thầy Lưu",
    },
  ],
  8: [
    {
      day: 2,
      start: "18:00",
      end: "19:30",
      subject: "Anh",
      room: "P202",
      teacher: "Cô Quyền",
    },
    {
      day: 4,
      start: "16:30",
      end: "18:00",
      subject: "Hóa",
      room: "P204",
      teacher: "Thầy Thanh",
    },
    {
      day: 6,
      start: "18:00",
      end: "19:30",
      subject: "Lý",
      room: "P201",
      teacher: "Cô Huê",
    },
  ],
  9: [
    {
      day: 3,
      start: "18:00",
      end: "19:30",
      subject: "Ly",
      room: "P202",
      teacher: "Thầy Lưu",
    },
    {
      day: 5,
      start: "18:00",
      end: "19:30",
      subject: "Toán",
      room: "P201",
      teacher: "Thầy Lâm",
    },
    {
      day: 7,
      start: "19:30",
      end: "21:00",
      subject: "Văn",
      room: "P101",
      teacher: "Cô Nhi",
    },
  ],
  10: [
    // Cùng ngày/cùng giờ -> mỗi GV là MỘT THẺ RIÊNG
    {
      day: 2,
      start: "18:00",
      end: "19:30",
      subject: "Toán",
      room: "P301",
      teacher: "Thầy Minh",
    },
    {
      day: 2,
      start: "18:00",
      end: "19:30",
      subject: "Toán",
      room: "P302",
      teacher: "Cô Lan",
    },
    {
      day: 2,
      start: "18:00",
      end: "19:30",
      subject: "Anh",
      room: "P202",
      teacher: "Cô Chi",
    },
    {
      day: 4,
      start: "16:30",
      end: "18:00",
      subject: "Lý",
      room: "P303",
      teacher: "Thầy Tùng",
    },
    {
      day: 6,
      start: "19:30",
      end: "21:00",
      subject: "Anh",
      room: "P202",
      teacher: "Cô Chi",
    },
  ],
  11: [
    {
      day: 3,
      start: "18:00",
      end: "19:30",
      subject: "Hóa",
      room: "P304",
      teacher: "Cô Mai",
    },
    {
      day: 5,
      start: "16:30",
      end: "18:00",
      subject: "Văn",
      room: "P101",
      teacher: "Cô Hương",
    },
  ],
  12: [
    {
      day: 2,
      start: "19:30",
      end: "21:00",
      subject: "Toán (Luyện đề)",
      room: "P301",
      teacher: "Thầy Hưng",
    },
    {
      day: 4,
      start: "19:30",
      end: "21:00",
      subject: "Anh (TN THPT)",
      room: "P202",
      teacher: "Cô Chi",
    },
    {
      day: 6,
      start: "18:00",
      end: "19:30",
      subject: "Hóa",
      room: "P304",
      teacher: "Cô Mai",
    },
  ],
};

const DAYS = [
  { id: 2, label: "Thứ 2" },
  { id: 3, label: "Thứ 3" },
  { id: 4, label: "Thứ 4" },
  { id: 5, label: "Thứ 5" },
  { id: 6, label: "Thứ 6" },
  { id: 7, label: "Thứ 7" },
  { id: 8, label: "CN" },
];

/* ====== MÀU THEO MÔN ====== */
const SUBJECT_KEY_TO_PALETTE = {
  toán: "emerald",
  anh: "sky",
  văn: "rose",
  lý: "violet",
  hóa: "lime",
  sinh: "teal",
  sử: "orange",
  địa: "yellow",
  tin: "cyan",
};
const COLOR_CLASSES = {
  emerald: {
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    text: "text-emerald-700",
  },
  sky: { bg: "bg-sky-50", border: "border-sky-200", text: "text-sky-700" },
  rose: { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700" },
  violet: {
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-700",
  },
  lime: { bg: "bg-lime-50", border: "border-lime-200", text: "text-lime-700" },
  teal: { bg: "bg-teal-50", border: "border-teal-200", text: "text-teal-700" },
  orange: {
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-700",
  },
  yellow: {
    bg: "bg-yellow-50",
    border: "border-yellow-200",
    text: "text-yellow-700",
  },
  cyan: { bg: "bg-cyan-50", border: "border-cyan-200", text: "text-cyan-700" },
  default: {
    bg: "bg-slate-50",
    border: "border-slate-200",
    text: "text-slate-800",
  },
};
function getColorClasses(subject) {
  const s = subject.toLowerCase();
  for (const key of Object.keys(SUBJECT_KEY_TO_PALETTE)) {
    if (s.includes(key)) {
      const pal = SUBJECT_KEY_TO_PALETTE[key];
      return COLOR_CLASSES[pal] || COLOR_CLASSES.default;
    }
  }
  return COLOR_CLASSES.default;
}

/* ====== Utils ====== */
const classRange = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export default function TimeTable() {
  const classes = useMemo(() => classRange(6, 12), []);
  const [grade, setGrade] = useState(6);

  // Filters
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [teacherFilter, setTeacherFilter] = useState("all");

  const slots = TTB_DATA[grade] ?? [];

  const subjectOptions = useMemo(() => {
    const set = new Set(slots.map((s) => s.subject));
    return ["all", ...Array.from(set)];
  }, [slots]);

  const teacherOptions = useMemo(() => {
    const set = new Set(slots.map((s) => s.teacher));
    return ["all", ...Array.from(set)];
  }, [slots]);

  const filteredSlots = useMemo(
    () =>
      slots
        .filter((s) =>
          subjectFilter === "all" ? true : s.subject === subjectFilter
        )
        .filter((s) =>
          teacherFilter === "all" ? true : s.teacher === teacherFilter
        ),
    [slots, subjectFilter, teacherFilter]
  );

  const onChangeGrade = (val) => {
    setGrade(val);
    setSubjectFilter("all");
    setTeacherFilter("all");
  };

  return (
    <>
      <ScrollToTop />
      <section className="container mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#001F5D]">
            Thời khóa biểu – Lớp {grade}
          </h1>
          <p className="text-slate-600 mt-1">
            Mỗi giáo viên là một thẻ • Môn giảng dạy
          </p>
        </div>

        {/* Tabs lớp */}
        <div className="mb-4 flex items-center justify-center gap-3 flex-wrap">
          <div className="hidden sm:flex flex-wrap items-center gap-2">
            {classes.map((c) => (
              <button
                key={c}
                onClick={() => onChangeGrade(c)}
                className={[
                  "px-4 py-2 rounded-xl border text-sm font-semibold transition",
                  c === grade
                    ? "bg-[#001F5D] text-white border-[#001F5D]"
                    : "bg-white text-slate-700 border-slate-200 hover:border-slate-400",
                ].join(" ")}
                aria-pressed={c === grade}
              >
                Lớp {c}
              </button>
            ))}
          </div>
          <select
            className="sm:hidden border rounded-xl px-3 py-2 text-sm"
            value={grade}
            onChange={(e) => onChangeGrade(Number(e.target.value))}
          >
            {classes.map((c) => (
              <option key={c} value={c}>
                Lớp {c}
              </option>
            ))}
          </select>
        </div>

        {/* Filters — mobile: 2 cột cho môn + GV, nút reset full width hàng dưới */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 max-w-3xl mx-auto">
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
              Môn học
            </label>
            <select
              className="w-full border rounded-xl px-2 py-2 text-sm"
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              {subjectOptions.map((opt) => (
                <option key={`sub-${opt}`} value={opt}>
                  {opt === "all" ? "Tất cả" : opt}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1">
              Giáo viên
            </label>
            <select
              className="w-full border rounded-xl px-2 py-2 text-sm"
              value={teacherFilter}
              onChange={(e) => setTeacherFilter(e.target.value)}
            >
              {teacherOptions.map((opt) => (
                <option key={`tch-${opt}`} value={opt}>
                  {opt === "all" ? "Tất cả" : opt}
                </option>
              ))}
            </select>
          </div>

          {/* Reset: full width ở mobile (col-span-2), cột thứ 3 trên >=sm */}
          <div className="col-span-2 sm:col-span-1 flex items-end">
            <button
              className="w-full rounded-xl border px-4 py-2 text-sm font-semibold
                       border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100
                       inline-flex items-center justify-center gap-2"
              onClick={() => {
                setSubjectFilter("all");
                setTeacherFilter("all");
              }}
            >
              <FiTrash2 className="text-rose-600" />
              Xóa bộ lọc
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white">
          {/* wrapper: mobile trượt ngang, desktop bình thường */}
          <div className="overflow-x-auto sm:overflow-visible">
            {/* đặt min-width cho mobile để các cột không bị dồn */}
            {/* 7 cột x ~160px = 1120px (bạn có thể tăng/giảm) */}
            <div className="min-w-[1120px] sm:min-w-0">
              {/* Header days */}
              <div className="grid grid-cols-7 bg-slate-50">
                {DAYS.map((d) => (
                  <div
                    key={d.id}
                    className="px-3 py-3 text-center text-sm font-bold text-slate-700 border-r last:border-r-0 border-slate-200"
                  >
                    {d.label}
                  </div>
                ))}
              </div>

              {/* Body */}
              <div className="grid grid-cols-7">
                {DAYS.map((d) => {
                  const items = filteredSlots
                    .filter((s) => s.day === d.id)
                    .sort((a, b) => {
                      const ta = toMinutes(a.start);
                      const tb = toMinutes(b.start);
                      if (ta !== tb) return ta - tb;
                      return a.subject.localeCompare(b.subject);
                    });

                  return (
                    <div
                      key={d.id}
                      className="min-h-[140px] border-r border-t border-slate-200 last:border-r-0 p-3"
                    >
                      {items.length === 0 ? (
                        <div className="h-full flex items-center justify-center">
                          <span className="text-slate-300 text-sm">—</span>
                        </div>
                      ) : (
                        <ul className="space-y-2">
                          {items.map((s, i) => {
                            const color = getColorClasses(s.subject);
                            const key = `${d.id}-${s.start}-${s.end}-${s.subject}-${s.teacher}-${i}`;
                            return (
                              <li
                                key={key}
                                className={[
                                  "rounded-2xl border px-4 py-3 shadow-[0_1px_0_rgba(0,0,0,0.03)]",
                                  color.bg,
                                  color.border,
                                ].join(" ")}
                              >
                                <div
                                  className={[
                                    "font-semibold",
                                    color.text,
                                    "text-[15px]",
                                  ].join(" ")}
                                >
                                  {s.subject}{" "}
                                  <span className="text-slate-400">•</span>{" "}
                                  {s.start}–{s.end}
                                </div>
                                <div className="text-[13px] text-slate-700 mt-0.5">
                                  • {s.teacher} · {s.room}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-sm">
          {Array.from(new Set(slots.map((s) => s.subject))).map((subj) => {
            const color = getColorClasses(subj);
            return (
              <div key={subj} className="flex items-center gap-2">
                <span
                  className={[
                    "inline-block w-3 h-3 rounded ring-1",
                    color.bg,
                    color.border,
                  ].join(" ")}
                />
                <span className="text-slate-700">{subj}</span>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
