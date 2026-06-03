import React from 'react';
import { motion } from 'motion/react';
import { Eye, ExternalLink, Download, Sparkles, BookOpen, Heart, Award, ShieldCheck, Cpu } from 'lucide-react';

export default function PortfolioSection() {
  const canvaWatchUrl = "https://www.canva.com/design/DAG6n7xdaIc/cAhZyNaiABVnzXGsoHOOdQ/watch";
  const canvaEmbedUrl = "https://www.canva.com/design/DAG6n7xdaIc/cAhZyNaiABVnzXGsoHOOdQ/watch?embed";

  const strengths = [
    {
      icon: Cpu,
      title: "Công nghệ Đột phá",
      desc: "Chương trình liên tục cập nhật theo các tiến bộ AI mới nhất của Google, OpenAI và cộng đồng mã nguồn mở."
    },
    {
      icon: BookOpen,
      title: "Học trình Cá nhân hóa",
      desc: "Thiết kế bài giảng từ nhập môn cơ bản đến huấn luyện nâng cao chuyên nghiệp cho từng doanh nghiệp và cá nhân."
    },
    {
      icon: Award,
      title: "Chứng chỉ Uy tín",
      desc: "Khẳng định trình độ chuyên môn của học viên thông qua các bài sát hạch tiêu chuẩn và sản phẩm thực tế ứng dụng."
    },
    {
      icon: ShieldCheck,
      title: "Hệ sinh thái Toàn diện",
      desc: "Học viện kết hợp chặt chẽ giữa đào tạo lý thuyết chuyên sâu và cung cấp ứng dụng tự động hóa văn phòng trực quan."
    }
  ];

  return (
    <section id="portfolio-section" className="py-24 bg-gradient-to-b from-[#FAFBFD] to-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full inline-block"
          >
            Hồ sơ Năng lực / Corporate Profile
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-[#1E3A8A] tracking-tight font-display"
          >
            Hồ Sơ Năng Lực AIUNI Group
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-550 sm:text-lg text-sm max-w-2xl mx-auto leading-relaxed font-sans"
          >
            Tầm nhìn, sứ mệnh, giá trị cốt lõi và hệ giải pháp đào tạo Trí tuệ Nhân tạo đột phá của AIUNI hướng tới bình dân hóa tri thức công nghệ thế hệ mới.
          </motion.p>
        </div>

        {/* Canva Embed Segment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Interactive Player Frame */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 space-y-4"
          >
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-150 bg-slate-900 group">
              <iframe 
                loading="lazy" 
                style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0 }}
                src={canvaEmbedUrl} 
                allowFullScreen={true}
                allow="fullscreen"
                title="AIUNI Capability Profile Presentation"
              />
            </div>
            
            <div className="flex flex-wrap justify-between items-center gap-4 px-2">
              <p className="text-xs text-slate-500 font-sans flex items-center space-x-1.5">
                <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
                <span>Trình chiếu Canva trực quan sinh động thông tin học viện.</span>
              </p>
              <div className="flex items-center space-x-3">
                <a 
                  href={canvaWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors cursor-pointer border border-blue-100"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>Xem Trực Tiếp Trên Canva</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Quick Info & Highlights */}
          <motion.div 
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-xl space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 font-display">Tầm nhìn & Quy mô AIUNI</h3>
                <p className="text-xs sm:text-sm text-gray-550 leading-relaxed font-sans">
                  AIUNI kiến tạo trường học số chuẩn hóa quốc tế, là điểm chạm kết nối doanh nghiệp Việt với xu hướng công nghệ toàn cầu. Profile này cung cấp bức tranh toàn cảnh về năng lực liên kết, đội ngũ và cơ sở hạ tầng học thuật vượt trội.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-gray-500 font-mono border-b border-gray-100 pb-2">
                  <span>Phiên bản tài liệu</span>
                  <span className="text-[#1E3A8A] bg-blue-50 px-2 py-0.5 rounded">v2026.2</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-500 font-mono border-b border-gray-100 pb-2">
                  <span>Phát hành bởi</span>
                  <span className="text-gray-900">Ban Truyền Thông AIUNI</span>
                </div>
                <div className="flex items-center justify-between text-xs font-bold text-gray-500 font-mono border-b border-gray-100 pb-2">
                  <span>Hình thức xem</span>
                  <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded">Canva Slide Watch / Embed</span>
                </div>
              </div>

              <div className="pt-2">
                <a 
                  href={canvaWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-extrabold text-sm rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer text-center"
                >
                  <Eye className="h-4.5 w-4.5" />
                  <span>Trải Nghiệm Toàn Màn Hình</span>
                </a>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Brand Strengths Bento list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {strengths.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                <div className="p-3 bg-blue-50/50 text-blue-600 rounded-xl inline-block mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="text-base font-bold text-gray-950 mb-2 font-display">{item.title}</h4>
                <p className="text-xs sm:text-sm text-gray-550 leading-relaxed font-sans">{item.desc}</p>
                <div className="absolute right-0 bottom-0 h-1.5 w-0 bg-blue-600 group-hover:w-full transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
