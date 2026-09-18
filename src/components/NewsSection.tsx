import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { NewsCategory } from '../types';
import { Newspaper, Calendar, Eye, Tag, ArrowRight, Pin, Filter } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const { t, language, activeTheme, newsList, setSelectedArticleId, setActiveView } = useStudio();

  const [selectedCat, setSelectedCat] = useState<string>('all');

  const categories: { key: string; label: string }[] = [
    { key: 'all', label: t('allCategories') },
    { key: 'Studio News', label: t('studioNews') },
    { key: 'Production Updates', label: t('productionUpdatesCat') },
    { key: 'Announcements', label: t('announcements') },
    { key: 'Trailers', label: t('trailersCat') },
    { key: 'Episode Releases', label: t('episodeReleases') },
    { key: 'Community', label: t('communityCat') },
  ];

  const filteredNews =
    selectedCat === 'all'
      ? newsList
      : newsList.filter((item) => item.category === selectedCat);

  const handleOpenArticle = (id: string) => {
    setSelectedArticleId(id);
    setActiveView('article-detail');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3" style={{ color: activeTheme.textPrimary }}>
            <Newspaper className="w-8 h-8 text-yellow-400" />
            <span>{t('news')}</span>
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Official announcements, production logs, and breaking press releases from DMX™ Studio.
          </p>
        </div>
      </div>

      {/* Categories Filter Pills */}
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

      {/* News Grid */}
      {filteredNews.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-white/20 bg-white/5 space-y-4">
          <Newspaper className="w-12 h-12 text-yellow-400 mx-auto opacity-60" />
          <h3 className="text-xl font-bold text-white">
            {language === 'ar' ? 'لا توجد أخبار مضافة حالياً' : 'No news articles available yet'}
          </h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            {language === 'ar'
              ? 'الموقع فارغ من الأخبار حالياً، ويمكن للمالك إضافة الأخبار والمقالات الحصرية من لوحة التحكم.'
              : 'The news list is empty so the studio owner can publish official press updates from the Admin Dashboard.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <div
              key={article.id}
              onClick={() => handleOpenArticle(article.id)}
              className="group rounded-2xl overflow-hidden border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between shadow-xl"
              style={{
                backgroundColor: activeTheme.cardBg,
                borderColor: `${activeTheme.primaryColor}25`,
              }}
            >
              {/* Cover Image */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                {/* Category Badge */}
                <span className="absolute top-3 left-3 rtl:right-3 rtl:left-auto px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-yellow-500 text-black shadow-lg">
                  {language === 'ar' ? article.categoryAr : article.category}
                </span>

                {article.isPinned && (
                  <span className="absolute top-3 right-3 rtl:left-3 rtl:right-auto p-1.5 rounded-full bg-red-600 text-white shadow-lg">
                    <Pin className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-400 font-mono mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-yellow-500" />
                      {article.publishDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" />
                      {article.views.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base sm:text-lg line-clamp-2 group-hover:text-yellow-400 transition-colors">
                    {language === 'ar' ? article.titleAr : article.title}
                  </h3>
                  <p className="text-xs text-gray-300 line-clamp-2 mt-2 font-normal leading-relaxed">
                    {language === 'ar' ? article.contentAr : article.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-bold text-yellow-400">
                  <span>{t('readMore')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
