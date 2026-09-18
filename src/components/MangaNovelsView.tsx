import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { MangaNovelItem, MangaChapter } from '../types';
import {
  BookOpen,
  BookMarked,
  Sparkles,
  Search,
  Star,
  Layers,
  ChevronRight,
  ChevronLeft,
  X,
  Eye,
  Calendar,
  MessageSquare,
  Zap,
  Bookmark,
  Sliders,
  Type,
  Sun,
  Moon,
  ArrowLeft,
  Share2,
} from 'lucide-react';

export const MangaNovelsView: React.FC = () => {
  const {
    language,
    mangaList,
    selectedMangaId,
    setSelectedMangaId,
    comments,
    addComment,
    currentUser,
    setIsAuthModalOpen,
    setActiveView,
  } = useStudio();

  // State Filters
  const [filterType, setFilterType] = useState<'all' | 'manga' | 'light_novel'>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Reader Overlay State
  const [activeReadingChapter, setActiveReadingChapter] = useState<MangaChapter | null>(null);
  const [mangaPageIndex, setMangaPageIndex] = useState<number>(0);

  // Novel Typography Settings
  const [novelFontSize, setNovelFontSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const [novelTheme, setNovelTheme] = useState<'dark' | 'sepia' | 'midnight' | 'paper'>('dark');
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  // Comment input state
  const [chapterComment, setChapterComment] = useState<string>('');

  const activeManga = mangaList.find((item) => item.id === selectedMangaId) || null;

  // Filtered List
  const filteredMangaList = mangaList.filter((item) => {
    const matchesType =
      filterType === 'all'
        ? true
        : filterType === 'manga'
        ? item.type === 'manga'
        : item.type === 'light_novel';

    const titleStr = language === 'ar' ? item.titleAr : item.title;
    const matchesSearch =
      titleStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    const genresList = language === 'ar' ? item.genresAr : item.genres;
    const matchesGenre =
      selectedGenre === 'all' ? true : genresList.some((g) => g.toLowerCase() === selectedGenre.toLowerCase());

    return matchesType && matchesSearch && matchesGenre;
  });

  // Extract all unique genres
  const allGenres = Array.from(
    new Set(mangaList.flatMap((item) => (language === 'ar' ? item.genresAr : item.genres)))
  );

  const handleOpenReader = (chapter: MangaChapter) => {
    setActiveReadingChapter(chapter);
    setMangaPageIndex(0);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePostChapterComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapterComment.trim()) return;
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (activeManga && activeReadingChapter) {
      addComment('anime', `${activeManga.id}-${activeReadingChapter.id}`, chapterComment);
      setChapterComment('');
    }
  };

  const currentComments =
    activeManga && activeReadingChapter
      ? comments.filter((c) => c.targetId === `${activeManga.id}-${activeReadingChapter.id}`)
      : [];

  return (
    <div className="min-w-full space-y-10 pb-20">
      {/* HEADER HERO BANNER */}
      {!activeManga && !activeReadingChapter && (
        <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 p-8 sm:p-12 shadow-2xl bg-gradient-to-br from-neutral-900 via-amber-950/20 to-black">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>{language === 'ar' ? 'قسم المانغا والروايات الخفيفة' : 'Manga & Light Novels Hub'}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {language === 'ar' ? (
                <>
                  استكشف مكتبة <span className="text-amber-400">DMX™</span> للمانغا والروايات
                </>
              ) : (
                <>
                  Explore the <span className="text-amber-400">DMX™</span> Manga & Novel Library
                </>
              )}
            </h1>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {language === 'ar'
                ? 'اقرأ الفصول والأجزاء الرسمية المترجمة والمجانية المكتوبة والمرسومة بواسطة طاقم استوديو DMX™ Animation Studio. تجربة قراءة تفاعلية عالية الدقة مع قارئ الروايات التكيفي.'
                : 'Read official high-definition chapters and volumes produced and published by DMX™ Animation Studio. Complete with an interactive manga image viewer and custom light novel reader.'}
            </p>

            {/* Quick Stats Bar */}
            <div className="grid grid-cols-3 gap-4 pt-4 max-w-lg">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-xs text-gray-400 block">{language === 'ar' ? 'العناوين المتاحة' : 'Titles'}</span>
                <span className="text-lg font-black text-amber-400 font-mono">{mangaList.length}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-xs text-gray-400 block">{language === 'ar' ? 'إجمالي الفصول' : 'Chapters'}</span>
                <span className="text-lg font-black text-amber-400 font-mono">
                  {mangaList.reduce((acc, curr) => acc + curr.chaptersCount, 0)}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-center">
                <span className="text-xs text-gray-400 block">{language === 'ar' ? 'متوسط التقييم' : 'Avg Rating'}</span>
                <span className="text-lg font-black text-yellow-400 font-mono flex items-center justify-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400" />
                  9.8
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ACTIVE READING READER MODE */}
      {activeReadingChapter && activeManga && (
        <div className="space-y-6">
          {/* Reader Top Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900 border border-white/10 shadow-xl">
            <button
              onClick={() => setActiveReadingChapter(null)}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{language === 'ar' ? 'العودة للتفاصيل' : 'Back to Title'}</span>
            </button>

            <div className="text-center">
              <span className="text-xs text-amber-400 font-bold block">
                {language === 'ar' ? activeManga.titleAr : activeManga.title}
              </span>
              <h2 className="text-sm sm:text-base font-extrabold text-white">
                {language === 'ar' ? activeReadingChapter.titleAr : activeReadingChapter.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-amber-500 text-black border-amber-400'
                    : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                }`}
                title={language === 'ar' ? 'علامة مرجعية' : 'Bookmark'}
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-black' : ''}`} />
              </button>
            </div>
          </div>

          {/* MANGA READER DISPLAYER */}
          {activeManga.type === 'manga' && activeReadingChapter.pages && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="relative bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-2 sm:p-6 text-center min-h-[500px] flex flex-col items-center justify-center">
                <img
                  src={activeReadingChapter.pages[mangaPageIndex]}
                  alt={`Page ${mangaPageIndex + 1}`}
                  className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl mx-auto transition-all"
                  referrerPolicy="no-referrer"
                />

                {/* Page Navigation Controls */}
                <div className="flex items-center justify-between w-full max-w-md mt-6 px-4 py-3 rounded-2xl bg-neutral-900/90 border border-white/10 backdrop-blur-md">
                  <button
                    disabled={mangaPageIndex === 0}
                    onClick={() => setMangaPageIndex((p) => Math.max(0, p - 1))}
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500 text-black font-extrabold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>{language === 'ar' ? 'الصفحة السابقة' : 'Prev Page'}</span>
                  </button>

                  <span className="text-xs font-mono font-bold text-gray-300">
                    {mangaPageIndex + 1} / {activeReadingChapter.pages.length}
                  </span>

                  <button
                    disabled={mangaPageIndex === activeReadingChapter.pages.length - 1}
                    onClick={() =>
                      setMangaPageIndex((p) => Math.min(activeReadingChapter.pages!.length - 1, p + 1))
                    }
                    className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-30 disabled:hover:bg-amber-500 text-black font-extrabold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>{language === 'ar' ? 'الصفحة التالية' : 'Next Page'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* LIGHT NOVEL READER DISPLAYER */}
          {activeManga.type === 'light_novel' && (
            <div className="space-y-6 max-w-3xl mx-auto">
              {/* Novel Typography Customizer Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900 border border-white/10 text-xs">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-gray-300">{language === 'ar' ? 'حجم الخط:' : 'Font Size:'}</span>
                  <div className="flex gap-1">
                    {(['sm', 'md', 'lg', 'xl'] as const).map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setNovelFontSize(sz)}
                        className={`px-2.5 py-1 rounded-lg uppercase font-mono font-bold ${
                          novelFontSize === sz
                            ? 'bg-amber-500 text-black'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-gray-300">{language === 'ar' ? 'نمط القارئ:' : 'Theme:'}</span>
                  <div className="flex gap-1">
                    <button
                      onClick={() => setNovelTheme('dark')}
                      className={`px-3 py-1 rounded-lg font-bold ${
                        novelTheme === 'dark' ? 'bg-amber-500 text-black' : 'bg-neutral-800 text-gray-300'
                      }`}
                    >
                      {language === 'ar' ? 'داكن' : 'Dark'}
                    </button>
                    <button
                      onClick={() => setNovelTheme('sepia')}
                      className={`px-3 py-1 rounded-lg font-bold ${
                        novelTheme === 'sepia' ? 'bg-amber-700 text-amber-100' : 'bg-amber-950/40 text-amber-300'
                      }`}
                    >
                      {language === 'ar' ? 'سيبيا' : 'Sepia'}
                    </button>
                    <button
                      onClick={() => setNovelTheme('midnight')}
                      className={`px-3 py-1 rounded-lg font-bold ${
                        novelTheme === 'midnight' ? 'bg-cyan-500 text-black' : 'bg-cyan-950/40 text-cyan-300'
                      }`}
                    >
                      {language === 'ar' ? 'أزرق' : 'Midnight'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Novel Content Box */}
              <div
                className={`p-6 sm:p-10 rounded-3xl border shadow-2xl transition-all leading-relaxed ${
                  novelTheme === 'dark'
                    ? 'bg-neutral-950 text-gray-200 border-white/10'
                    : novelTheme === 'sepia'
                    ? 'bg-[#1e1913] text-[#e8d7c3] border-amber-800/40'
                    : 'bg-[#080f1a] text-[#d1e8ff] border-cyan-800/40'
                } ${
                  novelFontSize === 'sm'
                    ? 'text-sm sm:text-base leading-relaxed'
                    : novelFontSize === 'md'
                    ? 'text-base sm:text-lg leading-loose'
                    : novelFontSize === 'lg'
                    ? 'text-lg sm:text-xl leading-loose'
                    : 'text-xl sm:text-2xl leading-loose'
                }`}
              >
                <div className="whitespace-pre-wrap font-serif">
                  {language === 'ar'
                    ? activeReadingChapter.novelContentAr || activeReadingChapter.novelContent
                    : activeReadingChapter.novelContent}
                </div>
              </div>
            </div>
          )}

          {/* Chapter Comments Section */}
          <div className="max-w-3xl mx-auto space-y-6 pt-10 border-t border-white/10">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span>{language === 'ar' ? 'تعليقات القراء على الفصل' : 'Chapter Discussion'}</span>
            </h3>

            {/* Post Comment Form */}
            <form onSubmit={handlePostChapterComment} className="flex gap-3">
              <input
                type="text"
                placeholder={
                  language === 'ar'
                    ? 'اكتب رأيك وانطباعك عن هذا الفصل...'
                    : 'Share your thoughts on this chapter...'
                }
                value={chapterComment}
                onChange={(e) => setChapterComment(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-sm transition-all cursor-pointer shrink-0"
              >
                {language === 'ar' ? 'نشر' : 'Post'}
              </button>
            </form>

            {/* List of comments */}
            <div className="space-y-3">
              {currentComments.length === 0 ? (
                <div className="p-6 rounded-2xl bg-white/5 text-center text-sm text-gray-400">
                  {language === 'ar'
                    ? 'كن أول من يعلق على هذا الفصل الخرافي!'
                    : 'Be the first to comment on this epic chapter!'}
                </div>
              ) : (
                currentComments.map((comment) => (
                  <div key={comment.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1">
                    <div className="flex items-center justify-between text-xs text-amber-400 font-bold">
                      <span>{comment.userName}</span>
                      <span className="text-gray-500 font-mono">{comment.createdAt}</span>
                    </div>
                    <p className="text-sm text-gray-200">{comment.content}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* DETAILED MANGA / NOVEL VIEW */}
      {activeManga && !activeReadingChapter && (
        <div className="space-y-8">
          {/* Back Button */}
          <button
            onClick={() => setSelectedMangaId('')}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === 'ar' ? 'العودة لكافة العناوين' : 'Back to Library'}</span>
          </button>

          {/* Banner & Detailed Info */}
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-900">
            <div className="h-64 sm:h-80 w-full relative">
              <img
                src={activeManga.banner}
                alt={activeManga.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
            </div>

            <div className="relative z-10 p-6 sm:p-10 -mt-28 flex flex-col md:flex-row gap-8 items-start">
              {/* Cover Image */}
              <div className="w-44 sm:w-56 aspect-[2/3] rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-2xl shrink-0">
                <img
                  src={activeManga.cover}
                  alt={activeManga.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title Details */}
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-black uppercase tracking-wider">
                    {activeManga.type === 'manga'
                      ? language === 'ar'
                        ? 'مانغا يابانية'
                        : 'Manga'
                      : language === 'ar'
                      ? 'رواية خفيفة'
                      : 'Light Novel'}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/10 text-green-400 border border-green-500/30">
                    {language === 'ar' ? activeManga.statusAr : activeManga.status}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-yellow-400" />
                    {activeManga.rating}
                  </span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-black text-white">
                  {language === 'ar' ? activeManga.titleAr : activeManga.title}
                </h1>
                <p className="text-xs text-amber-400 font-mono">{activeManga.japaneseTitle}</p>

                <p className="text-sm text-gray-300 leading-relaxed max-w-3xl">
                  {language === 'ar' ? activeManga.synopsisAr : activeManga.synopsis}
                </p>

                {/* Info Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 text-xs">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-gray-400 block">{language === 'ar' ? 'الكاتب' : 'Author'}</span>
                    <span className="font-bold text-white truncate block">{activeManga.author}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-gray-400 block">{language === 'ar' ? 'الرسام' : 'Artist'}</span>
                    <span className="font-bold text-white truncate block">{activeManga.artist}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-gray-400 block">{language === 'ar' ? 'عدد الفصول' : 'Chapters'}</span>
                    <span className="font-bold text-amber-400 font-mono block">{activeManga.chaptersCount}</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-gray-400 block">{language === 'ar' ? 'عدد المجلدات' : 'Volumes'}</span>
                    <span className="font-bold text-amber-400 font-mono block">{activeManga.volumesCount}</span>
                  </div>
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {(language === 'ar' ? activeManga.genresAr : activeManga.genres).map((genre) => (
                    <span key={genre} className="px-3 py-1 rounded-xl bg-white/5 text-xs text-gray-300 border border-white/10">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CHAPTERS LIST SECTION */}
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-amber-400" />
              <span>{language === 'ar' ? 'قائمة الفصول المتاحة' : 'Available Chapters'}</span>
            </h3>

            <div className="grid gap-3">
              {activeManga.chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  onClick={() => handleOpenReader(chapter)}
                  className="p-4 rounded-2xl bg-neutral-900 border border-white/10 hover:border-amber-500/50 hover:bg-neutral-800 transition-all flex items-center justify-between cursor-pointer group shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-mono font-bold text-sm">
                      #{chapter.chapterNumber}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                        {language === 'ar' ? chapter.titleAr : chapter.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-gray-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {chapter.releaseDate}
                        </span>
                        <span className="flex items-center gap-1 font-mono">
                          <Eye className="w-3.5 h-3.5" />
                          {chapter.views.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button className="px-4 py-2 rounded-xl bg-amber-500 text-black font-extrabold text-xs group-hover:scale-105 transition-all flex items-center gap-1">
                    <span>{language === 'ar' ? 'قراءة الآن' : 'Read Now'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MANGA CATALOG GRID VIEW */}
      {!activeManga && !activeReadingChapter && (
        <div className="space-y-6">
          {/* Filters and Search Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900 border border-white/10 shadow-xl">
            {/* Filter Type Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilterType('all')}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  filterType === 'all'
                    ? 'bg-amber-500 text-black shadow-lg'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {language === 'ar' ? 'الكل' : 'All'}
              </button>
              <button
                onClick={() => setFilterType('manga')}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  filterType === 'manga'
                    ? 'bg-amber-500 text-black shadow-lg'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {language === 'ar' ? 'مانغا (Manga)' : 'Manga Only'}
              </button>
              <button
                onClick={() => setFilterType('light_novel')}
                className={`px-4 py-2 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  filterType === 'light_novel'
                    ? 'bg-amber-500 text-black shadow-lg'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {language === 'ar' ? 'روايات خفيفة (Novel)' : 'Light Novels'}
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 rtl:right-3 rtl:left-auto top-3" />
              <input
                type="text"
                placeholder={
                  language === 'ar' ? 'ابحث عن اسم المانغا أو الرواية...' : 'Search manga or novel title...'
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 rtl:pr-9 rtl:pl-4 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Genre Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedGenre('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedGenre === 'all'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
              }`}
            >
              {language === 'ar' ? 'جميع التصنيفات' : 'All Genres'}
            </button>
            {allGenres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  selectedGenre === genre
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                    : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* CATALOG CARDS GRID */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMangaList.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMangaId(item.id)}
                className="group relative rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 hover:border-amber-500/50 transition-all shadow-xl hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between"
              >
                {/* Image Cover */}
                <div className="aspect-[2/3] w-full relative overflow-hidden bg-black">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 rtl:right-3 rtl:left-auto flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider bg-black/80 text-amber-400 border border-amber-500/30 backdrop-blur-md">
                      {item.type === 'manga'
                        ? language === 'ar'
                          ? 'مانغا'
                          : 'Manga'
                        : language === 'ar'
                        ? 'رواية'
                        : 'Novel'}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3 rtl:left-3 rtl:right-auto">
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-yellow-500 text-black flex items-center gap-0.5 shadow-md">
                      <Star className="w-3 h-3 fill-black" />
                      {item.rating}
                    </span>
                  </div>

                  {/* Bottom Image Info */}
                  <div className="absolute bottom-3 left-3 right-3 space-y-1">
                    <p className="text-[11px] font-bold text-amber-400 truncate">{item.latestChapter}</p>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-white line-clamp-1 group-hover:text-amber-400 transition-colors">
                      {language === 'ar' ? item.titleAr : item.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 line-clamp-1">{item.author}</p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-white/5 font-mono">
                    <span>{item.chaptersCount} {language === 'ar' ? 'فصل' : 'Chs'}</span>
                    <span>{item.volumesCount} {language === 'ar' ? 'مجلد' : 'Vols'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {mangaList.length === 0 ? (
            <div className="p-12 sm:p-16 text-center rounded-3xl bg-neutral-900/90 border border-amber-500/30 space-y-6 shadow-2xl max-w-3xl mx-auto my-12">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto">
                <BookOpen className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-white">
                  {language === 'ar' ? 'قسم المانغا والروايات الخفيفة جاهز' : 'Manga & Novels Section is Ready'}
                </h3>
                <p className="text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
                  {language === 'ar'
                    ? 'تم تخصيص هذا القسم بقارئ تفاعلي متقدم للمانغا وأنماط قراءة متعددة للروايات. لا توجد أعمال مضافة حالياً — يمكنك إضافة المانغا أو الروايات الخاصة بك من لوحة تحكم الاستوديو.'
                    : 'This dedicated section features an interactive Manga Reader and customizable Light Novel Viewer. No fake titles are listed — add your official manga or novels directly from the Studio Admin Panel!'}
                </p>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => setActiveView('admin')}
                  className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  {language === 'ar' ? 'الانتقال إلى لوحة التحكم لإضافة مانغا/رواية' : 'Go to Admin Dashboard to Add Titles'}
                </button>
              </div>
            </div>
          ) : filteredMangaList.length === 0 ? (
            <div className="p-12 text-center rounded-3xl bg-neutral-900 border border-white/10 space-y-3">
              <BookOpen className="w-10 h-10 text-amber-500 mx-auto opacity-50" />
              <p className="text-gray-400 text-sm">
                {language === 'ar' ? 'لم نجد أي نتائج تطابق بحثك.' : 'No titles found matching your search.'}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
