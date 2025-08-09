import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { IoSearch } from "react-icons/io5";
import { GrMapLocation } from "react-icons/gr";
import { IoCalendarOutline } from "react-icons/io5";
import { IoCartOutline } from "react-icons/io5";
import { FaPhone } from "react-icons/fa6";
import logo from "../../assets/logo_but_chi.png";
import text_dayhocvaluyenthi from "../../assets/text_dayhocvaluyenthi.png";
const Header = () => {
  return (
    <header className="mt-0 sticky z-30">
      <div className="top-strip w-full bg-[#FBCD02] py-[10px] overflow-hidden">
        <div className="animate-marquee whitespace-nowrap text-[#001F5D] text-[17px] font-semibold">
          <span className="mx-14">⚡ Đăng ký combo để nhận ưu đãi</span>
          <span className="mx-16">Tặng 1 môn khi đăng ký 3 môn</span>
          <span className="mx-16">Số lượng ưu đãi có hạn</span>
          <span className="mx-14">🚀 Đăng ký ngay để không bỏ lỡ</span>
        </div>
      </div>

      <div className="container flex items-center justify-between">
        <div className="col-1 w-[25%] py-3">
          <Link to={"/"}>
            <div className="flex items-center">
              <img src={logo} className="w-[16%]" />
              <img src={text_dayhocvaluyenthi} alt="" className="w-[65%]" />
            </div>
          </Link>
        </div>
        <div className="col-2 w-[45%]">
          <ul className="flex items-center justify-center gap-8">
            <li className="list-none">
              <Link to="/" className="transition">
                <span className="uppercase text-[20px] font-bold">thcs</span>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="transition">
                <span className="uppercase text-[20px] font-bold">THPT</span>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="transition">
                <span className="uppercase text-[20px] font-bold">
                  IELTS-TOEIC
                </span>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="transition">
                <span className="uppercase text-[20px] font-bold">
                  tuyển dụng
                </span>
              </Link>
            </li>
            <li className="list-none">
              <Link to="/" className="transition">
                <span className="uppercase text-[20px] font-bold !mt-[-20px]">
                  |
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-3 w-[20%]">
          <ul className="flex items-center justify-start gap-4 pl-5">
            <li className="list-none">
              <Link className="transition">
                <Tooltip title="chi nhánh" placement="top">
                  <IoSearch className="text-[26px]" />
                </Tooltip>
              </Link>
            </li>
            <li className="list-none">
              <Link className="transition">
                <Tooltip title="chi nhánh" placement="top">
                  <IoCalendarOutline className="text-[26px]" />
                </Tooltip>
              </Link>
            </li>
            <li className="list-none">
              <Link className="transition">
                <Tooltip title="thời khóa biểu" placement="top">
                  <GrMapLocation className="text-[26px]" />
                </Tooltip>
              </Link>
            </li>
            <li className="list-none">
              <Link className="transition">
                <Tooltip title="thời khóa biểu" placement="top">
                  <IoCartOutline className="text-[30px]" />
                </Tooltip>
              </Link>
            </li>
          </ul>
        </div>

        {/* Register */}
        <div className="col4 w-[10%] flex-1">
          <Link
            to="https://zalo.me/0369984849"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="flex items-center gap-3 bg-[#001F5D] max-w-max p-[6px] px-4 rounded-[4px]">
              <FaPhone className="text-[#fcec16] text-[18px] animate-wiggle" />
              <span className="text-[18px] text-white font-medium">
                Đăng ký
              </span>
            </div>
          </Link>
        </div>
        {/* End register */}
      </div>
    </header>
  );
};

export default Header;
