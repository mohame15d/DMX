import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  Direction,
  ActiveView,
  Anime,
  Episode,
  NewsArticle,
  Character,
  GalleryItem,
  WebsiteTheme,
  User,
  UserRole,
  CommentItem,
  NotificationItem,
  ProductionUpdate,
  JobApplication,
  CommunityPost,
  ChatMessage,
  BattleCharacter,
  BattleMatch,
  TournamentRoom,
  ArenaPlayerProfile,
  MangaNovelItem,
  MangaChapter,
} from '../types';

import { compressImageDataUrl } from '../utils/imageCompressor';
import {
  analyzeCharacterWithAI,
  generateAIBotCompetitors,
  generateFullTournamentBracket,
} from '../utils/battleEngine';

interface StudioContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations['en']) => string;

  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  selectedAnimeId: string;
  setSelectedAnimeId: (id: string) => void;
  selectedEpisodeId: string;
  setSelectedEpisodeId: (id: string) => void;
  selectedArticleId: string;
  setSelectedArticleId: (id: string) => void;
  selectedCharacterId: string;
  setSelectedCharacterId: (id: string) => void;
  selectedMangaId: string;
  setSelectedMangaId: (id: string) => void;

  // Data Collections
  mangaList: MangaNovelItem[];
  animeList: Anime[];
  episodes: Episode[];
  newsList: NewsArticle[];
  characters: Character[];
  gallery: GalleryItem[];
  productionUpdates: ProductionUpdate[];
  notifications: NotificationItem[];
  comments: CommentItem[];
  jobApplications: JobApplication[];
  posts: CommunityPost[];
  usersList: User[];
  chatMessages: ChatMessage[];

  // DMX Battle Arena™
  battleRooms: TournamentRoom[];
  arenaLeaderboard: ArenaPlayerProfile[];
  userBattleCharacters: BattleCharacter[];
  activeRoomId: string | null;
  setActiveRoomId: (id: string | null) => void;
  createBattleRoom: (name: string, character: BattleCharacter) => Promise<string>;
  joinBattleRoom: (roomId: string, character: BattleCharacter) => Promise<boolean>;
  startTournament: (roomId: string) => Promise<void>;
  saveUserBattleCharacter: (character: BattleCharacter) => Promise<void>;

  // Data Actions
  addAnime: (anime: Anime) => Promise<void>;
  updateAnime: (anime: Anime) => Promise<void>;
  deleteAnime: (id: string) => void;
  addMangaNovel: (manga: MangaNovelItem) => Promise<void>;
  updateMangaNovel: (manga: MangaNovelItem) => Promise<void>;
  deleteMangaNovel: (id: string) => void;
  addEpisode: (episode: Episode) => void;
  updateEpisode: (episode: Episode) => void;
  deleteEpisode: (id: string) => void;
  addNews: (news: NewsArticle) => Promise<void>;
  updateNews: (news: NewsArticle) => Promise<void>;
  deleteNews: (id: string) => void;
  addCharacter: (character: Character) => Promise<void>;
  updateCharacter: (character: Character) => Promise<void>;
  deleteCharacter: (id: string) => void;
  addGalleryItem: (item: GalleryItem) => void;
  deleteGalleryItem: (id: string) => void;
  addComment: (targetType: 'episode' | 'news' | 'gallery' | 'anime' | 'character', targetId: string, content: string) => void;
  upvoteComment: (id: string) => void;
  deleteComment: (id: string) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Community Feed Actions
  addPost: (content: string, mediaUrl?: string) => Promise<void>;
  toggleLikePost: (postId: string) => void;
  addReactionToPost: (postId: string, emoji: string) => void;
  deletePost: (postId: string) => void;

  // Private Chat Actions
  sendChatMessage: (recipientId: string, content: string, mediaUrl?: string) => Promise<void>;
  isChatModalOpen: boolean;
  setIsChatModalOpen: (open: boolean) => void;
  chatRecipientUser: User | null;
  setChatRecipientUser: (user: User | null) => void;

  // User Role & Verification Management
  updateUserRole: (userId: string, newRole: UserRole) => Promise<void>;
  toggleUserVerification: (userId: string, isVerified: boolean) => Promise<void>;

  // Job Application Actions
  submitJobApplication: (app: Omit<JobApplication, 'id' | 'status' | 'createdAt' | 'encryptedPayload'>) => Promise<{ success: boolean; id: string }>;
  updateJobApplicationStatus: (id: string, status: JobApplication['status']) => void;
  deleteJobApplication: (id: string) => void;

  // User Authentication
  currentUser: User | null;
  login: (username: string, password: string) => { success: boolean; error?: string };
  register: (username: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  toggleFavorite: (animeId: string) => void;
  saveWatchProgress: (episodeId: string, animeId: string, timestamp: number, duration: number) => void;

  // Website Customizer & Themes
  activeTheme: WebsiteTheme;
  presetThemesList: WebsiteTheme[];
  applyTheme: (theme: WebsiteTheme) => void;
  applyPresetTheme: (presetId: string) => void;
  updateActiveThemeField: <K extends keyof WebsiteTheme>(field: K, value: WebsiteTheme[K]) => void;
  saveActiveThemeToFirestore: () => Promise<void>;
  toggleTheme: () => void;
  exportBackupJSON: () => string;
  importBackupJSON: (jsonStr: string) => boolean;

  // Global Search Modal
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  // Auth Modal
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalMode: 'login' | 'register';
  setAuthModalMode: (mode: 'login' | 'register') => void;
}

import {
  initialAnimeList,
  initialEpisodes,
  initialNewsList,
  initialCharacters,
  initialGallery,
  initialProductionUpdates,
  presetThemes,
  defaultUser,
  initialNotifications,
  initialComments,
} from '../data/mockData';
import { INITIAL_MANGA_NOVELS } from '../data/mangaData';
import { getTranslation, translations } from '../utils/translations';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const StudioContext = createContext<StudioContextType | undefined>(undefined);

const LOCAL_STORAGE_LANG_KEY = 'dmx_studio_lang';
const LOCAL_STORAGE_THEME_KEY = 'dmx_studio_theme';
const LOCAL_STORAGE_USER_KEY = 'dmx_studio_user_v8';

const NINE_HOURS_MS = 9 * 60 * 60 * 1000;

