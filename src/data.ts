import { Course, Instructor, Testimonial, BlogPost, Advisor, MediaVideo, HighlightedPress, PressNews, ElitePartner, InternationalCollab, DevelopmentVector, MarqueeLogo, Report } from './types';

export const instructors: Instructor[] = [
  {
    id: 'inst-1',
    name: 'Nguyễn Văn A',
    role: 'AI Solutions Architect',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=256&auto=format&fit=crop',
    company: 'Ex-Google'
  },
  {
    id: 'inst-2',
    name: 'Phạm Thị B',
    role: 'Senior Data Scientist',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop',
    company: 'Microsoft Core AI'
  },
  {
    id: 'inst-3',
    name: 'Trần Văn C',
    role: 'Deep Learning Researcher',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
    company: 'AIUNI Labs'
  }
];

export const courses: Course[] = [
  {
    id: 'course-1',
    title: 'AI Basics for Everyone (Nhập Môn AI Cho Mọi Người)',
    slug: 'ai-basics-for-everyone',
    description: 'Tìm hiểu các khái niệm cốt lõi về Trí tuệ Nhân tạo, Machine Learning, Deep Learning và cách ứng dụng AI vào công việc hàng ngày một cách thực tế.',
    longDescription: 'Khóa học này được thiết kế dành riêng cho những người mới bắt đầu bước chân vào thế giới Trí Tuệ Nhân Tạo (AI). Bạn không cần có kiến thức lập trình hay toán học chuyên nghiệp. Chúng tôi sẽ hướng dẫn bạn từ các khái niệm sơ khởi nhất cho đến cách ứng dụng trực tiếp các công cụ Generative AI nổi tiếng hiện nay như ChatGPT, Midjourney, Claude vào quy trình làm việc thực tế, giúp tăng hiệu suất lao động lên gấp 3 lần.',
    category: 'basics',
    instructor: instructors[0],
    rating: 4.9,
    reviewsCount: 1240,
    price: 0,
    duration: '6 tuần (12 giờ học)',
    lessonsCount: 18,
    image: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=1200&auto=format&fit=crop',
    tags: ['Cơ bản', 'Ứng dụng AI', 'AI cho mọi người'],
    features: [
      'Hiểu rõ bản chất AI & Phân biệt ML vs DL',
      'Làm chủ Prompt Engineering cơ bản',
      'Thành thạo ChatGPT, Claude, Midjourney',
      'Đại cương về đạo đức và tương lai của AI',
      'Nhận chứng chỉ AIUNI hoàn thành khóa học'
    ],
    syllabus: [
      { week: 1, title: 'Tổng quan về Trí tuệ Nhân tạo', topics: ['AI là gì?', 'Lịch sử phát triển và tương lai của AI', 'Phân biệt AI, Machine Learning và Deep Learning'] },
      { week: 2, title: 'Kỷ nguyên Generative AI', topics: ['Sự bùng nổ của các mô hình ngôn ngữ lớn (LLM)', 'Sử dụng ChatGPT/Claude hiệu quả trong công việc', 'Tạo tài liệu và tự động viết email chuyên nghiệp'] },
      { week: 3, title: 'Kỹ nghệ nhắc (Prompt Engineering) nhập môn', topics: ['Cấu trúc của một prompt tối ưu', 'Các mẫu prompt phổ biến để lập kế hoạch, phân tích', 'Hạn chế lỗi ảo giác (Hallucination) từ AI'] },
      { week: 4, title: 'Sáng tạo nội dung số & Hình ảnh với AI', topics: ['Cách tạo prompt vẽ tranh bằng Midjourney, Stable Diffusion', 'Thiết kế slide và xây dựng kịch bản video bằng AI', 'Tự động hóa sản xuất nội dung mạng xã hội'] },
      { week: 5, title: 'Ứng dụng AI tối ưu năng suất cá nhân', topics: ['Các plugin hữu ích hỗ trợ đọc tài liệu, phân tích PDF', 'Quản lý thời gian và lập lịch tự động', 'Tạo bot trợ lý cá nhân không cần code (No-code GPTs)'] },
      { week: 6, title: 'Đạo đức và Tương lai phát triển nghề nghiệp', topics: ['Bảo mật thông tin khi làm việc với AI', 'Cách chuẩn bị kỹ năng không lo bị AI thay thế', 'Kiểm tra cuối khóa và nhận chứng nhận tốt nghiệp'] }
    ]
  },
  {
    id: 'course-2',
    title: 'Machine Learning 101 (Nền Tảng Machine Learning)',
    slug: 'machine-learning-101',
    description: 'Nắm vững các thuật toán Học máy cơ bản nhất từ Hồi quy, Phân loại đến Phân cụm. Học đi đôi với hành thông qua dự án Python chuẩn mực.',
    longDescription: 'Khóa học trang bị cho học viên nền tảng toán học và lập trình cần thiết để xây dựng mô hình dự đoán. Chúng ta sẽ làm sạch dữ liệu, chọn lọc tính năng, triển khai các thuật toán nổi tiếng bằng thư viện Scikit-Learn của Python và đánh giá độ chính xác một cách khoa học. Thích hợp cho những bạn muốn bắt đầu con đường trở thành kỹ sư dữ liệu hoặc chuyên viên phân tích định lượng.',
    category: 'ml',
    instructor: instructors[1],
    rating: 4.8,
    reviewsCount: 840,
    price: 299000,
    discountPrice: 199000,
    duration: '8 tuần (24 giờ học)',
    lessonsCount: 32,
    image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?q=80&w=1200&auto=format&fit=crop',
    tags: ['Machine Learning', 'Python', 'Scikit-Learn'],
    features: [
      'Xây dựng các thuật toán ML từ Scratch',
      'Tiền xử lý và trực quan hóa dữ liệu với Pandas/Matplotlib',
      'Đánh giá mô hình chuyên nghiệp (ROC, Precision, Cross-validation)',
      'Triển khai 4 dự án thực tế về Tài chính, Y tế, và Thương mại điện tử',
      'Hỗ trợ giải đáp 1:1 từ giảng viên Microsoft Core AI'
    ],
    syllabus: [
      { week: 1, title: 'Môi trường Python & Thư viện Tính toán', topics: ['Cài đặt Anaconda, Jupyter Notebook', 'Lập trình Python Core cơ bản', 'Làm việc với mảng nhiều chiều Numpy, xử lý bảng Pandas'] },
      { week: 2, title: 'Hồi quy tuyến tính & Logistic Regression', topics: ['Toán giải tích và Đại số tuyến tính căn bản trong AI', 'Xây dựng thuật toán Hồi quy dự đoán giá nhà', 'Logistic Regression cho bài toán phân loại nhị phân'] },
      { week: 3, title: 'Cây quyết định & Học máy có giám sát nâng cao', topics: ['Decision Tree, Gini Index và Entropy', 'Thuật toán K-Nearest Neighbors (KNN)', 'Support Vector Machines (SVM) nguyên lý hoạt động'] },
      { week: 4, title: 'Phương pháp Ensemble và Rừng ngẫu nhiên', topics: ['Random Forest là gì?', 'Boosting và Bagging', 'Giới thiệu thư viện XGBoost cực kỳ mạnh mẽ trong cuộc thi Kaggle'] },
      { week: 5, title: 'Học máy không giám sát (Unsupervised Learning)', topics: ['Thuật toán phân cụm K-Means tìm kiếm nhóm khách hàng', 'Phân tích thành phần chính PCA giảm chiều dữ liệu', 'Hệ thống gợi ý sản phẩm (Recommendation System)'] },
      { week: 6, title: 'Tiền xử lý dữ liệu thực tế (Feature Engineering)', topics: ['Xử lý dữ liệu bị khuyết (Missing value)', 'Chuẩn hóa dữ liệu (Scaling, One-hot encoding)', 'Lựa chọn đặc trưng và giảm đa cộng tuyến'] },
      { week: 7, title: 'Đánh giá & Tinh chỉnh siêu tham số', topics: ['Ma trận nhầm lẫn (Confusion Matrix)', 'F1-score, Precision-Recall Curve và K-fold Cross Validation', 'GridSearch và RandomSearch tìm tham số tối ưu'] },
      { week: 8, title: 'Bảo vệ đồ án cuối khóa', topics: ['Triển khai mô hình Machine Learning lên web app đơn giản', 'Trình bày sản phẩm trước hội đồng giảng viên', 'Chia sẻ lộ trình phỏng vấn vị trí Data Scientist'] }
    ]
  },
  {
    id: 'course-3',
    title: 'Deep Learning Advanced (Mạng Nơ-ron Chuyên Sâu)',
    slug: 'deep-learning-advanced',
    description: 'Chinh phục Thị giác Máy tính (CV) và Xử lý Ngôn ngữ Tự nhiên (NLP). Xây dựng kiến trúc CNN, RNN, Transformer bằng PyTorch.',
    longDescription: 'Khóa học chuyên sâu dành cho lập trình viên đã có căn bản về Machine Learning. Đi sâu khám phá thế giới của mạng nơ-ron đa tầng. Bạn sẽ học cách thiết kế, tối ưu hóa và huấn luyện các mô hình thị giác phức tạp (nhận diện khuôn mặt, phát hiện vật thể) và xử lý ngôn ngữ tự nhiên (dịch máy, tóm tắt văn bản, xây dựng mô hình sinh từ ngữ).',
    category: 'advanced',
    instructor: instructors[2],
    rating: 4.7,
    reviewsCount: 512,
    price: 599000,
    duration: '10 tuần (36 giờ học)',
    lessonsCount: 40,
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop',
    tags: ['Deep Learning', 'PyTorch', 'Computer Vision', 'LLMs'],
    features: [
      'Lập trình thành thạo khung làm việc PyTorch',
      'Tự tay xây dựng và fine-tune mô hình CNN',
      'Đàm thoại về cấu trúc Transformer đột phá',
      'Thực hành trên hệ thống GPU hiệu năng cao của AIUNI',
      'Học tập qua đồ án nghiên cứu khoa học và sản xuất'
    ],
    syllabus: [
      { week: 1, title: 'Kiến trúc Mạng Nơ-ron Nhân tạo (ANN)', topics: ['Multi-layer Perceptrons', 'Cơ chế lan truyền ngược (Backpropagation)', 'Hàm kích hoạt ReLu, Sigmoid và kỹ thuật Gradient Descent'] },
      { week: 2, title: 'Huấn luyện Mạng Nơ-ron hiệu quả', topics: ['Quá khớp (Overfitting) và kỹ thuật Dropout, L2 Regularization', 'Thuật toán tối ưu: Adam, RMSprop, SGD', 'Batch Normalization giúp tăng tốc học tập'] },
      { week: 3, title: 'Thị giác máy tính với CNN (Convolutional Neural Networks)', topics: ['Phép toán tích chập và pooling', 'Các mạng nổi tiếng: ResNet, VGG, MobileNet', 'Bài toán phát hiện vật thể với YOLO (You Only Look Once)'] },
      { week: 4, title: 'Học chuyển giao (Transfer Learning)', topics: ['Tận dụng mô hình đã huấn luyện trước', 'Fine-tuning và Feature Extraction trên tập dữ liệu riêng', 'Sử dụng PyTorch Image Models (timm)'] },
      { week: 5, title: 'Dữ liệu dạng chuỗi & RNN/LSTM', topics: ['Recurrent Neural Networks cho dữ liệu thời gian', 'Long Short-Term Memory (LSTM) giải quyết tiêu biến gradient', 'Phân tích cảm xúc văn bản'] },
      { week: 6, title: 'Cơ chế Chú ý & Kiến trúc Transformer', topics: ['Tại sao Attention là tất cả những gì bạn cần', 'Self-Attention và Multi-head Attention', 'Khám phá kiến trúc mạng của GPT và BERT'] },
      { week: 7, title: 'Làm việc nâng cao với PyTorch', topics: ['Custom Dataset và DataLoader tối ưu hoá bộ nhớ', 'Sử dụng TensorBoard theo dõi quá trình huấn luyện', 'Distributed Training đa GPU'] },
      { week: 8, title: 'Fine-tune các Mô hình Ngôn ngữ Lớn (LLMs)', topics: ['Kỹ thuật LoRA và QLoRA huấn luyện mô hình 7B tham số trên GPU đơn', 'Sắp xếp tập dữ liệu hội thoại nâng cao', 'Đánh giá mô hình LLM tùy chỉnh'] },
      { week: 9, title: 'Triển khai mô hình (Deployment)', topics: ['Chuyển đổi mô hình sang định dạng ONNX/TensorRT', 'Xây dựng API với FastAPI phục vụ dự báo thời gian thực', 'Đóng gói Docker Container'] },
      { week: 10, title: 'Thuyết trình Đồ án & Tổng kết khóa học', topics: ['Kiểm thử tổng thể hệ thống', 'Báo cáo chất lượng trước hội đồng kỹ sư', 'Tư vấn đăng ký bản quyền sản phẩm trí tuệ AI'] }
    ]
  },
  {
    id: 'course-4',
    title: 'AI for Business & Automation (Ứng Dụng AI Cho Doanh Nghiệp)',
    slug: 'ai-for-business',
    description: 'Chiến lược tối ưu hóa doanh thu, tự động hóa quy trình hỗ trợ khách hàng và tối giản nhân sự bằng AI.',
    longDescription: 'Khóa học được thiết kế dành cho các nhà quản lý, chủ doanh doanh nghiệp và nhân sự mong muốn tích hợp AI vào quy trình sản xuất, marketing, chăm sóc khách hàng và đưa ra quyết định dựa trên dữ liệu. Khóa học không yêu cầu khả năng viết code, tập trung hoàn toàn vào tư duy chiến lược và thực thi hệ thống.',
    category: 'enterprise',
    instructor: instructors[0],
    rating: 5.0,
    reviewsCount: 310,
    price: 999000,
    discountPrice: 799000,
    duration: '4 tuần (16 giờ học)',
    lessonsCount: 24,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    tags: ['Doanh nghiệp', 'Tự động hóa', 'No-Code'],
    features: [
      'Xây dựng chiến lược tích hợp AI riêng biệt cho từng phòng ban',
      'Tự động hóa 80% quy trình CSKH bằng AI Bot đàm thoại',
      'Ứng dụng AI phân tích tài chính và dự báo xu hướng thị trường',
      'Xây dựng quy trình sáng tạo Video & Quảng cáo tự động hóa',
      'Tư vấn trực tiếp 1:1 từ chuyên gia công nghệ'
    ],
    syllabus: [
      { week: 1, title: 'Tổng quan Chuyển đổi số bằng AI', topics: ['Phân tích chuỗi giá trị doanh nghiệp', 'Nhận diện các điểm nghẽn có thể giải quyết bằng AI', 'Cách tính toán ROI (tỷ suất sinh lời) khi đầu tư giải pháp AI'] },
      { week: 2, title: 'Xây dựng Hệ thống Tự động hóa Chăm sóc Khách hàng', topics: ['Thiết lập AI Agent phản hồi tin nhắn tự động đa kênh', 'Tích hợp cơ sở dữ liệu doanh nghiệp (Knowledge Base)', 'Sử dụng Zapier kết nối Webhook'] },
      { week: 3, title: 'Marketing, Viết bài & Phim quảng cáo tự động', topics: ['Lập lịch và sáng tạo hình ảnh sản phẩm không lo bản quyền', 'Sử dụng AI tạo giọng đọc cảm xúc (Text-to-Speech)', 'Tạo video người ảo (AI Avatar) giới thiệu sản phẩm'] },
      { week: 4, title: 'Quản trị nhân sự & Đưa quyết định dựa trên dữ liệu', topics: ['AI hỗ trợ sàng lọc và xếp hạng CV ứng viên', 'Tự động phân tích báo cáo doanh thu tuần/tháng chuyên sâu', 'Bảo mật dữ liệu kinh doanh nội bộ khi dùng AI'] }
    ]
  },
  {
    id: 'course-5',
    title: 'Prompt Engineering & Generative AI (Kỹ Nghệ Gợi Ý & AI Tạo Sinh)',
    slug: 'prompt-engineering',
    description: 'Khai thác tối đa sức mạnh của ChatGPT, Claude, Midjourney bằng tư duy thiết kế prompt đỉnh cao.',
    longDescription: 'Khám phá bí mật đằng sau việc tạo ra các prompt chuyên sâu để biến các trí tuệ nhân tạo hàng đầu thế giới thành nhân viên đắc lực hỗ trợ lập trình, phân tích dữ liệu, viết báo cáo hay xử lý khủng hoảng truyền thông. Phù hợp cho Copywriters, Marketers, Lập trình viên và Freelancers.',
    category: 'basics',
    instructor: instructors[2],
    rating: 4.85,
    reviewsCount: 650,
    price: 399000,
    discountPrice: 299000,
    duration: '5 tuần (10 giờ học)',
    lessonsCount: 15,
    image: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?q=80&w=1200&auto=format&fit=crop',
    tags: ['Prompt Engineering', 'Generative AI', 'Hiệu suất cao'],
    features: [
      'Hiểu rõ cơ chế hoạt động đằng sau Tokens & Temperature',
      'Thành thạo cấu trúc prompt nâng cao (Few-Shot, Chain-of-Thought, ReAct)',
      'Tự xây dựng thư viện Prompt bí mật cho mọi ngành nghề',
      'Tích hợp AI API vào Google Sheets/Excel tự động xử lý chuỗi văn bản lớn',
      'Cập nhật kỹ thuật mới định kỳ miễn phí trọn đời'
    ],
    syllabus: [
      { week: 1, title: 'Năng lực cốt lõi của Trình Gợi Ý', topics: ['Tokens, Ngắt đoạn văn bản, Cửa sổ ngữ cảnh là gì?', 'Tác động của Temperature và Top-P đến sự sáng tạo của AI', 'Cách cài đặt System Prompt định hình cá tính bot'] },
      { week: 2, title: 'Các Kỹ thuật Gợi ý Từ Cơ Bản đến Nâng Cao', topics: ['Zero-Shot vs Few-Shot Learning', 'Chain-of-Thought (Suy nghĩ theo chuỗi) kích hoạt logic giải toán', 'Self-Consistency và Tree of Thoughts'] },
      { week: 3, title: 'Xây dựng Quy trình Làm việc Phối hợp Đa Tác vụ', topics: ['Prompt thiết kế phân vai (Role-playing)', 'Tạo mô hình phân tính SWOT doanh nghiệp nhanh gọn', 'Tự động hiệu đính, tóm tắt và chuyển đổi phong cách viết văn'] },
      { week: 4, title: 'Kết nối AI với Google Sheets & Excel', topics: ['Sử dụng hàm API của OpenAI/Claude trong trang tính', 'Tự động phân tích cảm xúc hàng ngàn ý kiến khách hàng trong 1 phút', 'Lọc và chuẩn hóa dữ liệu thô hàng loạt'] },
      { week: 5, title: 'Xây dựng Ứng dụng Mini với No-code GPTs', topics: ['Cấu hình Chatbot tư vấn hướng nghiệp cá nhân', 'Đồng bộ hóa tri thức doanh nghiệp lên GPT cá nhân hóa', 'Đánh giá cuối khóa và nhận chứng nhận kỹ sư prompt xuất sắc'] }
    ]
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Nguyễn Minh Tuấn',
    role: 'Product Manager',
    company: 'VNG Corporation',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop',
    rating: 5,
    quote: 'Khóa học AI Basics thực sự là cứu cánh cho công việc quản lý của tôi. Giờ đây tôi rút ngắn được 40% thời gian lên kế hoạch sản phẩm nhờ kỹ năng sử dụng Prompt nâng cao!'
  },
  {
    id: 'test-2',
    name: 'Lê Mỹ Linh',
    role: 'Marketing Leader',
    company: 'Vinamilk',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&auto=format&fit=crop',
    rating: 5,
    quote: 'Mức học phí quá rẻ so với lượng kiến thức thực chiến đồ sộ. Chị B giảng bài rất dễ hiểu, các buổi thực hành hands-on giúp công ty tôi tự động hoá được fanpage bán hàng nhanh chóng.'
  },
  {
    id: 'test-3',
    name: 'Trần Thế Anh',
    role: 'Software Engineer',
    company: 'FPT Software',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop',
    rating: 4.9,
    quote: 'Khóa học Deep Learning của AIUNI sử dụng học trình PyTorch rất hiện đại, cập nhật liên tục các chủ đề thịnh hành như Fine-tune Transformer và LoRA. GPU thực hành mượt mà cực kỳ thích.'
  },
  {
    id: 'test-4',
    name: 'Hoàng Kim Chi',
    role: 'Founder',
    company: 'Chi Sáng Tạo Agency',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop',
    rating: 5,
    quote: 'Nhờ khóa học AI for Business của thầy cô tại AIUNI, đội ngũ thiết kế của chúng tôi đã thành thục việc tạo ra bộ ảnh quảng cáo bằng Midjourney, tiết kiệm hàng triệu đồng mua hình stock!'
  }
];

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Top 5 xu hướng Generative AI thống trị năm 2026',
    slug: 'top-5-xu-huong-generative-ai-2026',
    excerpt: 'Tìm hiểu những tiến bộ vượt bậc của mô hình đa phương tiện (Multimodal), tác nhân thông minh (AI Agents) và AI tự trị trong năm 2026.',
    content: `Kỷ nguyên AI đang biến chuyển nhanh chóng hơn bao giờ hết. Trong năm 2026, chúng ta không chỉ dừng lại ở các chatbot hỏi-đáp tĩnh hay hỗ trợ soạn thảo văn bản thông thường. Theo các nghiên cứu uy tín từ các trung tâm phát triển hàng đầu toàn cầu, dưới đây là 5 xu hướng Generative AI cốt lõi định hình lại thị trường:

1. SỰ BÙNG NỔ CỦA CÁC TÁC NHÂN TỰ TRỊ (AUTONOMOUS AI AGENTS)
Không đơn thuần là đưa ra câu trả lời, các AI Agent năm 2026 sở hữu năng lực tự lập kế hoạch hành động, tương tác chéo qua các nền tảng mạng xã hội, truy xuất dữ liệu có điều kiện, gọi các API hệ thống và thực thi thanh toán độc lập nhằm hoàn tất các mục tiêu kinh doanh phức tạp mà con người giao phó.

2. MÔ HÌNH ĐA PHƯƠNG TIỆN TOÀN DIỆN (MULTIMODAL AI AS STANDARD)
Sự hợp lưu chưa từng có của Ngôn ngữ, Thị giác, Âm thanh và Luồng video hoạt động đồng bộ mang lại tư duy tiệm cận tư duy thực tế của con người. Các mô hình thế hệ mới tiếp nhận và phản hồi tức thì với tốc độ tính bằng mili-giây mà không cần thông qua các bước trung gian chuyển đổi từ chữ viết sang âm thanh.

3. TRÍ TUỆ NHÂN TẠO CHẠY TẠI BIÊN (EDGE AI)
Nhằm giải quyết triệt để nút thắt về hạ tầng đường truyền và nâng tầm an ninh dữ liệu nội bộ của các tập đoàn, các mô hình ngôn ngữ lớn cỡ nhỏ (SLMs) siêu tối ưu đang được triển khai trực tiếp ngay trên bộ vi xử lý của điện thoại cầm tay, máy tính cá nhân và máy chủ chi nhánh mà không cần kết nối đám mây liên tục.

4. BẢO MẬT VÀ QUẢN TRỊ ĐẠO ĐỨC AI (AI GOVERNANCE)
Các khung pháp lý hoàn thiện đòi hỏi các doanh nghiệp phải minh bạch hóa nguồn dữ liệu huấn luyện, kiểm soát chặt chẽ rủi ro thiên vị và thiết lập hệ thống phát hiện tin giả (deepfake) tự động.

Học viện Công nghệ AIUNI đồng hành cùng bạn cập nhật liên tục giáo trình thực chiến để bám sát và thích nghi nhanh chóng với dòng chảy ngoạn mục này!`,
    coverImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=600&auto=format&fit=crop',
    date: '24/05/2026',
    author: 'Hội đồng học thuật AIUNI',
    readTime: '6 phút đọc',
    category: 'Xu hướng Công nghệ',
    createdAt: '2026-05-24T12:00:00.000Z'
  },
  {
    id: 'blog-2',
    title: 'Hướng dẫn tự xây dựng trợ lý AI (Custom Agents) cho lập trình viên',
    slug: 'tu-tao-tro-ly-ao-ai-gpt',
    excerpt: 'Từng bước tổ chức dữ liệu nội bộ, thiết lập chỉ dẫn và kết nối API để tạo trợ lý gỡ lỗi phục vụ dự án thực tế.',
    content: `Bạn cảm thấy mệt mỏi vì phải sao chép qua lại các dòng prompt lặp đi lặp lại hàng ngày? Bạn muốn có một cộng sự thông thuộc toàn bộ cấu trúc mã nguồn của riêng dự án mà bạn phụ trách? Hãy tự xây dựng một AI Agent tùy chỉnh (Custom Agent) với hướng dẫn 3 bước tinh gọn:

BƯỚC 1: CHUẨN HÓA BỘ TRI THỨC (KNOWLEDGE BASE)
Tập hợp toàn bộ hướng dẫn phong cách code (Coding Style Guide), các tài liệu API nội bộ và lịch sử các lỗi (Issues) thường gặp của dự án vào một thư mục riêng biệt. Chuyển đổi chúng về định dạng văn bản sạch như Markdown hoặc PDF rõ ràng.

BƯỚC 2: BIÊN SOẠN CHỈ DẪN SYSTEM PROMPT (SYSTEM INSTRUCTIONS)
Định hình vai trò thông qua System Prompt chuyên nghiệp: "Bạn là trưởng bộ phận công bồi gỡ lỗi (Senior QA Agent) thuộc dự án XYZ. Chỉ cung cấp đoạn mã đã kiểm thử bảo mật gắt gao. Hãy áp dụng tư duy phân tích nguyên nhân gốc rễ trước khi xuất code gỡ lỗi."

BƯỚC 3: KẾT NỐI API & TỰ ĐỘNG HÓA WEBHOOKS
Kích hoạt các công cụ hỗ trợ thông qua cơ chế Function Calling để trợ lý ảo có khả năng thực trực tiếp lấy logs từ hệ thống, chạy thử mã nguồn cục bộ, hoặc tự động tạo Pull Request gỡ lỗi ngay trên tài khoản Github của doanh nghiệp.

Bằng cách sở hữu trợ lý ảo này, hiệu năng chỉnh lỗi của bạn sẽ cải thiện trên 65%!`,
    coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=600&auto=format&fit=crop',
    date: '20/05/2026',
    author: 'Giảng viên Trần Văn C',
    readTime: '8 phút đọc',
    category: 'Mẹo Công nghệ',
    createdAt: '2026-05-20T12:00:00.000Z'
  },
  {
    id: 'blog-3',
    title: 'Tại sao Prompt Engineering là kỹ năng bắt buộc trong thế kỷ 21?',
    slug: 'tai-sao-prompt-engineering-la-ky-nang-the-ky-21',
    excerpt: 'Cho dù bạn đang công tác ở vị trí nào, năng lực giao tiếp chính xác với AI sẽ phân cấp trình độ làm việc của ứng viên.',
    content: `Theo tổng kết của Diễn đàn Kinh tế Thế giới, một nhận định nổi tiếng đang trở thành kim chỉ nam trong thời kỳ chuyển đổi số: "Trí tuệ nhân tạo (AI) không trực tiếp thay thế bạn, nhưng người biết khai thác AI hiệu quả sẽ chiếm lĩnh công việc của bạn."

Kỹ năng Prompt Engineering (Kỹ nghệ gợi ý) bản chất là nghệ thuật đồng hóa ngôn ngữ tự nhiên của con người vào logic xử lý toán học của các Mô hình Ngôn ngữ Lớn (LLMs). Nó không chỉ thuần túy là việc nhập vài câu hỏi đơn giản, mà là sự vận dụng các nguyên tắc cấu trúc có chiều sâu:

1. HIỂU RÕ NGỮ CẢNH (CONTEXT PROVIDING)
Biết cách thiết lập vai trò, mục tiêu cụ thể, định hình khung văn bản đầu ra và quản lý tham số sáng tạo (temperature) để hạn chế tối đa rủi ro ảo giác (hallucination) của máy tính.

2. ÁP DỤNG CÁC KỸ THUẬT SUY NGHĨ NHIỀU BƯỚC (CHAIN-OF-THOUGHT)
Khi giải quyết các vấn đề đa tầng, người sử dụng prompt thông minh biết cách dẫn dụ AI suy lý từng bước nhỏ một cách chặt chẽ thay vì bắt máy tính đi ngay tới kết luận sơ sài.

3. KIỂM THỬ VÀ ĐIỀU CHỈNH LIÊN TỤC (ITERATIVE PERFORMANCE)
Nghiên cứu Prompt Engineering giúp bạn sở hữu khả năng xây dựng các tác vụ tự động hóa quy mô lớn, từ đó giúp nâng năng lực xử lý tài liệu văn phòng từ vài ngày xuống mức mươi giây.`,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop',
    date: '15/05/2026',
    author: 'Ban Học thuật AIUNI',
    readTime: '5 phút đọc',
    category: 'Sự nghiệp',
    createdAt: '2026-05-15T12:00:00.000Z'
  }
];

