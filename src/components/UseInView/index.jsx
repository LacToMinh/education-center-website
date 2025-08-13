import { useEffect, useRef, useState } from "react";
import { FcBullish } from "react-icons/fc";
import { FcAbout } from "react-icons/fc";

function useInView(options = { threshold: 0.9 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        io.disconnect(); // chỉ chạy 1 lần
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
      desc: "Hơn 120 khóa học đa dạng, phù hợp với mọi trình độ và nhu cầu học tập.",
      end: 120,
      suffix: "+",
      icon: <FcAbout />,
    },
    {
      title: "Tài liệu",
      desc: "Hơn 5.000 tài liệu chất lượng, bám sát chương trình, luôn được cập nhật.",
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
      title: "năm kinh nghiệm",
      desc: "Đội ngũ giáo viên hơn 10 năm kinh nghiệm giảng dạy",
      end: 10,
      suffix: "+",
      icon: <FcBullish />,
    },
  ];

  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section
      ref={ref}
      className="w-full bg-[#FFD700] text-black my-12"
      aria-label="Thống kê trung tâm"
    >
      <div className="container mx-auto px-4 py-14">
        <ul className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => {
            const val = useCountUp(0, it.end, 1400 + i * 200, inView);
            // format 30,000
            const formatted = val.toLocaleString("vi-VN");

            return (
              <li key={it.title} className="text-center max-w-[520px] mx-auto">
                {/* Icon đơn giản, bạn có thể thay bằng react-icons */}
                <div className="text-5xl mb-6 opacity-90 flex items-center justify-center">
                  {it.icon}
                </div>

                <div className="text-[20px] tracking-widest font-bold uppercase opacity-90">
                  {it.title}
                </div>

                <div className="mt-4 flex items-center justify-center">
                  <span className="text-6xl font-extrabold leading-none">
                    {formatted}
                  </span>
                  <span className="text-6xl font-extrabold leading-none pl-2">
                    {it.suffix}
                  </span>
                </div>

                <p className="mt-6 text-[15px] leading-7 text-black">
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
