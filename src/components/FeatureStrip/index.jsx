// components/FeatureStrip.jsx
import { FaChalkboardTeacher } from "react-icons/fa";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";

const items = [
  {
    icon: <FaChalkboardTeacher size={28} />,
    title: "Giáo viên giỏi",
    desc: "Nhiều năm kinh nghiệm",
  },
  {
    icon: <HiOutlineClipboardDocumentCheck size={28} />,
    title: "Giáo trình chuẩn",
    desc: "Bám sát chương trình",
  },
  {
    icon: <IoSettingsOutline size={28} />,
    title: "Lịch học linh hoạt",
    desc: "Phù hợp mọi thời gian",
  },
  {
    icon: <FiPhoneCall size={28} />,
    title: "Hotline: 0369.984.849",
    desc: "Hỗ trợ từ 8h30–21h30",
  },
];

export default function FeatureStrip() {
  return (
    <section className="w-full container">
      <div className="mx-auto w-full pb-2 pt-4 sm:py-8 sm:pt-[50px]">
        {/* Mobile 2 cột → Desktop 4 cột */}
        <ul className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {items.map((it, idx) => (
            <li
              key={idx}
              className="flex items-center gap-2 sm:gap-4 p-2 sm:py-4 sm:px-4 rounded-xl border border-gray-400 bg-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Icon */}
              <span className="flex p-[2px] h-6 w-6 sm:h-12 sm:w-12 items-center justify-center rounded-full border-2 border-[#001F5D] text-[#FEA500] bg-white">
                {it.icon}
              </span>

              {/* Text */}
              <div className="leading-tight">
                <div className="text-[12px] sm:text-[18px] font-semibold text-slate-900">
                  {it.title}
                </div>
                <div className="mt-[2px] text-[9px] sm:text-[15px] text-slate-500">
                  {it.desc}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