export const statistics = [
  { value: '10K+', label: 'Học viên Đã Đào Tạo', desc: 'Có sự đột phá trong tư duy và công việc' },
  { value: '100+', label: 'Doanh nghiệp Hợp Tác', desc: 'Ứng dụng AI nâng tầm hiệu năng vận hành' },
  { value: '95%', label: 'Tỷ Lệ Thành Công', desc: 'Học viên tốt nghiệp có sản phẩm thực tế' },
  { value: '4.9★', label: 'Xếp Hạng Hài Lòng', desc: 'Đánh giá điểm số từ hàng ngàn học viên' }
];

export const features = [
  {
    id: 'feat-1',
    title: 'Học Tập Thực Hành',
    desc: 'Lấy thực hành làm gốc. Mỗi buổi học đi kèm dự án thực tế giúp bàn giao sản phẩm chạy tốt lập tức.',
    iconName: 'PlayCircle'
  },
  {
    id: 'feat-2',
    title: 'Giảng Viên Hàng Đầu',
    desc: 'Chuyên gia đầu giáo từ Google, Microsoft và các viện nghiên cứu AI chuyên sâu tại Việt Nam.',
    iconName: 'Award'
  },
  {
    id: 'feat-3',
    title: 'Học Phí Hợp Lý',
    desc: 'Mức chi phí tối ưu, dễ tiếp cận với học viên và giải pháp tiết kiệm kinh phí đào tạo cho doanh nghiệp.',
    iconName: 'BadgePercent'
  },
  {
    id: 'feat-4',
    title: 'Truy Cập Vĩnh Viễn',
    desc: 'Cập nhật giáo án, video bài giảng miễn phí trọn đời theo dòng chảy thị trường công nghệ AI thế giới.',
    iconName: 'Infinity'
  }
];

