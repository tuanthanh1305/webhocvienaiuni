import { useState, useEffect } from 'react';
import * as Lucide from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { ElitePartner, InternationalCollab, DevelopmentVector, MarqueeLogo } from '../types';
import { 
  defaultElitePartners,
  defaultInternationalCollabs,
  defaultDevelopmentVectors,
  defaultMarqueeLogos
} from '../data';

// Helper to dynamic resolve Lucide icons
function resolveIcon(iconName: string) {
  const IconComp = (Lucide as any)[iconName];
  if (IconComp) return IconComp;
  
  // Good default fallbacks based on keyword matches
  if (iconName.toLowerCase().includes('network')) return Lucide.Network;
  if (iconName.toLowerCase().includes('landmark')) return Lucide.Landmark;
  if (iconName.toLowerCase().includes('globe')) return Lucide.Globe;
  if (iconName.toLowerCase().includes('building')) return Lucide.Building;
  if (iconName.toLowerCase().includes('award')) return Lucide.Award;
  if (iconName.toLowerCase().includes('compass')) return Lucide.Compass;
  if (iconName.toLowerCase().includes('target')) return Lucide.Target;
  if (iconName.toLowerCase().includes('sparkle')) return Lucide.Sparkles;
  
  return Lucide.Building;
}

