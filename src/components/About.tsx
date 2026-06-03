import { useState } from 'react';
import { 
  CheckCircle2, Star, Eye, Flag, Gem, Target, 
  GraduationCap, Cpu, Briefcase, RefreshCw, Lightbulb, Zap, Users
} from 'lucide-react';
import { motion } from 'motion/react';

interface AboutProps {
  dynamicTitle?: string;
  dynamicText?: string;
  key?: string;
}

export default function About({ dynamicTitle, dynamicText }: AboutProps = {}) {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');

  // Connections (Nơi kết nối các trụ cột phát triển)
  const connections = [
    {
      title: 'Giáo dục',
      desc: 'Bản đồ khóa học chuẩn quốc tế, gắn liền giữa cơ sở lý luận vững vàng và năng lực thực hành giải quyết vấn đề.',
      icon: GraduationCap,
      color: 'bg-blue-50 text-blue-600 border-blue-100',
    },
    {
      title: 'Công nghệ',
      desc: 'Nghiên cứu ứng dụng các thuật toán đột phá, cập nhật xu hướng GenAI mới nhất và cung cấp điện toán GPU hiệu năng cao.',
      icon: Cpu,
      color: 'bg-purple-50 text-purple-600 border-purple-100',
    },
    {
      title: 'Doanh nghiệp',
      desc: 'Phát triển các gói đào tạo chuyên sâu tinh chỉnh theo yêu cầu hoạt động của đối tác doanh nghiệp.',
      icon: Briefcase,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    },
    {
      title: 'Chuyển đổi số',
      desc: 'Tư vấn tích hợp công cụ AI, tối ưu hóa sơ đồ bộ máy vận hành hành chính và gia tăng chỉ số ROI dài hạn.',
      icon: RefreshCw,
      color: 'bg-amber-50 text-amber-600 border-amber-100',
    },
    {
      title: 'Hệ sinh thái đổi mới sáng tạo',
      desc: 'Ươm tạo những nhóm khởi nghiệp công nghệ tiềm năng, cầu nối chuyển giao tri thức từ phòng lab ra thị trường.',
      icon: Lightbulb,
      color: 'bg-rose-50 text-rose-600 border-rose-100',
    },
  ];

  // core values
  const coreValues = [
    {
      title: 'Khai phóng',
      desc: 'Phổ cập trí tuệ nhân tạo (AI) cho mọi người, không giới hạn bởi nền tảng kỹ thuật hay độ tuổi.',
      icon: Zap,
    },
    {
      title: 'Tiên phong',
      desc: 'Dẫn đầu trong tiến trình cập nhật và đổi mới công nghệ, các mô hình ngôn ngữ lớn tiên tiến nhất.',
      icon: Target,
    },
    {
      title: 'Bản lĩnh',
      desc: 'Sản phẩm và con người mang tầm vóc toàn cầu nhưng gắn liền mật thiết với bản sắc và giá trị Việt Nam.',
      icon: CheckCircle2,
    },
    {
      title: 'Khát vọng',
      desc: 'Xây dựng thế hệ nhân tài công nghệ Việt đủ năng lực cạnh tranh sòng phẳng trên trường quốc tế.',
      icon: Flag,
    },
    {
      title: 'Kết nối',
      desc: 'Thắt chặt mối liên kết hữu cơ giữa giới Học thuật – Doanh nghiệp thương mại – Chuyên gia quốc tế.',
      icon: Users,
    },
  ];

  // 3 Strategic pillars (03 định hướng chiến lược)
  const strategicPillars = [
    {
      title: 'AI University',
      subtitle: 'Đào tạo & Nghiên cứu',
      desc: 'Xây dựng trung tâm đào tạo và nghiên cứu AI chuyên sâu mang tiêu chuẩn quốc tế. Phát triển chương trình thạc sĩ ứng dụng, workshop chuyên trang và các công bố khoa học thực tiễn.',
      tagline: 'Trụ cột tri thức sâu rộng',
      illustration: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'AI Unicorn',
      subtitle: 'Khởi nghiệp & Nhân lực chất lượng cao',
      desc: 'Ươm tạo các startup công nghệ đột phá và huấn luyện các chuyên gia, kỹ sư dữ liệu xuất chúng có khả năng cống hiến tức thì. Chuyển giao các mô hình AI độc quyền cho dự án tỉ đô.',
      tagline: 'Ươm mầm kỳ lân tương lai',
      illustration: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=600&auto=format&fit=crop',
    },
    {
      title: 'AI Universal',
      subtitle: 'Phổ cập đại chúng',
      desc: 'Đột phá bình dân hóa tri thức AI cho toàn bộ công dân, tổ chức và định dạng mọi lĩnh vực ngành nghề nhằm thúc đẩy quốc gia số hóa toàn diện, đồng đều từ thành phố đến nông thôn.',
      tagline: 'AI cho mọi công dân',
      illustration: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#F9FAFB] border-t border-gray-150 content-visibility-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Intro Section - AIUNI definition in bold semantic format */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block">
              Hệ Sinh Thái Đào Tạo & Nghiên Cứu AIUNI
            </span>
            
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight leading-snug">
              {dynamicTitle ? (
                <span>{dynamicTitle}</span>
              ) : (
                <>
                  Bản sắc dẫn đầu trong kỷ nguyên <br />
                  Trí tuệ nhân tạo <span className="bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">AIUNI</span>
                </>
              )}
            </h2>

            <p className="font-sans text-gray-750 leading-relaxed text-base">
              {dynamicText ? (
                <span>{dynamicText}</span>
              ) : (
                <>
                  <strong>AIUNI</strong> là học viện đào tạo, nghiên cứu và ứng dụng Trí tuệ nhân tạo (AI) tại Việt Nam, hướng tới xây dựng hệ sinh thái AI toàn diện cho giáo dục, doanh nghiệp và cộng đồng. Chúng tôi tự hào không chỉ dừng lại là một học viện đào tạo AI đơn thuần, mà còn đóng vai trò là một điểm tựa kết nối thực tiễn với chiều sâu chiến lược.
                </>
              )}
            </p>

            <div className="pt-2">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Các Trụ Cột Kết Nối Tổ Hợp AIUNI:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {connections.slice(0, 4).map((conn, idx) => {
                  const Icon = conn.icon;
                  return (
                    <div key={idx} className="flex space-x-3 items-start p-3 bg-white border border-gray-100 rounded-xl shadow-xs">
                      <div className={`p-2 rounded-lg shrink-0 border ${conn.color}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-gray-900 font-display">{conn.title}</h4>
                        <p className="text-[11px] text-gray-500 font-sans leading-normal">{conn.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {/* Highlight Ecosystem connections */}
              <div className="mt-4 flex space-x-3 items-center p-3.5 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/10 rounded-xl shadow-xs">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-lg shrink-0">
                  <Lightbulb className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-900 font-display">{connections[4].title}</h4>
                  <p className="text-[11px] text-gray-650 font-sans leading-relaxed">{connections[4].desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual block with Stats badge */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-gray-150">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                alt="Sinh viên AIUNI năng động nghiên cứu"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122254]/65 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6 text-white font-sans">
                <p className="text-[10px] uppercase font-bold tracking-widest text-blue-200">Cam kết thực học</p>
                <p className="text-lg font-black leading-tight mt-0.5">Liên kết chặt chẽ học thuật - doanh nghiệp quốc tế.</p>
              </div>
            </div>

            {/* Micro Rating Indicator */}
            <div className="absolute -top-5 -right-5 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 flex items-center space-x-3 max-w-[210px]">
              <div className="p-2.5 bg-amber-50 rounded-lg text-amber-500 shrink-0">
                <Star className="h-5 w-5 fill-amber-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[9px] uppercase font-bold tracking-wider text-gray-400">Đối tác toàn cầu</p>
                <p className="text-xs font-black text-gray-900 truncate">Google & Microsoft Partners</p>
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="absolute -bottom-5 -left-5 bg-gray-900 text-white p-4 rounded-2xl shadow-xl border border-white/10 flex items-center space-x-3 max-w-[200px]">
              <div className="p-2 bg-blue-600 rounded-lg text-white">
                <CheckCircle2 className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold tracking-wider text-blue-300">Năng lực chuyển đổi</p>
                <p className="text-xs font-bold text-gray-100 leading-snug">Cam kết gia tăng hiệu năng 300%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision - Mission - Core Values tabs */}
        <div className="bg-white rounded-3xl border border-gray-200/80 shadow-md p-6 md:p-10 mb-20">
          
          <div className="flex border-b border-gray-100 pb-4 mb-8 justify-center space-x-6 md:space-x-10 text-sm md:text-base scrollbar-none overflow-x-auto">
            <button
              onClick={() => setActiveTab('mission')}
              className={`pb-3 font-display font-bold transition-all relative flex items-center space-x-2 cursor-pointer ${
                activeTab === 'mission' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <Flag className="h-4.5 w-4.5" />
              <span>Sứ Mệnh AIUNI</span>
              {activeTab === 'mission' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-blue-600 rounded-full" />
              )}
            </button>
            
            <button
              onClick={() => setActiveTab('vision')}
              className={`pb-3 font-display font-bold transition-all relative flex items-center space-x-2 cursor-pointer ${
                activeTab === 'vision' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <Eye className="h-4.5 w-4.5" />
              <span>Tầm Nhìn 2026 - 2030</span>
              {activeTab === 'vision' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-blue-600 rounded-full" />
              )}
            </button>

            <button
              onClick={() => setActiveTab('values')}
              className={`pb-3 font-display font-bold transition-all relative flex items-center space-x-2 cursor-pointer ${
                activeTab === 'values' ? 'text-blue-600' : 'text-gray-400 hover:text-gray-700'
              }`}
            >
              <Gem className="h-4.5 w-4.5" />
              <span>Giá Trị Cốt Lõi</span>
              {activeTab === 'values' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.75 bg-blue-600 rounded-full" />
              )}
            </button>
          </div>

          {/* Tab contents with smooth height trigger */}
          <div className="min-h-[220px]">
            {activeTab === 'mission' && (
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-2 space-y-4">
                  <h3 className="font-display text-2xl font-extrabold text-blue-900">
                    Sứ Mệnh Lịch Sử
                  </h3>
                  <p className="font-sans text-gray-500 text-sm leading-relaxed">
                    Đóng vai trò xúc tác cách mạng năng lực số, thúc đẩy khát vọng tự chủ công nghệ quốc gia của thế hệ trẻ Việt Nam.
                  </p>
                </div>
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    'Phổ cập AI cho mọi tầng lớp xã hội',
                    'Nâng cao năng lực số cho người Việt',
                    'Đào tạo nguồn nhân lực AI thực chiến',
                    'Kết nối chuyên gia quốc tế với Việt Nam',
                    'Thúc đẩy chuyển đổi số quốc gia',
                    'Hỗ trợ doanh nghiệp và cơ quan nhà nước ứng dụng AI hiệu quả'
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <div className="p-1 bg-blue-500 rounded-full text-white shrink-0">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </div>
                      <span className="text-gray-750 font-sans font-semibold text-xs leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'vision' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fade-in">
                <div className="lg:col-span-5 space-y-4">
                  <h3 className="font-display text-2xl font-extrabold text-purple-900 flex items-center space-x-2">
                    <Eye className="h-6 w-6 text-purple-600" />
                    <span>Tầm Nhìn Trọng Điểm</span>
                  </h3>
                  <p className="font-sans text-gray-700 font-semibold text-sm leading-relaxed">
                    &quot;Trở thành học viện AI hàng đầu Đông Nam Á, là trung tâm đào tạo, nghiên cứu, chuyển giao công nghệ và ươm tạo nhân lực AI chất lượng cao, góp phần đưa Việt Nam trở thành quốc gia tiên phong trong ứng dụng trí tuệ nhân tạo.&quot;
                  </p>
                </div>
                <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-gray-150 relative h-48 sm:h-56">
                  <img 
                    src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop" 
                    alt="Toàn cảnh trung tâm công nghệ Đông Nam Á" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-950/70 via-indigo-900/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white font-sans">
                    <p className="text-[10px] font-bold tracking-widest uppercase">Vietnam Go Global</p>
                    <p className="text-sm font-extrabold leading-normal mt-1">Góp phần đưa công nghệ Việt tỏa sáng toàn cầu.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center max-w-xl mx-auto mb-4">
                  <h3 className="font-display text-2xl font-extrabold text-[#1E3A8A]">Cam Kết Vàng Từ Giá Trị Thật</h3>
                  <p className="font-sans text-gray-400 text-xs mt-1">Mỗi cán bộ, học viên và chuyên gia tại AIUNI đều gìn giữ 5 giá trị then chốt:</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {coreValues.map((val, idx) => {
                    const Icon = val.icon;
                    return (
                      <div key={idx} className="bg-[#F9FAFB] p-5 rounded-2xl border border-gray-150 flex flex-col items-center text-center space-y-3 hover:bg-white hover:border-blue-100 hover:shadow-md transition-all">
                        <div className="p-3 bg-white text-blue-600 border border-gray-100 rounded-xl shadow-xs">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h4 className="font-display font-black text-sm text-gray-900 leading-tight">{val.title}</h4>
                        <p className="font-sans text-[11px] text-gray-500 leading-relaxed">{val.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* 03 STRATEGIC PILLARS (03 ĐỊNH HƯỚNG CHIẾN LƯỢC) */}
        <div id="strategic-pillars" className="space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full">
              Đột Phá Bản Thân & Tổ Chức
            </span>
            <h2 className="font-display text-3xl font-extrabold text-gray-950">
              03 Định Hướng Chiến Lược Toàn Diện
            </h2>
            <p className="font-sans text-gray-500 text-sm">
              Kiến trúc hệ sinh thái kết hợp chặt chẽ đảm bảo sự đồng bộ từ tri thức hàn lâm sâu sắc đến khả năng phổ cập rộng lớn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {strategicPillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-3xl border border-gray-150 hover:border-blue-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col grow h-full"
              >
                {/* Banner wrapper */}
                <div className="relative h-44 bg-gradient-to-br from-[#122254] to-indigo-950 overflow-hidden shrink-0">
                  <img 
                    src={pillar.illustration} 
                    alt={pillar.title} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm shadow border border-gray-100 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider text-[#1E3A8A]">
                    {pillar.tagline}
                  </span>
                  
                  <div className="absolute bottom-4 left-4 text-white font-display">
                    <p className="text-[10px] tracking-wider text-blue-200 font-semibold uppercase">{pillar.subtitle}</p>
                    <p className="text-xl font-black">{pillar.title}</p>
                  </div>
                </div>

                {/* Content Payload */}
                <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                  <p className="text-xs text-gray-650 font-sans leading-relaxed flex-grow">
                    {pillar.desc}
                  </p>
                  
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between text-[11px] font-bold">
                    <span className="text-[#1E3A8A] uppercase tracking-wider">Trụ cột định hướng {idx + 1}</span>
                    <span className="p-1 px-2.5 bg-blue-50 text-blue-600 rounded-lg">AIUNI CORE</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