export const COMPANY_INFO = {
  address: 'Tầng 5, Viện Đổi mới Sáng tạo Quốc Gia, 25 Lê Thánh Tông, Hà Nội',
  phone: '0912 77 70 68',
  email: 'aiacademy@aiuni.vn',
  facebook: 'https://facebook.com/aiuni.vn',
  linkedin: 'https://linkedin.com/company/aiuni',
  youtube: 'https://youtube.com/aiuni',
  twitter: 'https://twitter.com/aiuni_vn',
};

export const defaultAdvisors: Advisor[] = [
  {
    id: 'adv-1',
    name: 'TS. Nguyễn Hoàng Nam',
    role: 'Chuyên gia Trí tuệ Nhân tạo (AI)',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop',
    type: 'expert',
    desc: 'Nguyên Kiến trúc sư trưởng giải pháp AI tại Thung lũng Silicon (Mỹ), hơn 12 năm nghiên cứu các mạng nơ-ron đa phân lớp.',
    badge: 'Expert',
    bio: 'TS. Nguyễn Hoàng Nam tốt nghiệp Tiến sĩ Khoa học Máy tính tại Đại học Stanford (Mỹ). Ông có hơn 12 năm kinh nghiệm làm việc làm Kiến trúc sư trưởng giải pháp AI cho các tập đoàn công nghệ lớn tại Thung lũng Silicon trước khi trở về nước tham gia hội đồng khoa học AIUNI.',
    achievements: [
      'Tiến sĩ xuất sắc Đại học Stanford (Mỹ)',
      '12+ năm thiết kế hệ thống Machine Learning quy mô siêu lớn',
      'Đồng tác giả 15 công bố khoa học tại NeurIPS và ICML',
      'Giải thưởng "Trí tuệ trẻ TechDev Thung lũng Silicon"'
    ],
    email: 'nam.nh@aiuni.vn',
    linkedin: 'https://linkedin.com/in/dr-hoang-nam'
  },
  {
    id: 'adv-2',
    name: 'PGS. TS. Lê Hoài Thanh',
    role: 'Giảng viên Đại học',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop',
    type: 'expert',
    desc: 'Giảng viên công nghệ thông tin xuất sắc tại Đại học Quốc gia Hà Nội, chủ nhiệm của hơn 20 đề tài nghiên cứu cấp Nhà nước.',
    badge: 'Academic',
    bio: 'PGS. TS. Lê Hoài Thanh gương mặt khoa học tiêu biểu, chủ nhiệm bộ môn Khoa học Máy tính trường ĐH Công Nghệ - ĐHQGHN. Bà đã có trên 20 năm cống hiến cho giáo dục và hướng dẫn thành công hơn 100 học viên cao học, nghiên cứu sinh trong lĩnh vực Trí Tuệ Nhân Tạo.',
    achievements: [
      'Phó Giáo Sư trẻ ngành Công nghệ thông tin',
      'Chủ nhiệm 12 đề tài cấp quốc gia và liên quốc gia',
      'Hơn 80 bài báo ISI/Scopus về thị giác máy tính',
      'Bằng khen giảng viên xuất sắc cống hiến của Bộ GD&ĐT'
    ],
    email: 'thanh.lh@aiuni.vn',
    linkedin: 'https://linkedin.com/in/prof-hoai-thanh'
  },
  {
    id: 'adv-3',
    name: 'MSc. Trần Quốc Bảo',
    role: 'Chuyên gia Chuyển đổi số',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=256&auto=format&fit=crop',
    type: 'expert',
    desc: 'Cố vấn cấu trúc chuyển đổi số quốc gia, hỗ trợ xây dựng lộ trình tích hợp công nghệ AI cho hơn 50 Tập đoàn đa ngành.',
    badge: 'Strategy',
    bio: 'Thạc sĩ Trần Quốc Bảo là chuyên gia hàng đầu về chiến lược số và tái cấu trúc quy trình hệ thống tại Việt Nam. Ông từng tư vấn tích hợp tự động hóa doanh nghiệp và hạ tầng dữ liệu ứng dụng AI thành công cho nhiều tổ chức tài chính và ngân hàng quốc tế.',
    achievements: [
      'Thạc sĩ Khoa học Hệ thống Đại học Melbourne (Úc)',
      'Cố vấn trưởng chuyển đổi quy trình cho Tập đoàn Vingroup, FPT',
      'Đại biểu tiêu biểu Diễn đàn kinh tế thế giới trẻ ASEAN',
      '10+ năm kinh nghiệm quản lý dự án ERP & AI tối ưu vận hành'
    ],
    email: 'bao.tq@aiuni.vn',
    linkedin: 'https://linkedin.com/in/bao-quoc-tran'
  },
  {
    id: 'adv-4',
    name: 'MBA. Phạm Minh Tuấn',
    role: 'Chuyên gia Doanh nghiệp',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=256&auto=format&fit=crop',
    type: 'expert',
    desc: 'Nguyên Giám đốc vận hành (COO) tại đại diện Vietnam Airlines miền Bắc, chuyên gia tích hợp AI vào chuỗi giá trị và tối ưu chi phí.',
    badge: 'Enterprise',
    bio: 'Ông Phạm Minh Tuấn là chuyên gia chiến lược vận hành xuất sắc với xuất thân lãnh đạo cấp cao trong ngành Hàng không và Logistics. Ông định hình tầm nhìn ứng dụng dữ liệu thông minh trong việc cải tổ chuỗi cung ứng, tiếp thị tự động và chăm sóc khách hàng.',
    achievements: [
      'Tốt nghiệp Thạc sĩ Quản trị Kinh doanh (MBA) ĐH Hawaii (Mỹ)',
      'Nguyên Giám đốc Vận hành khu vực miền Bắc Vietnam Airlines',
      'Đồng sáng lập học viện AIUNI, dẫn đầu mảng Chuyển đổi số Doanh nghiệp',
      'Kiến tạo hệ thống AI Agent chăm sóc khách hàng tiết kiệm 40% chi phí'
    ],
    email: 'tuan.pm@aiuni.vn',
    linkedin: 'https://linkedin.com/in/tuan-pham-mba'
  },
  {
    id: 'adv-5',
    name: 'Dr. Katherine Müller',
    role: 'Nhà nghiên cứu Quốc tế',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=256&auto=format&fit=crop',
    type: 'expert',
    desc: 'Nhà nghiên cứu thâm niên thuộc mạng lưới IEEE AI Society, chuyên môn tối ưu hóa mô hình ngôn ngữ lớn cỡ nhỏ (Edge LLM).',
    badge: 'Research',
    bio: 'Tiến sĩ Katherine Müller là chuyên gia người Đức gốc Thụy Sĩ, có nhiều năm nghiên cứu AI tại Đại học Munich. Bà hợp tác cùng AIUNI để đưa các nghiên cứu hàng đầu về tối ưu thuật toán Edge AI ứng dụng trực tiếp vào các thiết bị thông minh tại Việt Nam.',
    achievements: [
      'Tiến sĩ Vật lý & Tính toán hiệu năng cao ĐH Munich (Đức)',
      'Thành viên ban điều hành IEEE AI Society châu Âu',
      'Phát minh 3 thuật toán nén mô hình ngôn ngữ được ứng dụng toàn cầu',
      'Khách mời chuyên mục nghiên cứu đặc biệt của tạp chí Nature AI'
    ],
    email: 'katherine.m@aiuni.de',
    linkedin: 'https://linkedin.com/in/dr-katherine-muller'
  },
  {
    id: 'adv-6',
    name: 'Prof. David Harrison',
    role: 'Cố vấn trưởng kiến trúc học thuật',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&auto=format&fit=crop',
    type: 'advisor',
    country: 'Hoa Kỳ',
    affiliation: 'MIT Computer Science & Artificial Intelligence Laboratory (CSAIL)',
    flag: '🇺🇸',
    bio: 'Giáo sư David Harrison là huyền thoại giảng dạy trong Khoa Điện tử & Khoa học Máy tính tại MIT. Ông bảo trợ giáo án cho học trình Đào tạo AIUNI Academy, đảm bảo các học trình được thiết kế đạt tiêu chuẩn chất lượng khắt khe nhất của các đại học Ivy League.',
    achievements: [
      'Giáo sư danh dự Đại học MIT',
      'Người tiên phong của cuộc cách mạng mạng nơ-ron hồi quy (RNN) thập niên 90',
      'Đồng sáng lập 3 viện nghiên cứu ứng dụng quy mô quốc gia',
      'Hơn 150.000 trích dẫn khoa học trên Google Scholar'
    ],
    email: 'harrison@mit.edu',
    linkedin: 'https://linkedin.com/in/prof-david-mit'
  },
  {
    id: 'adv-7',
    name: 'Dr. Jean-Pierre Laurent',
    role: 'Cố vấn mô hình hoá & Học sâu',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&auto=format&fit=crop',
    type: 'advisor',
    country: 'Canada',
    affiliation: 'Vector Institute for Artificial Intelligence, Toronto',
    flag: '🇨🇦',
    bio: 'Tiến sĩ Jean-Pierre Laurent là nhà nghiên cứu thuật toán tại Viện Vector, một trong những thánh địa AI toàn cầu. Ông đồng hành xây dựng đội ngũ nghiên cứu sinh nòng cốt cho AIUNI, định hướng các nghiên cứu của viện đi đầu trong kỷ nguyên học sâu.',
    achievements: [
      'Thạc sĩ Khoa học & Tiến sĩ ĐH Toronto dưới sự hướng dẫn của Geoffrey Hinton',
      'Nhà nghiên cứu cao cấp thuộc Toronto Vector Institute',
      'Giải thưởng nghiên cứu xuất sắc của Hiệp hội Trí tuệ Nhân tạo Canada',
      'Trực tiếp hướng dẫn lý thuyết cho nhóm nòng cốt của AIUNI Labs'
    ],
    email: 'laurent.jp@vectorinstitute.ca',
    linkedin: 'https://linkedin.com/in/jean-pierre-laurent-ai'
  },
  {
    id: 'adv-8',
    name: 'Prof. Dr. h.c. Klaus Werner',
    role: 'Cố vấn bảo mật & Đạo đức AI',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=256&auto=format&fit=crop',
    type: 'advisor',
    country: 'Đức',
    affiliation: 'Max Planck Institute for Software Systems',
    flag: '🇩🇪',
    bio: 'Giáo sư Klaus Werner chuyên môn sâu về an ninh thông tin, tính minh bạch của thuật toán học máy và an toàn dữ liệu số. Ông tư vấn cấu trúc an toàn nội bộ cho hệ sinh thái phần mềm doanh nghiệp và các nền tảng tự động hóa của AIUNI Group.',
    achievements: [
      'Tiến sĩ danh dự Đại học Munich (Đức)',
      'Trưởng nhóm nghiên cứu Bảo mật Hệ thống max Planck Institute',
      'Cố vấn cố định chính sách an ninh mạng và đạo đức số cho Ủy ban châu Âu (EU)',
      'Hơn 10 đầu sách giáo trình bảo mật mạng máy tính được dịch sang 5 thứ tiếng'
    ],
    email: 'klaus.werner@mpi.de',
    linkedin: 'https://linkedin.com/in/klaus-werner-security'
  },
  {
    id: 'adv-9',
    name: 'MSc. Evelyn Chen',
    role: 'Cố vấn thương mại hóa & Chuyển giao',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=256&auto=format&fit=crop',
    type: 'advisor',
    country: 'Singapore',
    affiliation: 'AI Singapore (AISG) Executive Advisor',
    flag: '🇸🇬',
    bio: 'Bà Evelyn Chen có hơn 15 năm làm việc tại các quỹ đầu tư công nghệ lớn tại Singapore, điều phối kết nối thương mại hóa giữa các doanh nghiệp Đông Nam Á với nhóm nghiên cứu tính toán cao của chính phủ Singapore.',
    achievements: [
      'Thạc sĩ Tài chính Công nghệ ĐH Quốc gia Singapore (NUS)',
      'Cố vấn trưởng chiến lược quỹ đầu tư mạo hiểm Temasek Holdings',
      'Chuyên gia xúc tiến thương mại hóa giải pháp AI cho hơn 120 startup thành công',
      'Ban liên lạc chiến lược đối tác đặc biệt của AI Singapore khu vực APAC'
    ],
    email: 'evelyn.chen@aisingapore.org',
    linkedin: 'https://linkedin.com/in/evelyn-chen-sg'
  }
];

