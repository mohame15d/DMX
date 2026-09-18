import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { User as UserIcon, Lock, X, LogOut, Heart, Clock, Play, Camera } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    language,
    activeTheme,
    isAuthModalOpen,
    setIsAuthModalOpen,
    authModalMode,
    setAuthModalMode,
    login,
    register,
  } = useStudio();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg(language === 'ar' ? 'يرجى كتابة اسم المستخدم وكلمة المرور' : 'Please enter username and password');
      return;
    }

    if (authModalMode === 'login') {
      const res = login(username, password);
      if (!res.success && res.error) {
        setErrorMsg(res.error);
      }
    } else {
      const res = register(username, password);
      if (!res.success && res.error) {
        setErrorMsg(res.error);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
      <div
        className="max-w-md w-full rounded-3xl border shadow-2xl p-6 sm:p-8 relative space-y-6"
        style={{
          backgroundColor: activeTheme.cardBg,
          borderColor: `${activeTheme.primaryColor}50`,
        }}
      >
        <button
          onClick={() => {
            setErrorMsg('');
            setIsAuthModalOpen(false);
          }}
          className="absolute top-4 right-4 rtl:left-4 rtl:right-auto p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center space-y-2">
          <div
            className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center text-xl font-black shadow-lg"
            style={{ backgroundColor: activeTheme.primaryColor, color: '#000' }}
          >
            DMX
          </div>
          <h2 className="text-2xl font-black tracking-tight" style={{ color: activeTheme.textPrimary }}>
            {authModalMode === 'login'
              ? language === 'ar'
                ? 'تسجيل الدخول إلى DMX™'
                : 'DMX Studio Portal Login'
              : language === 'ar'
              ? 'إنشاء حساب جديد'
              : 'Create DMX™ Account'}
          </h2>
          <p className="text-xs text-gray-400">
            {language === 'ar'
              ? 'أدخل اسم المستخدم وكلمة المرور للدخول'
              : 'Enter Username and Password to Sign In'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-bold text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              {language === 'ar' ? 'اسم المستخدم (Username)' : 'Username'}
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 text-yellow-500 absolute left-3 rtl:right-3 rtl:left-auto top-3" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل اسم المستخدم' : 'Enter username'}
                className="w-full pl-9 rtl:pr-9 rtl:pl-4 py-2.5 rounded-xl border bg-white/5 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                style={{ borderColor: `${activeTheme.primaryColor}30`, color: activeTheme.textPrimary }}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              {language === 'ar' ? 'كلمة المرور (Password)' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-yellow-500 absolute left-3 rtl:right-3 rtl:left-auto top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 rtl:pr-9 rtl:pl-4 py-2.5 rounded-xl border bg-white/5 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                style={{ borderColor: `${activeTheme.primaryColor}30`, color: activeTheme.textPrimary }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-extrabold text-sm shadow-xl hover:scale-[1.02] active:scale-95 transition-all mt-2 cursor-pointer"
            style={{ backgroundColor: activeTheme.primaryColor, color: '#000' }}
          >
            {authModalMode === 'login'
              ? language === 'ar'
                ? 'تسجيل الدخول'
                : 'Sign In to Account'
              : language === 'ar'
              ? 'إنشاء الحساب'
              : 'Register Account'}
          </button>
        </form>

        <div className="text-center text-xs text-gray-400 pt-2 border-t border-white/10">
          {authModalMode === 'login' ? (
            <span>
              {language === 'ar' ? 'ليس لديك حساب؟ ' : "Don't have an account? "}
              <button
                onClick={() => {
                  setErrorMsg('');
                  setAuthModalMode('register');
                }}
                className="text-yellow-400 font-bold hover:underline cursor-pointer"
              >
                {language === 'ar' ? 'سجل الآن' : 'Sign Up Here'}
              </button>
            </span>
          ) : (
            <span>
              {language === 'ar' ? 'لديك حساب بالفعل؟ ' : 'Already have an account? '}
              <button
                onClick={() => {
                  setErrorMsg('');
                  setAuthModalMode('login');
                }}
                className="text-yellow-400 font-bold hover:underline cursor-pointer"
              >
                {language === 'ar' ? 'تسجيل الدخول' : 'Log In'}
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export const UserProfileView: React.FC = () => {
  const {
    t,
    language,
    activeTheme,
    currentUser,
    updateProfile,
    logout,
    animeList,
    episodes,
    setSelectedAnimeId,
    setSelectedEpisodeId,
    setActiveView,
  } = useStudio();

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <p className="text-sm text-gray-400">Please log in to view your profile and favorites.</p>
      </div>
    );
  }

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (typeof reader.result === 'string') {
          await updateProfile({ avatar: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const favoriteAnimeList = animeList.filter((a) => currentUser.favorites.includes(a.id));

  const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Profile Header */}
      <div
        className="p-6 sm:p-8 rounded-3xl border backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl"
        style={{
          backgroundColor: activeTheme.cardBg,
          borderColor: `${activeTheme.primaryColor}40`,
        }}
      >
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left rtl:sm:text-right">
          <div className="relative group">
            <img
              src={currentUser.avatar || DEFAULT_AVATAR}
              alt={currentUser.username}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-2 shadow-2xl transition-transform group-hover:scale-105"
              style={{ borderColor: activeTheme.primaryColor }}
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
              }}
            />
            {/* Device Image Upload Button */}
            <label className="absolute bottom-0 right-0 rtl:left-0 rtl:right-auto p-2 rounded-xl bg-yellow-500 text-black shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <Camera className="w-4 h-4" />
              <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </label>
          </div>

          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-2xl sm:text-3xl font-black" style={{ color: activeTheme.textPrimary }}>
                {currentUser.username}
              </h1>
              <span
                className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border"
                style={{
                  backgroundColor: `${activeTheme.primaryColor}20`,
                  color: activeTheme.primaryColor,
                  borderColor: `${activeTheme.primaryColor}50`,
                }}
              >
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono mt-1">{currentUser.email}</p>

            <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <label className="px-3 py-1.5 rounded-xl border border-yellow-500/40 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 text-xs font-bold cursor-pointer transition-colors flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5" />
                <span>
                  {language === 'ar' ? 'تغيير الصورة الشخصية من الجهاز' : 'Upload Avatar from Device'}
                </span>
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
              </label>
            </div>

            <p className="text-[11px] text-gray-500 mt-2">{t('memberSince')} {currentUser.createdAt}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="px-5 py-2.5 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('logout')}</span>
        </button>
      </div>

      {/* Favorites Catalog */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: activeTheme.textPrimary }}>
          <Heart className="w-6 h-6 text-red-500 fill-red-500" />
          <span>{t('favorites')} ({favoriteAnimeList.length})</span>
        </h2>

        {favoriteAnimeList.length === 0 ? (
          <p className="text-xs text-gray-400 py-6">You haven't added any anime to your favorites yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favoriteAnimeList.map((a) => (
              <div
                key={a.id}
                onClick={() => {
                  setSelectedAnimeId(a.id);
                  setActiveView('anime-detail');
                }}
                className="p-4 rounded-xl border bg-white/5 hover:border-yellow-500/40 cursor-pointer flex items-center gap-4 group transition-all"
              >
                <img src={a.poster} alt={a.title} className="w-14 h-20 object-cover rounded-lg" referrerPolicy="no-referrer" />
                <div>
                  <h4 className="font-bold text-sm group-hover:text-yellow-400 transition-colors">
                    {language === 'ar' ? a.titleAr : a.title}
                  </h4>
                  <span className="text-xs text-gray-400 font-mono">{a.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Watch History */}
      <div className="space-y-4">
        <h2 className="text-2xl font-black flex items-center gap-2" style={{ color: activeTheme.textPrimary }}>
          <Clock className="w-6 h-6 text-yellow-400" />
          <span>{t('watchHistory')}</span>
        </h2>

        {currentUser.watchHistory.length === 0 ? (
          <p className="text-xs text-gray-400 py-6">No recent streaming history.</p>
        ) : (
          <div className="space-y-2">
            {currentUser.watchHistory.map((h, i) => {
              const ep = episodes.find((e) => e.id === h.episodeId);
              return (
                <div
                  key={i}
                  onClick={() => {
                    setSelectedEpisodeId(h.episodeId);
                    setActiveView('episode-player');
                  }}
                  className="p-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 cursor-pointer flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-400 text-black flex items-center justify-center font-bold">
                      <Play className="w-4 h-4 fill-black translate-x-0.5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{ep ? (language === 'ar' ? ep.titleAr : ep.title) : h.episodeId}</h4>
                      <span className="text-[10px] text-gray-400 font-mono">Last watched: {h.lastWatchedAt}</span>
                    </div>
                  </div>
                  <span className="text-xs text-yellow-400 font-bold font-mono">Continue →</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
