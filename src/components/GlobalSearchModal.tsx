import React, { useState, useEffect } from 'react';
import { useStudio } from '../context/StudioContext';
import { Search, X, Tv, Newspaper, Users, Image as ImageIcon, ArrowRight } from 'lucide-react';

export const GlobalSearchModal: React.FC = () => {
  const {
    t,
    language,
    activeTheme,
    isSearchOpen,
    setIsSearchOpen,
    animeList,
    newsList,
    characters,
    gallery,
    setSelectedAnimeId,
    setSelectedArticleId,
    setSelectedCharacterId,
    setActiveView,
  } = useStudio();

  const [query, setQuery] = useState('');

  // Shortcut key listener for Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      } else if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const trimmed = query.trim().toLowerCase();

  const matchingAnime = trimmed
    ? animeList.filter(
        (a) =>
          a.title.toLowerCase().includes(trimmed) ||
          a.titleAr.includes(trimmed) ||
          a.synopsis.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingNews = trimmed
    ? newsList.filter(
        (n) =>
          n.title.toLowerCase().includes(trimmed) ||
          n.titleAr.includes(trimmed) ||
          n.content.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingChars = trimmed
    ? characters.filter(
        (c) =>
          c.name.toLowerCase().includes(trimmed) ||
          c.nameAr.includes(trimmed) ||
          c.biography.toLowerCase().includes(trimmed)
      )
    : [];

  const matchingGallery = trimmed
    ? gallery.filter(
        (g) =>
          g.title.toLowerCase().includes(trimmed) ||
          g.titleAr.includes(trimmed)
      )
    : [];

  const hasResults =
    matchingAnime.length > 0 ||
    matchingNews.length > 0 ||
    matchingChars.length > 0 ||
    matchingGallery.length > 0;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-start justify-center pt-20 px-4">
      <div
        className="max-w-3xl w-full rounded-2xl border shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        style={{
          backgroundColor: activeTheme.cardBg,
          borderColor: `${activeTheme.primaryColor}50`,
        }}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center gap-3">
          <Search className="w-6 h-6 text-yellow-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="flex-1 bg-transparent text-lg sm:text-xl font-bold focus:outline-none"
            style={{ color: activeTheme.textPrimary }}
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="p-4 overflow-y-auto space-y-6">
          {!trimmed && (
            <p className="text-xs text-center text-gray-400 py-10">
              Type to instantly search across Anime, News, Characters, and Gallery...
            </p>
          )}

          {trimmed && !hasResults && (
            <p className="text-xs text-center text-gray-400 py-10">{t('noSearchResults')}</p>
          )}

          {/* Anime Group */}
          {matchingAnime.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
                <Tv className="w-4 h-4" />
                <span>{t('searchAnimeGroup')}</span>
              </span>
              <div className="space-y-1">
                {matchingAnime.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => {
                      setSelectedAnimeId(a.id);
                      setActiveView('anime-detail');
                      setIsSearchOpen(false);
                    }}
                    className="p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-yellow-500/30 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img src={a.poster} alt={a.title} className="w-10 h-14 object-cover rounded-md" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="font-bold text-sm" style={{ color: activeTheme.textPrimary }}>
                          {language === 'ar' ? a.titleAr : a.title}
                        </h4>
                        <span className="text-xs text-gray-400 font-mono">{a.status}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-yellow-400 rtl:rotate-180" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* News Group */}
          {matchingNews.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
                <Newspaper className="w-4 h-4" />
                <span>{t('searchNewsGroup')}</span>
              </span>
              <div className="space-y-1">
                {matchingNews.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      setSelectedArticleId(n.id);
                      setActiveView('article-detail');
                      setIsSearchOpen(false);
                    }}
                    className="p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-yellow-500/30 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div>
                      <h4 className="font-bold text-sm" style={{ color: activeTheme.textPrimary }}>
                        {language === 'ar' ? n.titleAr : n.title}
                      </h4>
                      <span className="text-xs text-gray-400 font-mono">{n.category}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-yellow-400 rtl:rotate-180" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Characters Group */}
          {matchingChars.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{t('searchCharGroup')}</span>
              </span>
              <div className="space-y-1">
                {matchingChars.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCharacterId(c.id);
                      setActiveView('character-detail');
                      setIsSearchOpen(false);
                    }}
                    className="p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-yellow-500/30 cursor-pointer flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img src={c.portrait} alt={c.name} className="w-10 h-10 object-cover rounded-full" referrerPolicy="no-referrer" />
                      <div>
                        <h4 className="font-bold text-sm" style={{ color: activeTheme.textPrimary }}>
                          {language === 'ar' ? c.nameAr : c.name}
                        </h4>
                        <span className="text-xs text-gray-400 font-mono">{c.role}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-yellow-400 rtl:rotate-180" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
