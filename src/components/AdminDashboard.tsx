import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Layout, FileText, BookOpen, Users, Settings, Plus, Edit2, 
  Trash2, Save, MoveUp, MoveDown, LogOut, RefreshCw, Download, CheckCircle, 
  Clock, ArrowLeft, Sparkles, Search, Mail, Phone, ShieldCheck, Check, AlertCircle, X, ChevronRight, GraduationCap, UserCheck, Award, Newspaper, Tv, Video
} from 'lucide-react';
import { 
  collection, doc, getDocs, getDoc, setDoc, updateDoc, deleteDoc, 
  onSnapshot, query, orderBy, writeBatch
} from 'firebase/firestore';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { db, auth, googleProvider, handleFirestoreError, OperationType } from '../firebase';
import { Course, BlogPost, Enrollment, Testimonial, Report, AdminWhitelist, Instructor, Advisor, MediaVideo, HighlightedPress, PressNews, ElitePartner, InternationalCollab, DevelopmentVector, MarqueeLogo } from '../types';
import { courses as defaultCourses, instructors as defaultInstructors, defaultAdvisors, defaultVideos, defaultHighlightedPress, defaultPressNews, testimonials as defaultTestimonials, defaultElitePartners, defaultInternationalCollabs, defaultDevelopmentVectors, defaultMarqueeLogos, blogPosts as defaultBlogPosts, defaultReports } from '../data';

interface AdminDashboardProps {
  onClose: () => void;
  onRefreshData?: () => void;
}

