import { 
  Network, Cpu, GraduationCap, Compass, HelpCircle, 
  Glasses, Volume2, Languages, Terminal, CheckCircle2, ChevronRight, Activity
} from 'lucide-react';

export default function ProductEcosystem() {
  const ecosystemProducts = [
    {
      title: 'AI Gate',
      subtitle: 'Nền tảng Quản trị & Tự động hoá Doanh nghiệp',
      desc: 'Giải pháp tổng phổ kết nối và đồng bộ hóa các tác vụ doanh nghiệp tự động. Hỗ trợ đắc lực cấu đới nhân sự số.',
      features: ['AI Nhân sự hỗ trợ sàng lọc thông minh', 'AI Trợ lý công việc riêng', 'Hệ thống Chatbot đa kênh tự động', 'Workflows Automation kết nối chéo'],
      illustration: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600&auto=format&fit=crop',
      color: 'border-blue-105 bg-blue-50/20 text-[#1E3A8A]'
    },
    {
      title: 'EduAI',
      subtitle: 'Giải pháp Giáo dục Kỹ thuật số tích hợp',
      desc: 'Hỗ trợ kiến tạo bản đồ học tập cá nhân giáo án tự động hóa chấm bài và cung cấp học liệu số chuẩn xác cho giáo viên.',
      features: ['Thiết kế học liệu thông minh biên soạn nhanh', 'Cá nhân hóa lộ trình học tập thích nghi', 'Bảng thống kê năng lực học sinh thời gian thực', 'Trợ lý giáo viên ảo soạn đề thi tức khắc'],
      illustration: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop',
      color: 'border-emerald-100 bg-emerald-50/20 text-[#065F46]'
    },
    {
      title: 'EduAI Kids',
      subtitle: 'Nền tảng Phát triển Tư duy cho Trẻ em',
      desc: 'Giúp học sinh và trẻ em tiếp cận sớm với tư duy máy tính, kỹ nghệ nhắc thông minh qua giáo thảo trực quan sinh động.',
      features: ['Tương tác game hóa tư duy logic', 'Tạo hình và kể chuyện sáng tạo nghệ thuật', 'Rèn luyện kỹ năng đặt câu hỏi thông minh', 'Môi trường an toàn bảo vệ thông tin trẻ nhỏ'],
      illustration: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=600&auto=format&fit=crop',
      color: 'border-amber-100 bg-amber-50/20 text-[#92400E]'
    },
    {
      title: 'LMS tích hợp AI',
      subtitle: 'Hệ thống Quản lý Học trực tuyến Trí tuệ',
      desc: 'Lưu trữ trọn vẹn video bài giảng, tự động hóa gợi ý bài tập rèn luyện thêm dựa vào chỉ số sai sót của sinh viên.',
      features: ['Đo đếm mức độ tập trung hỗ trợ tự động', 'Hỏi đáp bài tập trực diện 24/7 cùng bot', 'Cấp bằng chứng nhận Blockchain chống làm giả', 'Tự động tổng kết lỗi sai định kỳ'],
      illustration: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop',
      color: 'border-purple-100 bg-purple-50/20 text-[#5B21B6]'
    }
  ];

  const hardTechSol = [
    {
      title: 'Kính AI Thông Minh (AI Smart Glasses)',
      desc: 'Tích hợp camera góc rộng tự động nhận khuôn mặt đối tác, dịch văn bản trực quan AR thời gian thực và ghi nhận giọng nói chuyển thành text.',
      icon: Glasses,
      category: 'Phần cứng AI'
    },
    {
      title: 'Loa Phiên Dịch AI (AI Speaker)',
      desc: 'Thiết bị phát âm thanh chuyển ngữ hai chiều thích ứng có độ trễ cực thấp (dưới 100ms), chuyên dụng cho buổi họp doanh thương đa văn hóa.',
      icon: Volume2,
      category: 'Phần cứng AI'
    },
    {
      title: 'Hệ Thống Phiên Dịch Đa Ngôn Ngữ',
      desc: 'Suites phần mềm hỗ trợ thông dịch song song 15 đầu tiếng quốc tế cực kỳ chính xác nhờ thuật toán khử âm nhiễu thông minh.',
      icon: Languages,
      category: 'Phần mềm dịch'
    },
    {
      title: 'AI Translation & Advanced Chatbots',
      desc: 'Kiến trúc dịch thuật chuẩn văn chương và các chatbot chuyên sâu tích hợp tri thức doanh nghiệp thực hỗ trợ xử lý khủng hoảng đa quốc ngữ.',
      icon: Terminal,
      category: 'Phần mềm cốt lõi'
    }
  ];

  return (
    <div className="py-16 bg-white shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block">
            Giải Pháp Đột Phá Đi Đầu
          </span>
          <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
            Hệ Sinh Thái Sản Phẩm AI Toàn Diện
          </h2>
          <p className="font-sans text-gray-500 text-sm leading-relaxed">
            AIUNI không chỉ đào tạo mà trực tiếp thiết kế, sở hữu và thương mại hóa các giải pháp phần mềm, phần cứng công nghệ trí tuệ nhân tạo độc quyền tại Việt Nam.
          </p>
        </div>

        {/* 4 Core Platform products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {ecosystemProducts.map((p, idx) => (
            <div
              key={idx}
              className={`border ${p.color} rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Product illustration */}
              <div className="md:w-1/3 aspect-[4/3] rounded-2xl overflow-hidden shrink-0 border border-gray-150 relative bg-gray-55">
                <img
                  src={p.illustration}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Text parameters */}
              <div className="flex-1 space-y-4">
                <div className="space-y-1">
                  <h3 className="font-display font-black text-xl text-gray-900 leading-none">
                    {p.title}
                  </h3>
                  <p className="text-[10px] uppercase font-bold text-gray-400 font-sans tracking-tight">
                    {p.subtitle}
                  </p>
                </div>

                <p className="font-sans text-xs text-gray-650 leading-relaxed">
                  {p.desc}
                </p>

                {/* Micro bullet features list */}
                <div className="grid grid-cols-1 gap-1.5 font-sans text-[11px] font-bold text-gray-600">
                  {p.features.map((feat, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                      <span className="leading-none">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Thiết Bị & Giải Pháp AI */}
        <div className="pt-10 border-t border-gray-150 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2.5 py-1 rounded-full">
                Advanced AI Hardware
              </span>
              <h2 className="font-display text-2xl font-extrabold text-gray-900">
                Thiết Bị & Giải Pháp AI Chuyên Biệt
              </h2>
            </div>
            <p className="font-sans text-gray-500 text-xs sm:text-sm max-w-md leading-relaxed">
              Dòng thiết bị cao cấp tự phát triển tại phòng lab AIUNI hữu ích tương thích sâu, hỗ trợ giải thuật số tức thời cho đa doanh nghiệp, cán bộ.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {hardTechSol.map((sol, idx) => {
              const Icon = sol.icon;
              return (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-2xl border border-gray-150 p-6 space-y-5 hover:bg-white hover:border-purple-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
                >
                  <div className="space-y-3">
                    <span className="text-[9px] font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2 py-0.5 rounded border border-purple-100 font-sans">
                      {sol.category}
                    </span>
                    
                    <div className="p-3 bg-white text-[#1E3A8A] border border-gray-100 rounded-xl max-w-fit shadow-xs">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="font-display font-extrabold text-sm text-gray-950 leading-snug">
                      {sol.title}
                    </h3>
                    
                    <p className="font-sans text-[11px] text-gray-500 leading-relaxed line-clamp-4">
                      {sol.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] font-semibold text-gray-400 font-sans">
                    <span className="uppercase font-bold text-blue-600">AIUNI Lab • R&D</span>
                    <Activity className="h-3 w-3 animate-pulse" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
