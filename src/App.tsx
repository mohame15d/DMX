import React from 'react';
import { StudioProvider, useStudio } from './context/StudioContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ContinueWatchingBar } from './components/ContinueWatchingBar';
import { AnimeCard } from './components/AnimeCard';
import { AnimeDetailView } from './components/AnimeDetailView';
import { VideoPlayer } from './components/VideoPlayer';
import { NewsSection } from './components/NewsSection';
import { ArticleDetailView } from './components/ArticleDetailView';
import { CharacterList, CharacterDetailView } from './components/CharacterDetailView';
import { GalleryView } from './components/GalleryView';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { AuthModal, UserProfileView } from './components/AuthModal';
import { PrivateChatModal } from './components/PrivateChatModal';
import { AuthGate } from './components/AuthGate';
import { ContactView } from './components/ContactView';
import { CareersView } from './components/CareersView';
import { AdminDashboard } from './components/AdminDashboard';
import { FeedView } from './components/FeedView';
import { MangaNovelsView } from './components/MangaNovelsView';
import { Footer } from './components/Footer';
import { Play, Newspaper, Film, ArrowRight, PlusCircle, Flame, BookOpen } from 'lucide-react';

const MainApp: React.FC = () => {
  const {
    t,
    language,
    currentUser,
    activeView,
    setActiveView,
    activeTheme,
    animeList,
    mangaList,
    newsList,
    setSelectedAnimeId,
    setSelectedArticleId,
  } = useStudio();


  const flagshipAnime = animeList[0];
  const latestNews = newsList.slice(0, 3);

  const handleSelectAnime = (id: string) => {
    setSelectedAnimeId(id);
    setActiveView('anime-detail');
  };

  const handleOpenArticle = (id: string) => {
    setSelectedArticleId(id);
    setActiveView('article-detail');
  };

  return (
    <div
      className="min-h-screen flex flex-col font-sans transition-colors duration-300 w-full max-w-full overflow-x-hidden"
      style={{
        backgroundColor: activeTheme.bgBase,
        color: activeTheme.textPrimary,
        borderRadius: activeTheme.borderRadius === 'none' ? '0px' : '16px',
      }}
    >
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden pb-20 lg:pb-0">
        {activeView === 'home' && (
          <div className="space-y-16">
            <HeroSection />
            <ContinueWatchingBar />

            {/* Featured Anime Catalog Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-yellow-400" />
                    <span className="text-xs font-mono font-bold uppercase tracking-widest text-yellow-400">
                      STUDIO PRODUCTIONS
                    </span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight" style={{ color: activeTheme.textPrimary }}>
                    {language === 'ar' ? 'أعمال الاستوديو' : 'Featured Studio Works'}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveView('anime-list')}
                  className="text-xs font-bold text-yellow-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'ar' ? `عرض الكل (${animeList.length})` : `View All Works (${animeList.length})`}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>

              {animeList.length === 0 ? (
                <div className="p-8 sm:p-12 rounded-3xl border border-dashed border-white/20 bg-white/5 text-center space-y-4">
                  <Film className="w-12 h-12 text-yellow-400 mx-auto opacity-60" />
                  <h3 className="text-xl font-bold text-white">
                    {language === 'ar' ? 'لا توجد أعمال مضافة حالياً' : 'No Anime Titles in Catalog'}
                  </h3>
                  <p className="text-sm text-gray-400 max-w-md mx-auto">
                    {language === 'ar'
                      ? 'يمكن للمالك إضافة الأعمال الرسمية من لوحة التحكم.'
                      : 'The owner can add new official studio productions from the Admin Dashboard.'}
                  </p>
                  {currentUser?.role === 'Owner' && (
                    <button
                      onClick={() => setActiveView('admin')}
                      className="px-6 py-3 rounded-xl font-bold text-xs bg-yellow-500 text-black hover:bg-yellow-400 transition-all shadow-lg inline-flex items-center gap-2 cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4" />
                      <span>{language === 'ar' ? 'إضافة أنيمي جديد من لوحة التحكم' : 'Add Anime via Dashboard'}</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {animeList.map((anime) => (
                    <AnimeCard key={anime.id} anime={anime} onSelect={handleSelectAnime} />
                  ))}
                </div>
              )}
            </section>

            {/* Featured Teaser Highlight */}
            {flagshipAnime && (
              <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                  className="relative rounded-3xl overflow-hidden border p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8"
                  style={{
                    backgroundColor: activeTheme.cardBg,
                    borderColor: `${activeTheme.primaryColor}40`,
                  }}
                >
                  <div className="space-y-4 max-w-xl">
                    <span className="px-3 py-1 rounded-md text-xs font-mono font-extrabold uppercase bg-red-600 text-white shadow-lg">
                      HOT RELEASE
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-black text-white">
                      {language === 'ar' ? flagshipAnime.titleAr : flagshipAnime.title}
                    </h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {language === 'ar' ? flagshipAnime.synopsisAr : flagshipAnime.synopsis}
                    </p>
                    <button
                      onClick={() => {
                        setSelectedAnimeId(flagshipAnime.id);
                        setActiveView('anime-detail');
                      }}
                      className="px-6 py-3.5 rounded-xl font-extrabold text-sm shadow-xl flex items-center gap-2 hover:scale-105 transition-all cursor-pointer"
                      style={{ backgroundColor: activeTheme.primaryColor, color: '#000' }}
                    >
                      <Play className="w-5 h-5 fill-black" />
                      <span>{language === 'ar' ? 'مشاهدة التفاصيل' : 'Watch & View Details'}</span>
                    </button>
                  </div>

                  <div
                    className="w-full md:w-80 aspect-video rounded-2xl overflow-hidden border border-yellow-500/30 shadow-2xl relative group cursor-pointer"
                    onClick={() => {
                      setSelectedAnimeId(flagshipAnime.id);
                      setActiveView('anime-detail');
                    }}
                  >
                    <img src={flagshipAnime.poster} alt={flagshipAnime.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-yellow-400 text-black flex items-center justify-center shadow-2xl">
                        <Play className="w-7 h-7 fill-black translate-x-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Dedicated Manga & Novels Preview Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-amber-500 text-black shadow-md">
                      NEW • STU-MANGA
                    </span>
                  </div>
                  <h2 className="text-3xl font-black tracking-tight" style={{ color: activeTheme.textPrimary }}>
                    {language === 'ar' ? 'قسم المانغا والروايات الخفيفة' : 'Manga & Light Novels Section'}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    {language === 'ar' ? 'منشورات رسمية وقارئ مانغا وروايات تفاعلي خاص باستوديو DMX' : 'Exclusive titles and interactive reader powered by DMX Animation Studio.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('manga-novels')}
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'ar' ? `تصفح القارئ والمكتبة (${mangaList.length})` : `Explore Reader & Library (${mangaList.length})`}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>

              {mangaList.length === 0 ? (
                <div className="p-8 sm:p-10 rounded-3xl border border-amber-500/40 bg-neutral-900/90 text-center space-y-4 shadow-2xl">
                  <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
                    <BookOpen className="w-7 h-7" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-black text-white">
                      {language === 'ar' ? 'قسم المانغا والروايات جاهز ومفعل' : 'Manga & Novels Section is Activated'}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-lg mx-auto leading-relaxed">
                      {language === 'ar'
                        ? 'تم تخصيص هذا القسم بقارئ مانغا تفاعلي متقدم وعارض للروايات الخفيفة. لا توجد أي مانغا وهمية — يمكنك إضافة أعمالك وفصولك الحقيقية مباشرة من لوحة التحكم.'
                        : 'This dedicated section features an interactive Manga Reader and customizable Light Novel Viewer. No fake titles listed — add real manga and novel titles via Admin Dashboard.'}
                    </p>
                  </div>
                  <div className="pt-2 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => setActiveView('manga-novels')}
                      className="px-6 py-3 rounded-xl font-black text-xs bg-amber-500 text-black hover:bg-amber-400 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>{language === 'ar' ? 'فتح قسم وقارئ المانغا' : 'Open Manga Reader'}</span>
                    </button>
                    {currentUser?.role === 'Owner' && (
                      <button
                        onClick={() => setActiveView('admin')}
                        className="px-6 py-3 rounded-xl font-bold text-xs bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-all flex items-center gap-2 cursor-pointer"
                      >
                        <PlusCircle className="w-4 h-4 text-amber-400" />
                        <span>{language === 'ar' ? 'إضافة مانغا/رواية من لوحة التحكم' : 'Add Title in Dashboard'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {mangaList.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveView('manga-novels')}
                      className="p-3 rounded-2xl border border-white/10 bg-black/40 hover:border-amber-500/50 transition-all cursor-pointer group space-y-3"
                    >
                      <div className="aspect-[3/4] rounded-xl overflow-hidden relative">
                        <img src={item.cover} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                        <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-black uppercase bg-amber-500 text-black">
                          {item.type}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                          {language === 'ar' ? item.titleAr : item.title}
                        </h4>
                        <p className="text-[11px] text-gray-400 mt-1">{item.chaptersCount} {language === 'ar' ? 'فصل' : 'chapters'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Latest News Preview Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-4">
                <div>
                  <h2 className="text-3xl font-black tracking-tight" style={{ color: activeTheme.textPrimary }}>
                    {language === 'ar' ? 'آخر الأخبار والتحديثات' : 'Latest Studio News & Releases'}
                  </h2>
                  <p className="text-xs text-gray-400 mt-1">
                    {language === 'ar' ? 'تحديثات صحفية وبيانات رسمية مباشرة من المالك' : 'Direct press updates from DMX™ Executive Desk.'}
                  </p>
                </div>
                <button
                  onClick={() => setActiveView('news-list')}
                  className="text-xs font-bold text-yellow-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{language === 'ar' ? 'تصفح كل الأخبار' : 'Explore All News'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>

              {latestNews.length === 0 ? (
                <div className="p-8 rounded-3xl border border-dashed border-white/20 bg-white/5 text-center space-y-3">
                  <Newspaper className="w-10 h-10 text-yellow-400 mx-auto opacity-60" />
                  <h4 className="text-lg font-bold text-white">
                    {language === 'ar' ? 'لا توجد أخبار مضافة حالياً' : 'No News Releases Published'}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {language === 'ar' ? 'يمكن للمالك كتابة المقالات ونشر الأخبار من لوحة التحكم.' : 'The studio owner can compose press news from the Admin Dashboard.'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {latestNews.map((article) => (
                    <div
                      key={article.id}
                      onClick={() => handleOpenArticle(article.id)}
                      className="p-5 rounded-2xl border bg-white/5 hover:border-yellow-500/40 cursor-pointer transition-all space-y-3 group"
                    >
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-black uppercase bg-yellow-500 text-black">
                        {article.category}
                      </span>
                      <h3 className="font-extrabold text-base group-hover:text-yellow-400 transition-colors line-clamp-2">
                        {language === 'ar' ? article.titleAr : article.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-2">{language === 'ar' ? article.contentAr : article.content}</p>
                      <span className="text-[11px] font-mono text-gray-500 block">{article.publishDate}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}

        {activeView === 'anime-list' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            <div className="border-b border-white/10 pb-6">
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight" style={{ color: activeTheme.textPrimary }}>
                {t('anime')} Catalog
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Browse official production entries, airing titles, and upcoming releases.
              </p>
            </div>
            {animeList.length === 0 ? (
              <div className="p-12 text-center rounded-3xl border border-dashed border-white/20 bg-white/5 space-y-4">
                <Film className="w-12 h-12 text-yellow-400 mx-auto opacity-60" />
                <h3 className="text-xl font-bold text-white">
                  {language === 'ar' ? 'قائمة الأنمي فارغة حالياً' : 'Anime catalog is empty'}
                </h3>
                <p className="text-sm text-gray-400 max-w-md mx-auto">
                  {language === 'ar'
                    ? 'يمكن للمالك إضافة تفاصيل الأنميات والحلقات من لوحة التحكم.'
                    : 'The studio owner can add anime titles and episodes from the Admin Dashboard.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {animeList.map((anime) => (
                  <AnimeCard key={anime.id} anime={anime} onSelect={handleSelectAnime} />
                ))}
              </div>
            )}
          </div>
        )}

        {activeView === 'anime-detail' && <AnimeDetailView />}
        {activeView === 'manga-novels' && <MangaNovelsView />}
        {activeView === 'feed' && <FeedView />}
        {activeView === 'episode-player' && <VideoPlayer />}
        {activeView === 'news-list' && <NewsSection />}
        {activeView === 'article-detail' && <ArticleDetailView />}
        {activeView === 'character-list' && <CharacterList />}
        {activeView === 'character-detail' && <CharacterDetailView />}
        {activeView === 'gallery' && <GalleryView />}
        {activeView === 'careers' && <CareersView />}
        {activeView === 'contact' && <ContactView />}
        {activeView === 'profile' && <UserProfileView />}
        {activeView === 'admin' && <AdminDashboard />}
      </main>

      <GlobalSearchModal />
      <AuthModal />
      <PrivateChatModal />
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StudioProvider>
      <MainApp />
    </StudioProvider>
  );
}
