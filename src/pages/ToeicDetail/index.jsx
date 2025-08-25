import CourseDetail from "../../components/CourseDetail";

export default function ToeicDetail() {
  return (
    <CourseDetail
      cfg={{
        title: "Khoá học TOEIC",
        subtitle:
          "Khoá học TOEIC cam kết nâng điểm nhanh, giúp bạn đạt mục tiêu 500–900+.",
        heroImage: "/images/banners/toeic_banner.png",
        themeFrom: "#1e6ee9",
        themeTo: "#00a2ff",
        textColor: "white",
        meta: {
          hours: "32 giờ/khoá",
          level: "Mục tiêu 600/700/800+",
          classSize: "10–15 HV",
        },
        outcomes: [
          "Chiến lược làm bài Listening & Reading",
          "Tăng tốc độ đọc hiểu",
          "Nắm chắc cấu trúc ngữ pháp thường gặp",
        ],
        syllabus: [
          {
            title: "Giai đoạn 1 - Cơ bản",
            hours: "25h",
            bullets: ["Ngữ pháp nền tảng TOEIC", "Từ vựng theo part", "Phát âm Listening"],
          },
          {
            title: "Giai đoạn 2 - Luyện đề",
            hours: "35h",
            bullets: [
              "Làm đề theo part",
              "Phân tích lỗi sai",
              "Chiến lược phân bổ thời gian",
            ],
          },
        ],
        benefits: [
          "Kho 2000+ câu hỏi TOEIC",
          "Giáo viên chấm bài định kỳ",
          "Mock test chuẩn IIG",
        ],
        faqs: [
          { q: "Mục tiêu điểm có bảo đảm?", a: "Có lộ trình rõ ràng và theo dõi tiến độ." },
          { q: "Có ngân hàng câu hỏi?", a: "Kho 2000+ câu phân loại theo từng Part." },
          { q: "Thi thử ra sao?", a: "Mock test chuẩn IIG 2 lần/khoá." },
        ],
        pricing: {
          mainPrice: "4.800.000 VNĐ/khoá",
          note: "Giảm thêm khi đăng ký theo nhóm.",
          includes: ["Tài liệu miễn phí", "Mock test miễn phí", "Hỗ trợ ngoài giờ"],
        },
        links: {
          zalo: "https://zalo.me/0369984849",
          register: "",
        },
      }}
    />
  );
}
