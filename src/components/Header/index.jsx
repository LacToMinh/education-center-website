// src/components/layout/Header.jsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { IoSearch, IoCartOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import { FiPhoneCall } from "react-icons/fi";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { useEffect, useState } from "react";
import logo from "../../assets/logo_but_chi.png";
import text_dayhocvaluyenthi from "../../assets/text_dayhocvaluyenthi.png";

const HOT = [
  "Ielts",
  "Toán",
  "combo trang nguyên",
  "combo tinh hoa",
  "Hóa",
  "Lý",
  "Tiếng Anh",
  "Toeic",
];

export default function Header() {
  const [glass, setGlass] = useState({ alpha: 0.24, blur: 8, shadow: false });
  const [open, setOpen] = useState(false); // drawer mobile
  const [openSearch, setOpenSearch] = useState(false); // overlay search
  const location = useLocation();
  const navigate = useNavigate();

  // hiệu ứng glass theo scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const p = Math.min(1, Math.max(0, y / 240));
      const alpha = 0.24 + 0.41 * p;
      const blur = 8 + 12 * p;
      setGlass({ alpha, blur, shadow: p > 0.05 });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // đổi route thì đóng drawer
  useEffect(() => setOpen(false), [location.pathname]);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector("header");
    const headerH = header ? header.offsetHeight : 0;
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const handleSectionClick = (id) => {
    if (!id) return;
    if (location.pathname === "/") {
      scrollToId(id);
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
    setOpen(false);
  };

  // submit tìm kiếm
  const onSearchSubmit = (e) => {
    e.preventDefault();
    const value = e.currentTarget.q?.value?.trim();
    if (!value) return;
    setOpenSearch(false);
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  const menu = [
    { label: "THCS", id: "thcs" },
    { label: "THPT", id: "thpt" },
    { label: "IELTS-TOEIC", id: "ielts-toeic" },
    { label: "TUYỂN DỤNG", id: "tuyendung" },
    { label: "THỜI KHÓA BIỂU", path: "/schedule" },
  ];

  return (
    <header className="mt-0 sticky top-0 z-40">
      {/* Top strip */}
      <div className="top-strip w-full bg-[#FBCD02] py-[10px] overflow-hidden">
        <div
          className="inline-block w-max animate-[marquee_16s_linear_infinite]
                      whitespace-nowrap text-[#001F5D] text-[17px] font-semibold"
        >
          <span className="mx-14">⚡ Đăng ký combo để nhận ưu đãi</span>
          <span className="mx-16">Tặng 1 môn khi đăng ký 3 môn</span>
          <span className="mx-16">Số lượng ưu đãi có hạn</span>
          <span className="mx-14">🚀 Đăng ký ngay để không bỏ lỡ</span>
        </div>
      </div>

      {/* Nav bar glass */}
      <div className="sticky top-0 z-40">
        <div
          className={`md:container lg:container w-full mx-auto flex items-center justify-between px-2 md:px-3 lg:px-0 rounded-b-xl transition-[box-shadow,background] duration-300
          ${glass.shadow ? "shadow-md" : "shadow-sm"} ring-1 ring-white/30`}
          style={{
            backgroundColor: `rgba(255,255,255, ${glass.alpha})`,
            backdropFilter: `saturate(160%) blur(${glass.blur}px)`,
            WebkitBackdropFilter: `saturate(160%) blur(${glass.blur}px)`,
          }}
        >
          {/* Logo */}
          <div className="w-auto py-3 pl-0 sm:pl-1 md:pl-1 lg:pl-1">
            <Link to={"/"} aria-label="Trang chủ">
              <div className="flex items-center gap-1 sm:gap-2 md:gap-3 lg:gap-3">
                <img
                  src={logo}
                  className="w-[35px] h-[35px] sm:w-[40px] sm:h-[40px] md:w-[40px] md:h-[40px] lg:w-[40px] lg:h-[40px] object-contain"
                  alt="Logo"
                />
                <img
                  src={text_dayhocvaluyenthi}
                  alt="dayhocvaluyenthi.com"
                  className="w-[clamp(145px,30vw,200px)]"
                />
              </div>
            </Link>
          </div>

          {/* Menu desktop */}
          <nav className="hidden lg:block">
            <ul className="flex items-center justify-center gap-6">
              {menu.map((item) => (
                <li key={`nav-${item.id || item.path}`}>
                  {item.path ? (
                    <Link
                      to={item.path}
                      className="uppercase text-[16px] xl:text-[18px] font-bold text-slate-800 hover:text-[#001F5D] transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      onClick={() => handleSectionClick(item.id)}
                      className="uppercase text-[16px] xl:text-[18px] font-bold text-slate-800 hover:text-[#001F5D] transition-colors"
                    >
                      {item.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Actions desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex items-center gap-5 text-slate-800">
              <li>
                <Tooltip title="tìm kiếm" placement="top">
                  <button
                    aria-label="search"
                    onClick={() => setOpenSearch(true)}
                  >
                    <IoSearch className="text-[24px]" />
                  </button>
                </Tooltip>
              </li>
              <li>
                <Link to="/branches">
                  <Tooltip title="chi nhánh" placement="top">
                    <button aria-label="map">
                      <GrMapLocation className="text-[24px]" />
                    </button>
                  </Tooltip>
                </Link>
              </li>
              <li>
                <Link to="/store">
                  <Tooltip title="giỏ hàng" placement="top">
                    <button aria-label="cart">
                      <IoCartOutline className="text-[26px]" />
                    </button>
                  </Tooltip>
                </Link>
              </li>
            </ul>

            <Link
              to="https://zalo.me/0369984849"
              target="_blank"
              rel="noopener noreferrer"
              className="group lg:pr-2"
            >
              <div className="flex items-center gap-3 bg-[#001F5D] max-w-max p-[6px] px-4 rounded-[10px] transition-transform group-hover:scale-[1.02]">
                <FiPhoneCall className="text-[#fcec16] text-[18px] animate-wiggle" />
                <span className="text-[16px] xl:text-[18px] text-white font-medium">
                  Đăng ký
                </span>
              </div>
            </Link>
          </div>

          {/* Actions mobile/tablet */}
          <div className="flex items-center gap-2 md:gap-3 lg:gap-3 lg:hidden">
            {/* <button
              aria-label="search"
              onClick={() => setOpenSearch(true)}
              className="p-2 rounded-lg ring-1 ring-slate-300/70 hover:bg-slate-50 active:scale-95 transition"
            >
              <IoSearch className="text-[20px]" />
            </button> */}

            <Link
              to="https://zalo.me/0369984849"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div
                className="flex items-center gap-2 h-9 md:h-10 px-3 md:px-4 
                    bg-[#001F5D] rounded-[10px] leading-none whitespace-nowrap 
                    transition-transform group-hover:scale-[1.02]"
              >
                <FiPhoneCall className="text-[#fcec16] text-[16px] md:text-[18px] lg:text-[18px] animate-wiggle" />
                <span className="text-[13px] md:text-[15px] lg:text-[15px] text-white font-medium">
                  Đăng ký
                </span>
              </div>
            </Link>

            <button
              aria-label="Mở menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="p-2 rounded-lg ring-1 ring-slate-300/70 hover:bg-slate-50 active:scale-95 transition"
            >
              {open ? (
                <HiX className="text-[22px]" />
              ) : (
                <HiOutlineMenu className="text-[22px]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Drawer menu for mobile/tablet */}
      <div
        className={`lg:hidden overflow-hidden transition-[max-height,opacity] duration-300
        ${open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"}`}
        style={{
          backgroundColor: `rgba(255,255,255, ${Math.max(0.6, glass.alpha)})`,
          backdropFilter: `saturate(160%) blur(${Math.max(10, glass.blur)}px)`,
          WebkitBackdropFilter: `saturate(160%) blur(${Math.max(
            10,
            glass.blur
          )}px)`,
        }}
      >
        <div className="px-4 py-3">
          <ul className="container flex flex-col gap-2">
            {menu.map((item) => (
              <li key={`m-${item.id || item.path}`}>
                {item.path ? (
                  <Link
                    to={item.path}
                    className="block w-full rounded-xl px-3 py-3 text-[16px] font-semibold text-slate-800 hover:bg-slate-100"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleSectionClick(item.id)}
                    className="w-full text-left rounded-xl px-3 py-3 text-[16px] font-semibold text-slate-800 hover:bg-slate-100"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* ===== PHẦN GIỮ NGUYÊN (không đổi class) ===== */}
          <div className="!w-full mt-3 grid grid-cols-3 gap-3">
            <button
              onClick={() => {
                setOpen(false);
                setOpenSearch(true);
              }} // chỉ thêm handler, không đổi style
              className="flex items-center justify-center gap-1 rounded-xl px-2 py-2 ring-1 ring-slate-300 text-slate-800"
            >
              <IoSearch className="text-[18px]" />{" "}
              <span className="text-[12px] font-semibold">Tìm kiếm</span>
            </button>
            <Link to="/branches" className="contents">
              <button className="flex items-center justify-center gap-1 rounded-xl px-2 py-2 ring-1 ring-slate-300 text-slate-800 w-full">
                <GrMapLocation className="text-[18px]" />{" "}
                <span className="text-[12px] font-semibold">Chi nhánh</span>
              </button>
            </Link>
            <Link to="/store" className="contents">
              <button className="flex items-center justify-center gap-1 rounded-xl px-2 py-2 ring-1 ring-slate-300 text-slate-800 w-full">
                <IoCartOutline className="text-[18px]" />{" "}
                <span className="text-[12px] font-semibold">Cửa hàng</span>
              </button>
            </Link>
          </div>
          {/* ===== HẾT PHẦN GIỮ NGUYÊN ===== */}
        </div>
      </div>

      {/* ===== Search Overlay (liquid glass) ===== */}
      {openSearch && (
        <div
          className="fixed inset-0 z-[9998] bg-black/55 backdrop-blur-xl backdrop-saturate-150"
          onClick={() => setOpenSearch(false)}
          aria-hidden="true"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto mt-16 w-[min(960px,92vw)]
                       rounded-2xl border border-white/30
                       bg-white/55 backdrop-blur-2xl
                       shadow-xl p-5"
            style={{
              WebkitBackdropFilter: "saturate(160%) blur(16px)",
              backdropFilter: "saturate(160%) blur(16px)",
            }}
          >
            {/* Input search */}
            <form onSubmit={onSearchSubmit} className="relative">
              <input
                name="q"
                autoFocus
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full h-14 pl-4 pr-14 rounded-2xl
                           bg-white/70 border border-slate-300/60
                           outline-none focus:ring-2 focus:ring-[#FBCD02]
                           placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2
                           h-11 w-11 rounded-xl
                           bg-white/70 border border-slate-300/60
                           grid place-items-center hover:shadow
                           active:scale-95 transition"
                aria-label="Tìm kiếm"
              >
                <IoSearch className="text-[22px]" />
              </button>
            </form>

            {/* Từ khóa nổi bật */}
            <div className="mt-6">
              <h3 className="text-xl font-extrabold">
                Từ khóa nổi bật hôm nay
              </h3>
              <div className="mt-3 flex flex-wrap gap-3">
                {HOT.map((k) => (
                  <button
                    key={k}
                    onClick={() => {
                      setOpenSearch(false);
                      navigate(`/search?q=${encodeURIComponent(k)}`);
                    }}
                    className="px-4 py-2 rounded-xl
                               bg-white/70 border border-slate-300
                               hover:bg-white transition text-slate-800"
                  >
                    {k}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
