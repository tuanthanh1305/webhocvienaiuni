import React, { useState, useEffect } from 'react';
import { Search, Sparkles, BookOpen, Calendar, ArrowRight, BookMarked, HelpCircle, PhoneCall, Check, CheckCircle2, Download, Eye, Globe, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import HomeBanners from './components/HomeBanners';
import IntroVideo from './components/IntroVideo';
import Features from './components/Features';
import About from './components/About';
import CourseCard from './components/CourseCard';
import Testimonials from './components/Testimonials';
import CTA from './components/CTA';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// Modals
import CourseDetailsModal from './components/CourseDetailsModal';
import EnrollmentModal from './components/EnrollmentModal';
import BlogDetailsModal from './components/BlogDetailsModal';
import AICourseAdvisor from './components/AICourseAdvisor';

// Modular Sections
import Advisors from './components/Advisors';
import TrainingFields from './components/TrainingFields';
import ProductEcosystem from './components/ProductEcosystem';
import PartnersCollaborations from './components/PartnersCollaborations';
import ActivityEvents from './components/ActivityEvents';
import MediaMentions from './components/MediaMentions';
import PortfolioSection from './components/PortfolioSection';

// Data
import { courses as defaultCourses, blogPosts as defaultBlogPosts, defaultReports } from './data';
import { Course, BlogPost, Report } from './types';

// Admin & Firebase
import { collection, doc, onSnapshot, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { db, auth, googleProvider } from './firebase';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  // Authentication & Admin listener
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (!user) {
        setIsAdmin(false);
        setAuthLoading(false);
        return;
      }

      // Check strictly for master admin first
      if (user.email === 'tuanthanhtt1305@gmail.com') {
        setIsAdmin(true);
        setAuthLoading(false);
        return;
      }

      // Check Firestore Whitelisted admins
      try {
        const emailLower = user.email ? user.email.toLowerCase() : '';
        const docRef = doc(db, 'admins', emailLower);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (err) {
        setIsAdmin(false);
      } finally {
        setAuthLoading(false);
      }
    });

    return () => unsubAuth();
  }, []);

  // Secure admin routing
  useEffect(() => {
    if (activeSection === 'admin' && !isAdmin && !authLoading) {
      setActiveSection('home');
    }
  }, [activeSection, isAdmin, authLoading]);

  const [coursesList, setCoursesList] = useState<Course[]>(defaultCourses);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [courseToEnroll, setCourseToEnroll] = useState<Course | null>(null);
  const [showAdvisor, setShowAdvisor] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

  // Catalog Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basics' | 'ml' | 'advanced' | 'enterprise'>('all');

  // Blog states
  const [selectedBlogCat, setSelectedBlogCat] = useState('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Dynamic Content Customizer states
  const [heroTitle, setHeroTitle] = useState('Nền tảng đào tạo AI hàng đầu Việt Nam');
  const [heroSubtitle, setHeroSubtitle] = useState('Học tập các khóa học Trí tuệ Nhân tạo từ Đơn giản đến Nâng cao, từ Prompt cơ bản đến huấn luyện mô hình sâu hiệu năng lớn.');
  const [aboutTitle, setAboutTitle] = useState('Bản sắc dẫn đầu trong kỷ nguyên Trí tuệ nhân tạo AIUNI');
  const [aboutText, setAboutText] = useState('AIUNI là học viện đào tạo, nghiên cứu và ứng dụng Trí tuệ nhân tạo (AI) tại Việt Nam, hướng tới xây dựng hệ sinh thái AI toàn diện cho giáo dục, doanh nghiệp và cộng đồng.');
  const [sectionsOrder, setSectionsOrder] = useState<string[]>([
    'features',
    'about',
    'advisors',
    'partners',
    'media',
    'testimonials'
  ]);

  // Blogs and Reports Collections
  const [blogs, setBlogs] = useState<BlogPost[]>(defaultBlogPosts);
  const [reports, setReports] = useState<Report[]>([]);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  // Interactive local enrollment tracking
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [justEnrolledTicket, setJustEnrolledTicket] = useState<string | null>(null);

  // Helper functions for seeding
  const seedDefaultData = async (colName: string, defaultArray: any[]) => {
    try {
      for (const item of defaultArray) {
        await setDoc(doc(db, colName, item.id), item);
      }
    } catch (e) {
      console.log(`Seed layout offline bypass active for: ${colName}`);
    }
  };

  const seedDocument = async (colName: string, docId: string, payload: any) => {
    try {
      await setDoc(doc(db, colName, docId), payload);
    } catch (e) {}
  };

  // 1. Sync data real-time with Firestore & Local Offline Storage Simulation
  useEffect(() => {
    const unsubBlogs = onSnapshot(collection(db, 'blogs'), (snap) => {
      if (!snap.empty) {
        const posts: BlogPost[] = [];
        snap.forEach((doc) => {
          posts.push({ id: doc.id, ...doc.data() } as BlogPost);
        });
        setBlogs(posts);
      } else {
        setBlogs(defaultBlogPosts);
        seedDefaultData('blogs', defaultBlogPosts);
      }
    });

    const unsubReports = onSnapshot(collection(db, 'reports'), (snap) => {
      if (!snap.empty) {
        const reps: Report[] = [];
        snap.forEach((doc) => {
          reps.push({ id: doc.id, ...doc.data() } as Report);
        });
        setReports(reps);
      } else {
        setReports(defaultReports);
        seedDefaultData('reports', defaultReports);
      }
    });

    const unsubCourses = onSnapshot(collection(db, 'courses'), (snap) => {
      if (!snap.empty) {
        const list: Course[] = [];
        snap.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Course);
        });
        setCoursesList(list);
      } else {
        setCoursesList(defaultCourses);
        seedDefaultData('courses', defaultCourses);
      }
    });

    const loadMainContent = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'content', 'main'));
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.heroTitle) setHeroTitle(data.heroTitle);
          if (data.heroSubtitle) setHeroSubtitle(data.heroSubtitle);
          if (data.aboutTitle) setAboutTitle(data.aboutTitle);
          if (data.aboutText) setAboutText(data.aboutText);
          if (data.sectionOrder) {
            setSectionsOrder(data.sectionOrder.split(','));
          }
        } else {
          const defaultLayoutDoc = {
            id: 'main',
            heroTitle: 'Nền tảng đào tạo AI hàng đầu Việt Nam',
            heroSubtitle: 'Học tập các khóa học Trí tuệ Nhân tạo từ Đơn giản đến Nâng cao, từ Prompt cơ bản đến huấn luyện mô hình sâu hiệu năng lớn.',
            aboutTitle: 'Bản sắc dẫn đầu trong kỷ nguyên Trí tuệ nhân tạo AIUNI',
            aboutText: 'AIUNI là học viện đào tạo, nghiên cứu và ứng dụng Trí tuệ nhân tạo (AI) tại Việt Nam, hướng tới xây dựng hệ sinh thái AI toàn diện cho giáo dục, doanh nghiệp và cộng đồng.',
            sectionOrder: 'features,about,advisors,partners,testimonials',
            updatedAt: new Date().toISOString()
          };
          seedDocument('content', 'main', defaultLayoutDoc);
        }
      } catch (e) {
        console.warn("Using offline layout configuration fallback");
      }
    };
    loadMainContent();

    return () => {
      unsubBlogs();
      unsubReports();
      unsubCourses();
    };
  }, []);

  // 2. Local Fallback Listener for Simluator mode
  useEffect(() => {
    const localLayout = localStorage.getItem('local_layout_main');
    if (localLayout) {
      try {
        const data = JSON.parse(localLayout);
        if (data.heroTitle) setHeroTitle(data.heroTitle);
        if (data.heroSubtitle) setHeroSubtitle(data.heroSubtitle);
        if (data.aboutTitle) setAboutTitle(data.aboutTitle);
        if (data.aboutText) setAboutText(data.aboutText);
        if (data.sectionOrder) {
          setSectionsOrder(data.sectionOrder.split(','));
        }
      } catch (e) {}
    }

    const localBlogs = localStorage.getItem('local_blogs');
    if (localBlogs) {
      try {
        const customBlogs = JSON.parse(localBlogs);
        setBlogs(prev => [...customBlogs, ...prev.filter(b => !customBlogs.some((cb: any) => cb.id === b.id))]);
      } catch (e) {}
    }

    const localReports = localStorage.getItem('local_reports');
    if (localReports) {
      try {
        const customReps = JSON.parse(localReports);
        setReports(prev => [...customReps, ...prev.filter(r => !customReps.some((cr: any) => cr.id === r.id))]);
      } catch (e) {}
    }

    const localCourses = localStorage.getItem('local_courses');
    if (localCourses) {
      try {
        const customCourses = JSON.parse(localCourses);
        setCoursesList(prev => [...customCourses, ...prev.filter(c => !customCourses.some((cc: any) => cc.id === c.id))]);
      } catch (e) {}
    }
  }, [activeSection]);

  // 3. Dynamic Title & Meta Description updating for SEO (Vietnamese targeted keywords)
  useEffect(() => {
    let title = "AIUNI | Học viện Đào tạo, Nghiên cứu & Ứng dụng AI Hàng đầu Việt Nam";
    let description = "AIUNI là học viện đào tạo, nghiên cứu và ứng dụng Trí tuệ nhân tạo (AI) tại Việt Nam, hướng tới xây dựng hệ sinh thái AI toàn diện cho giáo dục, doanh nghiệp, chuyển đổi số và phát triển cộng đồng.";
    let jsonLd: any = null;

    if (selectedCourse) {
      title = `${selectedCourse.title} - Khóa Học AI Thực Chiến | Học viện AIUNI`;
      description = `${selectedCourse.description || selectedCourse.longDescription || ""}. Giáo trình chi tiết khóa học ${selectedCourse.title} chất lượng cao chuẩn quốc tế dành cho cá nhân và tổ chức.`.substring(0, 320);
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": selectedCourse.title,
        "description": selectedCourse.description,
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Học viện AIUNI Academy",
          "sameAs": "https://aiuni.vn"
        },
        "educationalCredentialAwarded": "Chứng nhận tốt nghiệp Học trình Đào tạo AI thực chiến cấp bởi AIUNI Group",
        "offers": {
          "@type": "Offer",
          "price": selectedCourse.price,
          "priceCurrency": "VND",
          "category": selectedCourse.price === 0 ? "Free" : "Paid"
        }
      };
    } else if (selectedBlogPost) {
      title = `${selectedBlogPost.title} - Blog Tin Tức Trí Tuệ Nhân Tạo | AIUNI`;
      description = `${selectedBlogPost.excerpt || ""}. Đọc thêm bài viết chuyên sâu của ${selectedBlogPost.author} chia sẻ vào ngày ${selectedBlogPost.date}.`.substring(0, 320);
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": selectedBlogPost.title,
        "description": selectedBlogPost.excerpt,
        "image": selectedBlogPost.coverImage,
        "author": {
          "@type": "Organization",
          "name": `AIUNI Group - ${selectedBlogPost.author}`
        },
        "publisher": {
          "@type": "Organization",
          "name": "AIUNI Academy",
          "logo": {
            "@type": "ImageObject",
            "url": "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=256&auto=format&fit=crop"
          }
        },
        "datePublished": selectedBlogPost.date
      };
    } else {
      switch (activeSection) {
        case 'training':
          title = "Khóa Học & Học Trình Đào Tạo AI Thực Chiến Mới Nhất | Học viện AIUNI";
          description = "Tổng hợp các khóa học AI hàng đầu Việt Nam từ Prompt Engineering, Trợ lý ảo AI, Python cho AI đến Machine Learning & ứng dụng hệ thống chuyên sâu cho lập trình viên và doanh nghiệp.";
          break;
        case 'ecosystem':
          title = "Hệ Sinh Thái Giải Pháp & Ứng Dụng Công Nghệ AI Toàn Diện | AIUNI";
          description = "Giới thiệu bộ giải pháp thông minh của AIUNI phục vụ tự động hóa văn phòng, phân tích dữ liệu chuyên nghiệp và chuyển đổi mô hình giáo dục ứng dụng Trí tuệ Nhân tạo.";
          break;
        case 'news':
          title = "Sách Trắng, Báo Cáo Chuyên Sâu & Tin Thống Kê AI | AIUNI";
          description = "Đọc báo cáo xu hướng công nghệ, mẹo viết prompt hiệu quả cao, tài khoản VIP premium và kiến thức học tập trọn đời được cập nhật liên tục từ viện nghiên cứu AIUNI.";
          break;
        case 'admin':
          title = "Hệ Thống Quản Trị Trung Tâm Đào Tạo AIUNI Enterprise Database";
          description = "Trang quản trị vận hành bảo mật cấp cao hệ sinh thái giáo dục của AIUNI dành riêng cho kiểm duyệt giáo án, hồ sơ ghi danh học viên, xem thống kê tương tác thời gian thực.";
          break;
        default:
          break;
      }
    }

    document.title = title;

    // Direct metadata set
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', description);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = "description";
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }

    // Dynamic schema tag injector
    let scriptTag = document.getElementById('dynamic-jsonld-seo') as HTMLScriptElement;
    if (scriptTag) {
      scriptTag.remove();
    }

    if (jsonLd) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'dynamic-jsonld-seo';
      scriptTag.type = 'application/ld+json';
      scriptTag.innerText = JSON.stringify(jsonLd);
      document.head.appendChild(scriptTag);
    }

    // Set og:title / og:description / twitter:title / twitter:description dynamically
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', title);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', description);

    return () => {
      const scriptToRemove = document.getElementById('dynamic-jsonld-seo');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [activeSection, selectedCourse, selectedBlogPost]);

  const handleDownloadReport = async (rep: Report) => {
    try {
      const docRef = doc(db, 'reports', rep.id);
      await updateDoc(docRef, { downloadsCount: (rep.downloadsCount || 0) + 1 });
    } catch (e) {
      const updatedReps = reports.map(r => r.id === rep.id ? { ...r, downloadsCount: (r.downloadsCount || 0) + 1 } : r);
      setReports(updatedReps);
      localStorage.setItem('local_reports', JSON.stringify(updatedReps));
    }

    // Programmatically trigger beautiful TXT report download
    const element = document.createElement("a");
    const file = new Blob([
      `=== AIUNI TECHNICAL RESEARCH WHITE_PAPER ===\nTối ưu tri thức, Đột phá bản sắc Việt Nam\n\nTIÊU ĐỀ: ${rep.title}\n\n${rep.content}\n\n==========================================\nBản quyền thuộc học viện công nghệ AIUNI(C) 2026.`
    ], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${rep.slug}-aiuni-whitepaper.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    // If an external link exists, safely redirect in a new tab after starting download
    if (rep.externalLink && rep.externalLink.trim()) {
      setTimeout(() => {
        window.open(rep.externalLink, '_blank', 'noopener,noreferrer');
      }, 500);
    }
  };

  // Tab Navigation with instant smooth viewport reset
  const handleScrollNavigate = (targetId: string) => {
    if (targetId === 'hero' || targetId === 'about' || targetId === 'features' || targetId === 'testimonials') {
      setActiveSection('home');
    } else if (targetId === 'courses') {
      setActiveSection('training');
    } else if (targetId === 'blog') {
      setActiveSection('news');
    } else {
      setActiveSection(targetId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Triggers enrollment for a specific course
  const triggerEnroll = (course: Course) => {
    setCourseToEnroll(course);
    setShowEnrollModal(true);
  };

  // Triggers registration without preselected course (preselects default Course-1)
  const triggerDefaultEnroll = () => {
    if (coursesList.length > 0) {
      setCourseToEnroll(coursesList[0]);
    }
    setShowEnrollModal(true);
  };

  // Handle enrollment successful callback
  const handleEnrollSuccess = (data: any) => {
    setEnrollments((prev) => [data, ...prev]);
    setJustEnrolledTicket(data.id);
    
    // Auto purge success notification alert after 8 seconds
    setTimeout(() => {
      setJustEnrolledTicket(null);
    }, 8000);
  };

  // Filtering dynamic catalog values
  const filteredCourses = coursesList.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' ? true : course.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categoriesList = [
    { id: 'all', label: 'Tất cả khóa học' },
    { id: 'basics', label: 'AI Cơ Bản' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'advanced', label: 'Deep Learning (Sâu)' },
    { id: 'enterprise', label: 'AI Doanh Nghiệp' }
  ];

  return (
    <div id="aiuni-app" className="min-h-screen bg-[#F9FAFB] font-sans antialiased text-[#1F2937] selection:bg-blue-105 selection:text-blue-900">
      
      {/* Navigation Header */}
      <Header
        activeSection={activeSection}
        onNavigate={handleScrollNavigate}
        onOpenAdvisor={() => setShowAdvisor(true)}
        onOpenEnrollDefault={triggerDefaultEnroll}
        isAdmin={isAdmin}
        currentUser={currentUser}
        onLogin={() => signInWithPopup(auth, googleProvider)}
        onLogout={() => signOut(auth)}
      />

      {activeSection === 'home' && (
        <>
          <Hero
            onExploreCourses={() => handleScrollNavigate('courses')}
            onOpenAdvisor={() => setShowAdvisor(true)}
            onOpenEnrollDefault={triggerDefaultEnroll}
            dynamicTitle={heroTitle}
            dynamicSubtitle={heroSubtitle}
            onExplorePortfolio={() => handleScrollNavigate('portfolio')}
          />
          <HomeBanners />
          <IntroVideo />
        </>
      )}

      {/* Floating active enrollment banner alert */}
      {justEnrolledTicket && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 bg-emerald-50 Border border-emerald-100 text-emerald-900 rounded-xl px-5 py-3.5 shadow-2xl flex items-center space-x-3.5 animate-bounce max-w-sm sm:max-w-md">
          <div className="p-1.5 bg-emerald-500 rounded-full text-white">
            <Check className="h-4.5 w-4.5" />
          </div>
          <div className="text-left font-sans">
            <p className="text-xs font-bold leading-normal">Bạn đã ghi danh lớp học thành công!</p>
            <p className="text-[10px] text-emerald-700">Mã vé tham dự của bạn: <span className="font-extrabold">{justEnrolledTicket}</span>. Hãy kiểm tra nhóm Zalo nhé!</p>
          </div>
        </div>
      )}

      {activeSection === 'home' && (
        (() => {
          const homeSectionsMap: { [key: string]: React.ReactNode } = {
            features: <Features key="features" />,
            about: (
              <About 
                key="about" 
                dynamicTitle={aboutTitle} 
                dynamicText={aboutText} 
              />
            ),
            advisors: (
              <div id="home-advisors" key="advisors" className="border-t border-gray-100">
                <Advisors />
              </div>
            ),
            partners: (
              <div id="home-partners" key="partners" className="border-t border-gray-100">
                <PartnersCollaborations />
              </div>
            ),
            media: (
              <div id="home-media" key="media" className="border-t border-gray-100">
                <MediaMentions />
              </div>
            ),
            testimonials: <Testimonials key="testimonials" />,
          };

          return (
            <>
              {sectionsOrder.map((sectionId) => homeSectionsMap[sectionId] || null)}
            </>
          );
        })()
      )}

      {activeSection === 'portfolio' && (
        <PortfolioSection />
      )}

      {activeSection === 'training' && (
        <TrainingFields
          courses={coursesList}
          onSelectCourse={(course) => setSelectedCourse(course)}
          onEnroll={triggerEnroll}
        />
      )}

      {activeSection === 'ecosystem' && (
        <ProductEcosystem />
      )}

      {activeSection === 'advisors' && (
        <Advisors />
      )}

      {activeSection === 'partners' && (
        <PartnersCollaborations />
      )}

      {activeSection === 'media' && (
        <MediaMentions />
      )}

      {/* Knowledge Base Blog articles section */}
      {activeSection === 'news' && (
        <div className="space-y-4">
          <ActivityEvents />
          <section id="blog" className="py-20 bg-white border-t border-gray-150 scroll-mt-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section header block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 space-y-6 md:space-y-0">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#3B82F6] uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full inline-block">
                Tổ Hợp Tri Thức AIUNI
              </span>
              <h2 className="font-display text-3xl font-extrabold text-gray-900">
                Tin Tức & Phát Kiến Công Nghệ
              </h2>
              <p className="font-sans text-gray-500 text-xs sm:text-sm max-w-lg leading-relaxed">
                Đồng hành cùng tốc độ biến đổi vô tiền khoáng hậu của thế giới công nghệ AI. Các bài phân tích chuyên sâu được biên soạn định kỳ bởi hội đồng học thuật AIUNI.
              </p>
            </div>

            {/* Category selection pill bars for Blog array */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-gray-50 border border-gray-150 rounded-xl text-xs shrink-0 self-start md:self-auto font-sans font-semibold text-gray-600">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'Xu hướng Công nghệ', label: 'Xu hướng' },
                { id: 'Mẹo Công nghệ', label: 'Mẹo & Thủ thuật' },
                { id: 'Sự nghiệp', label: 'Sự nghiệp' }
              ].map((pill) => (
                <button
                  key={pill.id}
                  onClick={() => setSelectedBlogCat(pill.id)}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedBlogCat === pill.id
                      ? 'bg-blue-600 text-white shadow-xs font-bold'
                      : 'hover:text-blue-600 hover:bg-white'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Core Blog Dynamic Layout Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side: Articles */}
            <div className="lg:col-span-8 space-y-8">
              {blogs.filter(p => selectedBlogCat === 'all' || p.category === selectedBlogCat).length > 0 ? (
                (() => {
                  const filtered = blogs.filter(p => selectedBlogCat === 'all' || p.category === selectedBlogCat);
                  const featuredPost = filtered[0];
                  const remainingPosts = filtered.slice(1);

                  return (
                    <div className="space-y-8">
                      {/* Featured Card layout for prominent item */}
                      {featuredPost && (
                        <div className="group bg-gray-50/50 rounded-3xl border border-gray-150/80 hover:border-blue-100 shadow-xs hover:shadow-xl hover:-translate-y-1 overflow-hidden transition-all duration-300 grid grid-cols-1 md:grid-cols-12 md:items-stretch">
                          <div className="relative md:col-span-5 min-h-[220px] md:min-h-full overflow-hidden bg-gray-100">
                            <img
                              src={featuredPost.coverImage}
                              alt={featuredPost.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute top-4 left-4 bg-blue-600 text-white font-bold text-[9px] px-2.5 py-1 rounded shadow-sm uppercase tracking-wider">
                              Nổi bật - {featuredPost.category}
                            </div>
                          </div>

                          <div className="p-6 md:p-8 md:col-span-7 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <div className="flex items-center space-x-3 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                                <span>{featuredPost.date}</span>
                                <span>•</span>
                                <span>{featuredPost.readTime}</span>
                              </div>
                              <h3
                                onClick={() => setSelectedBlogPost(featuredPost)}
                                className="font-display font-bold text-lg md:text-xl text-[#1E3A8A] hover:text-[#3B82F6] cursor-pointer transition-colors leading-snug"
                              >
                                {featuredPost.title}
                              </h3>
                              <p className="font-sans text-gray-600 text-xs leading-relaxed line-clamp-4">
                                {featuredPost.excerpt}
                              </p>
                            </div>

                            <div className="border-t border-gray-150 pt-4 flex items-center justify-between text-xs font-bold font-sans">
                              <span className="text-gray-400 font-medium">Viết bởi: {featuredPost.author}</span>
                              <button
                                onClick={() => setSelectedBlogPost(featuredPost)}
                                className="text-blue-600 group-hover:translate-x-1.5 transition-transform flex items-center cursor-pointer font-bold duration-300"
                              >
                                <span>Đọc bài viết</span>
                                <ArrowRight className="h-4 w-4 ml-1.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Remaining articles grid */}
                      {remainingPosts.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {remainingPosts.map((post) => (
                            <div
                              key={post.id}
                              className="group bg-white rounded-2xl border border-gray-100 shadow-xs hover:shadow-lg hover:-translate-y-1 overflow-hidden transition-all duration-300 flex flex-col h-full"
                            >
                              <div className="relative aspect-video overflow-hidden bg-gray-50 shrink-0">
                                <img
                                  src={post.coverImage}
                                  alt={post.title}
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                  loading="lazy"
                                />
                                <span className="absolute top-3 left-3 bg-white text-blue-600 font-bold text-[9px] px-2 py-0.5 rounded shadow-xs uppercase tracking-wider">
                                  {post.category}
                                </span>
                              </div>

                              <div className="p-5 flex flex-col flex-grow justify-between space-y-4">
                                <div className="space-y-1.5">
                                  <div className="flex items-center space-x-2 text-[9px] text-gray-400 font-semibold tracking-wide uppercase">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                  </div>
                                  <h4
                                    onClick={() => setSelectedBlogPost(post)}
                                    className="font-display font-extrabold text-sm text-gray-900 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2 min-h-10 leading-snug"
                                  >
                                    {post.title}
                                  </h4>
                                  <p className="font-sans text-gray-500 text-[11px] leading-relaxed line-clamp-3">
                                    {post.excerpt}
                                  </p>
                                </div>

                                <div className="border-t border-gray-100 pt-3 flex items-center justify-between text-[11px] font-bold font-sans">
                                  <span className="text-gray-400 font-medium truncate max-w-[130px]" title={post.author}>
                                    Tác giả: {post.author.replace('Học viện ', '')}
                                  </span>
                                  <button
                                    onClick={() => setSelectedBlogPost(post)}
                                    className="text-blue-600 group-hover:translate-x-1 transition-transform flex items-center cursor-pointer"
                                  >
                                    <span>Xem chi tiết</span>
                                    <ArrowRight className="h-3 w-3 ml-1" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()
              ) : (
                <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
                  <p className="font-display font-bold text-gray-500 text-sm">Chưa có bài viết nào thuộc chủ đề này</p>
                  <button
                    onClick={() => setSelectedBlogCat('all')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white font-sans text-xs font-bold rounded-lg hover:scale-102 transition-transform cursor-pointer"
                  >
                    Xem tất cả bài viết
                  </button>
                </div>
              )}
            </div>

            {/* Right side: Sidebar widgets */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Newsletter subscribe widget - No alerts, complete beautiful inline feedback */}
              <div className="bg-gradient-to-br from-[#122254] to-[#1E3A8A] text-white p-6 rounded-3xl shadow-lg border border-white/10 space-y-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-blue-300 uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded-full inline-block">
                    AIUNI Newsletter
                  </span>
                  <h3 className="font-display font-extrabold text-base leading-snug">
                    Bản Tin Đột Phá Công Nghệ
                  </h3>
                  <p className="font-sans text-blue-100/80 text-xs leading-relaxed">
                    Nhận tóm tắt xu hướng nghiên cứu, mẹo Prompt Engineering đắt giá và học liệu miễn phí gửi trực tiếp vào hòm thư lúc 8h sáng thứ Hai hàng tuần.
                  </p>
                </div>

                {newsletterSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-emerald-500/20 border border-emerald-500/30 p-3.5 rounded-2xl text-center space-y-1.5"
                  >
                    <p className="text-xs font-bold text-emerald-300">Đăng ký thành công! 🎉</p>
                    <p className="text-[10px] text-emerald-200 font-sans leading-normal">
                      Hãy chuẩn bị nhận bản tin AI đặc sắc đầu tiên của bạn vào thứ Hai tới nhé!
                    </p>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newsletterEmail.trim()) return;
                      setNewsletterSuccess(true);
                      setTimeout(() => {
                        setNewsletterEmail('');
                      }, 4000);
                    }}
                    className="space-y-2.5 font-sans"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Nhập email của bạn (ví dụ: name@domain.com)"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/10 text-white placeholder-blue-200/50 text-xs focus:bg-white/15 focus:outline-none focus:border-blue-400 transition-all font-medium"
                    />
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-extrabold rounded-xl transition-all shadow-md text-xs cursor-pointer text-center"
                    >
                      Đăng ký ngay bây giờ
                    </button>
                    <p className="text-[9px] text-[#A5B4FC]/75 text-center leading-normal">
                      Chúng tôi cam kết bảo mật 100%, không spam tin nhắn rác. Bạn có thể hủy đăng ký bất cứ lúc nào bằng 1 click.
                    </p>
                  </form>
                )}
              </div>

              {/* Sidebar Trust Info widget */}
              <div className="bg-gray-50 border border-gray-150 rounded-2xl p-6 space-y-4 text-left">
                <h4 className="font-display font-extrabold text-gray-900 text-xs uppercase tracking-wider pb-2 border-b border-gray-200">
                  Tại Sao Bạn Nên Theo Dõi?
                </h4>
                <div className="space-y-3 font-sans text-xs text-gray-650">
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">Mọi bài viết được biên soạn chặt chẽ bởi các kĩ sư trưởng dày dặn thực chiến.</p>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">Cung cấp bộ khung promt và mã nguồn mẫu tải về tức thì miễn phí.</p>
                  </div>
                  <div className="flex items-start space-x-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-relaxed">Học liệu thích ứng nhanh, chỉ bàn giao các phát kiến AI có ích tức thì cho công việc.</p>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Section: Báo cáo tuyển chọn chuyên môn sâu - Whitepapers */}
          <div className="mt-16 pt-12 border-t border-gray-150 relative">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
              <div className="space-y-1.5 text-left">
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block">
                  Ấn Phẩm Tri Thức Doanh Nghiệp
                </span>
                <h3 className="font-display text-2xl font-extrabold text-gray-950">
                  Ấn Bản Báo Cáo & Sách Trắng Công Nghệ (Whitepapers)
                </h3>
                <p className="font-sans text-gray-500 text-xs sm:text-sm max-w-xl">
                  Khám phá các phân tích định lượng chuyên môn sâu được thực thi bởi đội ngũ cốt cán AIUNI kết hợp với các tập đoàn công nghệ toàn cầu.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {reports.map((rep) => (
                <div 
                  key={rep.id} 
                  className="group bg-[#FAFAFA] border border-gray-150/85 rounded-2xl overflow-hidden hover:shadow-xl hover:border-indigo-100 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="relative aspect-[16/7] overflow-hidden bg-slate-100 shrink-0 border-b border-gray-100">
                    <img 
                      src={rep.coverImage} 
                      alt={rep.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-indigo-600 text-white font-bold text-[9px] px-2 py-0.5 rounded shadow-sm">
                      ẤN BẢN TRỌNG ĐIỂM
                    </div>
                  </div>

                  <div className="p-6 flex-grow space-y-3.5">
                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                      <span>{rep.author}</span>
                      <span className="flex items-center space-x-1">
                        <Download className="h-3 w-3 text-indigo-500" />
                        <span>{rep.downloadsCount || 0} lượt tải</span>
                      </span>
                    </div>

                    <h4 
                      onClick={() => setSelectedReport(rep)}
                      className="font-display font-extrabold text-base text-gray-900 group-hover:text-indigo-600 cursor-pointer transition-colors max-w-md line-clamp-2 leading-snug"
                    >
                      {rep.title}
                    </h4>

                    <p className="font-sans text-gray-600 text-xs leading-relaxed line-clamp-3">
                      {rep.excerpt}
                    </p>
                  </div>

                  <div className="p-6 pt-0 flex items-center justify-between border-t border-gray-100/40 mt-auto">
                    <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-1 rounded font-semibold">{rep.readTime}</span>
                    <button 
                      onClick={() => setSelectedReport(rep)}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-500 transition-colors flex items-center space-x-1.5 cursor-pointer"
                    >
                      <span>Xem & Tải Sách trắng</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
        </div>
      )}

      {/* Dynamic contact and admission support forms */}
      {activeSection === 'contact' && (
        <ContactForm />
      )}

      {/* Admin system dashboard integrated with firebase */}
      {activeSection === 'admin' && (
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 mt-16 text-left animate-fadeIn">
          <AdminDashboard onClose={() => handleScrollNavigate('hero')} />
        </div>
      )}

      {/* CTA section panel */}
      {activeSection === 'home' && (
        <CTA onOpenEnrollDefault={triggerDefaultEnroll} />
      )}

      {/* Bottom Legal Footer Coordinates */}
      <Footer onNavigate={handleScrollNavigate} />

      {/* Floating Admissions advisor indicator badge/bubble in lower-right corner */}
      {!showAdvisor && (
        <button
          id="btn-floating-advisor"
          onClick={() => setShowAdvisor(true)}
          className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white p-4 rounded-full shadow-2xl hover:scale-110 cursor-pointer transition-all border border-blue-400/20 animate-pulse flex items-center space-x-2 group shrink-0"
          title="Trò chuyện Cố vấn AI"
        >
          <Sparkles className="h-5 w-5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 font-sans text-xs font-bold whitespace-nowrap leading-none hidden md:inline-block">
            Hỏi Cố Vấn Tuyển Sinh AI
          </span>
        </button>
      )}

      {/* ================= MODALS REGISTERS ================= */}

      {/* Syllabus View Details Modal */}
      <CourseDetailsModal
        course={selectedCourse}
        onClose={() => setSelectedCourse(null)}
        onEnroll={(course) => {
          setSelectedCourse(null);
          triggerEnroll(course);
        }}
      />

      {/* Enrollment Sign up class form Modal */}
      {showEnrollModal && (
        <EnrollmentModal
          courses={coursesList}
          selectedCourse={courseToEnroll}
          onClose={() => {
            setShowEnrollModal(false);
            setCourseToEnroll(null);
          }}
          onEnrollSuccess={handleEnrollSuccess}
        />
      )}

      {/* News Blog details post Modal */}
      <BlogDetailsModal
        post={selectedBlogPost}
        onClose={() => setSelectedBlogPost(null)}
      />

      {/* AI Conversational Advisor chatbot panel */}
      <AICourseAdvisor
        isOpen={showAdvisor}
        courses={coursesList}
        onClose={() => setShowAdvisor(false)}
        onEnrollCourse={(course) => {
          setShowAdvisor(false);
          triggerEnroll(course);
        }}
      />

      {/* Professional Whitepaper details Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 md:p-8 space-y-6 text-left max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-0.5 rounded-full inline-block mb-2">
                  {selectedReport.author}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-extrabold text-[#111827] leading-tight">
                  {selectedReport.title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedReport(null)}
                className="p-1.5 px-3 bg-gray-100 hover:bg-gray-200 text-gray-500 rounded-lg text-xs font-extrabold cursor-pointer transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="border-t border-b border-gray-100 py-6 max-w-none text-sm text-gray-700 space-y-4">
              <div className="prose prose-indigo max-w-none">
                <div className="whitespace-pre-line font-sans text-gray-800 leading-relaxed text-sm">
                  {selectedReport.content}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
              <div className="text-xs text-gray-500 font-bold font-sans">
                Độ dài: <span className="text-indigo-600 font-extrabold">{selectedReport.readTime}</span> • Lượt tải về: <span className="text-indigo-600 font-extrabold">{selectedReport.downloadsCount || 0}</span>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                {selectedReport.externalLink && selectedReport.externalLink.trim() && (
                  <a
                    href={selectedReport.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-blue-600 text-white hover:bg-blue-500 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>Xem Báo Cáo gốc 🔗</span>
                  </a>
                )}
                
                <button
                  onClick={() => {
                    handleDownloadReport(selectedReport);
                    setSelectedReport(null);
                  }}
                  className="px-5 py-2.5 bg-[#122254] text-white hover:bg-indigo-900 rounded-xl font-bold text-xs transition-all shadow-md flex items-center justify-center space-x-1.5 cursor-pointer hover:scale-101"
                >
                  <Download className="h-4 w-4" />
                  <span>Tải Sách Trắng PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