export default function PartnersCollaborations() {
  const [elitePartners, setElitePartners] = useState<ElitePartner[]>(() => {
    const local = localStorage.getItem('local_elite_partners');
    return local ? JSON.parse(local) : defaultElitePartners;
  });

  const [internationalCollabs, setInternationalCollabs] = useState<InternationalCollab[]>(() => {
    const local = localStorage.getItem('local_international_collabs');
    return local ? JSON.parse(local) : defaultInternationalCollabs;
  });

  const [developmentVectors, setDevelopmentVectors] = useState<DevelopmentVector[]>(() => {
    const local = localStorage.getItem('local_development_vectors');
    return local ? JSON.parse(local) : defaultDevelopmentVectors;
  });

  const [marqueeLogos, setMarqueeLogos] = useState<MarqueeLogo[]>(() => {
    const local = localStorage.getItem('local_marquee_logos');
    return local ? JSON.parse(local) : defaultMarqueeLogos;
  });

  // Dynamic snapshot fetching from Firestore
  useEffect(() => {
    const unsubEP = onSnapshot(collection(db, 'elite_partners'), (snap) => {
      const items: ElitePartner[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ElitePartner);
      });
      if (items.length > 0) {
        setElitePartners(items);
        localStorage.setItem('local_elite_partners', JSON.stringify(items));
      } else {
        setElitePartners(defaultElitePartners);
        localStorage.setItem('local_elite_partners', JSON.stringify(defaultElitePartners));
      }
    }, (err) => {
      console.warn("Could not load live elite partners snapshot, falling back...", err);
      const local = localStorage.getItem('local_elite_partners');
      if (local) setElitePartners(JSON.parse(local));
    });

    const unsubIC = onSnapshot(collection(db, 'international_collabs'), (snap) => {
      const items: InternationalCollab[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as InternationalCollab);
      });
      if (items.length > 0) {
        setInternationalCollabs(items);
        localStorage.setItem('local_international_collabs', JSON.stringify(items));
      } else {
        setInternationalCollabs(defaultInternationalCollabs);
        localStorage.setItem('local_international_collabs', JSON.stringify(defaultInternationalCollabs));
      }
    }, (err) => {
      console.warn("Could not load live international collabs snapshot, falling back...", err);
      const local = localStorage.getItem('local_international_collabs');
      if (local) setInternationalCollabs(JSON.parse(local));
    });

    const unsubDV = onSnapshot(collection(db, 'development_vectors'), (snap) => {
      const items: DevelopmentVector[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as DevelopmentVector);
      });
      if (items.length > 0) {
        setDevelopmentVectors(items);
        localStorage.setItem('local_development_vectors', JSON.stringify(items));
      } else {
        setDevelopmentVectors(defaultDevelopmentVectors);
        localStorage.setItem('local_development_vectors', JSON.stringify(defaultDevelopmentVectors));
      }
    }, (err) => {
      console.warn("Could not load live development vectors snapshot, falling back...", err);
      const local = localStorage.getItem('local_development_vectors');
      if (local) setDevelopmentVectors(JSON.parse(local));
    });

    const unsubML = onSnapshot(collection(db, 'marquee_logos'), (snap) => {
      const items: MarqueeLogo[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MarqueeLogo);
      });
      if (items.length > 0) {
        setMarqueeLogos(items);
        localStorage.setItem('local_marquee_logos', JSON.stringify(items));
      } else {
        setMarqueeLogos(defaultMarqueeLogos);
        localStorage.setItem('local_marquee_logos', JSON.stringify(defaultMarqueeLogos));
      }
    }, (err) => {
      console.warn("Could not load live marquee logos snapshot, falling back...", err);
      const local = localStorage.getItem('local_marquee_logos');
      if (local) setMarqueeLogos(JSON.parse(local));
    });

    return () => {
      unsubEP();
      unsubIC();
      unsubDV();
      unsubML();
    };
  }, []);

  return (
    <div className="py-16 bg-white shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Section 1: Partners & Clients */}
        <div id="elite-partners-section" className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block">
              Chuỗi Giá Trị Đồng Hành
            </span>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
              Đối Tác - Khách Hàng Tiêu Biểu
            </h2>
            <p className="font-sans text-gray-500 text-sm leading-relaxed">
              Trải qua chặng đường cống hiến, AIUNI tự hào nhận được sự tin tưởng và đồng hành chiến lược từ các Cơ quan Nhà nước, Đại học và Tập đoàn lớn.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {elitePartners.map((partner) => {
              const IconComp = resolveIcon(partner.iconName);
              return (
                <div
                  key={partner.id}
                  className="bg-[#F9FAFB] rounded-2xl border border-gray-150 p-6 flex flex-col items-center justify-center text-center space-y-3 hover:bg-white hover:border-blue-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-3 bg-white text-blue-600 border border-gray-100 rounded-xl shadow-xs shrink-0">
                    <IconComp className="h-6 w-6" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-display font-black text-sm text-gray-900">
                      {partner.name}
                    </h3>
                    <p className="font-sans text-[10px] text-gray-400 leading-snug">
                      {partner.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Continuous Running Horizontal Logo Marquee */}
          {marqueeLogos.length > 0 && (
            <div className="space-y-3 pt-6">
              <h3 className="text-center font-display text-[10px] font-black text-gray-400 uppercase tracking-widest">
                Đơn vị học viên đồng hành tiêu biểu (Slide chạy ngang liên tục)
              </h3>
              <div className="w-full overflow-hidden py-5 bg-[#F8FAFC]/60 border-t border-b border-gray-150/80 relative rounded-2xl">
                {/* Fade overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                
                <div className="animate-marquee space-x-8 flex items-center pr-8">
                  {/* Tripled entries to ensure rich seamless scroll without spacing gap */}
                  {[...marqueeLogos, ...marqueeLogos, ...marqueeLogos].map((logo, index) => (
                    <div 
                      key={`${logo.id}-${index}`} 
                      className="flex items-center space-x-3 shrink-0 py-2.5 px-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 transition-all duration-300"
                    >
                      <img 
                        src={logo.logoUrl} 
                        alt={logo.name} 
                        referrerPolicy="no-referrer"
                        className="h-8 w-8 object-cover rounded-lg border border-gray-100 shrink-0" 
                        loading="lazy"
                      />
                      <span className="font-display font-bold text-xs tracking-tight text-gray-750">{logo.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Section 2: Hợp Tác Quốc Tế */}
        <div id="international-collaborations-section" className="pt-10 border-t border-gray-150 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full inline-block">
              Học Thuật Mở Rộng
            </span>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
              Liên Minh Hợp Tác Quốc Tế
            </h2>
            <p className="font-sans text-gray-500 text-sm leading-relaxed">
              Các ký kết hợp tác quốc tế nòng cốt thiết lập vị trí dẫn đầu của AIUNI trong việc chuyển giao công nghệ giáo dục số.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {internationalCollabs.map((col) => (
              <div
                key={col.id}
                className={`bg-gradient-to-br ${col.lightBg || 'from-blue-50/50 to-indigo-50/10'} border border-gray-150 rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl transition-all duration-300`}
              >
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${col.badgeColor || 'bg-blue-100 text-blue-800'}`}>
                      {col.partner}
                    </span>
                    <h3 className="font-display font-extrabold text-base text-gray-900 leading-snug pt-2">
                      {col.title}
                    </h3>
                    <p className="font-sans text-[11px] text-gray-550 leading-relaxed font-semibold">
                      {col.desc}
                    </p>
                  </div>

                  {/* Bullet listings */}
                  <div className="space-y-2 pt-2 border-t border-gray-100">
                    {(col.bulletins || []).map((bullet, i) => (
                      <div key={i} className="flex items-start space-x-2">
                        <Lucide.CheckCircle className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span className="font-sans text-[11px] text-gray-650 leading-snug">
                          {bullet}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-100 text-[10px] uppercase font-black text-gray-400 font-sans tracking-wide">
                  Chương trình chuẩn toàn cầu
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Định Hướng Phát Triển */}
        <div id="development-vectors-section" className="pt-10 border-t border-gray-150 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full">
                Tầm Nhìn 2026 - 2030
              </span>
              <h2 className="font-display text-2xl font-extrabold text-gray-900">
                Định Hướng Phát Triển Chiến Lược
              </h2>
            </div>
            <p className="font-sans text-gray-500 text-xs sm:text-sm max-w-sm leading-relaxed">
              Lộ trình nhất quán đưa học viện thành biểu tượng chuyển giao công nghệ số hàng đầu trong khu vực Đông Nam Á.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {developmentVectors.map((vec) => {
              const IconComp = resolveIcon(vec.iconName);
              return (
                <div
                  key={vec.id}
                  className="bg-gray-50 p-6 rounded-2xl border border-gray-150 flex items-start space-x-4 hover:bg-white hover:border-blue-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0 border border-blue-105">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className="font-display font-extrabold text-xs text-gray-950">
                      {vec.title}
                    </h3>
                    <p className="font-sans text-[11px] text-gray-500 leading-relaxed">
                      {vec.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
