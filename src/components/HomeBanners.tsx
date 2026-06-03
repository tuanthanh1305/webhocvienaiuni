import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function HomeBanners() {
  const banners = [
    {
      id: 1,
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhHN-cE6JuL62DU_5dHg2ipzbxZbI5WJBV2uRoF2lI_8q2wFPyL-PIydUqvIOYIniJ6z7_5l5L1KkGDSxzCnX2_ZW65WV86NKWGMYwfpZosb0sQfCb6J9JFMu1ODHUdy1RdCrTcFF49fSf4uGev0mjRxwJuaXDrk6ucxOoTweenm3oIjS-s6oX8Zp2d_YA/s2048/banner2.jpg',
      title: 'Học Viện Công Nghệ AIUNI',
      subtitle: 'Nâng tầm giá trị nguồn nhân lực kỷ nguyên số',
      tag: 'CHƯƠNG TRÌNH TRỌNG ĐIỂM'
    },
    {
      id: 2,
      image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhOCUqmzWYpQX8z84JIEUwo9MBHREbVpK1XuEZ3r3AYgtkqvMu_d-ZSSIWOMSFMLHQVXx2v0kZddRZfAcefNAn6st74SFMR9gTti-jKjfloE0M-UMEkAztElsKVRDZP30FVB57cVH3lt3vBFtbtK1Ii6d-8vdJfK2q9T9peIvm70oKI9S3imnpZbBGCmjs/s2048/04.jpg',
      title: 'Chuyển Đổi Số Toàn Diện',
      subtitle: 'Đồng hành cùng doanh nghiệp kiến tạo tương lai',
      tag: 'KÝ KẾT CHIẾN LƯỢC'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto scroll slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  return (
    <div className="bg-slate-50 border-y border-slate-200/60 py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 bg-black aspect-[21/9] sm:aspect-[21/8]">
          
          {/* Animated Background Slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={banners[currentIndex].image}
                alt={banners[currentIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {/* Overlay shadow gradient to make text legible */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent sm:bg-gradient-to-r sm:from-slate-950/80 sm:via-slate-900/40 sm:to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Banner Text Badge Details (only visible nicely on sm/md and above) */}
          <div className="absolute bottom-4 left-4 sm:bottom-10 sm:left-12 right-4 sm:right-auto z-10 text-left space-y-2 sm:space-y-4 pointer-events-none">
            <div className="inline-flex items-center space-x-1.5 bg-blue-600 border border-blue-400 text-white font-sans text-[8px] sm:text-[10px] font-extrabold px-2.5 py-1 rounded-md tracking-wider uppercase shadow-md select-none">
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>{banners[currentIndex].tag}</span>
            </div>
            
            <div className="space-y-1 sm:space-y-2">
              <h2 className="text-sm sm:text-2xl md:text-3xl font-display font-black text-white tracking-tight drop-shadow-md">
                {banners[currentIndex].title}
              </h2>
              <p className="text-[10px] sm:text-sm text-slate-200 font-sans max-w-md font-medium drop-shadow-sm">
                {banners[currentIndex].subtitle}
              </p>
            </div>
          </div>

          {/* Navigation Control Arrows (Visible on Desktop hover) */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white border border-white/10 hover:scale-105 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            aria-label="Slide trước"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 p-1.5 sm:p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white/90 hover:text-white border border-white/10 hover:scale-105 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
            aria-label="Slide sau"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Control Dots Indicator */}
          <div className="absolute bottom-3 right-4 sm:bottom-6 sm:right-8 z-20 flex space-x-1.5 sm:space-x-2 bg-black/35 backdrop-blur-xs px-2.5 py-1.5 rounded-full border border-white/10">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 sm:h-2 rounded-full transition-all duration-305 cursor-pointer ${
                  currentIndex === idx ? 'w-4 sm:w-6 bg-white' : 'w-1.5 sm:w-2 bg-white/40 hover:bg-white/75'
                }`}
                aria-label={`Đi tới banner thứ ${idx + 1}`}
              />
            ))}
          </div>

          {/* Highlight Badge */}
          <div className="absolute top-3 right-4 z-10 hidden sm:flex items-center space-x-1 bg-amber-500/90 text-white font-sans text-[9px] font-black px-2.5 py-1 rounded-md shadow-md uppercase select-none">
            <Star className="h-3 w-3 fill-current animate-spin [animation-duration:10s]" />
            <span>AIUNI PREMIUM</span>
          </div>

        </div>
      </div>
    </div>
  );
}
