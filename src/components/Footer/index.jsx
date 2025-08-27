import { Link } from "react-router-dom";
import { FiFacebook, FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { FaTiktok } from "react-icons/fa6";

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
              <img
                src="/images/icons/logo_but_chi.png"
                alt="dayhocvaluyenthi"
                className="h-10 w-10 object-contain"
              />
              <span className="text-xl font-extrabold tracking-wide">
                dayhocvaluyenthi
              </span>
            </div>
            <p className="mt-3 text-slate-200/80 leading-7">
              Học là niềm vui – Thi là thử thách. Đồng hành nâng tầm tiếng Anh &
              kiến thức cho học sinh.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {/* Facebook */}
              <a
                aria-label="Facebook"
                href="https://www.facebook.com/trungtamdayhocvaluyenthi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <FiFacebook size={20} />
              </a>

              {/* TikTok */}
              <a
                aria-label="TikTok"
                href="https://www.tiktok.com/@dayhocvaluyenthi"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <FaTiktok size={20} />
              </a>

              {/* Zalo */}
              <a
                aria-label="Zalo"
                href="https://zalo.me/0369984849"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                <img
                  src="/images/icons/zalo_icon.png"
                  alt="Zalo"
                  className="w-5 h-5"
                />
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
              <a
                href="https://www.google.com/maps/place/TU%E1%BB%86+NAM+GROUP+BUILDING/@11.035036,106.640151,15z/data=!4m6!3m5!1s0x3174d100552d68ed:0x982e0b653a3025c0!8m2!3d11.035036!4d106.640151!16s%2Fg%2F11v_9wgd9v?hl=vi"
                target="_blank"
                className="flex items-start gap-2 hover:text-[#FBCD02]"
              >
                <FiMapPin className="mt-1" /> 69/3 ĐT741, Tân Định, Bến Cát,
                Bình Dương
              </a>
              <a
                href="https://www.google.com/maps/place/Trung+t%C3%A2m+d%E1%BA%A1y+h%E1%BB%8Dc+v%C3%A0+luy%E1%BB%87n+thi+TNedu/@11.0699205,106.6234703,17z/data=!4m16!1m9!3m8!1s0x3174cd7497ee1151:0x8d2ba4900f2340ea!2zVHJ1bmcgdMOibSBk4bqheSBo4buNYyB2w6AgbHV54buHbiB0aGkgVE5lZHU!8m2!3d11.0699152!4d106.6260452!9m1!1b1!16s%2Fg%2F11rj_896b5!3m5!1s0x3174cd7497ee1151:0x8d2ba4900f2340ea!8m2!3d11.0699152!4d106.6260452!16s%2Fg%2F11rj_896b5?authuser=2&entry=ttu"
                target="_blank"
                className="flex items-start gap-2 hover:text-[#FBCD02]"
              >
                <FiMapPin className="mt-1" /> B1-01 Đ. N1, khu đô thị Thịnh Gia,
                Bến Cát, Bình Dương
              </a>
              <a
                href="https://zalo.me/0369984849"
                target="_blank"
                className="flex items-start gap-2 hover:text-[#FBCD02]"
              >
                <FiPhone className="mt-1" /> 0369 984 849
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=tuenambinhduong@gmail.com"
                target="_blank"
                className="flex items-start gap-2 hover:text-[#FBCD02]"
              >
                <FiMail className="mt-1" /> tuenambinhduong@gmail.com
              </a>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold">Nhận tin ưu đãi</h4>
            <p className="mt-3 text-slate-200/80">
              Mẹo học & lịch khai giảng mới mỗi tháng.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-4 flex items-center gap-2"
            >
              <input
                id="email"
                // type="email"
                placeholder="Email của bạn"
                className="w-[60%] rounded-xl hidden xl:block bg-white/10 placeholder:text-slate-200/60 text-white px-4 py-3 outline-none focus:ring-2 focus:ring-[#FBCD02]"
              />
              <a
                href="https://zalo.me/0369984849"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  const email = document.getElementById("email")?.value || "";
                  // chèn nội dung soạn sẵn
                  const url = `https://zalo.me/0369984849?message=${encodeURIComponent(
                    `Đăng ký nhận tin: ${email}`
                  )}`;
                  e.currentTarget.href = url;
                }}
              >
                <span className="rounded-xl bg-[#FBCD02] text-[#001F5D] font-semibold px-3 py-3 hover:brightness-95 transition">
                  <span className="font-bold">Đăng ký</span>
                </span>
              </a>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <a
          href="https://www.facebook.com/minh.lac.9406/"
          target="_blank"
          className="text-sm text-[#FBCD02] hover:text-white"
        >
          © {year} Lạc Tô Minh. All rights reserved.
        </a>
        <div className="text-xs flex items-center gap-4 text-slate-200/70">
          <Link
            to="https://www.facebook.com/minh.lac.9406/"
            target="_blank"
            className="hover:text-white"
          >
            Điều khoản
          </Link>
          <span className="opacity-70">•</span>
          <Link
            to="https://www.facebook.com/minh.lac.9406/"
            target="_blank"
            className="hover:text-white"
          >
            Bảo mật
          </Link>
          <span className="opacity-70">•</span>
          <Link
            to="https://www.facebook.com/minh.lac.9406/"
            target="_blank"
            className="hover:text-white"
          >
            Cookie
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
