import React from 'react';
import { Anime } from '../types';
import { useStudio } from '../context/StudioContext';
import { Play, Star, Sparkles, Heart } from 'lucide-react';

interface AnimeCardProps {
  anime: Anime;
  onSelect: (id: string) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onSelect }) => {
  const { t, language, activeTheme, currentUser, toggleFavorite } = useStudio();

  const isFav = currentUser?.favorites.includes(anime.id);

  return (
    <div
      onClick={() => onSelect(anime.id)}
      className="group relative rounded-2xl overflow-hidden border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col justify-between shadow-xl"
      style={{
        backgroundColor: activeTheme.cardBg,
        borderColor: `${activeTheme.primaryColor}30`,
      }}
    >
      {/* Poster Image & Overlay */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={anime.poster}
          alt={anime.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

        {/* Status Pill */}
        <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto">
          <span
            className="px-2.5 py-1 rounded-md text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1 backdrop-blur-md"
            style={{
              backgroundColor:
                anime.status === 'In Production'
                  ? '#ef4444'
                  : anime.status === 'Airing'
                  ? '#22c55e'
                  : '#3b82f6',
              color: '#fff',
            }}
          >
            <Sparkles className="w-3 h-3" />
            <span>{language === 'ar' ? anime.statusAr : anime.status}</span>
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(anime.id);
          }}
          className="absolute top-3 right-3 rtl:left-3 rtl:right-auto p-2 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 transition-all text-white"
          title="Add to Favorites"
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-red-500 text-red-500' : 'text-white'}`} />
        </button>

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform"
            style={{
              backgroundColor: activeTheme.primaryColor,
              color: '#000',
            }}
          >
            <Play className="w-7 h-7 fill-black translate-x-0.5" />
          </div>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-gray-400 mb-1">
            <span>{anime.officialRelease}</span>
            <span className="flex items-center gap-1 text-yellow-400 font-bold">
              <Star className="w-3.5 h-3.5 fill-yellow-400" />
              {anime.rating}
            </span>
          </div>

          <h3 className="font-extrabold text-base sm:text-lg line-clamp-1 group-hover:text-yellow-400 transition-colors">
            {language === 'ar' ? anime.titleAr : anime.title}
          </h3>
          <p className="text-xs text-gray-400 line-clamp-2 mt-1 font-normal">
            {language === 'ar' ? anime.synopsisAr : anime.synopsis}
          </p>
        </div>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 pt-2 border-t border-white/10">
          {(language === 'ar' ? anime.genresAr : anime.genres).slice(0, 3).map((g, i) => (
            <span
              key={i}
              className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-300"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
