// MiniChatbot.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { FiMessageCircle } from "react-icons/fi";

/** ====== CẤU HÌNH LƯU TRỮ ====== */
const STORAGE_KEY = "miniChatbot.history";
const MAX_HISTORY = 80; // đổi 50–100 tùy ý

/** ====== DỮ LIỆU MẪU (đổi theo trung tâm của bạn) ====== */
const RULES = [
  {
    re: /(học phí|giá|bao nhiêu)/i,
    answer:
      "Học phí THCS từ 900k/tháng, THPT từ 1.2tr/tháng. Gói IELTS từ 3.5tr/khóa. Nhắn Zalo để nhận bảng giá chi tiết: https://zalo.me/0369984849",
  },
  {
    re: /(lịch (học|khai giảng)|khai giảng|giờ học)/i,
    answer:
      "Khai giảng mùng 5 & 20 hàng tháng. Ca 17:30–19:00 và 19:15–20:45. Bạn quan tâm lớp nào (THCS/THPT/IELTS)?",
  },
  {
    re: /(địa chỉ|cơ sở|map|bản đồ)/i,
    answer:
      "Cơ sở: 123 Nguyễn Văn Cừ, TP.HCM. Bản đồ: https://maps.google.com/?q=123+Nguyen+Van+Cu+HCM",
  },
  {
    re: /(test|kiểm tra|đầu vào|xếp lớp)/i,
    answer:
      "Có bài test xếp lớp miễn phí (15 phút). Đăng ký test: https://zalo.me/0369984849",
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
    a: "123 Nguyễn Văn Cừ, TP.HCM. Xem map: https://maps.google.com/?q=123+Nguyen+Van+Cu+HCM",
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

/** ====== TIỆN ÍCH: tokenize + cosine mini ====== */
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

/** ====== COMPONENT ====== */
export default function MiniChatbot({
  faq = FAQ,
  rules = RULES,
  primary = "#001F5D", // nền header & nút launcher
  accent = "#FBCD02", // màu chữ/nút gửi
  launcherLabel = "Tư vấn",
}) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([
    {
      who: "bot",
      text: "Chào bạn 👋 Bạn muốn hỏi về học phí, lịch học, địa chỉ hay test đầu vào?",
    },
  ]);
  const [input, setInput] = useState("");
  const bodyRef = useRef(null);

  // Chuẩn bị FAQ token sẵn để tìm nhanh
  const faqTokens = useMemo(
    () => faq.map((x) => ({ ...x, t: tokenize(`${x.q} ${x.a}`) })),
    [faq]
  );

  /** Khôi phục lịch sử khi mount */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length) {
        setMsgs(parsed.slice(-MAX_HISTORY));
      }
    } catch (e) {
      console.warn("Load history error:", e);
    }
  }, []);

  /** Luôn cắt gọn + lưu mỗi khi msgs thay đổi */
  useEffect(() => {
    try {
      const trimmed = msgs.slice(-MAX_HISTORY);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    } catch (e) {
      console.warn("Save history error:", e);
    }
  }, [msgs]);

  /** Auto scroll */
  useEffect(() => {
    if (bodyRef.current)
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [msgs, open]);

  /** Close bằng phím ESC */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /** Helper push + trim trong state */
  const pushMsgs = (newMsgs) => {
    setMsgs((prev) => {
      const arr = Array.isArray(newMsgs) ? newMsgs : [newMsgs];
      const next = [...prev, ...arr];
      return next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next;
    });
  };

  const ask = (q) => {
    if (!q.trim()) return;
    pushMsgs({ who: "me", text: q });

    // 1) Rule-based
    const rule = rules.find((r) => r.re.test(q));
    if (rule) {
      pushMsgs({ who: "bot", text: rule.answer });
      return;
    }

    // 2) FAQ search
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

  const quickAsk = (q) => () => ask(q);

  const clearHistory = () => {
    if (!window.confirm("Xóa toàn bộ lịch sử hội thoại?")) return;
    localStorage.removeItem(STORAGE_KEY);
    setMsgs([{ who: "bot", text: "Chào bạn 👋 Mình có thể giúp gì?" }]);
  };

  /** Overlay click để đóng */
  const handleOverlayClick = () => setOpen(false);

  /** Ngăn sự kiện “click ra ngoài” khi bấm trong khung chat */
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <>
      {/* Nút nổi mở chatbot */}
      <button
        aria-label="Chat tư vấn"
        onClick={() => setOpen((v) => !v)}
        // style={{ background: primary, color: accent }}
        className="fixed right-2 bottom-20 z-10
    inline-flex items-center gap-2 px-2 py-2 rounded-full font-bold
    text-[#001F5D]
    bg-gradient-to-r
    from-[#001F5D]/30 
    via-[#334D9A]/30 
    via-[#FBCD02]/40 
    to-[#FFA500]/30   /* thêm màu thứ 4 (cam nhạt) */
    backdrop-blur-xl border border-white/30
    shadow-lg hover:shadow-xl transition
    [background-size:200%_200%]
    [animation:gradientShift_6s_ease-in-out_infinite,glassGlow_4s_ease-in-out_infinite]"
      >
        <FiMessageCircle className="w-6 h-6" />
      </button>

      {/* Overlay + Hộp chat */}
      {open && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[9998] bg-black/30"
          aria-hidden="true"
        >
          <div
            onClick={stopPropagation}
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
                  className="text-white/90 hover:text-white text-lg leading-none"
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

              {/* Gợi ý nhanh */}
              <div className="mt-2 mb-1 flex flex-wrap gap-2">
                {["Học phí", "Lịch học", "Địa chỉ", "Test đầu vào"].map((t) => (
                  <button
                    key={t}
                    onClick={quickAsk(t)}
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
