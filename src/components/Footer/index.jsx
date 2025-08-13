// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiYoutube,
  FiInstagram,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import logo from "/logo_but_chi.png"; // bật nếu bạn có logo

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="text-slate-100 bg-[#001F5D]">
      {/* Top strip */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="dayhocvaluyenthi" className="h-10 w-10 object-contain" />
              <span className="text-xl font-extrabold tracking-wide">
                dayhocvaluyenthi
              </span>
            </div>
            <p className="mt-3 text-slate-200/80 leading-7">
              Học là niềm vui – Thi là thử thách. Đồng hành nâng tầm tiếng Anh &
              kiến thức cho học sinh.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                aria-label="Facebook"
                href="#"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <FiFacebook />
              </a>
              <a
                aria-label="YouTube"
                href="#"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <FiYoutube />
              </a>
              <a
                aria-label="Instagram"
                href="#"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <FiInstagram />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="lg:pl-12">
            <h4 className="text-lg font-bold">Chương trình</h4>
            <ul className="mt-3 space-y-2 text-slate-200/90">
              <li>
                <Link to="#" className="hover:text-[#FBCD02]">
                  THCS
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#FBCD02]">
                  THPT
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#FBCD02]">
                  IELTS – TOEIC
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-[#FBCD02]">
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="">
            <h4 className="text-lg font-bold">Liên hệ</h4>
            <ul className="mt-3 space-y-2 text-slate-200/90">
              <li className="flex items-start gap-2">
                <FiMapPin className="mt-1" /> 123 Nguyễn Văn Cừ, TP.HCM
              </li>
              <li className="flex items-start gap-2">
                <FiPhone className="mt-1" /> 0369 984 849
              </li>
              <li className="flex items-start gap-2">
                <FiMail className="mt-1" /> support@dayhocvaluyenthi.com
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold">Nhận tin ưu đãi</h4>
            <p className="mt-3 text-slate-200/80">
              Mẹo học & lịch khai giảng mới mỗi tháng.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Đã đăng ký nhận tin!");
              }}
              className="mt-4 flex items-center gap-2"
            >
              <input
                type="email"
                required
                placeholder="Email của bạn"
                className="flex-1 rounded-xl bg-white/10 placeholder:text-slate-200/60 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#FBCD02]"
              />
              <button className="rounded-xl bg-[#FBCD02] text-[#001F5D] font-semibold px-2 py-3 hover:brightness-95 transition">
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm text-[#FBCD02]">
          © {year} Lạc Tô Minh. All rights reserved.
        </p>
        <div className="text-xs flex items-center gap-4 text-slate-200/70">
          <Link to="#" className="hover:text-white">
            Điều khoản
          </Link>
          <span className="opacity-70">•</span>
          <Link to="#" className="hover:text-white">
            Bảo mật
          </Link>
          <span className="opacity-70">•</span>
          <Link to="#" className="hover:text-white">
            Cookie
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
