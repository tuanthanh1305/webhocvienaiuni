import { Calendar, MapPin, Users, Award, ChevronRight, Activity } from 'lucide-react';

export default function ActivityEvents() {
  const corporateEvents = [
    {
      title: 'Hội Sách & Diễn Đàn Khoa Học Quốc Gia TECHFEST Vietnam',
      category: 'Sự kiện Quốc gia',
      desc: 'AIUNI đồng hành chia sẻ các tham luận xuất sắc về giải pháp tích hợp tác nhân thông minh AI Agent hỗ trợ cấu đới kinh tế số.',
      date: '22/05/2026',
      location: 'Trung tâm Hội nghị Quốc gia, Hà Nội',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Tập huấn AI cho địa phương & Cán bộ UBND',
      category: 'Hành chính công',
      desc: 'Chương trình đào tạo thực tế ứng hành chính công số, hướng dẫn cán bộ sở ban ngành tự động hóa soạn thảo văn bản hóa.',
      date: '18/05/2026',
      location: 'Sở Thông tin và Truyền thông, Quảng Ninh',
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Chương trình đào tạo 1000 Giảng viên GenAI nòng cốt',
      category: 'Giáo dục toàn quốc',
      desc: 'Chiến dịch Train The Trainers cung cấp miễn phí tài liệu bồi dưỡng năng lực số, bọc lót giáo thảo cho hàng ngàn thầy cô giáo.',
      date: '10/05/2026',
      location: 'Học viện Công nghệ AIUNI, Trực tuyến',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Talkshow Hướng nghiệp AI & Trắc nghiệm RIASEC',
      category: 'Sự nghiệp phổ thông',
      desc: 'Hợp tác CCC Việt Nam bồi dưỡng kỹ năng đặt prompt cơ bản cho học sinh trung học phổ thông định dạng nghề nghiệp tương lai.',
      date: '05/05/2026',
      location: 'Trường THPT Chuyên Nguyễn Huệ, Hà Nội',
      image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Cuộc thi AI Challenge cho Sinh viên miền Bắc',
      category: 'Giải thưởng Học thuật',
      desc: 'Khởi động cổng thi trực tuyến tìm kiếm giải pháp chatbot, thiết bị kính AI thông minh lập trình robot tối ưu vận hành.',
      date: '28/04/2026',
      location: 'Đại học Quốc gia Hà Nội',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop'
    },
    {
      title: 'Diễn đàn Chuyển đổi số Giáo dục Phổ thông',
      category: 'Giáo vụ hiện đại',
      desc: 'Bàn luận giải pháp ứng dụng học liệu thông minh cá nhân hóa lộ trình của EduAI và LMS tích hợp công nghệ AI.',
      date: '15/04/2026',
      location: 'Viện Đổi mới Sáng tạo Quốc gia, Hà Nội',
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop'
    }
  ];

  return (
    <div className="py-16 bg-white shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block">
            Nhịp Đập Hoạt Động
          </span>
          <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
            Hoạt Động & Sự Kiện Nổi Bật
          </h2>
          <p className="font-sans text-gray-500 text-sm leading-relaxed">
            Học viện AIUNI tích cực hoạt động phụng sự cộng đồng, đẩy mạnh tập huấn địa phương, xúc tiến chuyển đổi số quốc gia và đồng hành khởi nghiệp.
          </p>
        </div>

        {/* Dynamic Card listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {corporateEvents.map((evt, idx) => (
            <div
              key={idx}
              className="group bg-[#F9FAFB] rounded-3xl border border-gray-150 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Image banner */}
              <div className="relative h-48 bg-gray-200 overflow-hidden shrink-0">
                <img
                  src={evt.image}
                  alt={evt.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm border border-gray-100 text-[9px] font-bold px-2.5 py-1 rounded-full text-blue-600 uppercase shadow-xs">
                  {evt.category}
                </span>
              </div>

              {/* Text content packaging */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-[10px] text-gray-400 font-sans font-semibold">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-blue-500" />
                      <span>{evt.date}</span>
                    </div>
                    <div className="flex items-center space-x-1 truncate max-w-[150px]" title={evt.location}>
                      <MapPin className="h-3 w-3 text-emerald-500" />
                      <span className="truncate">{evt.location}</span>
                    </div>
                  </div>

                  <h3 className="font-display font-black text-sm text-gray-950 leading-snug group-hover:text-blue-600 transition-colors">
                    {evt.title}
                  </h3>
                  
                  <p className="font-sans text-[11px] text-gray-500 leading-relaxed">
                    {evt.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] font-bold text-gray-400 font-sans">
                  <span className="uppercase">HỌC VIỆN AIUNI</span>
                  <div className="flex items-center text-blue-600 hover:text-blue-700">
                    <span className="mr-0.5 leading-none font-bold">Xem báo cáo</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