export const defaultVideos: MediaVideo[] = [
  {
    id: 'vid-1',
    title: 'Giám đốc Công nghệ Học viện AIUNI Trần Tuấn Thành được vinh danh tiêu biểu về Công nghệ số, AI và Blockchain',
    channel: 'HTV1 - Đài Truyền hình TP.HCM',
    embedUrl: 'https://www.youtube.com/embed/j0qNW85NxyQ?si=SfG1mc-5SURP-9Xj',
    badge: 'Vinh danh Tiêu biểu',
    desc: 'Giám đốc Công nghệ Trần Tuấn Thành vinh dự được bình chọn là gương mặt tiêu biểu thúc đẩy công nghệ số, hỗ trợ phổ biến kiến thức blockchain và ứng dụng AI thực tiễn tại Việt Nam.',
    tags: ['Sự kiện', 'Blockchain', 'Chuyển đổi số'],
    channelBadge: 'HTV1'
  },
  {
    id: 'vid-2',
    title: 'Tổng giám đốc Học viện Công nghệ AIUNI Nguyễn Đức Long bàn về vai trò của AI trong thời đại số',
    channel: 'VTV1 - Đài Truyền hình Việt Nam',
    embedUrl: 'https://www.youtube.com/embed/yg6j9WxT_uI?si=tlLZQCiBL1XppIrj',
    badge: 'Thời đại số',
    desc: 'Tổng Giám đốc Nguyễn Đức Long chia sẻ quan điểm sâu bám sát thực tiễn về cơ hội bứt phá năng suất lao động quốc gia nhờ nhanh chóng nâng cao tay nghề ứng dụng GenAI.',
    tags: ['Thời đại số', 'Lao động số', 'VTV1'],
    channelBadge: 'VTV1'
  },
  {
    id: 'vid-3',
    title: 'Dự án Học bổng công nghệ Trí tuệ Nhân tạo đột phá của AIUNI trên sóng truyền hình giáo khoa',
    channel: 'VTV2 - Phóng sự Khoa giáo',
    embedUrl: 'https://www.youtube.com/embed/OYOqjmBufuc?si=CQtEPFCCX2Nvqvzo',
    badge: 'Học bổng Quốc gia',
    desc: 'Hỗ trợ bồi dưỡng, nâng bước tài năng trẻ của Việt Nam with quỹ đầu tư hàng trăm suất học bổng toàn phần chuyên sâu về LLMs, Vector Database từ cơ bản.',
    tags: ['Học bổng', 'Giáo dục số', 'VTV2'],
    channelBadge: 'VTV2'
  },
  {
    id: 'vid-4',
    title: 'Học viện AIUNI đồng hành cùng ban cố vấn chương trình Tư vấn tuyển sinh Quốc gia',
    channel: 'VTV2 - Đồng hành Tuyển sinh',
    embedUrl: 'https://www.youtube.com/embed/2CN9vgE_BCA?si=jxQEo21nTd_i2-N0',
    badge: 'Hướng nghiệp AI',
    desc: 'Giải đáp băn khoăn cho học sinh sinh viên về định hướng phát triển trong kỷ nguyên trí thông minh nhân tạo bùng nổ, tránh bị đào thải khỏi xã hội mới.',
    tags: ['Hướng nghiệp', 'Kỹ nghệ Prompt', 'Chuyên gia'],
    channelBadge: 'VTV2'
  }
];

