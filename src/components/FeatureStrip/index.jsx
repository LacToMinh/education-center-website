// components/FeatureStrip.jsx
import {
  FaChalkboardTeacher
} from "react-icons/fa";
import { HiOutlineClipboardDocumentCheck } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { FiPhoneCall } from "react-icons/fi";

const items = [
  {
    icon: <FaChalkboardTeacher size={28} />,
    title: "Đội ngũ giáo viên giỏi",
    desc: "Nhiều năm kinh nghiệm",
  },
  {
    icon: <HiOutlineClipboardDocumentCheck size={28} />,
    title: "Giáo trình chuẩn",
    desc: "Bám sát chương trình"
  },
  {
    icon: <IoSettingsOutline size={28} />,
    title: "Lịch học linh hoạt",
    desc: "Phù hợp thời gian học viên",
  },
  {
    icon: <FiPhoneCall size={28} />,
    title: "Hotline: 0369.984.849",
    desc: "Hỗ trợ bạn từ 8h30–21h30",
  },
];

export default function FeatureStrip() {
  return (
    <section className="w-full container">
      <div className="mx-auto w-full py-8 pt-[50px]">
        <ul className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6">
          {items.map((it, idx) => (
            <li
              key={idx}
              className="flex items-center gap-3 py-4 px-4 rounded-xl border border-gray-400 bg-white shadow-sm hover:shadow-md transition-all duration-200"
            >
              {/* Icon tròn viền xanh đậm */}
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#001F5D] text-[#FEA500] bg-white">
                {it.icon}
              </span>

              {/* Text */}
              <div className="leading-tight">
                <div className="text-[18px] font-semibold text-slate-900">
                  {it.title}
                </div>
                <div className="mt-[2px] text-[15px] text-slate-500">
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
