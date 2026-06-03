import { PlayCircle, Award, BadgePercent, Infinity } from 'lucide-react';
import { features } from '../data';

const iconMap: { [key: string]: any } = {
  PlayCircle,
  Award,
  BadgePercent,
  Infinity
};

export default function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-sm font-bold text-[#3B82F6] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full">
            Giá Trị Khác Biệt
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Tại Sao Nên Đồng Hành Cùng Học Viện AIUNI?
          </h2>
          <p className="font-sans text-gray-500 text-base md:text-lg">
            Chúng tôi cam kết mang lại trải nghiệm học tập ưu việt nhất, chuẩn hóa thực chiến giúp bạn ứng dụng Trí Tuệ Nhân Tạo vào việc gia tăng thu nhập tức thì.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div id="features-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat) => {
            const IconComponent = iconMap[feat.iconName] || PlayCircle;
            return (
              <div
                key={feat.id}
                className="group relative bg-[#F9FAFB] p-8 rounded-2xl border border-gray-100 shadow-sm hover:translate-y-[-6px] hover:shadow-xl hover:bg-white hover:border-blue-100 transition-all duration-300"
              >
                {/* Decorative background circle */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-100/30 to-transparent rounded-tr-2xl rounded-bl-full pointer-events-none" />

                <div className="inline-flex p-4 bg-white text-[#1E3A8A] border border-gray-100 rounded-xl shadow-sm mb-6 group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors duration-300">
                  <IconComponent className="h-6 w-6" />
                </div>

                <h3 className="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-[#1E3A8A] transition-colors">
                  {feat.title}
                </h3>
                
                <p className="font-sans text-gray-500 text-sm leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
