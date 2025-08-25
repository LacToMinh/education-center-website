// MiniChatbot.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { FiMessageCircle, FiFacebook } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { RiChatSmileAiLine } from "react-icons/ri";

/* ========= CẤU HÌNH LƯU TRỮ ========= */
const STORAGE_KEY = "miniChatbot.history";
const MAX_HISTORY = 80;

/* ========= DỮ LIỆU MẪU ========= */
const RULES = [
  {
    re: /(học phí|giá|bao nhiêu)/i,
    answer:
      "Học phí THCS từ 900k/tháng, THPT từ 1.2tr/tháng. Gói IELTS từ 3.5tr/khóa. Nhắn Zalo để nhận bảng giá chi tiết: 0369984849",
  },
  {
    re: /(lịch (học|khai giảng)|khai giảng|giờ học)/i,
    answer:
      "Khai giảng mùng 5 & 20 hàng tháng. Ca 17:30–19:00 và 19:15–20:45. Bạn quan tâm lớp nào (THCS/THPT/IELTS)?",
  },
  {
    re: /(địa chỉ|cơ sở|map|bản đồ)/i,
    answer: [
      "Cơ sở 1: 69/3 ĐT741, Tân Định, Bến Cát, Bình Dương. ",
      "Cơ sở 2: B1-01 Đ. N1, khu đô thị Thịnh Gia, Bến Cát, Bình Dương.",
    ],
  },
  {
    re: /(test|kiểm tra|đầu vào|xếp lớp)/i,
    answer: "Có bài test xếp lớp miễn phí (15 phút). Đăng ký test: 0369984849",
  },
  {
    re: /(liên hệ|tư vấn|zalo|sđt|gọi)/i,
    answer: "Tư vấn nhanh: Zalo 0369 984 849 hoặc gọi trực tiếp 0369 984 849.",
  },
];

const FAQ = [
  {
    q: "Học phí các khóa học?",
    a: "THCS 900k/tháng, THPT 1.2tr/tháng, IELTS 3.5tr/khóa. Liên hệ Zalo để nhận ưu đãi mới.",
  },
  {
    q: "Lịch khai giảng và ca học?",
    a: "Khai giảng mùng 5 & 20 hàng tháng. Ca 17:30–19:00 hoặc 19:15–20:45.",
  },
  {
    q: "Địa chỉ trung tâm?",
    a: "69/3 ĐT741, Tân Định, Bến Cát, Bình Dương. Xem map: https://maps.google.com/?q=123+Nguyen+Van+Cu+HCM",
  },
  {
    q: "Có test đầu vào không?",
    a: "Có, miễn phí 15 phút. Đăng ký: https://zalo.me/0369984849",
  },
  {
    q: "Chính sách hoàn học phí?",
    a: "Hoàn 100% nếu lớp hủy; bảo lưu tối đa 3 tháng khi có lý do chính đáng.",
  },
];

/* ========= TIỆN ÍCH: tokenize + cosine mini ========= */
const tokenize = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFC")
    .replace(/[^a-z0-9\u00C0-\u1EF9\s]/gi, " ")
    .split(/\s+/)
    .filter(Boolean);

const vec = (tokens) => {
  const m = new Map();
  tokens.forEach((t) => m.set(t, (m.get(t) || 0) + 1));
  return m;
};
const dot = (a, b) => {
  let s = 0;
  for (const [k, v] of a) if (b.has(k)) s += v * b.get(k);
  return s;
};
const norm = (a) => Math.sqrt(dot(a, a));
const cosine = (ta, tb) => {
  const va = vec(ta),
    vb = vec(tb);
  const na = norm(va),
    nb = norm(vb);
  if (!na || !nb) return 0;
  return dot(va, vb) / (na * nb);
};

