import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiClock,
  FiBookOpen,
  FiUsers,
  FiStar,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import { BulletList, CheckList } from "../List";
import ScrollToTop from "../../utils/ScrollToTop";

export default function CourseDetail({ cfg = {} }) {
  const [openFaq, setOpenFaq] = useState(null);

  const theme = useMemo(
    () => ({
      from: cfg.themeFrom ?? "#0ea5e9",
      to: cfg.themeTo ?? "#38bdf8",
      text: cfg.textColor ?? "#fff",
    }),
    [cfg.themeFrom, cfg.themeTo, cfg.textColor]
  );

  const priceText = cfg.pricing?.mainPrice ?? cfg.pricing?.price ?? "";

  return (
    <>
      <ScrollToTop />
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl">
          <img
            src={cfg.heroImage ?? "/images/hero-placeholder.jpg"}
            alt={cfg.title ?? "Khoá học"}
            className="w-full h-[280px] md:h-[360px] object-fill"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end">
            {cfg.tagline && (
              <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-semibold text-white/90 border border-white/40 w-max mb-3">
                {cfg.tagline}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-extrabold text-white drop-shadow-sm">
              {cfg.title ?? "Chi tiết khoá học"}
            </h1>
            {cfg.subtitle && (
              <p className="mt-2 text-white/90 max-w-2xl">{cfg.subtitle}</p>
            )}

            {/* meta chips (render khi có) */}
            <div className="mt-4 flex flex-wrap gap-3 text-white/95">
              {cfg.meta?.hours && (
                <Chip icon={<FiClock />}>{cfg.meta.hours}</Chip>
              )}
              {cfg.meta?.level && (
                <Chip icon={<FiBookOpen />}>{cfg.meta.level}</Chip>
              )}
              {cfg.meta?.classSize && (
                <Chip icon={<FiUsers />}>{cfg.meta.classSize}</Chip>
              )}
              <Chip icon={<FiStar />}>Cam kết tiến bộ</Chip>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {/* LEFT content */}
          <div className="md:col-span-2 space-y-8">
            {/* outcomes */}
            {(cfg.outcomes ?? []).length > 0 && (
              <Card>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Bạn sẽ đạt được
                </h2>
                <BulletList
                  items={cfg.outcomes ?? []}
                  dotColor={theme.from}
                  cols={2}
                  textClass="text-[15px] text-slate-700"
                />
              </Card>
            )}

            {/* syllabus */}
            {(cfg.syllabus ?? []).length > 0 && (
              <Card>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Lộ trình & Nội dung
                </h2>
                <div className="space-y-4">
                  {(cfg.syllabus ?? []).map((w, i) => (
                    <div key={i} className="rounded-xl border p-4">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-slate-800">
                          {w.title}
                        </div>
                        {w.hours && (
                          <div className="text-sm text-slate-500">
                            {w.hours}
                          </div>
                        )}
                      </div>

                      <BulletList
                        items={w.bullets ?? []}
                        dotColor={theme.from}
                        cols={2}
                        className="mt-2"
                        textClass="text-sm text-slate-700"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* benefits */}
            {(cfg.benefits ?? []).length > 0 && (
              <Card>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Quyền lợi học viên
                </h2>
                <CheckList items={cfg.benefits ?? []} />
              </Card>
            )}

            {/* FAQ */}
            {(cfg.faqs ?? []).length > 0 && (
              <Card>
                <h2 className="text-xl font-bold text-slate-900 mb-3">
                  Câu hỏi thường gặp
                </h2>
                <div className="divide-y">
                  {(cfg.faqs ?? []).map((f, i) => {
                    const open = openFaq === i;
                    return (
                      <div key={i}>
                        <button
                          className="w-full flex items-center justify-between py-3 text-left"
                          onClick={() => setOpenFaq(open ? null : i)}
                        >
                          <span className="font-medium text-slate-800">
                            {f.q}
                          </span>
                          <FiChevronDown
                            className={`transition-transform ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <div
                          className={`grid transition-[grid-template-rows] duration-300 ${
                            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p className="pb-3 text-[15px] text-slate-700">
                              {f.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            )}
          </div>

          {/* RIGHT summary / CTA */}
          <aside className="md:col-span-1">
            <div className="md:sticky md:top-20">
              <div className="rounded-2xl p-5 shadow-lg border bg-white">
                {priceText && (
                  <div
                    className="inline-flex items-center px-3 py-1 rounded-lg font-bold"
                    style={{
                      color: theme.text,
                      background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                    }}
                  >
                    {priceText}
                  </div>
                )}

                {cfg.pricing?.note && (
                  <p className="mt-2 text-sm text-slate-600">
                    {cfg.pricing.note}
                  </p>
                )}

                <CheckList
                  items={cfg.pricing?.includes ?? []}
                  className="mt-4"
                  textClass="text-sm text-slate-700"
                  iconClass="mt-[0.2em] text-emerald-600"
                  icon="✓"
                />

                <div className="mt-5 flex flex-col gap-3">
                  {cfg.links?.zalo && (
                    <a
                      href={cfg.links.zalo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-95"
                      style={{
                        background: `linear-gradient(135deg, ${theme.from}, ${theme.to})`,
                      }}
                    >
                      Đăng ký qua Zalo <FiChevronRight />
                    </a>
                  )}

                  {cfg.links?.register && (
                    <a
                      href={cfg.links.register}
                      className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold border border-slate-300 text-slate-800 hover:bg-slate-50"
                    >
                      Đăng ký online
                    </a>
                  )}

                  <Link
                    to="/#ielts-toeic"
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    ← Quay lại tổng quan
                  </Link>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

/* ---------- helpers ---------- */
function Chip({ icon, children }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1 text-[13px] border border-white/30 backdrop-blur">
      <i className="opacity-90">{icon}</i>
      {children}
    </span>
  );
}
function Card({ children }) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">{children}</div>
  );
}
