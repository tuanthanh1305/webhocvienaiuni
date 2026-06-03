import React, { useState } from 'react';
import { Send, CheckCircle2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data';
import { db } from '../firebase';
import { collection, doc, setDoc } from 'firebase/firestore';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  
  // Handling simulation states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    const submissionId = 'contact_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
    const newContact = {
      id: submissionId,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'contacts', submissionId), newContact);
      setIsSuccess(true);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      console.warn('Firebase offline, backing up contact submission to localStorage:', err);
      // Fallback
      try {
        const local = localStorage.getItem('local_contacts');
        const list = local ? JSON.parse(local) : [];
        list.push(newContact);
        localStorage.setItem('local_contacts', JSON.stringify(list));
        setIsSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } catch (backupErr) {
        setErrorMsg('Không thể lưu thông tin. Vui lòng kiểm tra kết nối mạng.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Coordinates details */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-sm font-bold text-[#3B82F6] uppercase tracking-wider bg-blue-50 px-3 py-1 rounded-full inline-block">
              LIÊN HỆ
            </span>
            <h2 className="font-display text-4xl font-extrabold text-[#1E3A8A]">
              Tư Vấn Học Trình <br />
              Miễn Phí 24/7
            </h2>
            <p className="font-sans text-gray-500 text-sm leading-relaxed">
              Bạn băn khoăn chưa biết lựa chọn khóa học nào để tối đa hóa hiệu suất hay hướng đi nghiệp vụ? Đội ngũ hỗ trợ tuyển sinh của AIUNI luôn túc trực để đồng hằng cùng bạn. Hãy gửi tin nhắn ngay!
            </p>

            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400">Thời gian làm việc</p>
                  <p className="text-sm font-semibold text-gray-950 font-sans">Thứ 2 - Chủ Nhật (08:00 - 22:00)</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400">Đăng ký doanh nghiệp / Workshop</p>
                  <p className="text-sm font-semibold text-[#1E3A8A] font-mono">{COMPANY_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3.5">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs uppercase font-bold text-gray-400">Hòm thư tiếp nhận học bổng</p>
                  <p className="text-sm font-semibold text-gray-950 font-sans">{COMPANY_INFO.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form box */}
          <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-xl border border-gray-150 relative">
            
            {isSuccess && (
              <div className="mb-6 p-4 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100 flex items-center space-x-3">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span className="text-xs font-semibold">
                  Tin nhắn của bạn đã được gửi đi! Chuyên viên AIUNI sẽ phản hồi bạn qua Email/SĐT trong vòng 30 phút.
                </span>
              </div>
            )}

            {errorMsg && (
              <p className="mb-4 text-xs font-bold text-rose-500">{errorMsg}</p>
            )}

            <form onSubmit={handleContactSubmit} className="space-y-6">
              
              {/* Input 1 - Fullname */}
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Họ và tên học viên <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nhập họ tên của bạn..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="py-2.5 bg-white border-b border-[#D1D5DB] focus:border-[#3B82F6] outline-none text-sm transition-all focus:placeholder:opacity-50"
                  required
                />
              </div>

              {/* Grid 2-cols: Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Địa chỉ Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="ví dụ: link@example.com..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="py-2.5 bg-white border-b border-[#D1D5DB] focus:border-[#3B82F6] outline-none text-sm transition-all to-blue-500"
                    required
                  />
                </div>

                <div className="flex flex-col space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Số điện thoại (Zalo)
                  </label>
                  <input
                    type="text"
                    placeholder="Nhập số điện thoại liên hệ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="py-2.5 bg-white border-b border-[#D1D5DB] focus:border-[#3B82F6] outline-none text-sm transition-all"
                  />
                </div>

              </div>

              {/* Input message area */}
              <div className="flex flex-col space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Nội dung liên hệ / Câu hỏi của bạn <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Hãy chia sẻ định hướng công nghệ hoặc khóa học bạn đang quan tâm..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="py-2.5 bg-white border-b border-[#D1D5DB] focus:border-[#3B82F6] outline-none text-sm transition-all resize-none"
                  required
                />
              </div>

              {/* Submit trigger button */}
              <button
                id="btn-contact-submit"
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 btn-primary text-white font-bold rounded-lg hover:shadow-lg transition-all duration-305 cursor-pointer text-xs flex items-center justify-center space-x-1.5 disabled:opacity-50"
              >
                <span>Xác nhận gửi thông tin</span>
                <Send className="h-4 w-4" />
              </button>

            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
