import React from 'react';
import { useStudio } from '../context/StudioContext';
import { Play, Clock, X, ChevronRight } from 'lucide-react';

export const ContinueWatchingBar: React.FC = () => {
  const {
    language,
    activeTheme,
    currentUser,
    episodes,
    animeList,
    setSelectedAnimeId,
    setSelectedEpisodeId,
    setActiveView,
  } = useStudio();

  if (!currentUser || !currentUser.watchHistory || currentUser.watchHistory.length === 0) {
    return null;
  }

  // Filter valid watch history items
  const validHistory = currentUser.watchHistory
    .map((item) => {
      const ep = episodes.find((e) => e.id === item.episodeId);
      const anime = animeList.find((a) => a.id === item.animeId);
      return { ...item, episode: ep, anime };
    })
    .filter((item) => item.anime && item.episode)
    .slice(0, 4); // Top 4 recently watched

  if (validHistory.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4 pt-4">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <h3 className="text-lg font-black text-yellow-400 flex items-center gap-2">
          <Clock className="w-5 h-5 text-yellow-400 animate-pulse" />
          <span>{language === 'ar' ? 'متابعة المشاهدة (Continue Watching)' : 'Continue Watching'}</span>
        </h3>
        <span className="text-xs text-gray-400 font-mono">
          {validHistory.length} {language === 'ar' ? 'أنيمي قيد المشاهدة' : 'In Progress'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {validHistory.map((item) => {
          const { episode, anime, timestamp, duration } = item;
          if (!episode || !anime) return null;

          const progressPercent = duration ? Math.min(100, Math.round((timestamp / duration) * 100)) : 30;

          return (
            <div
              key={episode.id}
              onClick={() => {
                setSelectedAnimeId(anime.id);
                setSelectedEpisodeId(episode.id);
                setActiveView('episode-player');
              }}
              className="p-3 rounded-2xl border border-white/10 bg-white/5 hover:border-yellow-500/50 hover:bg-white/10 transition-all cursor-pointer flex items-center gap-3 group relative overflow-hidden shadow-lg"
            >
              <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0">
                <img
                  src={episode.thumbnail || anime.poster}
                  alt={episode.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-black translate-x-0.5" />
                  </div>
                </div>
                {/* Progress bar overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/60">
                  <div className="h-full bg-yellow-400" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <h4 className="font-bold text-xs text-white truncate group-hover:text-yellow-400 transition-colors">
                  {language === 'ar' ? anime.titleAr : anime.title}
                </h4>
                <p className="text-[11px] text-gray-400 truncate mt-0.5">
                  {language === 'ar' ? episode.titleAr : episode.title}
                </p>
                <div className="flex items-center justify-between text-[10px] text-yellow-400 font-mono mt-1">
                  <span>{progressPercent}% Complete</span>
                  <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
