import React, { useState, useEffect } from 'react';
import { Video, ExternalLink, Newspaper, Tv, Award, ArrowUpRight, Flame, BookOpen, Star, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { MediaVideo, HighlightedPress, PressNews } from '../types';
import { defaultVideos, defaultHighlightedPress, defaultPressNews } from '../data';

export default function MediaMentions() {
  const [activeTab, setActiveTab] = useState<'all' | 'video' | 'press'>('all');
  const [videos, setVideos] = useState<MediaVideo[]>(defaultVideos);
  const [highlightedPress, setHighlightedPress] = useState<HighlightedPress[]>(defaultHighlightedPress);
  const [pressNews, setPressNews] = useState<PressNews[]>(defaultPressNews);

  const [syncing, setSyncing] = useState(false);
  const [syncSuccess, setSyncSuccess] = useState(false);

  useEffect(() => {
    // 1. Local Storage immediate cache loads
    const cachedVids = localStorage.getItem('local_media_videos');
    const cachedHigh = localStorage.getItem('local_media_high');
    const cachedNews = localStorage.getItem('local_media_news');
    if (cachedVids) {
      try { setVideos(JSON.parse(cachedVids)); } catch (e) { console.warn(e); }
    }
    if (cachedHigh) {
      try { setHighlightedPress(JSON.parse(cachedHigh)); } catch (e) { console.warn(e); }
    }
    if (cachedNews) {
      try { setPressNews(JSON.parse(cachedNews)); } catch (e) { console.warn(e); }
    }

    // 2. Realtime Firesubscriptions
    const unsubVids = onSnapshot(query(collection(db, 'media_videos')), (snapshot) => {
      const items: MediaVideo[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MediaVideo);
      });
      if (items.length > 0) {
        setVideos(items);
        localStorage.setItem('local_media_videos', JSON.stringify(items));
      } else {
        setVideos(defaultVideos);
        localStorage.setItem('local_media_videos', JSON.stringify(defaultVideos));
      }
    }, (error) => {
      console.warn("Could not load dynamic videos, offline mode:", error);
    });

    const unsubHigh = onSnapshot(query(collection(db, 'media_highlighted')), (snapshot) => {
      const items: HighlightedPress[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as HighlightedPress);
      });
      if (items.length > 0) {
        setHighlightedPress(items);
        localStorage.setItem('local_media_high', JSON.stringify(items));
      } else {
        setHighlightedPress(defaultHighlightedPress);
        localStorage.setItem('local_media_high', JSON.stringify(defaultHighlightedPress));
      }
    }, (error) => {
      console.warn("Could not load dynamic highlighted press, offline mode:", error);
    });

    const unsubNews = onSnapshot(query(collection(db, 'media_news')), (snapshot) => {
      const items: PressNews[] = [];
      snapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as PressNews);
      });
      if (items.length > 0) {
        setPressNews(items);
        localStorage.setItem('local_media_news', JSON.stringify(items));
      } else {
        setPressNews(defaultPressNews);
        localStorage.setItem('local_media_news', JSON.stringify(defaultPressNews));
      }
    }, (error) => {
      console.warn("Could not load dynamic press news, offline mode:", error);
    });

    return () => {
      unsubVids();
      unsubHigh();
      unsubNews();
    };
  }, []);

  const handleManualSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 700);
  };

  return (
    <section id="media" className="py-20 bg-[#F8FAFC] overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-50 border border-blue-100 rounded-full text-blue-600">
            <Tv className="h-3.5 w-3.5" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest font-sans">Giá Trị Bảo Chứng Chính Thống</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <h2 className="font-display text-3xl sm:text-4xl font-black text-gray-950 tracking-tight leading-tight">
              Truyền Thông Nói Gì Về Chúng Tôi
            </h2>
            <button 
              onClick={handleManualSync}
              disabled={syncing}
              title="Đồng bộ trực tiếp dữ liệu báo chí từ máy chủ AIUNI"
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-slate-100 rounded-full transition-all shrink-0 cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin text-blue-600' : ''}`} />
            </button>
          </div>

          {syncSuccess && (
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full inline-block animate-pulse">
              ✓ Đã kết nối & Đồng bộ hóa dữ liệu báo chí thời gian thực
            </span>
          )}

          <p className="font-sans text-gray-650 text-sm sm:text-base leading-relaxed">
            Học viện Công nghệ AIUNI tự hào là đơn vị nhận được sự đưa tin, vinh danh rộng khắp từ các đài truyền hình quốc gia uy tín nhất và các cổng thông tin bộ ban ngành chính phủ.
          </p>

          {/* Quick Filter tabs */}
          <div className="flex items-center justify-center pt-4">
            <div className="inline-flex bg-gray-200/60 p-1 rounded-xl border border-gray-250/70">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === 'all' 
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-550 hover:text-gray-800'
                }`}
              >
                Tất cả tin bài
              </button>
              <button
                onClick={() => setActiveTab('video')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === 'video' 
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-550 hover:text-gray-800'
                }`}
              >
                Phóng sự Video
              </button>
              <button
                onClick={() => setActiveTab('press')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeTab === 'press' 
                    ? 'bg-white text-blue-600 shadow'
                    : 'text-gray-550 hover:text-gray-800'
                }`}
              >
                Báo chí đưa tin
              </button>
            </div>
          </div>
        </div>

        {/* 1. REPORTAGE VIDEOS GRID */}
        {(activeTab === 'all' || activeTab === 'video') && (
          <div className="space-y-8">
            <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
              <Video className="h-5 w-5 text-red-550" />
              <h3 className="font-display font-extrabold text-base text-gray-900">Phóng sự & Vinh danh Truyền hình</h3>
              <span className="bg-red-50 text-red-650 text-[9px] px-1.5 py-0.5 rounded font-black uppercase">Live Broadcast</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {videos.map((vid) => (
                <div 
                  key={vid.id}
                  className="bg-white rounded-3xl border border-gray-150/80 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full group"
                >
                  {/* Iframe section with proper layout container ratio */}
                  <div className="relative aspect-video w-full bg-slate-950 shrink-0 border-b border-gray-100 overflow-hidden">
                    <iframe 
                      src={vid.embedUrl} 
                      title={vid.title}
                      className="absolute inset-0 w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      allowFullScreen
                    />
                  </div>

                  {/* Text Details metadata */}
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="p-1 px-2.5 bg-red-50 text-red-600 rounded text-[9px] font-sans font-black tracking-widest uppercase border border-red-200/50">
                          {vid.channelBadge}
                        </span>
                        <span className="text-[10px] text-gray-400 font-bold font-sans flex items-center space-x-1">
                          <Tv className="h-3 w-3" />
                          <span>{vid.channel}</span>
                        </span>
                      </div>

                      <h4 className="font-display font-black text-sm sm:text-base text-gray-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {vid.title}
                      </h4>

                      <p className="font-sans text-gray-600 text-[12px] sm:text-xs leading-relaxed line-clamp-3">
                        {vid.desc}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
                      {vid.tags.map((tg, i) => (
                        <span key={i} className="text-[9px] text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full font-medium">
                          #{tg}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. HIGHLIGHTED TIÊU BIỂU PRESS (BỘ KHCN, QUỐC HỘI, TW ĐẢNG) */}
        {(activeTab === 'all' || activeTab === 'press') && (
          <div className="space-y-10 pt-6">
            
            {/* Focal Highlight Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-gray-200 pb-3">
                <Award className="h-5 w-5 text-blue-600" />
                <h3 className="font-display font-extrabold text-base text-gray-900">Các liên kết Báo chí chính thống bảo chứng</h3>
                <span className="bg-amber-55 bg-opacity-20 border border-amber-500/20 text-amber-700 text-[9px] px-2 py-0.5 rounded font-black uppercase flex items-center space-x-1">
                  <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
                  <span>Cực kỳ quan trọng</span>
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {highlightedPress.map((press, i) => (
                  <div 
                    key={i}
                    className={`border p-6 rounded-3xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between space-y-4 bg-white ${press.accent}`}
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[9px] font-black uppercase tracking-wider bg-white/80 border border-current px-2 py-0.5 rounded-full">
                          {press.publisher}
                        </span>
                        <Flame className="h-4 w-4 text-amber-500 animate-pulse shrink-0" />
                      </div>
                      
                      <h4 className="font-display font-black text-xs sm:text-sm text-gray-950 leading-snug line-clamp-2">
                        {press.title}
                      </h4>
                      <p className="font-sans text-[11px] leading-relaxed text-gray-650">
                        {press.desc}
                      </p>
                    </div>

                    <a 
                      href={press.url}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-xs font-black uppercase text-[#1E3A8A] hover:text-blue-600 transition-colors self-start mt-2 group/btn"
                    >
                      <span>Xem Bài Báo Khảo Thí</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Other press list spreadsheet cards */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-gray-150 pb-2">
                <Newspaper className="h-4.5 w-4.5 text-gray-500 animate-pulse" />
                <h3 className="font-display font-bold text-xs sm:text-sm uppercase tracking-wider text-gray-500">Danh sách ấn phẩm truyền thông bổ sung ({pressNews.length})</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pressNews.map((news, idx) => (
                  <div 
                    key={idx}
                    className="bg-white p-5 rounded-2xl border border-gray-150 shadow-xs hover:shadow-md hover:border-blue-105 transition-all duration-350 flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-1.5 text-left">
                      <div className="flex justify-between items-center text-[10px] font-bold text-blue-500 uppercase font-sans">
                        <span>{news.publisher}</span>
                        <BookOpen className="h-3 w-3 text-slate-300 group-hover:text-blue-400 transition-colors" />
                      </div>
                      <h4 className="font-display font-extrabold text-[12px] sm:text-xs text-gray-900 group-hover:text-blue-600 leading-snug transition-colors line-clamp-2">
                        {news.title}
                      </h4>
                      <p className="font-sans text-[11px] text-gray-500 leading-normal line-clamp-2">
                        {news.description}
                      </p>
                    </div>

                    <a 
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 text-[10px] font-bold uppercase text-gray-500 group-hover:text-[#3B82F6] transition-colors self-start pb-0.5 border-b border-transparent group-hover:border-[#3B82F6]/30"
                    >
                      <span>Đọc bài viết gốc</span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
