import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import {
  ArrowLeft,
  Calendar,
  Eye,
  Share2,
  Copy,
  Check,
  Twitter,
  Facebook,
  MessageSquare,
  ThumbsUp,
  Send,
  Tag,
  Sparkles,
} from 'lucide-react';

export const ArticleDetailView: React.FC = () => {
  const {
    t,
    language,
    activeTheme,
    selectedArticleId,
    newsList,
    comments,
    addComment,
    upvoteComment,
    setActiveView,
    setSelectedArticleId,
  } = useStudio();

  const article = newsList.find((n) => n.id === selectedArticleId) || newsList[0];
  const relatedArticles = newsList.filter((n) => n.id !== article.id).slice(0, 2);
  const articleComments = comments.filter((c) => c.targetType === 'news' && c.targetId === article.id);

  const [copied, setCopied] = useState(false);
  const [commentText, setCommentText] = useState('');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment('news', article.id, commentText);
    setCommentText('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Button */}
      <button
        onClick={() => setActiveView('news-list')}
        className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
        <span>Back to News Catalog</span>
      </button>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-md font-black uppercase tracking-wider bg-yellow-500 text-black">
            {language === 'ar' ? article.categoryAr : article.category}
          </span>
          <span className="flex items-center gap-1 text-gray-400 font-mono">
            <Calendar className="w-3.5 h-3.5 text-yellow-500" />
            {article.publishDate}
          </span>
          <span className="flex items-center gap-1 text-gray-400 font-mono">
            <Eye className="w-3.5 h-3.5" />
            {article.views.toLocaleString()} Views
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight" style={{ color: activeTheme.textPrimary }}>
          {language === 'ar' ? article.titleAr : article.title}
        </h1>

        {/* Author Details */}
        <div className="flex items-center gap-3 pt-2">
          <img
            src={article.authorAvatar}
            alt={article.author}
            className="w-10 h-10 rounded-full object-cover border border-yellow-500/40"
            referrerPolicy="no-referrer"
          />
          <div>
            <span className="block text-xs font-bold text-yellow-400">{article.author}</span>
            <span className="text-[10px] text-gray-400">DMX™ Official News Desk</span>
          </div>
        </div>
      </div>

      {/* Main Cover Banner */}
      <div className="relative aspect-video rounded-2xl overflow-hidden border shadow-2xl" style={{ borderColor: `${activeTheme.primaryColor}30` }}>
        <img
          src={article.coverImage}
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Article Body Content */}
      <div className="p-6 sm:p-8 rounded-2xl border backdrop-blur-xl space-y-6" style={{ backgroundColor: activeTheme.cardBg, borderColor: `${activeTheme.primaryColor}20` }}>
        <p className="text-base sm:text-lg text-gray-200 leading-relaxed font-normal">
          {language === 'ar' ? article.contentAr : article.content}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
          <Tag className="w-4 h-4 text-yellow-500" />
          {article.tags.map((tag, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded text-xs font-semibold bg-white/5 border border-white/10 text-gray-300">
              #{tag}
            </span>
          ))}
        </div>

        {/* Share Bar */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs">
          <span className="font-bold text-gray-400 flex items-center gap-2">
            <Share2 className="w-4 h-4 text-yellow-500" />
            {t('shareArticle')}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-white border border-white/10 flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-300" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-6 pt-6">
        <h3 className="text-xl font-extrabold flex items-center gap-2" style={{ color: activeTheme.textPrimary }}>
          <MessageSquare className="w-5 h-5 text-yellow-400" />
          <span>{t('comments')} ({articleComments.length})</span>
        </h3>

        <form onSubmit={handlePostComment} className="flex gap-3">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={t('leaveComment')}
            className="flex-1 px-4 py-3 rounded-xl border bg-white/5 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
            style={{ borderColor: `${activeTheme.primaryColor}30`, color: activeTheme.textPrimary }}
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2"
            style={{ backgroundColor: activeTheme.primaryColor, color: '#000' }}
          >
            <Send className="w-4 h-4" />
            <span>{t('postComment')}</span>
          </button>
        </form>

        <div className="space-y-3">
          {articleComments.map((c) => (
            <div key={c.id} className="p-4 rounded-xl border bg-white/5 border-white/10 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-2">
                  <img src={c.userAvatar} alt={c.userName} className="w-7 h-7 rounded-full object-cover" />
                  <span className="font-bold text-yellow-400">{c.userName}</span>
                </div>
                <span className="text-gray-400">{c.createdAt}</span>
              </div>
              <p className="text-xs text-gray-200">{c.content}</p>
              <button
                onClick={() => upvoteComment(c.id)}
                className="flex items-center gap-1 text-[11px] text-gray-400 hover:text-yellow-400 transition-colors"
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${c.isUpvoted ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                <span>{c.upvotes}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Related Posts */}
      {relatedArticles.length > 0 && (
        <div className="space-y-4 pt-8 border-t border-white/10">
          <h3 className="text-xl font-black" style={{ color: activeTheme.textPrimary }}>
            Related Studio Articles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => setSelectedArticleId(rel.id)}
                className="p-4 rounded-xl border bg-white/5 hover:border-yellow-500/50 cursor-pointer transition-all space-y-2"
              >
                <h4 className="font-bold text-sm line-clamp-1">{language === 'ar' ? rel.titleAr : rel.title}</h4>
                <p className="text-xs text-gray-400 line-clamp-2">{language === 'ar' ? rel.contentAr : rel.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
