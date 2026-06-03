import React, { useState } from 'react';
import { 
  Building2, GraduationCap, Briefcase, Sparkles, BookOpen, 
  Lightbulb, ShieldAlert, Laptop, ArrowRight, Video, FileSpreadsheet, Search
} from 'lucide-react';
import { courses as defaultCourses } from '../data';
import { Course } from '../types';
import CourseCard from './CourseCard';

interface TrainingFieldsProps {
  onSelectCourse: (course: Course) => void;
  onEnroll: (course: Course) => void;
  courses?: Course[];
}

export default function TrainingFields({ onSelectCourse, onEnroll, courses }: TrainingFieldsProps) {
  const currentCourses = courses || defaultCourses;
  const [activeTab, setActiveTab] = useState<'public' | 'edu' | 'enterprise'>('public');
  const [selectedProgramId, setSelectedProgramId] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'basics' | 'ml' | 'advanced' | 'enterprise'>('all');

  const fieldsData = {
    public: {
      title: 'Khối Hành Chính Công',
      badge: 'Cơ quan Nhà nước',
      desc: 'Giải pháp nâng tầm hiệu quả công nghệ số, trang bị năng lực số cho toàn bộ Cán bộ, Công chức, Viên chức thuộc các cơ quan đơn vị UBND xã/phường, Sở, ban, ngành địa phương.',
      targets: ['Cán bộ, Công chức', 'Viên chức Nhà nước', 'UBND Xã/Phường/Quận', 'Sở, Ban, Ngành địa phương'],
      curriculum: [
        { title: 'Tăng Hiệu Suất Công Vụ', desc: 'Sử dụng trợ lý AI tóm tắt hồ sơ pháp lý, soạn văn bản báo cáo theo mẫu quy chuẩn, dịch thuật tài liệu tức thời.', icon: FileSpreadsheet },
        { title: 'Ứng Dụng AI Trong Hành Chính', desc: 'Phổ cập quy trình giải đáp hồ sơ thủ tục hành chính công tự động qua hệ thống chatbot phục vụ nhân dân.', icon: Building2 },
        { title: 'Chiến Lược Chuyển Đổi Số', desc: 'Tổng luận thực thi chuyển đổi số, thiết kế định hướng dữ liệu quốc gia lành mạnh, giảm bớt thủ tục giấy tờ.', icon: Lightbulb },
        { title: 'AI An Toàn & Bảo Mật Dữ Liệu', desc: 'Nguyên tắc an toàn an ninh mạng xã hội, phòng chống rò rỉ dữ liệu hành chính nội bộ khi ra bên ngoài.', icon: ShieldAlert }
      ],
      lightBg: 'from-blue-50 to-indigo-50/20',
      darkText: 'text-blue-900',
      borderCol: 'border-blue-100',
      accentCol: 'bg-blue-600'
    },
    edu: {
      title: 'Khối Giáo Dục Toàn Diện',
      badge: 'Học đường số',
      desc: 'Hệ thống học liệu thông minh và học trình bồi dưỡng năng lực số phù hợp tinh gọn lý luận dành cho ban giám hiệu, thầy cô giáo viên, giảng viên cùng học sinh, sinh viên.',
      targets: ['Giáo viên phổ thông', 'Giảng viên Cao đẳng/Đại học', 'Học sinh tiểu học & trung học', 'Sinh viên các ngành học'],
      curriculum: [
        { title: 'GenAI Trong Giảng Dạy', desc: 'Ứng dụng các mô hình ngôn ngữ lớn để biên soạn bài giảng chi tiết, tối ưu hoá giáo án thích ứng và chấm bài tự động.', icon: GraduationCap },
        { title: 'Sáng Tạo Slide & Học Liệu', desc: 'Tạo nhanh các bài trình chiếu tuyệt đẹp, hình ảnh sinh động và video bài giảng chuyên nghiệp bằng các tổ hợp AI tạo sinh.', icon: Video },
        { title: 'Phát Triển Tư Duy Số', desc: 'Tập huấn kỹ năng tư duy máy tính, kỹ thuật nhắc thông minh (Prompting) hữu ích tự phát triển cho học sinh, sinh viên.', icon: Laptop },
        { title: 'AI Trong Nghiên Cứu Khoa Học', desc: 'Tìm nhanh tư liệu học thuật quốc tế, dịch tài liệu chuyên khoa và phân tích dữ liệu nghiên cứu chuẩn chỉ định lượng.', icon: BookOpen }
      ],
      lightBg: 'from-emerald-50 to-teal-50/20',
      darkText: 'text-emerald-900',
      borderCol: 'border-emerald-100',
      accentCol: 'bg-emerald-600'
    },
    enterprise: {
      title: 'Khối Doanh Nghiệp Tối Ưu',
      badge: 'Hiệu Năng & Tự Động Hoá',
      desc: 'Giáo án thực chiến tối giản nhân lực thô, thúc đẩy chuyển đổi doanh thu tối ưu hóa sơ đồ bộ máy vận hành hành chính dành cho lãnh đạo, quản lý và nhân sự.',
      targets: ['Chủ doanh nghiệp & CEO', 'Quản lý phòng ban (C-level)', 'Nhân viên chuyên môn', 'Freelancers / Khởi nghiệp'],
      curriculum: [
        { title: 'AI Automation đa kênh', desc: 'Thiết kế các chatbot AI tự động hóa chăm sóc khách hàng, trả lời bình luận, chốt đơn hàng loạt mà không cần code.', icon: Sparkles },
        { title: 'Marketing AI hiện đại', desc: 'Tạo bài viết SEO, kịch bản quảng cáo, thiết kế hình ảnh mẫu sản phẩm chân thực không lo vấn đề bản quyền.', icon: Briefcase },
        { title: 'Phân Tích Dữ Liệu Kinh Doanh', desc: 'Tự động trích xuất các báo cáo tài chính phức tạp, phân tích hành vi khách hàng và dự báo doanh số chính xác.', icon: FileSpreadsheet },
        { title: 'Tối Ưu Vận Hành Doanh Nghiệp', desc: 'Bản đồ tích hợp AI vào quy trình làm việc phối hợp, quản trị nhân sự tự động hóa 80% thời gian xử lý.', icon: Laptop }
      ],
      lightBg: 'from-[#122254]/5 to-indigo-50/20',
      darkText: 'text-[#1E3A8A]',
      borderCol: 'border-blue-150',
      accentCol: 'bg-[#1E3A8A]'
    }
  };

  const highPrograms = [
    {
      id: 'prog-basics',
      title: 'AI Nền Tảng (Nhập môn)',
      desc: 'Dành cho người mới bắt đầu hoàn toàn, tiếp cận từ số 0 để làm chủ ChatGPT, Claude và ứng dụng cơ bản.',
      audience: 'Học sinh, người ngoài ngành, cán bộ mới tập sự'
    },
    {
      id: 'prog-spec',
      title: 'AI Chuyên Ngành Sâu',
      desc: 'Các lớp bồi dưỡng nghiệp vụ thực tế ứng dụng trí tuệ nhân tạo chuyên sâu cho các lĩnh vực: Giáo dục, Hành chính, Doanh nghiệp và Y tế.',
      audience: 'Chuyên viên, Thầy cô, Bác sĩ, Trưởng phòng'
    },
    {
      id: 'prog-ceo',
      title: 'AI FOR CEO (Lãnh đạo)',
      desc: 'Chương trình đào tạo cao cấp dành cho nhà quản trị tối ưu hoá chiến lược, định hướng tích hợp phòng thí nghiệm công nghệ.',
      audience: 'Chủ doanh nghiệp, Giám đốc điều hành, Startup Founders'
    },
    {
      id: 'prog-12skills',
      title: '12 Kỹ năng ứng dụng GenAI',
      desc: 'Khóa thực chiến toàn diện rèn luyện 12 kỹ năng: Prompt AI nâng cao, AI tạo hình ảnh mẫu, Video Marketing, AI Automation quy trình và trợ lý Văn phòng số.',
      audience: 'Nhân viên Marketing, Designer, Lập trình viên, Nhà sáng tạo nội dung'
    },
    {
      id: 'prog-trainers',
      title: 'Train The Trainers (1000 Giảng viên)',
      desc: 'Dự án chiến lược của AIUNI bồi dưỡng và kiểm chứng năng lực của 1000 giảng viên đào tạo AI chuyên nghiệp chuẩn mực trong nước.',
      audience: 'Giáo viên nòng cốt, Kỹ sư dày dặn có khát vọng sư phạm'
    }
  ];

  // Comprehensive list filtering
  const filteredCourses = currentCourses.filter((course) => {
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
    { id: 'all', label: 'Tất cả học trình' },
    { id: 'basics', label: 'AI Cơ Bản' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'advanced', label: 'Deep Learning (Sâu)' },
    { id: 'enterprise', label: 'AI Doanh Nghiệp' }
  ];

  const currentField = fieldsData[activeTab];

  return (
    <div className="py-16 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Core Lĩnh Vực Đào Tạo */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full inline-block">
              Chiến Lược Phổ Cập AI
            </span>
            <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight">
              Lĩnh Vực Đào Tạo Thực Chiến
            </h2>
            <p className="font-sans text-gray-500 text-sm leading-relaxed">
              AIUNI thiết kế chương trình học thích ứng linh hoạt theo 3 cấu đới trọng yếu của xã hội Việt Nam nhằm hỗ trợ đồng đều năng suất quốc gia số.
            </p>
          </div>

          {/* Tab Selector Pill style */}
          <div className="flex justify-center flex-wrap gap-2 p-1 bg-gray-150/60 max-w-xl mx-auto rounded-xl text-xs font-bold font-sans">
            <button
              onClick={() => setActiveTab('public')}
              className={`px-4 py-2.5 rounded-lg transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'public'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-blue-600 hover:bg-white'
              }`}
            >
              <Building2 className="h-4 w-4" />
              <span>Khối Hành Chính Công</span>
            </button>
            <button
              onClick={() => setActiveTab('edu')}
              className={`px-4 py-2.5 rounded-lg transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'edu'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-gray-600 hover:text-emerald-600 hover:bg-white'
              }`}
            >
              <GraduationCap className="h-4 w-4" />
              <span>Khối Giáo Dục</span>
            </button>
            <button
              onClick={() => setActiveTab('enterprise')}
              className={`px-4 py-2.5 rounded-lg transition-all cursor-pointer flex items-center space-x-2 ${
                activeTab === 'enterprise'
                  ? 'bg-[#1E3A8A] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#1E3A8A] hover:bg-white'
              }`}
            >
              <Briefcase className="h-4 w-4" />
              <span>Khối Doanh Nghiệp</span>
            </button>
          </div>

          {/* Tab Display Card */}
          <div className={`bg-gradient-to-br ${currentField.lightBg} border ${currentField.borderCol} p-6 md:p-8 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start shadow-sm`}>
            
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#3B82F6]">{currentField.badge}</span>
                <h3 className={`font-display text-2xl font-extrabold ${currentField.darkText}`}>{currentField.title}</h3>
              </div>
              
              <p className="font-sans text-gray-750 text-xs sm:text-sm leading-relaxed">
                {currentField.desc}
              </p>

              {/* Targets box */}
              <div className="space-y-2">
                <h4 className="text-[11px] uppercase font-bold text-gray-400 tracking-wider">Đối tượng định hướng bồi dưỡng:</h4>
                <div className="flex flex-wrap gap-2 text-[10px] font-bold text-gray-600 font-sans">
                  {currentField.targets.map((tgt, i) => (
                    <span key={i} className="bg-white border border-gray-200 px-3 py-1.5 rounded-lg">
                      {tgt}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentField.curriculum.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start space-x-4 shadow-xs">
                    <div className="p-2.5 bg-blue-50 text-[#1E3A8A] rounded-xl shrink-0">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-display font-extrabold text-xs text-gray-950">{item.title}</h4>
                      <p className="font-sans text-[11px] text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* Các Chương Trình Đào Tạo Nổi Bật */}
        <div className="pt-8 border-t border-gray-150">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
              <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-3 py-1 rounded-full inline-block">
                Học Trình Đột Phá
              </span>
              <h2 className="font-display text-3xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Chương Trình Đào Tạo Nổi Bật
              </h2>
              <p className="font-sans text-gray-500 text-xs sm:text-sm leading-relaxed">
                AIUNI cung cấp cấu trúc bồi dưỡng từ cơ bản đến nâng cao định hình nghề nghiệp tương lai, được tinh chuẩn chặt chẽ để mang lại giá trị gia tăng hiệu năng cao nhất.
              </p>
              
              <div className="p-5 bg-gradient-to-tr from-[#122254] to-blue-900 text-white rounded-3xl space-y-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">Hỗ Trợ Toàn Diện</p>
                  <p className="text-sm font-extrabold leading-snug">Tìm Kiếm Khóa Học Thích Hợp Độc Quyền?</p>
                </div>
                <p className="text-[11px] text-blue-100 font-sans leading-relaxed">
                  Nhấp tư vấn chat cùng Trình Cố Vấn AI đàm thoại của chúng tôi để nhận lộ trình chi tiết chỉ trong 30 giây!
                </p>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4">
              {highPrograms.map((prog, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
                >
                  <div className="space-y-1.5 max-w-xl">
                    <h3 className="font-display font-black text-sm text-[#1E3A8A] flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full shrink-0" />
                      <span>{prog.title}</span>
                    </h3>
                    <p className="font-sans text-[11px] text-gray-500 leading-relaxed">{prog.desc}</p>
                    <p className="font-sans text-[9px] font-bold text-gray-400 uppercase tracking-wide">
                      Đối tượng trọng tâm: <span className="text-gray-650">{prog.audience}</span>
                    </p>
                  </div>

                  <div className="shrink-0 self-end md:self-center font-sans">
                    <span className="p-2 px-3.5 bg-gray-50 text-gray-550 border border-gray-200 rounded-xl text-[10px] font-bold uppercase tracking-wider">
                      Hồ sơ chuẩn AIUNI
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Searchable Course Directory */}
        <div id="course-directory" className="pt-12 border-t border-gray-150 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0">
            <div className="space-y-1.5">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded-full">
                Học Trình Độc Quyền
              </span>
              <h2 className="font-display text-2xl font-extrabold text-gray-900">
                Thư Viện Khóa Học Thực Chiến
              </h2>
            </div>

            {/* Keyword live search widget */}
            <div className="relative max-w-xs w-full bg-white rounded-xl shadow-xs border border-gray-200 overflow-hidden text-xs flex items-center">
              <Search className="h-4 w-4 ml-3 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Tìm khóa học, giáo viên, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-3 text-gray-750 focus:outline-none font-medium font-sans"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="p-1 text-gray-400 hover:text-gray-600 mr-2 rounded-full cursor-pointer font-sans"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Sub Categories filters */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-gray-100 max-w-fit rounded-lg text-[11px] font-bold font-sans">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Course card renders */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  onSelect={onSelectCourse}
                  onEnroll={onEnroll}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
              <p className="font-display font-medium text-gray-400 text-sm">Không tìm thấy khóa học nào phù hợp với yêu cầu</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-sans text-xs font-bold rounded-lg cursor-pointer"
              >
                Reset tìm kiếm
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
