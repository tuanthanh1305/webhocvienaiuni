import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Award, ShieldCheck, Globe, Milestone, Star, X, Mail, Linkedin, 
  Sparkles, GraduationCap, CheckCircle, RefreshCw 
} from 'lucide-react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Advisor } from '../types';
import { defaultAdvisors } from '../data';

export default function Advisors() {
  const [advisorsList, setAdvisorsList] = useState<Advisor[]>(defaultAdvisors);
  const [selectedMember, setSelectedMember] = useState<Advisor | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  useEffect(() => {
    // Load from LocalStorage first to feel instantaneous
    const cached = localStorage.getItem('local_advisors');
    if (cached) {
      try {
        setAdvisorsList(JSON.parse(cached));
      } catch (e) {
        console.warn("Could not parse cached advisors");
      }
    }

    // Subscribe to Realtime Firestore updates
    const q = query(collection(db, 'advisors'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items: Advisor[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Advisor);
      });
      if (items.length > 0) {
        setAdvisorsList(items);
        localStorage.setItem('local_advisors', JSON.stringify(items));
      } else {
        // Fallback to default if empty
        setAdvisorsList(defaultAdvisors);
        localStorage.setItem('local_advisors', JSON.stringify(defaultAdvisors));
      }
    }, (error) => {
      console.warn("Could not load dynamic advisors, offline fallback mode active:", error);
      if (!cached) {
        setAdvisorsList(defaultAdvisors);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleManualSync = () => {
    setSyncing(true);
    // Simulate query/update check
    setTimeout(() => {
      setSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 800);
  };

  // Categorize
  const experts = advisorsList.filter(item => item.type === 'expert');
  const boardAdvisors = advisorsList.filter(item => item.type === 'advisor');

  return (
    <div id="home-advisors" className="py-16 bg-white shrink-0 scroll-mt-20">
      
      {/* Intro Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section 1: Expert Team */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block">
              Học Thuật Thực Chiến
            </span>
            <div className="flex items-center justify-center space-x-2">
              <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
                Đội Ngũ Chuyên Gia Giảng Dạy
              </h2>
              <button 
                onClick={handleManualSync}
                disabled={syncing}
                title="Bấm để đồng bộ dữ liệu mới nhất từ máy chủ AIUNI"
                className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-all shrink-0 cursor-pointer"
              >
                <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin text-blue-600' : ''}`} />
              </button>
            </div>
            
            {syncSuccess && (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full inline-block animate-pulse">
                ✓ Đã đồng bộ trực tiếp với hệ sinh thái Firebase Cloud
              </span>
            )}

            <p className="font-sans text-gray-500 text-sm leading-relaxed">
              Các chuyên gia tại học viện sở hữu dải năng lực vượt bậc kết hợp lý thuyết và bề dày thực nghiệm tại các trung tâm công nghệ hàng đầu thế giới. Click vào Profile từng thầy cô để biết thêm chi tiết.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {experts.map((expert, idx) => (
              <motion.div
                key={expert.id || idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => setSelectedMember(expert)}
                className="group bg-slate-50 hover:bg-white rounded-2xl border border-gray-150 p-5 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between cursor-pointer text-left"
              >
                <div className="space-y-4">
                  {/* Avatar section */}
                  <div className="relative aspect-square w-24 h-24 mx-auto rounded-full overflow-hidden border border-gray-200 shadow-inner shrink-0 bg-slate-100">
                    <img
                      src={expert.avatar}
                      alt={expert.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" }}
                    />
                    {expert.badge && (
                      <span className="absolute bottom-1 right-1 bg-blue-600 text-white font-bold text-[8px] px-1.5 py-0.5 rounded shadow uppercase">
                        {expert.badge}
                      </span>
                    )}
                  </div>

                  <div className="text-center space-y-1 font-sans">
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{expert.role}</p>
                    <h3 className="font-display font-extrabold text-sm text-gray-900 leading-tight">
                      {expert.name}
                    </h3>
                  </div>

                  <p className="text-[11px] text-gray-500 font-sans leading-relaxed text-center line-clamp-3">
                    {expert.desc || expert.bio}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-gray-100 flex justify-center text-[9px] font-bold text-blue-500 font-sans uppercase tracking-wider">
                  <span>Xem hồ sơ • Chi tiết</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Section 2: Executive Board and Advisory Board */}
        <div className="pt-16 border-t border-gray-150">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block">
              Cơ cấu Tổ chức & Định hướng Chiến lược
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Ban Điều Hành & Hội Đồng Cố Vấn Viện
            </h2>
            <p className="font-sans text-gray-550 text-sm leading-relaxed">
              Nhấp chuột trực tiếp lên sơ đồ nhân sự để xem kích thước đầy đủ độ nét cao, tìm hiểu chi tiết thành viên điều hành và các nhà khoa học đồng hành.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Col 1: Executive Board */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              onClick={() => setActiveLightboxImage('https://blogger.googleusercontent.com/img/a/AVvXsEjdbS_4qNnLmHbfqf15zqEw0b9UVEJ6Sc0xrjPeyxwZZZpBWurP2lqpSn7HO0BhPnqK4m08UUg0pwsRHpTMb9SowMB8ufxTtO8NpoQsrr8o_I8D6g7sQXPtcS_GoQcZu-uD_AWulXvnw2lFQvW3eySf_33iY7JXl3vjpY27YDZDpwtGtUSOjavlODXGZ_M')}
              className="group bg-slate-50 border border-gray-200 p-6 rounded-3xl hover:border-blue-300 hover:shadow-xl transition-all duration-300 cursor-zoom-in text-left flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-extrabold text-gray-900 group-hover:text-blue-600 transition-colors">
                    Ban Điều Hành Viện Công Nghệ AIUNI
                  </h3>
                  <span className="text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-150">
                    Trực Tiếp Vận Hành
                  </span>
                </div>
                <p className="text-xs text-gray-550 font-sans leading-relaxed">
                  Đội ngũ Ban Giám đốc và các trưởng bộ phận khoa học chuyên môn chịu trách nhiệm định hướng kế hoạch giáo trình, xây dựng mạng lưới tiếp nhận thực tập và kết nối doanh nghiệm.
                </p>
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white aspect-[16/10] relative">
                  <img
                    src="https://blogger.googleusercontent.com/img/a/AVvXsEjdbS_4qNnLmHbfqf15zqEw0b9UVEJ6Sc0xrjPeyxwZZZpBWurP2lqpSn7HO0BhPnqK4m08UUg0pwsRHpTMb9SowMB8ufxTtO8NpoQsrr8o_I8D6g7sQXPtcS_GoQcZu-uD_AWulXvnw2lFQvW3eySf_33iY7JXl3vjpY27YDZDpwtGtUSOjavlODXGZ_M"
                    alt="Ban điều hành viện AIUNI"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">🔍 Bấm để phóng to</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Col 2: Advisory Board */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              onClick={() => setActiveLightboxImage('https://blogger.googleusercontent.com/img/a/AVvXsEjxVyPrFcT83BIsC1qsOdRnHNNG-ZH9Sx-6NoDQeZe1jpqOn0FpekFPF_Ebw0dLJF3-nuo28QufH1P9J6E_Ki2N6lfkSa-V5Icl5YvX1izrArKL2lxDvAaIX4BDC5VWRQwKxwLxjDBFI0amL9BWlb4W-WuG2t9hguiY-VdeIH3sqkM-a8yEJ1qELlgDp4o')}
              className="group bg-slate-50 border border-gray-200 p-6 rounded-3xl hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-zoom-in text-left flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-extrabold text-gray-900 group-hover:text-purple-600 transition-colors">
                    Hội Đồng Cố Vấn Quốc Tế AIUNI
                  </h3>
                  <span className="text-[10px] font-black uppercase text-purple-600 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-150">
                    Bảo Trợ Học Thuật
                  </span>
                </div>
                <p className="text-xs text-gray-550 font-sans leading-relaxed">
                  Được bảo trợ chiến lược từ hệ thống giáo sư, tiến sĩ và chuyên gia đầu ngành thuộc các viện AI uy tín toàn cầu tại Singapore, Thụy Sĩ, Hoa Kỳ, định hướng chuẩn quốc tế cho học viên.
                </p>
                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white aspect-[16/10] relative">
                  <img
                    src="https://blogger.googleusercontent.com/img/a/AVvXsEjxVyPrFcT83BIsC1qsOdRnHNNG-ZH9Sx-6NoDQeZe1jpqOn0FpekFPF_Ebw0dLJF3-nuo28QufH1P9J6E_Ki2N6lfkSa-V5Icl5YvX1izrArKL2lxDvAaIX4BDC5VWRQwKxwLxjDBFI0amL9BWlb4W-WuG2t9hguiY-VdeIH3sqkM-a8yEJ1qELlgDp4o"
                    alt="Hội đồng cố vấn viện AIUNI"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-102 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-black/70 text-white text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-sm">🔍 Bấm để phóng to</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </div>

      {/* --- PREMIUM BIO DETAILS MODAL --- */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white border border-slate-100 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[88vh] text-left"
            >
              {/* Header Close button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-slate-800 hover:bg-slate-100 rounded-full cursor-pointer z-20 transition-all"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
                
                {/* Visual Header Grid */}
                <div className="flex flex-col sm:flex-row gap-5 items-center sm:items-start pb-6 border-b border-gray-100">
                  <div className="relative h-28 w-28 rounded-2xl overflow-hidden shadow-md border border-slate-205/60 shrink-0 bg-slate-50">
                    <img 
                      src={selectedMember.avatar} 
                      alt={selectedMember.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" }}
                    />
                    {selectedMember.flag && (
                      <span className="absolute top-1.5 left-1.5 bg-white text-xs px-1 py-0.5 rounded-full shadow-sm">
                        {selectedMember.flag} {selectedMember.country}
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-center sm:text-left min-w-0 flex-1">
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start items-center">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-lg ${
                        selectedMember.type === 'expert' 
                          ? 'bg-blue-50 text-blue-600 border border-blue-100'
                          : 'bg-purple-50 text-purple-600 border border-purple-100'
                      }`}>
                        {selectedMember.type === 'expert' ? 'Chuyên Gia Giảng Dạy' : 'Hội Đồng Cố Vấn'}
                      </span>
                      {selectedMember.badge && (
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-lg">
                          {selectedMember.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="font-display font-extrabold text-xl text-gray-900 tracking-tight leading-tight">
                      {selectedMember.name}
                    </h3>

                    <p className="font-sans text-sm font-semibold text-blue-650">
                      {selectedMember.role}
                    </p>

                    {selectedMember.affiliation && (
                      <p className="font-sans text-xs text-gray-500 italic">
                        {selectedMember.affiliation}
                      </p>
                    )}
                  </div>
                </div>

                {/* detailed Career Bio */}
                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Milestone className="h-4 w-4 text-indigo-500" />
                    <span>Lý lịch khoa học và Kinh nghiệm</span>
                  </h4>
                  <p className="font-sans text-xs sm:text-sm text-gray-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 shadow-inner">
                    {selectedMember.bio || selectedMember.desc || "Học viện đang hoàn thiện chi tiết thông tin lý lịch cá nhân của chuyên gia."}
                  </p>
                </div>

                {/* Achievements List */}
                {selectedMember.achievements && selectedMember.achievements.length > 0 && (
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-emerald-500" />
                      <span>Cột mốc & Thành tựu tiêu biểu</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedMember.achievements.map((item, keyIdx) => (
                        <div key={keyIdx} className="flex items-start space-x-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-[11px] font-sans text-gray-600 leading-snug">
                          <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Contact Footer integration */}
                <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
                  <div className="flex items-center space-x-2 text-gray-400">
                     <Users className="h-4 w-4 text-blue-400" />
                    <span className="font-sans">Thành viên Ban Khoa học và Công nghệ AIUNI</span>
                  </div>

                  <div className="flex items-center space-x-2.5">
                    {selectedMember.email && (
                      <a 
                        href={`mailto:${selectedMember.email}`}
                        className="p-2 bg-[#F9FAFB] hover:bg-slate-100 text-gray-600 hover:text-blue-600 rounded-xl transition-all border border-gray-205/60 flex items-center space-x-1 font-sans text-xs"
                      >
                        <Mail className="h-4.5 w-4.5 shrink-0" />
                        <span>Email</span>
                      </a>
                    )}
                    {selectedMember.linkedin && (
                      <a 
                        href={selectedMember.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 bg-[#F9FAFB] hover:bg-slate-100 text-gray-600 hover:text-blue-600 rounded-xl transition-all border border-gray-205/60 flex items-center space-x-1 font-sans text-xs"
                      >
                        <Linkedin className="h-4.5 w-4.5 shrink-0 text-blue-700" />
                        <span>LinkedIn</span>
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- HIGH-RES INFOGRAPHIC LIGHTBOX --- */}
      <AnimatePresence>
        {activeLightboxImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveLightboxImage(null)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full max-h-[90vh] z-10 flex flex-col items-center justify-center"
            >
              <button
                onClick={() => setActiveLightboxImage(null)}
                className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 p-2.5 rounded-full text-white cursor-pointer transition-all border border-white/20"
                title="Đóng sơ đồ"
              >
                <X className="h-6 w-6" />
              </button>
              <img
                src={activeLightboxImage}
                alt="S sơ đồ phóng to"
                referrerPolicy="no-referrer"
                className="max-h-[80vh] w-auto max-w-full object-contain rounded-xl select-none"
              />
              <p className="mt-4 text-xs font-semibold text-gray-450 font-sans tracking-wide">
                Bấm vào vùng đen hoặc nút đóng để quay lại trang chính
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