export default function AdminDashboard({ onClose, onRefreshData }: AdminDashboardProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // Active Tab
  const [activeTab, setActiveTab] = useState<'content' | 'blogs' | 'reports' | 'enrollments' | 'admins' | 'courses' | 'contacts' | 'instructors' | 'advisors' | 'media' | 'testimonials' | 'partners'>('content');

  // Whitelisted Admins State
  const [adminsList, setAdminsList] = useState<AdminWhitelist[]>([]);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [adminAddError, setAdminAddError] = useState('');
  const [adminAddSuccess, setAdminAddSuccess] = useState('');

  // Loader
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState<string | null>(null);

  // --- Dynamic Courses State ---
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [courseSearch, setCourseSearch] = useState('');
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    title: '',
    slug: '',
    category: 'basics',
    description: '',
    longDescription: '',
    rating: 4.8,
    reviewsCount: 124,
    price: 0,
    duration: '6 tuần (12 giờ học)',
    lessonsCount: 12,
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop',
  });

  const [instructorId, setInstructorId] = useState('inst-1');
  const [courseTagsText, setCourseTagsText] = useState('');
  const [courseFeaturesText, setCourseFeaturesText] = useState('');
  const [courseSyllabusText, setCourseSyllabusText] = useState('');

  // --- Dynamic Instructors State ---
  const [instructorsList, setInstructorsList] = useState<Instructor[]>([]);
  const [instructorSearch, setInstructorSearch] = useState('');
  const [editingInstructorId, setEditingInstructorId] = useState<string | null>(null);
  
  const [instructorForm, setInstructorForm] = useState<Partial<Instructor>>({
    name: '',
    role: '',
    company: '',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop'
  });

  // --- Dynamic Advisors State ---
  const [advisorsList, setAdvisorsList] = useState<Advisor[]>([]);
  const [advisorSearch, setAdvisorSearch] = useState('');
  const [editingAdvisorId, setEditingAdvisorId] = useState<string | null>(null);
  const [advisorForm, setAdvisorForm] = useState<Partial<Advisor>>({
    name: '',
    role: '',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop',
    type: 'expert',
    desc: '',
    badge: 'Expert',
    country: '',
    affiliation: '',
    flag: '',
    bio: '',
    achievements: [],
    email: '',
    linkedin: ''
  });
  const [advisorAchievementsText, setAdvisorAchievementsText] = useState('');

  // --- Dynamic Media Mentions States ---
  const [videosListState, setVideosListState] = useState<MediaVideo[]>([]);
  const [videoSearch, setVideoSearch] = useState('');
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [videoForm, setVideoForm] = useState<Partial<MediaVideo>>({
    title: '',
    channel: '',
    embedUrl: '',
    badge: '',
    desc: '',
    tags: [],
    channelBadge: ''
  });
  const [videoTagsText, setVideoTagsText] = useState('');

  const [highlightedPressList, setHighlightedPressList] = useState<HighlightedPress[]>([]);
  const [highSearch, setHighSearch] = useState('');
  const [editingHighId, setEditingHighId] = useState<string | null>(null);
  const [highForm, setHighForm] = useState<Partial<HighlightedPress>>({
    publisher: '',
    title: '',
    desc: '',
    url: '',
    badge: '',
    accent: 'border-blue-500/30 bg-blue-50/40 text-blue-700'
  });

  const [pressNewsList, setPressNewsList] = useState<PressNews[]>([]);
  const [newsSearch, setNewsSearch] = useState('');
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [newsForm, setNewsForm] = useState<Partial<PressNews>>({
    publisher: '',
    title: '',
    url: '',
    description: ''
  });

  // --- Dynamic Testimonials States ---
  const [testimonialsListState, setTestimonialsListState] = useState<Testimonial[]>([]);
  const [testimonialSearch, setTestimonialSearch] = useState('');
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({
    name: '',
    role: '',
    company: '',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&auto=format&fit=crop',
    rating: 5,
    quote: ''
  });

  // --- Dynamic Partners & Collaborations States ---
  const [elitePartnersListState, setElitePartnersListState] = useState<ElitePartner[]>([]);
  const [editingElitePartnerId, setEditingElitePartnerId] = useState<string | null>(null);
  const [elitePartnerForm, setElitePartnerForm] = useState<Partial<ElitePartner>>({
    name: '',
    desc: '',
    iconName: 'Building'
  });

  const [intlCollabsListState, setIntlCollabsListState] = useState<InternationalCollab[]>([]);
  const [editingIntlCollabId, setEditingIntlCollabId] = useState<string | null>(null);
  const [intlCollabForm, setIntlCollabForm] = useState<{
    partner: string;
    title: string;
    desc: string;
    bulletinsText: string;
    lightBg?: string;
    badgeColor?: string;
  }>({
    partner: '',
    title: '',
    desc: '',
    bulletinsText: '',
    lightBg: 'from-blue-50/50 to-indigo-50/10',
    badgeColor: 'bg-blue-100 text-blue-800'
  });

  const [devVectorsListState, setDevVectorsListState] = useState<DevelopmentVector[]>([]);
  const [editingDevVectorId, setEditingDevVectorId] = useState<string | null>(null);
  const [devVectorForm, setDevVectorForm] = useState<Partial<DevelopmentVector>>({
    title: '',
    desc: '',
    iconName: 'Compass'
  });

  const [marqueeLogosListState, setMarqueeLogosListState] = useState<MarqueeLogo[]>([]);
  const [editingMarqueeLogoId, setEditingMarqueeLogoId] = useState<string | null>(null);
  const [marqueeLogoForm, setMarqueeLogoForm] = useState<Partial<MarqueeLogo>>({
    name: '',
    logoUrl: ''
  });

  const courseImagePresets = [
    { name: 'Core AI Basics', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop' },
    { name: 'Machine Learning', url: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=600&auto=format&fit=crop' },
    { name: 'Neural Networks Deep Science', url: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=600&auto=format&fit=crop' },
    { name: 'Business Automation Intelligence', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop' },
    { name: 'Abstract Tech Blue', url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop' }
  ];

  // --- Contacts State ---
  const [contactsList, setContactsList] = useState<any[]>([]);
  const [contactSearch, setContactSearch] = useState('');

  // --- Dynamic Layout State ---
  const [heroTitle, setHeroTitle] = useState('Nền tảng đào tạo AI hàng đầu Việt Nam');
  const [heroSubtitle, setHeroSubtitle] = useState('Học viện Đào tạo, Nghiên cứu & Ứng dụng AI hàng đầu - Kiến tạo thế hệ kỹ sư công nghệ số thực chiến đột phá năng suất lao động.');
  const [aboutTitle, setAboutTitle] = useState('Bản sắc dẫn đầu trong kỷ nguyên Trí tuệ nhân tạo AIUNI');
  const [aboutText, setAboutText] = useState('AIUNI là học viện đào tạo, nghiên cứu và ứng dụng Trí tuệ nhân tạo (AI) tại Việt Nam, hướng tới xây dựng hệ sinh thái AI toàn diện cho giáo dục, doanh nghiệp và cộng đồng. Chúng tôi tự hào không chỉ dừng lại là một học viện đào tạo AI đơn thuần, mà còn đóng vai trò là một điểm tựa kết nối thực tiễn với chiều sâu chiến lược.');
  
  // Section ordering list representing the "drag-and-drop / customizer" ordering feature!
  const [sections, setSections] = useState<string[]>([
    'features',
    'about',
    'courses',
    'ecosystem',
    'advisors',
    'partners',
    'testimonials',
    'news'
  ]);

  const sectionNameMap: { [key: string]: string } = {
    features: 'Đặc trưng nổi bật (Features)',
    about: 'Giới thiệu Bản sắc học viện (About)',
    courses: 'Thư viện khóa học (Course Directory)',
    ecosystem: 'Hệ sinh thái sản phẩm (Ecosystem)',
    advisors: 'Đội ngũ Cố vấn học thuật (Advisors)',
    partners: 'Đối tác & Hợp tác chiến lược (Partners)',
    testimonials: 'Ý kiến học viên (Testimonials)',
    news: 'Tin tức, Phát kiến & Báo cáo (News & Reports)',
  };

  // --- Blogs State ---
  const [blogsList, setBlogsList] = useState<BlogPost[]>([]);
  const [blogForm, setBlogForm] = useState<Partial<BlogPost>>({
    title: '',
    category: 'Xu hướng Công nghệ',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
    readTime: '5 phút đọc',
    author: 'Ban Học thuật AIUNI'
  });
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  // --- Reports State ---
  const [reportsList, setReportsList] = useState<Report[]>([]);
  const [reportForm, setReportForm] = useState<Partial<Report>>({
    title: '',
    excerpt: '',
    content: '',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    author: 'Viện Nghiên cứu AIUNI Labs',
    readTime: '15 phút đọc',
  });
  const [editingReportId, setEditingReportId] = useState<string | null>(null);

  // --- Admin Sub-tabs View Modes (list vs form) ---
  const [courseSubTab, setCourseSubTab] = useState<'list' | 'form'>('list');
  const [blogSubTab, setBlogSubTab] = useState<'list' | 'form'>('list');
  const [reportSubTab, setReportSubTab] = useState<'list' | 'form'>('list');
  const [instructorSubTab, setInstructorSubTab] = useState<'list' | 'form'>('list');
  const [advisorSubTab, setAdvisorSubTab] = useState<'list' | 'form'>('list');
  const [mediaSubTab, setMediaSubTab] = useState<'list' | 'form'>('list');
  const [testimonialSubTab, setTestimonialSubTab] = useState<'list' | 'form'>('list');
  const [partnerSubTab, setPartnerSubTab] = useState<'list' | 'form'>('list');

  // --- Enrollments State ---
  const [enrollmentsList, setEnrollmentsList] = useState<Enrollment[]>([]);
  const [enrollSearch, setEnrollSearch] = useState('');
  const [enrollFilterStatus, setEnrollFilterStatus] = useState<'all' | 'pending' | 'success'>('all');

  const coverImagePresets = [
    { name: 'Future Computer AI', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop' },
    { name: 'Data Visualization', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop' },
    { name: 'AI Brain Graphic', url: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop' },
    { name: 'Programming Workspace', url: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=600&auto=format&fit=crop' },
    { name: 'AI Robot Metaphor', url: 'https://images.unsplash.com/photo-1485627941502-d2e6429a8af0?q=80&w=600&auto=format&fit=crop' }
  ];

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (!user) {
        setIsAuthorized(false);
        setAuthLoading(false);
        return;
      }

      // Determine authorization: admin user is strictly tuanthanhtt1305@gmail.com
      if (user.email === 'tuanthanhtt1305@gmail.com') {
        setIsAuthorized(true);
        setAuthLoading(false);
        return;
      }

      // Check Firestore Whitelist or local fallback
      try {
        const emailLower = user.email ? user.email.toLowerCase() : '';
        const docRef = doc(db, 'admins', emailLower);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsAuthorized(true);
        } else {
          const localWhitelistedStr = localStorage.getItem('local_whitelisted_admins');
          const localList = localWhitelistedStr ? JSON.parse(localWhitelistedStr) : [];
          const isLocalAdmin = localList.some((adm: any) => adm.email === emailLower);
          setIsAuthorized(isLocalAdmin);
        }
      } catch (err) {
        console.warn("Could not load admins whitelist from firestore, check local storage.");
        const emailLower = user.email ? user.email.toLowerCase() : '';
        const localWhitelistedStr = localStorage.getItem('local_whitelisted_admins');
        const localList = localWhitelistedStr ? JSON.parse(localWhitelistedStr) : [];
        const isLocalAdmin = localList.some((adm: any) => adm.email === emailLower);
        setIsAuthorized(isLocalAdmin);
      }
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  // Sync data whenever Auth changes
  useEffect(() => {
    if (!currentUser) return;

    // Set up snapshot listeners for all collections to keep UI updated in real-time
    const qBlogs = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubBlogs = onSnapshot(qBlogs, (snap) => {
      const blogs: BlogPost[] = [];
      snap.forEach((doc) => {
        blogs.push({ id: doc.id, ...doc.data() } as BlogPost);
      });
      if (blogs.length > 0) {
        setBlogsList(blogs);
        localStorage.setItem('local_blogs', JSON.stringify(blogs));
      } else {
        setBlogsList(defaultBlogPosts);
      }
    }, (err) => {
      console.warn("Could not load blogs dynamically (rules restricted or empty), utilizing static mockup stream.");
      const local = localStorage.getItem('local_blogs');
      if (local) {
        setBlogsList(JSON.parse(local));
      } else {
        setBlogsList(defaultBlogPosts);
      }
    });

    const qReports = query(collection(db, 'reports'), orderBy('createdAt', 'desc'));
    const unsubReports = onSnapshot(qReports, (snap) => {
      const reports: Report[] = [];
      snap.forEach((doc) => {
        reports.push({ id: doc.id, ...doc.data() } as Report);
      });
      if (reports.length > 0) {
        setReportsList(reports);
        localStorage.setItem('local_reports', JSON.stringify(reports));
      } else {
        setReportsList(defaultReports);
      }
    }, (err) => {
      console.warn("Could not load reports dynamically.");
      const local = localStorage.getItem('local_reports');
      if (local) {
        setReportsList(JSON.parse(local));
      } else {
        setReportsList(defaultReports);
      }
    });

    const qEnroll = query(collection(db, 'enrollments'), orderBy('createdAt', 'desc'));
    const unsubEnroll = onSnapshot(qEnroll, (snap) => {
      const enrollmentDocs: Enrollment[] = [];
      snap.forEach((doc) => {
        enrollmentDocs.push({ id: doc.id, ...doc.data() } as Enrollment);
      });
      setEnrollmentsList(enrollmentDocs);
    }, (err) => {
      console.warn("Could not load enrollments list recursively, restricted access.");
    });

    const unsubCourses = onSnapshot(collection(db, 'courses'), (snap) => {
      const courses: Course[] = [];
      snap.forEach((doc) => {
        courses.push({ id: doc.id, ...doc.data() } as Course);
      });
      if (courses.length > 0) {
        setCoursesList(courses);
        localStorage.setItem('local_courses', JSON.stringify(courses));
      } else {
        setCoursesList(defaultCourses);
      }
    }, (err) => {
      console.warn("Could not load courses, using offline fallback");
      const local = localStorage.getItem('local_courses');
      if (local) {
        setCoursesList(JSON.parse(local));
      } else {
        setCoursesList(defaultCourses);
      }
    });

    const unsubContacts = onSnapshot(query(collection(db, 'contacts'), orderBy('createdAt', 'desc')), (snap) => {
      const contacts: any[] = [];
      snap.forEach((doc) => {
        contacts.push({ id: doc.id, ...doc.data() });
      });
      setContactsList(contacts);
      localStorage.setItem('local_contacts', JSON.stringify(contacts));
    }, (err) => {
      console.warn("Could not load contacts snapshot:", err);
      const local = localStorage.getItem('local_contacts');
      if (local) {
        setContactsList(JSON.parse(local));
      }
    });

    const unsubInstructors = onSnapshot(collection(db, 'instructors'), (snap) => {
      const insts: Instructor[] = [];
      snap.forEach((doc) => {
        insts.push({ id: doc.id, ...doc.data() } as Instructor);
      });
      if (insts.length > 0) {
        setInstructorsList(insts);
        localStorage.setItem('local_instructors', JSON.stringify(insts));
      } else {
        setInstructorsList(defaultInstructors);
        localStorage.setItem('local_instructors', JSON.stringify(defaultInstructors));
      }
    }, (err) => {
      console.warn("Could not load instructors, using offline fallback");
      const local = localStorage.getItem('local_instructors');
      if (local) {
        setInstructorsList(JSON.parse(local));
      } else {
        setInstructorsList(defaultInstructors);
      }
    });

    const unsubAdvisors = onSnapshot(collection(db, 'advisors'), (snap) => {
      const advs: Advisor[] = [];
      snap.forEach((doc) => {
        advs.push({ id: doc.id, ...doc.data() } as Advisor);
      });
      if (advs.length > 0) {
        setAdvisorsList(advs);
        localStorage.setItem('local_advisors', JSON.stringify(advs));
      } else {
        setAdvisorsList(defaultAdvisors);
        localStorage.setItem('local_advisors', JSON.stringify(defaultAdvisors));
      }
    }, (err) => {
      console.warn("Could not load advisors, using offline fallback");
      const local = localStorage.getItem('local_advisors');
      if (local) {
        setAdvisorsList(JSON.parse(local));
      } else {
        setAdvisorsList(defaultAdvisors);
      }
    });

    const unsubVids = onSnapshot(collection(db, 'media_videos'), (snap) => {
      const items: MediaVideo[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MediaVideo);
      });
      setVideosListState(items.length > 0 ? items : defaultVideos);
    });

    const unsubHighPress = onSnapshot(collection(db, 'media_highlighted'), (snap) => {
      const items: HighlightedPress[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as HighlightedPress);
      });
      setHighlightedPressList(items.length > 0 ? items : defaultHighlightedPress);
    });

    const unsubNews = onSnapshot(collection(db, 'media_news'), (snap) => {
      const items: PressNews[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as PressNews);
      });
      setPressNewsList(items.length > 0 ? items : defaultPressNews);
    });

    const unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snap) => {
      const items: Testimonial[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Testimonial);
      });
      setTestimonialsListState(items.length > 0 ? items : defaultTestimonials);
    }, (err) => {
      console.warn("Could not load testimonials live snapshot", err);
      setTestimonialsListState(defaultTestimonials);
    });

    const unsubEP = onSnapshot(collection(db, 'elite_partners'), (snap) => {
      const items: ElitePartner[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as ElitePartner);
      });
      setElitePartnersListState(items.length > 0 ? items : defaultElitePartners);
    }, (err) => {
      console.warn("Could not load elite partners live snapshot", err);
      setElitePartnersListState(defaultElitePartners);
    });

    const unsubIC = onSnapshot(collection(db, 'international_collabs'), (snap) => {
      const items: InternationalCollab[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as InternationalCollab);
      });
      setIntlCollabsListState(items.length > 0 ? items : defaultInternationalCollabs);
    }, (err) => {
      console.warn("Could not load international collabs live snapshot", err);
      setIntlCollabsListState(defaultInternationalCollabs);
    });

    const unsubDV = onSnapshot(collection(db, 'development_vectors'), (snap) => {
      const items: DevelopmentVector[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as DevelopmentVector);
      });
      setDevVectorsListState(items.length > 0 ? items : defaultDevelopmentVectors);
    }, (err) => {
      console.warn("Could not load development vectors live snapshot", err);
      setDevVectorsListState(defaultDevelopmentVectors);
    });

    const unsubML = onSnapshot(collection(db, 'marquee_logos'), (snap) => {
      const items: MarqueeLogo[] = [];
      snap.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as MarqueeLogo);
      });
      setMarqueeLogosListState(items.length > 0 ? items : defaultMarqueeLogos);
    }, (err) => {
      console.warn("Could not load marquee logos live snapshot", err);
      setMarqueeLogosListState(defaultMarqueeLogos);
    });

    let unsubAdmins = () => {};
    if (currentUser.email === 'tuanthanhtt1305@gmail.com') {
      const qAdmins = collection(db, 'admins');
      unsubAdmins = onSnapshot(qAdmins, (snap) => {
        const list: AdminWhitelist[] = [];
        snap.forEach((doc) => {
          list.push(doc.data() as AdminWhitelist);
        });
        setAdminsList(list);
        localStorage.setItem('local_whitelisted_admins', JSON.stringify(list));
      }, (err) => {
        console.warn("Admins checker failed, using local storage fallback.");
        const offlineList = localStorage.getItem('local_whitelisted_admins');
        if (offlineList) {
          setAdminsList(JSON.parse(offlineList));
        }
      });
    }

    // Content Main Config Lookup
    const loadContentConfig = async () => {
      try {
        const docRef = doc(db, 'content', 'main');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.heroTitle) setHeroTitle(data.heroTitle);
          if (data.heroSubtitle) setHeroSubtitle(data.heroSubtitle);
          if (data.aboutTitle) setAboutTitle(data.aboutTitle);
          if (data.aboutText) setAboutText(data.aboutText);
          if (data.sectionOrder) {
            setSections(data.sectionOrder.split(','));
          }
        }
      } catch (e) {
        console.warn("Could not fetch page configuration.");
      }
    };
    loadContentConfig();

    return () => {
      unsubBlogs();
      unsubReports();
      unsubEnroll();
      unsubCourses();
      unsubContacts();
      unsubInstructors();
      unsubAdvisors();
      unsubVids();
      unsubHighPress();
      unsubNews();
      unsubTestimonials();
      unsubEP();
      unsubIC();
      unsubDV();
      unsubML();
      unsubAdmins();
    };
  }, [currentUser]);

  // Actions
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error("Login failed: ", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error(err);
    }
  };

  // --- Courses Admin Actions ---
  const handleSaveCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title?.trim() || !courseForm.description?.trim()) return;

    setLoading(true);

    const derivedSlug = courseForm.slug?.trim() || courseForm.title.trim()
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // remove tone marks
      .replace(/[đĐ]/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const chosenInstructor = instructorsList.find(i => i.id === instructorId) || defaultInstructors.find(i => i.id === instructorId) || defaultInstructors[0];

    const parsedTags = courseTagsText.split(',').map(t => t.trim()).filter(Boolean);
    const parsedFeatures = courseFeaturesText.split('\n').map(f => f.trim()).filter(Boolean);

    const parsedSyllabus = courseSyllabusText.split('\n').filter(Boolean).map((line, idx) => {
      const parts = line.split('|');
      const firstPart = parts[0] || '';
      const secondPart = parts[1] || '';

      let title = firstPart.trim();
      let week = idx + 1;

      const weekMatch = firstPart.match(/Week\s*(\d+)[\s:]*(.*)/i);
      const tuanMatch = firstPart.match(/Tuần\s*(\d+)[\s:]*(.*)/i);
      if (weekMatch) {
        week = parseInt(weekMatch[1], 10) || (idx + 1);
        title = weekMatch[2].trim();
      } else if (tuanMatch) {
         week = parseInt(tuanMatch[1], 10) || (idx + 1);
         title = tuanMatch[2].trim();
      }

      const topics = secondPart.split(',').map(t => t.trim()).filter(Boolean);
      return {
        week,
        title: title || `Chương trình tuần ${week}`,
        topics: topics.length > 0 ? topics : ['Nội dung thực hành chi tiết.']
      };
    });

    const finalId = editingCourseId || 'course_' + Date.now();
    const finalCourse: Course = {
      id: finalId,
      title: courseForm.title.trim(),
      slug: derivedSlug,
      category: (courseForm.category as any) || 'basics',
      description: courseForm.description.trim(),
      longDescription: courseForm.longDescription?.trim() || '',
      instructor: chosenInstructor,
      rating: Number(courseForm.rating) || 4.8,
      reviewsCount: Number(courseForm.reviewsCount) || 120,
      price: Number(courseForm.price) || 0,
      discountPrice: courseForm.discountPrice ? Number(courseForm.discountPrice) : undefined,
      duration: courseForm.duration?.trim() || '6 tuần (12 giờ học)',
      lessonsCount: Number(courseForm.lessonsCount) || 12,
      image: courseForm.image || 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop',
      tags: parsedTags,
      features: parsedFeatures,
      syllabus: parsedSyllabus
    };

    try {
      await setDoc(doc(db, 'courses', finalId), finalCourse);
      setSaveSuccess('Lưu thông tin khóa học thành công!');
      resetCourseForm();
      if (onRefreshData) onRefreshData();
      setTimeout(() => setSaveSuccess(null), 4000);
    } catch (e: any) {
      console.warn("Firestore save failed, falling back to local storage:", e);
      try {
        const local = localStorage.getItem('local_courses');
        let list: Course[] = local ? JSON.parse(local) : [];
        if (editingCourseId) {
          list = list.map(c => c.id === editingCourseId ? finalCourse : c);
        } else {
          list.push(finalCourse);
        }
        localStorage.setItem('local_courses', JSON.stringify(list));
        setCoursesList(list);
        setSaveSuccess('Học trình đã được lưu cục bộ (Offline Mode)!');
        resetCourseForm();
        if (onRefreshData) onRefreshData();
        setTimeout(() => setSaveSuccess(null), 4000);
      } catch (err) {
        alert('Lỗi lưu trữ: ' + String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourseId(course.id);
    setCourseForm({
      title: course.title,
      slug: course.slug,
      category: course.category,
      description: course.description,
      longDescription: course.longDescription || '',
      rating: course.rating,
      reviewsCount: course.reviewsCount,
      price: course.price,
      discountPrice: course.discountPrice,
      duration: course.duration,
      lessonsCount: course.lessonsCount,
      image: course.image
    });
    setInstructorId(chooseInstructorId(course.instructor));
    setCourseTagsText(course.tags ? course.tags.join(', ') : '');
    setCourseFeaturesText(course.features ? course.features.join('\n') : '');
    setCourseSyllabusText(course.syllabus ? course.syllabus.map(s => `Tuần ${s.week}: ${s.title} | ${s.topics?.join(', ') || ''}`).join('\n') : '');
    setCourseSubTab('form');
  };

  const chooseInstructorId = (instructorObj?: any) => {
    if (!instructorObj) return 'inst-1';
    if (instructorObj.id) return instructorObj.id;
    if (instructorObj.name) {
      const found = instructorsList.find(i => i.name?.toLowerCase() === instructorObj.name.toLowerCase());
      if (found) return found.id;
    }
    return 'inst-1';
  };

  const handleDeleteCourse = async (courseId: string) => {
    if (!window.confirm('Bạn có hoàn toàn chắc chắn muốn xóa khóa học này không? Người dùng sẽ không thể đăng ký khóa học này nữa.')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'courses', courseId));
      if (onRefreshData) onRefreshData();
    } catch (e) {
      console.warn("Delete failed from firestore, doing local removal.");
      const local = localStorage.getItem('local_courses');
      if (local) {
        const list: Course[] = JSON.parse(local);
        const filtered = list.filter(c => c.id !== courseId);
        localStorage.setItem('local_courses', JSON.stringify(filtered));
        setCoursesList(filtered);
      }
      if (onRefreshData) onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  const resetCourseForm = () => {
    setEditingCourseId(null);
    setCourseForm({
      title: '',
      slug: '',
      category: 'basics',
      description: '',
      longDescription: '',
      rating: 4.8,
      reviewsCount: 120,
      price: 0,
      discountPrice: undefined,
      duration: '6 tuần (12 giờ học)',
      lessonsCount: 12,
      image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop'
    });
    setInstructorId('inst-1');
    setCourseTagsText('');
    setCourseFeaturesText('');
    setCourseSyllabusText('');
    setCourseSubTab('list');
  };

  const handleRestoreDefaultCourses = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn khôi phục toàn bộ Danh sách Khóa học mẫu mặc định từ hệ thống? Thao tác này sẽ ghi đè các khóa học trùng lặp.")) return;
    setLoading(true);
    try {
      for (const item of defaultCourses) {
        await setDoc(doc(db, 'courses', item.id), item);
      }
      setCoursesList(defaultCourses);
      localStorage.setItem('local_courses', JSON.stringify(defaultCourses));
      setSaveSuccess('Khôi phục danh sách khóa học mặc định thành công!');
      setTimeout(() => setSaveSuccess(null), 4050);
      if (onRefreshData) onRefreshData();
    } catch (e) {
      setCoursesList(defaultCourses);
      localStorage.setItem('local_courses', JSON.stringify(defaultCourses));
      setSaveSuccess('Đã khôi phục danh sách khóa học cục bộ (Offline Mode Successful)!');
      setTimeout(() => setSaveSuccess(null), 4050);
      if (onRefreshData) onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  // --- Instructors Admin Actions ---
  const handleSaveInstructor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!instructorForm.name?.trim() || !instructorForm.role?.trim()) return;

    setLoading(true);

    const finalId = editingInstructorId || 'inst_' + Date.now();
    const finalInst: Instructor = {
      id: finalId,
      name: instructorForm.name.trim(),
      role: instructorForm.role.trim(),
      company: instructorForm.company?.trim() || '',
      avatar: instructorForm.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop'
    };

    try {
      await setDoc(doc(db, 'instructors', finalId), finalInst);
      setSaveSuccess('Lưu thông tin giảng viên thành công!');
      resetInstructorForm();
      if (onRefreshData) onRefreshData();
      setTimeout(() => setSaveSuccess(null), 4000);
    } catch (e: any) {
      console.warn("Firestore save failed for instructor, falling back locally:", e);
      try {
        const local = localStorage.getItem('local_instructors');
        let list: Instructor[] = local ? JSON.parse(local) : [];
        if (editingInstructorId) {
          list = list.map(i => i.id === editingInstructorId ? finalInst : i);
        } else {
          list.push(finalInst);
        }
        localStorage.setItem('local_instructors', JSON.stringify(list));
        setInstructorsList(list);
        setSaveSuccess('Thông tin giảng viên đã lưu cục bộ (Offline Mode)!');
        resetInstructorForm();
        if (onRefreshData) onRefreshData();
        setTimeout(() => setSaveSuccess(null), 4000);
      } catch (err) {
        alert('Lỗi lưu trữ: ' + String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditInstructor = (inst: Instructor) => {
    setEditingInstructorId(inst.id);
    setInstructorForm({
      name: inst.name,
      role: inst.role,
      company: inst.company,
      avatar: inst.avatar
    });
    setInstructorSubTab('form');
  };

  const handleDeleteInstructor = async (instId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa giảng viên này không? Các khóa học đã và đang phân công giảng dạy cho giảng viên này có thể cần phải gán lại.')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'instructors', instId));
      if (onRefreshData) onRefreshData();
    } catch (e) {
      console.warn("Delete instructor failed from firestore, doing local removal.");
      const local = localStorage.getItem('local_instructors');
      if (local) {
        const list: Instructor[] = JSON.parse(local);
        const filtered = list.filter(i => i.id !== instId);
        localStorage.setItem('local_instructors', JSON.stringify(filtered));
        setInstructorsList(filtered);
      }
      if (onRefreshData) onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  const resetInstructorForm = () => {
    setEditingInstructorId(null);
    setInstructorForm({
      name: '',
      role: '',
      company: '',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop'
    });
    setInstructorSubTab('list');
  };

  const handleRestoreDefaultInstructors = async () => {
    if (!window.confirm("Bạn có muốn nạp/khôi phục toàn bộ danh sách giảng viên mẫu của AIUNI?")) return;
    setLoading(true);
    try {
      for (const item of defaultInstructors) {
        await setDoc(doc(db, 'instructors', item.id), item);
      }
      setInstructorsList(defaultInstructors);
      localStorage.setItem('local_instructors', JSON.stringify(defaultInstructors));
      setSaveSuccess('Khôi phục danh sách giảng viên mẫu thành công!');
      setTimeout(() => setSaveSuccess(null), 4000);
      if (onRefreshData) onRefreshData();
    } catch (e) {
      setInstructorsList(defaultInstructors);
      localStorage.setItem('local_instructors', JSON.stringify(defaultInstructors));
      setSaveSuccess('Khôi phục danh sách giảng viên cục bộ (Offline Mode successful)!');
      setTimeout(() => setSaveSuccess(null), 4000);
      if (onRefreshData) onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  // --- Advisors & Experts Admin Actions ---
  const handleSaveAdvisor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!advisorForm.name?.trim() || !advisorForm.role?.trim()) return;

    setLoading(true);

    const finalId = editingAdvisorId || 'adv_' + Date.now();
    const achievementsArray = advisorAchievementsText
      .split('\n')
      .map(item => item.trim())
      .filter(Boolean);

    const finalAdv: Advisor = {
      id: finalId,
      name: advisorForm.name.trim(),
      role: advisorForm.role.trim(),
      avatar: advisorForm.avatar || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop',
      type: advisorForm.type || 'expert',
      desc: advisorForm.desc?.trim() || '',
      badge: advisorForm.badge || 'Expert',
      country: advisorForm.country?.trim() || '',
      affiliation: advisorForm.affiliation?.trim() || '',
      flag: advisorForm.flag?.trim() || '',
      bio: advisorForm.bio?.trim() || '',
      achievements: achievementsArray,
      email: advisorForm.email?.trim() || '',
      linkedin: advisorForm.linkedin?.trim() || ''
    };

    try {
      await setDoc(doc(db, 'advisors', finalId), finalAdv);
      setSaveSuccess('Lưu thông tin cố vấn / chuyên gia thành công!');
      resetAdvisorForm();
      if (onRefreshData) onRefreshData();
      setTimeout(() => setSaveSuccess(null), 4000);
    } catch (e: any) {
      console.warn("Firestore save failed for advisor, falling back locally:", e);
      try {
        const local = localStorage.getItem('local_advisors');
        let list: Advisor[] = local ? JSON.parse(local) : [];
        if (editingAdvisorId) {
          list = list.map(a => a.id === editingAdvisorId ? finalAdv : a);
        } else {
          list.push(finalAdv);
        }
        localStorage.setItem('local_advisors', JSON.stringify(list));
        setAdvisorsList(list);
        setSaveSuccess('Thông tin cố vấn đã lưu cục bộ (Offline Mode)!');
        resetAdvisorForm();
        if (onRefreshData) onRefreshData();
        setTimeout(() => setSaveSuccess(null), 4000);
      } catch (err) {
        alert('Lỗi lưu trữ cục bộ: ' + String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEditAdvisor = (adv: Advisor) => {
    setEditingAdvisorId(adv.id);
    setAdvisorForm({
      name: adv.name,
      role: adv.role,
      avatar: adv.avatar,
      type: adv.type,
      desc: adv.desc || '',
      badge: adv.badge || 'Expert',
      country: adv.country || '',
      affiliation: adv.affiliation || '',
      flag: adv.flag || '',
      bio: adv.bio || '',
      email: adv.email || '',
      linkedin: adv.linkedin || ''
    });
    setAdvisorAchievementsText(adv.achievements ? adv.achievements.join('\n') : '');
    setAdvisorSubTab('form');
  };

  const handleDeleteAdvisor = async (advId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa hồ sơ cố vấn / chuyên gia này không?')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'advisors', advId));
      if (onRefreshData) onRefreshData();
    } catch (e) {
      console.warn("Delete advisor failed from firestore, doing local removal.");
      const local = localStorage.getItem('local_advisors');
      if (local) {
        const list: Advisor[] = JSON.parse(local);
        const filtered = list.filter(a => a.id !== advId);
        localStorage.setItem('local_advisors', JSON.stringify(filtered));
        setAdvisorsList(filtered);
      }
      if (onRefreshData) onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  const resetAdvisorForm = () => {
    setEditingAdvisorId(null);
    setAdvisorForm({
      name: '',
      role: '',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop',
      type: 'expert',
      desc: '',
      badge: 'Expert',
      country: '',
      affiliation: '',
      flag: '',
      bio: '',
      achievements: [],
      email: '',
      linkedin: ''
    });
    setAdvisorAchievementsText('');
    setAdvisorSubTab('list');
  };

  const handleRestoreDefaultAdvisors = async () => {
    if (!window.confirm("Bạn có muốn nạp/khôi phục toàn bộ danh sách cố vấn khoa học mẫu của AIUNI?")) return;
    setLoading(true);
    try {
      for (const item of defaultAdvisors) {
        await setDoc(doc(db, 'advisors', item.id), item);
      }
      setAdvisorsList(defaultAdvisors);
      localStorage.setItem('local_advisors', JSON.stringify(defaultAdvisors));
      setSaveSuccess('Khôi phục danh sách cố vấn mẫu thành công!');
      setTimeout(() => setSaveSuccess(null), 4000);
      if (onRefreshData) onRefreshData();
    } catch (e) {
      setAdvisorsList(defaultAdvisors);
      localStorage.setItem('local_advisors', JSON.stringify(defaultAdvisors));
      setSaveSuccess('Khôi phục danh sách cố vấn mẫu cục bộ (Offline fallback)!');
      setTimeout(() => setSaveSuccess(null), 4000);
      if (onRefreshData) onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  // ================= TESTIMONIAL HANDLERS =================
  const handleEditTestimonial = (test: Testimonial) => {
    setEditingTestimonialId(test.id);
    setTestimonialForm({
      name: test.name,
      role: test.role,
      company: test.company,
      avatar: test.avatar,
      rating: test.rating,
      quote: test.quote
    });
    setTestimonialSubTab('form');
  };

  const handleSaveTestimonial = async () => {
    if (!testimonialForm.name || !testimonialForm.quote || !testimonialForm.role || !testimonialForm.company) {
      alert('Vui lòng điền đầy đủ họ tên, chức danh, công ty và nội dung chia sẻ.');
      return;
    }
    setLoading(true);
    try {
      const testId = editingTestimonialId || 'test-' + Date.now();
      const payload: Testimonial = {
        id: testId,
        name: testimonialForm.name,
        role: testimonialForm.role,
        company: testimonialForm.company,
        avatar: testimonialForm.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&auto=format&fit=crop',
        rating: Number(testimonialForm.rating) || 5,
        quote: testimonialForm.quote
      };
      await setDoc(doc(db, 'testimonials', testId), payload);
      setEditingTestimonialId(null);
      setTestimonialForm({
        name: '',
        role: '',
        company: '',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&auto=format&fit=crop',
        rating: 5,
        quote: ''
      });
      setSaveSuccess('Lưu ý kiến học viên thành công!');
      setTimeout(() => setSaveSuccess(null), 3000);
      if (onRefreshData) onRefreshData();
    } catch (e: any) {
      alert('Lưu thất bại: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTestimonial = async (testId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa ý kiến học viên này?')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'testimonials', testId));
      setSaveSuccess('Đã xóa ý kiến học viên thành công!');
      setTimeout(() => setSaveSuccess(null), 3000);
      if (onRefreshData) onRefreshData();
    } catch (e: any) {
      alert('Xóa thất bại: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreTestimonialDefaults = async () => {
    if (!window.confirm('Bạn có muốn khôi phục danh sách ý kiến học viên mẫu mặc định từ AIUNI không? Toàn bộ danh sách hiện học viên sẽ được đặt lại theo mẫu.')) return;
    setLoading(true);
    try {
      for (const item of defaultTestimonials) {
        await setDoc(doc(db, 'testimonials', item.id), item);
      }
      setSaveSuccess('Khôi phục danh sách chia sẻ học viên mẫu thành công!');
      setTimeout(() => setSaveSuccess(null), 4000);
      if (onRefreshData) onRefreshData();
    } catch (e: any) {
      alert('Khôi phục thất bại: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Elite Partners Handlers ---
  const handleEditElitePartner = (partner: ElitePartner) => {
    setEditingElitePartnerId(partner.id);
    setElitePartnerForm({
      name: partner.name,
      desc: partner.desc,
      iconName: partner.iconName
    });
    setPartnerSubTab('form');
  };

  const handleDeleteElitePartner = async (id: string) => {
    if (!window.confirm("Bạn có tin chắc muốn xóa đối tác này?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'elite_partners', id));
      setSaveSuccess('Xóa đối tác tiêu biểu thành công!');
      setTimeout(() => setSaveSuccess(null), 3050);
    } catch (e: any) {
      alert("Xóa thất bại: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveElitePartner = async () => {
    if (!elitePartnerForm.name || !elitePartnerForm.desc) {
      alert("Vui lòng nhập tên và mô tả đối tác!");
      return;
    }
    setLoading(true);
    try {
      const id = editingElitePartnerId || `ep-${Date.now()}`;
      await setDoc(doc(db, 'elite_partners', id), {
        id,
        name: elitePartnerForm.name,
        desc: elitePartnerForm.desc,
        iconName: elitePartnerForm.iconName || 'Building'
      });
      setSaveSuccess('Lưu đối tác tiêu biểu thành công!');
      setTimeout(() => setSaveSuccess(null), 3050);
      setEditingElitePartnerId(null);
      setElitePartnerForm({ name: '', desc: '', iconName: 'Building' });
    } catch (e: any) {
      alert("Lưu thất bại: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRestorePartnerDefaults = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn nạp lại danh sách Đối tác, Liên minh học thuật, Định hướng & dải Logo mẫu? Toàn bộ các thay đổi tự thiết kế hiện tại sẽ được ghi đè.")) return;
    setLoading(true);
    try {
      // Restore elite partners
      for (const item of defaultElitePartners) {
        await setDoc(doc(db, 'elite_partners', item.id), item);
      }
      // Restore intl collabs
      for (const item of defaultInternationalCollabs) {
        await setDoc(doc(db, 'international_collabs', item.id), item);
      }
      // Restore development vectors
      for (const item of defaultDevelopmentVectors) {
        await setDoc(doc(db, 'development_vectors', item.id), item);
      }
      // Restore marquee logos
      for (const item of defaultMarqueeLogos) {
        await setDoc(doc(db, 'marquee_logos', item.id), item);
      }
      setSaveSuccess('Đã khôi phục toàn bộ dữ liệu đối tác, liên minh và logo chạy ngang mẫu mặc định thành công!');
      setTimeout(() => setSaveSuccess(null), 5000);
    } catch (e: any) {
      alert("Khôi phục danh sách đối tác mẫu thất bại: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  // --- International Collaborations Handlers ---
  const handleEditIntlCollab = (col: InternationalCollab) => {
    setEditingIntlCollabId(col.id);
    setIntlCollabForm({
      partner: col.partner,
      title: col.title,
      desc: col.desc,
      bulletinsText: (col.bulletins || []).join('\n'),
      lightBg: col.lightBg || 'from-blue-50/50 to-indigo-50/10',
      badgeColor: col.badgeColor || 'bg-blue-100 text-blue-800'
    });
    setPartnerSubTab('form');
  };

  const handleDeleteIntlCollab = async (id: string) => {
    if (!window.confirm("Bạn có tin chắc muốn xóa liên minh hợp tác này?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'international_collabs', id));
      setSaveSuccess('Xóa hợp tác quốc tế thành công!');
      setTimeout(() => setSaveSuccess(null), 3050);
    } catch (e: any) {
      alert("Xóa thất bại: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveIntlCollab = async () => {
    if (!intlCollabForm.partner || !intlCollabForm.title || !intlCollabForm.desc) {
      alert("Vui lòng nhập đối tác, tiêu đề và mô tả chính!");
      return;
    }
    setLoading(true);
    try {
      const id = editingIntlCollabId || `ic-${Date.now()}`;
      const bulletins = intlCollabForm.bulletinsText
        .split('\n')
        .map(b => b.trim())
        .filter(b => b.length > 0);

      await setDoc(doc(db, 'international_collabs', id), {
        id,
        partner: intlCollabForm.partner,
        title: intlCollabForm.title,
        desc: intlCollabForm.desc,
        bulletins,
        lightBg: intlCollabForm.lightBg || 'from-blue-50/50 to-indigo-50/10',
        badgeColor: intlCollabForm.badgeColor || 'bg-blue-100 text-blue-800'
      });
      setSaveSuccess('Lưu liên minh hợp tác hữu nghị thành công!');
      setTimeout(() => setSaveSuccess(null), 3050);
      setEditingIntlCollabId(null);
      setIntlCollabForm({
        partner: '',
        title: '',
        desc: '',
        bulletinsText: '',
        lightBg: 'from-blue-50/50 to-indigo-50/10',
        badgeColor: 'bg-blue-100 text-blue-800'
      });
    } catch (e: any) {
      alert("Lưu thất bại: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Development Vectors Handlers ---
  const handleEditDevVector = (vec: DevelopmentVector) => {
    setEditingDevVectorId(vec.id);
    setDevVectorForm({
      title: vec.title,
      desc: vec.desc,
      iconName: vec.iconName
    });
    setPartnerSubTab('form');
  };

  const handleDeleteDevVector = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa định hướng chiến lược này?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'development_vectors', id));
      setSaveSuccess('Xóa định hướng chiến lược thành công!');
      setTimeout(() => setSaveSuccess(null), 3050);
    } catch (e: any) {
      alert("Xóa thất bại: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDevVector = async () => {
    if (!devVectorForm.title || !devVectorForm.desc) {
      alert("Vui lòng nhập tiêu đề và mô tả định hướng phát triển!");
      return;
    }
    setLoading(true);
    try {
      const id = editingDevVectorId || `dv-${Date.now()}`;
      await setDoc(doc(db, 'development_vectors', id), {
        id,
        title: devVectorForm.title,
        desc: devVectorForm.desc,
        iconName: devVectorForm.iconName || 'Compass'
      });
      setSaveSuccess('Lưu định hướng chiến lược thành công!');
      setTimeout(() => setSaveSuccess(null), 3050);
      setEditingDevVectorId(null);
      setDevVectorForm({ title: '', desc: '', iconName: 'Compass' });
    } catch (e: any) {
      alert("Lưu thất bại: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Marquee Logos Handlers ---
  const handleEditMarqueeLogo = (logo: MarqueeLogo) => {
    setEditingMarqueeLogoId(logo.id);
    setMarqueeLogoForm({
      name: logo.name,
      logoUrl: logo.logoUrl
    });
    setPartnerSubTab('form');
  };

  const handleDeleteMarqueeLogo = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa logo chạy ngang này?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'marquee_logos', id));
      setSaveSuccess('Xóa Logo chạy ngang thành công!');
      setTimeout(() => setSaveSuccess(null), 3050);
    } catch (e: any) {
      alert("Xóa thất bại: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveMarqueeLogo = async () => {
    if (!marqueeLogoForm.name || !marqueeLogoForm.logoUrl) {
      alert("Vui lòng nhập tên nhận biết và đường dẫn ảnh Logo!");
      return;
    }
    setLoading(true);
    try {
      const id = editingMarqueeLogoId || `ml-${Date.now()}`;
      await setDoc(doc(db, 'marquee_logos', id), {
        id,
        name: marqueeLogoForm.name,
        logoUrl: marqueeLogoForm.logoUrl
      });
      setSaveSuccess('Lưu Logo dải chạy ngang thành công!');
      setTimeout(() => setSaveSuccess(null), 3050);
      setEditingMarqueeLogoId(null);
      setMarqueeLogoForm({ name: '', logoUrl: '' });
    } catch (e: any) {
      alert("Lưu thất bại: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const resetTestimonialForm = () => {
    setEditingTestimonialId(null);
    setTestimonialForm({
      name: '',
      role: '',
      company: '',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&auto=format&fit=crop',
      rating: 5,
      quote: ''
    });
    setTestimonialSubTab('list');
  };

  // ================= MEDIA VIDEO HANDLERS =================
  const handleEditVideo = (vid: MediaVideo) => {
    setEditingVideoId(vid.id);
    setVideoForm({
      title: vid.title,
      channel: vid.channel,
      embedUrl: vid.embedUrl,
      badge: vid.badge || '',
      desc: vid.desc,
      tags: vid.tags || [],
      channelBadge: vid.channelBadge
    });
    setVideoTagsText(vid.tags ? vid.tags.join(', ') : '');
    setMediaSubTab('form');
  };

  const handleSaveVideo = async () => {
    if (!videoForm.title || !videoForm.channel || !videoForm.embedUrl) {
      alert('Vui lòng nhập tiêu đề, nhà đài và embed URL.');
      return;
    }
    setLoading(true);
    try {
      const vidId = editingVideoId || 'vid-' + Date.now();
      const payload: MediaVideo = {
        id: vidId,
        title: videoForm.title,
        channel: videoForm.channel,
        embedUrl: videoForm.embedUrl,
        badge: videoForm.badge || '',
        desc: videoForm.desc || '',
        tags: videoTagsText ? videoTagsText.split(',').map(t => t.trim()).filter(Boolean) : [],
        channelBadge: videoForm.channelBadge || 'VTV1'
      };
      await setDoc(doc(db, 'media_videos', vidId), payload);
      setEditingVideoId(null);
      setVideoForm({ title: '', channel: '', embedUrl: '', badge: '', desc: '', tags: [], channelBadge: '' });
      setVideoTagsText('');
      setSaveSuccess('Lưu phóng sự video thành công!');
      setTimeout(() => setSaveSuccess(null), 3000);
      if (onRefreshData) onRefreshData();
    } catch (e: any) {
      alert('Lưu thất bại: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVideo = async (vidId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa phóng sự video này?')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'media_videos', vidId));
      setSaveSuccess('Đã xóa phóng sự video thành công!');
      setTimeout(() => setSaveSuccess(null), 3000);
      if (onRefreshData) onRefreshData();
    } catch (e: any) {
      alert('Xóa thất bại: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const resetVideoForm = () => {
    setEditingVideoId(null);
    setVideoForm({ title: '', channel: '', embedUrl: '', badge: '', desc: '', tags: [], channelBadge: 'VTV1' });
    setVideoTagsText('');
    setMediaSubTab('list');
  };

  // ================= HIGHLIGHTED PRESS HANDLERS =================
  const handleEditHigh = (item: HighlightedPress) => {
    setEditingHighId(item.id);
    setHighForm({
      publisher: item.publisher,
      title: item.title,
      desc: item.desc,
      url: item.url,
      badge: item.badge,
      accent: item.accent || 'border-blue-500/30 bg-blue-50/40 text-blue-700'
    });
    setMediaSubTab('form');
  };

  const handleSaveHigh = async () => {
    if (!highForm.publisher || !highForm.title || !highForm.url) {
      alert('Vui lòng điền tòa soạn, tiêu đề và link bài viết gốc.');
      return;
    }
    setLoading(true);
    try {
      const highId = editingHighId || 'press-high-' + Date.now();
      const payload: HighlightedPress = {
        id: highId,
        publisher: highForm.publisher,
        title: highForm.title,
        desc: highForm.desc || '',
        url: highForm.url,
        badge: highForm.badge || 'Tin Nổi Bật',
        accent: highForm.accent || 'border-blue-500/30 bg-blue-50/40 text-blue-700'
      };
      await setDoc(doc(db, 'media_highlighted', highId), payload);
      setEditingHighId(null);
      setHighForm({
        publisher: '',
        title: '',
        desc: '',
        url: '',
        badge: '',
        accent: 'border-blue-500/30 bg-blue-50/40 text-blue-700'
      });
      setSaveSuccess('Lưu liên kết báo chí bảo chứng thành công!');
      setTimeout(() => setSaveSuccess(null), 3000);
      if (onRefreshData) onRefreshData();
    } catch (e: any) {
      alert('Lưu thất bại: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteHigh = async (highId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa liên kết báo chí này?')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'media_highlighted', highId));
      setSaveSuccess('Đã xóa liên kết báo chí thành công!');
      setTimeout(() => setSaveSuccess(null), 3000);
      if (onRefreshData) onRefreshData();
    } catch (e: any) {
      alert('Xóa thất bại: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const resetHighForm = () => {
    setEditingHighId(null);
    setHighForm({
      publisher: '',
      title: '',
      desc: '',
      url: '',
      badge: '',
      accent: 'border-blue-500/30 bg-blue-50/40 text-blue-700'
    });
    setMediaSubTab('list');
  };

  // ================= PRESS NEWS HANDLERS =================
  const handleEditNews = (item: PressNews) => {
    setEditingNewsId(item.id);
    setNewsForm({
      publisher: item.publisher,
      title: item.title,
      url: item.url,
      description: item.description
    });
    setMediaSubTab('form');
  };

  const handleSaveNews = async () => {
    if (!newsForm.publisher || !newsForm.title || !newsForm.url) {
      alert('Vui lòng điền nhà xuất bản, tiêu đề và URL.');
      return;
    }
    setLoading(true);
    try {
      const newsId = editingNewsId || 'news-' + Date.now();
      const payload: PressNews = {
        id: newsId,
        publisher: newsForm.publisher,
        title: newsForm.title,
        url: newsForm.url,
        description: newsForm.description || ''
      };
      await setDoc(doc(db, 'media_news', newsId), payload);
      setEditingNewsId(null);
      setNewsForm({
        publisher: '',
        title: '',
        url: '',
        description: ''
      });
      setSaveSuccess('Lưu tin bài báo chí thành công!');
      setTimeout(() => setSaveSuccess(null), 3000);
      if (onRefreshData) onRefreshData();
    } catch (e: any) {
      alert('Lưu bài báo thất bại: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNews = async (newsId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóc tin báo chí bổ sung này?')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'media_news', newsId));
      setSaveSuccess('Đã xóa tin báo chí thành công!');
      setTimeout(() => setSaveSuccess(null), 3000);
      if (onRefreshData) onRefreshData();
    } catch (e: any) {
      alert('Xóa thất bại: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  const resetNewsForm = () => {
    setEditingNewsId(null);
    setNewsForm({
      publisher: '',
      title: '',
      url: '',
      description: ''
    });
    setMediaSubTab('list');
  };

  const handleRestoreMediaDefaults = async () => {
    if (!window.confirm("Bạn có muốn nạp/khôi phục toàn bộ danh sách Truyền thông & Báo chí mẫu của AIUNI? Dữ liệu hiện tại sẽ được cập nhật.")) return;
    setLoading(true);
    try {
      // Restore Videos
      for (const item of defaultVideos) {
        await setDoc(doc(db, 'media_videos', item.id), item);
      }
      // Restore Highlights
      for (const item of defaultHighlightedPress) {
        await setDoc(doc(db, 'media_highlighted', item.id), item);
      }
      // Restore general news
      for (const item of defaultPressNews) {
        await setDoc(doc(db, 'media_news', item.id), item);
      }
      setSaveSuccess('Khôi phục toàn bộ tư liệu truyền thông mẫu thành công!');
      setTimeout(() => setSaveSuccess(null), 4000);
      if (onRefreshData) onRefreshData();
    } catch (e: any) {
      alert('Lưu khôi phục mẫu thất bại: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Contacts Admin Actions ---
  const handleDeleteContact = async (contactId: string) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa lịch sử liên hệ này không?')) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'contacts', contactId));
    } catch (e) {
      console.warn("Delete of contact from firestore failed, doing local removal.");
      const local = localStorage.getItem('local_contacts');
      if (local) {
        const list: any[] = JSON.parse(local);
        const filtered = list.filter(c => c.id !== contactId);
        localStorage.setItem('local_contacts', JSON.stringify(filtered));
        setContactsList(filtered);
      }
    } finally {
      setLoading(false);
    }
  };

  // Section Ordering manipulation (Visual interactive rearrangement simulating drag-and-drop)
  const moveSection = (index: number, direction: 'up' | 'down') => {
    const updated = [...sections];
    if (direction === 'up' && index > 0) {
      const temp = updated[index];
      updated[index] = updated[index - 1];
      updated[index - 1] = temp;
    } else if (direction === 'down' && index < updated.length - 1) {
      const temp = updated[index];
      updated[index] = updated[index + 1];
      updated[index + 1] = temp;
    }
    setSections(updated);
    triggerBannerAlert("customizer");
  };

  const triggerBannerAlert = (topic: string) => {
    setSaveSuccess(topic);
    setTimeout(() => {
      setSaveSuccess(null);
    }, 4500);
  };

  // Save Dynamic Layout / Page Settings
  const saveLayoutSettings = async () => {
    setLoading(true);
    const contentPayload = {
      id: 'main',
      heroTitle,
      heroSubtitle,
      aboutTitle,
      aboutText,
      sectionOrder: sections.join(','),
      updatedAt: new Date().toISOString()
    };
    
    try {
      // Secure write to firestore
      const docRef = doc(db, 'content', 'main');
      await setDoc(docRef, contentPayload);
      triggerBannerAlert("Cập nhật giao diện & thứ tự trang thành công!");
      if (onRefreshData) onRefreshData();
    } catch (err) {
      // Fallback local save warning for sandbox guests
      console.warn("Bypassed Cloud Save. Simulating layout config updates locally.");
      localStorage.setItem('local_layout_main', JSON.stringify(contentPayload));
      triggerBannerAlert("Đăng lưu thiết kế cục bộ (Chế độ mô phỏng) thành công!");
      if (onRefreshData) onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  // --- BLOGS ACTIONS ---
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.excerpt || !blogForm.content) return;

    setLoading(true);
    const slug = blogForm.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    const blogId = editingBlogId || 'blog-' + Date.now();
    
    const blogPayload = {
      id: blogId,
      title: blogForm.title,
      slug,
      excerpt: blogForm.excerpt,
      content: blogForm.content,
      coverImage: blogForm.coverImage || 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
      date: blogForm.date || new Date().toLocaleDateString('vi-VN'),
      author: blogForm.author || 'Ban Học thuật AIUNI',
      readTime: blogForm.readTime || '6 phút đọc',
      category: blogForm.category || 'Xu hướng Công nghệ',
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'blogs', blogId), blogPayload);
      triggerBannerAlert(`Bài viết "${blogPayload.title}" đã được lưu thành công!`);
      resetBlogForm();
      if (onRefreshData) onRefreshData();
    } catch (err) {
      // Offline fallback simulator
      const local = JSON.parse(localStorage.getItem('local_blogs') || '[]');
      const filtered = local.filter((b: any) => b.id !== blogId);
      localStorage.setItem('local_blogs', JSON.stringify([...filtered, blogPayload]));
      triggerBannerAlert(`Mô phỏng: Đã lưu bài viết "${blogPayload.title}" thành công!`);
      resetBlogForm();
      if (onRefreshData) onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  const handleEditBlog = (post: BlogPost) => {
    setEditingBlogId(post.id);
    setBlogForm({
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      readTime: post.readTime,
      author: post.author,
      date: post.date
    });
    setBlogSubTab('form');
  };

  const handleDeleteBlog = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xoá bài viết này không?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'blogs', id));
      triggerBannerAlert("Đã xoá bài viết thành công!");
      if (onRefreshData) onRefreshData();
    } catch (err) {
      const local = JSON.parse(localStorage.getItem('local_blogs') || '[]');
      localStorage.setItem('local_blogs', JSON.stringify(local.filter((b: any) => b.id !== id)));
      triggerBannerAlert("Mô phỏng: Đã xoá bài viết cục bộ!");
      if (onRefreshData) onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  const resetBlogForm = () => {
    setEditingBlogId(null);
    setBlogForm({
      title: '',
      category: 'Xu hướng Công nghệ',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=600&auto=format&fit=crop',
      readTime: '6 phút đọc',
      author: 'Hội đồng học thuật AIUNI'
    });
    setBlogSubTab('list');
  };

  // --- REPORTS ACTIONS ---
  const handleSaveReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportForm.title || !reportForm.excerpt || !reportForm.content) return;

    setLoading(true);
    const slug = reportForm.title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-');
    const reportId = editingReportId || 'report-' + Date.now();

    const reportPayload = {
      id: reportId,
      title: reportForm.title,
      slug,
      excerpt: reportForm.excerpt,
      content: reportForm.content,
      coverImage: reportForm.coverImage || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
      author: reportForm.author || 'Viện Nghiên cứu AIUNI Labs',
      date: reportForm.date || new Date().toLocaleDateString('vi-VN'),
      downloadsCount: reportForm.downloadsCount || 0,
      readTime: reportForm.readTime || '15 phút đọc',
      createdAt: new Date().toISOString(),
      externalLink: reportForm.externalLink || '',
    };

    try {
      await setDoc(doc(db, 'reports', reportId), reportPayload);
      triggerBannerAlert(`Báo cáo "${reportPayload.title}" đã được đăng thành công!`);
      resetReportForm();
      if (onRefreshData) onRefreshData();
    } catch (err) {
      const local = JSON.parse(localStorage.getItem('local_reports') || '[]');
      const filtered = local.filter((r: any) => r.id !== reportId);
      localStorage.setItem('local_reports', JSON.stringify([...filtered, reportPayload]));
      triggerBannerAlert(`Mô phỏng: Đã lưu báo cáo "${reportPayload.title}" thành công!`);
      resetReportForm();
      if (onRefreshData) onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  const handleEditReport = (rep: Report) => {
    setEditingReportId(rep.id);
    setReportForm({
      title: rep.title,
      excerpt: rep.excerpt,
      content: rep.content,
      coverImage: rep.coverImage,
      author: rep.author,
      readTime: rep.readTime,
      downloadsCount: rep.downloadsCount,
      date: rep.date,
      externalLink: rep.externalLink || '',
    });
    setReportSubTab('form');
  };

  const handleDeleteReport = async (id: string) => {
    if (!confirm("Bạn có muốn xoá bài báo cáo này không?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'reports', id));
      triggerBannerAlert("Đã xoá báo cáo tuyển chọn thành công!");
      if (onRefreshData) onRefreshData();
    } catch (err) {
      const local = JSON.parse(localStorage.getItem('local_reports') || '[]');
      localStorage.setItem('local_reports', JSON.stringify(local.filter((r: any) => r.id !== id)));
      triggerBannerAlert("Mô phỏng: Đã xoá báo cáo khỏi cache!");
      if (onRefreshData) onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  const resetReportForm = () => {
    setEditingReportId(null);
    setReportForm({
      title: '',
      excerpt: '',
      content: '',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
      author: 'Viện Nghiên cứu AIUNI Labs',
      readTime: '15 phút đọc',
      externalLink: '',
    });
    setReportSubTab('list');
  };

  const handleRestoreBlogDefaults = async () => {
    if (!confirm("Bạn có chắc chắn muốn khôi phục danh sách blog tin tức mặc định không? Thao tác này sẽ ghi đè các bài viết có ID trùng khớp.")) return;
    setLoading(true);
    try {
      for (const b of defaultBlogPosts) {
        await setDoc(doc(db, 'blogs', b.id), {
          ...b,
          createdAt: b.createdAt || new Date().toISOString()
        });
      }
      triggerBannerAlert("Khôi phục danh sách bài viết blog mẫu thành công!");
      if (onRefreshData) onRefreshData();
    } catch (err) {
      console.error(err);
      localStorage.setItem('local_blogs', JSON.stringify(defaultBlogPosts));
      triggerBannerAlert("Mô phỏng: Đã lưu danh sách bài viết blog mẫu vào cache!");
      if (onRefreshData) onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreReportDefaults = async () => {
    if (!confirm("Bạn có chắc chắn muốn khôi phục danh sách Báo cáo mẫu không? Thao tác này sẽ ghi đè các báo cáo có ID trùng khớp.")) return;
    setLoading(true);
    try {
      for (const r of defaultReports as any[]) {
        await setDoc(doc(db, 'reports', r.id), {
          ...r,
          createdAt: r.createdAt || new Date().toISOString()
        });
      }
      triggerBannerAlert("Khôi phục danh sách Báo cáo mẫu thành công!");
      if (onRefreshData) onRefreshData();
    } catch (err) {
      console.error(err);
      localStorage.setItem('local_reports', JSON.stringify(defaultReports));
      triggerBannerAlert("Mô phỏng: Đã lưu danh sách Báo cáo mẫu vào cache!");
      if (onRefreshData) onRefreshData();
    } finally {
      setLoading(false);
    }
  };

  // --- ENROLLMENTS ACTIONS ---
  const handleToggleEnrollStatus = async (enrollId: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'pending' ? 'success' : 'pending';
    setLoading(true);
    try {
      await updateDoc(doc(db, 'enrollments', enrollId), { status: nextStatus });
      triggerBannerAlert("Đã cập nhật trạng thái học viên thành công!");
    } catch (err) {
      const local = JSON.parse(localStorage.getItem('local_enrollments') || '[]');
      const updated = local.map((e: any) => e.id === enrollId ? { ...e, status: nextStatus } : e);
      localStorage.setItem('local_enrollments', JSON.stringify(updated));
      triggerBannerAlert("Mô phỏng: Đã đổi trạng thái học viên thành công!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEnrollment = async (enrollId: string) => {
    if (!confirm("Bạn có chắc muốn xoá học viên này khỏi danh bạ?")) return;
    setLoading(true);
    try {
      await deleteDoc(doc(db, 'enrollments', enrollId));
      triggerBannerAlert("Đã xoá hồ sơ đăng ký thành công!");
    } catch (err) {
      const local = JSON.parse(localStorage.getItem('local_enrollments') || '[]');
      localStorage.setItem('local_enrollments', JSON.stringify(local.filter((e: any) => e.id !== enrollId)));
      triggerBannerAlert("Mô phỏng: Đã xoá dòng ghi danh!");
    } finally {
      setLoading(false);
    }
  };

  // Filtering Enrollments
  const filteredEnrollments = enrollmentsList.filter((e) => {
    const term = enrollSearch.toLowerCase();
    const matchesSearch = 
      e.studentName.toLowerCase().includes(term) ||
      e.studentEmail.toLowerCase().includes(term) ||
      e.studentPhone.toLowerCase().includes(term) ||
      e.courseId.toLowerCase().includes(term);

    const matchesFilter = 
      enrollFilterStatus === 'all' ? true : e.status === enrollFilterStatus;

    return matchesSearch && matchesFilter;
  });

  // --- ADMIN WHITELIST ACTIONS ---
  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminAddError('');
    setAdminAddSuccess('');
    
    const emailClean = newAdminEmail.trim().toLowerCase();
    if (!emailClean) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailClean)) {
      setAdminAddError('Email không đúng định thức dạng!');
      return;
    }
    
    if (emailClean === 'tuanthanhtt1305@gmail.com') {
      setAdminAddError('Email này đã là email Admin sáng lập gốc!');
      return;
    }
    
    if (adminsList.some(a => a.email === emailClean)) {
      setAdminAddError('Email này đã nằm trong danh sách Admin Whitelist!');
      return;
    }
    
    const newAdminObj: AdminWhitelist = {
      email: emailClean,
      addedBy: currentUser?.email || 'tuanthanhtt1305@gmail.com',
      createdAt: new Date().toISOString()
    };
    
    try {
      await setDoc(doc(db, 'admins', emailClean), newAdminObj);
      setAdminAddSuccess(`Đã whitelisted thành công quyền Admin cho: ${emailClean}`);
      setNewAdminEmail('');
    } catch (err: any) {
      console.warn("Could not save to Cloud Firestore admins collection directly. Falling back to local replication.", err);
      const updatedList = [...adminsList, newAdminObj];
      setAdminsList(updatedList);
      localStorage.setItem('local_whitelisted_admins', JSON.stringify(updatedList));
      setAdminAddSuccess(`[Offline App] Đã thêm quyền Admin mô phỏng cho: ${emailClean}`);
      setNewAdminEmail('');
    }
  };

  const handleRemoveAdmin = async (email: string) => {
    if (!window.confirm(`Bạn có chắc chắn muốn tước bỏ quyền Quản trị viên của email: ${email}?`)) return;
    
    try {
      await deleteDoc(doc(db, 'admins', email));
    } catch (err) {
      console.warn("Could not revoke Admin privilege from cloud Firestore, updating locally.");
      const updatedList = adminsList.filter(a => a.email !== email);
      setAdminsList(updatedList);
      localStorage.setItem('local_whitelisted_admins', JSON.stringify(updatedList));
    }
  };

  return (
    <div id="admin-dashboard-container" className="pt-24 min-h-screen bg-slate-900 text-slate-100 font-sans antialiased pb-12 selection:bg-blue-600 selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top Header Controls bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-850 p-6 rounded-2xl border border-slate-800 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer text-slate-400 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="h-5 w-5 text-blue-500" />
                <h1 className="font-display font-black text-lg md:text-xl text-slate-50">Tổ Hợp Quản Trị Hệ Thống</h1>
              </div>
              <p className="text-xs text-slate-400">Thiết lập cơ sở dữ liệu, biên tập chương trình, báo cáo và tùy biến landing page</p>
            </div>
          </div>

          {currentUser ? (
            <div className="flex items-center space-x-3.5 bg-slate-800/80 p-2.5 px-4 rounded-xl border border-slate-700 w-full sm:w-auto justify-between">
              <div className="text-left">
                <p className="text-xs font-bold truncate max-w-[150px]">{currentUser.displayName || currentUser.email}</p>
                <p className="text-[9px] uppercase tracking-widest font-black text-amber-400">
                  {isAuthorized ? 'Chủ quản Trị viên' : 'Gửi Khách (Mô phỏng)'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1 px-2 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded-md transition-colors text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Thoát</span>
              </button>
            </div>
          ) : null}
        </div>

        {/* Global Notification Success Banner */}
        {saveSuccess && (
          <div className="bg-emerald-900/90 border border-emerald-500 text-emerald-100 p-4 rounded-xl flex items-center space-x-3.5 animate-pulse">
            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
            <span className="text-xs font-semibold leading-relaxed">{saveSuccess}</span>
          </div>
        )}

        {/* Non-Admin Alert Warning if generic email is logged in */}
        {currentUser && !isAuthorized && (
          <div className="bg-amber-950/85 border border-amber-500/60 text-amber-250 p-4 rounded-xl flex items-start space-x-3.5">
            <AlertCircle className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold">Nhận dạng Khách truy cập: Hệ thống chuyển sang Chế độ Mô phỏng / Demo</p>
              <p className="text-slate-350">
                Email của bạn là <span className="font-black text-amber-300">{currentUser.email}</span>. Chỉ tài khoản admin gốc <span className="underline font-bold text-slate-100">tuanthanhtt1305@gmail.com</span> mới được phân quyền ghi thực tế lên dữ liệu đám mây Firebase. Tất cả những chỉnh sửa của bạn vẫn được lưu lại tiện lợi trên bộ nhớ trình duyệt (localStorage) để trải nghiệm không gián đoạn!
              </p>
            </div>
          </div>
        )}

        {!currentUser ? (
          /* Authentication Screen */
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 py-16 flex flex-col items-center text-center space-y-6 max-w-md mx-auto my-12">
            <div className="p-4 bg-blue-500/10 text-blue-400 rounded-3xl border border-blue-500/30">
              <Lock className="h-10 w-10 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h2 className="font-display font-bold text-xl text-slate-100">Xác thực Quyền Admin</h2>
              <p className="font-sans text-xs text-slate-400 leading-relaxed">
                Xin vui lòng đăng nhập để kiểm chứng phân quyền sửa đổi nội dung, xuất chương trình, kéo thả khối trang và quản duyệt danh bạ học viên.
              </p>
            </div>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center space-x-3 p-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 border border-blue-500/30 rounded-xl text-xs font-black tracking-wide text-white transition-all transform hover:scale-102 uppercase cursor-pointer"
            >
              {loading ? (
                <RefreshCw className="h-4 w-4 animate-spin text-white" />
              ) : (
                <>
                  <svg className="h-4.5 w-4.5 text-white fill-white shrink-0" viewBox="0 0 24 24">
                    <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.3.65 4.5 1.8l2.4-2.4C17.3 1.7 14.9 1 12.24 1A10 10 0 0 0 2.24 11a10 10 0 0 0 10 10c5.3 0 9.76-3.84 9.76-10.285c0-.665-.06-1.3-.17-1.43H12.24Z"/>
                  </svg>
                  <span>Thăng Cấp - Đăng nhập Google</span>
                </>
              )}
            </button>
            <div className="pt-2">
              <button 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-200 text-xs font-sans font-medium flex items-center space-x-1.5 transition-colors cursor-pointer"
              >
                <span>Trở lại Trang Chủ</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            </div>
          </div>
        ) : (
          /* Main Dashboard layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Sidebar Menu tabs select */}
            <div className="lg:col-span-3 bg-slate-850 p-4 rounded-2xl border border-slate-800 flex flex-col gap-1">
              <span className="text-[9px] uppercase tracking-widest font-black text-slate-500 px-3 pb-2">Bảng điều hướng</span>
              
              <button
                onClick={() => setActiveTab('content')}
                className={`flex items-center space-x-3.5 p-3 rounded-xl transition-all font-sans text-xs font-bold leading-normal text-left cursor-pointer ${
                  activeTab === 'content' 
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <Layout className="h-4.5 w-4.5" />
                <span>Tùy biến Trang (Landing-Editor)</span>
              </button>

               <button
                onClick={() => setActiveTab('blogs')}
                className={`flex items-center space-x-3.5 p-3 rounded-xl transition-all font-sans text-xs font-bold leading-normal text-left cursor-pointer ${
                  activeTab === 'blogs' 
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <FileText className="h-4.5 w-4.5" />
                <span>Biên soạn Blog Tin tức</span>
              </button>

              <button
                onClick={() => setActiveTab('reports')}
                className={`flex items-center space-x-3.5 p-3 rounded-xl transition-all font-sans text-xs font-bold leading-normal text-left cursor-pointer ${
                  activeTab === 'reports' 
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <BookOpen className="h-4.5 w-4.5" />
                <span>Báo cáo Chuyên nghiệp</span>
              </button>

              <button
                onClick={() => setActiveTab('enrollments')}
                className={`flex items-center space-x-3.5 p-3 rounded-xl transition-all font-sans text-xs font-bold leading-normal text-left cursor-pointer ${
                  activeTab === 'enrollments' 
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <Users className="h-4.5 w-4.5" />
                <span>Hồ sơ Ghi danh Học viên</span>
              </button>

              <button
                onClick={() => setActiveTab('courses')}
                className={`flex items-center space-x-3.5 p-3 rounded-xl transition-all font-sans text-xs font-bold leading-normal text-left cursor-pointer ${
                  activeTab === 'courses' 
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <GraduationCap className="h-4.5 w-4.5" />
                <span>Quản trị Khóa học (Courses)</span>
              </button>

              <button
                onClick={() => setActiveTab('instructors')}
                className={`flex items-center space-x-3.5 p-3 rounded-xl transition-all font-sans text-xs font-bold leading-normal text-left cursor-pointer ${
                  activeTab === 'instructors' 
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <UserCheck className="h-4.5 w-4.5" />
                <span>Hồ sơ Giảng viên (Instructors)</span>
              </button>

              <button
                onClick={() => setActiveTab('advisors')}
                className={`flex items-center space-x-3.5 p-3 rounded-xl transition-all font-sans text-xs font-bold leading-normal text-left cursor-pointer ${
                  activeTab === 'advisors' 
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <Users className="h-4.5 w-4.5 text-purple-400" />
                <span>Cố vấn & Chuyên gia (Advisors)</span>
              </button>

              <button
                onClick={() => setActiveTab('contacts')}
                className={`flex items-center space-x-3.5 p-3 rounded-xl transition-all font-sans text-xs font-bold leading-normal text-left cursor-pointer ${
                  activeTab === 'contacts' 
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <Mail className="h-4.5 w-4.5" />
                <span>Xem dữ liệu Liên hệ (Inquiries)</span>
              </button>

              <button
                onClick={() => setActiveTab('media')}
                className={`flex items-center space-x-3.5 p-3 rounded-xl transition-all font-sans text-xs font-bold leading-normal text-left cursor-pointer ${
                  activeTab === 'media' 
                    ? 'bg-amber-600/15 text-amber-400 border border-amber-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <Tv className="h-4.5 w-4.5 text-amber-400" />
                <span>Báo chí & Truyền thông (Media)</span>
              </button>

              <button
                onClick={() => setActiveTab('testimonials')}
                className={`flex items-center space-x-3.5 p-3 rounded-xl transition-all font-sans text-xs font-bold leading-normal text-left cursor-pointer ${
                  activeTab === 'testimonials' 
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <Users className="h-4.5 w-4.5 text-blue-400" />
                <span>Chia sẻ Người học (Testimonials)</span>
              </button>

              <button
                onClick={() => setActiveTab('partners')}
                className={`flex items-center space-x-3.5 p-3 rounded-xl transition-all font-sans text-xs font-bold leading-normal text-left cursor-pointer ${
                  activeTab === 'partners' 
                    ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                    : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <Award className="h-4.5 w-4.5 text-emerald-400" />
                <span>Đối tác & Dải Logo Chạy Ngang</span>
              </button>

              {currentUser?.email === 'tuanthanhtt1305@gmail.com' && (
                <button
                  onClick={() => setActiveTab('admins')}
                  className={`flex items-center space-x-3.5 p-3 rounded-xl transition-all font-sans text-xs font-bold leading-normal text-left cursor-pointer ${
                    activeTab === 'admins' 
                      ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30' 
                      : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="h-4.5 w-4.5" />
                  <span>Cấp Quyền Admin Whitelist</span>
                </button>
              )}

              <div className="mt-6 pt-4 border-t border-slate-800">
                <button 
                  onClick={onClose}
                  className="w-full flex items-center justify-center space-x-2 p-2 bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700/80 rounded-xl text-xs font-bold cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Xem Website Học viện</span>
                </button>
              </div>
            </div>

            {/* Right Display payload board */}
            <div className="lg:col-span-9 bg-slate-850 rounded-2xl border border-slate-800 p-6 md:p-8 space-y-6">
              
              {/* --- TAB 1: WEBSITE CONTENT GENERAL CUSTOMIZER --- */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                    <h2 className="font-display font-extrabold text-base text-slate-100 flex items-center space-x-2">
                      <Layout className="h-5 w-5 text-blue-400" />
                      <span>Công cụ biên dịch và Tùy biến Nội dung</span>
                    </h2>
                    <span className="p-1 px-2.5 bg-slate-800 border border-slate-700 text-slate-400 text-[10px] rounded-md font-sans">
                      Duy trì đồng bộ theo thời gian thực
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* Left: Input values for titles and general descriptions */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">Tóm tắt các Văn bản Landing</h3>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tiêu đề Hero Section</label>
                        <input
                          type="text"
                          value={heroTitle}
                          onChange={(e) => setHeroTitle(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500/50 focus:outline-none p-3 text-xs font-sans rounded-xl text-slate-100"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Sub-title Hero Section</label>
                        <textarea
                          rows={3}
                          value={heroSubtitle}
                          onChange={(e) => setHeroSubtitle(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500/50 focus:outline-none p-3 text-xs font-sans rounded-xl text-slate-100 leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tiêu đề About Học viện</label>
                        <input
                          type="text"
                          value={aboutTitle}
                          onChange={(e) => setAboutTitle(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500/50 focus:outline-none p-3 text-xs font-sans rounded-xl text-slate-100"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Mô tả chi tiết About</label>
                        <textarea
                          rows={5}
                          value={aboutText}
                          onChange={(e) => setAboutText(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500/50 focus:outline-none p-3 text-xs font-sans rounded-xl text-slate-100 leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Right: DRAG AND DROP STYLE - Section order customization with live shifts! */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider">Kéo thả / Tái Sắp Đặt thứ tự khối trang</h3>
                        <span className="p-1 px-2 border border-blue-500/20 bg-blue-500/5 rounded-md text-[9px] text-blue-400 font-bold uppercase tracking-wider">Custom Order</span>
                      </div>
                      
                      <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                        Sắp xếp thứ tự hiển thị của các khối cấu đới nội dung trên trang chủ. Bấm mũi tên lên/xuống để hoán đổi vị trí trực tiếp ngay lập tức.
                      </p>

                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                        {sections.map((sec, index) => (
                          <div
                            key={sec}
                            className="bg-slate-900 border border-slate-800 p-3.5 px-4 rounded-xl flex items-center justify-between text-xs"
                          >
                            <span className="font-semibold text-slate-300 font-sans">{index + 1}. {sectionNameMap[sec] || sec}</span>
                            <div className="flex items-center space-x-1 shrink-0">
                              <button
                                disabled={index === 0}
                                onClick={() => moveSection(index, 'up')}
                                className="p-1 px-2 hover:bg-slate-800 rounded text-slate-400 hover:text-blue-400 disabled:opacity-25 disabled:hover:text-slate-400 cursor-pointer"
                              >
                                <MoveUp className="h-3.5 w-3.5" />
                              </button>
                              <button
                                disabled={index === sections.length - 1}
                                onClick={() => moveSection(index, 'down')}
                                className="p-1 px-2 hover:bg-slate-800 rounded text-slate-400 hover:text-blue-400 disabled:opacity-25 disabled:hover:text-slate-400 cursor-pointer"
                              >
                                <MoveDown className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Save row block */}
                  <div className="border-t border-slate-800 pt-6 flex justify-end">
                    <button
                      onClick={saveLayoutSettings}
                      disabled={loading}
                      className="flex items-center space-x-2 p-3 px-6 bg-blue-600 hover:bg-blue-500 rounded-xl font-bold text-xs uppercase tracking-wider cursor-pointer transition-all hover:scale-103 text-white"
                    >
                      <Save className="h-4 w-4" />
                      <span>Lưu Hệ thống Giao diện</span>
                    </button>
                  </div>
                </div>
              )}

              {/* --- TAB 2: BLOG POSTS CRUD PANEL --- */}
              {activeTab === 'blogs' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                    <h2 className="font-display font-extrabold text-base text-slate-100 flex items-center space-x-2">
                      <FileText className="h-5 w-5 text-blue-400" />
                      <span>Biên tập Blog Tin tức (Chuẩn SEO) ({blogsList.length})</span>
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={handleRestoreBlogDefaults}
                        className="p-1 px-2.5 bg-indigo-950/40 text-indigo-300 border border-indigo-900/60 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                        title="Tự động nạp danh sách 3 bài viết blog mẫu chuẩn kết cấu SEO của AIUNI"
                      >
                        <RefreshCw className="h-3.5 w-3.5 mr-1" />
                        <span>Reset/Seed Mẫu</span>
                      </button>
                      <button
                        onClick={resetBlogForm}
                        className="p-1 px-2.5 bg-slate-800 text-slate-300 border border-slate-700 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Viết Bài Mới</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Form write/edit section */}
                    <form onSubmit={handleSaveBlog} className="lg:col-span-7 bg-slate-900 border border-slate-800/80 p-5 rounded-2xl space-y-4">
                      <div className="text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
                        {editingBlogId ? `Đang chỉnh sửa: ${editingBlogId}` : 'Biên soạn bài viết mới (Chuẩn SEO)'}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tiêu đề bài viết</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Phát kiến Generative AI 2026..."
                            value={blogForm.title}
                            onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Chuyên mục / Thể loại</label>
                          <select
                            value={blogForm.category}
                            onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-medium cursor-pointer"
                          >
                            <option value="Xu hướng Công nghệ">Xu hướng Công nghệ</option>
                            <option value="Mẹo Công nghệ">Mẹo & Thủ thuật</option>
                            <option value="Sự nghiệp">Định hướng Sự nghiệp</option>
                            <option value="Hành chính số">Hành chính số</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Mô tả ngắn gọn (Excerpt) - Tốt cho tìm kiếm SEO</label>
                        <input
                          type="text"
                          required
                          placeholder="Mô tả tóm lược hiển thị đầu trang, kích thước khoảng 150 ký tự..."
                          value={blogForm.excerpt}
                          onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                          className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-sans"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Ảnh nền bìa (Cover Image URL)</label>
                        <input
                          type="text"
                          placeholder="Nhập đường link ảnh hoặc chọn mẫu thư viện bên dưới"
                          value={blogForm.coverImage}
                          onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                          className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-mono"
                        />
                      </div>

                      {/* Cover Preset selectors */}
                      <div className="space-y-1.5 pt-1">
                        <p className="text-[9px] font-extrabold uppercase text-slate-500 tracking-wider">Thư viện ảnh bìa chuyên sâu công nghệ:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {coverImagePresets.map((img) => (
                            <button
                              key={img.name}
                              type="button"
                              onClick={() => setBlogForm({ ...blogForm, coverImage: img.url })}
                              className={`p-1 px-2 border text-[9px] font-sans rounded-md cursor-pointer transition-colors ${
                                blogForm.coverImage === img.url
                                  ? 'bg-blue-600 border-blue-500 text-white'
                                  : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-slate-100'
                              }`}
                            >
                              {img.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tác giả biên soạn</label>
                          <input
                            type="text"
                            placeholder="Hội đồng học thuật"
                            value={blogForm.author}
                            onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Thời gian đọc hiển thị</label>
                          <input
                            type="text"
                            placeholder="6 phút đọc"
                            value={blogForm.readTime}
                            onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex justify-between">
                          <span>Nội dung bài viết (Hỗ trợ Markdown)</span>
                          <span className="text-[9px] text-[#3B82F6] font-bold">Thực chiến SEO</span>
                        </label>
                        
                        {/* Markdown Formatting helper toolbar */}
                        <div className="flex flex-wrap gap-1 bg-slate-850 p-1.5 rounded-lg border border-slate-800">
                          <button
                            type="button"
                            onClick={() => {
                              const txt = document.getElementById('blog-content-textarea') as HTMLTextAreaElement;
                              if (txt) {
                                const start = txt.selectionStart;
                                const end = txt.selectionEnd;
                                const val = txt.value;
                                const sub = val.substring(start, end);
                                const rep = `**${sub || 'Chữ đậm'}**`;
                                setBlogForm({ ...blogForm, content: val.substring(0, start) + rep + val.substring(end) });
                                setTimeout(() => txt.focus(), 50);
                              }
                            }}
                            className="p-1 px-2 text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded font-bold cursor-pointer"
                            title="Bôi Đậm"
                          >
                            Đậm (Bold)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const txt = document.getElementById('blog-content-textarea') as HTMLTextAreaElement;
                              if (txt) {
                                const start = txt.selectionStart;
                                const end = txt.selectionEnd;
                                const val = txt.value;
                                const sub = val.substring(start, end);
                                const rep = `*${sub || 'Chữ nghiêng'}*`;
                                setBlogForm({ ...blogForm, content: val.substring(0, start) + rep + val.substring(end) });
                                setTimeout(() => txt.focus(), 50);
                              }
                            }}
                            className="p-1 px-2 text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded font-bold cursor-pointer"
                            title="In Nghiêng"
                          >
                            Nghiêng (Italic)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const txt = document.getElementById('blog-content-textarea') as HTMLTextAreaElement;
                              if (txt) {
                                const start = txt.selectionStart;
                                const end = txt.selectionEnd;
                                const val = txt.value;
                                const sub = val.substring(start, end);
                                const rep = `\n## ${sub || 'Tiêu đề đề mục'}\n`;
                                setBlogForm({ ...blogForm, content: val.substring(0, start) + rep + val.substring(end) });
                                setTimeout(() => txt.focus(), 50);
                              }
                            }}
                            className="p-1 px-2 text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded font-bold cursor-pointer"
                            title="Tiêu đề đề mục"
                          >
                            Đề mục (H2)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const url = window.prompt("Nhập link liên kết (URL):", "https://");
                              if (url !== null) {
                                const txt = document.getElementById('blog-content-textarea') as HTMLTextAreaElement;
                                if (txt) {
                                  const start = txt.selectionStart;
                                  const end = txt.selectionEnd;
                                  const val = txt.value;
                                  const sub = val.substring(start, end);
                                  const rep = `[${sub || 'Tên liên kết'}](${url})`;
                                  setBlogForm({ ...blogForm, content: val.substring(0, start) + rep + val.substring(end) });
                                  setTimeout(() => txt.focus(), 50);
                                }
                              }
                            }}
                            className="p-1 px-2 text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded font-bold cursor-pointer"
                            title="Thêm liên kết"
                          >
                            Liên kết (Link)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const url = window.prompt("Nhập URL ảnh nội dung trực quan:", "https://images.unsplash.com/photo-...");
                              if (url !== null) {
                                const txt = document.getElementById('blog-content-textarea') as HTMLTextAreaElement;
                                if (txt) {
                                  const start = txt.selectionStart;
                                  const end = txt.selectionEnd;
                                  const val = txt.value;
                                  const sub = val.substring(start, end);
                                  const rep = `![${sub || 'Chú thích ảnh'}](${url})`;
                                  setBlogForm({ ...blogForm, content: val.substring(0, start) + rep + val.substring(end) });
                                  setTimeout(() => txt.focus(), 50);
                                }
                              }
                            }}
                            className="p-1 px-2 text-[10px] bg-[#3B82F6]/20 border border-[#3B82F6]/35 hover:bg-[#3B82F6]/30 text-blue-400 hover:text-blue-350 rounded font-bold cursor-pointer"
                            title="Chèn ảnh vào bài viết"
                          >
                            🖼️ Chèn Ảnh (Image URL)
                          </button>
                        </div>

                        <textarea
                          id="blog-content-textarea"
                          rows={8}
                          required
                          placeholder="Viết nội dung phong phú bám sát chuẩn SEO..."
                          value={blogForm.content}
                          onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                          className="w-full bg-slate-850 border border-slate-800 p-3 text-xs rounded-lg text-slate-100 font-mono leading-relaxed"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        {editingBlogId && (
                          <button
                            type="button"
                            onClick={resetBlogForm}
                            className="text-slate-400 hover:text-slate-200 text-xs font-semibold cursor-pointer"
                          >
                            Hủy sửa đổi
                          </button>
                        )}
                        <button
                          type="submit"
                          disabled={loading}
                          className="ml-auto p-2.5 px-6 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-black tracking-wider uppercase text-white cursor-pointer transition-all"
                        >
                          {editingBlogId ? 'Lưu bài viết' : 'Đăng bài viết'}
                        </button>
                      </div>
                    </form>

                    {/* Right list entries view */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="text-xs font-black text-slate-500 uppercase tracking-wider pb-1">Các bài đã lưu ({blogsList.length})</div>
                      
                      <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                        {blogsList.length > 0 ? (
                          blogsList.map((post) => (
                            <div
                              key={post.id}
                              className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="min-w-0">
                                <p className="font-bold text-slate-200 truncate">{post.title}</p>
                                <p className="text-[10px] text-slate-400">{post.category} • {post.date}</p>
                              </div>
                              <div className="shrink-0 flex items-center space-x-1.5">
                                <button
                                  onClick={() => handleEditBlog(post)}
                                  className="p-1.5 hover:bg-slate-800 text-blue-400 rounded cursor-pointer"
                                  title="Chỉnh sửa bài"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteBlog(post.id)}
                                  className="p-1.5 hover:bg-slate-800 text-red-400 hover:text-red-300 rounded cursor-pointer"
                                  title="Xoá bài viết"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-10 bg-slate-900 border border-dashed border-slate-800 rounded-xl text-slate-500">
                            Chưa có dữ liệu bài viết tùy chỉnh. Hãy đăng bài viết đầu tiên của bạn!
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* --- TAB 3: REPORTS CRUD MANAGER --- */}
              {activeTab === 'reports' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                    <h2 className="font-display font-extrabold text-base text-slate-100 flex items-center space-x-2">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                      <span>Các Báo Cáo Chuyên Nghiệp (Whitepapers) ({reportsList.length})</span>
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={handleRestoreReportDefaults}
                        className="p-1 px-2.5 bg-indigo-950/40 text-indigo-300 border border-indigo-900/60 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                        title="Tự động nạp danh sách 2 báo cáo mẫu chuẩn chuyên nghiệp của AIUNI"
                      >
                        <RefreshCw className="h-3.5 w-3.5 mr-1" />
                        <span>Reset/Seed Mẫu</span>
                      </button>
                      <button
                        onClick={resetReportForm}
                        className="p-1 px-2.5 bg-slate-800 text-slate-300 border border-slate-700 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Đăng Báo Cáo Mới</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Form write/edit section */}
                    <form onSubmit={handleSaveReport} className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                      <div className="text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
                        {editingReportId ? `Đang sửa báo cáo: ${editingReportId}` : 'Biên soạn ấn bản báo cáo mới'}
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tiêu đề báo cáo</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Báo cáo chuyển đổi số Quốc gia bằng AI..."
                          value={reportForm.title}
                          onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                          className="w-full bg-slate-855 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-medium font-display"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Mô tả tóm tắt nội dung báo cáo</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Phân tích chi tiết rủi ro và chỉ số tài chính ROI..."
                          value={reportForm.excerpt}
                          onChange={(e) => setReportForm({ ...reportForm, excerpt: e.target.value })}
                          className="w-full bg-slate-855 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Đơn vị chủ trì / Tác giả</label>
                          <input
                            type="text"
                            value={reportForm.author}
                            onChange={(e) => setReportForm({ ...reportForm, author: e.target.value })}
                            className="w-full bg-slate-855 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Độ dài dự kiến</label>
                          <input
                            type="text"
                            placeholder="32 trang"
                            value={reportForm.readTime}
                            onChange={(e) => setReportForm({ ...reportForm, readTime: e.target.value })}
                            className="w-full bg-slate-855 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Số lượt tải mặc định</label>
                          <input
                            type="number"
                            value={reportForm.downloadsCount || 0}
                            onChange={(e) => setReportForm({ ...reportForm, downloadsCount: Number(e.target.value) })}
                            className="w-full bg-slate-855 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Ảnh minh họa báo cáo (Cover Image)</label>
                        <input
                          type="text"
                          value={reportForm.coverImage}
                          onChange={(e) => setReportForm({ ...reportForm, coverImage: e.target.value })}
                          className="w-full bg-slate-855 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-mono"
                        />
                      </div>

                      {/* Cover presets reports */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {coverImagePresets.slice(1, 4).map((img) => (
                          <button
                            key={img.name}
                            type="button"
                            onClick={() => setReportForm({ ...reportForm, coverImage: img.url })}
                            className={`p-1 px-2 border text-[9px] font-sans rounded-md cursor-pointer transition-colors ${
                              reportForm.coverImage === img.url
                                ? 'bg-blue-600 border-blue-500 text-white'
                                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-slate-100'
                            }`}
                          >
                            {img.name}
                          </button>
                        ))}
                      </div>

                      {/* External Link addition for reports */}
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Đường dẫn liên kết ngoài (External Link) - Click để nhảy đến Báo cáo gốc</label>
                        <input
                          type="text"
                          placeholder="e.g. https://drive.google.com/file/... hoặc link bài đăng PDF"
                          value={reportForm.externalLink || ''}
                          onChange={(e) => setReportForm({ ...reportForm, externalLink: e.target.value })}
                          className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-mono focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex justify-between">
                          <span>Nội dung tóm tắt chi tiết (Hỗ trợ Markdown)</span>
                        </label>

                        {/* Report Markdown helper toolbar */}
                        <div className="flex flex-wrap gap-1 bg-slate-850 p-1.5 rounded-lg border border-slate-800 mb-1.5">
                          <button
                            type="button"
                            onClick={() => {
                              const txt = document.getElementById('report-content-textarea') as HTMLTextAreaElement;
                              if (txt) {
                                const start = txt.selectionStart;
                                const end = txt.selectionEnd;
                                const val = txt.value;
                                const sub = val.substring(start, end);
                                const rep = `**${sub || 'Chữ đậm'}**`;
                                setReportForm({ ...reportForm, content: val.substring(0, start) + rep + val.substring(end) });
                                setTimeout(() => txt.focus(), 50);
                              }
                            }}
                            className="p-1 px-2 text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded font-bold cursor-pointer"
                            title="Bôi Đậm"
                          >
                            Đâm (Bold)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const txt = document.getElementById('report-content-textarea') as HTMLTextAreaElement;
                              if (txt) {
                                const start = txt.selectionStart;
                                const end = txt.selectionEnd;
                                const val = txt.value;
                                const sub = val.substring(start, end);
                                const rep = `*${sub || 'Chữ nghiêng'}*`;
                                setReportForm({ ...reportForm, content: val.substring(0, start) + rep + val.substring(end) });
                                setTimeout(() => txt.focus(), 50);
                              }
                            }}
                            className="p-1 px-2 text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded font-bold cursor-pointer"
                            title="In Nghiêng"
                          >
                            Nghiêng (Italic)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const txt = document.getElementById('report-content-textarea') as HTMLTextAreaElement;
                              if (txt) {
                                const start = txt.selectionStart;
                                const end = txt.selectionEnd;
                                const val = txt.value;
                                const sub = val.substring(start, end);
                                const rep = `\n## ${sub || 'Phần mục tiêu đề'}\n`;
                                setReportForm({ ...reportForm, content: val.substring(0, start) + rep + val.substring(end) });
                                setTimeout(() => txt.focus(), 50);
                              }
                            }}
                            className="p-1 px-2 text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded font-bold cursor-pointer"
                            title="Đề mục lớn"
                          >
                            Đề mục (H2)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const url = window.prompt("Nhập link liên kết (URL):", "https://");
                              if (url !== null) {
                                const txt = document.getElementById('report-content-textarea') as HTMLTextAreaElement;
                                if (txt) {
                                  const start = txt.selectionStart;
                                  const end = txt.selectionEnd;
                                  const val = txt.value;
                                  const sub = val.substring(start, end);
                                  const rep = `[${sub || 'Tên văn bản'}](${url})`;
                                  setReportForm({ ...reportForm, content: val.substring(0, start) + rep + val.substring(end) });
                                  setTimeout(() => txt.focus(), 50);
                                }
                              }
                            }}
                            className="p-1 px-2 text-[10px] bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded font-bold cursor-pointer"
                            title="Thêm liên kết"
                          >
                            Liên kết (Link)
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const url = window.prompt("Nhập đường dẫn URL ảnh minh họa phụ hoặc biểu đồ số liệu:", "https://images.unsplash.com/.../chart");
                              if (url !== null) {
                                const txt = document.getElementById('report-content-textarea') as HTMLTextAreaElement;
                                if (txt) {
                                  const start = txt.selectionStart;
                                  const end = txt.selectionEnd;
                                  const val = txt.value;
                                  const sub = val.substring(start, end);
                                  const rep = `![${sub || 'Biểu đồ số liệu'}]( ${url} )`;
                                  setReportForm({ ...reportForm, content: val.substring(0, start) + rep + val.substring(end) });
                                  setTimeout(() => txt.focus(), 50);
                                }
                              }
                            }}
                            className="p-1 px-2 text-[10px] bg-blue-600/15 border border-blue-500/30 text-blue-400 hover:text-blue-300 hover:bg-blue-600/25 rounded font-black cursor-pointer"
                            title="Chèn ảnh vào báo cáo"
                          >
                            📊 Chèn Biểu đồ / Ảnh
                          </button>
                        </div>

                        <textarea
                          id="report-content-textarea"
                          rows={6}
                          required
                          placeholder="Nội dung, mục lục, hoặc phân tích chi tiết của tập báo cáo chuyên môn..."
                          value={reportForm.content}
                          onChange={(e) => setReportForm({ ...reportForm, content: e.target.value })}
                          className="w-full bg-slate-850 border border-slate-800 p-3 text-xs rounded-lg text-slate-100 font-mono leading-relaxed focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div className="flex justify-between items-center pt-2">
                        {editingReportId && (
                          <button
                            type="button"
                            onClick={resetReportForm}
                            className="text-slate-400 hover:text-slate-200 text-xs font-semibold cursor-pointer"
                          >
                            Hủy sửa đổi
                          </button>
                        )}
                        <button
                          type="submit"
                          disabled={loading}
                          className="ml-auto p-2.5 px-6 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-black tracking-wider uppercase text-white cursor-pointer transition-all"
                        >
                          {editingReportId ? 'Lưu báo cáo' : 'Đăng báo cáo'}
                        </button>
                      </div>
                    </form>

                    {/* Right side list entries */}
                    <div className="lg:col-span-5 space-y-3">
                      <div className="text-xs font-black text-slate-500 uppercase tracking-wider pb-1">Tuyển tập báo cáo ({reportsList.length})</div>
                      
                      <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
                        {reportsList.length > 0 ? (
                          reportsList.map((rep) => (
                            <div
                              key={rep.id}
                              className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center justify-between gap-3 text-xs"
                            >
                              <div className="min-w-0">
                                <p className="font-bold text-slate-200 truncate">{rep.title}</p>
                                <p className="text-[10px] text-slate-400">{rep.author} • {rep.downloadsCount} tải về</p>
                              </div>
                              <div className="shrink-0 flex items-center space-x-1.5">
                                <button
                                  onClick={() => handleEditReport(rep)}
                                  className="p-1.5 hover:bg-slate-800 text-blue-400 rounded cursor-pointer"
                                  title="Chỉnh sửa báo cáo"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteReport(rep.id)}
                                  className="p-1.5 hover:bg-slate-800 text-red-400 hover:text-red-300 rounded cursor-pointer"
                                  title="Xoá báo cáo"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-10 bg-slate-900 border border-dashed border-slate-800 rounded-xl text-slate-500">
                            Chưa có báo cáo nghiên cứu dạng số hóa.
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* --- TAB 4: ENROLLMENTS TRACKERS SHEET --- */}
              {activeTab === 'enrollments' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-800 gap-4">
                    <h2 className="font-display font-extrabold text-base text-slate-100 flex items-center space-x-2">
                      <Users className="h-5 w-5 text-blue-400" />
                      <span>Hồ sơ Ghi danh Học viên ({filteredEnrollments.length})</span>
                    </h2>

                    {/* Filter status buttons */}
                    <div className="flex bg-slate-900 p-1 rounded-xl text-[10px] font-black tracking-wider uppercase border border-slate-800">
                      {(['all', 'pending', 'success'] as const).map((stat) => (
                        <button
                          key={stat}
                          onClick={() => setEnrollFilterStatus(stat)}
                          className={`p-1.5 px-3.5 rounded-lg font-bold transition-all cursor-pointer ${
                            enrollFilterStatus === stat
                              ? 'bg-blue-600 text-white'
                              : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {stat === 'all' ? 'Tất cả' : stat === 'pending' ? 'Chưa xét duyệt' : 'Đã kích hoạt'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Enrollments Search Box */}
                  <div className="relative w-full bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex items-center text-xs">
                    <Search className="h-4 w-4 ml-3.5 text-slate-400 shrink-0" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm học viên theo tên, email, phone, hoặc khóa học ID..."
                      value={enrollSearch}
                      onChange={(e) => setEnrollSearch(e.target.value)}
                      className="w-full bg-transparent p-3.5 focus:outline-none text-slate-100 font-sans"
                    />
                  </div>

                  {/* Dynamic Spreadsheet of Registrants */}
                  <div className="overflow-x-auto bg-slate-900 rounded-2xl border border-slate-800 max-h-[450px]">
                    <table className="w-full text-left text-xs font-sans">
                      <thead className="bg-[#122254]/5 z-10 border-b border-slate-800 uppercase text-[9px] font-black text-slate-500 tracking-wider">
                        <tr>
                          <th className="p-4">Ngày đăng ký</th>
                          <th className="p-4">Học viên</th>
                          <th className="p-4">Khóa học</th>
                          <th className="p-4">Trạng thái</th>
                          <th className="p-4 text-right">Thao tác</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/80">
                        {filteredEnrollments.length > 0 ? (
                          filteredEnrollments.map((enroll) => {
                            const courseName = defaultCourses.find(c => c.id === enroll.courseId)?.title || enroll.courseId;
                            return (
                              <tr key={enroll.id} className="hover:bg-slate-850/50 transition-colors">
                                <td className="p-4 whitespace-nowrap text-slate-400">
                                  {enroll.enrollmentDate}
                                </td>
                                <td className="p-4">
                                  <div className="space-y-1">
                                    <p className="font-extrabold text-slate-200">{enroll.studentName}</p>
                                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-slate-400 font-semibold">
                                      <span className="flex items-center space-x-1">
                                        <Mail className="h-3 w-3 inline" />
                                        <span>{enroll.studentEmail}</span>
                                      </span>
                                      <span>•</span>
                                      <span className="flex items-center space-x-1">
                                        <Phone className="h-3 w-3 inline" />
                                        <span>{enroll.studentPhone}</span>
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 max-w-[200px] truncate" title={courseName}>
                                  {courseName}
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                  <span className={`inline-flex items-center space-x-1.5 p-1 px-2.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                    enroll.status === 'success'
                                      ? 'bg-emerald-990 bg-opacity-30 border border-emerald-500/20 text-emerald-400'
                                      : 'bg-amber-990 bg-opacity-30 border border-amber-500/20 text-amber-400'
                                  }`}>
                                    {enroll.status === 'success' ? (
                                      <>
                                        <CheckCircle className="h-3 w-3" />
                                        <span>Đã ký nhận</span>
                                      </>
                                    ) : (
                                      <>
                                        <Clock className="h-3 w-3" />
                                        <span>Chờ duyệt</span>
                                      </>
                                    )}
                                  </span>
                                </td>
                                <td className="p-4 text-right whitespace-nowrap space-x-1">
                                  <button
                                    onClick={() => handleToggleEnrollStatus(enroll.id, enroll.status)}
                                    className={`p-1.5 border hover:text-white rounded-lg cursor-pointer ${
                                      enroll.status === 'success'
                                        ? 'bg-slate-800 border-slate-700 text-slate-350 hover:bg-slate-750'
                                        : 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500'
                                    }`}
                                    title={enroll.status === 'success' ? 'Đặt về danh sách chờ duyệt' : 'Kích hoạt duyệt hồ sơ'}
                                  >
                                    <Check className="h-3.5 w-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEnrollment(enroll.id)}
                                    className="p-1.5 bg-slate-800 border border-slate-700 hover:border-red-500 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg cursor-pointer"
                                    title="Xoá học viên"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan={5} className="p-8 text-center text-slate-500 font-semibold">
                              Không tìm thấy dữ liệu học viên đăng ký chương trình học.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- TAB 5: MANAGED ADMIN WHITELIST --- */}
              {activeTab === 'admins' && currentUser?.email === 'tuanthanhtt1305@gmail.com' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                    <h2 className="font-display font-extrabold text-base text-slate-100 flex items-center space-x-2">
                      <ShieldCheck className="h-5 w-5 text-blue-400" />
                      <span>Quản lý Danh sách Whitelist Admin</span>
                    </h2>
                    <span className="p-1 px-2.5 bg-blue-900 bg-opacity-20 border border-blue-800 text-blue-400 text-[10px] rounded-md font-sans">
                      Quyền năng Tối cao (Super Admin)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Add Admin form */}
                    <form onSubmit={handleAddAdmin} className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-2xl space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider pb-2 border-b border-slate-800/80">Thêm Quản trị viên mới</h3>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Nhập Email cần cấp quyền</label>
                        <input
                          type="email"
                          required
                          placeholder="e.g. email-admin-moi@gmail.com"
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          className="w-full bg-slate-850 border border-slate-800 p-3 text-xs rounded-lg text-slate-100"
                        />
                      </div>

                      {adminAddError && (
                        <p className="text-red-400 text-xs flex items-center space-x-1 font-semibold">
                          <AlertCircle className="h-3.5 w-3.5" />
                          <span>{adminAddError}</span>
                        </p>
                      )}

                      {adminAddSuccess && (
                        <p className="text-emerald-400 text-xs flex items-center space-x-1 font-semibold">
                          <CheckCircle className="h-3.5 w-3.5" />
                          <span>{adminAddSuccess}</span>
                        </p>
                      )}

                      <button
                        type="submit"
                        className="w-full p-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-black uppercase text-white cursor-pointer transition-all flex items-center justify-center space-x-1.5"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Ủy quyền Admin</span>
                      </button>
                      
                      <p className="text-[10px] text-slate-500 leading-normal font-sans">
                        ⚠️ <strong>Lưu ý bảo mật:</strong> Quản trị viên được ủy quyền có toàn quyền thêm mới, chỉnh sửa, và xóa bỏ blogs, báo cáo, cũng như xét duyệt học viên. Hãy xác minh kỹ email trước khi cấp quyền.
                      </p>
                    </form>

                    {/* Whitelisted Admins Spreadsheet */}
                    <div className="lg:col-span-7 space-y-3">
                      <h3 className="text-xs font-black uppercase text-slate-400 tracking-wider pb-1">Danh sách Admin Hiện tại ({adminsList.length})</h3>
                      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
                        <table className="w-full text-left text-xs font-sans">
                          <thead className="bg-[#122254]/5 border-b border-slate-800/80 uppercase text-[9px] font-black text-slate-500 tracking-wider">
                            <tr>
                              <th className="p-3">Email Quản trị</th>
                              <th className="p-3">Thao tác xóa</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/65">
                            {adminsList.length > 0 ? (
                              adminsList.map((adm) => (
                                <tr key={adm.email} className="hover:bg-slate-850/50 transition-colors">
                                  <td className="p-3">
                                    <div>
                                      <p className="font-extrabold text-slate-200">{adm.email}</p>
                                      <p className="text-[9px] text-slate-500">Được cấp quyền bởi {adm.addedBy}</p>
                                    </div>
                                  </td>
                                  <td className="p-3">
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveAdmin(adm.email)}
                                      className="p-1 px-2.5 bg-slate-800/80 hover:bg-red-500/10 border border-slate-750 hover:border-red-500 text-red-400 hover:text-red-300 rounded text-[10px] font-bold cursor-pointer transition-all"
                                    >
                                      Tước quyền
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan={2} className="p-6 text-center text-slate-500 font-semibold">
                                  Chưa có quản trị viên bổ sung whitelisted nào. Chỉ có Admin gốc tuanthanhtt1305@gmail.com!
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* --- TAB 6: COURSES CATALOG MANAGER --- */}
              {activeTab === 'courses' && (
                <div className="space-y-6 text-left text-slate-100">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                    <h2 className="font-display font-extrabold text-base text-slate-100 flex items-center space-x-2">
                      <GraduationCap className="h-5 w-5 text-blue-400" />
                      <span>Quản lý Chương trình & Học trình Đào tạo AI ({coursesList.length})</span>
                    </h2>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={handleRestoreDefaultCourses}
                        className="p-1 px-2.5 bg-indigo-950/40 text-indigo-300 border border-indigo-900/60 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                        title="Tự động nạp danh sách 5 khóa học chuẩn mẫu của AIUNI"
                      >
                        <RefreshCw className="h-3.5 w-3.5 mr-1" />
                        <span>Reset/Seed Mẫu</span>
                      </button>
                      <button
                        onClick={resetCourseForm}
                        className="p-1 px-2.5 bg-slate-805 text-slate-300 border border-slate-700 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center space-x-1 cursor-pointer"
                      >
                        <Plus className="h-3.5 w-3.5" />
                        <span>Thêm Khóa Học</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* Course Form Editor */}
                    <form onSubmit={handleSaveCourse} className="lg:col-span-7 bg-slate-900 border border-slate-800/80 p-5 rounded-2xl space-y-4">
                      <div className="text-xs font-bold text-slate-300 border-b border-slate-800 pb-2">
                        {editingCourseId ? `Đang sửa mã khóa: ${editingCourseId}` : 'Biên soạn thông tin Học trình / Khóa học mới'}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-left block">Tên khóa học (Title)</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Masterclass ChatGPT & Trợ lý ảo AI..."
                            value={courseForm.title}
                            onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-medium"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide font-mono text-left block">Đường dẫn tĩnh (Slug - Để trống tự sinh)</label>
                          <input
                            type="text"
                            placeholder="e.g. masterclass-chatgpt-ai-assistant"
                            value={courseForm.slug}
                            onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-mono"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-left block">Phân mục (Category)</label>
                          <select
                            value={courseForm.category}
                            onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value as any })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-medium cursor-pointer"
                          >
                            <option value="basics">Khóa học Phổ cập (Basics)</option>
                            <option value="ml">Phân tích dữ liệu & ML (Machine Learning)</option>
                            <option value="advanced">Công nghệ Số & Blockchain (Advanced)</option>
                            <option value="enterprise">Đào tạo Doanh nghiệp (Enterprise)</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-left block">Giảng viên / Diễn giả</label>
                          <select
                            value={instructorId}
                            onChange={(e) => setInstructorId(e.target.value)}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-medium cursor-pointer"
                          >
                            {(instructorsList.length > 0 ? instructorsList : defaultInstructors).map(inst => (
                              <option key={inst.id} value={inst.id}>{inst.name} - {inst.role} ({inst.company || 'AIUNI'})</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-left block">Thời lượng kéo dài</label>
                          <input
                            type="text"
                            placeholder="e.g. 6 tuần (12 giờ học)"
                            value={courseForm.duration}
                            onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-medium"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-left block">Số bài giảng</label>
                          <input
                            type="number"
                            value={courseForm.lessonsCount}
                            onChange={(e) => setCourseForm({ ...courseForm, lessonsCount: parseInt(e.target.value) || 0 })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-left block">Đánh giá (Rating)</label>
                          <input
                            type="number"
                            step="0.1"
                            max="5"
                            value={courseForm.rating}
                            onChange={(e) => setCourseForm({ ...courseForm, rating: parseFloat(e.target.value) || 0 })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-left block">Số lượt đánh giá</label>
                          <input
                            type="number"
                            value={courseForm.reviewsCount}
                            onChange={(e) => setCourseForm({ ...courseForm, reviewsCount: parseInt(e.target.value) || 0 })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-left block">Học phí gốc (VNĐ)</label>
                          <input
                            type="number"
                            value={courseForm.price}
                            onChange={(e) => setCourseForm({ ...courseForm, price: parseInt(e.target.value) || 0 })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-mono"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-left block">Học phí KM (VNĐ)</label>
                          <input
                            type="number"
                            placeholder="Không"
                            value={courseForm.discountPrice || ''}
                            onChange={(e) => setCourseForm({ ...courseForm, discountPrice: e.target.value ? parseInt(e.target.value) : undefined })}
                            className="w-full bg-[#121c40] bg-opacity-35 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-mono"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-left block">Mô tả tóm tắt khóa học</label>
                        <input
                          type="text"
                          required
                          placeholder="Mô tả tóm lược hiển thị tại danh thiếp..."
                          value={courseForm.description}
                          onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                          className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-left block">Giới thiệu lộ trình chi tiết</label>
                        <textarea
                          placeholder="Lợi ích học viên, những giá trị nhận được, kiến thức thực học..."
                          rows={3}
                          value={courseForm.longDescription}
                          onChange={(e) => setCourseForm({ ...courseForm, longDescription: e.target.value })}
                          className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-sans"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide text-left block">Ảnh nền khóa học (Course Image URL)</label>
                        <input
                          type="text"
                          placeholder="Nhập đường dẫn link ảnh bên ngoài hoặc chọn mẫu thư viện bên dưới"
                          value={courseForm.image}
                          onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                          className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-mono"
                        />
                      </div>

                      {/* Course Presets */}
                      <div className="space-y-1.5 pt-1">
                        <p className="text-[9px] font-extrabold uppercase text-slate-500 tracking-wider text-left block">Thư viện ảnh học viện:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {courseImagePresets.map((img) => (
                            <button
                              key={img.name}
                              type="button"
                              onClick={() => setCourseForm({ ...courseForm, image: img.url })}
                              className={`p-1 px-2 border text-[9px] font-sans rounded-md cursor-pointer transition-all ${
                                courseForm.image === img.url
                                  ? 'bg-blue-600 border-blue-500 text-white'
                                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {img.name}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center justify-between text-left block">
                            <span>Tags tìm kiếm (dấu phẩy)</span>
                            <span className="text-[8px] text-slate-550 normal-case">ví dụ: AI, ChatGPT</span>
                          </label>
                          <input
                            type="text"
                            placeholder="ChatGPT, Prompt Engineering"
                            value={courseTagsText}
                            onChange={(e) => setCourseTagsText(e.target.value)}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-sans"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center justify-between text-left block">
                            <span>Lợi thế nổi bật (Mỗi dòng một ý)</span>
                          </label>
                          <textarea
                            placeholder="Tặng tài khoản VIP Premium&#10;Hỗ trợ 24/7"
                            rows={2}
                            value={courseFeaturesText}
                            onChange={(e) => setCourseFeaturesText(e.target.value)}
                            className="w-full bg-slate-850 border border-slate-800 p-2 text-xs rounded-lg text-slate-100 font-sans"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide flex items-center justify-between text-left block">
                          <span>Giáo trình (Syllabus - Tách dòng bằng phím Enter, phân ý bằng dấu gạch đứng | )</span>
                          <span className="text-[8px] text-blue-400 normal-case underline cursor-pointer hover:text-blue-300" onClick={() => {
                            setCourseSyllabusText("Tuần 1: Giới thiệu ChatGPT | Cài đặt tài khoản, Nguyên lý Generative AI\nTuần 2: Viết câu lệnh Prompt tối ưu | Khung phân tích PEER, Kỹ thuật tinh chỉnh tham số\nTuần 3: Tự động hóa công việc với AI | Tích hợp Google Sheets, Tạo chatbot tự động chăm sóc");
                          }}>Nạp mẫu nhanh</span>
                        </label>
                        <textarea
                          placeholder="Tuần 1: Phổ cập Trí tuệ Nhân tạo | Phân biệt AI/ML/DL, Tố chất kỷ nguyên số&#10;Tuần 2: Chuyên gia Prompt Engineering | Thực hành viết lệnh tối ưu"
                          rows={3}
                          value={courseSyllabusText}
                          onChange={(e) => setCourseSyllabusText(e.target.value)}
                          className="w-full bg-slate-850 border border-slate-800 p-2.5 text-xs rounded-lg text-slate-100 font-mono"
                        />
                      </div>

                      <div className="flex gap-2.5 pt-1">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 p-3 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs rounded-xl cursor-pointer transition-all flex items-center justify-center space-x-1.5"
                        >
                          <Save className="h-4 w-4" />
                          <span>{editingCourseId ? 'Cập Nhật Khóa Học' : 'Tạo Khóa Học Ở Hệ Thống'}</span>
                        </button>
                        
                        {editingCourseId && (
                          <button
                            type="button"
                            onClick={resetCourseForm}
                            className="p-3 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl text-xs font-bold px-4 transition-colors cursor-pointer"
                          >
                            Hủy
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Course List inside columns */}
                    <div className="lg:col-span-5 space-y-4 text-left">
                      <div className="relative w-full bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex items-center text-xs">
                        <Search className="h-3.5 w-3.5 ml-3.5 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          placeholder="Tìm nhanh theo tựa đề, tags..."
                          value={courseSearch}
                          onChange={(e) => setCourseSearch(e.target.value)}
                          className="w-full bg-transparent p-2.5 focus:outline-none text-slate-100 font-sans"
                        />
                      </div>

                      <div className="bg-slate-900 rounded-2xl border border-slate-800 max-h-[580px] overflow-y-auto divide-y divide-slate-800/80">
                        {coursesList.filter(c => c.title.toLowerCase().includes(courseSearch.toLowerCase()) || c.tags?.some(t => t.toLowerCase().includes(courseSearch.toLowerCase()))).length > 0 ? (
                          coursesList.filter(c => c.title.toLowerCase().includes(courseSearch.toLowerCase()) || c.tags?.some(t => t.toLowerCase().includes(courseSearch.toLowerCase()))).map((course) => (
                            <div key={course.id} className="p-4 flex gap-3.5 items-start hover:bg-slate-850/30 transition-colors">
                              <img src={course.image} alt="" className="h-10 w-16 rounded-lg object-cover bg-slate-850 shrink-0 border border-slate-800" />
                              <div className="min-w-0 flex-1 space-y-1">
                                <span className="text-[7.5px] font-black uppercase text-blue-400 bg-blue-950 px-1.5 py-0.5 rounded-full inline-block mb-0.5">
                                  {course.category}
                                </span>
                                <h4 className="text-xs font-black text-slate-150 leading-snug line-clamp-2">{course.title}</h4>
                                <p className="text-[10px] text-slate-400">Giảng viên: <strong className="text-slate-300">{course.instructor?.name}</strong></p>
                                <div className="text-[10px] text-slate-400 flex items-center space-x-1.5 font-mono">
                                  <span>{course.price === 0 ? 'Miễn phí' : `${course.price.toLocaleString('vi-VN')}đ`}</span>
                                </div>
                                <div className="flex items-center space-x-1.5 pt-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleEditCourse(course)}
                                    className="p-1 px-2 bg-slate-850 hover:bg-slate-750 text-blue-450 hover:text-blue-300 border border-slate-850 hover:border-slate-700 rounded text-[9px] font-black uppercase cursor-pointer"
                                  >
                                    Sửa
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteCourse(course.id)}
                                    className="p-1 px-2 bg-slate-850 hover:bg-red-500/15 text-red-400 hover:text-red-300 border border-slate-850 hover:border-red-500/20 rounded text-[9px] font-black uppercase cursor-pointer"
                                  >
                                    Xóa
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="p-8 text-center text-slate-550 text-xs font-semibold">Tủ sách trống rỗng. Hãy tạo khóa học đầu tiên!</div>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )}

              {/* --- TAB 7: CONTACT REQUESTS STORAGE SHEET --- */}
              {activeTab === 'contacts' && (
                <div className="space-y-6 text-left text-slate-100">
                  <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                    <h2 className="font-display font-extrabold text-base text-slate-100 flex items-center space-x-2">
                      <Mail className="h-5 w-5 text-blue-400" />
                      <span>Danh sách Dữ liệu Liên hệ & Tư vấn ({contactsList.length})</span>
                    </h2>
                    <span className="p-1 px-2.5 bg-cyan-950/40 border border-cyan-800 text-cyan-400 text-[10px] rounded-md font-sans">
                      Hệ cơ sở dữ liệu đồng bộ Firestore
                    </span>
                  </div>

                  <div className="space-y-4">
                    {/* Search panel contacts */}
                    <div className="relative w-full bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex items-center text-xs text-slate-200">
                      <Search className="h-4 w-4 ml-3.5 text-slate-400 shrink-0" />
                      <input
                        type="text"
                        placeholder="Tìm kiếm theo họ tên, email, số điện thoại hoặc từ khóa tin nhắn..."
                        value={contactSearch}
                        onChange={(e) => setContactSearch(e.target.value)}
                        className="w-full bg-transparent p-3.5 focus:outline-none text-slate-100 font-sans"
                      />
                    </div>

                    <div className="overflow-x-auto bg-slate-900 rounded-2xl border border-slate-800">
                      <table className="w-full text-left text-xs font-sans">
                        <thead className="bg-[#122254]/5 border-b border-slate-800 uppercase text-[9px] font-black text-slate-500 tracking-wider">
                          <tr>
                            <th className="p-4">Thời gian nhận</th>
                            <th className="p-4">Khách hàng</th>
                            <th className="p-4">Nội dung tin nhắn / Yêu cầu tư vấn</th>
                            <th className="p-4 text-right">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/80">
                          {contactsList.filter(c => 
                            (c.name?.toLowerCase().includes(contactSearch.toLowerCase()) || false) ||
                            (c.email?.toLowerCase().includes(contactSearch.toLowerCase()) || false) ||
                            (c.phone?.toLowerCase().includes(contactSearch.toLowerCase()) || false) ||
                            (c.message?.toLowerCase().includes(contactSearch.toLowerCase()) || false)
                          ).length > 0 ? (
                            contactsList.filter(c => 
                              (c.name?.toLowerCase().includes(contactSearch.toLowerCase()) || false) ||
                              (c.email?.toLowerCase().includes(contactSearch.toLowerCase()) || false) ||
                              (c.phone?.toLowerCase().includes(contactSearch.toLowerCase()) || false) ||
                              (c.message?.toLowerCase().includes(contactSearch.toLowerCase()) || false)
                            ).map((contact) => (
                              <tr key={contact.id} className="hover:bg-slate-850/40 transition-colors">
                                <td className="p-4 whitespace-nowrap text-slate-400">
                                  {contact.createdAt ? (
                                    contact.createdAt.seconds ? new Date(contact.createdAt.seconds * 1000).toLocaleString('vi-VN') : 
                                    typeof contact.createdAt === 'string' ? contact.createdAt : new Date(contact.createdAt).toLocaleString('vi-VN')
                                  ) : 'Ngoại tuyến'}
                                </td>
                                <td className="p-4 whitespace-nowrap">
                                  <div className="space-y-1">
                                    <p className="font-extrabold text-slate-200">{contact.name}</p>
                                    <div className="space-y-0.5 text-[10px] text-slate-400 font-medium">
                                      <p className="flex items-center space-x-1.5">
                                        <Mail className="h-3 w-3 inline text-slate-500" />
                                        <span>{contact.email}</span>
                                      </p>
                                      <p className="flex items-center space-x-1.5">
                                        <Phone className="h-3 w-3 inline text-slate-500" />
                                        <span>{contact.phone}</span>
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="p-4 text-slate-300 max-w-sm whitespace-pre-line leading-relaxed text-xs">
                                  {contact.message}
                                </td>
                                <td className="p-4 text-right whitespace-nowrap">
                                  <button
                                    onClick={() => handleDeleteContact(contact.id)}
                                    className="p-1.5 bg-slate-800 border border-slate-755 hover:border-red-500 text-red-400 hover:text-red-300 hover:bg-red-550/10 rounded-lg cursor-pointer transition-all"
                                    title="Xóa thông tin này"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={4} className="p-8 text-center text-slate-500 font-semibold">
                                Chưa có tin nhắn nào được ghi nhận.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB 8: INSTRUCTORS PROFILE MANAGEMENT --- */}
              {activeTab === 'instructors' && (
                <div className="space-y-6 text-left text-slate-100 font-sans">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-800 gap-4">
                    <div className="space-y-1">
                      <h2 className="font-display font-extrabold text-base text-slate-100 flex items-center space-x-2">
                        <UserCheck className="h-5 w-5 text-blue-400" />
                        <span>Hệ thống Quản trị Đội ngũ Giảng viên & Chuyên gia AI ({instructorsList.length})</span>
                      </h2>
                      <p className="text-xs text-slate-400">Danh mục giảng viên được liên kết trực tiếp với chương trình đào tạo của AIUNI.</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={handleRestoreDefaultInstructors}
                        className="p-1 px-3 bg-indigo-950/45 text-indigo-300 border border-indigo-900/60 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center cursor-pointer transition-all"
                        title="Tự động đồng bộ các giảng viên mặc định chuẩn học viện"
                      >
                        <RefreshCw className="h-3 w-3 mr-1.5" />
                        <span>Nạp lại Giảng viên Mẫu</span>
                      </button>
                      <button
                        type="button"
                        onClick={resetInstructorForm}
                        className="p-1 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center cursor-pointer transition-all"
                      >
                        <Plus className="h-3 w-3 mr-1.5" />
                        <span>Tạo Mới</span>
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* LEFT PANEL: Save/Edit Form */}
                    <form onSubmit={handleSaveInstructor} className="lg:col-span-5 bg-slate-900 border border-slate-800/80 p-5 rounded-2xl space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b border-slate-800/60">
                        <h3 className="text-xs font-black uppercase text-indigo-400 tracking-wider flex items-center space-x-1.5">
                          <Plus className="h-3.5 w-3.5" />
                          <span>{editingInstructorId ? "Cập nhật Hồ sơ" : "Thêm Giảng viên Mới"}</span>
                        </h3>
                        {editingInstructorId && (
                          <button
                            type="button"
                            onClick={resetInstructorForm}
                            className="text-[10px] text-slate-400 hover:text-slate-200 uppercase font-bold text-right"
                          >
                            Hủy Sửa
                          </button>
                        )}
                      </div>

                      <div className="space-y-4 text-xs">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Họ và tên giảng viên *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. TS. Nguyễn Văn A"
                            value={instructorForm.name || ''}
                            onChange={(e) => setInstructorForm({ ...instructorForm, name: e.target.value })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 rounded-lg text-slate-100 font-medium focus:border-indigo-600 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Học vị / Học hàm / Vị trí *</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. AI Solutions Architect, Senior Data Scientist..."
                            value={instructorForm.role || ''}
                            onChange={(e) => setInstructorForm({ ...instructorForm, role: e.target.value })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 rounded-lg text-slate-100 font-medium focus:border-indigo-600 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Tổ chức / Xuất thân</label>
                          <input
                            type="text"
                            placeholder="e.g. Ex-Google, Microsoft, Viện Nghiên cứu AIUNI..."
                            value={instructorForm.company || ''}
                            onChange={(e) => setInstructorForm({ ...instructorForm, company: e.target.value })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 rounded-lg text-slate-100 font-medium focus:border-indigo-600 focus:outline-none"
                          />
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Đường dẫn ảnh chân dung (Avatar URL)</label>
                          <input
                            type="text"
                            placeholder="https://..."
                            value={instructorForm.avatar || ''}
                            onChange={(e) => setInstructorForm({ ...instructorForm, avatar: e.target.value })}
                            className="w-full bg-slate-850 border border-slate-800 p-2.5 rounded-lg text-slate-100 font-mono focus:border-indigo-600 focus:outline-none"
                          />

                          {/* Avatar quick selectors */}
                          <div className="space-y-1">
                            <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Chọn nhanh ảnh mẫu chân dung:</span>
                            <div className="flex flex-wrap gap-2.5 pt-1">
                              {[
                                { name: 'Nữ 1', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop' },
                                { name: 'Nam 1', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop' },
                                { name: 'Nữ 2', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop' },
                                { name: 'Nam 2', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop' },
                                { name: 'Tech 1', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=256&auto=format&fit=crop' }
                              ].map((p, pIdx) => (
                                <button
                                  key={pIdx}
                                  type="button"
                                  onClick={() => setInstructorForm({ ...instructorForm, avatar: p.url })}
                                  className={`p-1 px-2 border text-[9px] font-bold rounded-md transition-all flex items-center space-x-1 ${
                                    instructorForm.avatar === p.url
                                      ? 'bg-blue-600 border-blue-500 text-white animate-pulse'
                                      : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-200'
                                  }`}
                                >
                                  <img src={p.url} alt="" className="w-3.5 h-3.5 rounded-full object-cover mr-1 shrink-0" />
                                  <span>{p.name}</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {instructorForm.avatar && (
                          <div className="pt-2 flex items-center space-x-3 bg-slate-850/60 p-3 rounded-xl border border-slate-800/50">
                            <img src={instructorForm.avatar} alt="Preview" className="h-12 w-12 rounded-full object-cover border border-slate-700 shrink-0" onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" }} />
                            <div>
                              <p className="font-extrabold text-slate-250 font-sans">{instructorForm.name || "Chưa nhập tên"}</p>
                              <p className="text-[10px] text-slate-400 font-medium">{instructorForm.role || "Chưa nhập vai trò"} - <span className="text-indigo-405">{instructorForm.company || "AIUNI Academy"}</span></p>
                            </div>
                          </div>
                        )}

                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full p-2.5 bg-blue-600 hover:bg-blue-555 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg shadow-blue-900/10 transition-all flex items-center justify-center space-x-1.5"
                          >
                            <Save className="h-4 w-4" />
                            <span>{editingInstructorId ? "Cập Nhật Profile" : "Lưu Giảng Viên"}</span>
                          </button>
                        </div>
                      </div>
                    </form>

                    {/* RIGHT PANEL: Search & grid list */}
                    <div className="lg:col-span-7 space-y-4">
                      {/* Search Bar */}
                      <div className="relative w-full bg-slate-900 rounded-xl border border-slate-800 overflow-hidden flex items-center text-xs text-slate-200">
                        <Search className="h-4 w-4 ml-3.5 text-slate-400 shrink-0" />
                        <input
                          type="text"
                          placeholder="Tìm kiếm giảng viên theo tên, học vị hoặc đơn vị..."
                          value={instructorSearch}
                          onChange={(e) => setInstructorSearch(e.target.value)}
                          className="w-full bg-transparent p-3 focus:outline-none text-slate-150 font-sans"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(instructorsList.length > 0 ? instructorsList : defaultInstructors)
                          .filter(inst => 
                            inst.name?.toLowerCase().includes(instructorSearch.toLowerCase()) || 
                            inst.role?.toLowerCase().includes(instructorSearch.toLowerCase()) ||
                            inst.company?.toLowerCase().includes(instructorSearch.toLowerCase())
                          ).length > 0 ? (
                            (instructorsList.length > 0 ? instructorsList : defaultInstructors)
                              .filter(inst => 
                                inst.name?.toLowerCase().includes(instructorSearch.toLowerCase()) || 
                                inst.role?.toLowerCase().includes(instructorSearch.toLowerCase()) ||
                                inst.company?.toLowerCase().includes(instructorSearch.toLowerCase())
                              ).map((inst) => {
                                // Compute how many courses are assigned to this instructor dynamically
                                const assignedCourses = coursesList.filter(c => c.instructor?.id === inst.id || c.instructor?.name?.toLowerCase() === inst.name?.toLowerCase());
                                return (
                                  <div key={inst.id} className="bg-slate-900 border border-slate-800/80 hover:border-slate-700 p-4 rounded-2xl flex flex-col justify-between space-y-4 text-left transition-all relative overflow-hidden group">
                                    <div className="flex items-start gap-3">
                                      <img
                                        src={inst.avatar}
                                        alt={inst.name}
                                        className="h-11 w-11 rounded-full object-cover bg-slate-800 shrink-0 border border-slate-800 group-hover:scale-105 transition-transform"
                                        onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop" }}
                                      />
                                      <div className="min-w-0 flex-1 space-y-1">
                                        <h4 className="text-xs font-black text-slate-150 leading-relaxed truncate">{inst.name}</h4>
                                        <p className="text-[10px] text-slate-400 font-sans leading-snug line-clamp-2">{inst.role}</p>
                                        <span className="text-[9px] font-bold text-indigo-400 tracking-wide font-mono block">@ {inst.company || 'AIUNI Academy'}</span>
                                      </div>
                                    </div>

                                    {/* Link & stats */}
                                    <div className="flex justify-between items-center pt-2.5 border-t border-slate-800/60 text-[10px]">
                                      <div className="flex items-center space-x-1 text-slate-400 bg-slate-850/60 p-1 px-2.5 rounded-full border border-slate-800/40">
                                        <GraduationCap className="h-3.5 w-3.5 text-emerald-400" />
                                        <span>Giảng dạy: <strong className="text-slate-200 ml-0.5">{assignedCourses.length} lớp</strong></span>
                                      </div>

                                      <div className="flex items-center space-x-1.5 shrink-0">
                                        <button
                                          type="button"
                                          onClick={() => handleEditInstructor(inst)}
                                          className="p-1 px-2.5 bg-slate-850 hover:bg-slate-750 text-blue-450 hover:text-blue-300 border border-slate-800/40 rounded-lg font-bold uppercase transition-all text-[9px] cursor-pointer"
                                        >
                                          Sửa
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteInstructor(inst.id)}
                                          className="p-1 px-2.5 bg-slate-850 hover:bg-rose-950/30 text-rose-450 hover:text-rose-300 border border-slate-800/40 hover:border-rose-950 rounded-lg font-bold uppercase transition-all text-[9px] cursor-pointer"
                                        >
                                          Xóa
                                        </button>
                                      </div>
                                    </div>

                                    {assignedCourses.length > 0 && (
                                      <div className="p-1.5 bg-slate-950/20 border-t border-slate-900 rounded-lg text-[8.5px] text-slate-500 font-sans leading-normal">
                                        <span className="font-extrabold uppercase tracking-wide text-indigo-400 block mb-0.5 text-[8px]">Học phần phụ trách:</span>
                                        <span className="line-clamp-1 italic text-slate-400">{assignedCourses.map(c => c.title).join(', ')}</span>
                                      </div>
                                    )}
                                  </div>
                                );
                              })
                          ) : (
                            <div className="col-span-2 p-10 text-center text-slate-500 font-semibold border border-dashed border-slate-800 rounded-2xl">
                              Không có kết quả. Hãy nạp lại giảng viên mẫu hoặc bấm nút tạo mới.
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TAB 9: ADVISORS & SCIENTIFIC BOARD MANAGEMENT --- */}
              {activeTab === 'advisors' && (
                <div className="space-y-6 text-left text-slate-100 font-sans">
                  
                  {/* Title Bar */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b border-slate-800 gap-4">
                    <div className="space-y-1">
                      <h2 className="font-display font-extrabold text-base text-slate-100 flex items-center space-x-2">
                        <Users className="h-5 w-5 text-purple-400" />
                        <span>Hệ thống Quản trị Ban Cố vấn & Chuyên gia AI ({advisorsList.length})</span>
                      </h2>
                      <p className="text-xs text-slate-400">Tùy chỉnh thông tin lý lịch khoa học, thành tựu, và thông tin liên hệ của Hội đồng Cố vấn quốc tế.</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleRestoreDefaultAdvisors}
                      disabled={loading}
                      className="px-3 py-1.5 bg-purple-900/40 hover:bg-purple-900 border border-purple-500/30 text-purple-300 font-sans text-xs font-bold rounded-lg transition-all flex items-center space-x-1 cursor-pointer"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Nạp / Khôi phục ban đầu</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT COLUMN: THE FORM */}
                    <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 space-y-5">
                      <div className="pb-3 border-b border-slate-800">
                        <h3 className="font-display text-xs font-black text-slate-100 uppercase tracking-widest">
                          {editingAdvisorId ? 'Cập nhật Profile cố vấn' : 'Thêm mới Cố vấn / Chuyên gia'}
                        </h3>
                        <p className="text-[10px] text-slate-500 font-sans">Điền đầy đủ thông tin để hiển thị ngoài trang chủ.</p>
                      </div>

                      <form onSubmit={handleSaveAdvisor} className="space-y-4 text-xs font-sans">
                        
                        {/* Name & Role */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Họ tên chuyên gia <strong className="text-red-500">*</strong></label>
                            <input
                              type="text"
                              required
                              value={advisorForm.name || ''}
                              onChange={(e) => setAdvisorForm({...advisorForm, name: e.target.value})}
                              placeholder="Ví dụ: Prof. David Harrison"
                              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-medium text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Nhóm phân loại <strong className="text-red-500">*</strong></label>
                            <select
                              value={advisorForm.type || 'expert'}
                              onChange={(e) => setAdvisorForm({...advisorForm, type: e.target.value as 'expert' | 'advisor'})}
                              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-medium text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                            >
                              <option value="expert">Chuyên gia Giảng dạy (Expert)</option>
                              <option value="advisor">Hội đồng Cố vấn Quốc tế (Advisor)</option>
                            </select>
                          </div>
                        </div>

                        {/* Title Role & Badge */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Chức danh / Vai trò học thuật <strong className="text-red-500">*</strong></label>
                            <input
                              type="text"
                              required
                              value={advisorForm.role || ''}
                              onChange={(e) => setAdvisorForm({...advisorForm, role: e.target.value})}
                              placeholder="Ví dụ: Cố vấn trưởng kiến trúc học thuật"
                              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-medium text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Nhãn Badge phụ (Optional)</label>
                            <input
                              type="text"
                              value={advisorForm.badge || ''}
                              onChange={(e) => setAdvisorForm({...advisorForm, badge: e.target.value})}
                              placeholder="Ví dụ: Academic, Strategy, Research"
                              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-medium text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                          </div>
                        </div>

                        {/* Flag & Country (Only for Advisor) */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Quốc gia (Country)</label>
                            <input
                              type="text"
                              value={advisorForm.country || ''}
                              onChange={(e) => setAdvisorForm({...advisorForm, country: e.target.value})}
                              placeholder="Ví dụ: Hoa Kỳ"
                              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-medium text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Cờ Flag Emoji</label>
                            <input
                              type="text"
                              value={advisorForm.flag || ''}
                              onChange={(e) => setAdvisorForm({...advisorForm, flag: e.target.value})}
                              placeholder="Ví dụ: 🇺🇸"
                              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-medium text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Tổ chức/Nơi công tác</label>
                            <input
                              type="text"
                              value={advisorForm.affiliation || ''}
                              onChange={(e) => setAdvisorForm({...advisorForm, affiliation: e.target.value})}
                              placeholder="Ví dụ: MIT CSAIL, Toronto University"
                              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-medium text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                          </div>
                        </div>

                        {/* Contacts (Email & LinkedIn) */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Hòm thư Email công vụ</label>
                            <input
                              type="email"
                              value={advisorForm.email || ''}
                              onChange={(e) => setAdvisorForm({...advisorForm, email: e.target.value})}
                              placeholder="scholar@aiuni.edu.vn"
                              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-medium text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Đường dẫn LinkedIn</label>
                            <input
                              type="url"
                              value={advisorForm.linkedin || ''}
                              onChange={(e) => setAdvisorForm({...advisorForm, linkedin: e.target.value})}
                              placeholder="https://linkedin.com/in/username"
                              className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-medium text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                          </div>
                        </div>

                        {/* Image Avatar Selector */}
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block">Đường dẫn ảnh đại diện (URL)</label>
                          <input
                            type="text"
                            value={advisorForm.avatar || ''}
                            onChange={(e) => setAdvisorForm({...advisorForm, avatar: e.target.value})}
                            placeholder="Nhập link HTTPS ảnh hoặc chọn nhanh ảnh mẫu bên dưới"
                            className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-medium text-[11px] text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                          
                          {/* Quick selectors for Avatar */}
                          <div className="space-y-1">
                            <span className="text-[9px] text-slate-500 block">Chọn nhanh ảnh đại diện mẫu:</span>
                            <div className="flex flex-wrap gap-2">
                              {[
                                { n: 'Nam 1 (Kính)', url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop' },
                                { n: 'Nữ 1 (Nghiêm túc)', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop' },
                                { n: 'Nam 2 (Trẻ)', url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&auto=format&fit=crop' },
                                { n: 'Nam 3 (Doanh nhân)', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop' },
                                { n: 'Nữ 2 (Tươi cười)', url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop' },
                                { n: 'Quốc Tế (Senior MIT)', url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop' }
                              ].map((ava, ix) => (
                                <button
                                  key={ix}
                                  type="button"
                                  onClick={() => setAdvisorForm({...advisorForm, avatar: ava.url})}
                                  className={`p-1 px-2 text-[9px] rounded-lg font-bold border transition-all ${
                                    advisorForm.avatar === ava.url 
                                      ? 'bg-purple-600/20 border-purple-500 text-purple-300 shadow'
                                      : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-slate-250'
                                  }`}
                                >
                                  {ava.n}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Brief Summary (Short Bio block) */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Mô tả ngắn (Hiển thị ngoài danh sách)</label>
                          <textarea
                            rows={2}
                            value={advisorForm.desc || ''}
                            onChange={(e) => setAdvisorForm({...advisorForm, desc: e.target.value})}
                            placeholder="Ví dụ: Cố vấn chuyển đổi số quốc gia, hỗ trợ xây dựng lộ trình tích hợp công nghệ AI cho hơn 50 Tập đoàn đa ngành."
                            className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-medium text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>

                        {/* Long Biography - parsed detail bio */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Lý lịch chi tiết & Kinh nghiệm giảng dạy (Bio trong Popup Profile)</label>
                          <textarea
                            rows={3}
                            value={advisorForm.bio || ''}
                            onChange={(e) => setAdvisorForm({...advisorForm, bio: e.target.value})}
                            placeholder="Nhập tiểu sử công bố khoa học, những cột mốc vàng đã đạt được trong sự nghiệp nghiên cứu hoặc cống hiến thực tiễn..."
                            className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-medium text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>

                        {/* Achievements - line items */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Cột mốc thành tựu (Mỗi dòng là 1 thành tựu)</label>
                          <textarea
                            rows={3}
                            value={advisorAchievementsText}
                            onChange={(e) => setAdvisorAchievementsText(e.target.value)}
                            placeholder="Đạt danh hiệu nhà nghiên cứu thâm niên thuộc IEEE...&#10;Xuất bản hơn 15 bài báo uy tín tại hội nghị NeurIPS...&#10;Hơn 12 năm xây dựng kiến trúc AI tại thung lũng Silicon..."
                            className="w-full bg-slate-950 border border-slate-800 p-2.5 rounded-xl font-medium text-slate-100 focus:outline-none focus:border-purple-500 transition-colors"
                          />
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center space-x-3 pt-2">
                          <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold p-3 rounded-xl hover:from-purple-500 hover:to-indigo-500 transition-all font-sans text-xs flex justify-center items-center cursor-pointer shadow-lg active:scale-95"
                          >
                            {loading ? 'Đang thực thi...' : (editingAdvisorId ? 'Cập nhật Profile' : 'Tạo Hồ sơ Cố vấn mới')}
                          </button>

                          {editingAdvisorId && (
                            <button
                              type="button"
                              onClick={resetAdvisorForm}
                              className="p-3 bg-slate-800 hover:bg-slate-755 text-slate-300 font-bold rounded-xl transition-all font-sans text-xs cursor-pointer"
                            >
                              Hủy bỏ
                            </button>
                          )}
                        </div>

                      </form>

                    </div>

                    {/* RIGHT COLUMN: SEARCH & GRID OF CURRENT ADVISORS */}
                    <div className="lg:col-span-12 xl:col-span-7 space-y-4">
                      
                      {/* Search Bar / Options */}
                      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row gap-3 items-center justify-between">
                        <div className="relative w-full sm:max-w-xs">
                          <input
                            type="search"
                            value={advisorSearch}
                            onChange={(e) => setAdvisorSearch(e.target.value)}
                            placeholder="Tìm kiếm cố vấn, vai trò, quốc gia..."
                            className="bg-slate-950 text-xs font-sans text-slate-205 border border-slate-800 w-full pl-8 pr-4 p-2 rounded-xl focus:outline-none focus:border-purple-500"
                          />
                        </div>

                        <div className="text-[10px] text-slate-400 font-sans">
                          Tìm thấy <strong className="text-purple-400 font-mono text-xs">{
                            (advisorsList.length > 0 ? advisorsList : defaultAdvisors)
                              .filter(adv => 
                                adv.name?.toLowerCase().includes(advisorSearch.toLowerCase()) || 
                                adv.role?.toLowerCase().includes(advisorSearch.toLowerCase()) ||
                                adv.country?.toLowerCase().includes(advisorSearch.toLowerCase()) ||
                                adv.affiliation?.toLowerCase().includes(advisorSearch.toLowerCase())
                              ).length
                          }</strong> cố vấn khoa học
                        </div>
                      </div>

                      {/* Advisors list grid view */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {(advisorsList.length > 0 ? advisorsList : defaultAdvisors)
                          .filter(adv => 
                            adv.name?.toLowerCase().includes(advisorSearch.toLowerCase()) || 
                            adv.role?.toLowerCase().includes(advisorSearch.toLowerCase()) ||
                            adv.country?.toLowerCase().includes(advisorSearch.toLowerCase()) ||
                            adv.affiliation?.toLowerCase().includes(advisorSearch.toLowerCase())
                          ).length > 0 ? (
                            (advisorsList.length > 0 ? advisorsList : defaultAdvisors)
                              .filter(adv => 
                                adv.name?.toLowerCase().includes(advisorSearch.toLowerCase()) || 
                                adv.role?.toLowerCase().includes(advisorSearch.toLowerCase()) ||
                                adv.country?.toLowerCase().includes(advisorSearch.toLowerCase()) ||
                                adv.affiliation?.toLowerCase().includes(advisorSearch.toLowerCase())
                              ).map((adv) => (
                                <div key={adv.id} className="bg-slate-900 border border-slate-800/80 hover:border-slate-700 p-4 rounded-2xl flex flex-col justify-between space-y-4 text-left transition-all relative overflow-hidden group">
                                  
                                  <div className="flex items-start gap-4">
                                    <div className="relative h-12 w-12 rounded-xl overflow-hidden bg-slate-850 shrink-0 border border-slate-800">
                                      <img
                                        src={adv.avatar}
                                        alt={adv.name}
                                        className="h-full w-full object-cover rounded-xl"
                                        onError={(e) => { (e.target as any).src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop" }}
                                      />
                                      {adv.flag && (
                                        <span className="absolute -top-1 -left-1 bg-white p-0.5 rounded-full shadow text-[10px]">
                                          {adv.flag}
                                        </span>
                                      )}
                                    </div>

                                    <div className="min-w-0 flex-1 space-y-1 font-sans">
                                      <div className="flex items-center space-x-1.5">
                                        <h4 className="text-xs font-black text-slate-100 truncate">{adv.name}</h4>
                                        <span className={`text-[8px] font-black uppercase tracking-wide px-1.5 rounded-md ${
                                          adv.type === 'expert' 
                                            ? 'bg-blue-900/40 text-blue-300 border border-blue-500/20' 
                                            : 'bg-purple-900/40 text-purple-300 border border-purple-500/20'
                                        }`}>
                                          {adv.type === 'expert' ? 'Chuyên Gia' : 'Cố Vấn'}
                                        </span>
                                      </div>
                                      <p className="text-[10px] text-purple-300 font-bold leading-snug line-clamp-1">{adv.role}</p>
                                      <span className="text-[9px] font-medium text-slate-400 block line-clamp-1 truncate" title={adv.affiliation}>
                                        {adv.affiliation || 'AIUNI Department'}
                                      </span>
                                    </div>
                                  </div>

                                  {/* short desc preview */}
                                  <div className="bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
                                    <p className="text-[10.5px] text-slate-450 font-sans leading-relaxed line-clamp-2">
                                      {adv.desc || adv.bio || 'Chưa định cấu hình lý lịch khoa học vắn tắt.'}
                                    </p>
                                  </div>

                                  {/* stats footer with edit actions */}
                                  <div className="flex justify-between items-center pt-2.5 border-t border-slate-800/60 text-[10px]">
                                    <div className="flex items-center space-x-1 text-slate-400 bg-slate-850/60 p-1 px-2.5 rounded-full border border-slate-850">
                                      <Award className="h-3.5 w-3.5 text-amber-500" />
                                      <span>Mốc thành tựu: <strong className="text-slate-200 ml-0.5">{adv.achievements?.length || 0}</strong></span>
                                    </div>

                                    <div className="flex items-center space-x-1.5 shrink-0">
                                      <button
                                        type="button"
                                        onClick={() => handleEditAdvisor(adv)}
                                        className="p-1 px-2.5 bg-slate-850 hover:bg-slate-750 text-blue-450 hover:text-blue-300 border border-slate-850 rounded-lg font-bold uppercase transition-all text-[9px] cursor-pointer"
                                      >
                                        Sửa
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => handleDeleteAdvisor(adv.id)}
                                        className="p-1 px-2.5 bg-slate-850 hover:bg-rose-955/30 text-rose-450 hover:text-rose-300 border border-slate-850 rounded-lg font-bold uppercase transition-all text-[9px] cursor-pointer"
                                      >
                                        Xóa
                                      </button>
                                    </div>
                                  </div>

                                </div>
                              ))
                          ) : (
                            <div className="col-span-2 p-10 text-center text-slate-500 font-semibold border border-dashed border-slate-800 rounded-2xl font-sans">
                              Không có kết quả. Hãy nạp lại danh sách cố vấn mẫu hoặc bấm nút tạo mới.
                            </div>
                          )}
                      </div>

                    </div>

                  </div>

                </div>
              )}

              {/* --- TAB: MEDIA MENTIONS CUSTOMIZER (PHÓNG SỰ VIDEO & BÁO CHÍ) --- */}
              {activeTab === 'media' && (
                <div className="space-y-8 text-left text-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                    <div>
                      <h2 className="font-display font-extrabold text-lg text-slate-100 flex items-center space-x-2">
                        <Tv className="h-5.5 w-5.5 text-amber-500" />
                        <span>Quản lý Truyền thông & Báo chí Chính thống</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1 font-sans">
                        Cấu hình các đài truyền hình (VTV1/VTV2, HTV) vinh danh và các liên kết báo chí chính thống bảo chứng học thuật của Học viện.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRestoreMediaDefaults}
                      className="inline-flex items-center space-x-1.5 p-2 px-4 bg-amber-650 hover:bg-amber-500 text-slate-900 font-black tracking-wide text-xs rounded-xl shadow-md transition-all self-start md:self-auto cursor-pointer"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Nạp Lại Dữ Liệu Báo Chí Mẫu</span>
                    </button>
                  </div>

                  {/* SECTION 1: VIDEOS MANAGEMENT */}
                  <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-6">
                    <div className="border-b border-slate-800 pb-3">
                      <h3 className="font-display font-extrabold text-sm text-amber-400 flex items-center space-x-2">
                        <Video className="h-4 w-4" />
                        <span>1. Danh sách Phóng sự & Vinh danh Truyền hình ({videosListState.length})</span>
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-sans">Xử lý các video YouTube embed phóng sự thời sự VTV1, VTV2, HTV1,...</p>
                    </div>

                    {/* Add/Edit Video Form */}
                    <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-850 space-y-4">
                      <h4 className="text-xs font-black text-slate-350 uppercase tracking-wider flex items-center space-x-2">
                        <Plus className="h-4 w-4 text-emerald-500" />
                        <span>{editingVideoId ? 'Cập Nhật Phóng Sự Video' : 'Thêm Mới Phóng Sự Video'}</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Tiêu đề vinh danh / phóng sự *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: Giám đốc Công nghệ Trần Tuấn Thành được vinh danh..."
                            value={videoForm.title || ''}
                            onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Tên Kênh truyền hình *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: VTV1 - Đài Truyền hình Việt Nam"
                            value={videoForm.channel || ''}
                            onChange={(e) => setVideoForm({...videoForm, channel: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Ký hiệu Kênh viết tắt (Badge) *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: VTV1, HTV1, VTV2..."
                            value={videoForm.channelBadge || ''}
                            onChange={(e) => setVideoForm({...videoForm, channelBadge: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">URL Embed YouTube (Bắt buộc dạng /embed/) *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: https://www.youtube.com/embed/j0qNW85NxyQ"
                            value={videoForm.embedUrl || ''}
                            onChange={(e) => setVideoForm({...videoForm, embedUrl: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Nhãn chủ điểm sự kiện (Ví dụ: Vinh danh Tiêu biểu)</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Nhãn nhỏ: Thời đại số, Hướng nghiệp AI,..."
                            value={videoForm.badge || ''}
                            onChange={(e) => setVideoForm({...videoForm, badge: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Nhãn từ khóa Tags (Cách nhau bằng dấu phẩy)</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Sự kiện, AI, Blockchain,..."
                            value={videoTagsText}
                            onChange={(e) => setVideoTagsText(e.target.value)}
                          />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-1">
                          <label className="block text-slate-400 font-bold">Tóm tắt nội dung chính phóng sự</label>
                          <textarea 
                            rows={2}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none font-sans"
                            placeholder="Mô tả tóm tắt nội dung chính phóng sự của đài..."
                            value={videoForm.desc || ''}
                            onChange={(e) => setVideoForm({...videoForm, desc: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={handleSaveVideo}
                          className="p-2 px-5 bg-blue-600 hover:bg-blue-550 text-white rounded-lg font-bold text-xs uppercase cursor-pointer"
                        >
                          {editingVideoId ? 'Cập Nhật' : 'Thêm Mới'}
                        </button>
                        {editingVideoId && (
                          <button
                            type="button"
                            onClick={resetVideoForm}
                            className="p-2 px-5 bg-slate-850 hover:bg-slate-750 text-slate-300 rounded-lg font-bold text-xs uppercase cursor-pointer"
                          >
                            Hủy Bỏ
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Videos Table Render */}
                    <div className="overflow-x-auto bg-slate-950/40 rounded-xl border border-slate-850/85">
                      <table className="w-full text-xs font-sans text-left">
                        <thead className="bg-[#1e293b]/30 text-slate-400 uppercase tracking-widest text-[9px] font-black border-b border-slate-800">
                          <tr>
                            <th className="p-3">Kênh hành</th>
                            <th className="p-3">Tiêu đề phóng sự</th>
                            <th className="p-3">Embed URL</th>
                            <th className="p-3 text-right">Hành động</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850/40">
                          {videosListState.map((vid) => (
                            <tr key={vid.id} className="hover:bg-slate-850/30">
                              <td className="p-3 font-bold text-amber-400">
                                <span className="px-2 py-0.5 bg-slate-800 rounded text-[9px] border border-slate-700 text-slate-300 block w-max">
                                  {vid.channelBadge}
                                </span>
                              </td>
                              <td className="p-3 font-semibold text-slate-200 max-w-xs truncate" title={vid.title}>
                                {vid.title}
                              </td>
                              <td className="p-3 text-slate-455 font-mono text-[9px] truncate max-w-[150px]">
                                {vid.embedUrl}
                              </td>
                              <td className="p-3 text-right space-x-1.5 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleEditVideo(vid)}
                                  className="text-blue-450 hover:text-blue-300 font-bold uppercase text-[10px] cursor-pointer"
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteVideo(vid.id)}
                                  className="text-rose-455 hover:text-rose-400 font-bold uppercase text-[10px] cursor-pointer inline-block ml-3"
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>


                  {/* SECTION 2: HIGHLIGHTED PRESS MANAGEMENT */}
                  <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-6">
                    <div className="border-b border-slate-800 pb-3">
                      <h3 className="font-display font-extrabold text-sm text-sky-455 flex items-center space-x-2">
                        <Award className="h-4 w-4 text-sky-400" />
                        <span>2. Các liên kết Báo chí chính thống bảo chứng ({highlightedPressList.length})</span>
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-sans">Báo của Bộ Khoa học & Công nghệ, Báo Đại biểu Nhân dân, Báo Nhân Dân,...</p>
                    </div>

                    {/* Add/Edit Highlight press */}
                    <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-850 space-y-4">
                      <h4 className="text-xs font-black text-slate-350 uppercase tracking-wider flex items-center space-x-2">
                        <Plus className="h-4 w-4 text-emerald-500" />
                        <span>{editingHighId ? 'Cập Nhật Báo Bảo Chứng' : 'Thêm Mới Báo Bảo Chứng'}</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Cơ quan xuất bản / Tòa soạn *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: Báo Nhân Dân, Bộ KH&CN..."
                            value={highForm.publisher || ''}
                            onChange={(e) => setHighForm({...highForm, publisher: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Tiêu đề bài báo đăng tải *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: Thước đo năng lực cho nhân sự công nghệ..."
                            value={highForm.title || ''}
                            onChange={(e) => setHighForm({...highForm, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Đường link bài viết gốc *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: https://nhandan.vn/thuoc-do-..."
                            value={highForm.url || ''}
                            onChange={(e) => setHighForm({...highForm, url: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Nhãn vinh danh nổi bật (Báo Quốc Hội, Tiên phong học thuật...)</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: Cổng thông tin Bộ KH&CN"
                            value={highForm.badge || ''}
                            onChange={(e) => setHighForm({...highForm, badge: e.target.value})}
                          />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-1">
                          <label className="block text-slate-400 font-bold">Nội dung tóm lược bổ chính</label>
                          <textarea 
                            rows={2}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none font-sans"
                            placeholder="Ví dụ: Cơ quan ngôn luận của Quốc hội viết về hoạt động đào tạo đặc sắc của AIUNI..."
                            value={highForm.desc || ''}
                            onChange={(e) => setHighForm({...highForm, desc: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={handleSaveHigh}
                          className="p-2 px-5 bg-blue-600 hover:bg-blue-550 text-white rounded-lg font-bold text-xs uppercase cursor-pointer"
                        >
                          {editingHighId ? 'Cập Nhật' : 'Lưu'}
                        </button>
                        {editingHighId && (
                          <button
                            type="button"
                            onClick={resetHighForm}
                            className="p-2 px-5 bg-slate-850 hover:bg-slate-755 text-slate-300 rounded-lg font-bold text-xs uppercase cursor-pointer"
                          >
                            Hủy Bỏ
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Table list of highlighted press */}
                    <div className="overflow-x-auto bg-slate-950/40 rounded-xl border border-slate-850/85">
                      <table className="w-full text-xs font-sans text-left">
                        <thead className="bg-[#1e293b]/30 text-slate-400 uppercase tracking-widest text-[9px] font-black border-b border-slate-800">
                          <tr>
                            <th className="p-3">Toà soạn</th>
                            <th className="p-3">Tựa đề bài viết</th>
                            <th className="p-3">Nhãn</th>
                            <th className="p-3 text-right">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850/40">
                          {highlightedPressList.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-850/30">
                              <td className="p-3 font-bold text-[#3B82F6]">{item.publisher}</td>
                              <td className="p-3 text-slate-200 font-medium truncate max-w-xs">{item.title}</td>
                              <td className="p-3 text-amber-400">
                                <span className="px-2 py-0.5 bg-slate-800 rounded text-[9px] text-slate-350">{item.badge}</span>
                              </td>
                              <td className="p-3 text-right space-x-1.5 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleEditHigh(item)}
                                  className="text-blue-450 hover:text-blue-300 font-bold uppercase text-[10px] cursor-pointer"
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteHigh(item.id)}
                                  className="text-rose-455 hover:text-rose-400 font-bold uppercase text-[10px] cursor-pointer inline-block ml-3"
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>


                  {/* SECTION 3: OTHER PRESS NEWS LIST */}
                  <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-6">
                    <div className="border-b border-slate-800 pb-3">
                      <h3 className="font-display font-extrabold text-sm text-emerald-450 flex items-center space-x-2">
                        <Newspaper className="h-4 w-4 text-emerald-400" />
                        <span>3. Danh sách ấn phẩm báo chí đưa tin thêm ({pressNewsList.length})</span>
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-sans">Học viện ra mắt tài liệu, sách hướng nghiệp, chiến dịch bình dân học vụ...</p>
                    </div>

                    {/* Add/Edit Press News Form */}
                    <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-850 space-y-4">
                      <h4 className="text-xs font-black text-slate-350 uppercase tracking-wider flex items-center space-x-2">
                        <Plus className="h-4 w-4 text-emerald-500" />
                        <span>{editingNewsId ? 'Cập Nhật Tin Bài Bổ Sung' : 'Thêm Mới Tin Bài Bổ Sung'}</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Cơ quan báo chí / Tòa soạn *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: Báo Giáo dục & Thời đại, Báo Thanh Niên..."
                            value={newsForm.publisher || ''}
                            onChange={(e) => setNewsForm({...newsForm, publisher: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Tiêu đề tin bài đưa *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: AIUNI công bố chiến lược trọng tâm..."
                            value={newsForm.title || ''}
                            onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1 col-span-1 md:col-span-2">
                          <label className="block text-slate-400 font-bold font-sans">Đường dẫn bài viết gốc (Link url báo) *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: https://thanhnienviet.vn/aiuni-gioi-thieu..."
                            value={newsForm.url || ''}
                            onChange={(e) => setNewsForm({...newsForm, url: e.target.value})}
                          />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-1">
                          <label className="block text-slate-400 font-bold font-sans">Nội dung tóm tắt bài viết ngắn</label>
                          <textarea 
                            rows={2}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Chi tiết giải thuật phân tích tiến độ, tóm tắt các khóa học kỹ năng của đoàn khoa..."
                            value={newsForm.description || ''}
                            onChange={(e) => setNewsForm({...newsForm, description: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={handleSaveNews}
                          className="p-2 px-5 bg-blue-600 hover:bg-blue-555 text-white rounded-lg font-bold text-xs uppercase cursor-pointer"
                        >
                          {editingNewsId ? 'Cập Nhật' : 'Lưu'}
                        </button>
                        {editingNewsId && (
                          <button
                            type="button"
                            onClick={resetNewsForm}
                            className="p-2 px-5 bg-slate-850 hover:bg-slate-755 text-slate-300 rounded-lg font-bold text-xs uppercase cursor-pointer"
                          >
                            Hủy Bỏ
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Table of other press news */}
                    <div className="overflow-x-auto bg-slate-950/40 rounded-xl border border-slate-850/85 text-xs text-left">
                      <table className="w-full text-xs font-sans">
                        <thead className="bg-[#1e293b]/30 text-slate-400 uppercase tracking-widest text-[9px] font-black border-b border-slate-800">
                          <tr>
                            <th className="p-3">Cơ quan báo chí</th>
                            <th className="p-3">Tựa đề</th>
                            <th className="p-3 text-right">Lựa chọn</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850/40">
                          {pressNewsList.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-850/30">
                              <td className="p-3 font-bold text-emerald-400">{item.publisher}</td>
                              <td className="p-3 text-slate-200 font-medium truncate max-w-xs">{item.title}</td>
                              <td className="p-3 text-right space-x-1.5 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleEditNews(item)}
                                  className="text-blue-450 hover:text-blue-300 font-bold uppercase text-[10px] cursor-pointer"
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteNews(item.id)}
                                  className="text-rose-455 hover:text-rose-400 font-bold uppercase text-[10px] cursor-pointer inline-block ml-3"
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* --- TAB: TESTIMONIALS CUSTOMIZER (CHIA SẺ THỰC TẾ TỪ NGƯỜI HỌC) --- */}
              {activeTab === 'testimonials' && (
                <div className="space-y-8 text-left text-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                    <div>
                      <h2 className="font-display font-extrabold text-lg text-slate-100 flex items-center space-x-2">
                        <Users className="h-5.5 w-5.5 text-amber-500" />
                        <span>Quản lý Ý Kiến Học Viên & Chia sẻ Thực Tế</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1 font-sans">
                        Cấu hình các dòng cảm nhận, phản hồi, và đánh giá thực tế của học viên từ các doanh nghiệp, tổ chức học tập cùng AIUNI.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRestoreTestimonialDefaults}
                      className="inline-flex items-center space-x-1.5 p-2 px-4 bg-amber-650 hover:bg-amber-500 text-slate-900 font-black tracking-wide text-xs rounded-xl shadow-md transition-all self-start md:self-auto cursor-pointer"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Đặt Lại Ý Kiến Học Viên Mẫu</span>
                    </button>
                  </div>

                  {/* Add/Edit Testimonial Form */}
                  <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-6">
                    <div className="bg-slate-950/60 p-5 rounded-xl border border-slate-855 space-y-4">
                      <h4 className="text-xs font-black text-slate-350 uppercase tracking-wider flex items-center space-x-2">
                        <Plus className="h-4 w-4 text-emerald-500" />
                        <span>{editingTestimonialId ? 'Cập Nhật Chia Sẻ Học Viên' : 'Thêm Mới Chia Sẻ Học Viên'}</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Họ và tên học viên *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: Nguyễn Minh Tuấn"
                            value={testimonialForm.name || ''}
                            onChange={(e) => setTestimonialForm({...testimonialForm, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Chức danh / Vai trò *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: Product Manager"
                            value={testimonialForm.role || ''}
                            onChange={(e) => setTestimonialForm({...testimonialForm, role: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Tên công ty / Đơn vị công tác *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: VNG Corporation"
                            value={testimonialForm.company || ''}
                            onChange={(e) => setTestimonialForm({...testimonialForm, company: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Ảnh chân dung học viên (Avatar URL)</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="https://images.unsplash.com/..."
                            value={testimonialForm.avatar || ''}
                            onChange={(e) => setTestimonialForm({...testimonialForm, avatar: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Đánh giá số sao (Rating từ 1 đến 5) *</label>
                          <input 
                            type="number" 
                            min="1" 
                            max="5" 
                            step="0.1"
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="5"
                            value={testimonialForm.rating ?? 5}
                            onChange={(e) => setTestimonialForm({...testimonialForm, rating: parseFloat(e.target.value) || 5})}
                          />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-1">
                          <label className="block text-slate-400 font-bold">Nội dung chia sẻ cảm nhận *</label>
                          <textarea 
                            rows={3}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none font-sans"
                            placeholder="Lời chia sẻ, cảm nhận cụ thể của học viên..."
                            value={testimonialForm.quote || ''}
                            onChange={(e) => setTestimonialForm({...testimonialForm, quote: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={handleSaveTestimonial}
                          className="p-2 px-5 bg-blue-600 hover:bg-blue-555 text-white rounded-lg font-bold text-xs uppercase cursor-pointer"
                        >
                          {editingTestimonialId ? 'Cập Nhật' : 'Lưu Chia Sẻ'}
                        </button>
                        {editingTestimonialId && (
                          <button
                            type="button"
                            onClick={resetTestimonialForm}
                            className="p-2 px-5 bg-slate-850 hover:bg-slate-755 text-slate-300 rounded-lg font-bold text-xs uppercase cursor-pointer"
                          >
                            Hủy Bỏ
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Table of Testimonials */}
                    <div className="overflow-x-auto bg-slate-950/40 rounded-xl border border-slate-850/85">
                      <table className="w-full text-xs font-sans text-left">
                        <thead className="bg-[#1e293b]/30 text-slate-400 uppercase tracking-widest text-[9px] font-black border-b border-slate-800">
                          <tr>
                            <th className="p-3">Học viên</th>
                            <th className="p-3">Đơn vị & Chức vụ</th>
                            <th className="p-3">Trích dẫn tóm tắt</th>
                            <th className="p-3">Đánh giá</th>
                            <th className="p-3 text-right">Thao tác</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850/40">
                          {testimonialsListState.map((test) => (
                            <tr key={test.id} className="hover:bg-slate-850/30">
                              <td className="p-3 flex items-center space-x-2">
                                <img 
                                  src={test.avatar} 
                                  alt={test.name} 
                                  referrerPolicy="no-referrer"
                                  className="w-7 h-7 rounded-full object-cover border border-slate-700" 
                                />
                                <span className="font-bold text-slate-200">{test.name}</span>
                              </td>
                              <td className="p-3 text-slate-350">
                                {test.role} @ <span className="text-blue-400 font-semibold">{test.company}</span>
                              </td>
                              <td className="p-3 text-slate-400 font-sans italic max-w-xs truncate" title={test.quote}>
                                &quot;{test.quote}&quot;
                              </td>
                              <td className="p-3 text-amber-500 font-bold font-sans">
                                ★ {test.rating}
                              </td>
                              <td className="p-3 text-right space-x-1.5 shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleEditTestimonial(test)}
                                  className="text-blue-450 hover:text-blue-300 font-bold uppercase text-[10px] cursor-pointer"
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteTestimonial(test.id)}
                                  className="text-rose-455 hover:text-rose-400 font-bold uppercase text-[10px] cursor-pointer inline-block ml-3"
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* --- TAB: PARTNERS, COLLABORATIONS & LOGOS CUSTOMIZER --- */}
              {activeTab === 'partners' && (
                <div className="space-y-12 text-left text-slate-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
                    <div>
                      <h2 className="font-display font-extrabold text-lg text-slate-100 flex items-center space-x-2">
                        <Award className="h-5.5 w-5.5 text-blue-400" />
                        <span>Quản lý Đối Tác, Liên Minh & Logo Chạy Ngang</span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-1 font-sans">
                        Chỉnh sửa dải logo chạy ngang tự chọn, các đối tác chiến lược tiêu biểu, liên minh hợp tác hữu nghị quốc tế và định hướng phát triển tầm nhìn chiến lược của học viện.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleRestorePartnerDefaults}
                      className="inline-flex items-center space-x-1.5 p-2 px-4 bg-blue-600 hover:bg-blue-505 text-white font-black tracking-wide text-xs rounded-xl shadow-md transition-all self-start md:self-auto cursor-pointer"
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Đặt lại Toàn bộ Đối tác & Logo mẫu</span>
                    </button>
                  </div>

                  {/* SUB-SECTION 1: MARQUEE RUNNING LOGOS TICKER */}
                  <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-6">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="font-display text-sm font-extrabold text-blue-400 flex items-center space-x-2">
                        <span className="h-2 w-2 rounded-full bg-blue-400 animate-ping"></span>
                        <span>1. Dải Logo Chạy Ngang Liên Tục (Marquee Logo Banner)</span>
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1 font-sans">
                        Các logo này sẽ chạy cuộn ngang liên tục trên trang chủ làm nổi bật thương hiệu học viên đồng hành.
                      </p>
                    </div>

                    <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-850/80 space-y-4">
                      <h4 className="text-xs font-black text-slate-350 uppercase tracking-wider flex items-center space-x-2">
                        <Plus className="h-4 w-4 text-emerald-500" />
                        <span>{editingMarqueeLogoId ? 'Cập Nhật Logo Chạy Ngang' : 'Thêm Mới Logo Chạy Ngang'}</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Tên đơn vị / Nhãn hiệu *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: Yamaha, VNPT, FPT..."
                            value={marqueeLogoForm.name || ''}
                            onChange={(e) => setMarqueeLogoForm({...marqueeLogoForm, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Đường dẫn ảnh Logo (Image URL) *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="https://images.unsplash.com/..."
                            value={marqueeLogoForm.logoUrl || ''}
                            onChange={(e) => setMarqueeLogoForm({...marqueeLogoForm, logoUrl: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={handleSaveMarqueeLogo}
                          className="p-2 px-5 bg-blue-600 hover:bg-blue-505 text-white rounded-lg font-bold text-xs uppercase cursor-pointer"
                        >
                          {editingMarqueeLogoId ? 'Cập Nhật' : 'Thêm logo'}
                        </button>
                        {editingMarqueeLogoId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingMarqueeLogoId(null);
                              setMarqueeLogoForm({ name: '', logoUrl: '' });
                            }}
                            className="p-2 px-5 bg-slate-850 hover:bg-slate-755 text-slate-300 rounded-lg font-bold text-xs uppercase cursor-pointer"
                          >
                            Hủy
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Table of Marquee Logos */}
                    <div className="overflow-x-auto bg-slate-950/40 rounded-xl border border-slate-850/80 text-xs">
                      <table className="w-full text-left font-sans">
                        <thead className="bg-[#1e293b]/30 text-slate-400 uppercase tracking-widest text-[9px] font-black border-b border-slate-800">
                          <tr>
                            <th className="p-3">Logo</th>
                            <th className="p-3">Tên đơn vị</th>
                            <th className="p-3">Đường dẫn</th>
                            <th className="p-3 text-right">Lựa chọn</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850/40">
                          {marqueeLogosListState.map((logo) => (
                            <tr key={logo.id} className="hover:bg-slate-850/20">
                              <td className="p-3">
                                <img 
                                  src={logo.logoUrl} 
                                  alt={logo.name} 
                                  referrerPolicy="no-referrer"
                                  className="h-8 w-8 object-cover rounded bg-white p-0.5 border border-slate-750" 
                                />
                              </td>
                              <td className="p-3 font-bold text-slate-200">{logo.name}</td>
                              <td className="p-3 text-slate-400 font-mono text-[10px] truncate max-w-xs">{logo.logoUrl}</td>
                              <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => handleEditMarqueeLogo(logo)}
                                  className="text-blue-450 hover:text-blue-300 font-bold uppercase text-[10px] cursor-pointer"
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMarqueeLogo(logo.id)}
                                  className="text-rose-455 hover:text-rose-400 font-bold uppercase text-[10px] cursor-pointer inline-block ml-3"
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* SUB-SECTION 2: ELITE PARTNERS (ĐỐI TÁC TIÊU BIỂU GRID) */}
                  <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-6">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="font-display text-sm font-extrabold text-[#10B981] flex items-center space-x-2">
                        <span>2. Đối Tác - Khách Hàng Tiêu Biểu</span>
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1 font-sans">
                        Các tập đoàn, cơ quan và viện nghiên cứu trong nước hợp tác nòng cốt với học viện.
                      </p>
                    </div>

                    <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-850/80 space-y-4">
                      <h4 className="text-xs font-black text-slate-350 uppercase tracking-wider flex items-center space-x-2">
                        <Plus className="h-4 w-4 text-emerald-500" />
                        <span>{editingElitePartnerId ? 'Cập Nhật Đối Tác' : 'Thêm Mới Đối Tác'}</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Tên đối tác / Thương hiệu *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: Đại học Quốc gia Hà Nội..."
                            value={elitePartnerForm.name || ''}
                            onChange={(e) => setElitePartnerForm({...elitePartnerForm, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Mô tả ngắn gọn vai trò *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: Đại học nghiên cứu trọng điểm quốc gia..."
                            value={elitePartnerForm.desc || ''}
                            onChange={(e) => setElitePartnerForm({...elitePartnerForm, desc: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Biểu tượng (IconName) *</label>
                          <select 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            value={elitePartnerForm.iconName || 'Building'}
                            onChange={(e) => setElitePartnerForm({...elitePartnerForm, iconName: e.target.value})}
                          >
                            <option value="Building">Building (Nhà cao tầng / Tập đoàn)</option>
                            <option value="Landmark">Landmark (Ngân hàng / Tòa sảnh)</option>
                            <option value="Globe">Globe (Toàn cầu / Hàng không)</option>
                            <option value="Network">Network (Hạ tầng viễn thông)</option>
                            <option value="Award">Award (Huy chương / Học viện)</option>
                            <option value="Compass">Compass (Kim chỉ nam / Định hướng)</option>
                            <option value="Target">Target (Chiến lược)</option>
                            <option value="Sparkles">Sparkles (Thông minh / AI)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={handleSaveElitePartner}
                          className="p-2 px-5 bg-emerald-600 hover:bg-emerald-505 text-white rounded-lg font-bold text-xs uppercase cursor-pointer"
                        >
                          {editingElitePartnerId ? 'Cập Nhật' : 'Thêm đối tác'}
                        </button>
                        {editingElitePartnerId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingElitePartnerId(null);
                              setElitePartnerForm({ name: '', desc: '', iconName: 'Building' });
                            }}
                            className="p-2 px-5 bg-slate-850 hover:bg-slate-755 text-slate-300 rounded-lg font-bold text-xs uppercase cursor-pointer"
                          >
                            Hủy
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Table of Elite Partners */}
                    <div className="overflow-x-auto bg-slate-950/40 rounded-xl border border-slate-850/80 text-xs">
                      <table className="w-full text-left font-sans text-xs">
                        <thead className="bg-[#1e293b]/30 text-slate-400 uppercase tracking-widest text-[9px] font-black border-b border-slate-800">
                          <tr>
                            <th className="p-3">Biểu tượng</th>
                            <th className="p-3">Tên đối tác</th>
                            <th className="p-3">Mô tả chi tiết</th>
                            <th className="p-3 text-right">Lựa chọn</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850/40">
                          {elitePartnersListState.map((partner) => (
                            <tr key={partner.id} className="hover:bg-slate-850/20">
                              <td className="p-3 font-mono text-emerald-400 font-bold text-[10px]">{partner.iconName}</td>
                              <td className="p-3 font-bold text-slate-200">{partner.name}</td>
                              <td className="p-3 text-slate-400">{partner.desc}</td>
                              <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => handleEditElitePartner(partner)}
                                  className="text-blue-450 hover:text-blue-300 font-bold uppercase text-[10px] cursor-pointer"
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteElitePartner(partner.id)}
                                  className="text-rose-455 hover:text-rose-400 font-bold uppercase text-[10px] cursor-pointer inline-block ml-3"
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* SUB-SECTION 3: INTERNATIONAL COLLABORATIONS */}
                  <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-6">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="font-display text-sm font-extrabold text-purple-400 flex items-center space-x-2">
                        <span>3. Liên Minh Hợp Tác Quốc Tế</span>
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1 font-sans">
                        Các ký kết học trình, khảo thí tiêu chuẩn giáo trình song phương hướng nghiệp với Hoa Kỳ, Đức, Singapore.
                      </p>
                    </div>

                    <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-850/80 space-y-4">
                      <h4 className="text-xs font-black text-slate-350 uppercase tracking-wider flex items-center space-x-2">
                        <Plus className="h-4 w-4 text-emerald-500" />
                        <span>{editingIntlCollabId ? 'Cập Nhật Liên Minh' : 'Thêm Mới Liên Minh'}</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Tên liên minh (Partner Code) *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: AIUNI x ISODS"
                            value={intlCollabForm.partner}
                            onChange={(e) => setIntlCollabForm({...intlCollabForm, partner: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Tiêu đề liên kết học thuật *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: International Society of Data Science..."
                            value={intlCollabForm.title}
                            onChange={(e) => setIntlCollabForm({...intlCollabForm, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1 col-span-1 md:col-span-2">
                          <label className="block text-slate-400 font-bold">Mô tả mục tiêu liên minh *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: Hợp tác quốc tế chuẩn hóa năng lực học thuật..."
                            value={intlCollabForm.desc}
                            onChange={(e) => setIntlCollabForm({...intlCollabForm, desc: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1 col-span-1 md:col-span-2">
                          <label className="block text-slate-400 font-bold">Danh sách việc thực thi (Mỗi dòng là một gạch đầu dòng) *</label>
                          <textarea 
                            rows={3}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none font-mono text-[11px]"
                            placeholder="Tích hợp bồi dưỡng giáo trình chuẩn&#10;Thiết lập lộ trình học bổng quốc tế 100%&#10;Hỗ trợ trắc nghiệm định lượng RIASEC..."
                            value={intlCollabForm.bulletinsText}
                            onChange={(e) => setIntlCollabForm({...intlCollabForm, bulletinsText: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Màu Badge Tag</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="bg-blue-100 text-blue-800"
                            value={intlCollabForm.badgeColor}
                            onChange={(e) => setIntlCollabForm({...intlCollabForm, badgeColor: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Độ dốc Gradient Nền</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="from-blue-50/50 to-indigo-50/10"
                            value={intlCollabForm.lightBg}
                            onChange={(e) => setIntlCollabForm({...intlCollabForm, lightBg: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={handleSaveIntlCollab}
                          className="p-2 px-5 bg-purple-600 hover:bg-purple-505 text-white rounded-lg font-bold text-xs uppercase cursor-pointer"
                        >
                          {editingIntlCollabId ? 'Cập Nhật' : 'Thêm liên minh'}
                        </button>
                        {editingIntlCollabId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingIntlCollabId(null);
                              setIntlCollabForm({
                                partner: '',
                                title: '',
                                desc: '',
                                bulletinsText: '',
                                lightBg: 'from-blue-50/50 to-indigo-50/10',
                                badgeColor: 'bg-blue-100 text-blue-800'
                              });
                            }}
                            className="p-2 px-5 bg-slate-850 hover:bg-slate-755 text-slate-300 rounded-lg font-bold text-xs uppercase cursor-pointer"
                          >
                            Hủy
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Table of International Collabs */}
                    <div className="overflow-x-auto bg-slate-950/40 rounded-xl border border-slate-850/80 text-xs">
                      <table className="w-full text-left font-sans text-xs">
                        <thead className="bg-[#1e293b]/30 text-slate-400 uppercase tracking-widest text-[9px] font-black border-b border-slate-800">
                          <tr>
                            <th className="p-3">Liên danh</th>
                            <th className="p-3">Tiêu đề học thuật</th>
                            <th className="p-3">Số lượng thực thi</th>
                            <th className="p-3 text-right">Lựa chọn</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850/40">
                          {intlCollabsListState.map((col) => (
                            <tr key={col.id} className="hover:bg-slate-850/20">
                              <td className="p-3"><span className="p-1 px-2.5 rounded bg-purple-900/40 text-purple-200 font-extrabold text-[10px]">{col.partner}</span></td>
                              <td className="p-3 font-bold text-slate-200 truncate max-w-xs">{col.title}</td>
                              <td className="p-3 text-slate-450 font-semibold">{col.bulletins?.length || 0} gạch đầu dòng</td>
                              <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => handleEditIntlCollab(col)}
                                  className="text-blue-450 hover:text-blue-300 font-bold uppercase text-[10px] cursor-pointer"
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteIntlCollab(col.id)}
                                  className="text-rose-455 hover:text-rose-400 font-bold uppercase text-[10px] cursor-pointer inline-block ml-3"
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* SUB-SECTION 4: DEVELOPMENT VECTORS (ĐỊNH HƯỚNG PHÁT TRIỂN) */}
                  <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-6 space-y-6">
                    <div className="border-b border-slate-800 pb-2">
                      <h3 className="font-display text-sm font-extrabold text-amber-400 flex items-center space-x-2">
                        <span>4. Định Hướng Phát Triển Chiến Lược</span>
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1 font-sans">
                        Các mũi nhọn phát triển chiến lược giai đoạn 2026 - 2030 hỗ trợ Chuyển đổi số quốc gia.
                      </p>
                    </div>

                    <div className="bg-slate-950/40 p-5 rounded-xl border border-slate-850/80 space-y-4">
                      <h4 className="text-xs font-black text-slate-350 uppercase tracking-wider flex items-center space-x-2">
                        <Plus className="h-4 w-4 text-emerald-500" />
                        <span>{editingDevVectorId ? 'Cập Nhật Định Hướng' : 'Thêm Mới Định Hướng'}</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Tiêu đề chiến lược *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Ví dụ: Phổ cập AI toàn dân..."
                            value={devVectorForm.title || ''}
                            onChange={(e) => setDevVectorForm({...devVectorForm, title: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Mô tả hành động chiến dịch *</label>
                          <input 
                            type="text" 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            placeholder="Mô tả cụ thể định hướng..."
                            value={devVectorForm.desc || ''}
                            onChange={(e) => setDevVectorForm({...devVectorForm, desc: e.target.value})}
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-slate-400 font-bold">Biểu tượng (IconName) *</label>
                          <select 
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-slate-200 focus:border-blue-500 outline-none"
                            value={devVectorForm.iconName || 'Compass'}
                            onChange={(e) => setDevVectorForm({...devVectorForm, iconName: e.target.value})}
                          >
                            <option value="Compass">Compass (Kim chỉ nam / Định hướng)</option>
                            <option value="Network">Network (Hệ sinh thái liên kết)</option>
                            <option value="Award">Award (Nhân lực chất lượng cao / Huy chương)</option>
                            <option value="Globe">Globe (Vươn tầm thế giới)</option>
                            <option value="Target">Target (Chuyển đổi số / Hồng tâm)</option>
                            <option value="Sparkles">Sparkles (Hào quang thông minh / AI)</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 pt-2">
                        <button
                          type="button"
                          onClick={handleSaveDevVector}
                          className="p-2 px-5 bg-amber-600 hover:bg-amber-505 text-white rounded-lg font-bold text-xs uppercase cursor-pointer"
                        >
                          {editingDevVectorId ? 'Cập Nhật' : 'Thêm định hướng'}
                        </button>
                        {editingDevVectorId && (
                          <button
                            type="button"
                            onClick={() => {
                              setEditingDevVectorId(null);
                              setDevVectorForm({ title: '', desc: '', iconName: 'Compass' });
                            }}
                            className="p-2 px-5 bg-slate-850 hover:bg-slate-755 text-slate-300 rounded-lg font-bold text-xs uppercase cursor-pointer"
                          >
                            Hủy
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Table of Development Vectors */}
                    <div className="overflow-x-auto bg-slate-950/40 rounded-xl border border-slate-850/80 text-xs text-left">
                      <table className="w-full text-left font-sans text-xs">
                        <thead className="bg-[#1e293b]/30 text-slate-400 uppercase tracking-widest text-[9px] font-black border-b border-slate-800">
                          <tr>
                            <th className="p-3">Biểu tượng</th>
                            <th className="p-3">Định hướng cốt lõi</th>
                            <th className="p-3">Chương trình hành động</th>
                            <th className="p-3 text-right">Lựa chọn</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850/40">
                          {devVectorsListState.map((vec) => (
                            <tr key={vec.id} className="hover:bg-slate-850/20">
                              <td className="p-3 font-mono text-amber-400 font-bold text-[10px]">{vec.iconName}</td>
                              <td className="p-3 font-bold text-slate-200">{vec.title}</td>
                              <td className="p-3 text-slate-400">{vec.desc}</td>
                              <td className="p-3 text-right space-x-1.5 whitespace-nowrap">
                                <button
                                  type="button"
                                  onClick={() => handleEditDevVector(vec)}
                                  className="text-blue-450 hover:text-blue-300 font-bold uppercase text-[10px] cursor-pointer"
                                >
                                  Sửa
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDeleteDevVector(vec.id)}
                                  className="text-rose-455 hover:text-rose-400 font-bold uppercase text-[10px] cursor-pointer inline-block ml-3"
                                >
                                  Xóa
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
