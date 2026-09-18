import React from 'react';
import { useStudio } from '../context/StudioContext';
import { CountdownTimer } from './CountdownTimer';
import {
  Play,
  Heart,
  Star,
  Sparkles,
  Calendar,
  Film,
  Users,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Share2,
  Tag,
  Edit,
  Plus,
  UserPlus,
} from 'lucide-react';

export const AnimeDetailView: React.FC = () => {
  const {
    t,
    language,
    activeTheme,
    selectedAnimeId,
    animeList,
    episodes,
    characters,
    productionUpdates,
    newsList,
    setActiveView,
    setSelectedEpisodeId,
    setSelectedAnimeId,
    setSelectedCharacterId,
    setSelectedArticleId,
    currentUser,
    toggleFavorite,
  } = useStudio();

  const anime = animeList.find((a) => a.id === selectedAnimeId) || animeList[0];
  const isFav = currentUser?.favorites.includes(anime.id);

  const animeEpisodes = episodes.filter((e) => e.animeId === anime.id);
  const animeCharacters = characters.filter((c) => c.animeId === anime.id);
  const animeRoadmap = productionUpdates.filter((p) => p.animeId === anime.id);
  const relatedNews = newsList.filter((n) => n.tags.some((tag) => tag.toLowerCase().includes(anime.title.toLowerCase())));

  const handlePlayEpisode = (epId: string) => {
    setSelectedEpisodeId(epId);
    setActiveView('episode-player');
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Back Button & Owner Action */}
      <div className="max-w-7xl mx-auto px-4 pt-6 flex justify-between items-center">
        <button
          onClick={() => setActiveView('anime-list')}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{language === 'ar' ? 'العودة إلى دليل الأساليب والأعمال' : 'Back to Catalog'}</span>
        </button>

        {currentUser?.role === 'Owner' && (
          <button
            onClick={() => setActiveView('admin')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 hover:bg-amber-500/30 text-xs font-black transition-all cursor-pointer shadow-lg"
          >
            <Edit className="w-4 h-4" />
            <span>{language === 'ar' ? 'المالك: تعديل البيانات والصور والتريلر' : 'Owner: Edit Title, Posters & Trailer'}</span>
          </button>
        )}
      </div>

      {/* Hero Banner Header */}
      <div className="relative w-full min-h-[500px] flex items-end">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={anime.banner}
            alt={anime.title}
            className="w-full h-full object-cover filter blur-[2px] opacity-40 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-[#090a0f]/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
            {/* Poster Card */}
            <div className="w-56 sm:w-64 rounded-2xl overflow-hidden border-2 shadow-2xl shrink-0 group relative"
              style={{ borderColor: `${activeTheme.primaryColor}50` }}>
              <img
                src={anime.poster}
                alt={anime.title}
                className="w-full aspect-[3/4] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-md text-xs font-black uppercase tracking-wider bg-red-600 text-white shadow-lg">
                  {language === 'ar' ? anime.statusAr : anime.status}
                </span>
              </div>
            </div>

            {/* Info Title & Quick Badges */}
            <div className="space-y-4 text-center md:text-left rtl:md:text-right flex-1">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                  Trailer #{anime.firstTrailer}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-gray-300 border border-white/20">
                  Release: {anime.officialRelease}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-gray-300 border border-white/20">
                  {anime.studio}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ color: activeTheme.textPrimary }}>
                {language === 'ar' ? anime.titleAr : anime.title}
              </h1>
              <p className="text-sm font-mono text-gray-400">{anime.japaneseTitle}</p>

              {/* Genres Pills */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-1">
                {(language === 'ar' ? anime.genresAr : anime.genres).map((g, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-gray-200"
                  >
                    {g}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-4">
                <button
                  onClick={() => handlePlayEpisode(animeEpisodes[0]?.id || 'pod-ep-27-teaser')}
                  className="px-6 py-3 rounded-xl font-extrabold text-sm shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                  style={{ backgroundColor: activeTheme.primaryColor, color: '#000' }}
                >
                  <Play className="w-5 h-5 fill-black" />
                  <span>{t('watchTrailer')}</span>
                </button>

                <button
                  onClick={() => toggleFavorite(anime.id)}
                  className="px-4 py-3 rounded-xl font-bold text-sm border bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2 text-white"
                  style={{ borderColor: `${activeTheme.primaryColor}30` }}
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  <span>{isFav ? 'In Favorites' : 'Add to Favorites'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Release Countdown Timer */}
        <CountdownTimer
          targetDate={anime.releaseDate || '2026-12-31T20:00:00'}
          title={language === 'ar' ? anime.titleAr : anime.title}
        />

        {/* Synopsis Section */}
        <div
          className="p-6 sm:p-8 rounded-2xl border backdrop-blur-xl shadow-xl space-y-3"
          style={{ backgroundColor: activeTheme.cardBg, borderColor: `${activeTheme.primaryColor}25` }}
        >
          <h2 className="text-xl font-extrabold flex items-center gap-2 text-yellow-400">
            <Film className="w-5 h-5" />
            <span>{t('synopsis')}</span>
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
            {language === 'ar' ? anime.synopsisAr : anime.synopsis}
          </p>
        </div>

        {/* Episodes Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: activeTheme.textPrimary }}>
              <Play className="w-6 h-6 text-yellow-400" />
              <span>{t('episodesList')} ({animeEpisodes.length})</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {animeEpisodes.map((ep) => (
              <div
                key={ep.id}
                onClick={() => handlePlayEpisode(ep.id)}
                className="group relative rounded-xl overflow-hidden border bg-white/5 hover:border-yellow-500/50 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={ep.thumbnail}
                    alt={ep.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-black translate-x-0.5" />
                    </div>
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-mono bg-black/80 text-white">
                    {ep.duration}
                  </span>
                </div>

                <div className="p-3">
                  <h4 className="font-bold text-sm line-clamp-1 group-hover:text-yellow-400 transition-colors">
                    {language === 'ar' ? ep.titleAr : ep.title}
                  </h4>
                  <p className="text-xs text-gray-400 line-clamp-1 mt-1 font-normal">
                    {language === 'ar' ? ep.synopsisAr : ep.synopsis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Characters Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-3">
            <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: activeTheme.textPrimary }}>
              <Users className="w-6 h-6 text-yellow-400" />
              <span>{t('charactersCast')}</span>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                {animeCharacters.length}
              </span>
            </h2>

            {(currentUser?.role === 'Owner' || currentUser?.role === 'Admin' || currentUser?.role === 'Publisher') && (
              <button
                onClick={() => setActiveView('admin')}
                className="px-4 py-2 rounded-xl border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-lg"
              >
                <UserPlus className="w-4 h-4 text-yellow-400" />
                <span>{language === 'ar' ? 'إضافة شخصية لهذا الأنيمي' : 'Add Character to this Anime'}</span>
              </button>
            )}
          </div>

          {animeCharacters.length === 0 ? (
            <div className="p-8 rounded-2xl border border-dashed border-white/20 bg-white/5 text-center space-y-3">
              <Users className="w-10 h-10 text-yellow-400 mx-auto opacity-50" />
              <p className="text-sm text-gray-300 font-bold">
                {language === 'ar' ? 'لا توجد شخصيات مضافة لهذا الأنيمي حتى الآن.' : 'No characters added for this anime yet.'}
              </p>
              {(currentUser?.role === 'Owner' || currentUser?.role === 'Admin' || currentUser?.role === 'Publisher') && (
                <button
                  onClick={() => setActiveView('admin')}
                  className="px-5 py-2.5 rounded-xl bg-yellow-400 text-black text-xs font-black hover:bg-yellow-300 transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{language === 'ar' ? 'إضافة أبطال وشخصيات جديدة الآن' : 'Add Character Entry Now'}</span>
                </button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {animeCharacters.map((char) => (
                <div
                  key={char.id}
                  onClick={() => {
                    setSelectedCharacterId(char.id);
                    setActiveView('character-detail');
                  }}
                  className="p-4 rounded-xl border bg-white/5 hover:border-yellow-500/50 transition-all cursor-pointer flex items-center gap-4 group relative"
                >
                  <img
                    src={char.portrait}
                    alt={char.name}
                    className="w-16 h-16 rounded-xl object-cover border border-white/20 group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-extrabold text-sm group-hover:text-yellow-400 transition-colors truncate">
                      {language === 'ar' ? char.nameAr : char.name}
                    </h4>
                    <p className="text-xs text-yellow-500 font-medium truncate">
                      {language === 'ar' ? char.roleAr : char.role}
                    </p>
                    <span className="text-[11px] text-gray-400 font-mono mt-1 block truncate">
                      CV: {language === 'ar' ? char.voiceActor?.nameAr : char.voiceActor?.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Production Roadmap / Updates */}
        {animeRoadmap.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-black flex items-center gap-2 border-b border-white/10 pb-3" style={{ color: activeTheme.textPrimary }}>
              <Sparkles className="w-6 h-6 text-yellow-400" />
              <span>{t('productionUpdates')}</span>
            </h2>

            <div className="space-y-4">
              {animeRoadmap.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-xl border backdrop-blur-md space-y-2"
                  style={{ backgroundColor: activeTheme.cardBg, borderColor: `${activeTheme.primaryColor}30` }}
                >
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-yellow-400">{language === 'ar' ? item.titleAr : item.title}</span>
                    <span className="font-mono text-xs text-gray-400">{item.progressPercentage}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${item.progressPercentage}%`,
                        backgroundColor: activeTheme.primaryColor,
                      }}
                    />
                  </div>

                  <p className="text-xs text-gray-300">
                    {language === 'ar' ? item.descriptionAr : item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Similar Anime Recommendations */}
        <div className="space-y-4 pt-6">
          <h2 className="text-2xl font-black flex items-center gap-2 border-b border-white/10 pb-3" style={{ color: activeTheme.textPrimary }}>
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span>{language === 'ar' ? 'أنميات مقترحة مشابهة' : 'Similar Anime Recommendations'}</span>
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {animeList
              .filter((a) => a.id !== anime.id && a.genres.some((g) => anime.genres.includes(g)))
              .slice(0, 4)
              .map((rec) => (
                <div
                  key={rec.id}
                  onClick={() => setSelectedAnimeId(rec.id)}
                  className="group rounded-2xl overflow-hidden border bg-white/5 border-white/10 hover:border-yellow-500/50 transition-all cursor-pointer flex flex-col justify-between p-2"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <img
                      src={rec.poster}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono font-bold text-yellow-400">
                      ★ {rec.rating}
                    </div>
                  </div>
                  <div className="p-2">
                    <h4 className="font-bold text-xs line-clamp-1 group-hover:text-yellow-400 transition-colors">
                      {language === 'ar' ? rec.titleAr : rec.title}
                    </h4>
                    <span className="text-[10px] text-gray-400 mt-1 block">
                      {language === 'ar' ? rec.statusAr : rec.status}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
