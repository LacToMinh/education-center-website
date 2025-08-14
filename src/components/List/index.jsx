import React from "react";

/** Bullet tròn, canh baseline đẹp ở mọi font-size */
export function BulletList({
  items = [],
  dotColor = "#0ea5e9",
  cols = 1, // 1 hoặc 2 cột
  className = "",
  textClass = "text-[14px] text-slate-700",
}) {
  const grid =
    cols === 2 ? "grid sm:grid-cols-2 gap-x-6 gap-y-2" : "grid gap-y-2";
  return (
    <ul className={`${grid} ${className}`}>
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-2">
          <span
            className="block rounded-full flex-none mt-[0.35em]"
            style={{
              backgroundColor: dotColor,
              width: "0.4rem",
              height: "0.4rem",
            }}
          />
          <span className={textClass}>{t}</span>
        </li>
      ))}
    </ul>
  );
}

/** Danh sách dấu ✓, vẫn canh baseline chuẩn */
export function CheckList({
  items = [],
  className = "",
  textClass = "text-[15px] text-slate-700 leading-[1.65]",
  // có thể chỉnh màu/độ dày bằng Tailwind ở wrapper bên dưới
}) {
  return (
    <ul className={`grid sm:grid-cols-2 gap-x-8 gap-y-2 ${className}`}>
      {items.map((t, i) => (
        <li key={i} className="flex items-start gap-2">
          {/* Icon theo em + căn baseline bằng top:[em] */}
          <span className="relative top-[0.3em] inline-flex h-[1em] w-[1em] items-center justify-center text-emerald-600">
            {/* SVG fill theo currentColor + size theo em để tỉ lệ với font */}
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-[0.9em] w-[0.9em]"
            >
              <path d="M16.707 5.293a1 1 0 0 1 0 1.414l-7.5 7.5a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8.5 12.086l6.793-6.793a1 1 0 0 1 1.414 0z" />
            </svg>
          </span>

          <span className={textClass}>{t}</span>
        </li>
      ))}
    </ul>
  );
}
