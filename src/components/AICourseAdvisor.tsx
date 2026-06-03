import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, X, Send, Bot, User, ChevronRight, RefreshCw, MessageSquareCode } from 'lucide-react';
import { courses as defaultCourses } from '../data';
import { Course } from '../types';

interface AICourseAdvisorProps {
  isOpen: boolean;
  onClose: () => void;
  onEnrollCourse: (course: Course) => void;
  courses?: Course[];
}

interface ChatMessage {
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  isCustomAction?: boolean;
  suggestedCourseId?: string;
}

function formatMessageText(text: string) {
  if (!text) return '';
  const parts = text.split(/\*\*([\s\S]*?)\*\*/);
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          return (
            <strong 
              key={index} 
              className="font-extrabold text-[#1E3A8A] bg-blue-50/60 border border-blue-100/50 px-1 py-0.5 rounded mx-0.5"
            >
              {part}
            </strong>
          );
        }
        return part;
      })}
    </>
  );
}

export default function AICourseAdvisor({ isOpen, onClose, onEnrollCourse, courses }: AICourseAdvisorProps) {
  const coursesList = courses || defaultCourses;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Initialize welcoming instructions on load
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          sender: 'bot',
          text: 'Xin chào! Tôi là Cố vấn Đào tạo Trực tuyến của AIUNI. 🤖✨\n\nTôi ở đây để định hướng giúp bạn lộ trình chinh phục Trí tuệ Nhân tạo tối ưu nhất dựa trên nền tảng của bạn.\n\nHãy nhấn vào vị trí/mục tiêu của bạn bên dưới, hoặc gõ câu hỏi thắc mắc trực tiếp nhé!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [messages]);

  // Handle auto scrolling to the bottom of the conversational thread
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  const presetRoles = [
    { label: 'Người mới bắt đầu (Non-tech)', value: 'basics' },
    { label: 'Lập trình viên / Python Coder', value: 'developer' },
    { label: 'Chủ Doanh nghiệp / Quản lý', value: 'business' },
    { label: 'Kỹ sư muốn học sâu (Deep Learning)', value: 'deep' }
  ];

  const handleRoleSelection = (roleValue: string, label: string) => {
    const userMsg: ChatMessage = {
      sender: 'user',
      text: `Tôi là: ${label}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    simulateBotResponse(roleValue);
  };

  const simulateBotResponse = (queryKey: string) => {
    setIsTyping(true);

    const key = queryKey.toLowerCase();
    let responseText = '';
    let suggestedCourseId = '';

    setTimeout(() => {
      if (key.includes('basic') || key.includes('mới bắt đầu') || key.includes('không biết gì') || key.includes('non-tech')) {
        responseText = `Tuyệt vời! Đối với người mới bắt đầu không đòi hỏi nền tảng lập trình, AIUNI đề xuất lộ trình cực kỳ an tâm sau:\n\n1. **AI Basics for Everyone (Nhập môn AI)**: Khoá học MIỄN PHÍ 100% giúp bạn thành thạo ChatGPT, Claude và vẽ hình ảnh Midjourney phục vụ văn phòng.\n2. **Prompt Engineering & Generative AI**: Khoá nâng cao để biên soạn các khung Prompts phức tạp giải quyết 80% tác vụ tiếp thị & viết nội dung.\n\nBạn có muốn đăng ký học thử lớp Nhập Môn MIỄN PHÍ ngay không?`;
        suggestedCourseId = 'course-1';
      } else if (key.includes('developer') || key.includes('lập trình viên') || key.includes('python') || key.includes('ml')) {
        responseText = `Chào người bạn lập trình viên! 💻 Để nâng cấp sự nghiệp lên mức thu nhập ngàn đô đầy tiềm năng, lộ trình tối ưu của bạn là:\n\n1. **Machine Learning 101**: Học từ căn bản toán giải tích, làm sạch dữ liệu Pandas đến thiết lập mô hình Scikit-Learn thực tế.\n2. **Deep Learning Advanced**: Đi sâu vào mạng tích chập CNN, mô hình NLP Transformer và trực tiếp fine-tune mô hình ngôn ngữ lớn LLM bằng PyTorch.\n\nBạn có muốn tham khảo Giáo án Chương trình Machine Learning 101 chuyên sâu không?`;
        suggestedCourseId = 'course-2';
      } else if (key.includes('business') || key.includes('doanh nghiệp') || key.includes('quản lý') || key.includes('tự động hóa')) {
        responseText = `Kính chào Anh/Chị quản lý! 📈 Ứng dụng AI vào quản trị là xu hướng bắt buộc của tương lai. Học trình phù hợp nhất của Anh/Chị là:\n\n**AI for Business & Automation (Ứng dụng AI cho Doanh nghiệp)**:\nTập trung 100% vào giải pháp no-code, tối ưu hóa sơ đồ nhân sự, thiết lập AI Agent tự động chăm sóc khách hàng đa kênh và phân tích báo cáo doanh số tự động.\n\nKhóa học đang có ưu đãi tặng kèm 1 buổi tư vấn quy trình doanh nghiệp 1:1 trực tiếp cùng giảng viên Google!`;
        suggestedCourseId = 'course-4';
      } else if (key.includes('deep') || key.includes('chuyên sâu') || key.includes('deep learning') || key.includes('pytorch')) {
        responseText = `Chúc mừng bạn đã chọn nấc thang cao nhất! 🚀 Lớp nghiên cứu xuất sắc của chúng tôi dành cho bạn là:\n\n**Deep Learning Advanced (Mạng Nơ-ron Chuyên Sâu)**:\nXây dựng kiến trúc YOLO nhận dạng vật thể, Robot dịch máy và trực tiếp đào sâu kĩ thuật LoRA/QLoRA để huấn luyện riêng LLM của bạn bằng GPU của AIUNI.\n\nBạn có muốn đăng ký giữ chỗ khóa học Chuyên Sâu này không?`;
        suggestedCourseId = 'course-3';
      } else if (key.includes('miễn phí') || key.includes('free') || key.includes('rẻ') || key.includes('học phí')) {
        responseText = `Dạ, Học viện Công nghệ AIUNI luôn tạo điều kiện tốt nhất để mọi người tiếp cận AI! 🌟\n\nChúng tôi cung cấp khóa học **AI Basics for Everyone** hoàn toàn **MIỄN PHÍ** trọn đời để bổ túc kĩ năng cho cộng đồng.\n\nĐối với các lớp chuyên sâu định hướng nghề nghiệp, mức học phí chỉ từ 199.000đ đến 999.000đ – cạnh tranh và cực kì xứng đáng. Bạn hãy nhấn đăng ký học thử lớp Miễn Phí để có trải nghiệm ban đầu nhé!`;
        suggestedCourseId = 'course-1';
      } else {
        responseText = `Cảm ơn câu hỏi của bạn! Học viện AIUNI cung cấp đầy đủ các khóa học từ cơ bản sử dụng Prompt (ChatGPT, Midjourney) cho đến nâng cao lập trình Python Machine Learning/Deep Learning chuyên sâu.\n\nĐể được tư vấn kỹ lưỡng nhất, bạn có thể tham gia nhóm Zalo hỗ trợ khách hàng của chúng tôi hoặc Click đăng ký một lớp học thử MIỄN PHÍ để thầy cô liên hệ định hướng trực tiếp nhé!`;
        suggestedCourseId = 'course-1';
      }

      const botMsg: ChatMessage = {
        sender: 'bot',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedCourseId: suggestedCourseId || undefined
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSendText = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    const cachedQuery = inputText;
    setInputText('');
    simulateBotResponse(cachedQuery);
  };

  const handleNavigateToEnroll = (courseId: string) => {
    const course = coursesList.find(c => c.id === courseId);
    if (course) {
      onEnrollCourse(course);
    }
  };

  const handleResetChat = () => {
    setMessages([]);
  };

  if (!isOpen) return null;

  return (
    <div
      id="ai-advisor-drawer"
      className="fixed bottom-6 right-6 z-55 w-full max-w-[400px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col h-[560px] overflow-hidden"
    >
      {/* Bot Chat Header */}
      <div className="bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] text-white p-4 flex items-center justify-between select-none">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-white/10 rounded-lg text-white">
            <Sparkles className="h-4 w-4 animate-ping" />
          </div>
          <div>
            <h4 className="font-display font-black text-sm leading-tight flex items-center space-x-1">
              <span>Trợ lý Cố vấn AIUNI</span>
            </h4>
            <p className="text-[10px] text-blue-200">Admissions Virtual Assistant</p>
          </div>
        </div>

        <div className="flex items-center space-x-1.5">
          <button
            onClick={handleResetChat}
            className="p-1 hover:bg-white/10 text-white/80 hover:text-white rounded transition-colors cursor-pointer"
            title="Làm mới trò chuyện"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 text-white/80 hover:text-white rounded transition-colors cursor-pointer"
            aria-label="Đóng trợ lí"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Messages timeline panel list */}
      <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start space-x-2.5 ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
          >
            {/* Avatar block */}
            <div className={`p-1.5 rounded-full shrink-0 ${
              msg.sender === 'bot' ? 'bg-[#1E3A8A] text-white' : 'bg-blue-105 text-blue-700 font-bold'
            }`}>
              {msg.sender === 'bot' ? <Bot className="h-3.5 w-3.5" /> : <User className="h-3.5 w-3.5" />}
            </div>

            {/* Bubble layout */}
            <div className="max-w-[80%] space-y-2">
              <div className={`p-3.5 rounded-2xl text-xs font-sans whitespace-pre-line leading-relaxed shadow-sm ${
                msg.sender === 'bot'
                  ? 'bg-white text-gray-800 rounded-tl-none border border-gray-150'
                  : 'bg-gradient-to-br from-[#1E3A8A] to-[#3B82F6] text-white rounded-tr-none'
              }`}>
                {formatMessageText(msg.text)}
              </div>

              {/* Special direct course enroll tag inside BOT response */}
              {msg.sender === 'bot' && msg.suggestedCourseId && (
                <div className="p-2.5 bg-white border border-gray-200 rounded-xl shadow-sm space-y-2 flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 min-w-0">
                    <MessageSquareCode className="h-4 w-4 text-[#3B82F6] shrink-0" />
                    <span className="text-[10px] text-gray-700 font-bold truncate">
                      {coursesList.find(c => c.id === msg.suggestedCourseId)?.title}
                    </span>
                  </div>
                  <button
                    onClick={() => handleNavigateToEnroll(msg.suggestedCourseId!)}
                    className="p-1 bg-blue-50 hover:bg-blue-100 text-[#3B82F6] rounded text-[10px] font-bold px-2 cursor-pointer whitespace-nowrap shrink-0 flex items-center space-x-0.5"
                  >
                    <span>Lên lớp</span>
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              )}

              <span className="block text-[8px] text-gray-400 text-right">
                {msg.timestamp}
              </span>
            </div>
          </div>
        ))}

        {/* Streaming / Typing indicator */}
        {isTyping && (
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 bg-[#1E3A8A] text-white rounded-full">
              <Bot className="h-3.5 w-3.5" />
            </div>
            <div className="bg-white border border-gray-150 p-3 rounded-2xl rounded-tl-none flex space-x-1 shadow-sm leading-none items-center">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Preset Fast Actions (Visible static block when message stack is clean or simple) */}
      {messages.length < 3 && (
        <div className="p-3 bg-white border-t border-gray-100 space-y-2 select-none">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1 px-1">Gợi ý nhanh theo vị trí của bạn:</p>
          <div className="flex flex-wrap gap-2">
            {presetRoles.map((role, idx) => (
              <button
                key={idx}
                onClick={() => handleRoleSelection(role.value, role.label)}
                className="text-[10px] font-semibold text-gray-650 bg-gray-50 hover:bg-blue-50/50 hover:text-blue-600 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-blue-200 transition-all text-left cursor-pointer"
              >
                {role.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Message input panel */}
      <form onSubmit={handleSendText} className="p-3 bg-white border-t border-gray-100 flex items-center space-x-2">
        <input
          type="text"
          placeholder="Hỏi lộ trình học AI..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-grow px-3 py-2 bg-gray-50 border border-gray-200 focus:border-[#3B82F6] rounded-xl text-xs outline-none font-medium transition-colors"
        />
        <button
          type="submit"
          className="p-2 bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] hover:scale-105 rounded-xl text-white shadow-md transition-all cursor-pointer flex items-center justify-center shrink-0"
          title="Gửi tin nhắn"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>

    </div>
  );
}
