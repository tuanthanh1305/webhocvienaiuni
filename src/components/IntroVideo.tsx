import React from 'react';
import { Play, Youtube, Award, Users, BookOpen } from 'lucide-react';

export default function IntroVideo() {
  const videoId = "6BAZlfeihUw";
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <span className="text-xs font-bold text-red-650 uppercase tracking-widest bg-red-50 text-rose-650 px-3 py-1 rounded-full inline-flex items-center space-x-1.5 border border-red-100">
            <Youtube className="h-4 w-4 text-red-600 animate-pulse" />
            <span>Thước Phim Giới Thiệu Học Viện</span>
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            AIUNI — Kiến Tạo Tương Lai Trí Tuệ Nhân Tạo
          </h2>
          <p className="font-sans text-gray-500 text-xs sm:text-base leading-relaxed">
            Khám phá quy mô đào tạo chuẩn quốc tế, trang thiết bị học tập tối tân, và sứ mệnh đồng hành cùng thế hệ trẻ Việt Nam chinh phục công nghệ tương lai.
          </p>
        </div>

        {/* Video Embed Frame Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Main Video Frame Column */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-900 border border-slate-200/80 group">
              {/* Decorative dynamic neon glow ring around video card */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-15 group-hover:opacity-25 transition duration-500 pointer-events-none" />
              
              {/* Aspect Ratio 16:9 responsive video wrapper */}
              <div className="relative aspect-video w-full">
                <iframe
                  src={embedUrl}
                  title="Video Giới thiệu Viện Công nghệ AIUNI"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Quick Stats and Core Highlights Column */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 text-left">
            <div className="space-y-3">
              <h3 className="font-display text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                Vững vàng kỹ năng — Sâu rộng tri thức cùng AIUNI Group
              </h3>
              <p className="font-sans text-gray-550 text-sm leading-relaxed">
                Chúng tôi nỗ lực phổ cập kỹ năng lập trình mô hình, thấu hiểu cấu trúc Prompt chuẩn khoa học và tối ưu hiệu suất quy trình công việc thông qua những bước đi thực tiễn nhất.
              </p>
            </div>

            {/* Feature Points Grid */}
            <div className="space-y-4">
              
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="p-2.5 bg-blue-100 text-blue-700 rounded-xl shrink-0">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-slate-900 text-sm">Chương trình chuẩn Quốc tế</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">Giáo trình liên tục cập nhật theo công nghệ OpenAI, Google DeepMind, Anthropic.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="p-2.5 bg-indigo-100 text-indigo-700 rounded-xl shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-slate-900 text-sm">Đội ngũ Cố vấn giàu thực chiến</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">Giảng viên và chuyên gia hàng đầu từ các tập đoàn công nghệ Đa Quốc gia.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                <div className="p-2.5 bg-emerald-100 text-emerald-700 rounded-xl shrink-0">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-slate-900 text-sm">Học liệu độc quyền & Thực hành 100%</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">Truy cập bộ tài liệu đồ sộ, thực chiến trên hệ thống GPU Cloud hiệu năng cao.</p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
