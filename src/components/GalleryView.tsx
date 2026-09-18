import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { GalleryCategory, GalleryItem } from '../types';
import { Image as ImageIcon, Download, Share2, Filter, X, Eye, Sparkles, MessageSquare, Send, ThumbsUp, Trash2 } from 'lucide-react';

export const GalleryView: React.FC = () => {
  const { t, language, activeTheme, gallery, comments, addComment, upvoteComment, deleteComment, currentUser } = useStudio();

  const [selectedCat, setSelectedCat] = useState<string>('all');
  const [activeLightboxItem, setActiveLightboxItem] = useState<GalleryItem | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: t('allMedia') },
    { key: 'Posters', label: t('posters') },
    { key: 'Wallpapers', label: t('wallpapers') },
    { key: 'Screenshots', label: t('screenshots') },
    { key: 'Concept Art', label: t('conceptArt') },
    { key: 'Promotional Images', label: t('promotionalImages') },
  ];

  const filteredGallery =
    selectedCat === 'all'
      ? gallery
      : gallery.filter((item) => item.category === selectedCat);

  const handleDownload = (item: GalleryItem) => {
    const link = document.createElement('a');
    link.href = item.imageUrl;
    link.download = `${item.title}.jpg`;
    link.target = '_blank';
    link.click();
  };

  const galleryComments = activeLightboxItem
    ? comments.filter((c) => c.targetType === 'gallery' && c.targetId === activeLightboxItem.id)
    : [];

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || !activeLightboxItem) return;
    addComment('gallery', activeLightboxItem.id, commentInput.trim());
    setCommentInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3" style={{ color: activeTheme.textPrimary }}>
          <ImageIcon className="w-8 h-8 text-yellow-400" />
          <span>{t('gallery')} Vault</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          High-resolution 4K/6K key visuals, concept designs, wallpapers, and production stills.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="w-4 h-4 text-yellow-500 mr-2 rtl:ml-2 rtl:mr-0" />
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCat(cat.key)}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all border cursor-pointer ${
              selectedCat === cat.key
                ? 'shadow-lg scale-105'
                : 'hover:bg-white/10 opacity-70 hover:opacity-100'
            }`}
            style={
              selectedCat === cat.key
                ? {
                    backgroundColor: activeTheme.primaryColor,
                    color: '#000',
                    borderColor: activeTheme.primaryColor,
                  }
                : {
                    backgroundColor: `${activeTheme.primaryColor}10`,
                    borderColor: `${activeTheme.primaryColor}30`,
                    color: activeTheme.textPrimary,
                  }
            }
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {filteredGallery.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-white/20 bg-white/5 space-y-4">
          <ImageIcon className="w-12 h-12 text-yellow-400 mx-auto opacity-60" />
          <h3 className="text-xl font-bold text-white">
            {language === 'ar' ? 'معرض الصور فارغ حالياً' : 'Gallery vault is empty'}
          </h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            {language === 'ar'
              ? 'يمكن للمالك إضافة بوسترات، خلفيات، ورسومات فنية من لوحة التحكم.'
              : 'The studio owner can add posters, wallpapers, and artwork from the Admin Dashboard.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxItem(item)}
              className="group relative rounded-2xl overflow-hidden border backdrop-blur-md transition-all duration-300 hover:scale-[1.03] cursor-pointer shadow-xl aspect-[4/3]"
              style={{
                backgroundColor: activeTheme.cardBg,
                borderColor: `${activeTheme.primaryColor}30`,
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Badge */}
              <span className="absolute top-3 left-3 rtl:right-3 rtl:left-auto px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/60 text-yellow-400 border border-yellow-500/30">
                {language === 'ar' ? item.categoryAr : item.category}
              </span>

              {/* Title & Action */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-xs text-white line-clamp-1">
                    {language === 'ar' ? item.titleAr : item.title}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-mono">
                    {item.downloads.toLocaleString()} Downloads
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox Modal with Comments */}
      {activeLightboxItem && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto">
          <button
            onClick={() => setActiveLightboxItem(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="max-w-4xl w-full space-y-6 my-auto max-h-[90vh] overflow-y-auto p-4">
            <div className="relative aspect-video max-h-[60vh] mx-auto rounded-2xl overflow-hidden border shadow-2xl" style={{ borderColor: `${activeTheme.primaryColor}50` }}>
              <img
                src={activeLightboxItem.imageUrl}
                alt={activeLightboxItem.title}
                className="w-full h-full object-contain bg-black"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/10 pb-4">
              <div className="text-left rtl:text-right">
                <h3 className="text-xl font-extrabold text-yellow-400">
                  {language === 'ar' ? activeLightboxItem.titleAr : activeLightboxItem.title}
                </h3>
                <span className="text-xs text-gray-400 font-mono">
                  Category: {activeLightboxItem.category} • HD Quality
                </span>
              </div>

              <button
                onClick={() => handleDownload(activeLightboxItem)}
                className="px-6 py-3 rounded-xl font-extrabold text-sm shadow-xl flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
                style={{ backgroundColor: activeTheme.primaryColor, color: '#000' }}
              >
                <Download className="w-5 h-5" />
                <span>{t('download')}</span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="space-y-4 text-left rtl:text-right pt-2">
              <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-yellow-400" />
                <span>التعليقات على تصميم المعرض ({galleryComments.length})</span>
              </h4>

              <form onSubmit={handlePostComment} className="flex gap-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder={language === 'ar' ? 'اكتب تعليقك على هذا التصميم...' : 'Write a comment...'}
                  className="flex-1 px-4 py-2.5 rounded-xl border bg-black/60 text-white text-xs focus:outline-none focus:border-yellow-400"
                  style={{ borderColor: `${activeTheme.primaryColor}30` }}
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl font-extrabold text-xs bg-yellow-500 text-black hover:bg-yellow-400 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'تعليق' : 'Comment'}</span>
                </button>
              </form>

              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {galleryComments.length === 0 ? (
                  <p className="text-xs text-gray-400 py-2">كن أول من يعلق على هذا التصميم الفني!</p>
                ) : (
                  galleryComments.map((c) => (
                    <div key={c.id} className="p-3 rounded-xl border border-white/10 bg-white/5 space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-yellow-400">{c.userName}</span>
                        <span className="text-[10px] text-gray-500 font-mono">{c.createdAt}</span>
                      </div>
                      <p className="text-gray-300">{c.content}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