export const StudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Language State
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_LANG_KEY);
    if (saved === 'en' || saved === 'ar') return saved;
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('ar')) return 'ar';
    return 'en';
  });

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', language);
    localStorage.setItem(LOCAL_STORAGE_LANG_KEY, language);
  }, [language, direction]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: keyof typeof translations['en']) => getTranslation(language, key);

  // 2. Active View & Selection
  const [activeView, setActiveView] = useState<ActiveView>('home');
  const [selectedAnimeId, setSelectedAnimeId] = useState<string>('');
  const [selectedEpisodeId, setSelectedEpisodeId] = useState<string>('');
  const [selectedArticleId, setSelectedArticleId] = useState<string>('');
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>('');
  const [selectedMangaId, setSelectedMangaId] = useState<string>('');

  // 3. Collections State
  const [mangaList, setMangaList] = useState<MangaNovelItem[]>([]);
  const [animeList, setAnimeList] = useState<Anime[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [newsList, setNewsList] = useState<NewsArticle[]>([]);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [productionUpdates] = useState<ProductionUpdate[]>(initialProductionUpdates);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [comments, setComments] = useState<CommentItem[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [registeredUsers, setRegisteredUsers] = useState<{ username: string; password: string; user: User }[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // DMX Battle Arena State
  const [battleRooms, setBattleRooms] = useState<TournamentRoom[]>([]);
  const [arenaLeaderboard, setArenaLeaderboard] = useState<ArenaPlayerProfile[]>([]);
  const [userBattleCharacters, setUserBattleCharacters] = useState<BattleCharacter[]>([]);
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  // Chat Modal State
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [chatRecipientUser, setChatRecipientUser] = useState<User | null>(null);

  // 4. Real-time Firestore Synchronization
  useEffect(() => {
    // Registered Users Sync
    const unsubUsers = onSnapshot(collection(db, 'registeredUsers'), (snapshot) => {
      const ownerDoc = {
        username: 'dmxanim',
        password: 'dmxanim123',
        user: {
          id: 'usr-owner-dmxanim',
          username: 'dmxanim',
          email: 'dmxanim@dmx-studio.com',
          role: 'Owner' as const,
          isVerified: true,
          avatar: '/src/assets/images/dmx_studio_logo_1785673442803.jpg',
          favorites: ['painter-of-death', 'cyber-blade-zero'],
          watchHistory: [],
          createdAt: '2026-01-01',
        },
      };

      if (snapshot.empty) {
        setDoc(doc(db, 'registeredUsers', 'dmxanim'), ownerDoc).catch(console.error);
        setRegisteredUsers([ownerDoc]);
      } else {
        const usersListFromDb = snapshot.docs.map((d) => d.data() as { username: string; password: string; user: User });
        
        // Ensure dmxanim account has Owner role and isVerified
        const dmxIndex = usersListFromDb.findIndex((u) => u.username.toLowerCase() === 'dmxanim');
        if (dmxIndex !== -1) {
          const dmxUserRec = usersListFromDb[dmxIndex];
          if (dmxUserRec.user.role !== 'Owner' || !dmxUserRec.user.isVerified) {
            const updatedRec = {
              ...dmxUserRec,
              user: {
                ...dmxUserRec.user,
                role: 'Owner' as const,
                isVerified: true,
              },
            };
            usersListFromDb[dmxIndex] = updatedRec;
            setDoc(doc(db, 'registeredUsers', 'dmxanim'), updatedRec).catch(console.error);
          }
        } else {
          setDoc(doc(db, 'registeredUsers', 'dmxanim'), ownerDoc).catch(console.error);
          usersListFromDb.push(ownerDoc);
        }

        // Also ensure bmxanim legacy account has Owner role if present
        const bmxIndex = usersListFromDb.findIndex((u) => u.username.toLowerCase() === 'bmxanim');
        if (bmxIndex !== -1) {
          const bmxRec = usersListFromDb[bmxIndex];
          if (bmxRec.user.role !== 'Owner' || !bmxRec.user.isVerified) {
            const updatedBmx = {
              ...bmxRec,
              user: { ...bmxRec.user, role: 'Owner' as const, isVerified: true },
            };
            usersListFromDb[bmxIndex] = updatedBmx;
            setDoc(doc(db, 'registeredUsers', 'bmxanim'), updatedBmx).catch(console.error);
          }
        }

        setRegisteredUsers(usersListFromDb);
      }
    });

    // Private Chat Sync (Auto 9h Expiry Filter)
    const unsubChat = onSnapshot(collection(db, 'private_chats'), (snapshot) => {
      const now = Date.now();
      const validMessages: ChatMessage[] = [];
      snapshot.docs.forEach((d) => {
        const msg = d.data() as ChatMessage;
        if (now - msg.timestampMs < NINE_HOURS_MS) {
          validMessages.push(msg);
        } else {
          // Permanently delete expired messages
          deleteDoc(doc(db, 'private_chats', d.id)).catch(console.error);
        }
      });
      validMessages.sort((a, b) => a.timestampMs - b.timestampMs);
      setChatMessages(validMessages);
    });

    // Posts Sync
    const unsubPosts = onSnapshot(collection(db, 'posts'), (snapshot) => {
      if (snapshot.empty) {
        const initialPost: CommunityPost = {
          id: 'post-1',
          userId: 'usr-owner-bmxanim',
          userName: 'bmxanim',
          userAvatar: '/src/assets/images/dmx_studio_logo_1785673442803.jpg',
          userRole: 'Owner',
          content: 'مرحباً بكم في مجتمع DMX™ Animation Studio الرسمية! ترقبوا العرض التشويقي الضخم قريباً 🎬⚔️',
          mediaUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80',
          likes: 24,
          likedBy: [],
          reactions: { '❤️': 12, '🔥': 18, '👍': 8 },
          createdAt: '2026-08-02 10:00',
        };
        setDoc(doc(db, 'posts', initialPost.id), initialPost).catch(console.error);
        setPosts([initialPost]);
      } else {
        const items = snapshot.docs.map((d) => d.data() as CommunityPost);
        items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setPosts(items);
      }
    });

    // Manga & Light Novels Sync
    const unsubManga = onSnapshot(collection(db, 'manga_novels'), (snapshot) => {
      if (snapshot.empty) {
        INITIAL_MANGA_NOVELS.forEach((item) => {
          setDoc(doc(db, 'manga_novels', item.id), item).catch(console.error);
        });
        setMangaList(INITIAL_MANGA_NOVELS);
      } else {
        const items = snapshot.docs.map((d) => d.data() as MangaNovelItem);
        setMangaList(items);
      }
    });

    // Anime Sync
    const unsubAnime = onSnapshot(collection(db, 'anime'), (snapshot) => {
      if (snapshot.empty) {
        initialAnimeList.forEach((item) => {
          setDoc(doc(db, 'anime', item.id), item).catch(console.error);
        });
        setAnimeList(initialAnimeList);
      } else {
        const items = snapshot.docs.map((d) => d.data() as Anime);
        items.sort((a, b) => b.id.localeCompare(a.id));
        setAnimeList(items);
      }
    });

    // Episodes Sync
    const unsubEpisodes = onSnapshot(collection(db, 'episodes'), (snapshot) => {
      if (snapshot.empty) {
        initialEpisodes.forEach((item) => {
          setDoc(doc(db, 'episodes', item.id), item).catch(console.error);
        });
        setEpisodes(initialEpisodes);
      } else {
        const items = snapshot.docs.map((d) => d.data() as Episode);
        items.sort((a, b) => b.id.localeCompare(a.id));
        setEpisodes(items);
      }
    });

    // News Sync
    const unsubNews = onSnapshot(collection(db, 'news'), (snapshot) => {
      if (snapshot.empty) {
        initialNewsList.forEach((item) => {
          setDoc(doc(db, 'news', item.id), item).catch(console.error);
        });
        setNewsList(initialNewsList);
      } else {
        const items = snapshot.docs.map((d) => d.data() as NewsArticle);
        items.sort((a, b) => (b.publishDate || '').localeCompare(a.publishDate || ''));
        setNewsList(items);
      }
    });

    // Characters Sync
    const unsubCharacters = onSnapshot(collection(db, 'characters'), (snapshot) => {
      if (snapshot.empty) {
        initialCharacters.forEach((item) => {
          setDoc(doc(db, 'characters', item.id), item).catch(console.error);
        });
        setCharacters(initialCharacters);
      } else {
        const items = snapshot.docs.map((d) => d.data() as Character);
        items.sort((a, b) => b.id.localeCompare(a.id));
        setCharacters(items);
      }
    });

    // Gallery Sync
    const unsubGallery = onSnapshot(collection(db, 'gallery'), (snapshot) => {
      if (snapshot.empty) {
        initialGallery.forEach((item) => {
          setDoc(doc(db, 'gallery', item.id), item).catch(console.error);
        });
        setGallery(initialGallery);
      } else {
        const items = snapshot.docs.map((d) => d.data() as GalleryItem);
        items.sort((a, b) => b.id.localeCompare(a.id));
        setGallery(items);
      }
    });

    // Notifications Sync
    const unsubNotifications = onSnapshot(collection(db, 'notifications'), (snapshot) => {
      if (snapshot.empty) {
        initialNotifications.forEach((item) => {
          setDoc(doc(db, 'notifications', item.id), item).catch(console.error);
        });
        setNotifications(initialNotifications);
      } else {
        const items = snapshot.docs.map((d) => d.data() as NotificationItem);
        items.sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));
        setNotifications(items);
      }
    });

    // Comments Sync
    const unsubComments = onSnapshot(collection(db, 'comments'), (snapshot) => {
      if (snapshot.empty) {
        initialComments.forEach((item) => {
          setDoc(doc(db, 'comments', item.id), item).catch(console.error);
        });
        setComments(initialComments);
      } else {
        const items = snapshot.docs.map((d) => d.data() as CommentItem);
        items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setComments(items);
      }
    });

    // Job Applications Sync
    const unsubJobs = onSnapshot(collection(db, 'jobApplications'), (snapshot) => {
      const items = snapshot.docs.map((d) => d.data() as JobApplication);
      items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      setJobApplications(items);
    });

    // Battle Arena Rooms Sync
    const unsubBattleRooms = onSnapshot(collection(db, 'battleRooms'), (snapshot) => {
      if (snapshot.empty) {
        const defaultRooms: TournamentRoom[] = [
          {
            id: 'room-1',
            name: 'Grand Celestial Coliseum',
            nameAr: 'مدرج السماوات العظمى',
            ownerId: 'usr-owner-dmxanim',
            ownerName: 'dmxanim',
            season: 1,
            players: [],
            maxPlayers: 32,
            status: 'waiting',
            createdAt: new Date().toISOString(),
            matches: [],
          },
          {
            id: 'room-2',
            name: 'DMX™ S1 World Championship',
            nameAr: 'بطولة العالم DMX™ الموسم الأول',
            ownerId: 'usr-owner-dmxanim',
            ownerName: 'dmxanim',
            season: 1,
            players: [],
            maxPlayers: 32,
            status: 'waiting',
            createdAt: new Date().toISOString(),
            matches: [],
          },
          {
            id: 'room-3',
            name: 'Cyberpunk Shadow Ring',
            nameAr: 'حلبة الظلال السيبرانية',
            ownerId: 'usr-owner-dmxanim',
            ownerName: 'dmxanim',
            season: 1,
            players: [],
            maxPlayers: 32,
            status: 'waiting',
            createdAt: new Date().toISOString(),
            matches: [],
          },
        ];
        defaultRooms.forEach((r) => setDoc(doc(db, 'battleRooms', r.id), r).catch(console.error));
        setBattleRooms(defaultRooms);
      } else {
        const items = snapshot.docs.map((d) => d.data() as TournamentRoom);
        setBattleRooms(items);
      }
    });

    // Arena Leaderboard Sync
    const unsubArenaLeaderboard = onSnapshot(collection(db, 'arenaLeaderboard'), (snapshot) => {
      if (snapshot.empty) {
        const defaultLeaderboard: ArenaPlayerProfile[] = [
          {
            userId: 'usr-owner-dmxanim',
            userName: 'dmxanim',
            userAvatar: '/src/assets/images/dmx_studio_logo_1785673442803.jpg',
            ratingPoints: 2450,
            wins: 48,
            losses: 4,
            winRate: 92,
            championships: 6,
            badges: ['🏆 Season 1 Founder', '⚔️ DMX Warlord', '🔥 Grandmaster'],
            titles: ['Studio Overlord', 'Tournament Pioneer'],
            favoriteCharacterName: 'Zenith Shadow Blade',
            highestRank: '#1 Grandmaster',
          },
          {
            userId: 'usr-bot-ryujin',
            userName: 'Ryujin Shadow',
            userAvatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&auto=format&fit=crop&q=80',
            ratingPoints: 1980,
            wins: 34,
            losses: 12,
            winRate: 74,
            championships: 2,
            badges: ['🥈 Season 1 Runner-Up'],
            titles: ['Shadow Master'],
            favoriteCharacterName: 'Shadow Katana',
            highestRank: '#2 Champion',
          },
        ];
        defaultLeaderboard.forEach((p) => setDoc(doc(db, 'arenaLeaderboard', p.userId), p).catch(console.error));
        setArenaLeaderboard(defaultLeaderboard);
      } else {
        const items = snapshot.docs.map((d) => d.data() as ArenaPlayerProfile);
        items.sort((a, b) => b.ratingPoints - a.ratingPoints);
        setArenaLeaderboard(items);
      }
    });

    return () => {
      unsubUsers();
      unsubChat();
      unsubPosts();
      unsubManga();
      unsubAnime();
      unsubEpisodes();
      unsubNews();
      unsubCharacters();
      unsubGallery();
      unsubNotifications();
      unsubComments();
      unsubJobs();
      unsubBattleRooms();
      unsubArenaLeaderboard();
    };

  }, []);

  // Periodic 9-hour Chat Cleanup Interval
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      setChatMessages((prev) => prev.filter((m) => now - m.timestampMs < NINE_HOURS_MS));
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  // Users List view
  const usersList: User[] = registeredUsers.map((u) => u.user);

  // 5. User State
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    return saved ? JSON.parse(saved) : defaultUser;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  }, [currentUser]);

  // Keep currentUser synced with registeredUsers list if role or verification changes
  useEffect(() => {
    if (currentUser) {
      const freshRec = registeredUsers.find((u) => u.user.id === currentUser.id);
      if (
        freshRec &&
        (freshRec.user.role !== currentUser.role || freshRec.user.isVerified !== currentUser.isVerified)
      ) {
        setCurrentUser(freshRec.user);
      }
    }
  }, [registeredUsers]);

  // 6. Theme State & Sync
  const [activeTheme, setActiveThemeState] = useState<WebsiteTheme>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_THEME_KEY);
    return saved ? JSON.parse(saved) : presetThemes[0];
  });

  useEffect(() => {
    const unsubTheme = onSnapshot(doc(db, 'theme', 'activeTheme'), (snapshot) => {
      if (snapshot.exists()) {
        setActiveThemeState(snapshot.data() as WebsiteTheme);
      } else {
        setDoc(doc(db, 'theme', 'activeTheme'), presetThemes[0]).catch(console.error);
      }
    });
    return () => unsubTheme();
  }, []);

  const setActiveTheme = (theme: WebsiteTheme) => {
    setActiveThemeState(theme);
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, JSON.stringify(theme));
    setDoc(doc(db, 'theme', 'activeTheme'), theme).catch(console.error);
  };

  const toggleTheme = () => {
    const nextTheme = activeTheme.id === 'cyberpunk' ? presetThemes[1] : presetThemes[0];
    setActiveTheme(nextTheme);
  };

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');

  // Role & Verification Management (Owner & Admin Privileges)
  const updateUserRole = async (identifier: string, newRole: UserRole) => {
    const cleanId = identifier.toLowerCase();
    const rec = registeredUsers.find(
      (u) =>
        u.user.id === identifier ||
        u.username.toLowerCase() === cleanId ||
        u.user.username.toLowerCase() === cleanId
    );
    if (!rec) return;

    const updatedUser: User = {
      ...rec.user,
      role: newRole,
    };

    const updatedRec = {
      ...rec,
      user: updatedUser,
    };

    // Update in local state immediately for instant UI response
    setRegisteredUsers((prev) =>
      prev.map((r) => (r.username.toLowerCase() === rec.username.toLowerCase() ? updatedRec : r))
    );

    // Save to Firestore
    await setDoc(doc(db, 'registeredUsers', rec.username.toLowerCase()), updatedRec);

    if (currentUser?.id === updatedUser.id || currentUser?.username.toLowerCase() === rec.username.toLowerCase()) {
      setCurrentUser(updatedUser);
    }
  };

  const toggleUserVerification = async (identifier: string, explicitVerified?: boolean) => {
    const cleanId = identifier.toLowerCase();
    const rec = registeredUsers.find(
      (u) =>
        u.user.id === identifier ||
        u.username.toLowerCase() === cleanId ||
        u.user.username.toLowerCase() === cleanId
    );
    if (!rec) return;

    const newVerifiedState = explicitVerified !== undefined ? explicitVerified : !rec.user.isVerified;

    const updatedUser: User = {
      ...rec.user,
      isVerified: newVerifiedState,
    };

    const updatedRec = {
      ...rec,
      user: updatedUser,
    };

    // Update in local state immediately
    setRegisteredUsers((prev) =>
      prev.map((r) => (r.username.toLowerCase() === rec.username.toLowerCase() ? updatedRec : r))
    );

    // Save to Firestore
    await setDoc(doc(db, 'registeredUsers', rec.username.toLowerCase()), updatedRec);

    if (currentUser?.id === updatedUser.id || currentUser?.username.toLowerCase() === rec.username.toLowerCase()) {
      setCurrentUser(updatedUser);
    }
  };

  // Chat Actions
  const sendChatMessage = async (recipientId: string, content: string, mediaUrl?: string) => {
    if (!currentUser) return;

    let processedMedia = mediaUrl;
    if (mediaUrl && mediaUrl.startsWith('data:image')) {
      processedMedia = await compressImageDataUrl(mediaUrl, 800, 0.7);
    }

    const msgId = `chat-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
    const newMsg: ChatMessage = {
      id: msgId,
      senderId: currentUser.id || '',
      senderName: currentUser.username || '',
      senderAvatar: currentUser.avatar || '',
      senderRole: currentUser.role || 'User',
      senderVerified: Boolean(currentUser.isVerified),
      recipientId: recipientId || 'all_admins',
      content: content || '',
      mediaUrl: processedMedia || '',
      createdAt: new Date().toLocaleTimeString('ar', { hour: '2-digit', minute: '2-digit' }),
      timestampMs: Date.now(),
    };

    setChatMessages((prev) => [...prev, newMsg]);
    await setDoc(doc(db, 'private_chats', msgId), newMsg);
  };

  // Firestore Mutations
  const addAnime = async (anime: Anime) => {
    let processedPoster = anime.poster;
    let processedBanner = anime.banner;
    if (anime.poster && anime.poster.startsWith('data:image')) {
      processedPoster = await compressImageDataUrl(anime.poster, 800, 0.75);
    }
    if (anime.banner && anime.banner.startsWith('data:image')) {
      processedBanner = await compressImageDataUrl(anime.banner, 1200, 0.75);
    }

    const finalAnime = { ...anime, poster: processedPoster, banner: processedBanner };
    setAnimeList((prev) => [finalAnime, ...prev]);
    await setDoc(doc(db, 'anime', finalAnime.id), finalAnime);
  };

  const updateAnime = async (updated: Anime) => {
    let processedPoster = updated.poster;
    let processedBanner = updated.banner;
    if (updated.poster && updated.poster.startsWith('data:image')) {
      processedPoster = await compressImageDataUrl(updated.poster, 800, 0.75);
    }
    if (updated.banner && updated.banner.startsWith('data:image')) {
      processedBanner = await compressImageDataUrl(updated.banner, 1200, 0.75);
    }

    const finalAnime = { ...updated, poster: processedPoster, banner: processedBanner };
    setAnimeList((prev) => prev.map((item) => (item.id === finalAnime.id ? finalAnime : item)));
    await setDoc(doc(db, 'anime', finalAnime.id), finalAnime);
  };

  const deleteAnime = (id: string) => {
    setAnimeList((prev) => prev.filter((item) => item.id !== id));
    deleteDoc(doc(db, 'anime', id)).catch(console.error);
  };

  const addMangaNovel = async (item: MangaNovelItem) => {
    let processedCover = item.cover;
    if (item.cover && item.cover.startsWith('data:image')) {
      processedCover = await compressImageDataUrl(item.cover, 800, 0.75);
    }
    const finalItem = { ...item, cover: processedCover };
    setMangaList((prev) => [finalItem, ...prev]);
    await setDoc(doc(db, 'manga_novels', finalItem.id), finalItem);
  };

  const updateMangaNovel = async (updated: MangaNovelItem) => {
    let processedCover = updated.cover;
    if (updated.cover && updated.cover.startsWith('data:image')) {
      processedCover = await compressImageDataUrl(updated.cover, 800, 0.75);
    }
    const finalItem = { ...updated, cover: processedCover };
    setMangaList((prev) => prev.map((i) => (i.id === finalItem.id ? finalItem : i)));
    await setDoc(doc(db, 'manga_novels', finalItem.id), finalItem);
  };

  const deleteMangaNovel = (id: string) => {
    setMangaList((prev) => prev.filter((i) => i.id !== id));
    deleteDoc(doc(db, 'manga_novels', id)).catch(console.error);
  };

  const addEpisode = (ep: Episode) => {
    setEpisodes((prev) => [ep, ...prev]);
    setDoc(doc(db, 'episodes', ep.id), ep).catch(console.error);
  };

  const updateEpisode = (updated: Episode) => {
    setEpisodes((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setDoc(doc(db, 'episodes', updated.id), updated).catch(console.error);
  };

  const deleteEpisode = (id: string) => {
    setEpisodes((prev) => prev.filter((item) => item.id !== id));
    deleteDoc(doc(db, 'episodes', id)).catch(console.error);
  };

  const addNews = async (news: NewsArticle) => {
    let processedCover = news.coverImage;
    if (news.coverImage && news.coverImage.startsWith('data:image')) {
      processedCover = await compressImageDataUrl(news.coverImage, 1000, 0.75);
    }
    const finalNews = { ...news, coverImage: processedCover };
    setNewsList((prev) => [finalNews, ...prev]);
    await setDoc(doc(db, 'news', finalNews.id), finalNews);
  };

  const updateNews = async (updated: NewsArticle) => {
    let processedCover = updated.coverImage;
    if (updated.coverImage && updated.coverImage.startsWith('data:image')) {
      processedCover = await compressImageDataUrl(updated.coverImage, 1000, 0.75);
    }
    const finalNews = { ...updated, coverImage: processedCover };
    setNewsList((prev) => prev.map((item) => (item.id === finalNews.id ? finalNews : item)));
    await setDoc(doc(db, 'news', finalNews.id), finalNews);
  };

  const deleteNews = (id: string) => {
    setNewsList((prev) => prev.filter((item) => item.id !== id));
    deleteDoc(doc(db, 'news', id)).catch(console.error);
  };

  const addCharacter = async (char: Character) => {
    let processedPortrait = char.portrait;
    if (char.portrait && char.portrait.startsWith('data:image')) {
      processedPortrait = await compressImageDataUrl(char.portrait, 600, 0.75);
    }
    const finalChar = { ...char, portrait: processedPortrait };
    setCharacters((prev) => [finalChar, ...prev]);
    await setDoc(doc(db, 'characters', finalChar.id), finalChar);
  };

  const updateCharacter = async (updated: Character) => {
    let processedPortrait = updated.portrait;
    if (updated.portrait && updated.portrait.startsWith('data:image')) {
      processedPortrait = await compressImageDataUrl(updated.portrait, 600, 0.75);
    }
    const finalChar = { ...updated, portrait: processedPortrait };
    setCharacters((prev) => prev.map((item) => (item.id === finalChar.id ? finalChar : item)));
    await setDoc(doc(db, 'characters', finalChar.id), finalChar);
  };

  const deleteCharacter = (id: string) => {
    setCharacters((prev) => prev.filter((item) => item.id !== id));
    deleteDoc(doc(db, 'characters', id)).catch(console.error);
  };

  const addGalleryItem = (item: GalleryItem) => {
    setGallery((prev) => [item, ...prev]);
    setDoc(doc(db, 'gallery', item.id), item).catch(console.error);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((item) => item.id !== id));
    deleteDoc(doc(db, 'gallery', id)).catch(console.error);
  };

  const addComment = (
    targetType: 'episode' | 'news' | 'gallery' | 'anime' | 'character',
    targetId: string,
    content: string
  ) => {
    const newComment: CommentItem = {
      id: `cmt-${Date.now()}`,
      targetType,
      targetId,
      userId: currentUser ? currentUser.id : 'guest-user',
      userName: currentUser ? currentUser.username : 'DMX Fan',
      userAvatar: currentUser
        ? currentUser.avatar
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      userRole: currentUser ? currentUser.role : 'User',
      content,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      upvotes: 1,
    };
    setComments((prev) => [newComment, ...prev]);
    setDoc(doc(db, 'comments', newComment.id), newComment).catch(console.error);
  };

  const upvoteComment = (id: string) => {
    const existing = comments.find((c) => c.id === id);
    if (!existing) return;
    const updated = {
      ...existing,
      upvotes: existing.upvotes + (existing.isUpvoted ? -1 : 1),
      isUpvoted: !existing.isUpvoted,
    };
    setComments((prev) => prev.map((c) => (c.id === id ? updated : c)));
    setDoc(doc(db, 'comments', id), updated).catch(console.error);
  };

  const deleteComment = (id: string) => {
    setComments((prev) => prev.filter((c) => c.id !== id));
    deleteDoc(doc(db, 'comments', id)).catch(console.error);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    const target = notifications.find((n) => n.id === id);
    if (target) {
      setDoc(doc(db, 'notifications', id), { ...target, read: true }).catch(console.error);
    }
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    notifications.forEach((n) => {
      setDoc(doc(db, 'notifications', n.id), { ...n, read: true }).catch(console.error);
    });
  };

  // Community Post Handlers
  const addPost = async (content: string, mediaUrl?: string) => {
    let processedMedia = mediaUrl;
    if (mediaUrl && mediaUrl.startsWith('data:image')) {
      processedMedia = await compressImageDataUrl(mediaUrl, 900, 0.75);
    }

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      userId: currentUser ? currentUser.id : 'usr-guest',
      userName: currentUser ? currentUser.username : 'DMX Fan',
      userAvatar: currentUser
        ? currentUser.avatar
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      userRole: currentUser ? currentUser.role : 'User',
      content,
      mediaUrl: processedMedia || '',
      likes: 0,
      likedBy: [],
      reactions: { '❤️': 0, '🔥': 0, '👍': 0 },
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setPosts((prev) => [newPost, ...prev]);
    await setDoc(doc(db, 'posts', newPost.id), newPost);
  };

  const toggleLikePost = (postId: string) => {
    const userId = currentUser ? currentUser.id : 'guest-user';
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const likedBy = p.likedBy || [];
        const isLiked = likedBy.includes(userId);
        const newLikedBy = isLiked ? likedBy.filter((id) => id !== userId) : [...likedBy, userId];
        const newLikes = isLiked ? Math.max(0, p.likes - 1) : p.likes + 1;
        const updated = { ...p, likes: newLikes, likedBy: newLikedBy };
        setDoc(doc(db, 'posts', postId), updated).catch(console.error);
        return updated;
      })
    );
  };

  const addReactionToPost = (postId: string, emoji: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const reactions = { ...(p.reactions || {}) };
        reactions[emoji] = (reactions[emoji] || 0) + 1;
        const updated = { ...p, reactions };
        setDoc(doc(db, 'posts', postId), updated).catch(console.error);
        return updated;
      })
    );
  };

  const deletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
    deleteDoc(doc(db, 'posts', postId)).catch(console.error);
  };

  // Job Applications
  const submitJobApplication = async (
    data: Omit<JobApplication, 'id' | 'status' | 'createdAt' | 'encryptedPayload'>
  ): Promise<{ success: boolean; id: string }> => {
    const appId = `job-${Date.now()}`;
    const rawString = `${data.fullName}|${data.email}|${data.position}|${data.coverLetter}|${Date.now()}`;
    const encryptedPayload = btoa(unescape(encodeURIComponent(rawString)));

    const newApp: JobApplication = {
      ...data,
      id: appId,
      encryptedPayload,
      status: 'Pending',
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setJobApplications((prev) => [newApp, ...prev]);
    await setDoc(doc(db, 'jobApplications', appId), newApp);

    const notif: NotificationItem = {
      id: `notif-job-${Date.now()}`,
      title: 'طلب توظيف جديد',
      titleAr: 'طلب توظيف جديد في الاستوديو',
      message: `New job application from ${data.fullName} for ${data.position}`,
      messageAr: `تم استقبال طلب انضمام جديد من ${data.fullName} لوظيفة (${data.position}) - مشفر وبانتظار المراجعة.`,
      type: 'job_application',
      targetType: 'careers',
      targetId: appId,
      timestamp: new Date().toISOString().replace('T', ' ').slice(0, 16),
      read: false,
    };
    setNotifications((prev) => [notif, ...prev]);
    await setDoc(doc(db, 'notifications', notif.id), notif);

    return { success: true, id: appId };
  };

  const updateJobApplicationStatus = (id: string, status: JobApplication['status']) => {
    setJobApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status } : app))
    );
    const target = jobApplications.find((a) => a.id === id);
    if (target) {
      setDoc(doc(db, 'jobApplications', id), { ...target, status }).catch(console.error);
    }
  };

  const deleteJobApplication = (id: string) => {
    setJobApplications((prev) => prev.filter((a) => a.id !== id));
    deleteDoc(doc(db, 'jobApplications', id)).catch(console.error);
  };

  // Auth Actions
  const login = (usernameInput: string, passwordInput: string): { success: boolean; error?: string } => {
    const cleanUsername = usernameInput.trim();
    const cleanPassword = passwordInput.trim();

    const isOwnerUsername =
      cleanUsername.toLowerCase() === 'dmxanim' ||
      cleanUsername.toLowerCase() === 'dmxanim@dmx-studio.com' ||
      cleanUsername.toLowerCase() === 'bmxanim' ||
      cleanUsername.toLowerCase() === 'bmxanim@dmx-studio.com';

    // Check Owner Credentials specifically
    if (isOwnerUsername) {
      const ownerRecord = registeredUsers.find(
        (u) =>
          u.username.toLowerCase() === 'dmxanim' ||
          u.username.toLowerCase() === 'bmxanim' ||
          u.user.email.toLowerCase() === cleanUsername.toLowerCase()
      );

      const isValidPass =
        cleanPassword === 'dmxanim123' ||
        cleanPassword === 'bmxanim123' ||
        (ownerRecord && ownerRecord.password === cleanPassword);

      if (isValidPass) {
        const ownerUser: User = ownerRecord
          ? { ...ownerRecord.user, role: 'Owner', isVerified: true }
          : {
              id: 'usr-owner-dmxanim',
              username: 'dmxanim',
              email: 'dmxanim@dmx-studio.com',
              role: 'Owner' as const,
              isVerified: true,
              avatar: '/src/assets/images/dmx_studio_logo_1785673442803.jpg',
              favorites: ['painter-of-death', 'cyber-blade-zero'],
              watchHistory: [],
              createdAt: '2026-01-01',
            };

        const updatedRec = {
          username: ownerUser.username,
          password: cleanPassword,
          user: ownerUser,
        };

        setDoc(doc(db, 'registeredUsers', ownerUser.username.toLowerCase()), updatedRec).catch(console.error);
        setCurrentUser(ownerUser);
        setIsAuthModalOpen(false);
        return { success: true };
      } else {
        return {
          success: false,
          error: language === 'ar' ? 'كلمة المرور غير صحيحة لحساب المالك (dmxanim)' : 'Incorrect password for Owner account (dmxanim)',
        };
      }
    }

    // Check general registered users
    const record = registeredUsers.find(
      (u) => u.username.toLowerCase() === cleanUsername.toLowerCase() || u.user.email.toLowerCase() === cleanUsername.toLowerCase()
    );

    if (record) {
      if (record.password === cleanPassword) {
        let loggedUser = record.user;
        if (cleanUsername.toLowerCase() === 'dmxanim' || cleanUsername.toLowerCase() === 'bmxanim') {
          loggedUser = { ...loggedUser, role: 'Owner', isVerified: true };
          const updatedRec = { ...record, user: loggedUser };
          setDoc(doc(db, 'registeredUsers', cleanUsername.toLowerCase()), updatedRec).catch(console.error);
        }
        setCurrentUser(loggedUser);
        setIsAuthModalOpen(false);
        return { success: true };
      } else {
        return {
          success: false,
          error: language === 'ar' ? 'كلمة المرور غير صحيحة' : 'Incorrect password',
        };
      }
    }

    // Auto-register as standard user if unknown (or Owner if username is dmxanim)
    const isTargetOwner = cleanUsername.toLowerCase() === 'dmxanim' || cleanUsername.toLowerCase() === 'bmxanim';
    const newUser: User = {
      id: isTargetOwner ? 'usr-owner-dmxanim' : `usr-${Date.now()}`,
      username: cleanUsername,
      email: `${cleanUsername}@dmx-studio.com`,
      role: isTargetOwner ? ('Owner' as const) : ('User' as const),
      isVerified: isTargetOwner,
      avatar: isTargetOwner
        ? '/src/assets/images/dmx_studio_logo_1785673442803.jpg'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      favorites: [],
      watchHistory: [],
      createdAt: new Date().toISOString().slice(0, 10),
    };

    const userObj = { username: cleanUsername, password: cleanPassword, user: newUser };
    setRegisteredUsers((prev) => [...prev, userObj]);
    setDoc(doc(db, 'registeredUsers', cleanUsername.toLowerCase()), userObj).catch(console.error);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const register = (usernameInput: string, passwordInput: string): { success: boolean; error?: string } => {
    const cleanUsername = usernameInput.trim();
    const cleanPassword = passwordInput.trim();

    if (!cleanUsername || !cleanPassword) {
      return {
        success: false,
        error: language === 'ar' ? 'يرجى إدخال اسم المستخدم وكلمة المرور' : 'Please enter username and password',
      };
    }

    const existing = registeredUsers.find((u) => u.username.toLowerCase() === cleanUsername.toLowerCase());
    if (existing) {
      return {
        success: false,
        error: language === 'ar' ? 'اسم المستخدم مستخدم بالفعل، يرجى تسجيل الدخول' : 'Username already exists, please log in',
      };
    }

    const isTargetOwner = cleanUsername.toLowerCase() === 'dmxanim' || cleanUsername.toLowerCase() === 'bmxanim';
    const newUser: User = {
      id: isTargetOwner ? 'usr-owner-dmxanim' : `usr-${Date.now()}`,
      username: cleanUsername,
      email: `${cleanUsername}@dmx-studio.com`,
      role: isTargetOwner ? ('Owner' as const) : ('User' as const),
      isVerified: isTargetOwner,
      avatar: isTargetOwner
        ? '/src/assets/images/dmx_studio_logo_1785673442803.jpg'
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      favorites: [],
      watchHistory: [],
      createdAt: new Date().toISOString().slice(0, 10),
    };

    const userObj = { username: cleanUsername, password: cleanPassword, user: newUser };
    setRegisteredUsers((prev) => [...prev, userObj]);
    setDoc(doc(db, 'registeredUsers', cleanUsername.toLowerCase()), userObj).catch(console.error);
    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(defaultUser);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
  };

  const updateProfile = async (data: Partial<User>) => {
    if (!currentUser) return;

    let processedData = { ...data };
    if (processedData.avatar && processedData.avatar.startsWith('data:image')) {
      try {
        processedData.avatar = await compressImageDataUrl(processedData.avatar, 300, 0.8);
      } catch (err) {
        console.warn('Avatar compression fallback:', err);
      }
    }

    const updated = { ...currentUser, ...processedData };
    setCurrentUser(updated);

    const userKey = currentUser.username.toLowerCase();
    const rec = registeredUsers.find((u) => u.username.toLowerCase() === userKey);
    const updatedRec = rec
      ? { ...rec, user: updated }
      : { username: currentUser.username, password: '***', user: updated };

    setDoc(doc(db, 'registeredUsers', userKey), updatedRec).catch(console.error);

    // Sync updated avatar/name across user's existing posts
    posts.filter((p) => p.userId === currentUser.id || p.userName === currentUser.username).forEach((p) => {
      if (p.userAvatar !== updated.avatar) {
        setDoc(doc(db, 'posts', p.id), { ...p, userAvatar: updated.avatar }, { merge: true }).catch(console.error);
      }
    });
  };

  const toggleFavorite = (animeId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    const isFav = currentUser.favorites.includes(animeId);
    const newFavs = isFav
      ? currentUser.favorites.filter((id) => id !== animeId)
      : [...currentUser.favorites, animeId];
    updateProfile({ favorites: newFavs });
  };

  const saveWatchProgress = (episodeId: string, animeId: string, timestamp: number, duration: number) => {
    if (!currentUser) return;
    const existing = currentUser.watchHistory.filter((item) => item.episodeId !== episodeId);
    const updatedHistory = [
      {
        episodeId,
        animeId,
        timestamp,
        duration,
        lastWatchedAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      },
      ...existing,
    ];
    updateProfile({ watchHistory: updatedHistory });
  };

  // Theme Actions
  const applyTheme = (theme: WebsiteTheme) => {
    setActiveTheme(theme);
  };

  const applyPresetTheme = (presetId: string) => {
    const preset = presetThemes.find((p) => p.id === presetId);
    if (preset) setActiveTheme(preset);
  };

  const updateActiveThemeField = <K extends keyof WebsiteTheme>(field: K, value: WebsiteTheme[K]) => {
    const updated = { ...activeTheme, [field]: value };
    setActiveTheme(updated);
  };

  const saveActiveThemeToFirestore = async () => {
    localStorage.setItem(LOCAL_STORAGE_THEME_KEY, JSON.stringify(activeTheme));
    await setDoc(doc(db, 'theme', 'activeTheme'), activeTheme);
  };

  const exportBackupJSON = () => {
    const state = {
      theme: activeTheme,
      animeList,
      episodes,
      newsList,
      characters,
      gallery,
      comments,
      notifications,
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(state, null, 2);
  };

  const importBackupJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.animeList) {
        parsed.animeList.forEach((item: Anime) => addAnime(item));
      }
      if (parsed.episodes) {
        parsed.episodes.forEach((item: Episode) => addEpisode(item));
      }
      if (parsed.newsList) {
        parsed.newsList.forEach((item: NewsArticle) => addNews(item));
      }
      if (parsed.characters) {
        parsed.characters.forEach((item: Character) => addCharacter(item));
      }
      if (parsed.gallery) {
        parsed.gallery.forEach((item: GalleryItem) => addGalleryItem(item));
      }
      if (parsed.theme) setActiveTheme(parsed.theme);
      return true;
    } catch (e) {
      console.error('Failed to parse backup JSON:', e);
      return false;
    }
  };

  // Battle Arena Actions
  const createBattleRoom = async (name: string, character: BattleCharacter): Promise<string> => {
    if (battleRooms.length >= 10) {
      throw new Error(language === 'ar' ? 'تم الوصول للحد الأقصى (10 غرف نشطة)' : 'Maximum room limit reached (10 active rooms)');
    }

    const newRoomId = `room-${Date.now()}`;
    const ownerName = currentUser ? currentUser.username : 'Guest Combatant';
    const ownerId = currentUser ? currentUser.id : `guest-${Date.now()}`;

    const newRoom: TournamentRoom = {
      id: newRoomId,
      name,
      ownerId,
      ownerName,
      ownerAvatar: currentUser?.avatar,
      season: 1,
      players: [
        {
          userId: ownerId,
          userName: ownerName,
          userAvatar: currentUser?.avatar || character.image,
          character,
        },
      ],
      maxPlayers: 32,
      status: 'waiting',
      createdAt: new Date().toISOString(),
      matches: [],
    };

    await setDoc(doc(db, 'battleRooms', newRoomId), newRoom);
    setActiveRoomId(newRoomId);
    return newRoomId;
  };

  const joinBattleRoom = async (roomId: string, character: BattleCharacter): Promise<boolean> => {
    const room = battleRooms.find((r) => r.id === roomId);
    if (!room) return false;

    if (room.players.length >= 32) return false;
    if (room.status !== 'waiting') return false;

    const uId = currentUser ? currentUser.id : `guest-${Date.now()}`;
    const uName = currentUser ? currentUser.username : 'Guest Combatant';

    // Check if player already joined
    if (room.players.some((p) => p.userId === uId)) {
      return true;
    }

    const updatedPlayers = [
      ...room.players,
      {
        userId: uId,
        userName: uName,
        userAvatar: currentUser?.avatar || character.image,
        character,
      },
    ];

    const updatedRoom: TournamentRoom = {
      ...room,
      players: updatedPlayers,
    };

    await setDoc(doc(db, 'battleRooms', roomId), updatedRoom);
    return true;
  };

  const startTournament = async (roomId: string): Promise<void> => {
    const room = battleRooms.find((r) => r.id === roomId);
    if (!room) return;

    if (room.players.length < 16) {
      throw new Error(
        language === 'ar'
          ? 'الحد الأدنى لبدء البطولة هو 16 لاعباً'
          : 'Minimum 16 players required to start tournament'
      );
    }

    // Fill remaining slots with AI if players < 32
    let allParticipants = [...room.players];
    const slotsNeeded = 32 - allParticipants.length;

    if (slotsNeeded > 0) {
      const bots = generateAIBotCompetitors(slotsNeeded);
      bots.forEach((bot) => {
        allParticipants.push({
          userId: bot.userId,
          userName: bot.userName,
          userAvatar: bot.image,
          character: bot,
        });
      });
    }

    // Generate complete 32-player World Cup tournament matches
    const allCharacters = allParticipants.map((p) => p.character);
    const bracketMatches = generateFullTournamentBracket(allCharacters);

    // Grand Final Match is last match in array
    const grandFinalMatch = bracketMatches[bracketMatches.length - 1];
    const champChar = grandFinalMatch.winnerId === grandFinalMatch.p1.userId ? grandFinalMatch.p1 : grandFinalMatch.p2;

    const champParticipant = allParticipants.find((p) => p.character.id === champChar.id || p.userId === champChar.userId);

    const championData = {
      userId: champParticipant?.userId || champChar.userId,
      userName: champParticipant?.userName || champChar.userName,
      characterName: champChar.name,
      characterImage: champChar.image,
      rewardBadge: '🏆 DMX Season 1 Champion',
    };

    const updatedRoom: TournamentRoom = {
      ...room,
      players: allParticipants,
      status: 'finished',
      currentRoundName: 'Champion Ceremony',
      matches: bracketMatches,
      champion: championData,
    };

    await setDoc(doc(db, 'battleRooms', roomId), updatedRoom);

    // Update Leaderboard Points for champion
    if (champParticipant && !champChar.isAI) {
      const existingProfile = arenaLeaderboard.find((p) => p.userId === champParticipant.userId);
      const updatedProfile: ArenaPlayerProfile = {
        userId: champParticipant.userId,
        userName: champParticipant.userName,
        userAvatar: champParticipant.userAvatar,
        ratingPoints: (existingProfile?.ratingPoints || 1000) + 120,
        wins: (existingProfile?.wins || 0) + 5,
        losses: existingProfile?.losses || 0,
        winRate: Math.round(
          (((existingProfile?.wins || 0) + 5) / ((existingProfile?.wins || 0) + 5 + (existingProfile?.losses || 0))) * 100
        ),
        championships: (existingProfile?.championships || 0) + 1,
        badges: Array.from(new Set([...(existingProfile?.badges || []), '🏆 DMX Season 1 Champion'])),
        titles: Array.from(new Set([...(existingProfile?.titles || []), 'Grand Champion'])),
        favoriteCharacterName: champChar.name,
        favoriteCharacterImage: champChar.image,
        highestRank: '#1 Grandmaster',
        lastUpdated: new Date().toISOString(),
      };
      await setDoc(doc(db, 'arenaLeaderboard', champParticipant.userId), updatedProfile);
    }
  };

  const saveUserBattleCharacter = async (character: BattleCharacter): Promise<void> => {
    setUserBattleCharacters((prev) => [character, ...prev]);
    if (currentUser) {
      await setDoc(doc(db, 'battleCharacters', character.id), character);
    }
  };

  return (
    <StudioContext.Provider
      value={{
        language,
        direction,
        setLanguage,
        t,
        activeView,
        setActiveView,
        selectedAnimeId,
        setSelectedAnimeId,
        selectedEpisodeId,
        setSelectedEpisodeId,
        selectedArticleId,
        setSelectedArticleId,
        selectedCharacterId,
        setSelectedCharacterId,
        selectedMangaId,
        setSelectedMangaId,

        mangaList,
        animeList,
        episodes,
        newsList,
        characters,
        gallery,
        productionUpdates,
        notifications,
        comments,
        jobApplications,
        posts,
        usersList,
        chatMessages,

        battleRooms,
        arenaLeaderboard,
        userBattleCharacters,
        activeRoomId,
        setActiveRoomId,
        createBattleRoom,
        joinBattleRoom,
        startTournament,
        saveUserBattleCharacter,

        addAnime,
        updateAnime,
        deleteAnime,
        addMangaNovel,
        updateMangaNovel,
        deleteMangaNovel,
        addEpisode,
        updateEpisode,
        deleteEpisode,
        addNews,
        updateNews,
        deleteNews,
        addCharacter,
        updateCharacter,
        deleteCharacter,
        addGalleryItem,
        deleteGalleryItem,
        addComment,
        upvoteComment,
        deleteComment,
        markNotificationAsRead,
        markAllNotificationsRead,

        addPost,
        toggleLikePost,
        addReactionToPost,
        deletePost,

        sendChatMessage,
        isChatModalOpen,
        setIsChatModalOpen,
        chatRecipientUser,
        setChatRecipientUser,

        updateUserRole,
        toggleUserVerification,

        submitJobApplication,
        updateJobApplicationStatus,
        deleteJobApplication,

        currentUser,
        login,
        register,
        logout,
        updateProfile,
        toggleFavorite,
        saveWatchProgress,

        activeTheme,
        presetThemesList: presetThemes,
        applyTheme,
        applyPresetTheme,
        updateActiveThemeField,
        saveActiveThemeToFirestore,
        toggleTheme,
        exportBackupJSON,
        importBackupJSON,

        isSearchOpen,
        setIsSearchOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalMode,
        setAuthModalMode,
      }}
    >
      {children}
    </StudioContext.Provider>
  );
};

export const useStudio = () => {
  const context = useContext(StudioContext);
  if (!context) {
    throw new Error('useStudio must be used within a StudioProvider');
  }
  return context;
};
