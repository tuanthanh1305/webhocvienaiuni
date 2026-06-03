export interface Instructor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  company: string;
}

export interface Advisor {
  id: string;
  name: string;
  role: string;
  avatar: string;
  type: 'expert' | 'advisor';
  desc?: string;
  badge?: string;
  country?: string;
  affiliation?: string;
  flag?: string;
  bio?: string;
  achievements?: string[];
  email?: string;
  linkedin?: string;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: 'basics' | 'ml' | 'advanced' | 'enterprise';
  instructor: Instructor;
  rating: number;
  reviewsCount: number;
  price: number; // 0 means Free (Miễn phí)
  discountPrice?: number;
  duration: string;
  lessonsCount: number;
  image: string;
  tags: string[];
  features: string[];
  syllabus: { week: number; title: string; topics: string[] }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  createdAt?: string;
  commentsCount?: number;
}

export interface Report {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  date: string;
  downloadsCount: number;
  readTime: string;
  createdAt: string;
  externalLink?: string;
}

export interface Comment {
  id: string;
  blogId: string;
  userName: string;
  userEmail: string;
  userAvatar: string;
  content: string;
  createdAt: string;
}

export interface AdminWhitelist {
  email: string; // Lowercase
  addedBy: string;
  createdAt: string;
}

export interface Enrollment {
  id: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
  courseId: string;
  enrollmentDate: string;
  status: 'pending' | 'success';
  createdAt?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}

export interface MediaVideo {
  id: string;
  title: string;
  channel: string;
  embedUrl: string;
  badge?: string;
  desc: string;
  tags: string[];
  channelBadge: string;
}

export interface HighlightedPress {
  id: string;
  publisher: string;
  title: string;
  desc: string;
  url: string;
  badge: string;
  accent?: string;
}

export interface PressNews {
  id: string;
  publisher: string;
  title: string;
  url: string;
  description: string;
}

export interface ElitePartner {
  id: string;
  name: string;
  desc: string;
  iconName: string; // e.g. "Network", "Landmark", "Globe", "Building", "Award"
}

export interface InternationalCollab {
  id: string;
  partner: string;
  title: string;
  desc: string;
  bulletins: string[];
  lightBg?: string;
  badgeColor?: string;
}

export interface DevelopmentVector {
  id: string;
  title: string;
  desc: string;
  iconName: string; // e.g. "Compass", "Network", "Award", "Globe", "Target", "Sparkles"
}

export interface MarqueeLogo {
  id: string;
  name: string;
  logoUrl: string;
}


