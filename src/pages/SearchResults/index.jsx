// src/pages/SearchResults.jsx
import React from "react";
import { useSearchParams, Link } from "react-router-dom";
import courses from "../../database/courses";

export default function SearchResults() {
  const [params] = useSearchParams();
  const qRaw = params.get("q");
  const q = (qRaw || "").trim().toLowerCase();

  // helpers an toàn
  const str = (v) => (typeof v === "string" ? v : "");
  const arr = (v) => (Array.isArray(v) ? v : []);

  // lọc: khớp 1 phần theo name/title hoặc trong keywords
  const results = (Array.isArray(courses) ? courses : []).filter((c) => {
    if (!q) return false;
    const name = str(c.name || c.title).toLowerCase();
    const kwText = arr(c.keywords).map(str).join(" ").toLowerCase();
    return name.includes(q) || kwText.includes(q);
  });

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold">
          Kết quả cho “{q || "..."}”
        </h1>
        <p className="text-slate-600 mt-1">{results.length} khóa học phù hợp</p>
      </div>

      {results.length === 0 ? (
        <div className="p-6 rounded-2xl border bg-white">
          Không tìm thấy khóa học. Thử từ khóa khác như: IELTS, Toán, Hóa, Lý, TOEIC…
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((c, i) => (
            <div
              key={c.id || i}
              className="rounded-2xl border bg-white p-4 hover:shadow-lg transition"
            >
              <h3 className="font-bold text-lg">{c.name || c.title}</h3>
              {c.price && (
                <p className="mt-1 text-emerald-700 font-semibold">{c.price}</p>
              )}
              <div className="mt-2 flex flex-wrap gap-2">
                {arr(c.keywords)
                  .slice(0, 6)
                  .map((k, j) => (
                    <span key={j} className="text-xs px-2 py-1 rounded-full bg-slate-100">
                      {k}
                    </span>
                  ))}
              </div>
              {/* nếu có route chi tiết thì sửa lại link bên dưới */}
              {c.id && (
                <Link
                  to={`/course/${c.id}`}
                  className="inline-block mt-3 text-[#001F5D] font-semibold hover:underline"
                >
                  Xem chi tiết →
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