export const defaultHighlightedPress: HighlightedPress[] = [
  {
    id: 'press-high-1',
    publisher: 'Bộ Khoa học và Công nghệ',
    title: 'Cú bắt tay của các ông lớn công nghệ tại Techfest',
    desc: 'Cổng thông tin điện tử của Bộ Khoa học và Công nghệ ghi nhận buổi ký kết lịch sử của AIUNI cùng các tổ chức tầm vóc, thúc đẩy hạ tầng phần mềm huấn luyện ngôn ngữ quy mô lớn.',
    url: 'https://mst.gov.vn/cu-bat-tay-ong-lon-cong-nghe-197251104085210147.htm',
    badge: 'Cổng thông tin Bộ KH&CN',
    accent: 'border-red-500/30 bg-red-50/40 text-red-700'
  },
  {
    id: 'press-high-2',
    publisher: 'Báo Đại biểu Nhân dân',
    title: 'Việt Nam hỗ trợ Lào thúc đẩy giáo dục STEM và chuyển đổi số học đường',
    desc: 'Cơ quan ngôn luận của Quốc hội Việt Nam viết về hoạt động đào tạo, chuyển giao tri thức hữu nghị đặc sắc của AIUNI, mở ra cơ hội bình đẳng công nghệ cao cho học sinh nước bạn bè.',
    url: 'https://daibieunhandan.vn/viet-nam-ho-tro-lao-thuc-day-giao-duc-stem-10383990.html',
    badge: 'Báo Quốc Hội',
    accent: 'border-amber-500/30 bg-amber-50/40 text-amber-700'
  },
  {
    id: 'press-high-3',
    publisher: 'Báo Nhân Dân',
    title: 'Thước đo năng lực cho các nhân sự công nghệ Việt trong kỷ nguyên bùng nổ AI',
    desc: 'Cơ quan trung ương Đảng Cộng sản Việt Nam phân tích chiều sâu khóa khảo thí và bộ tiêu chuẩn năng lực công nghệ do AIUNI thúc đẩy nhằm chuyên môn hóa quy trình tuyển dụng doanh nghiệp.',
    url: 'https://nhandan.vn/thuoc-do-nang-luc-cho-cac-nhan-su-cong-nghe-viet-post932956.html',
    badge: 'Tiên phong học thuật',
    accent: 'border-blue-500/30 bg-blue-50/40 text-blue-700'
  }
];

