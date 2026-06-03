import { X, Calendar, Clock, Award, Star, BookOpen, CheckCircle, Smartphone } from 'lucide-react';
import { Course } from '../types';

interface CourseDetailsModalProps {
  course: Course | null;
  onClose: () => void;
  onEnroll: (course: Course) => void;
}

export default function CourseDetailsModal({ course, onClose, onEnroll }: CourseDetailsModalProps) {
  if (!course) return null;

  const formatPrice = (price: number) => {
    if (price === 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div
      id="course-details-overlay"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="course-details-modal"
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative border border-gray-100 flex flex-col sm:flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center space-x-2">
            <span className="p-1 px-2.5 bg-blue-50 text-blue-700 rounded text-xs font-bold uppercase tracking-wider">
              Syllabus
            </span>
            <span className="text-xs text-gray-500 font-sans font-semibold">
              Học viện AIUNI
            </span>
          </div>
          <button
            id="btn-close-course-modal"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Main Title Banner info */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8 space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 leading-tight">
                {course.title}
              </h2>
              <p className="font-sans text-gray-600 text-sm leading-relaxed">
                {course.longDescription || course.description}
              </p>
              
              {/* Specs Chips */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <span className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-55 text-gray-700 rounded-lg text-xs font-semibold">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span>Thời lượng: {course.duration}</span>
                </span>
                <span className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-55 text-gray-700 rounded-lg text-xs font-semibold">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <span>Tổng: {course.lessonsCount} bài giảng</span>
                </span>
                <span className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-50 text-amber-800 rounded-lg text-xs font-semibold">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  <span>Đạt: {course.rating} ({course.reviewsCount} học viên đánh giá)</span>
                </span>
              </div>
            </div>

            {/* Sidebar Pricing & Action */}
            <div className="md:col-span-4 bg-[#F9FAFB] p-5 rounded-2xl border border-gray-150 space-y-4 text-center">
              <div>
                <p className="text-xs text-gray-400 font-semibold mb-0.5 uppercase tracking-wider">Học phí trọn khóa</p>
                {course.discountPrice ? (
                  <>
                    <p className="text-xs text-gray-400 line-through leading-none">{formatPrice(course.price)}</p>
                    <p className="text-2xl font-black text-rose-600">{formatPrice(course.discountPrice)}</p>
                  </>
                ) : (
                  <p className={`text-2xl font-black ${course.price === 0 ? 'text-emerald-600' : 'text-[#1E3A8A]'}`}>
                    {formatPrice(course.price)}
                  </p>
                )}
              </div>

              <button
                id="btn-course-modal-enroll"
                onClick={() => onEnroll(course)}
                className="w-full py-3 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:shadow-lg hover:scale-103 text-white font-extrabold rounded-xl transition-all text-xs cursor-pointer text-center uppercase tracking-wider"
              >
                Đăng ký học ngay
              </button>

              <p className="text-[10px] text-gray-400 leading-normal">
                Nhận ngay tài liệu Lab bổ sung và hỗ trợ hỏi đáp trực tiếp của thầy cô trong 12 tháng.
              </p>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Curriculum breakdown */}
          <div className="space-y-4">
            <h3 className="font-display text-lg font-bold text-gray-950 flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-[#3B82F6]" />
              <span>Phác Thảo Chương Trình Chi Tiết (Syllabus)</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {course.syllabus.map((week, idx) => (
                <div
                  key={idx}
                  className="bg-[#F9FAFB] p-5 rounded-2xl border border-gray-100 hover:border-blue-150 transition-colors"
                >
                  <p className="text-xs font-extrabold text-[#3B82F6] mb-1.5 uppercase tracking-widest">
                    Tuần {week.week}
                  </p>
                  <h4 className="font-display font-bold text-gray-900 text-sm mb-3">
                    {week.title}
                  </h4>
                  <ul className="space-y-1.5">
                    {week.topics.map((topic, index) => (
                      <li key={index} className="flex items-start text-xs text-gray-600 leading-relaxed font-sans">
                        <span className="text-[#3B82F6] mr-2 font-bold">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Instructor Block Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <h3 className="font-display text-sm font-bold text-gray-400 uppercase tracking-widest">Giảng viên đứng lớp</h3>
              <div className="flex items-center space-x-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#3B82F6]"
                />
                <div>
                  <p className="font-display font-extrabold text-gray-900 text-base leading-snug">
                    {course.instructor.name}
                  </p>
                  <p className="text-xs text-gray-500 font-sans">
                    {course.instructor.role} &mdash; Đã công tác tại <span className="font-semibold text-blue-600">{course.instructor.company}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 bg-blue-50/50 p-4 rounded-xl border border-blue-50">
              <p className="text-xs font-bold text-[#1E3A8A] flex items-center mb-1">
                <Award className="h-4 w-4 mr-1 text-[#3B82F6]" />
                <span>Cam kết tại AIUNI</span>
              </p>
              <p className="text-[11px] text-gray-650 leading-relaxed leading-snug font-sans">
                Học viên được hoàn tiền 100% trong tuần đầu tiên nếu thấy học trình không phù hợp với mục tiêu đề ra.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
