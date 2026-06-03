import { Star, Clock, BookOpen, ChevronRight } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  key?: string | number;
  course: Course;
  onSelect: (course: Course) => void;
  onEnroll: (course: Course) => void;
}

export default function CourseCard({ course, onSelect, onEnroll }: CourseCardProps) {
  // Utility for formatting price in Vietnamese Dong
  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const getPriceBadge = () => {
    if (course.price === 0) {
      return (
        <span className="px-2.5 py-1 text-xs font-bold bg-emerald-150 text-emerald-800 rounded">
          FREE
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 text-xs font-semibold bg-blue-50 text-[#3B82F6] rounded">
        CHUYÊN SÂU
      </span>
    );
  };

  return (
    <div
      id={`course-card-${course.id}`}
      className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300 overflow-hidden flex flex-col h-full"
    >
      {/* Course Banner */}
      <div className="relative aspect-video w-full overflow-hidden bg-gray-50">
        <img
          src={course.image}
          alt={course.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex items-center space-x-1.5">
          {getPriceBadge()}
        </div>
        {course.discountPrice && (
          <div className="absolute top-3 right-3 bg-rose-500 text-white font-bold text-[10px] px-2 py-1 rounded shadow-sm uppercase tracking-wider animate-pulse">
            Giảm {Math.round((1 - course.discountPrice / course.price) * 100)}%
          </div>
        )}
      </div>

      {/* Course Content Info */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        {/* Category tags */}
        <div className="flex flex-wrap gap-1.5">
          {course.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(course)}
          className="font-display text-lg font-bold text-gray-900 group-hover:text-[#3B82F6] transition-colors line-clamp-2 cursor-pointer h-12"
        >
          {course.title}
        </h3>

        {/* Description line */}
        <p className="font-sans text-gray-500 text-xs leading-relaxed line-clamp-3 flex-grow">
          {course.description}
        </p>

        {/* Course specs & stats */}
        <div className="flex items-center justify-between border-y border-gray-100 py-3 text-gray-500 text-[11px] font-semibold">
          <div className="flex items-center space-x-1">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BookOpen className="h-3.5 w-3.5 text-gray-400" />
            <span>{course.lessonsCount} bài giảng</span>
          </div>
          <div className="flex items-center space-x-1 bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-black">
            <Star className="h-3 w-3 fill-amber-500 text-amber-550 mr-0.5 shrink-0" />
            <span>{course.rating}</span>
          </div>
        </div>

        {/* Instructor profile & Price actions */}
        <div className="flex items-center justify-between pt-2">
          {/* Instructor detail */}
          <div className="flex items-center space-x-2.5">
            <img
              src={course.instructor.avatar}
              alt={course.instructor.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border-2 border-white ring-2 ring-gray-100"
            />
            <div>
              <p className="font-display text-xs font-bold text-gray-900 leading-tight">
                {course.instructor.name}
              </p>
              <p className="text-[10px] text-[#3B82F6] font-semibold">
                {course.instructor.role} ({course.instructor.company})
              </p>
            </div>
          </div>

          {/* Pricing indicator */}
          <div className="text-right">
            {course.discountPrice ? (
              <>
                <p className="text-[10px] text-gray-400 line-through leading-none">
                  {formatPrice(course.price)}
                </p>
                <p className="text-sm font-black text-rose-600 leading-tight">
                  {formatPrice(course.discountPrice)}
                </p>
              </>
            ) : (
              <p className={`text-sm font-black ${course.price === 0 ? 'text-emerald-600' : 'text-[#1E3A8A]'}`}>
                {formatPrice(course.price)}
              </p>
            )}
          </div>
        </div>

        {/* Buttons: Detail or Enroll */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
          <button
            onClick={() => onSelect(course)}
            className="w-full py-2.5 border border-gray-200 text-gray-700 rounded-lg text-xs font-bold hover:bg-gray-50 hover:border-gray-300 transition-colors cursor-pointer text-center"
          >
            Syllabus chi tiết
          </button>
          
          <button
            onClick={() => onEnroll(course)}
            className="w-full py-2.5 btn-primary text-white rounded-lg text-xs font-bold shadow hover:shadow-md transition-all cursor-pointer flex items-center justify-center space-x-1"
          >
            <span>Đăng ký học</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