export const defaultPressNews: PressNews[] = [
  {
    id: 'news-1',
    publisher: 'Báo Người Hà Nội',
    title: 'Học viện AIUNI ra mắt nền tảng đào tạo nâng cao và Sổ tay thực hành AI thực chiến cho người Việt',
    url: 'https://nguoihanoi.vn/hoc-vien-aiuni-ra-mat-nen-tang-dao-tao-va-so-tay-thuc-hanh-ai-93023.html',
    description: 'Lễ công bố thu hút sự chú ý đặc biệt khi mang lại giải pháp đơn giản hóa Prompt Engineering, ứng dụng lập tức vào mô hình doanh nghiệp SME.'
  },
  {
    id: 'news-2',
    publisher: 'Báo Lao động & Xã hội',
    title: 'Học viện AIUni ra mắt sách nền tảng và công cụ chuyên sâu AI made in Vietnam tự chủ',
    url: 'https://laodongxahoi.tcnnld.vn/pages/detail/31432/Hoc-vien-AIUni-ra-mat-sach-nen-tang-va-cong-cu-AI-made-in-Vietnam.html',
    description: 'Cộng đồng kỹ sư công nghệ hào hứng đón nhận bộ sách đúc kết 100+ tình huống tối ưu hóa Prompt, RAG hữu ích cho khối văn phòng sở ngành.'
  },
  {
    id: 'news-3',
    publisher: 'Báo Thanh niên Việt',
    title: 'AIUNI giới thiệu giải pháp AI học tập tự cá nhân hóa thông minh đầu tiên tại Việt Nam',
    url: 'https://thanhnienviet.vn/aiuni-gioi-thieu-nen-tang-ai-hoc-tap-dau-tien-tai-viet-nam-209250915070407829.htm',
    description: 'Chi tiết giải thuật phân tích tiến độ học tập, tự động gợi ý tài liệu học tập bám sát điểm mạnh yếu của từng học viên trực tuyến.'
  },
  {
    id: 'news-4',
    publisher: 'Thương hiệu & Pháp luật',
    title: 'Học trình đào tạo phi lợi nhuận 1.000 giảng viên GenAI chuyên nghiệp kiến tạo xã hội số',
    url: 'https://thuonghieuvaphapluat.vn/aiuni-dao-tao-1000-giang-vien-genai-kien-tao-xa-hoi-al-toan-dien-d75269.html',
    description: 'Chương trình mang tầm vóc nhân văn sâu rộng phủ sóng trên khắp các tỉnh thành cả nước nhằm nâng cao phổ cập năng lực số giáo dân.'
  },
  {
    id: 'news-5',
    publisher: 'Đài Tiếng nói Việt Nam (VOV World)',
    title: 'Xây dựng tương lai bình dân học vụ số hóa từ nền tảng tri thức AIUNI Group',
    url: 'https://vovworld.vn/vi-VN/xa-hoi-doi-song/hoc-vien-aiuni-ra-mat-nen-tang-dao-tao-va-so-tay-thuc-hanh-ai-2248510.vov5',
    description: 'VOV phỏng vấn và đưa tin về tác động xã hội to lớn khi đưa kiến thức Trí tuệ Nhân tạo đến gần hơn với học sinh vùng cao và trung học.'
  },
  {
    id: 'news-6',
    publisher: 'Tạp chí Điện tử ứng dụng',
    title: 'Cuốn giáo khoa Generative AI đầu tiên được xuất bản bởi đội ngũ chuyên gia công lực Việt',
    url: 'https://dientuungdung.vn/hoc-vien-aiuni-ra-mat-sach-nen-tang-va-cong-cu-ai-made-in-vietnam-11063.html',
    description: 'Đánh giá chuyên môn cao về thiết kế bố cục thực hành, từ sử dụng Midjourney, ChatGPT đến tinh chỉnh mượt mô hình mã nguồn mở.'
  },
  {
    id: 'news-7',
    publisher: 'Báo Giáo dục & Thời đại',
    title: 'Hành trình mang công nghệ cốt lõi bồi dưỡng giáo viên học đường đáp ứng chuẩn STEM',
    url: 'https://giaoducthoidai.vn/khoi-dong-hanh-trinh-pho-cap-tri-tue-nhan-tao-tai-viet-nam-post748504.html',
    description: 'Giải pháp đồng bộ toàn diện nâng cao khả năng thiết kế bài giảng thông minh tích hợp trợ lý Copilot chuyên nghiệp cho giáo viên.'
  },
  {
    id: 'news-8',
    publisher: 'Tạp chí Điện tử ứng dụng',
    title: 'AIUNI công bố chiến lược trọng tâm: Phổ cập AI toàn dân toàn thị trường',
    url: 'https://dientuungdung.vn/aiuni-cong-bo-chien-luoc-pho-cap-ai-toan-dan-12478.html',
    description: 'Đặt tham vọng xóa mù công nghệ cho hàng triệu người lao động phổ thông, hướng tới nâng tầm vị thế gia công phần mềm số quốc gia.'
  },
  {
    id: 'news-9',
    publisher: 'Cổng thông tin Vietnam.vn',
    title: 'Huấn luyện 1.000 sư phạm thế hệ mới lan tỏa bình dân học vụ Trí tuệ Nhân tạo',
    url: 'https://www.vietnam.vn/dao-tao-1-000-giang-vien-ai-pho-cap-tri-tue-nhan-tao-toan-dan',
    description: 'Bộ Thông tin & Truyền thông đưa tin đậm nét về chương trình đào tạo nòng cốt thúc đẩy kỹ năng vàng cho lực lượng giảng viên trẻ.'
  },
  {
    id: 'news-10',
    publisher: 'Báo Nhân đạo & Đời sống VTV',
    title: 'Sức nóng gian hàng trưng bày các mô hình AI trực diện của AIUNI tại chuỗi Techfest Quốc gia',
    url: 'https://nhandaovtv.vn/aiuni-cong-bo-lo-trinh-pho-cap-ai-toan-dan-tai-techfest-vietnam-2025.htm',
    description: 'Hàng ngàn lượt khách trực tiếp tham gia trải nghiệm hỏi đáp trợ lý tuyển sinh, trợ lý phân tích dữ liệu đa phương tiện trực tuyến.'
  },
  {
    id: 'news-11',
    publisher: 'Báo Công thương',
    title: 'Chi tiết lộ trình bồi dưỡng và huấn luyện phương pháp sư phạm GenAI cho doanh nghiệp số',
    url: 'https://congthuong.vn/aluni-khoi-dong-dao-tao-1-000-giang-vien-genai-chuyen-nghiep-413448.html',
    description: 'Những quy tắc thiết kế cấu trúc bài học, kiểm tra bảo đảm học viên có thể ứng dụng thuần thục tự phục vụ công vụ hàng ngày.'
  },
  {
    id: 'news-12',
    publisher: 'Tạp chí Sở hữu Trí tuệ',
    title: 'AIUNI giới thiệu nền tảng AI giáo dục trực quan và bộ hỗ trợ thực hành sáng tạo số',
    url: 'https://sohuutritue.net.vn/aiuni-gioi-thieu-nen-tang-ai-hoc-tap-dau-tien-tai-viet-nam-d321321.html',
    description: 'Tối ưu bản quyền học liệu, trao quyền lưu giữ vĩnh viễn cho học viên hỗ trợ tinh thần tự học bền bỉ trọn đời.'
  },
  {
    id: 'news-13',
    publisher: 'Tạp chí Nhà Quản lý',
    title: 'Kỷ nguyên AI-First: Sứ mệnh hành động đồng hành cùng chính phủ số từ AIUNI Group',
    url: 'https://nhaquanly.vn/aiuni-dong-hanh-cung-chinh-phu-dua-viet-nam-vao-ky-nguyen-ai-first-a17206.html',
    description: 'Chia sẻ các tư liệu tư duy quản lý cấp cao về phân tầng dữ liệu an toàn, thiết lập tường lửa văn phòng không lo rò rỉ bí mật quốc gia.'
  },
  {
    id: 'news-14',
    publisher: 'Báo Thương hiệu Công luận',
    title: 'Khơi dậy làn sóng Bình dân học vụ số 4.0 với chiến lược bàn giao 1.000 giảng viên GenAI chuyên sâu',
    url: 'https://thuonghieucongluan.com.vn/aiuni-khoi-dong-chuong-trinh-dao-tao-1-000-giang-vien-genai-chuyen-nghiep-dong-hanh-cung-phong-trao-binh-dan-hoc-vu-so-quoc-gia-a273194.html',
    description: 'Chương trình nhận được phản hồi tích cực từ cộng đồng khi mang giá trị thật, kỹ năng thật đóng góp hiệu suất cho xã hội phát triển vững vàng.'
  }
];

