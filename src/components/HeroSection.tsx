import React, { useState, useEffect } from 'react';
import { useStudio } from '../context/StudioContext';
import { Play, Sparkles, Calendar, Film, ShieldAlert, ChevronRight, Award, Zap, BookOpen } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { t, language, activeTheme, animeList, currentUser, setActiveView, setSelectedAnimeId, setSelectedEpisodeId } =
    useStudio();

  // Flagship Anime (if any exists)
  const flagship = animeList[0];

  // Target release date from flagship anime or default future date
  const targetReleaseDate = flagship?.releaseDate || '2027-01-01T00:00:00Z';

  const calculateRealTimeLeft = () => {
    const diff = Math.max(0, new Date(targetReleaseDate).getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: diff <= 0,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateRealTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateRealTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateRealTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetReleaseDate]);

  if (!flagship) {
    return (
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-yellow-500/10 via-black to-[#090a0f]" />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-yellow-400">
              Anime Streaming Portal
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            {language === 'ar' ? 'مرحباً بك في منصة أنيمي ستريم' : 'Welcome to Anime Stream'}
          </h1>

          <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
            {language === 'ar'
              ? 'الموقع جاهز حالياً وفارغ من المحتوى لكي يقوم المالك بإضافة الأنميات، الأخبار، الشخصيات، والمعرض من لوحة التحكم.'
              : 'The studio website is currently clean and empty so the owner can publish official anime, news, and characters via the Admin Dashboard.'}
          </p>

          {currentUser?.role === 'Owner' && (
            <button
              onClick={() => setActiveView('admin')}
              className="px-8 py-4 rounded-xl font-extrabold text-sm sm:text-base bg-yellow-500 text-black hover:bg-yellow-400 transition-all shadow-xl hover:scale-105"
            >
              {language === 'ar' ? 'الانتقال إلى لوحة التحكم لإضافة المحتوى' : 'Go to Admin Dashboard to Add Content'}
            </button>
          )}
        </div>
      </section>
    );
  }

  const handleWatchTrailer = () => {
    setSelectedAnimeId('painter-of-death');
    setSelectedEpisodeId('pod-ep-27-teaser');
    setActiveView('episode-player');
  };

  const handleExplore = () => {
    setActiveView('anime-list');
  };

  return (
    <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Cinematic Canvas */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {activeTheme.customBackground ? (
          <img
            src={activeTheme.customBackground}
            alt="Custom Background"
            className="w-full h-full object-cover opacity-30 scale-105 filter blur-xs"
            referrerPolicy="no-referrer"
          />
        ) : (
          <img
            src={flagship.banner}
            alt={flagship.title}
            className="w-full h-full object-cover opacity-30 scale-105 transform hover:scale-100 transition-transform duration-1000 filter blur-[1px]"
            referrerPolicy="no-referrer"
          />
        )}
        <div
          className="absolute inset-0 bg-gradient-to-t via-black/80 to-black/90"
          style={{
            background: `radial-gradient(circle at 50% 30%, ${activeTheme.primaryColor}15, ${activeTheme.bgBase} 80%)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#090a0f]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
        {/* Studio & Project Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border shadow-xl backdrop-blur-md animate-fade-in">
          <Sparkles className="w-4 h-4 animate-spin text-yellow-400" />
          <span className="text-xs sm:text-sm font-black uppercase tracking-widest" style={{ color: activeTheme.primaryColor }}>
            {t('flagshipSubtitle')}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-ping" />
        </div>

        {/* Anime Title Headline */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight drop-shadow-2xl">
            <span
              className="bg-clip-text text-transparent bg-gradient-to-r"
              style={{
                backgroundImage: `linear-gradient(135deg, ${activeTheme.textPrimary}, ${activeTheme.primaryColor}, #ffffff)`,
              }}
            >
              {language === 'ar' ? flagship.titleAr : flagship.title}
            </span>
          </h1>
          <p className="text-sm sm:text-lg font-semibold tracking-widest text-gray-400 uppercase font-mono">
            {flagship.japaneseTitle}
          </p>
        </div>

        {/* Synopsis Paragraph */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
          {language === 'ar' ? flagship.synopsisAr : flagship.synopsis}
        </p>

        {/* Release Countdown Box */}
        <div
          className="max-w-md mx-auto p-4 rounded-2xl border backdrop-blur-xl shadow-2xl"
          style={{
            backgroundColor: `${activeTheme.cardBg}`,
            borderColor: `${activeTheme.primaryColor}40`,
          }}
        >
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-yellow-400 mb-3">
            <Calendar className="w-4 h-4" />
            <span>{t('releaseCountdown')}</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center font-mono">
            <div className="p-2 rounded-xl bg-black/50 border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-yellow-400">{timeLeft.days}</span>
              <span className="block text-[10px] text-gray-400 uppercase mt-0.5">{t('days')}</span>
            </div>
            <div className="p-2 rounded-xl bg-black/50 border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-yellow-400">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-gray-400 uppercase mt-0.5">{t('hours')}</span>
            </div>
            <div className="p-2 rounded-xl bg-black/50 border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-yellow-400">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-gray-400 uppercase mt-0.5">{t('minutes')}</span>
            </div>
            <div className="p-2 rounded-xl bg-black/50 border border-white/10">
              <span className="text-xl sm:text-2xl font-black text-yellow-400 animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="block text-[10px] text-gray-400 uppercase mt-0.5">{t('seconds')}</span>
            </div>
          </div>
        </div>

        {/* CTA Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={handleWatchTrailer}
            className="px-8 py-4 rounded-xl text-sm sm:text-base font-extrabold shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 cursor-pointer group"
            style={{
              backgroundColor: activeTheme.primaryColor,
              color: '#000',
              boxShadow: `0 0 35px ${activeTheme.primaryColor}50`,
            }}
          >
            <Play className="w-5 h-5 fill-black group-hover:scale-110 transition-transform" />
            <span>{t('watchTrailer')}</span>
          </button>

          <button
            onClick={handleExplore}
            className="px-8 py-4 rounded-xl text-sm sm:text-base font-extrabold border backdrop-blur-md hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2 text-white cursor-pointer"
            style={{
              borderColor: `${activeTheme.primaryColor}50`,
            }}
          >
            <Film className="w-5 h-5 text-yellow-400" />
            <span>{t('exploreAnime')}</span>
            <ChevronRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <button
            onClick={() => setActiveView('manga-novels')}
            className="px-8 py-4 rounded-xl text-sm sm:text-base font-extrabold border bg-amber-500/10 border-amber-500/50 hover:bg-amber-500/20 active:scale-95 transition-all flex items-center gap-2 text-amber-400 cursor-pointer shadow-lg"
          >
            <BookOpen className="w-5 h-5 text-amber-400" />
            <span>{language === 'ar' ? 'المانغا والروايات' : 'Manga & Novels'}</span>
          </button>
        </div>

        {/* Key Studio Metric Badges */}
        <div className="pt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-white/10">
          <div className="p-3 text-center">
            <span className="block text-2xl font-black text-yellow-400 font-mono">6K HDR</span>
            <span className="text-xs text-gray-400 font-medium">Digital Ink Pipeline</span>
          </div>
          <div className="p-3 text-center">
            <span className="block text-2xl font-black text-yellow-400 font-mono">14,000+</span>
            <span className="text-xs text-gray-400 font-medium">Key Frames / Episode</span>
          </div>
          <div className="p-3 text-center">
            <span className="block text-2xl font-black text-yellow-400 font-mono">120+</span>
            <span className="text-xs text-gray-400 font-medium">Senior Animators</span>
          </div>
          <div className="p-3 text-center">
            <span className="block text-2xl font-black text-yellow-400 font-mono">2027</span>
            <span className="text-xs text-gray-400 font-medium">Worldwide Premiere</span>
          </div>
        </div>
      </div>
    </section>
  );
};