/* ========= HELPERS chung ========= */
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function useViewport() {
  const get = () => ({ w: window.innerWidth, h: window.innerHeight });
  const [{ w, h }, setWH] = useState(get());
  useEffect(() => {
    const onR = () => setWH(get());
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  return { w, h, minSide: Math.min(w, h) };
}

/* ========= COMPONENT ========= */
export default function MiniChatbot({
  faq = FAQ,
  rules = RULES,
  primary = "#001F5D",
  accent = "#FBCD02",
}) {
  const [open, setOpen] = useState(false); // mở hộp chat
  const [fabOpen, setFabOpen] = useState(false); // mở menu cánh quạt
  const [msgs, setMsgs] = useState([
    {
      who: "bot",
      text: "Chào bạn 👋 Bạn muốn hỏi về học phí, lịch học, địa chỉ hay test đầu vào?",
    },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  /* ===== Keyframes (nhúng 1 lần) ===== */
  // Có thể chuyển sang index.css nếu muốn
  const keyframes = `
    @keyframes gradientShift{0%{background-position:0% 50%}50%{background-position:200% 50%}100%{background-position:0% 50%}}
    @keyframes glassGlow{0%,100%{box-shadow:0 8px 24px rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.3)}50%{box-shadow:0 14px 32px rgba(0,0,0,.35),inset 0 2px 0 rgba(255,255,255,.5)}}
    @keyframes ringPulse{0%{transform:scale(.9);opacity:.55}70%{transform:scale(1.6);opacity:0}100%{opacity:0}}
  `;

  /* ===== Khôi phục / lưu lịch sử ===== */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) {
          setMsgs(parsed.slice(-MAX_HISTORY));
        }
      }
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(msgs.slice(-MAX_HISTORY))
      );
    } catch {}
  }, [msgs]);

  /* ===== Scroll cuối ===== */
  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, open]);

  /* ===== ESC đóng chat ===== */
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /* ===== Click ngoài đóng FAB ===== */
  useEffect(() => {
    const onClick = (e) => {
      if (e.target.closest?.("[data-fab]")) return;
      setFabOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  /* ===== Logic chat ===== */
  const pushMsgs = (newMsgs) => {
    setMsgs((prev) => {
      const next = [...prev, ...(Array.isArray(newMsgs) ? newMsgs : [newMsgs])];
      return next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next;
    });
  };

  const faqTokens = useMemo(
    () => faq.map((x) => ({ ...x, t: tokenize(`${x.q} ${x.a}`) })),
    [faq]
  );

  const ask = (q) => {
    if (!q.trim()) return;
    pushMsgs({ who: "me", text: q });

    const rule = rules.find((r) => r.re.test(q));
    if (rule) return pushMsgs({ who: "bot", text: rule.answer });

    const tq = tokenize(q);
    let best = { i: -1, score: 0 };
    faqTokens.forEach((row, i) => {
      const s = cosine(tq, row.t);
      if (s > best.score) best = { i, score: s };
    });
    if (best.score >= 0.2 && best.i > -1) {
      pushMsgs({ who: "bot", text: faqTokens[best.i].a });
    } else {
      pushMsgs({
        who: "bot",
        text: "Mình chưa rõ ý 🥲 Bạn có thể hỏi về: Học phí / Lịch học / Địa chỉ / Test đầu vào. Hoặc nhắn Zalo: https://zalo.me/0369984849",
      });
    }
  };
  const send = () => {
    const q = input.trim();
    setInput("");
    ask(q);
  };
  const clearHistory = () => {
    if (!window.confirm("Xóa toàn bộ lịch sử hội thoại?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setMsgs([{ who: "bot", text: "Chào bạn 👋 Mình có thể giúp gì?" }]);
  };

  /* ===== Responsive fan menu ===== */
  // const { w, minSide } = useViewport();
  const R = 72; // bán kính theo màn
  const SPAN = 160; // mobile->desktop
  const CENTER = 60; // xòe lên-trái
  const START_DEG = 99;

  const ACTIONS = [
    { key: "chat", label: "Chatbot", type: "button" },
    {
      key: "tiktok",
      label: "TikTok",
      href: "https://www.tiktok.com/@dayhocvaluyenthi",
    },
    { key: "zalo", label: "Zalo", href: "https://zalo.me/0369984849" },
    {
      key: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/trungtamdayhocvaluyenthi",
    },
  ];
  const STEP = 55;

  const ui = {
    chat: {
      bg: `bg-gradient-to-r from-[#9333EA]/70 via-[#3B82F6]/70 to-[#6EE7B7]/70 
          text-white border border-white/30 backdrop-blur-lg shadow-xl
          [background-size:200%_200%] animate-[aiGlow_2s_ease-in-out_infinite]`,
      icon: <FiMessageCircle className="w-6 h-6" />,
    },
    tiktok: {
      bg: "bg-neutral-900 text-white border border-white/20",
      icon: <FaTiktok className="w-5 h-5" />,
    },
    zalo: {
      bg: "bg-white text-[#0068ff] border border-sky-200",
      icon: <img src="/images/icons/zalo_icon.png" alt="" className="w-[24px] h-auto" />,
    },
    facebook: {
      bg: "bg-[#0866FF] text-white border border-white/20",
      icon: <FaFacebookF className="w-5 h-5" />,
    },
  };

  return (
    <>
      {/* Keyframes nhúng */}
      <style>{keyframes}</style>

      {/* ===== Overlay iOS cho FAN (tối + blur) ===== */}
      <div
        aria-hidden="true"
        onClick={() => setFabOpen(false)}
        className={`fixed inset-0 z-40
          bg-black/30 backdrop-blur-sm backdrop-saturate-120
          transition-opacity duration-300
          ${
            fabOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      />

      {/* ===== FAB group (launcher + fan) ===== */}
      <div
        data-fab
        className="fixed right-[max(0.5rem,env(safe-area-inset-right))] md:right-4 lg:right-6
                   bottom-40
                   z-50"
      >
        {/* Fan items dàn đều theo cung */}
        <div className="relative w-0 h-0">
          {ACTIONS.map((a, i) => {
            const deg = START_DEG + i * STEP;
            const rad = (deg * Math.PI) / 180;

            // origin ở góc dưới-phải: x,y âm để xòe lên-trái
            const tx = Math.cos(rad) * R;
            const ty = -Math.sin(rad) * R;

            const delay = 99 * i;
            const base =
              "absolute right-[-45px] bottom-[-55px] inline-flex items-center justify-center rounded-full shadow " +
              "backdrop-blur-md will-change-transform w-11 h-11 md:w-12 md:h-12";

            const openStyle = {
              transform: `translate(${tx}px, ${ty}px) scale(1)`,
              opacity: 1,
              transition: `fabPop .32s ease-out forwards`,
              transitionDelay: `${delay}ms`,
            };
            const closeStyle = {
              transform: `translate(0,0) scale(.6)`,
              opacity: 0,
              pointerEvents: "none",
              transition: `transform 320ms cubic-bezier(.22,.7,.25,1), opacity 180ms`,
            };

            const styles = ui[a.key] || ui.chat;
            const common = {
              key: a.key,
              "data-fab": true,
              title: a.label,
              "aria-label": a.label,
              className: `${base} ${styles.bg}`,
              style: fabOpen ? openStyle : closeStyle,
            };

            return a.type === "button" ? (
              <button
                {...common}
                onClick={() => {
                  setOpen(true);
                  setFabOpen(false);
                }}
              >
                {styles.icon}
              </button>
            ) : (
              <a
                {...common}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {styles.icon}
              </a>
            );
          })}
        </div>

        {/* Launcher */}
        <button
          data-fab
          aria-label="Mở menu"
          onClick={() => setFabOpen((v) => !v)}
          className="
            relative inline-flex items-center justify-center
            rounded-full p-3 md:p-3
            text-white
            bg-gradient-to-r
            from-[#001F5D]/50 via-[#334D9A]/50 via-[#FBCD02]/60 to-[#FFB800]/50
            backdrop-blur-2xl border border-white/40
            shadow-xl hover:scale-105 active:scale-95
            transition-transform duration-300
            focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FBCD02]/40
            [background-size:300%_300%]
            [animation:gradientShift_5s_ease-in-out_infinite,glassGlow_3s_ease-in-out_infinite]
            motion-reduce:animate-none motion-reduce:transition-none
          "
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 rounded-full -z-10
             bg-[#001F5D]/35 blur-[1px]
             animate-[ringPulse_2.4s_ease-out_infinite]"
          />
          <RiChatSmileAiLine className="w-8 h-8 text-[#001F5D]" />
        </button>
      </div>

      {/* ===== Overlay + Hộp chat ===== */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[9998] bg-black/30"
          aria-hidden="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed right-4 bottom-20 z-[9999] w-[92vw] max-w-[360px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            <div
              style={{ background: primary }}
              className="px-4 py-3 text-white font-extrabold flex items-center justify-between"
            >
              <span>Tư vấn khóa học</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={clearHistory}
                  className="text-xs text-white/80 hover:text-white underline underline-offset-2"
                  title="Xóa lịch sử"
                >
                  Xóa
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="text-white/90 hover:text-white text-xl leading-none"
                  title="Đóng"
                  aria-label="Đóng"
                >
                  ×
                </button>
              </div>
            </div>

            <div
              ref={bodyRef}
              className="px-3 py-2 overflow-auto max-h-[60vh] text-[14px]"
            >
              {msgs.map((m, i) => (
                <div
                  key={i}
                  className={`my-2 flex ${
                    m.who === "me" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-2xl max-w-[80%] leading-6 ${
                      m.who === "me"
                        ? "bg-[#001F5D] text-white rounded-br-sm"
                        : "bg-slate-100 text-slate-900 rounded-bl-sm"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}

              <div className="mt-2 mb-1 flex flex-wrap gap-2">
                {["Học phí", "Lịch học", "Địa chỉ", "Test đầu vào"].map((t) => (
                  <button
                    key={t}
                    onClick={() => ask(t)}
                    style={{ borderColor: primary, color: primary }}
                    className="px-2 py-1 text-xs border rounded-full hover:bg-slate-50"
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-2 border-t border-slate-200 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Nhập câu hỏi của bạn…"
                className="flex-1 px-3 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-[#FBCD02]"
              />
              <button
                onClick={send}
                style={{ background: accent, color: primary }}
                className="px-3 py-2 rounded-xl font-bold hover:brightness-95"
              >
                Gửi
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
