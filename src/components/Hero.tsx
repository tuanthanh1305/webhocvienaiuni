import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Play, CheckCircle2, Terminal, Cpu } from 'lucide-react';

interface HeroProps {
  onExploreCourses: () => void;
  onOpenAdvisor: () => void;
  onOpenEnrollDefault: () => void;
  dynamicTitle?: string;
  dynamicSubtitle?: string;
  onExplorePortfolio?: () => void;
}

export default function Hero({ onExploreCourses, onOpenAdvisor, onOpenEnrollDefault, dynamicTitle, dynamicSubtitle, onExplorePortfolio }: HeroProps) {
  const prompts = [
    'hãy lập quy trình tối ưu doanh nghiệp bằng AI...',
    'thiết kế prompt vẽ tranh quảng cáo bằng Midjourney...',
    'code thuật toán hồi quy Logistic Regression với PyTorch...',
    'tự động hóa tổng hợp báo cáo tài chính bằng AI agent...'
  ];

  const [currentPromptIdx, setCurrentPromptIdx] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Simple typing animation logic for the prompt visualizer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = prompts[currentPromptIdx];
    
    if (isDeleting) {
      timer = setTimeout(() => {
        setTypedPrompt(fullText.substring(0, typedPrompt.length - 1));
      }, 30);
    } else {
      timer = setTimeout(() => {
        setTypedPrompt(fullText.substring(0, typedPrompt.length + 1));
      }, 70);
    }

    if (!isDeleting && typedPrompt === fullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedPrompt === '') {
      setIsDeleting(false);
      setCurrentPromptIdx((prev) => (prev + 1) % prompts.length);
    }

    return () => clearTimeout(timer);
  }, [typedPrompt, isDeleting, currentPromptIdx]);

  return (
    <section
      id="hero"
      className="relative min-h-[640px] md:min-h-[700px] bg-gradient-to-br from-[#122254] via-[#1E3A8A] to-[#3B82F6] text-white flex items-center pt-28 pb-16 overflow-hidden"
    >
      {/* Background patterns */}
      <div className="absolute inset-0 z-0 opacity-15 overflow-hidden">
        <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Info Box */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="flex flex-wrap gap-3 items-center">
              <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-semibold text-blue-200 tracking-wide">
                <Sparkles className="h-4 w-4 text-blue-300" />
                <span>Nền Tảng Đào Tạo AI Hàng Đầu Việt Nam</span>
              </div>
              {onExplorePortfolio && (
                <button
                  type="button"
                  onClick={onExplorePortfolio}
                  className="inline-flex items-center space-x-1 bg-amber-500/10 hover:bg-amber-500/25 border border-amber-400/40 text-xs font-bold text-amber-300 hover:text-white px-3 py-1.5 rounded-full cursor-pointer transition-all hover:scale-105"
                >
                  <span>📄 Hồ sơ Năng lực AIUNI &gt;&gt;</span>
                </button>
              )}
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              {dynamicTitle ? (
                <span>{dynamicTitle}</span>
              ) : (
                <>
                  Học AI từ <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 via-blue-100 to-white">
                    Đơn giản đến Nâng cao
                  </span>
                </>
              )}
            </h1>

            <p className="text-blue-100/90 text-base sm:text-lg lg:text-xl font-sans max-w-xl leading-relaxed">
              {dynamicSubtitle || 'Từ ứng dụng chatbot cơ bản đến xây dựng mạng Nơ-ron Deep Learning chuyên sâu cùng chuyên gia. Nâng tầm sự nghiệp và kiến tạo tương lai cùng AIUNI. Đăng ký miễn phí ngay!'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="btn-hero-register"
                onClick={onOpenEnrollDefault}
                className="px-8 py-4 bg-gradient-to-r from-white to-blue-50 text-[#1E3A8A] font-bold rounded-lg hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer text-base shadow flex items-center justify-center space-x-2"
              >
                <span>Bắt đầu học ngay</span>
                <ArrowRight className="h-5 w-5" />
              </button>

              <button
                id="btn-hero-explore"
                onClick={onExploreCourses}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-all duration-300 cursor-pointer text-base flex items-center justify-center space-x-2 group"
              >
                <span>Xem khóa học</span>
                <Play className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Micro value badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 max-w-lg">
              <div className="flex items-center space-x-1.5 text-xs text-blue-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Truy cập trọn đời</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-blue-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Dự án hands-on</span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-blue-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Chứng nhận uy tín</span>
              </div>
            </div>
          </div>

          {/* Visual Simulation Display */}
          <div className="lg:col-span-5 h-full flex justify-center items-center">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-sm sm:max-w-md bg-[#1F2937]/90 rounded-2xl border border-white/10 shadow-2xl overflow-hidden p-6 font-mono text-xs text-gray-300"
            >
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                <div className="flex items-center space-x-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <div className="flex items-center space-x-1 bg-white/5 px-2.5 py-1 rounded text-[10px] text-blue-300">
                  <Cpu className="h-3.5 w-3.5" />
                  <span>AIUNI-AGENT-CORE</span>
                </div>
              </div>

              {/* Terminal Code Simulator */}
              <div className="space-y-3.5 min-h-[170px]">
                <div className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">&gt;</span>
                  <div>
                    <span className="text-gray-400">assistant.initialize(student=&apos;Bạn&apos;)</span>
                  </div>
                </div>
                
                <div className="flex items-start space-x-2">
                  <span className="text-blue-400 font-bold">system</span>
                  <div className="text-emerald-400">
                    Nạp học trình AI thành công. Sẵn sàng cấu trúc bài viết...
                  </div>
                </div>

                <div className="flex items-start space-x-2">
                  <span className="text-emerald-400 font-bold">&gt;</span>
                  <div className="flex items-center">
                    <span className="text-white font-medium mr-1">ai.generate_prompt:</span>
                    <span className="text-blue-200 border-r-2 border-blue-400 animate-pulse">
                      {typedPrompt}
                    </span>
                  </div>
                </div>

                <div className="bg-white/5 p-3 rounded border border-white/5 space-y-1 text-gray-400 select-none">
                  <p className="text-amber-300 font-bold flex items-center space-x-1">
                    <Terminal className="h-3 w-3 mr-1" />
                    <span>Lớp đang học tích cực:</span>
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    🎓 <span className="text-white">AI Basics:</span> 1,240 học viên đang Code.
                  </p>
                  <p className="text-[11px] leading-relaxed">
                    🚀 <span className="text-white font-bold">Deep Learning:</span> Đột phá 98.7% Accuracy.
                  </p>
                </div>
              </div>

              {/* Floating Live Badges */}
              <div className="absolute -bottom-4 -right-4 bg-white text-gray-900 border border-gray-100 rounded-xl px-4 py-3 shadow-xl flex items-center space-x-3 max-w-[200px] animate-bounce">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <div>
                  <p className="text-[10px] text-gray-500 font-sans font-semibold">Học viên Đang Học</p>
                  <p className="text-sm font-bold text-[#1E3A8A]">3,421 Trực Tuyến</p>
                </div>
              </div>

              <div className="absolute top-12 -left-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg px-3 py-1.5 shadow-lg text-[10px] font-bold tracking-wide uppercase select-none">
                🌟 FREE COURSE INCLUDED
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