export const defaultElitePartners: ElitePartner[] = [
  { id: 'ep-1', name: 'VNPT', desc: 'Tập đoàn Bưu chính Viễn thông Việt Nam', iconName: 'Network' },
  { id: 'ep-2', name: 'Agribank', desc: 'Ngân hàng Nông nghiệp & Phát triển Nông thôn', iconName: 'Landmark' },
  { id: 'ep-3', name: 'Vietnam Airlines', desc: 'Hãng Hàng không Quốc gia Việt Nam', iconName: 'Globe' },
  { id: 'ep-4', name: 'CMC Group', desc: 'Tập đoàn Công nghệ CMC', iconName: 'Building' },
  { id: 'ep-5', name: 'TH True Milk', desc: 'Tập đoàn Thực phẩm TH', iconName: 'Building' },
  { id: 'ep-6', name: 'Đại học Quốc gia Hà Nội', desc: 'Đại học nghiên cứu trọng điểm quốc gia', iconName: 'Award' },
  { id: 'ep-7', name: 'Đại học FPT', desc: 'Đơn vị đi đầu đào tạo công nghệ thông tin', iconName: 'Award' },
  { id: 'ep-8', name: 'Đại học Phenikaa', desc: 'Đại học tư thục đổi mới sáng tạo', iconName: 'Award' }
];

