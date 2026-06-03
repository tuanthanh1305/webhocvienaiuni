import React, { useState, useEffect } from 'react';
import { X, Calendar, User, Clock, Bookmark, Share2, MessageSquare, Send, Trash2 } from 'lucide-react';
import { BlogPost, Comment } from '../types';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface BlogDetailsModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export default function BlogDetailsModal({ post, onClose }: BlogDetailsModalProps) {
  const [copied, setCopied] = useState(false);
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);

  // Comments State
  const [commentsList, setCommentsList] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [showGuestForm, setShowGuestForm] = useState(false);

  // Monitor Auth User
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsub;
  }, []);

  // Sync / Listen to comments of this blog
  useEffect(() => {
    if (!post) return;

    const q = query(
      collection(db, 'comments'),
      where('blogId', '==', post.id)
    );

    const unsub = onSnapshot(q, (snap) => {
      const list: Comment[] = [];
      snap.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() } as Comment);
      });
      // Sort client-side dynamically by date desc
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setCommentsList(list);
      localStorage.setItem(`local_comments_${post.id}`, JSON.stringify(list));
    }, (err) => {
      console.warn("Could not sync comments dynamically, loading from local repository:", err);
      const cache = localStorage.getItem(`local_comments_${post.id}`);
      if (cache) {
        setCommentsList(JSON.parse(cache));
      }
    });

    return unsub;
  }, [post]);

  if (!post) return null;

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;

    let authorName = 'Học viên ẩn danh';
    let authorEmail = 'guest@aiuni.edu.vn';
    let authorAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop';

    if (currentUser) {
      authorName = currentUser.displayName || currentUser.email || 'Học viên AIUNI';
      authorEmail = currentUser.email || '';
      authorAvatar = currentUser.photoURL || `https://api.dicebear.com/7.x/backgrounds/svg?seed=${encodeURIComponent(authorName)}`;
    } else {
      if (guestName.trim()) {
        authorName = guestName.trim();
        authorAvatar = `https://api.dicebear.com/7.x/backgrounds/svg?seed=${encodeURIComponent(authorName)}`;
      }
      if (guestEmail.trim()) {
        authorEmail = guestEmail.trim().toLowerCase();
      }
    }

    const commentId = 'comment-' + Date.now();
    const newComment: Comment = {
      id: commentId,
      blogId: post.id,
      userName: authorName,
      userEmail: authorEmail,
      userAvatar: authorAvatar,
      content: commentInput.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(doc(db, 'comments', commentId), newComment);
      setCommentInput('');
      setGuestName('');
      setGuestEmail('');
      setShowGuestForm(false);
    } catch (err) {
      console.warn("Offline comment replication saved locally.");
      const updatedList = [newComment, ...commentsList];
      setCommentsList(updatedList);
      localStorage.setItem(`local_comments_${post.id}`, JSON.stringify(updatedList));
      setCommentInput('');
      setGuestName('');
      setGuestEmail('');
      setShowGuestForm(false);
    }
  };

  const handleDeleteComment = async (commentId: string, authorEmail: string) => {
    const isSuperAdmin = currentUser?.email === 'tuanthanhtt1305@gmail.com';
    const isAuthor = currentUser && currentUser.email === authorEmail;

    if (!isSuperAdmin && !isAuthor) {
      alert("Hạn chế bảo mật: Bạn không có quyền xóa bình luận này.");
      return;
    }

    if (!window.confirm("Bảo mật: Xác nhận xóa bỏ bình luận này khỏi hệ thống?")) return;

    try {
      await deleteDoc(doc(db, 'comments', commentId));
    } catch (err) {
      console.warn("Retracting comment locally.");
      const updatedList = commentsList.filter(c => c.id !== commentId);
      setCommentsList(updatedList);
      localStorage.setItem(`local_comments_${post.id}`, JSON.stringify(updatedList));
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-slate-900 border border-slate-800 text-slate-150 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky top info bar */}
        <div className="sticky top-0 bg-slate-950/95 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex items-center justify-between z-15">
          <div className="flex items-center space-x-2">
            <span className="p-1 px-2.5 bg-blue-600/20 text-[#3B82F6] rounded text-[10px] font-bold uppercase tracking-wider border border-blue-500/20">
              {post.category}
            </span>
            <span className="text-xs text-slate-400 font-medium">AIUNI Blog Series</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-400 hover:text-white rounded-full cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Blog Post Content Area */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Metadata Block */}
          <div className="space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-slate-100 leading-tight">
              {post.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-sans border-b border-slate-800/50 pb-4">
              <div className="flex items-center space-x-1.5">
                <User className="h-4 w-4 text-slate-505" />
                <span className="font-semibold text-slate-250">{post.author}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Calendar className="h-4 w-4 text-slate-505" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Clock className="h-4 w-4 text-slate-505" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Large cover banner */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-slate-850 shadow-inner">
            <img
              src={post.coverImage}
              alt={post.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Actual content payload */}
          <div className="font-sans text-sm text-slate-350 leading-relaxed space-y-4 whitespace-pre-line prose prose-invert max-w-none">
            {post.content}
            <br />
            <p className="font-semibold text-blue-400 border-l-4 border-blue-600 pl-4 bg-blue-950/20 py-2.5 rounded-r-xl">
              📍 Liên hệ đăng ký các lớp bồi dưỡng kiến thức AI từ nền tảng đến chuyên sâu ngay hôm nay tại Học viện Công nghệ AIUNI để nhận chiết khấu học phí cực sốc lên tới 35%!
            </p>
          </div>

          <hr className="border-slate-800/80" />

          {/* Share/Actions footprint */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#3B82F6]">
              <Bookmark className="h-4 w-4" />
              <span>Bài viết thuộc giáo trình lưu trữ AIUNI</span>
            </div>

            <button
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => setCopied(false), 3000);
              }}
              className="flex items-center space-x-1.5 text-xs text-blue-400 font-sans hover:text-white cursor-pointer bg-blue-900/20 px-3 py-1.5 rounded-lg border border-blue-500/20 transition-all"
            >
              <Share2 className="h-3.5 w-3.5" />
              <span>{copied ? 'Đã sao chép liên kết! 📋' : 'Chia sẻ bài viết'}</span>
            </button>
          </div>

          <hr className="border-slate-800/80" />

          {/* --- ACTIVE DISCUSSIONS & COMMENTS SECTION --- */}
          <div className="space-y-6 pt-4">
            <h3 className="font-display font-extrabold text-base text-slate-200 flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              <span>Bình luận học viên ({commentsList.length})</span>
            </h3>

            {/* Comment Post Box */}
            <form onSubmit={handlePostComment} className="bg-slate-950 border border-slate-800/90 p-4 rounded-2xl space-y-3.5 shadow-sm">
              <div className="flex items-start space-x-3">
                <div className="h-8 w-8 rounded-full overflow-hidden shrink-0 border border-slate-800">
                  <img
                    src={currentUser?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=150&auto=format&fit=crop'}
                    alt="avatar"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="w-full space-y-2">
                  <textarea
                    rows={2}
                    required
                    placeholder={currentUser ? `Bình luận dưới tên ${currentUser.displayName || currentUser.email}...` : 'Nhập phản hồi, câu hỏi hoặc suy nghĩ của bạn...'}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-850 p-2.5 text-xs rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />

                  {/* Guess Input form expansion if user feels like commenting without Google Auth */}
                  {!currentUser && (
                    <div className="pt-1.5 space-y-2">
                      <button
                        type="button"
                        onClick={() => setShowGuestForm(!showGuestForm)}
                        className="text-[10px] text-slate-400 font-semibold cursor-pointer hover:text-blue-400"
                      >
                        {showGuestForm ? '✕ Sử dụng chế độ ẩn danh mặc định' : '📝 Tùy chỉnh Tên & Email của bạn'}
                      </button>

                      {showGuestForm && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 animate-fade-in">
                          <input
                            type="text"
                            placeholder="Tên hiển thị (e.g. Tuấn Anh)"
                            value={guestName}
                            onChange={(e) => setGuestName(e.target.value)}
                            className="bg-slate-900 border border-slate-850 p-2 rounded-lg text-[11px] text-slate-200 focus:outline-none focus:border-blue-500"
                          />
                          <input
                            type="email"
                            placeholder="Email liên hệ (Không công khai)"
                            value={guestEmail}
                            onChange={(e) => setGuestEmail(e.target.value)}
                            className="bg-slate-900 border border-slate-850 p-2 rounded-lg text-[11px] text-slate-200 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center pt-1 border-t border-slate-800/50">
                <span className="text-[10px] text-slate-500 font-medium">Bình luận tuân thủ văn hóa ứng xử AIUNI</span>
                <button
                  type="submit"
                  className="p-1 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-[11px] font-black tracking-normal uppercase cursor-pointer transition-colors flex items-center space-x-1.5 shadow"
                >
                  <Send className="h-3 w-3" />
                  <span>Gửi Comment</span>
                </button>
              </div>
            </form>

            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
              {commentsList.length > 0 ? (
                commentsList.map((comm) => {
                  const isAuthor = currentUser && currentUser.email === comm.userEmail;
                  const isSuperAdmin = currentUser?.email === 'tuanthanhtt1305@gmail.com';
                  const deleteAuthorized = isAuthor || isSuperAdmin;

                  return (
                    <div key={comm.id} className="bg-slate-950/40 border border-slate-850/60 p-3.5 rounded-2xl flex items-start gap-3 text-xs leading-relaxed group">
                      <img
                        src={comm.userAvatar}
                        alt="avatar"
                        referrerPolicy="no-referrer"
                        className="h-8.5 w-8.5 rounded-full border border-slate-800 shrink-0 object-cover mt-0.5"
                      />
                      <div className="w-full space-y-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-extrabold text-slate-200">{comm.userName}</span>
                            {comm.userEmail === 'tuanthanhtt1305@gmail.com' && (
                              <span className="ml-1.5 p-0.5 px-1.5 bg-amber-600/20 text-amber-500 rounded text-[9px] font-black uppercase tracking-wider font-mono">ROOT ADMIN</span>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className="text-[10px] text-slate-500">{new Date(comm.createdAt).toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })}</span>
                            
                            {deleteAuthorized && (
                              <button
                                type="button"
                                onClick={() => handleDeleteComment(comm.id, comm.userEmail)}
                                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity p-0.5 rounded cursor-pointer"
                                title="Xóa bình luận"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="text-slate-350 text-xs sm:text-[13px]">{comm.content}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center bg-slate-950/20 border border-dashed border-slate-800 rounded-2xl">
                  <p className="text-slate-500 font-semibold text-xs">Chưa có bình luận nào cho bài viết này. Hãy là người đầu tiên bộc lộ suy nghĩ!</p>
                </div>
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
