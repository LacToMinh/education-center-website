import { Link, useLocation, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { IoSearch, IoCartOutline } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import { FiPhoneCall } from "react-icons/fi";
import { useEffect, useState } from "react";
import logo from "../../assets/logo_but_chi.png";
import text_dayhocvaluyenthi from "../../assets/text_dayhocvaluyenthi.png";

const Header = () => {
  const [glass, setGlass] = useState({ alpha: 0.24, blur: 8, shadow: false });
  const location = useLocation();
  const navigate = useNavigate();

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

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector("header");
    const headerH = header ? header.offsetHeight : 0;
    const top =
      el.getBoundingClientRect().top + window.pageYOffset - headerH - 8;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Click handler cho các item menu
  const handleSectionClick = (id) => {
    if (location.pathname === "/") {
      // đang ở trang chủ -> cuộn luôn
      scrollToId(id);
    } else {
      // trang khác -> quay về home và gửi "scrollTo" qua state
      navigate("/", { state: { scrollTo: id } });
    }
  };

  const menu = [
    { label: "THCS", id: "thcs" },
    { label: "THPT", id: "thpt" },
    { label: "IELTS-TOEIC", id: "ielts-toeic" },
    { label: "TUYỂN DỤNG", id: "tuyendung" },
    // item riêng cho thời khóa biểu -> link sang /schedule
    { label: "THỜI KHÓA BIỂU", path: "/schedule" },
  ];

  return (
    <header className="mt-0 sticky top-0 z-30">
      {/* Top strip */}
      <div className="top-strip w-full bg-[#FBCD02] py-[10px] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-[#001F5D] text-[17px] font-semibold">
          <span className="mx-14">⚡ Đăng ký combo để nhận ưu đãi</span>
          <span className="mx-16">Tặng 1 môn khi đăng ký 3 môn</span>
          <span className="mx-16">Số lượng ưu đãi có hạn</span>
          <span className="mx-14">🚀 Đăng ký ngay để không bỏ lỡ</span>
        </div>
      </div>

      {/* Nav */}
      <div
        className={`container flex items-center justify-between px-3 md:px-0 rounded-b-xl transition-[box-shadow,background] duration-300
          ${glass.shadow ? "shadow-md" : "shadow-sm"} ring-1 ring-white/30`}
        style={{
          backgroundColor: `rgba(255,255,255, ${glass.alpha})`,
          backdropFilter: `saturate(160%) blur(${glass.blur}px)`,
          WebkitBackdropFilter: `saturate(160%) blur(${glass.blur}px)`,
        }}
      >
        {/* Logo */}
        <div className="col-1 w-[25%] py-3 pl-1">
          <Link to={"/"}>
            <div className="flex items-center gap-3">
              <img src={logo} className="w-[40px] h-[40px] object-contain" />
              <img
                src={text_dayhocvaluyenthi}
                alt=""
                className="w-[160px] md:w-[200px]"
              />
            </div>
          </Link>
        </div>

        {/* Menu */}
        <nav className="col-2 w-[45%] hidden md:block">
          <ul className="flex items-center justify-center gap-6">
            {menu.map((item) => (
              <li key={`nav-${item.id || item.path}`}>
                {item.path ? (
                  // THỜI KHÓA BIỂU -> sang /schedule
                  <Link
                    to={item.path}
                    className="uppercase text-[16px] md:text-[18px] font-bold text-slate-800 hover:text-[#001F5D] transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <button
                    onClick={() => handleSectionClick(item.id)}
                    className="uppercase text-[16px] md:text-[18px] font-bold text-slate-800 hover:text-[#001F5D] transition-colors"
                  >
                    {item.label}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions */}
        <div className="col-3 w-[15%] pl-8">
          <ul className="flex items-center gap-5 text-slate-800">
            <li>
              <Tooltip title="tìm kiếm" placement="top">
                <button aria-label="search">
                  <IoSearch className="text-[24px] md:text-[26px]" />
                </button>
              </Tooltip>
            </li>
            <li>
              <Link to="/branches">
                <Tooltip title="chi nhánh" placement="top">
                  <button aria-label="map">
                    <GrMapLocation className="text-[24px] md:text-[26px]" />
                  </button>
                </Tooltip>
              </Link>
            </li>
            <li>
              <Tooltip title="giỏ hàng" placement="top">
                <button aria-label="cart">
                  <IoCartOutline className="text-[26px] md:text-[30px]" />
                </button>
              </Tooltip>
            </li>
          </ul>
        </div>

        {/* Register */}
        <div className="col4 w-[15%] flex-1 flex justify-end pr-1">
          <Link
            to="https://zalo.me/0369984849"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <div className="flex items-center gap-3 bg-[#001F5D] max-w-max p-[6px] px-4 rounded-[10px] transition-transform group-hover:scale-[1.02]">
              <FiPhoneCall className="text-[#fcec16] text-[18px] animate-wiggle" />
              <span className="text-[16px] md:text-[18px] text-white font-medium">
                Đăng ký
              </span>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
