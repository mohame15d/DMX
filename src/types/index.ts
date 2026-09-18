export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

export type UserRole = 'Owner' | 'Admin' | 'Publisher' | 'Moderator' | 'User';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  avatar: string;
  isBanned?: boolean;
  isVerified?: boolean;
  favorites: string[]; // anime IDs
  watchHistory: {
    episodeId: string;
    animeId: string;
    timestamp: number; // in seconds
    duration: number;
    lastWatchedAt: string;
  }[];
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  senderRole: UserRole;
  senderVerified?: boolean;
  recipientId: string; // 'all_admins' or user ID
  recipientName?: string;
  content: string;
  mediaUrl?: string;
  createdAt: string;
  timestampMs: number; // Date.now() for 9-hour auto deletion filtering
}

export type AnimeStatus = 'In Production' | 'Airing' | 'Completed' | 'Upcoming';

export interface Anime {
  id: string;
  title: string;
  titleAr: string;
  japaneseTitle: string;
  synopsis: string;
  synopsisAr: string;
  poster: string;
  banner: string;
  status: AnimeStatus;
  statusAr: string;
  firstTrailer: string; // e.g. "Trailer #1 (Episode 27 Teaser)" or "27"
  officialRelease: string; // e.g. "2027"
  releaseDate?: string; // ISO date string or YYYY-MM-DDTHH:mm for live countdown
  genres: string[];
  genresAr: string[];
  studio: string;
  trailerUrl: string;
  rating: number; // e.g. 9.8
  episodesCount: number;
}

export interface SubtitleTrack {
  lang: string;
  label: string;
  src: string;
}

export interface AudioTrack {
  lang: string;
  label: string;
}

export interface Episode {
  id: string;
  animeId: string;
  episodeNumber: number;
  title: string;
  titleAr: string;
  thumbnail: string;
  duration: string; // e.g. "24:15"
  releaseDate: string;
  videoUrl: string;
  synopsis: string;
  synopsisAr: string;
  subtitles: SubtitleTrack[];
  audioTracks: AudioTrack[];
  views: number;
}

export type NewsCategory = 
  | 'Studio News'
  | 'Production Updates'
  | 'Announcements'
  | 'Trailers'
  | 'Episode Releases'
  | 'Community';

export interface NewsArticle {
  id: string;
  title: string;
  titleAr: string;
  category: NewsCategory;
  categoryAr: string;
  coverImage: string;
  publishDate: string;
  author: string;
  authorAvatar: string;
  tags: string[];
  content: string;
  contentAr: string;
  views: number;
  isPinned?: boolean;
}

export interface Character {
  id: string;
  animeId: string;
  name: string;
  nameAr: string;
  kanjiName: string;
  age: string;
  role: string;
  roleAr: string;
  biography: string;
  biographyAr: string;
  abilities: { name: string; nameAr: string; powerLevel: number; description: string }[];
  portrait: string;
  gallery: string[];
  voiceActor: { name: string; nameAr: string; image?: string };
}

export type GalleryCategory = 'Posters' | 'Wallpapers' | 'Screenshots' | 'Concept Art' | 'Promotional Images';

export interface GalleryItem {
  id: string;
  title: string;
  titleAr: string;
  category: GalleryCategory;
  categoryAr: string;
  imageUrl: string;
  animeId?: string;
  createdAt: string;
  downloads: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  type: 'trailer' | 'episode' | 'news' | 'announcement' | 'system' | 'job_application';
  targetType?: 'anime' | 'episode' | 'news' | 'announcement' | 'careers';
  targetId?: string;
  timestamp: string;
  read: boolean;
}

export interface CommentItem {
  id: string;
  targetType: 'episode' | 'news' | 'gallery' | 'anime' | 'character';
  targetId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: UserRole;
  content: string;
  createdAt: string;
  upvotes: number;
  isUpvoted?: boolean;
}

export interface ProductionUpdate {
  id: string;
  animeId: string;
  title: string;
  titleAr: string;
  stage: string; // e.g. "Key Animation", "Sound Design", "Scripting"
  progressPercentage: number;
  date: string;
  description: string;
  descriptionAr: string;
}

export interface JobApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experienceYears: string;
  portfolioUrl: string;
  coverLetter: string;
  encryptedPayload: string;
  status: 'Pending' | 'Under Review' | 'Accepted' | 'Rejected';
  createdAt: string;
}

export interface WebsiteTheme {
  id: string;
  name: string;
  nameAr: string;
  primaryColor: string; // hex or tailwind class
  accentColor: string;
  bgBase: string; // e.g. '#090a0f'
  cardBg: string; // e.g. 'rgba(18, 20, 29, 0.7)'
  textPrimary: string;
  textSecondary: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  glassOpacity: number; // 0 to 1
  fontFamily: string;
  customBackground?: string;
  customBanner?: string;
  customLogoUrl?: string;
  studioName: string;
  studioNameAr: string;
  slogan: string;
  sloganAr: string;
}

