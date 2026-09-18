import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { NewsArticle, Anime, Episode, Character, GalleryItem, WebsiteTheme, JobApplication, MangaNovelItem, MangaChapter } from '../types';
import {
  ShieldCheck,
  BarChart3,
  Newspaper,
  Tv,
  Film,
  Users,
  ImageIcon,
  MessageSquare,
  Palette,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit,
  Eye,
  Check,
  RefreshCw,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  Briefcase,
  Mail,
  Lock,
  Send,
  KeyRound,
  FileText,
  Phone,
  User as UserIcon,
  UserCheck,
  Star,
  BookOpen,
  Layers,
  Zap,
} from 'lucide-react';
import { VerifiedBadge } from './VerifiedBadge';

export const AdminDashboard: React.FC = () => {
  const {
    t,
    language,
    activeTheme,
    currentUser,
    newsList,
    addNews,
    updateNews,
    deleteNews,
    mangaList,
    addMangaNovel,
    updateMangaNovel,
    deleteMangaNovel,
    animeList,
    addAnime,
    updateAnime,
    deleteAnime,
    episodes,
    addEpisode,
    deleteEpisode,
    characters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    comments,
    deleteComment,
    jobApplications,
    updateJobApplicationStatus,
    deleteJobApplication,
    applyTheme,
    applyPresetTheme,
    presetThemesList,
    updateActiveThemeField,
    saveActiveThemeToFirestore,
    exportBackupJSON,
    importBackupJSON,
    login,
    usersList,
    updateUserRole,
    toggleUserVerification,
    setChatRecipientUser,
    setIsChatModalOpen,
  } = useStudio();

  const isPublisher = currentUser?.role === 'Publisher';
  const isOwner = currentUser?.role === 'Owner';

  const [activeTab, setActiveTab] = useState<
    'customizer' | 'jobs' | 'analytics' | 'news' | 'anime' | 'manga' | 'episodes' | 'characters' | 'gallery' | 'backup' | 'users'
  >(isPublisher ? 'anime' : 'users');

  // Manga / Light Novel Form States
  const [mgTitle, setMgTitle] = useState('');
  const [mgTitleAr, setMgTitleAr] = useState('');
  const [mgType, setMgType] = useState<'manga' | 'light_novel'>('manga');
  const [mgJpTitle, setMgJpTitle] = useState('');
  const [mgAuthor, setMgAuthor] = useState('');
  const [mgArtist, setMgArtist] = useState('');
  const [mgSynopsis, setMgSynopsis] = useState('');
  const [mgSynopsisAr, setMgSynopsisAr] = useState('');
  const [mgCover, setMgCover] = useState('');
  const [mgBanner, setMgBanner] = useState('');
  const [mgStatus, setMgStatus] = useState<'Ongoing' | 'Completed' | 'Hiatus'>('Ongoing');
  const [mgRating, setMgRating] = useState<number>(9.8);
  const [mgGenres, setMgGenres] = useState('Action, Fantasy');
  // Chapter creation state within Manga tab
  const [mgSelectedIdForCh, setMgSelectedIdForCh] = useState('');
  const [chNum, setChNum] = useState<number>(1);
  const [chTitle, setChTitle] = useState('');
  const [chTitleAr, setChTitleAr] = useState('');
  const [chPagesStr, setChPagesStr] = useState('');
  const [chNovelContent, setChNovelContent] = useState('');
  const [chNovelContentAr, setChNovelContentAr] = useState('');

  // Job Application Detail Inspection
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  // Save status for customizer
  const [saveStatusMsg, setSaveStatusMsg] = useState('');

  // News Form states
  const [newsTitle, setNewsTitle] = useState('');
  const [newsTitleAr, setNewsTitleAr] = useState('');
  const [newsCategory, setNewsCategory] = useState<any>('Studio News');
  const [newsCover, setNewsCover] = useState('');
  const [newsContent, setNewsContent] = useState('');
  const [newsContentAr, setNewsContentAr] = useState('');

  // Anime Form states
  const [animeTitle, setAnimeTitle] = useState('');
  const [animeTitleAr, setAnimeTitleAr] = useState('');
  const [animeJpTitle, setAnimeJpTitle] = useState('');
  const [animeSynopsis, setAnimeSynopsis] = useState('');
  const [animeSynopsisAr, setAnimeSynopsisAr] = useState('');
  const [animePoster, setAnimePoster] = useState('');
  const [animeBanner, setAnimeBanner] = useState('');
  const [animeStatus, setAnimeStatus] = useState<any>('In Production');
  const [animeReleaseDate, setAnimeReleaseDate] = useState('');
  const [animeTrailerUrl, setAnimeTrailerUrl] = useState('');
  const [editingAnime, setEditingAnime] = useState<Anime | null>(null);

  // Episode Form states
  const [epAnimeId, setEpAnimeId] = useState('');
  const [epNum, setEpNum] = useState<number>(1);
  const [epTitle, setEpTitle] = useState('');
  const [epTitleAr, setEpTitleAr] = useState('');
  const [epVideoUrl, setEpVideoUrl] = useState('');
  const [epDuration, setEpDuration] = useState('24:00');
  const [epReleaseDate, setEpReleaseDate] = useState('');

  // Character Form states
  const [charAnimeId, setCharAnimeId] = useState('');
  const [charName, setCharName] = useState('');
  const [charNameAr, setCharNameAr] = useState('');
  const [charKanji, setCharKanji] = useState('');
  const [charAge, setCharAge] = useState('');
  const [charRole, setCharRole] = useState('Protagonist');
  const [charRoleAr, setCharRoleAr] = useState('بطل القصة');
  const [charPortrait, setCharPortrait] = useState('');
  const [charBio, setCharBio] = useState('');
  const [charBioAr, setCharBioAr] = useState('');
  const [charVoiceActorName, setCharVoiceActorName] = useState('');
  const [charVoiceActorNameAr, setCharVoiceActorNameAr] = useState('');
  const [charAbilityName, setCharAbilityName] = useState('');
  const [charAbilityNameAr, setCharAbilityNameAr] = useState('');
  const [charAbilityLevel, setCharAbilityLevel] = useState<number>(90);
  const [charAbilityDesc, setCharAbilityDesc] = useState('');
  const [editingCharacter, setEditingCharacter] = useState<Character | null>(null);

  // Gallery Form states
  const [galTitle, setGalTitle] = useState('');
  const [galCategory, setGalCategory] = useState<any>('Posters');
  const [galImageUrl, setGalImageUrl] = useState('');

  // Backup state
  const [backupText, setBackupText] = useState('');
  const [backupSuccess, setBackupSuccess] = useState(false);

  // Verification guard
  const isAuthorized = currentUser && (currentUser.role === 'Owner' || currentUser.role === 'Admin' || currentUser.role === 'Publisher');

  if (!isAuthorized) {
    return (
      <div className="max-w-xl mx-auto py-20 px-4 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center mx-auto border border-red-500/40">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-white">Authorization Required</h2>
        <p className="text-xs text-gray-400">
          You are currently viewing as a guest or standard member. Log in with an Owner, Admin, or Publisher account.
        </p>
        <button
          onClick={() => login('dmxanim', 'dmxanim123')}
          className="px-6 py-3 rounded-xl font-bold text-xs bg-yellow-500 text-black hover:bg-yellow-400 transition-colors shadow-lg cursor-pointer"
        >
          {language === 'ar' ? 'تسجيل الدخول تلقائياً بمالك الاستوديو (dmxanim)' : 'Auto-Login as DMX™ Studio Owner (dmxanim)'}
        </button>
      </div>
    );
  }

  const handleCreateNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsTitle) return;
    const newArticle: NewsArticle = {
      id: `news-${Date.now()}`,
      title: newsTitle,
      titleAr: newsTitleAr || newsTitle,
      category: newsCategory,
      categoryAr: newsCategory,
      coverImage: newsCover || '/src/assets/images/dmx_hero_banner_1785673413480.jpg',
      publishDate: new Date().toISOString().slice(0, 10),
      author: currentUser.username,
      authorAvatar: currentUser.avatar,
      tags: ['DMX Announcement', newsCategory],
      content: newsContent || 'Official update from DMX Animation Studio.',
      contentAr: newsContentAr || 'تحديث رسمي من استوديو DMX للأنيميشن.',
      views: 120,
    };
    addNews(newArticle);
    setNewsTitle('');
    setNewsTitleAr('');
    setNewsCover('');
    setNewsContent('');
    setNewsContentAr('');
  };

  const handleCreateAnime = (e: React.FormEvent) => {
    e.preventDefault();
    if (!animeTitle) return;
    const newAnime: Anime = {
      id: `anime-${Date.now()}`,
      title: animeTitle,
      titleAr: animeTitleAr || animeTitle,
      japaneseTitle: animeJpTitle || animeTitle,
      synopsis: animeSynopsis || 'New anime release by DMX Animation Studio.',
      synopsisAr: animeSynopsisAr || 'أنيمي جديد من إنتاج استوديو DMX.',
      poster: animePoster || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      banner: animeBanner || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
      status: animeStatus,
      statusAr: animeStatus === 'In Production' ? 'قيد الإنتاج' : animeStatus === 'Airing' ? 'يعرض الآن' : animeStatus === 'Completed' ? 'مكتمل' : 'قادم قريباً',
      firstTrailer: 'Trailer #1',
      officialRelease: animeReleaseDate || '2027',
      releaseDate: animeReleaseDate,
      genres: ['Action', 'Fantasy'],
      genresAr: ['أكشن', 'فانتازيا'],
      studio: 'DMX™ Animation Studio',
      trailerUrl: animeTrailerUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      rating: 9.8,
      episodesCount: 12,
    };
    addAnime(newAnime);
    setAnimeTitle('');
    setAnimeTitleAr('');
    setAnimeJpTitle('');
    setAnimeSynopsis('');
    setAnimeSynopsisAr('');
    setAnimePoster('');
    setAnimeBanner('');
    setAnimeReleaseDate('');
    setAnimeTrailerUrl('');
  };

  const handleUpdateAnimeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAnime) return;

    const statusAr =
      editingAnime.status === 'In Production'
        ? 'قيد الإنتاج'
        : editingAnime.status === 'Airing'
        ? 'يعرض الآن'
        : editingAnime.status === 'Completed'
        ? 'مكتمل'
        : 'قادم قريباً';

    const updatedAnime: Anime = {
      ...editingAnime,
      statusAr,
    };

    await updateAnime(updatedAnime);
    setEditingAnime(null);
  };

  const handleCreateEpisode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!epTitle || !epAnimeId) return;
    const newEp: Episode = {
      id: `ep-${Date.now()}`,
      animeId: epAnimeId,
      episodeNumber: epNum,
      title: epTitle,
      titleAr: epTitleAr || epTitle,
      thumbnail: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      duration: epDuration || '24:00',
      releaseDate: epReleaseDate || new Date().toISOString().slice(0, 10),
      videoUrl: epVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      synopsis: 'Full episode stream.',
      synopsisAr: 'الحلقة الكاملة بجودة عالية.',
      subtitles: [{ lang: 'ar', label: 'العربية', src: '' }],
      audioTracks: [{ lang: 'ja', label: 'Japanese Original' }],
      views: 340,
    };
    addEpisode(newEp);
    setEpTitle('');
    setEpTitleAr('');
    setEpVideoUrl('');
  };

  const handleCreateCharacter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!charName || !charAnimeId) return;

    const newChar: Character = {
      id: `char-${Date.now()}`,
      animeId: charAnimeId,
      name: charName,
      nameAr: charNameAr || charName,
      kanjiName: charKanji || charName,
      age: charAge || '20',
      role: charRole || 'Protagonist',
      roleAr: charRoleAr || (charRole === 'Protagonist' ? 'بطل القصة' : charRole === 'Antagonist' ? 'الخصم الرئيسي' : 'شخصية ثانوية'),
      biography: charBio || 'Main character profile.',
      biographyAr: charBioAr || 'معلومات وسيرة الشخصية الرسمية في العمل.',
      abilities: charAbilityName
        ? [
            {
              name: charAbilityName,
              nameAr: charAbilityNameAr || charAbilityName,
              powerLevel: Number(charAbilityLevel) || 90,
              description: charAbilityDesc || 'Signature ability',
            },
          ]
        : [{ name: 'Special Attack', nameAr: 'الهجوم الخاص', powerLevel: 90, description: 'High power skill' }],
      portrait: charPortrait || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      gallery: [],
      voiceActor: {
        name: charVoiceActorName || 'Studio VA',
        nameAr: charVoiceActorNameAr || charVoiceActorName || 'مؤدي صوت الاستوديو',
      },
    };

    await addCharacter(newChar);

    // Reset fields
    setCharName('');
    setCharNameAr('');
    setCharKanji('');
    setCharAge('');
    setCharRole('Protagonist');
    setCharRoleAr('بطل القصة');
    setCharPortrait('');
    setCharBio('');
    setCharBioAr('');
    setCharVoiceActorName('');
    setCharVoiceActorNameAr('');
    setCharAbilityName('');
    setCharAbilityNameAr('');
    setCharAbilityDesc('');
  };

  const handleUpdateCharacterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCharacter) return;
    await updateCharacter(editingCharacter);
    setEditingCharacter(null);
  };

  const handleCreateGallery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!galTitle) return;
    const newItem: GalleryItem = {
      id: `g-${Date.now()}`,
      title: galTitle,
      titleAr: galTitle,
      category: galCategory,
      categoryAr: galCategory,
      imageUrl: galImageUrl || '/src/assets/images/dmx_hero_banner_1785673413480.jpg',
      createdAt: new Date().toISOString().slice(0, 10),
      downloads: 420,
    };
    addGalleryItem(newItem);
    setGalTitle('');
    setGalImageUrl('');
  };

  const handleCreateManga = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mgTitle) return;
    const genresArr = mgGenres.split(',').map((g) => g.trim()).filter(Boolean);
    const newManga: MangaNovelItem = {
      id: `${mgType}-${Date.now()}`,
      type: mgType,
      title: mgTitle,
      titleAr: mgTitleAr || mgTitle,
      japaneseTitle: mgJpTitle || mgTitle,
      author: mgAuthor || 'DMX Studio',
      artist: mgArtist || 'DMX Studio',
      synopsis: mgSynopsis || 'Official title from DMX Animation Studio.',
      synopsisAr: mgSynopsisAr || 'عنوان رسمي من استوديو DMX للأنيميشن.',
      cover: mgCover || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
      banner: mgBanner || mgCover || 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1600&auto=format&fit=crop&q=80',
      status: mgStatus,
      statusAr: mgStatus === 'Ongoing' ? 'مستمر' : mgStatus === 'Completed' ? 'مكتمل' : 'متوقف',
      rating: Number(mgRating) || 9.8,
      genres: genresArr.length ? genresArr : ['Action', 'Fantasy'],
      genresAr: genresArr.length ? genresArr : ['أكشن', 'فانتازيا'],
      chaptersCount: 0,
      volumesCount: 1,
      latestChapter: 'Prologue / Chapter 1',
      chapters: [],
    };
    await addMangaNovel(newManga);
    setMgTitle('');
    setMgTitleAr('');
    setMgJpTitle('');
    setMgAuthor('');
    setMgArtist('');
    setMgSynopsis('');
    setMgSynopsisAr('');
    setMgCover('');
    setMgBanner('');
  };

  const handleAddChapterToManga = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mgSelectedIdForCh || !chTitle) return;
    const target = mangaList.find((m) => m.id === mgSelectedIdForCh);
    if (!target) return;

    const pagesArr = chPagesStr
      .split('\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const newCh: MangaChapter = {
      id: `ch-${Date.now()}`,
      mangaId: target.id,
      chapterNumber: Number(chNum) || (target.chapters.length + 1),
      title: chTitle,
      titleAr: chTitleAr || chTitle,
      releaseDate: new Date().toISOString().slice(0, 10),
      views: 1,
      pages: target.type === 'manga' ? (pagesArr.length ? pagesArr : ['https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1200&auto=format&fit=crop&q=80']) : undefined,
      novelContent: target.type === 'light_novel' ? chNovelContent : undefined,
      novelContentAr: target.type === 'light_novel' ? chNovelContentAr || chNovelContent : undefined,
    };

    const updatedManga: MangaNovelItem = {
      ...target,
      chaptersCount: target.chaptersCount + 1,
      latestChapter: `Chapter ${newCh.chapterNumber}: ${newCh.title}`,
      chapters: [...target.chapters, newCh],
    };

    await updateMangaNovel(updatedManga);
    setChTitle('');
    setChTitleAr('');
    setChPagesStr('');
    setChNovelContent('');
    setChNovelContentAr('');
  };

  const handleExportBackup = () => {
    const jsonStr = exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `dmx-studio-backup-${Date.now()}.json`;
    link.click();
  };

  const handleImportBackup = () => {
    if (!backupText) return;
    const success = importBackupJSON(backupText);
    if (success) {
      setBackupSuccess(true);
      setTimeout(() => setBackupSuccess(false), 3000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-md text-xs font-mono font-bold uppercase bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              {currentUser.role} ACCESS
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mt-1" style={{ color: activeTheme.textPrimary }}>
            {t('adminCenter')}
          </h1>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
        {(isPublisher
          ? [
              { id: 'anime', label: t('manageAnime'), icon: <Tv className="w-4 h-4" /> },
              { id: 'manga', label: language === 'ar' ? 'المانغا والروايات' : 'Manga & Novels', icon: <BookOpen className="w-4 h-4 text-amber-400" /> },
              { id: 'episodes', label: t('manageEpisodes'), icon: <Film className="w-4 h-4" /> },
              { id: 'characters', label: t('manageCharacters'), icon: <Users className="w-4 h-4 text-yellow-400" /> },
              { id: 'news', label: t('manageNews'), icon: <Newspaper className="w-4 h-4" /> },
            ]
          : [
              { id: 'users', label: language === 'ar' ? 'إدارة الأعضاء والتوثيق' : 'Users & Roles', icon: <UserCheck className="w-4 h-4 text-yellow-400" /> },
              { id: 'customizer', label: t('websiteCustomizer'), icon: <Palette className="w-4 h-4" /> },
              { id: 'jobs', label: language === 'ar' ? `طلبات التوظيف (${jobApplications.length})` : `Job Applications (${jobApplications.length})`, icon: <Briefcase className="w-4 h-4 text-yellow-400" /> },
              { id: 'analytics', label: t('analytics'), icon: <BarChart3 className="w-4 h-4" /> },
              { id: 'manga', label: language === 'ar' ? 'المانغا والروايات' : 'Manga & Novels', icon: <BookOpen className="w-4 h-4 text-amber-400" /> },
              { id: 'news', label: t('manageNews'), icon: <Newspaper className="w-4 h-4" /> },
              { id: 'anime', label: t('manageAnime'), icon: <Tv className="w-4 h-4" /> },
              { id: 'episodes', label: t('manageEpisodes'), icon: <Film className="w-4 h-4" /> },
              { id: 'characters', label: t('manageCharacters'), icon: <Users className="w-4 h-4" /> },
              { id: 'gallery', label: t('manageGallery'), icon: <ImageIcon className="w-4 h-4" /> },
              { id: 'backup', label: t('backupRestore'), icon: <Download className="w-4 h-4" /> },
            ]
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              activeTab === tab.id ? 'shadow-lg scale-105' : 'hover:bg-white/10 opacity-70 hover:opacity-100'
            }`}
            style={
              activeTab === tab.id
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
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab: Users & Roles Management */}
      {activeTab === 'users' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl border bg-white/5 border-white/10">
            <div>
              <h3 className="text-xl font-bold flex items-center gap-2" style={{ color: activeTheme.textPrimary }}>
                <UserCheck className="w-6 h-6 text-yellow-400" />
                <span>{language === 'ar' ? 'إدارة المستخدمين والتوثيق والترقيات' : 'User Roles & Verification Management'}</span>
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {language === 'ar'
                  ? 'يمكن لمالك الاستوديو ترقية الحسابات إلى أدمن، ناشر أنميات وأخبار، أو توثيق الحسابات بالعلامة المميزة.'
                  : 'Manage member roles, grant publisher permissions, or verify official accounts with shiny badges.'}
              </p>
            </div>
            <span className="px-3 py-1.5 rounded-xl border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 text-xs font-mono font-bold">
              {usersList.length} {language === 'ar' ? 'حسابات مسجلة' : 'Registered Users'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {usersList.map((u) => {
              const isCurrentUser = currentUser.username === u.username;
              return (
                <div
                  key={u.id || u.username}
                  className="p-5 rounded-2xl border bg-black/40 border-white/10 space-y-4 relative overflow-hidden transition-all hover:border-yellow-500/40"
                >
                  {/* Top user header */}
                  <div className="flex items-center gap-3">
                    <img
                      src={u.avatar}
                      alt={u.username}
                      className="w-12 h-12 rounded-xl object-cover border border-yellow-500/50 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm truncate text-white">{u.username}</span>
                        <VerifiedBadge role={u.role} isVerified={u.isVerified} size="sm" />
                      </div>
                      <span className="text-[11px] text-gray-400 font-mono block">
                        {u.role === 'Owner'
                          ? language === 'ar' ? 'المالك' : 'Owner'
                          : u.role === 'Admin'
                          ? language === 'ar' ? 'أدمن' : 'Admin'
                          : u.role === 'Publisher'
                          ? language === 'ar' ? 'ناشر أنميات' : 'Anime Publisher'
                          : language === 'ar' ? 'مستخدم عادي' : 'Standard User'}
                      </span>
                    </div>
                  </div>

                  {/* Actions & Role Switches */}
                  {!isCurrentUser && (isOwner || currentUser?.role === 'Admin') && (
                    <div className="space-y-2 pt-3 border-t border-white/10 text-xs">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] text-gray-400 block w-full font-bold">
                          {language === 'ar' ? 'تغيير رتبة الحساب:' : 'Assign Role:'}
                        </span>

                        {isOwner && (
                          <button
                            onClick={() => updateUserRole(u.username, 'Owner')}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                              u.role === 'Owner'
                                ? 'bg-amber-500 text-black border-amber-400 shadow-lg'
                                : 'bg-white/5 text-amber-300 border-white/10 hover:bg-amber-500/20'
                            }`}
                          >
                            {language === 'ar' ? 'مالك' : 'Owner'}
                          </button>
                        )}

                        <button
                          onClick={() => updateUserRole(u.username, 'Admin')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                            u.role === 'Admin'
                              ? 'bg-blue-500 text-white border-blue-400 shadow-lg'
                              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-blue-500/20'
                          }`}
                        >
                          {language === 'ar' ? 'أدمن' : 'Admin'}
                        </button>

                        <button
                          onClick={() => updateUserRole(u.username, 'Publisher')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                            u.role === 'Publisher'
                              ? 'bg-purple-600 text-white border-purple-400 shadow-lg'
                              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-purple-500/20'
                          }`}
                        >
                          {language === 'ar' ? 'ناشر أنميات' : 'Publisher'}
                        </button>

                        <button
                          onClick={() => updateUserRole(u.username, 'User')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all cursor-pointer ${
                            u.role === 'User'
                              ? 'bg-gray-600 text-white border-gray-400 shadow-lg'
                              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          {language === 'ar' ? 'عادي' : 'User'}
                        </button>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        {/* Toggle Verification */}
                        <button
                          onClick={() => toggleUserVerification(u.username, !u.isVerified)}
                          className={`flex-1 py-1.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                            u.isVerified
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 hover:bg-amber-500/30'
                              : 'bg-white/5 text-gray-300 border-white/10 hover:bg-white/10'
                          }`}
                        >
                          <Star className="w-3.5 h-3.5 text-yellow-400" />
                          <span>
                            {u.isVerified
                              ? language === 'ar' ? 'إلغاء التوثيق' : 'Unverify'
                              : language === 'ar' ? 'توثيق الحساب' : 'Verify Account'}
                          </span>
                        </button>

                        {/* Open Private Chat */}
                        <button
                          onClick={() => {
                            setChatRecipientUser(u);
                            setIsChatModalOpen(true);
                          }}
                          className="py-1.5 px-3 rounded-xl border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                          title={language === 'ar' ? 'محادثة خاصة' : 'Private Chat'}
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'محادثة' : 'Chat'}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab: Website Customizer */}
      {activeTab === 'customizer' && (
        <div className="space-y-8">
          <div className="p-6 rounded-3xl border bg-white/5 space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <span>{language === 'ar' ? 'القوالب ومظهر الموقع' : 'Preset Website Themes'}</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {presetThemesList.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => applyPresetTheme(preset.id)}
                  className="p-4 rounded-2xl border text-left rtl:text-right hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between h-32 relative overflow-hidden"
                  style={{
                    backgroundColor: preset.cardBg,
                    borderColor: preset.id === activeTheme.id ? preset.primaryColor : 'rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-extrabold text-sm block" style={{ color: preset.textPrimary }}>
                        {language === 'ar' ? preset.nameAr : preset.name}
                      </span>
                      <span className="text-[10px] opacity-60 block">{preset.id}</span>
                    </div>
                    {preset.id === activeTheme.id && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-400 text-black">
                        Active
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-auto">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primaryColor }} />
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.accentColor }} />
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: preset.bgBase }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl border bg-white/5 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-white">{language === 'ar' ? 'تعديل اسم الموقع وشعار الاستوديو والخلفيات' : 'Branding, Logos & Backgrounds'}</h3>
                <p className="text-xs text-gray-400 mt-1">
                  {language === 'ar'
                    ? 'يمكنك تغيير اسم الموقع واللوجو وإضافة صور خلفية للثيم مباشرة من جهازك مع زر حفظ وتأكيد التغييرات.'
                    : 'Customize studio name, upload logo and theme background images from your device.'}
                </p>
              </div>

              {/* Confirmation & Save Button */}
              <button
                type="button"
                onClick={async () => {
                  await saveActiveThemeToFirestore();
                  setSaveStatusMsg(language === 'ar' ? '✓ تم حفظ وتأكيد جميع التغييرات بنجاح!' : '✓ Site theme & branding saved successfully!');
                  setTimeout(() => setSaveStatusMsg(''), 4000);
                }}
                className="px-6 py-3 rounded-2xl font-black text-xs bg-yellow-400 text-black hover:bg-yellow-300 shadow-xl flex items-center justify-center gap-2 transition-all hover:scale-105 cursor-pointer shrink-0"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === 'ar' ? 'تأكيد وحفظ التغييرات' : 'Confirm & Save Changes'}</span>
              </button>
            </div>

            {saveStatusMsg && (
              <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/40 text-green-400 text-xs font-bold flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-4 h-4" />
                <span>{saveStatusMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Studio Name AR */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-300">
                  {language === 'ar' ? 'اسم الموقع / الاستوديو (عربي)' : 'Studio Name (Arabic)'}
                </label>
                <input
                  type="text"
                  value={activeTheme.studioNameAr}
                  onChange={(e) => updateActiveThemeField('studioNameAr', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-black/50 text-white text-sm focus:border-yellow-400 outline-none"
                />
              </div>

              {/* Studio Name EN */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-300">
                  {language === 'ar' ? 'اسم الموقع / الاستوديو (English)' : 'Studio Name (English)'}
                </label>
                <input
                  type="text"
                  value={activeTheme.studioName}
                  onChange={(e) => updateActiveThemeField('studioName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-black/50 text-white text-sm focus:border-yellow-400 outline-none"
                />
              </div>

              {/* Slogan AR */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-300">
                  {language === 'ar' ? 'الشعار الفرعي (عربي)' : 'Slogan (Arabic)'}
                </label>
                <input
                  type="text"
                  value={activeTheme.sloganAr}
                  onChange={(e) => updateActiveThemeField('sloganAr', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/20 bg-black/50 text-white text-sm focus:border-yellow-400 outline-none"
                />
              </div>

              {/* Color */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-300">
                  {language === 'ar' ? 'اللون الرئيسي' : 'Primary Accent Color'}
                </label>
                <input
                  type="color"
                  value={activeTheme.primaryColor}
                  onChange={(e) => updateActiveThemeField('primaryColor', e.target.value)}
                  className="w-full h-10 rounded-xl cursor-pointer bg-transparent border border-white/20"
                />
              </div>

              {/* Theme Custom Background Image */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-gray-300 flex items-center justify-between">
                  <span>{language === 'ar' ? 'صورة خلفية الثيم والموقع' : 'Theme Background Image'}</span>
                  <span className="text-[10px] text-yellow-400">{language === 'ar' ? 'يمكن رفع صورة مباشرة من الجهاز' : 'Direct Device File Upload'}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={activeTheme.customBackground || ''}
                    onChange={(e) => updateActiveThemeField('customBackground', e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/20 bg-black/50 text-white text-sm focus:border-yellow-400 outline-none"
                  />
                  <label className="px-4 py-2.5 rounded-xl border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 text-xs font-bold cursor-pointer transition-colors shrink-0 flex items-center gap-1.5">
                    <Upload className="w-4 h-4" />
                    <span>{language === 'ar' ? 'اختيار صورة من الجهاز' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              updateActiveThemeField('customBackground', reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
                {activeTheme.customBackground && (
                  <div className="mt-2 h-20 rounded-xl overflow-hidden border border-white/10 relative">
                    <img src={activeTheme.customBackground} alt="Background Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => updateActiveThemeField('customBackground', '')}
                      className="absolute top-2 right-2 p-1 rounded-lg bg-black/70 text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Custom Studio Logo */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-bold uppercase text-gray-300 flex items-center justify-between">
                  <span>{language === 'ar' ? 'صورة شعار الاستوديو (Logo)' : 'Studio Logo Image'}</span>
                  <span className="text-[10px] text-yellow-400">{language === 'ar' ? 'يمكن رفع صورة اللوجو من الجهاز' : 'Upload Logo from Device'}</span>
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={activeTheme.customBanner || ''}
                    onChange={(e) => updateActiveThemeField('customBanner', e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/20 bg-black/50 text-white text-sm focus:border-yellow-400 outline-none"
                  />
                  <label className="px-4 py-2.5 rounded-xl border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 text-xs font-bold cursor-pointer transition-colors shrink-0 flex items-center gap-1.5">
                    <Upload className="w-4 h-4" />
                    <span>{language === 'ar' ? 'رفع اللوجو من الجهاز' : 'Upload Logo'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') {
                              updateActiveThemeField('customBanner', reader.result);
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Bottom Confirm Button */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={async () => {
                  await saveActiveThemeToFirestore();
                  setSaveStatusMsg(language === 'ar' ? '✓ تم حفظ وتأكيد جميع التغييرات بنجاح!' : '✓ Site theme & branding saved successfully!');
                  setTimeout(() => setSaveStatusMsg(''), 4000);
                }}
                className="px-8 py-3.5 rounded-2xl font-black text-xs bg-yellow-400 text-black hover:bg-yellow-300 shadow-xl flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{language === 'ar' ? 'تأكيد وحفظ جميع التغييرات' : 'Confirm & Save All Changes'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Job Applications Management */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-yellow-400" />
              <span>{language === 'ar' ? 'إدارة طلبات التوظيف بالاستوديو' : 'Studio Job Applications'}</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">
              {language === 'ar'
                ? 'جميع طلبات الانضمام للإنتاج (محركين، مؤديين صوتيين، مترجمين) تصل مباشرة من نموذج التوظيف ومحفوظة بشكل آمن.'
                : 'All incoming application forms submitted by applicants are stored securely here.'}
            </p>
          </div>

          {jobApplications.length === 0 ? (
            <div className="p-12 rounded-3xl border border-dashed border-white/20 text-center space-y-3">
              <Briefcase className="w-12 h-12 text-yellow-400 mx-auto opacity-50" />
              <h4 className="text-lg font-bold text-white">
                {language === 'ar' ? 'لا توجد طلبات توظيف مقدمة حالياً' : 'No Job Applications Yet'}
              </h4>
              <p className="text-xs text-gray-400">
                {language === 'ar'
                  ? 'عندما يقدم الموهوبون عبر زر (التقديم على وظيفة) بالمنيو سيظهرون هنا مباشرة.'
                  : 'Submitted applications will appear here in real-time.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {jobApplications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 rounded-2xl border bg-white/5 space-y-4 hover:border-yellow-500/40 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 block">{app.createdAt}</span>
                      <h4 className="font-extrabold text-base text-white">{app.fullName}</h4>
                      <span className="text-xs font-bold text-yellow-400 block">{app.position}</span>
                    </div>

                    <select
                      value={app.status}
                      onChange={(e) => updateJobApplicationStatus(app.id, e.target.value as any)}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl border bg-black text-white focus:outline-none focus:border-yellow-400"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <div className="space-y-1 text-xs text-gray-300 font-mono">
                    <p className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-yellow-400" />
                      <span>{app.email}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-yellow-400" />
                      <span>{app.phone}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                      <span>Experience: {app.experienceYears}</span>
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs text-gray-300 line-clamp-3">
                    {app.coverLetter}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <a
                      href={app.portfolioUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-yellow-400 hover:underline flex items-center gap-1"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'عرض السيرة الذاتية والمعرض (CV)' : 'View Portfolio / CV'}</span>
                    </a>

                    <button
                      onClick={() => deleteJobApplication(app.id)}
                      className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer"
                      title="Delete Application"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab: Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl border bg-white/5 space-y-2">
            <span className="text-xs font-mono text-gray-400">TOTAL ANIME TITLES</span>
            <div className="text-3xl font-black text-yellow-400">{animeList.length}</div>
          </div>
          <div className="p-6 rounded-2xl border bg-white/5 space-y-2">
            <span className="text-xs font-mono text-gray-400">EPISODES CATALOG</span>
            <div className="text-3xl font-black text-yellow-400">{episodes.length}</div>
          </div>
          <div className="p-6 rounded-2xl border bg-white/5 space-y-2">
            <span className="text-xs font-mono text-gray-400">STUDIO NEWS</span>
            <div className="text-3xl font-black text-yellow-400">{newsList.length}</div>
          </div>
          <div className="p-6 rounded-2xl border bg-white/5 space-y-2">
            <span className="text-xs font-mono text-gray-400">GALLERY ASSETS</span>
            <div className="text-3xl font-black text-yellow-400">{gallery.length}</div>
          </div>
        </div>
      )}

      {/* Tab: Manage News */}
      {activeTab === 'news' && (
        <div className="space-y-6">
          <form onSubmit={handleCreateNews} className="p-6 rounded-3xl border bg-white/5 space-y-4">
            <h3 className="text-lg font-bold">{language === 'ar' ? 'كتابة خبر جديد' : 'Publish Press Article'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder={language === 'ar' ? 'العنوان بالعربية' : 'Arabic Title'}
                value={newsTitleAr}
                onChange={(e) => setNewsTitleAr(e.target.value)}
                className="p-3 rounded-xl border bg-black/50 text-white text-sm"
              />
              <input
                type="text"
                required
                placeholder={language === 'ar' ? 'العنوان بالإنجليزية' : 'English Title'}
                value={newsTitle}
                onChange={(e) => setNewsTitle(e.target.value)}
                className="p-3 rounded-xl border bg-black/50 text-white text-sm"
              />
            </div>
            <textarea
              rows={3}
              placeholder={language === 'ar' ? 'تفاصيل الخبر بالعربية' : 'Arabic Content'}
              value={newsContentAr}
              onChange={(e) => setNewsContentAr(e.target.value)}
              className="w-full p-3 rounded-xl border bg-black/50 text-white text-sm"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-yellow-500 text-black hover:bg-yellow-400 cursor-pointer"
            >
              {language === 'ar' ? 'نشر الخبر' : 'Publish Article'}
            </button>
          </form>

          <div className="space-y-2">
            {newsList.map((news) => (
              <div key={news.id} className="p-4 rounded-xl border bg-white/5 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm">{language === 'ar' ? news.titleAr : news.title}</h4>
                  <span className="text-xs text-gray-400">{news.publishDate}</span>
                </div>
                <button
                  onClick={() => deleteNews(news.id)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Manage Manga & Light Novels */}
      {activeTab === 'manga' && (
        <div className="space-y-8">
          {/* Add Manga/Novel Form */}
          <form onSubmit={handleCreateManga} className="p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-neutral-900/90 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-black text-amber-400 flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                <span>{language === 'ar' ? 'إضافة عنوان مانغا أو رواية جديدة' : 'Add New Manga or Light Novel Title'}</span>
              </h3>
              <span className="text-xs font-mono text-gray-400">DMX™ Publishing Engine</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'نوع العمل' : 'Type'}</label>
                <select
                  value={mgType}
                  onChange={(e) => setMgType(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                >
                  <option value="manga">{language === 'ar' ? 'مانغا (Manga)' : 'Manga'}</option>
                  <option value="light_novel">{language === 'ar' ? 'رواية خفيفة (Light Novel)' : 'Light Novel'}</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'العنوان بالعربية' : 'Arabic Title'}</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: سيد الظلال"
                  value={mgTitleAr}
                  onChange={(e) => setMgTitleAr(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'العنوان بالإنجليزية' : 'English Title'}</label>
                <input
                  type="text"
                  required
                  placeholder="Solo Shadow Monarch"
                  value={mgTitle}
                  onChange={(e) => setMgTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'العنوان باليابانية' : 'Japanese Title'}</label>
                <input
                  type="text"
                  placeholder="影の君主"
                  value={mgJpTitle}
                  onChange={(e) => setMgJpTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'الكاتب (Author)' : 'Author'}</label>
                <input
                  type="text"
                  placeholder="DMX Studio & Author"
                  value={mgAuthor}
                  onChange={(e) => setMgAuthor(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'الرسام (Artist)' : 'Artist'}</label>
                <input
                  type="text"
                  placeholder="DMX Studio & Artist"
                  value={mgArtist}
                  onChange={(e) => setMgArtist(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'الحالة' : 'Status'}</label>
                <select
                  value={mgStatus}
                  onChange={(e) => setMgStatus(e.target.value as any)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                >
                  <option value="Ongoing">{language === 'ar' ? 'مستمر' : 'Ongoing'}</option>
                  <option value="Completed">{language === 'ar' ? 'مكتمل' : 'Completed'}</option>
                  <option value="Hiatus">{language === 'ar' ? 'متوقف مؤقتاً' : 'Hiatus'}</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'الملخص (Synopsis) بالعربية' : 'Arabic Synopsis'}</label>
                <textarea
                  rows={3}
                  placeholder="اكتب قصة العمل وباختصار..."
                  value={mgSynopsisAr}
                  onChange={(e) => setMgSynopsisAr(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'الملخص بالإنجليزية' : 'English Synopsis'}</label>
                <textarea
                  rows={3}
                  placeholder="Write story synopsis..."
                  value={mgSynopsis}
                  onChange={(e) => setMgSynopsis(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'رابط غلاف المانغا/الرواية (Cover Image)' : 'Cover Image URL'}</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={mgCover}
                  onChange={(e) => setMgCover(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'رابط البانر العلوي (Banner Image)' : 'Banner Image URL'}</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={mgBanner}
                  onChange={(e) => setMgBanner(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'التصنيفات (مفصولة بفاصلة)' : 'Genres (comma-separated)'}</label>
                <input
                  type="text"
                  placeholder="Action, Fantasy, System"
                  value={mgGenres}
                  onChange={(e) => setMgGenres(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-black text-sm transition-all cursor-pointer flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-5 h-5" />
              <span>{language === 'ar' ? 'حفظ ونشر العمل في المكتبة' : 'Publish Title to Library'}</span>
            </button>
          </form>

          {/* Add Chapter Form (if titles exist) */}
          {mangaList.length > 0 && (
            <form onSubmit={handleAddChapterToManga} className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-neutral-900/80 space-y-6 shadow-xl">
              <h3 className="text-lg font-extrabold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-amber-400" />
                <span>{language === 'ar' ? 'إضافة فصل جديد لعمل موجود' : 'Add New Chapter / Volume'}</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'اختر العمل' : 'Select Title'}</label>
                  <select
                    value={mgSelectedIdForCh}
                    onChange={(e) => setMgSelectedIdForCh(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                  >
                    <option value="">-- {language === 'ar' ? 'اختر المانغا أو الرواية' : 'Select Title'} --</option>
                    {mangaList.map((m) => (
                      <option key={m.id} value={m.id}>
                        [{m.type === 'manga' ? 'Manga' : 'Novel'}] {language === 'ar' ? m.titleAr : m.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'رقم الفصل' : 'Chapter #'}</label>
                  <input
                    type="number"
                    value={chNum}
                    onChange={(e) => setChNum(Number(e.target.value))}
                    className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'عنوان الفصل بالعربية' : 'Arabic Chapter Title'}</label>
                  <input
                    type="text"
                    required
                    placeholder="الفصل الأول: البداية"
                    value={chTitleAr}
                    onChange={(e) => setChTitleAr(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'عنوان الفصل بالإنجليزية' : 'English Chapter Title'}</label>
                <input
                  type="text"
                  required
                  placeholder="Chapter 1: The Beginning"
                  value={chTitle}
                  onChange={(e) => setChTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                />
              </div>

              {/* Conditional Chapter Content */}
              {mgSelectedIdForCh && mangaList.find((m) => m.id === mgSelectedIdForCh)?.type === 'manga' && (
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1">
                    {language === 'ar' ? 'روابط صفحات المانغا (رابط بكل سطر)' : 'Manga Image Pages (one URL per line)'}
                  </label>
                  <textarea
                    rows={4}
                    placeholder="https://image-page-1.jpg&#10;https://image-page-2.jpg"
                    value={chPagesStr}
                    onChange={(e) => setChPagesStr(e.target.value)}
                    className="w-full p-3 rounded-xl border border-white/20 bg-black text-white font-mono text-xs outline-none focus:border-amber-400"
                  />
                </div>
              )}

              {mgSelectedIdForCh && mangaList.find((m) => m.id === mgSelectedIdForCh)?.type === 'light_novel' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'نص الرواية بالعربية' : 'Novel Text (Arabic)'}</label>
                    <textarea
                      rows={6}
                      placeholder="اكتب نص الفصل كاملاً هنا..."
                      value={chNovelContentAr}
                      onChange={(e) => setChNovelContentAr(e.target.value)}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1">{language === 'ar' ? 'نص الرواية بالإنجليزية' : 'Novel Text (English)'}</label>
                    <textarea
                      rows={6}
                      placeholder="Write novel text here..."
                      value={chNovelContent}
                      onChange={(e) => setChNovelContent(e.target.value)}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer"
              >
                {language === 'ar' ? 'إضافة الفصل للعمل' : 'Add Chapter'}
              </button>
            </form>
          )}

          {/* List of Published Titles */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-white">
              {language === 'ar' ? `الأعمال المنشورة حالياً (${mangaList.length})` : `Published Titles (${mangaList.length})`}
            </h4>

            {mangaList.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white/5 text-center text-sm text-gray-400">
                {language === 'ar' ? 'لا توجد أي مانغا أو رواية منشورة حالياً. استخدم النموذج أعلاه لإضافة عملك الأول!' : 'No titles published yet. Use the form above to add your first title!'}
              </div>
            ) : (
              <div className="grid gap-3">
                {mangaList.map((m) => (
                  <div key={m.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img src={m.cover} alt={m.title} className="w-12 h-16 object-cover rounded-xl border border-amber-500/30" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-black uppercase">
                            {m.type}
                          </span>
                          <h5 className="font-extrabold text-sm text-white">{language === 'ar' ? m.titleAr : m.title}</h5>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {m.author} • {m.chaptersCount} {language === 'ar' ? 'فصل' : 'chapters'} • Status: {m.status}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteMangaNovel(m.id)}
                      className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors cursor-pointer"
                      title={language === 'ar' ? 'حذف العمل' : 'Delete Title'}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Manage Anime */}
      {activeTab === 'anime' && (
        <div className="space-y-6">
          {/* Create Anime Form */}
          <form onSubmit={handleCreateAnime} className="p-6 rounded-3xl border border-white/10 bg-white/5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
                <Tv className="w-5 h-5" />
                <span>{language === 'ar' ? 'إضافة أنيمي جديد واستعراض عداده' : 'Create New Anime Entry'}</span>
              </h3>
              <span className="text-[10px] font-mono text-gray-400">Owner & Admin Control</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Arabic Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'الاسم بالعربية' : 'Arabic Title'}</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: مملكة الظلال"
                  value={animeTitleAr}
                  onChange={(e) => setAnimeTitleAr(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
              </div>

              {/* English Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'الاسم بالإنجليزية' : 'English Title'}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kingdom of Shadows"
                  value={animeTitle}
                  onChange={(e) => setAnimeTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
              </div>

              {/* Japanese Title */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'الاسم باليابانية' : 'Japanese Title (Kanji/Romaji)'}</label>
                <input
                  type="text"
                  placeholder="e.g. 影の王国 (Kage no Ōkoku)"
                  value={animeJpTitle}
                  onChange={(e) => setAnimeJpTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Release Date & Countdown Target */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">
                  {language === 'ar' ? 'تاريخ العرض للعداد التنازلي' : 'Release Date & Time (Countdown Target)'}
                </label>
                <input
                  type="datetime-local"
                  value={animeReleaseDate}
                  onChange={(e) => setAnimeReleaseDate(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
              </div>

              {/* Status */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'حالة العرض والإنتاج' : 'Production Status'}</label>
                <select
                  value={animeStatus}
                  onChange={(e) => setAnimeStatus(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black text-white text-sm outline-none focus:border-yellow-400"
                >
                  <option value="In Production">{language === 'ar' ? 'قيد الإنتاج' : 'In Production'}</option>
                  <option value="Airing">{language === 'ar' ? 'يعرض الآن' : 'Airing'}</option>
                  <option value="Completed">{language === 'ar' ? 'مكتمل' : 'Completed'}</option>
                  <option value="Upcoming">{language === 'ar' ? 'قادماً قريباً' : 'Upcoming'}</option>
                </select>
              </div>
            </div>

            {/* Poster & Banner Upload */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'صورة البوستر (Poster)' : 'Poster Image'}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={animePoster}
                    onChange={(e) => setAnimePoster(e.target.value)}
                    className="flex-1 p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                  />
                  <label className="px-4 py-3 rounded-xl border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 text-xs font-bold cursor-pointer hover:bg-yellow-500/20 transition-colors shrink-0 flex items-center gap-1">
                    <Upload className="w-4 h-4" />
                    <span>{language === 'ar' ? 'رفع من الجهاز' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') setAnimePoster(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'صورة البانر / الخلفية (Banner)' : 'Banner Image'}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="https://..."
                    value={animeBanner}
                    onChange={(e) => setAnimeBanner(e.target.value)}
                    className="flex-1 p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                  />
                  <label className="px-4 py-3 rounded-xl border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 text-xs font-bold cursor-pointer hover:bg-yellow-500/20 transition-colors shrink-0 flex items-center gap-1">
                    <Upload className="w-4 h-4" />
                    <span>{language === 'ar' ? 'رفع من الجهاز' : 'Upload'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            if (typeof reader.result === 'string') setAnimeBanner(reader.result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Trailer URL */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'رابط التريلر / العرض الترويجي (Trailer URL)' : 'Trailer Video URL'}</label>
              <input
                type="text"
                placeholder="https://... (mp4 or video URL)"
                value={animeTrailerUrl}
                onChange={(e) => setAnimeTrailerUrl(e.target.value)}
                className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
              />
            </div>

            {/* Synopsis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <textarea
                rows={2}
                placeholder={language === 'ar' ? 'قصة الأنيمي بالعربية' : 'Arabic Synopsis'}
                value={animeSynopsisAr}
                onChange={(e) => setAnimeSynopsisAr(e.target.value)}
                className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
              />
              <textarea
                rows={2}
                placeholder={language === 'ar' ? 'قصة الأنيمي بالإنجليزية' : 'English Synopsis'}
                value={animeSynopsis}
                onChange={(e) => setAnimeSynopsis(e.target.value)}
                className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-black text-xs bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer shadow-lg flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ar' ? 'إضافة الأنيمي ونشر العداد' : 'Create Anime Title'}</span>
            </button>
          </form>

          {/* Edit Anime Modal / Form Overlay (For Owner / Admin) */}
          {editingAnime && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
              <form
                onSubmit={handleUpdateAnimeSubmit}
                className="bg-neutral-900 border border-yellow-500/40 rounded-3xl p-6 sm:p-8 max-w-3xl w-full space-y-6 shadow-2xl my-8 relative"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center border border-yellow-500/40">
                      <Edit className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">
                        {language === 'ar' ? 'تعديل بيانات الأنيمي والبوستر والتريلر' : 'Edit Anime Details, Poster & Trailer'}
                      </h3>
                      <span className="text-xs text-yellow-400 font-bold">
                        {language === 'ar' ? 'ميزة المالك والمدير' : 'Owner Control Panel'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingAnime(null)}
                    className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 text-xs font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Titles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'الاسم بالعربية' : 'Arabic Title'}</label>
                    <input
                      type="text"
                      required
                      value={editingAnime.titleAr || ''}
                      onChange={(e) => setEditingAnime({ ...editingAnime, titleAr: e.target.value })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'الاسم بالإنجليزية' : 'English Title'}</label>
                    <input
                      type="text"
                      required
                      value={editingAnime.title || ''}
                      onChange={(e) => setEditingAnime({ ...editingAnime, title: e.target.value })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'الاسم باليابانية' : 'Japanese Title'}</label>
                    <input
                      type="text"
                      value={editingAnime.japaneseTitle || ''}
                      onChange={(e) => setEditingAnime({ ...editingAnime, japaneseTitle: e.target.value })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                {/* Poster Edit with File Upload */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'صورة البوستر (تغيير البوستر)' : 'Poster Image'}</label>
                  <div className="flex gap-3 items-center">
                    {editingAnime.poster && (
                      <img src={editingAnime.poster} alt="Poster preview" className="w-12 h-16 object-cover rounded-xl border border-yellow-500/40 shrink-0" referrerPolicy="no-referrer" />
                    )}
                    <input
                      type="text"
                      value={editingAnime.poster || ''}
                      onChange={(e) => setEditingAnime({ ...editingAnime, poster: e.target.value })}
                      placeholder="https://..."
                      className="flex-1 p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                    <label className="px-4 py-3 rounded-xl border border-yellow-500/40 bg-yellow-500/20 text-yellow-400 text-xs font-bold cursor-pointer hover:bg-yellow-500/30 transition-colors shrink-0 flex items-center gap-1.5">
                      <Upload className="w-4 h-4" />
                      <span>{language === 'ar' ? 'رفع صورة من الجهاز' : 'Upload File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              if (typeof reader.result === 'string') setEditingAnime({ ...editingAnime, poster: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Banner Edit with File Upload */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'صورة البانر / الخلفية (Banner Image)' : 'Banner Image'}</label>
                  <div className="flex gap-3 items-center">
                    {editingAnime.banner && (
                      <img src={editingAnime.banner} alt="Banner preview" className="w-20 h-12 object-cover rounded-xl border border-yellow-500/40 shrink-0" referrerPolicy="no-referrer" />
                    )}
                    <input
                      type="text"
                      value={editingAnime.banner || ''}
                      onChange={(e) => setEditingAnime({ ...editingAnime, banner: e.target.value })}
                      placeholder="https://..."
                      className="flex-1 p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                    <label className="px-4 py-3 rounded-xl border border-yellow-500/40 bg-yellow-500/20 text-yellow-400 text-xs font-bold cursor-pointer hover:bg-yellow-500/30 transition-colors shrink-0 flex items-center gap-1.5">
                      <Upload className="w-4 h-4" />
                      <span>{language === 'ar' ? 'رفع صورة من الجهاز' : 'Upload File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              if (typeof reader.result === 'string') setEditingAnime({ ...editingAnime, banner: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Trailer URL Edit */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-300 uppercase flex items-center gap-1">
                    <Film className="w-3.5 h-3.5 text-yellow-400" />
                    <span>{language === 'ar' ? 'رابط العرض الترويجي / التريلر (Trailer Video URL)' : 'Trailer Video URL'}</span>
                  </label>
                  <input
                    type="text"
                    value={editingAnime.trailerUrl || ''}
                    onChange={(e) => setEditingAnime({ ...editingAnime, trailerUrl: e.target.value })}
                    placeholder="https://commondatastorage.googleapis.com/... or mp4 link"
                    className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                  />
                  <p className="text-[11px] text-gray-400 mt-1">
                    {language === 'ar' ? 'عند إنتاج أو تغيير التريلر ضع رابط الفيديو هنا وسيتم تحديث الصفحة الرئيسية وقسم الفيديو فوراً.' : 'Paste trailer video link here to update homepage and trailer view immediately.'}
                  </p>
                </div>

                {/* Status & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'تاريخ العرض / العداد' : 'Release Date'}</label>
                    <input
                      type="text"
                      value={editingAnime.releaseDate || ''}
                      onChange={(e) => setEditingAnime({ ...editingAnime, releaseDate: e.target.value })}
                      placeholder="2027-01-01T00:00"
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'حالة الإنتاج والعرض' : 'Production Status'}</label>
                    <select
                      value={editingAnime.status || 'In Production'}
                      onChange={(e) => setEditingAnime({ ...editingAnime, status: e.target.value as any })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    >
                      <option value="In Production">{language === 'ar' ? 'قيد الإنتاج' : 'In Production'}</option>
                      <option value="Airing">{language === 'ar' ? 'يعرض الآن' : 'Airing'}</option>
                      <option value="Completed">{language === 'ar' ? 'مكتمل' : 'Completed'}</option>
                      <option value="Upcoming">{language === 'ar' ? 'قادماً قريباً' : 'Upcoming'}</option>
                    </select>
                  </div>
                </div>

                {/* Synopsis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'القصة بالعربية' : 'Arabic Synopsis'}</label>
                    <textarea
                      rows={3}
                      value={editingAnime.synopsisAr || ''}
                      onChange={(e) => setEditingAnime({ ...editingAnime, synopsisAr: e.target.value })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'القصة بالإنجليزية' : 'English Synopsis'}</label>
                    <textarea
                      rows={3}
                      value={editingAnime.synopsis || ''}
                      onChange={(e) => setEditingAnime({ ...editingAnime, synopsis: e.target.value })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingAnime(null)}
                    className="px-6 py-3 rounded-xl font-bold text-xs bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl font-black text-xs bg-yellow-400 text-black hover:bg-yellow-300 transition-colors shadow-lg cursor-pointer flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>{language === 'ar' ? 'حفظ التعديلات والتحديث الفوري' : 'Save & Publish Changes'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Anime List */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span>{language === 'ar' ? `قائمة الأعمال والأنيمي المنشورة (${animeList.length})` : `Published Anime Titles (${animeList.length})`}</span>
            </h4>

            {animeList.map((anime) => (
              <div key={anime.id} className="p-4 rounded-2xl border border-white/10 bg-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-yellow-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <img src={anime.poster} alt={anime.title} className="w-12 h-16 object-cover rounded-xl border border-yellow-500/30 shrink-0" referrerPolicy="no-referrer" />
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-extrabold text-sm text-white">{language === 'ar' ? anime.titleAr : anime.title}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-black bg-yellow-500/20 border border-yellow-500/40 text-yellow-400 uppercase">
                        {anime.status}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                      {anime.japaneseTitle && <span className="text-gray-500 font-mono text-[11px] me-2">{anime.japaneseTitle}</span>}
                      {language === 'ar' ? anime.synopsisAr : anime.synopsis}
                    </p>
                    {anime.trailerUrl && (
                      <span className="inline-flex items-center gap-1 text-[10px] text-green-400 font-bold mt-1">
                        <Film className="w-3 h-3" />
                        {language === 'ar' ? 'التريلر متوفر' : 'Trailer Linked'}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => setEditingAnime(anime)}
                    className="px-3.5 py-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/40 transition-colors text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-md"
                    title={language === 'ar' ? 'تعديل الصور والتريلر والبيانات' : 'Edit details, poster & trailer'}
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'تعديل الأنيمي والصور والتريلر' : 'Edit Title & Media'}</span>
                  </button>

                  <button
                    onClick={() => deleteAnime(anime.id)}
                    className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-red-500/30"
                    title={language === 'ar' ? 'حذف الأنيمي' : 'Delete Anime'}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Manage Episodes */}
      {activeTab === 'episodes' && (
        <div className="space-y-6">
          <form onSubmit={handleCreateEpisode} className="p-6 rounded-3xl border bg-white/5 space-y-4">
            <h3 className="text-lg font-bold">{language === 'ar' ? 'رفع / إضافة حلقة جديدة' : 'Add New Episode'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                required
                value={epAnimeId}
                onChange={(e) => setEpAnimeId(e.target.value)}
                className="p-3 rounded-xl border bg-black text-white text-sm"
              >
                <option value="">{language === 'ar' ? 'اختر الأنيمي...' : 'Select Anime Title...'}</option>
                {animeList.map((a) => (
                  <option key={a.id} value={a.id}>
                    {language === 'ar' ? a.titleAr : a.title}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={epNum}
                onChange={(e) => setEpNum(Number(e.target.value))}
                placeholder="Episode Number"
                className="p-3 rounded-xl border bg-black/50 text-white text-sm"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Episode Title (Arabic)"
                value={epTitleAr}
                onChange={(e) => setEpTitleAr(e.target.value)}
                className="p-3 rounded-xl border bg-black/50 text-white text-sm"
              />
              <input
                type="text"
                required
                placeholder="Episode Title (English)"
                value={epTitle}
                onChange={(e) => setEpTitle(e.target.value)}
                className="p-3 rounded-xl border bg-black/50 text-white text-sm"
              />
            </div>
            <input
              type="text"
              placeholder="Video Stream URL (MP4 / HLS)"
              value={epVideoUrl}
              onChange={(e) => setEpVideoUrl(e.target.value)}
              className="w-full p-3 rounded-xl border bg-black/50 text-white text-sm"
            />
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl font-bold text-xs bg-yellow-500 text-black hover:bg-yellow-400 cursor-pointer"
            >
              {language === 'ar' ? 'إضافة الحلقة' : 'Publish Episode'}
            </button>
          </form>

          <div className="space-y-2">
            {episodes.map((ep) => (
              <div key={ep.id} className="p-4 rounded-xl border bg-white/5 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-sm">
                    Ep {ep.episodeNumber}: {language === 'ar' ? ep.titleAr : ep.title}
                  </h4>
                  <span className="text-xs text-gray-400">{ep.duration}</span>
                </div>
                <button
                  onClick={() => deleteEpisode(ep.id)}
                  className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Manage Characters */}
      {activeTab === 'characters' && (
        <div className="space-y-6">
          <form onSubmit={handleCreateCharacter} className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-white/5 space-y-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-yellow-400 flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>{language === 'ar' ? 'إضافة شخصية جديدة وربطها بالأنيمي' : 'Create New Character Entry'}</span>
              </h3>
              <span className="text-[10px] font-mono text-gray-400">Character Roster System</span>
            </div>

            {/* Select Anime */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">
                {language === 'ar' ? 'اختر الأنيمي التابع له الشخصية *' : 'Target Anime Title *'}
              </label>
              <select
                required
                value={charAnimeId}
                onChange={(e) => setCharAnimeId(e.target.value)}
                className="w-full p-3 rounded-xl border border-white/10 bg-black text-white text-sm outline-none focus:border-yellow-400"
              >
                <option value="">-- {language === 'ar' ? 'اختر الأنيمي المستهدف' : 'Select Anime Title'} --</option>
                {animeList.map((a) => (
                  <option key={a.id} value={a.id}>
                    {language === 'ar' ? a.titleAr : a.title} ({a.japaneseTitle || a.title})
                  </option>
                ))}
              </select>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'اسم الشخصية بالعربية *' : 'Arabic Name *'}</label>
                <input
                  type="text"
                  required
                  placeholder="مثال: رين تاكاهادي"
                  value={charNameAr}
                  onChange={(e) => setCharNameAr(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'اسم الشخصية بالإنجليزية *' : 'English Name *'}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ren Takahadi"
                  value={charName}
                  onChange={(e) => setCharName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'الاسم باليابانية / الكانجي' : 'Japanese Kanji Name'}</label>
                <input
                  type="text"
                  placeholder="e.g. 蓮 高橋"
                  value={charKanji}
                  onChange={(e) => setCharKanji(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            {/* Role & Age */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'دور الشخصية بالإنجليزية' : 'Role (English)'}</label>
                <select
                  value={charRole}
                  onChange={(e) => {
                    setCharRole(e.target.value);
                    if (e.target.value === 'Protagonist') setCharRoleAr('بطل القصة');
                    else if (e.target.value === 'Antagonist') setCharRoleAr('الخصم الرئيسي');
                    else if (e.target.value === 'Supporting') setCharRoleAr('شخصية ثانوية');
                    else if (e.target.value === 'Mentor') setCharRoleAr('المعلم / القائد');
                  }}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black text-white text-sm outline-none focus:border-yellow-400"
                >
                  <option value="Protagonist">Protagonist</option>
                  <option value="Antagonist">Antagonist</option>
                  <option value="Supporting">Supporting Character</option>
                  <option value="Mentor">Mentor / Leader</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'دور الشخصية بالعربية' : 'Role (Arabic)'}</label>
                <input
                  type="text"
                  placeholder="مثال: بطل القصة / الخصم"
                  value={charRoleAr}
                  onChange={(e) => setCharRoleAr(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'العمر' : 'Age'}</label>
                <input
                  type="text"
                  placeholder="21"
                  value={charAge}
                  onChange={(e) => setCharAge(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            {/* Character Portrait with Upload */}
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'صورة الشخصية (Portrait Image)' : 'Character Portrait Image'}</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="https://..."
                  value={charPortrait}
                  onChange={(e) => setCharPortrait(e.target.value)}
                  className="flex-1 p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
                <label className="px-4 py-3 rounded-xl border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 text-xs font-bold cursor-pointer hover:bg-yellow-500/20 transition-colors shrink-0 flex items-center gap-1">
                  <Upload className="w-4 h-4" />
                  <span>{language === 'ar' ? 'رفع صورة من الجهاز' : 'Upload Image'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          if (typeof reader.result === 'string') setCharPortrait(reader.result);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Voice Actor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'اسم مؤدي الصوت (بالعربية)' : 'Voice Actor (Arabic)'}</label>
                <input
                  type="text"
                  placeholder="مثال: أحمد المنصور"
                  value={charVoiceActorNameAr}
                  onChange={(e) => setCharVoiceActorNameAr(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'اسم مؤدي الصوت (بالإنجليزية)' : 'Voice Actor (English)'}</label>
                <input
                  type="text"
                  placeholder="e.g. Mamoru Miyano"
                  value={charVoiceActorName}
                  onChange={(e) => setCharVoiceActorName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            {/* Biography */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'نبذة وسيرة الشخصية (بالعربية)' : 'Arabic Biography'}</label>
                <textarea
                  rows={3}
                  placeholder="اكتب سيرة الشخصية ودورها في الأحداث..."
                  value={charBioAr}
                  onChange={(e) => setCharBioAr(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold text-gray-400 uppercase">{language === 'ar' ? 'نبذة وسيرة الشخصية (بالإنجليزية)' : 'English Biography'}</label>
                <textarea
                  rows={3}
                  placeholder="Write character background story..."
                  value={charBio}
                  onChange={(e) => setCharBio(e.target.value)}
                  className="w-full p-3 rounded-xl border border-white/10 bg-black/50 text-white text-sm outline-none focus:border-yellow-400"
                />
              </div>
            </div>

            {/* Primary Skill / Ability */}
            <div className="p-4 rounded-2xl border border-white/10 bg-black/30 space-y-3">
              <h4 className="text-xs font-bold text-yellow-400 uppercase flex items-center gap-1.5">
                <Zap className="w-4 h-4" />
                <span>{language === 'ar' ? 'القدرة / المهارة القتالية الرئيسية' : 'Primary Ability / Power Skill'}</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'اسم المهارة بالعربية (مثال: هالة الظلال)' : 'Ability Name (Arabic)'}
                  value={charAbilityNameAr}
                  onChange={(e) => setCharAbilityNameAr(e.target.value)}
                  className="p-3 rounded-xl border border-white/10 bg-black/50 text-white text-xs outline-none focus:border-yellow-400"
                />
                <input
                  type="text"
                  placeholder={language === 'ar' ? 'اسم المهارة بالإنجليزية (e.g. Shadow Aura)' : 'Ability Name (English)'}
                  value={charAbilityName}
                  onChange={(e) => setCharAbilityName(e.target.value)}
                  className="p-3 rounded-xl border border-white/10 bg-black/50 text-white text-xs outline-none focus:border-yellow-400"
                />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-bold shrink-0">{language === 'ar' ? 'قوة المهارة:' : 'Power:'} {charAbilityLevel}%</span>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={charAbilityLevel}
                    onChange={(e) => setCharAbilityLevel(Number(e.target.value))}
                    className="flex-1 accent-yellow-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl font-black text-xs bg-yellow-400 text-black hover:bg-yellow-300 cursor-pointer shadow-lg flex items-center gap-2 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{language === 'ar' ? 'حفظ الشخصية وربطها بالأنيمي' : 'Save Character & Assign to Anime'}</span>
            </button>
          </form>

          {/* Edit Character Modal */}
          {editingCharacter && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
              <form
                onSubmit={handleUpdateCharacterSubmit}
                className="bg-neutral-900 border border-yellow-500/40 rounded-3xl p-6 sm:p-8 max-w-3xl w-full space-y-6 shadow-2xl my-8 relative"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center border border-yellow-500/40">
                      <Edit className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black text-white">
                        {language === 'ar' ? 'تعديل بيانات الشخصية والصورة' : 'Edit Character Profile'}
                      </h3>
                      <span className="text-xs text-yellow-400 font-bold">
                        {language === 'ar' ? 'تعديل وتحسين معلومات الشخصية' : 'Studio Control Panel'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingCharacter(null)}
                    className="p-2 text-gray-400 hover:text-white rounded-xl hover:bg-white/10 text-xs font-bold cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Target Anime */}
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'الأنيمي التابع له' : 'Belongs to Anime'}</label>
                  <select
                    value={editingCharacter.animeId}
                    onChange={(e) => setEditingCharacter({ ...editingCharacter, animeId: e.target.value })}
                    className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                  >
                    {animeList.map((a) => (
                      <option key={a.id} value={a.id}>
                        {language === 'ar' ? a.titleAr : a.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Names */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'الاسم بالعربية' : 'Arabic Name'}</label>
                    <input
                      type="text"
                      required
                      value={editingCharacter.nameAr || ''}
                      onChange={(e) => setEditingCharacter({ ...editingCharacter, nameAr: e.target.value })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'الاسم بالإنجليزية' : 'English Name'}</label>
                    <input
                      type="text"
                      required
                      value={editingCharacter.name || ''}
                      onChange={(e) => setEditingCharacter({ ...editingCharacter, name: e.target.value })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'الاسم بالكانجي' : 'Kanji Name'}</label>
                    <input
                      type="text"
                      value={editingCharacter.kanjiName || ''}
                      onChange={(e) => setEditingCharacter({ ...editingCharacter, kanjiName: e.target.value })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                {/* Role & Age */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'الدور بالعربية' : 'Role (Arabic)'}</label>
                    <input
                      type="text"
                      value={editingCharacter.roleAr || ''}
                      onChange={(e) => setEditingCharacter({ ...editingCharacter, roleAr: e.target.value })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'الدور بالإنجليزية' : 'Role (English)'}</label>
                    <input
                      type="text"
                      value={editingCharacter.role || ''}
                      onChange={(e) => setEditingCharacter({ ...editingCharacter, role: e.target.value })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                {/* Image Portrait with File Upload */}
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'صورة الشخصية (Portrait)' : 'Portrait Image'}</label>
                  <div className="flex gap-3 items-center">
                    {editingCharacter.portrait && (
                      <img src={editingCharacter.portrait} alt="Portrait preview" className="w-12 h-16 object-cover rounded-xl border border-yellow-500/40 shrink-0" referrerPolicy="no-referrer" />
                    )}
                    <input
                      type="text"
                      value={editingCharacter.portrait || ''}
                      onChange={(e) => setEditingCharacter({ ...editingCharacter, portrait: e.target.value })}
                      placeholder="https://..."
                      className="flex-1 p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                    <label className="px-4 py-3 rounded-xl border border-yellow-500/40 bg-yellow-500/20 text-yellow-400 text-xs font-bold cursor-pointer hover:bg-yellow-500/30 transition-colors shrink-0 flex items-center gap-1.5">
                      <Upload className="w-4 h-4" />
                      <span>{language === 'ar' ? 'رفع صورة' : 'Upload File'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              if (typeof reader.result === 'string') setEditingCharacter({ ...editingCharacter, portrait: reader.result });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                {/* Voice Actor */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'مؤدي الصوت (بالعربية)' : 'Voice Actor (Arabic)'}</label>
                    <input
                      type="text"
                      value={editingCharacter.voiceActor?.nameAr || ''}
                      onChange={(e) => setEditingCharacter({
                        ...editingCharacter,
                        voiceActor: { ...editingCharacter.voiceActor, nameAr: e.target.value }
                      })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'مؤدي الصوت (بالإنجليزية)' : 'Voice Actor (English)'}</label>
                    <input
                      type="text"
                      value={editingCharacter.voiceActor?.name || ''}
                      onChange={(e) => setEditingCharacter({
                        ...editingCharacter,
                        voiceActor: { ...editingCharacter.voiceActor, name: e.target.value }
                      })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                {/* Biography */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'السيرة بالعربية' : 'Arabic Biography'}</label>
                    <textarea
                      rows={3}
                      value={editingCharacter.biographyAr || ''}
                      onChange={(e) => setEditingCharacter({ ...editingCharacter, biographyAr: e.target.value })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-300 uppercase">{language === 'ar' ? 'السيرة بالإنجليزية' : 'English Biography'}</label>
                    <textarea
                      rows={3}
                      value={editingCharacter.biography || ''}
                      onChange={(e) => setEditingCharacter({ ...editingCharacter, biography: e.target.value })}
                      className="w-full p-3 rounded-xl border border-white/20 bg-black text-white text-sm outline-none focus:border-yellow-400"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setEditingCharacter(null)}
                    className="px-6 py-3 rounded-xl font-bold text-xs bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3 rounded-xl font-black text-xs bg-yellow-400 text-black hover:bg-yellow-300 transition-colors shadow-lg cursor-pointer flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>{language === 'ar' ? 'حفظ التغييرات والتحديث' : 'Save Changes'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Character Roster List */}
          <div className="space-y-4">
            <h4 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-yellow-400" />
              <span>{language === 'ar' ? `شخصيات الاستوديو المضافة (${characters.length})` : `Character Roster (${characters.length})`}</span>
            </h4>

            {characters.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center text-sm text-gray-400 space-y-2">
                <Users className="w-8 h-8 mx-auto text-gray-500" />
                <p>{language === 'ar' ? 'لا توجد شخصيات مضافة حتى الآن. استخدم النموذج أعلاه لإنشاء وتحديد الشخصيات.' : 'No characters added yet. Use the form above to add characters!'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {characters.map((char) => {
                  const targetAnime = animeList.find((a) => a.id === char.animeId);
                  return (
                    <div
                      key={char.id}
                      className="p-4 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-between gap-4 hover:border-yellow-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={char.portrait}
                          alt={char.name}
                          className="w-14 h-16 object-cover rounded-xl border border-yellow-500/40 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <span className="px-2 py-0.5 rounded text-[9px] font-black bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 inline-block mb-1">
                            {targetAnime ? (language === 'ar' ? targetAnime.titleAr : targetAnime.title) : 'Unassigned Anime'}
                          </span>
                          <h4 className="font-extrabold text-sm text-white truncate">
                            {language === 'ar' ? char.nameAr : char.name}
                          </h4>
                          <p className="text-xs text-gray-400 truncate">
                            {language === 'ar' ? char.roleAr : char.role} • CV: {language === 'ar' ? char.voiceActor?.nameAr : char.voiceActor?.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => setEditingCharacter(char)}
                          className="px-3 py-2 rounded-xl bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 border border-yellow-500/40 text-xs font-extrabold cursor-pointer transition-colors flex items-center gap-1"
                          title={language === 'ar' ? 'تعديل الشخصية' : 'Edit Character'}
                        >
                          <Edit className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'تعديل' : 'Edit'}</span>
                        </button>
                        <button
                          onClick={() => deleteCharacter(char.id)}
                          className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors cursor-pointer"
                          title={language === 'ar' ? 'حذف الشخصية' : 'Delete Character'}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab: Backup & Restore */}
      {activeTab === 'backup' && (
        <div className="p-6 rounded-3xl border bg-white/5 space-y-6">
          <h3 className="text-xl font-bold">{language === 'ar' ? 'نسخ واستعادة قاعدة البيانات' : 'Backup & Restore Database'}</h3>
          <div className="flex gap-4">
            <button
              onClick={handleExportBackup}
              className="px-6 py-3 rounded-xl font-bold text-xs bg-yellow-500 text-black hover:bg-yellow-400 transition-colors cursor-pointer"
            >
              {language === 'ar' ? 'تصدير ملف النسخة الاحتياطية (JSON)' : 'Export Backup JSON'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
