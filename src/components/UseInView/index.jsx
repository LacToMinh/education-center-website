import { useEffect, useRef, useState } from "react";
import { FcBullish, FcAbout } from "react-icons/fc";

function useInView(options = { threshold: 0.3 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
  }, [options]);
  return { ref, inView };
}

function useCountUp(start = 0, end = 100, duration = 1500, run = false) {
  const [value, setValue] = useState(start);
  useEffect(() => {
    if (!run) return;
    const reduceMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setValue(end);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = easeOutCubic(p);
      setValue(Math.round(start + (end - start) * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, end, duration, run]);
  return value;
}

export default function StatsStrip() {
  const items = [
    {
      title: "KHÓA HỌC",
      desc: "Hơn 120 khóa học đa dạng, phù hợp với mọi trình độ, nhu cầu học tập.",
      end: 120,
      suffix: "+",
      icon: <FcAbout />,
    },
    {
      title: "TÀI LIỆU",
      desc: "Hơn 5.000 tài liệu chất lượng, bám sát chương trình, cập nhật liên tục",
      end: 5000,
      suffix: "+",
      icon: "📚",
    },
    {
      title: "HỌC SINH",
      desc: "Hơn 10.000 học sinh tin tưởng và gắn bó tại trung tâm.",
      end: 10000,
      suffix: "+",
      icon: "👨‍🏫",
    },
    {
      title: "NĂM KINH NGHIỆM",
      desc: "Đội ngũ giáo viên hơn 10 năm kinh nghiệm giảng dạy.",
      end: 10,
      suffix: "+",
      icon: <FcBullish />,
    },
  ];

  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full bg-[#FFD700] text-black my-10 sm:my-12 lg:my-16"
      aria-label="Thống kê trung tâm"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <ul
          className="
           grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4
            gap-8 sm:gap-10 lg:gap-12
          "
        >
          {items.map((it, i) => {
            const val = useCountUp(0, it.end, 1300 + i * 180, inView);
            const formatted = val.toLocaleString("vi-VN");

            return (
              <li
                key={it.title}
                className="
                  text-center max-w-[560px] mx-auto
                  px-2 sm:px-3 lg:px-4
                "
              >
                {/* Icon */}
                <div
                  className="
                    mb-4 sm:mb-5 lg:mb-6 opacity-90
                    flex items-center justify-center
                    text-[clamp(32px,8vw,56px)]
                  "
                  aria-hidden="true"
                >
                  {it.icon}
                </div>

                {/* Title */}
                <h3
                  className="
                    uppercase font-bold opacity-90
                    tracking-[0.12em] sm:tracking-[0.18em]
                    text-[11px] sm:text-[15px] lg:text-[18px]
                  "
                >
                  {it.title}
                </h3>

                {/* Number + suffix */}
                <div className="mt-3 sm:mt-4 lg:mt-5 flex items-end justify-center">
                  <span
                    className="
                      font-extrabold leading-none
                      text-[26px] sm:text-[40px] lg:text-[56px]
                    "
                  >
                    {formatted}
                  </span>
                  <span
                    className="
                      font-extrabold leading-none pl-1 sm:pl-2
                      text-[clamp(22px,7vw,48px)]
                    "
                    aria-hidden="true"
                  >
                    {it.suffix}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="
                    mt-3 sm:mt-4 lg:mt-5
                    text-[10px] sm:text-[14px] lg:text-[15px]
                    leading-[1.6]
                    max-w-[46ch] mx-auto
                  "
                >
                  {it.desc}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
