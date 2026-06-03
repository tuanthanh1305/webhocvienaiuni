import { ArrowRight, Sparkles } from 'lucide-react';

interface CTAProps {
  onOpenEnrollDefault: () => void;
}

export default function CTA({ onOpenEnrollDefault }: CTAProps) {
  return (
    <section
      id="cta"
      className="relative bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] py-20 text-white overflow-hidden"
    >
      {/* Visual background overlays */}
      <div className="absolute inset-0 z-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-cta" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-cta)" />
        </svg>
      </div>
      
      <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full bg-blue-300 opacity-20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full bg-white opacity-10 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        <div className="inline-flex items-center space-x-1.5 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-blue-100">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Mở rộng cơ hội nghề nghiệp</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight md:max-w-2xl mx-auto">
          Bắt Đầu Hành Trình Học AI <br />
          Của Bạn Ngay Hôm Nay
        </h2>

        <p className="font-sans text-blue-150 text-sm sm:text-base max-w-xl mx-auto leading-relaxed opacity-90">
          Gia nhập cộng đồng hơn 10.000+ học viên đã bứt phá hiệu năng và tìm ra con đường tự động hóa công việc thành công. Chỉ 5 phút đăng ký để kích hoạt cơ hội tiếp cận tri thức dẫn đầu!
        </p>

        <div className="pt-2">
          <button
            id="btn-cta-submit"
            onClick={onOpenEnrollDefault}
            className="px-8 py-4 bg-white text-[#1E3A8A] hover:bg-blue-50 font-extrabold rounded-lg hover:scale-105 hover:shadow-2xl transition-all duration-350 cursor-pointer text-base shadow flex items-center justify-center space-x-2 mx-auto"
          >
            <span>Đăng ký học miễn phí</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Small security warning below */}
        <p className="text-[10px] text-blue-200 font-medium">
          Không yêu cầu thẻ tín dụng. Nhận ngay quyền lợi tham gia Group Zalo giải đáp 1:1.
        </p>

      </div>
    </section>
  );
}
