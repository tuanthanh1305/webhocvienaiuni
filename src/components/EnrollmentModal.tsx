import React, { useState } from 'react';
import { X, CheckCircle, Ticket, Calendar, User, Phone, Mail, GraduationCap, ChevronRight, Copy, Check } from 'lucide-react';
import { Course } from '../types';
import { courses as defaultCourses } from '../data';

interface EnrollmentModalProps {
  selectedCourse: Course | null;
  onClose: () => void;
  onEnrollSuccess: (enrollment: any) => void;
  courses?: Course[];
}

export default function EnrollmentModal({ selectedCourse, onClose, onEnrollSuccess, courses }: EnrollmentModalProps) {
  const coursesList = courses || defaultCourses;
  const [courseId, setCourseId] = useState(selectedCourse?.id || (coursesList[0] ? coursesList[0].id : ''));
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  // Validation and process states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  // Pick currently chosen course metadata for ticket
  const currentSelected = coursesList.find(c => c.id === courseId) || coursesList[0];

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!name.trim()) tempErrors.name = 'Vui lòng điền họ và tên';
    
    if (!email.trim()) {
      tempErrors.email = 'Vui lòng điền email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = 'Email không hợp lệ';
    }

    if (!phone.trim()) {
      tempErrors.phone = 'Vui lòng điền số điện thoại';
    } else if (!/^[0-9+]{9,13}$/.test(phone.replace(/\s/g, ''))) {
      tempErrors.phone = 'Số điện thoại không hợp lệ (9-13 chữ số)';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate API network latency for realistic feel
    setTimeout(() => {
      const uniqueCode = `AIUNI-${Math.floor(10000 + Math.random() * 90000)}-2026`;
      const enrollmentObj = {
        id: uniqueCode,
        studentName: name,
        studentEmail: email,
        studentPhone: phone,
        courseId: courseId,
        courseTitle: currentSelected.title,
        enrollmentDate: new Date().toLocaleDateString('vi-VN'),
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      setSubmittedData(enrollmentObj);
      setIsSubmitting(false);
      onEnrollSuccess(enrollmentObj);
    }, 1200);
  };

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  return (
    <div
      id="enroll-overlay"
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="enroll-modal-box"
        className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-100 flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Window Title bar */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-display font-black text-gray-900 text-lg flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-[#3B82F6]" />
            <span>Đăng Ký Học Viện AIUNI</span>
          </h3>
          <button
            id="btn-close-enroll-modal"
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 text-gray-400 hover:text-gray-700 rounded-full cursor-pointer"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content switch depends on submission success */}
        {!submittedData ? (
          /* Normal Inputs Form */
          <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
            
            {/* Description prompt */}
            <p className="font-sans text-xs text-gray-500 leading-relaxed bg-blue-50/50 p-3 rounded-lg border border-blue-50">
              ✍️ Điền chính xác thông tin bên dưới để đăng ký khoá học. Mã khóa học và phòng nghiên cứu Lab tương ứng của bạn sẽ được kích hoạt tức thì.
            </p>

            {/* Course Selector Dropdown */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Chọn khoá học</label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(e.target.value)}
                className="w-full px-4 py-3 bg-[#F9FAFB] border border-gray-200 focus:border-[#3B82F6] rounded-xl text-sm font-medium outline-none transition-colors"
              >
                {coursesList.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.title} {course.price === 0 ? '(Miễn phí)' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center">
                <User className="h-3.5 w-3.5 mr-1 text-gray-400" />
                Họ và Tên học viên
              </label>
              <input
                type="text"
                placeholder="Điền tên đầy đủ..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 bg-white border-b-2 ${
                  errors.name ? 'border-rose-400' : 'border-gray-200'
                } focus:border-[#3B82F6] outline-none text-sm transition-all`}
              />
              {errors.name && <p className="text-[10px] text-rose-500 font-bold">{errors.name}</p>}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center">
                <Mail className="h-3.5 w-3.5 mr-1 text-gray-400" />
                Địa chỉ Email liên hệ
              </label>
              <input
                type="email"
                placeholder="Ví dụ: name@example.com..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 bg-white border-b-2 ${
                  errors.email ? 'border-rose-400' : 'border-gray-200'
                } focus:border-[#3B82F6] outline-none text-sm transition-all`}
              />
              {errors.email && <p className="text-[10px] text-rose-500 font-bold">{errors.email}</p>}
            </div>

            {/* Phone Input */}
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center">
                <Phone className="h-3.5 w-3.5 mr-1 text-gray-400" />
                Số điện thoại liên lạc (Zalo)
              </label>
              <input
                type="text"
                placeholder="Ví dụ: 0988xxxxxx..."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`w-full px-4 py-3 bg-white border-b-2 ${
                  errors.phone ? 'border-rose-400' : 'border-gray-200'
                } focus:border-[#3B82F6] outline-none text-sm transition-all`}
              />
              {errors.phone && <p className="text-[10px] text-rose-500 font-bold">{errors.phone}</p>}
            </div>

            {/* Price review summary */}
            <div className="flex items-center justify-between bg-[#F9FAFB] p-3 rounded-xl border border-gray-150 text-xs text-gray-600">
              <span>Đơn giá thanh toán:</span>
              <span className="font-bold text-[#1E3A8A]">
                {currentSelected.price === 0
                  ? 'Miễn phí'
                  : currentSelected.discountPrice
                  ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentSelected.discountPrice)
                  : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(currentSelected.price)}
              </span>
            </div>

            {/* Submit CTA button */}
            <button
              id="btn-enroll-form-submit"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white rounded-xl font-bold hover:shadow-lg uppercase tracking-wider transition-all cursor-pointer text-xs flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-400"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang khởi tạo mã lớp học...</span>
                </>
              ) : (
                <>
                  <span>Xác Nhận Đăng Ký Học</span>
                  <ChevronRight className="h-4 w-4" />
                </>
              )}
            </button>

          </form>
        ) : (
          /* Submission Succeeded: Holographic Boarding Pass Ticket Screen */
          <div className="p-6 md:p-8 space-y-6 text-center">
            
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 mb-2">
              <CheckCircle className="h-6 w-6" />
            </div>

            <div className="space-y-1.5">
              <h4 className="font-display font-black text-gray-900 text-xl leading-tight">
                Đăng Ký Thành Công!
              </h4>
              <p className="font-sans text-xs text-gray-500 max-w-sm mx-auto leading-relaxed">
                Học viện Công nghệ AIUNI hân hoan chào đón bạn gia nhập. Chúc mừng bạn đã sở hữu tấm vé danh giá tham dự lớp học.
              </p>
            </div>

            {/* Boarding Pass Design card */}
            <div className="relative bg-gradient-to-b from-[#1E3A8A] to-[#2563EB] rounded-2xl text-white text-left p-6 shadow-xl border border-blue-400/20 overflow-hidden font-mono text-xs">
              {/* Card cutouts decorator */}
              <div className="absolute top-1/2 -left-3 w-6 h-6 rounded-full bg-white -translate-y-1/2" />
              <div className="absolute top-1/2 -right-3 w-6 h-6 rounded-full bg-white -translate-y-1/2" />
              
              <div className="flex items-center justify-between border-b border-white/20 pb-4 mb-4 select-none">
                <div className="flex items-center space-x-1.5 text-blue-200 text-[10px] font-bold uppercase tracking-wider">
                  <Ticket className="h-4 w-4 text-amber-300" />
                  <span>AIUNI Voucher Lớp Học</span>
                </div>
                <span className="text-[10px] bg-emerald-500/30 text-emerald-300 font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                  APPROVED
                </span>
              </div>

              {/* Data parameters list */}
              <div className="space-y-3">
                
                <div>
                  <p className="text-[10px] text-blue-200 leading-none mb-1 uppercase select-none">Tên học viên</p>
                  <p className="text-sm font-black text-white capitalize font-sans">{submittedData.studentName}</p>
                </div>

                <div>
                  <p className="text-[10px] text-blue-200 leading-none mb-1 uppercase select-none">Khoá học đăng ký</p>
                  <p className="text-xs font-semibold font-sans">{submittedData.courseTitle}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-blue-200 leading-none mb-1 uppercase select-none">Ngày đăng ký</p>
                    <p className="font-semibold text-xs text-white">{submittedData.enrollmentDate}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-blue-200 leading-none mb-1 uppercase select-none">Hotline hỗ trợ</p>
                    <p className="font-semibold text-xs text-white">0988.XXX.XXX</p>
                  </div>
                </div>

                {/* Dashed line cut */}
                <div className="border-t border-dashed border-white/20 pt-4 mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[9px] text-blue-200 leading-none mb-1.5 uppercase select-none">Mã vé tham dự</p>
                    <div className="flex items-center space-x-2">
                      <span className="font-black text-amber-300 tracking-wider text-xs">
                        {submittedData.id}
                      </span>
                      <button
                        onClick={() => handleCopyCode(submittedData.id)}
                        className="p-1 hover:bg-white/10 rounded text-blue-200 transition-colors cursor-pointer"
                        title="Copy code"
                        type="button"
                      >
                        {copiedId ? <Check className="h-3 w-3 text-green-300" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>

                  {/* Simulated Stamp */}
                  <div className="text-right select-none">
                    <p className="text-[8px] uppercase tracking-wider text-blue-200 mb-0.5">Academic Seal</p>
                    <p className="text-[11px] font-black text-white italic tracking-wider">AIUNI LABS</p>
                  </div>

                </div>

              </div>
            </div>

            {/* Instructional note with Zalo QR Simulation */}
            <div className="bg-[#F9FAFB] p-4 rounded-xl border border-gray-150 text-left space-y-2">
              <p className="text-xs font-bold text-gray-900">👉 Bước tiếp theo để kích hoạt khoá học:</p>
              <ul className="space-y-1.5 text-xs text-gray-500 font-sans leading-relaxed">
                <li>1. Vui lòng chụp màn hình vé đăng ký này hoặc Sao chép Mã Vé của bạn.</li>
                <li>2. Quét mã QR hoặc nhấn vào nút bên dưới để tham dự Nhóm Zalo lớp học.</li>
                <li>3. Gửi Mã vé lên Nhóm để nhận ngay ID tài khoản học miễn phí trọn đời!</li>
              </ul>
            </div>

            {/* Group Link trigger button */}
            <a
              href="https://zalo.me"
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:scale-102 hover:shadow text-white rounded-xl font-bold transition-all text-xs flex items-center justify-center space-x-1.5 uppercase tracking-wider"
            >
              <span>Tham gia Nhóm Zalo Hỗ Trợ 1:1</span>
              <ChevronRight className="h-4 w-4" />
            </a>

            {/* Back button */}
            <button
              onClick={onClose}
              className="text-xs font-bold text-[#3B82F6] hover:underline cursor-pointer"
            >
              Quay lại Trang Chủ
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