export const defaultInternationalCollabs: InternationalCollab[] = [
  {
    id: 'ic-1',
    partner: 'AIUNI x ISODS',
    title: 'International Society of Data Science',
    desc: 'Hợp tác phát triển và chuẩn hóa năng lực học thuật chuẩn quốc tế cao cấp.',
    bulletins: [
      'Cấp bằng & Chứng chỉ quốc tế AI & Data Science chuẩn toàn cầu',
      'Cung cấp chương trình khảo thí kiểm chuẩn kiến thức khoa học máy tính',
      'Liên kết trực diện Đào tạo bậc Đại học & Thạc sĩ chuyển sâu',
      'Tổ chức hàng loạt các cuộc thi AI quốc tế quy mô hàng ngàn thí sinh'
    ],
    lightBg: 'from-blue-50/50 to-indigo-50/10',
    badgeColor: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'ic-2',
    partner: 'AIUNI x KUV',
    title: 'Keiser University Vietnam',
    desc: 'Kết kết hợp học trình chuyển thương trực tiếp, mở dòng du học năng lực cao.',
    bulletins: [
      'Tích hợp chương trình bồi dưỡng quốc tế được Mỹ công nhận',
      'Xây dựng lộ trình chuyển tiếp du học tối ưu kinh tế cho học sinh',
      'Nghiên cứu ứng dụng trí tuệ nhân tạo và khoa học máy tính',
      'Cung cấp các học bổng quốc tế danh giá lên tới 100%'
    ],
    lightBg: 'from-purple-50/50 to-pink-50/10',
    badgeColor: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'ic-3',
    partner: 'AIUNI x CCC Việt Nam',
    title: 'Career & College Counselling',
    desc: 'Số hóa định hướng nghề nghiệp dựa vào giải thuật phân tích tâm lý tư duy khoa học.',
    bulletins: [
      'Triển khai các chương trình hướng nghiệp AI chuyên biệt cho phổ thông',
      'Ứng dụng trắc nghiệm RIASEC đánh giá năng lực tính cách định lượng',
      'Phân tích xu hướng chuyển dạng nghề nghiệp bằng thuật toán thông minh',
      'Đồng hành chuẩn bị các kỹ năng vàng không lo AI thay thế'
    ],
    lightBg: 'from-emerald-50/50 to-teal-50/10',
    badgeColor: 'bg-emerald-100 text-emerald-800'
  }
];

export const defaultDevelopmentVectors: DevelopmentVector[] = [
  { id: 'dv-1', title: 'Phổ Cập AI Toàn Dân', desc: 'Xây dựng giáo trình bình dân hóa tối giản dễ hiểu hỗ trợ cho mọi tầng lớp xã hội học tập thuận lợi.', iconName: 'Compass' },
  { id: 'dv-2', title: 'Xây Dựng Hệ Sinh Thái AI Việt', desc: 'Kết nối chặt chẽ các module phần mềm, phần cứng, học viện để tạo khối vững vàng không lo tụt hậu.', iconName: 'Network' },
  { id: 'dv-3', title: 'Nhân Lực AI Chất Lượng Cao', desc: 'Chỉ đào tạo thực chiến, bàn giao lập trình viên hoặc chuyên viên có năng lực cống hiến tức tốc dài lâu.', iconName: 'Award' },
  { id: 'dv-4', title: 'Kết Nối Quy Chuẩn Quốc Tế', desc: 'Đồng hành cùng Hoa Kỳ, Đức, Singapore để liên tục kiểm duyệt giáo thảo cập nhật hiện đại nhất.', iconName: 'Globe' },
  { id: 'dv-5', title: 'Chuyển Đổi Số Quốc Gia', desc: 'Hỗ trợ nâng chỉ số số hóa toàn dân của các địa phương, sở ban hành hướng tới chính phủ số lành mạnh.', iconName: 'Target' },
  { id: 'dv-6', title: 'Đưa AI Vào Mọi Lĩnh Vực', desc: 'Phủ sóng tác dụng công cụ thông minh vào sâu Khối Hành chính công - Giáo dục - Doanh nghiệp tiện dụng.', iconName: 'Sparkles' }
];

export const defaultMarqueeLogos: MarqueeLogo[] = [
  { id: 'ml-1', name: 'VNPT Group', logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=200&auto=format&fit=crop' },
  { id: 'ml-2', name: 'Agribank Digital', logoUrl: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=200&auto=format&fit=crop' },
  { id: 'ml-3', name: 'FPT Software', logoUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=200&auto=format&fit=crop' },
  { id: 'ml-4', name: 'Keiser University Global', logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=200&auto=format&fit=crop' },
  { id: 'ml-5', name: 'Vietnam Airlines Standard', logoUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=200&auto=format&fit=crop' },
  { id: 'ml-6', name: 'VNG Cloud', logoUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=200&auto=format&fit=crop' },
  { id: 'ml-7', name: 'CMC TS Corporation', logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=200&auto=format&fit=crop' },
  { id: 'ml-8', name: 'Phenikaa Innovation', logoUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=200&auto=format&fit=crop' }
];

export const defaultReports: Report[] = [
  {
    id: 'rep-1',
    title: 'Báo cáo Chuyển đổi số Doanh nghiệp dựa trên Trí tuệ Nhân tạo 2026',
    slug: 'bao-cao-chuyen-doi-so-doanh-nghiep-ai-2026',
    excerpt: 'Phân tích định lượng tỷ suất hoàn vốn ROI, mô hình ứng dụng LLMs và lộ trình tích hợp AI agent vào quy trình vận hành khối Văn phòng.',
    content: `## GIỚI THIỆU TỔNG QUAN\nTrong bối cảnh nền kinh tế số năm 2026, ứng dụng Trí tuệ Nhân tạo không còn dừng lại ở mức thử nghiệm mà đã trở thành động cơ cốt lõi sinh trưởng lợi nhuận của doanh nghiệp. Ấn phẩm này đúc rút số liệu thực tiễn khảo sát từ 500 doanh nghiệp hàng đầu Đông Nam Á.\n\n## 1. PHÂN TÍCH TỶ SUẤT ROI (RETURN ON INVESTMENT)\n- Doanh nghiệp tích hợp AI Agent vào CSKH tăng trưởng 42% doanh số và tiết giảm 60% thời gian phản hồi.\n- Tự động hóa báo cáo tài chính bằng GenAI tiết kiệm bình quân 15 giờ công lao động mỗi tuần cho mỗi nhân viên kế toán.\n\n## 2. LỘ TRÌNH 4 BƯỚC TÍCH HỢP AI AGENT\n- Bước 1: Khảo sát định lượng quy trình & lỗ hổng hiệu suất.\n- Bước 2: Thiết lập cơ sớ tri thức an toàn nội bộ (Clean Vector DB).\n- Bước 3: Triển khai thử nghiệm quy mô Phòng ban (Sandbox).\n- Bước 4: Mở rộng quy mô công nghệ & Huấn luyện cán bộ nhân sự.\n\nChúc quý doanh nghiệp vững bước tiên phong chuyển giao công nghệ cùng học viện AIUNI!`,
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop',
    author: 'Viện Nghiên cứu AIUNI Labs',
    readTime: '18 trang chuyên khảo',
    downloadsCount: 520,
    createdAt: '2026-05-25T10:00:00.000Z',
    date: '25/05/2026',
    externalLink: 'https://www.canva.com/design/DAG6n7xdaIc/cAhZyNaiABVnzXGsoHOOdQ/watch'
  },
  {
    id: 'rep-2',
    title: 'Báo cáo Chiến lược Ứng dụng AI hành chính công & Giáo dục hiện đại',
    slug: 'bao-cao-ung-dung-ai-hanh-chinh-cong-giao-duc',
    excerpt: 'Định hình tương lai bình dân hóa tri thức AI cho toàn bộ công dân, mô hình trường học số và quản trị dữ liệu thông minh đô thị.',
    content: `## TỔNG THUẬT NGHIÊN CỨU\nSự giao hòa giữa chính phủ số và mô hình giáo dục ứng dụng trí tuệ nhân tạo (AI-driven Education) mang lại chuyển biến sâu rộng từ căn bản.\n\n## 1. KHUNG PHÁT TRIỂN AI SCHOOL\n- Sử dụng mô hình học tập cá nhân hóa phù hợp với học tập độc lập.\n- Thiết kế hệ sinh thái trợ giảng ảo (Teaching Assistant Agents) giúp chấm điểm tự động chuyên nghiệp.\n\n## 2. ỨNG DỤNG HÀNH CHÍNH SỐ\n- Tự động chatbot phân tuyến giải đáp thủ tục tri bản hành chính.\n- Tối ưu hóa sơ đồ bộ máy giúp giảm thiểu quá tải dịch vụ.\n\nGia nhập nhóm học tập số tại AIUNI để nắm quyền kiểm soát công cụ thế hệ mới!`,
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop',
    author: 'Ban Chiến lược AIUNI Group',
    readTime: '12 trang chuyên khảo',
    downloadsCount: 341,
    createdAt: '2026-05-25T11:00:00.000Z',
    date: '25/05/2026',
    externalLink: 'https://www.canva.com/design/DAG6n7xdaIc/cAhZyNaiABVnzXGsoHOOdQ/watch'
  }
];

