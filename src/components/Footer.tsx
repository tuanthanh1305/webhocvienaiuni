import { MapPin, Phone, Mail, Facebook, Linkedin, Youtube, Twitter } from 'lucide-react';
import { COMPANY_INFO } from '../data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const linksCompany = [
    { label: 'Về chúng tôi', targetId: 'about' },
    { label: 'Hồ sơ Năng lực', targetId: 'portfolio' },
    { label: 'Giá trị khác biệt', targetId: 'features' },
    { label: 'Ý kiến học viên', targetId: 'testimonials' },
    { label: 'Tin tức công nghệ', targetId: 'blog' },
  ];

  const linksCourses = [
    { label: 'Nhập môn AI', targetId: 'courses' },
    { label: 'Machine Learning', targetId: 'courses' },
    { label: 'Deep Learning', targetId: 'courses' },
    { label: 'AI Doanh Nghiệp', targetId: 'courses' },
  ];

  return (
    <footer id="footer" className="bg-[#1F2937] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Columns Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: About Academia */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2.5 cursor-pointer" onClick={() => onNavigate('hero')}>
              <div className="p-1 bg-white/10 rounded-lg">
                <img
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHWgPoU6mXZe5D5Fe6MJfQi7S3Z39JS_EBwmUhD_UQm_Rsnfm9btIXKp5qFcVj-DkvHE1EAHmMBOkBiZ7JTq9rDsduXX3tksy4dPkc7LRYhz6uDJsvJrnCfQeaY-GP_nPQdTIseYgHxvL-qnjHJlRzYoZBC5yyTjY8hUGwHdvuAT4nNsMXY7Rf6JQ5Vmk/s1920/logo.png"
                  alt="AIUNI Logo"
                  referrerPolicy="no-referrer"
                  className="h-8 w-auto object-contain bg-white/95 rounded px-1"
                />
              </div>
              <span className="font-display text-lg font-black text-white tracking-tight">AIUNI</span>
            </div>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Học viện Công nghệ AIUNI - Nền tảng đào tạo Trí Tuệ Nhân Tạo thực hành hàng đầu Việt Nam. Đưa hàng ngàn kĩ sư, doanh nghiệp tiếp cận đỉnh cao khoa học thế giới.
            </p>
            {/* Social Icons */}
            <div className="flex items-center space-x-3.5 pt-2">
              <a
                href={COMPANY_INFO.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-blue-650 hover:text-white transition-all hover:scale-105"
                title="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href={COMPANY_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-blue-650 hover:text-white transition-all hover:scale-105"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={COMPANY_INFO.youtube}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-rose-650 hover:text-white transition-all hover:scale-105"
                title="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href={COMPANY_INFO.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-gray-800 rounded-lg text-gray-400 hover:bg-blue-400 hover:text-white transition-all hover:scale-105"
                title="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Highlighting Courses */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-white tracking-widest uppercase">
              Khóa Học Tiêu Biểu
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-450">
              {linksCourses.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.targetId)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company Page Links */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-white tracking-widest uppercase">
              Học Viện Công Nghệ
            </h3>
            <ul className="space-y-2.5 text-xs text-gray-450">
              {linksCompany.map((link, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onNavigate(link.targetId)}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Hardcoded contact details from company config */}
          <div className="space-y-4">
            <h3 className="font-display text-sm font-bold text-white tracking-widest uppercase">
              Liên Hệ Trực Tiếp
            </h3>
            <ul className="space-y-3 text-xs text-gray-400 leading-relaxed">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-4 w-4 text-[#3B82F6] shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-[#3B82F6] shrink-0" />
                <span>Hotline: {COMPANY_INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-[#3B82F6] shrink-0" />
                <span>Email: {COMPANY_INFO.email}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Lower Divider Line / Legal Footer */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 space-y-4 md:space-y-0 text-center md:text-left">
          <p>
            &copy; {currentYear} AIUNI.vn - Bản quyền thuộc về Học viện Công nghệ AIUNI. Đã được đăng ký nhãn hiệu độc quyền.
          </p>
          <div className="flex space-x-6">
            <a href="#hero" className="hover:text-gray-300">Điều khoản dịch vụ</a>
            <a href="#hero" className="hover:text-gray-300">Chính sách bảo mật</a>
            <a href="#hero" className="hover:text-gray-300">Sơ đồ trang</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
