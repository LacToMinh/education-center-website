import CourseDetail from "../../components/CourseDetail";

export default function IeltsDetail() {
  return (
    <>
      <CourseDetail
      cfg={{
        title: "Khoá học IELTS",
        subtitle:
          "Khoá học IELTS toàn diện, giúp bạn đạt mục tiêu từ 5.5 đến 8.0+ với giáo viên kinh nghiệm.",
        heroImage: "/images/banners/ielts_banner.png",
        themeFrom: "#ff3b30",
        themeTo: "#ff7a59",
        textColor: "white",
        meta: {
          hours: "36 giờ/khoá",
          level: "Band 4.0 → 7.0",
          classSize: "8–12 HV",
        },
        outcomes: [
          "Nắm vững 4 kỹ năng Nghe, Nói, Đọc, Viết",
          "Chiến lược làm bài từng dạng câu hỏi",
          "Tự tin khi thi IELTS",
        ],
        syllabus: [
          {
            title: "Giai đoạn 1 - Nền tảng",
            hours: "30h",
            bullets: ["Ngữ pháp cơ bản", "Từ vựng theo chủ đề", "Phát âm chuẩn"],
          },
          {
            title: "Giai đoạn 2 - Nâng cao",
            hours: "40h",
            bullets: [
              "Chiến lược Listening/Reading",
              "Viết Task 1 & 2",
              "Luyện Speaking Part 1–3",
            ],
          },
        ],
        benefits: [
          "Giáo trình cập nhật mới nhất",
          "Giáo viên chấm bài Writing chi tiết",
          "Lớp nhỏ 8–12 học viên",
        ],
        faqs: [
          { q: "Lịch học thế nào?", a: "Học 2–3 buổi/tuần, có lớp tối và cuối tuần." },
          { q: "Có thi thử định kỳ không?", a: "Có Cambridge mock test mỗi tuần." },
          { q: "Sĩ số bao nhiêu?", a: "Khoảng 8–12 học viên/lớp." },
        ],
        pricing: {
          mainPrice: "5.500.000 VNĐ/khoá",
          note: "Ưu đãi khi đăng ký combo.",
          includes: ["Tài liệu miễn phí", "Thi thử miễn phí", "Hỗ trợ ngoài giờ"],
        },
        links: {
          zalo: "https://zalo.me/0369984849",
          register: "",
        },
      }}
    />
    </>
  );
}
