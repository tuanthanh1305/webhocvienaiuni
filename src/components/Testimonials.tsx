import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Testimonial } from '../types';
import { testimonials as defaultTestimonials } from '../data';

export default function Testimonials() {
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>(() => {
    const local = localStorage.getItem('local_testimonials');
    return local ? JSON.parse(local) : defaultTestimonials;
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Firestore Live Synchronization
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'testimonials'), (snap) => {
      const items: Testimonial[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Testimonial);
      });
      if (items.length > 0) {
        setTestimonialsList(items);
        localStorage.setItem('local_testimonials', JSON.stringify(items));
      } else {
        setTestimonialsList(defaultTestimonials);
        localStorage.setItem('local_testimonials', JSON.stringify(defaultTestimonials));
      }
    }, (err) => {
      console.warn("Could not synchronize testimonials from Firestore, using offline fallback", err);
      const local = localStorage.getItem('local_testimonials');
      if (local) {
        setTestimonialsList(JSON.parse(local));
      } else {
        setTestimonialsList(defaultTestimonials);
      }
    });

    return () => unsub();
  }, []);

  // Responsive adaptation for visible items in carousel
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalTestimonials = testimonialsList.length;
  // Maximum scrollable index depends on visible cards count
  const maxIdx = Math.max(0, totalTestimonials - visibleCount);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  // Auto sliding every 5 seconds
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex >= maxIdx ? 0 : prevIndex + 1));
    }, 5000);

    return () => resetTimeout();
  }, [currentIndex, maxIdx]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIdx : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIdx ? 0 : prev + 1));
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < fullStars ? 'text-amber-500 fill-amber-500' : 'text-gray-200'
          }`}
        />
      );
    }
    return <div className="flex space-x-0.5">{stars}</div>;
  };

  return (
    <section id="testimonials" className="py-20 bg-white overflow-hidden pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
          <div className="text-left space-y-3">
            <span className="text-sm font-bold text-[#3B82F6] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block">
              Ý Kiến Học Viên
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
              Chia Sẻ Thực Tế Từ Người Học
            </h2>
            <p className="font-sans text-gray-500 text-sm md:text-base max-w-xl">
              Hàng ngàn học viên đã và đang đột phá mức hiệu suất lao động và tìm kiếm được những cơ hội kinh doanh mới cùng AIUNI.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex space-x-3">
            <button
              id="btn-prev-testimonial"
              onClick={handlePrev}
              className="p-3 border border-gray-200 hover:border-blue-400 rounded-full hover:bg-blue-50 hover:text-blue-600 text-gray-700 bg-white transition-all shadow-sm cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              id="btn-next-testimonial"
              onClick={handleNext}
              className="p-3 border border-gray-200 hover:border-blue-400 rounded-full hover:bg-blue-50 hover:text-blue-600 text-gray-700 bg-white transition-all shadow-sm cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Carousel Container (Calculates sliding offset based on visibleCount) */}
        <div className="relative w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
              width: `${(totalTestimonials / visibleCount) * 100}%`
            }}
          >
            {testimonialsList.map((test) => (
              <div
                key={test.id}
                className="px-4"
                style={{ width: `${100 / totalTestimonials}%` }}
              >
                <div className="bg-[#F9FAFB] p-8 rounded-2xl border border-gray-100 flex flex-col justify-between h-full relative hover:border-blue-200 hover:shadow-xl transition-all duration-300">
                  <div className="absolute top-6 right-8 text-blue-100 group-hover:text-blue-200 pointer-events-none">
                    <Quote className="h-10 w-10 rotate-180 opacity-50" />
                  </div>

                  <div className="space-y-4">
                    {/* Stars */}
                    {renderStars(test.rating)}

                    {/* Review text */}
                    <p className="font-sans text-gray-650 text-sm leading-relaxed italic">
                      &quot;{test.quote}&quot;
                    </p>
                  </div>

                  {/* Divider line */}
                  <div className="border-t border-gray-200/60 pt-5 mt-6 flex items-center space-x-4">
                    <img
                      src={test.avatar}
                      alt={test.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="font-display text-sm font-bold text-gray-900 leading-tight">
                        {test.name}
                      </h4>
                      <p className="text-[11px] text-[#3B82F6] font-semibold">
                        {test.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Indicators Dots */}
        <div className="flex justify-center space-x-2 mt-10">
          {Array.from({ length: maxIdx + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] w-6'
                  : 'bg-gray-200 hover:bg-gray-300 w-2.5'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