export interface StudioSettings {
  activeThemeId: string;
  customThemes: WebsiteTheme[];
  scheduledSeasonalTheme?: string;
  maintenanceMode: boolean;
  announcementBanner?: {
    enabled: boolean;
    text: string;
    textAr: string;
    link?: string;
  };
}

export interface CommunityPost {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  userRole: UserRole;
  content: string;
  mediaUrl?: string;
  likes: number;
  likedBy?: string[];
  reactions?: Record<string, number>;
  createdAt: string;
}

export type ActiveView =
  | 'home'
  | 'feed'
  | 'anime-list'
  | 'anime-detail'
  | 'episode-player'
  | 'news-list'
  | 'article-detail'
  | 'character-list'
  | 'character-detail'
  | 'gallery'
  | 'about'
  | 'contact'
  | 'profile'
  | 'admin'
  | 'careers'
  | 'manga-novels';

export interface MangaChapter {
  id: string;
  mangaId: string;
  chapterNumber: number;
  title: string;
  titleAr: string;
  releaseDate: string;
  views: number;
  pages?: string[]; // for manga image reader
  novelContent?: string; // for light novel reader
  novelContentAr?: string;
}

export interface MangaNovelItem {
  id: string;
  type: 'manga' | 'light_novel';
  title: string;
  titleAr: string;
  japaneseTitle: string;
  author: string;
  artist: string;
  synopsis: string;
  synopsisAr: string;
  cover: string;
  banner: string;
  status: 'Ongoing' | 'Completed' | 'Hiatus';
  statusAr: string;
  rating: number;
  genres: string[];
  genresAr: string[];
  chaptersCount: number;
  volumesCount: number;
  latestChapter: string;
  chapters: MangaChapter[];
}

export interface CharacterStats {
  attack: number;
  defense: number;
  speed: number;
  intelligence: number;
  endurance: number;
  agility: number;
  magicPower: number;
  energy: number;
  battleExperience: number;
  tacticalAbility: number;
  reactionSpeed: number;
}

export type AnimeCardRarity = 'Common' | 'Rare' | 'SR' | 'SSR' | 'UR' | 'Mythic';

export interface AnimeCard {
  id: string;
  characterName: string;
  characterNameAr: string;
  animeSeries: string;
  animeSeriesAr: string;
  image: string;
  rarity: AnimeCardRarity;
  attackPower: number;
  defensePower: number;
  speed: number;
  hp: number;
  specialMove: string;
  specialMoveAr: string;
  element: 'Fire' | 'Lightning' | 'Dark' | 'Cosmic' | 'Wind' | 'Water' | 'Holy';
  elementAr: string;
  description: string;
  descriptionAr: string;
  bgGlow: string;
  borderColor: string;
}

export interface AnimeCardPack {
  id: string;
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  priceCoins: number;
  packImage: string;
  badge: string;
  guaranteedRarity: AnimeCardRarity;
  bgGradient: string;
}

export interface BattleCharacter {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  name: string;
  nameAr?: string;
  image: string;
  description: string;
  fightingStyle: string;
  specialAbility: string;
  weapon?: string;
  isAI?: boolean;
  stats: CharacterStats;
  totalCombatRating: number;
  battleProfile: {
    strengths: string[];
    weaknesses: string[];
    summary: string;
    aiBalanceNotes?: string;
  };
  createdAt?: string;
}

export interface BattleMatch {
  id: string;
  roundName: 'Round of 32' | 'Round of 16' | 'Quarter Finals' | 'Semi Finals' | 'Grand Final';
  roundNumber: number; // 1 to 5
  matchIndex: number;
  p1: BattleCharacter;
  p2: BattleCharacter;
  winnerId?: string;
  loserId?: string;
  winningProbabilityP1: number; // e.g. 62 (%)
  battleSummary: string;
  keyAbilitiesUsed: string[];
  reasonForVictory: string;
  damageStats: {
    p1DamageDealt: number;
    p2DamageDealt: number;
    durationSeconds: number;
    totalHits: number;
  };
  aiCommentary: string;
  status: 'pending' | 'simulating' | 'finished';
  timestampMs?: number;
}

export interface TournamentRoom {
  id: string;
  name: string;
  nameAr?: string;
  ownerId: string;
  ownerName: string;
  ownerAvatar?: string;
  season: number;
  players: {
    userId: string;
    userName: string;
    userAvatar: string;
    character: BattleCharacter;
  }[];
  maxPlayers: number; // default 32
  status: 'waiting' | 'filling_ai' | 'running' | 'finished';
  currentRoundName?: string;
  currentRoundNumber?: number;
  createdAt: string;
  matches: BattleMatch[];
  champion?: {
    userId: string;
    userName: string;
    characterName: string;
    characterImage: string;
    rewardBadge: string;
  };
}

export interface ArenaPlayerProfile {
  userId: string;
  userName: string;
  userAvatar: string;
  ratingPoints: number;
  wins: number;
  losses: number;
  winRate: number;
  championships: number;
  badges: string[];
  titles: string[];
  favoriteCharacterName?: string;
  favoriteCharacterImage?: string;
  highestRank: string;
  lastUpdated?: string;
}
