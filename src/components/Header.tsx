import { useState, useEffect } from 'react';
import { Menu, X, Sparkles, ChevronDown, Key } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenAdvisor: () => void;
  onOpenEnrollDefault: () => void;
  isAdmin?: boolean;
  currentUser?: any;
  onLogin?: () => void;
  onLogout?: () => void;
}

export default function Header({
  onNavigate,
  activeSection,
  onOpenAdvisor,
  onOpenEnrollDefault,
  isAdmin,
  currentUser,
  onLogin,
  onLogout,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const mainLinks = [
    { label: 'Trang chủ', id: 'home' },
    { label: 'Đào tạo', id: 'training' },
    { label: 'Hồ sơ Năng lực', id: 'portfolio' },
    { label: 'Liên hệ', id: 'contact' },
  ];

  const dropdownLinks = [
    { label: 'Hệ sinh thái AI', id: 'ecosystem' },
    { label: 'Cố vấn & Đội ngũ', id: 'advisors' },
    { label: 'Đối tác & Hợp tác', id: 'partners' },
    { label: 'Truyền thông', id: 'media' },
    { label: 'Tin tức & Blog', id: 'news' },
  ];

  const mobileLinks = [
    ...mainLinks,
    ...dropdownLinks,
    ...(isAdmin ? [{ label: 'Quản trị hệ thống ⚙️', id: 'admin' }] : []),
  ];

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    setDropdownOpen(false);
    onNavigate(id);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-gray-100 ${
        scrolled ? 'shadow-md py-2.5' : 'shadow-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            id="header-logo"
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={() => handleItemClick('home')}
          >
            <img
              src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjHWgPoU6mXZe5D5Fe6MJfQi7S3Z39JS_EBwmUhD_UQm_Rsnfm9btIXKp5qFcVj-DkvHE1EAHmMBOkBiZ7JTq9rDsduXX3tksy4dPkc7LRYhz6uDJsvJrnCfQeaY-GP_nPQdTIseYgHxvL-qnjHJlRzYoZBC5yyTjY8hUGwHdvuAT4nNsMXY7Rf6JQ5Vmk/s1920/logo.png"
              alt="AIUNI Logo"
              referrerPolicy="no-referrer"
              className="h-11 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
            />
          </div>

          {/* Desktop Menu */}
          <nav id="desktop-nav" className="hidden lg:flex items-center space-x-7">
            {mainLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`font-sans font-semibold text-sm transition-all duration-200 hover:scale-102 cursor-pointer relative py-2 ${
                  activeSection === item.id
                    ? 'text-[#3B82F6] font-bold'
                    : 'text-gray-750 hover:text-[#3B82F6]'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-[#3B82F6]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {/* Dropdown triggers on hover/click */}
            <div
              className="relative py-2 group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                className={`font-sans font-semibold text-sm flex items-center space-x-1 transition-all duration-200 cursor-pointer py-1 px-1.5 rounded-lg text-gray-750 hover:text-[#3B82F6] ${
                  dropdownLinks.some((sub) => activeSection === sub.id)
                    ? 'text-[#3B82F6] font-bold'
                    : ''
                }`}
              >
                <span>Về AIUNI</span>
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:rotate-180" />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full mt-1.5 w-56 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 overflow-hidden"
                  >
                    {dropdownLinks.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => handleItemClick(subItem.id)}
                        className={`block w-full text-left px-5 py-2.5 text-xs font-semibold hover:bg-blue-50/50 hover:text-blue-600 transition-colors cursor-pointer ${
                          activeSection === subItem.id ? 'bg-blue-50 text-[#3B82F6] font-bold' : 'text-gray-700 font-medium'
                        }`}
                      >
                        {subItem.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* If isAdmin true, display Quick Admin Navigation route link */}
            {isAdmin && (
              <button
                onClick={() => handleItemClick('admin')}
                className={`font-sans font-extrabold text-sm transition-all duration-200 hover:scale-102 cursor-pointer relative py-2 text-rose-600 hover:text-rose-500 ${
                  activeSection === 'admin' ? 'font-black text-rose-700' : ''
                }`}
              >
                <span>Quản trị ⚙️</span>
                {activeSection === 'admin' && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-rose-600"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            )}
          </nav>

          {/* Right Action Widgets */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              id="btn-header-advisor"
              onClick={onOpenAdvisor}
              className="flex items-center space-x-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-blue-200 text-blue-600 bg-blue-50/50 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              <span>Cố vấn AI</span>
            </button>

            <button
              id="btn-header-register"
              onClick={onOpenEnrollDefault}
              className="px-5 py-2.5 btn-primary text-white font-bold rounded-lg hover:shadow-lg transition-all duration-300 cursor-pointer text-sm shadow animate-none"
            >
              Đăng ký học
            </button>

            {/* Login Widget block */}
            {currentUser ? (
              <div
                id="btn-user-profile"
                className="flex items-center space-x-2 border border-gray-200/85 p-1 pr-3.5 rounded-full bg-white shadow-sm hover:bg-gray-50 transition-all max-w-[155px]"
              >
                <img
                  src={currentUser.photoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150'}
                  alt="User avatar"
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover shadow-sm border border-slate-100"
                />
                <button
                  onClick={onLogout}
                  className="text-[9px] font-black text-gray-400 hover:text-red-500 transition-colors uppercase cursor-pointer tracking-wider"
                  title="Đăng xuất"
                >
                  Thoát
                </button>
              </div>
            ) : (
              <button
                onClick={onLogin}
                className="inline-flex items-center space-x-1 bg-slate-50 border border-gray-150 text-xs font-bold text-gray-550 px-3.5 py-2.5 rounded-lg hover:text-blue-600 hover:bg-blue-50/20 cursor-pointer transition-all"
                title="Đăng nhập Admin"
              >
                <Key className="h-3.5 w-3.5 text-gray-400" />
                <span>Admin</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger toggle */}
          <div className="flex lg:hidden items-center space-x-2">
            <button
              id="btn-mobile-advisor"
              onClick={onOpenAdvisor}
              className="p-2 rounded-lg border border-blue-100 text-[#3B82F6] bg-blue-50 cursor-pointer"
            >
              <Sparkles className="h-4 w-4" />
            </button>
            <button
              id="btn-mobile-menu"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-4 pb-6 space-y-2.5">
              {mobileLinks.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold cursor-pointer ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-[#1E3A8A]'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3">
                <button
                  id="btn-mobile-advisor-drawer"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenAdvisor();
                  }}
                  className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-[#1E3A8A] bg-blue-50/50 hover:bg-blue-50 border border-blue-100 font-bold transition-all text-xs cursor-pointer w-full text-center"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Trò chuyện Cố vấn AI</span>
                </button>
                <button
                  id="btn-mobile-register"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenEnrollDefault();
                  }}
                  className="px-4 py-3 btn-primary text-white font-bold rounded-lg hover:shadow-lg transition-all text-xs text-center w-full cursor-pointer"
                >
                  Đăng ký miễn phí
                </button>

                {/* Mobile Admin Authentication Action */}
                {!currentUser ? (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      if (onLogin) onLogin();
                    }}
                    className="flex items-center justify-center space-x-1.5 px-4 py-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-gray-650 font-bold text-xs cursor-pointer w-full text-center"
                  >
                    <Key className="h-4 w-4 text-gray-400" />
                    <span>Đăng nhập Admin (Google)</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      if (onLogout) onLogout();
                    }}
                    className="flex items-center justify-center space-x-1.5 px-4 py-3 rounded-lg bg-red-50 text-red-650 hover:bg-red-100 border border-red-200 font-bold text-xs cursor-pointer w-full text-center"
                  >
                    <span>Thoát tài khoản ({currentUser.email})</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
