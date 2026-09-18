import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { ActiveView } from '../types';
import {
  Search,
  Bell,
  User as UserIcon,
  Globe,
  ShieldCheck,
  Clapperboard,
  Tv,
  Newspaper,
  Users,
  Image as ImageIcon,
  Mail,
  Palette,
  ChevronDown,
  Sparkles,
  Menu,
  X,
  Briefcase,
  MessageSquare,
  BookOpen,
  Play,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    t,
    language,
    setLanguage,
    activeView,
    setActiveView,
    currentUser,
    setIsAuthModalOpen,
    setIsSearchOpen,
    activeTheme,
    notifications,
    markAllNotificationsRead,
    applyPresetTheme,
    presetThemesList,
    setIsChatModalOpen,
    chatMessages,
  } = useStudio();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const recentChatCount = chatMessages.length;

  const navLinks: { id: ActiveView; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: t('home'), icon: <Clapperboard className="w-4 h-4" /> },
    { id: 'feed', label: language === 'ar' ? 'منشورات المجتمع' : 'Community Feed', icon: <MessageSquare className="w-4 h-4 text-yellow-400" /> },
    { id: 'anime-list', label: t('anime'), icon: <Tv className="w-4 h-4" /> },
    { id: 'manga-novels', label: language === 'ar' ? 'المانغا والروايات' : 'Manga & Novels', icon: <BookOpen className="w-4 h-4 text-amber-400" /> },
    { id: 'news-list', label: t('news'), icon: <Newspaper className="w-4 h-4" /> },
    { id: 'character-list', label: t('characters'), icon: <Users className="w-4 h-4" /> },
    { id: 'gallery', label: t('gallery'), icon: <ImageIcon className="w-4 h-4" /> },
    { id: 'careers', label: language === 'ar' ? 'التقديم على وظيفة' : 'Careers & Jobs', icon: <Briefcase className="w-4 h-4 text-yellow-400" /> },
    { id: 'contact', label: t('contact'), icon: <Mail className="w-4 h-4" /> },
  ];

  const handleNavClick = (view: ActiveView) => {
    setActiveView(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="sticky top-0 z-40 w-full backdrop-blur-xl transition-colors duration-300 border-b overflow-x-hidden"
      style={{
        backgroundColor: activeTheme.cardBg,
        borderColor: `${activeTheme.primaryColor}25`,
      }}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Logo & Brand */}
        <div
          className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group rtl:space-x-reverse shrink min-w-0"
          onClick={() => handleNavClick('home')}
        >
          {activeTheme.customLogoUrl ? (
            <img
              src={activeTheme.customLogoUrl}
              alt="DMX Logo"
              className="w-8 h-8 sm:w-10 sm:h-10 object-contain rounded-lg border border-yellow-500/40 shadow-lg group-hover:scale-105 transition-transform shrink-0"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center font-black text-sm sm:text-xl tracking-tighter shadow-lg relative overflow-hidden transition-all duration-300 group-hover:shadow-yellow-500/20 shrink-0"
              style={{
                background: `linear-gradient(135deg, ${activeTheme.primaryColor}, ${activeTheme.accentColor})`,
                color: '#000',
              }}
            >
              <Play className="w-5 h-5 fill-black text-black ml-0.5" />
            </div>
          )}

          <div className="flex flex-col min-w-0 truncate">
            <span
              className="font-extrabold text-xs sm:text-base md:text-xl tracking-wide flex items-center gap-1 truncate"
              style={{ color: activeTheme.textPrimary }}
            >
              <span className="truncate">
                {language === 'ar' ? activeTheme.studioNameAr || activeTheme.studioName : activeTheme.studioName}
              </span>
              <span
                className="text-[9px] px-1 py-0.2 rounded font-mono uppercase tracking-widest border shrink-0 hidden xs:inline-block"
                style={{
                  backgroundColor: `${activeTheme.primaryColor}15`,
                  color: activeTheme.primaryColor,
                  borderColor: `${activeTheme.primaryColor}40`,
                }}
              >
                PRO
              </span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-medium hidden md:inline truncate" style={{ color: activeTheme.textSecondary }}>
              {language === 'ar' ? activeTheme.sloganAr : activeTheme.slogan}
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse">
          {navLinks.map((link) => {
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive ? 'shadow-md scale-[1.02]' : 'hover:bg-white/5 opacity-80 hover:opacity-100'
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: `${activeTheme.primaryColor}20`,
                        color: activeTheme.primaryColor,
                        border: `1px solid ${activeTheme.primaryColor}50`,
                      }
                    : { color: activeTheme.textPrimary }
                }
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Toolbar */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-1.5 p-2 sm:px-3 sm:py-1.5 rounded-lg border text-xs font-medium transition-all hover:bg-white/5 cursor-pointer"
            style={{
              backgroundColor: `${activeTheme.primaryColor}08`,
              borderColor: `${activeTheme.primaryColor}30`,
              color: activeTheme.textSecondary,
            }}
            title="Search"
          >
            <Search className="w-4 h-4 text-yellow-400" />
            <span className="hidden md:inline">{t('searchPlaceholder').slice(0, 14)}...</span>
          </button>

          {/* Quick Theme Switcher (Desktop) */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              className="p-2 rounded-lg border transition-all hover:bg-white/10 flex items-center gap-1 cursor-pointer"
              style={{
                backgroundColor: `${activeTheme.primaryColor}10`,
                borderColor: `${activeTheme.primaryColor}30`,
                color: activeTheme.primaryColor,
              }}
              title="Quick Theme Presets"
            >
              <Palette className="w-4 h-4" />
              <ChevronDown className="w-3 h-3" />
            </button>

            {isThemeDropdownOpen && (
              <div
                className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-56 rounded-xl p-2 border shadow-2xl z-50 backdrop-blur-2xl"
                style={{
                  backgroundColor: activeTheme.cardBg,
                  borderColor: `${activeTheme.primaryColor}40`,
                }}
              >
                <div className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-yellow-500 border-b border-white/10 flex items-center justify-between">
                  <span>Theme Presets</span>
                  <Sparkles className="w-3 h-3" />
                </div>
                <div className="mt-1 space-y-1">
                  {presetThemesList.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => {
                        applyPresetTheme(preset.id);
                        setIsThemeDropdownOpen(false);
                      }}
                      className="w-full text-left rtl:text-right px-3 py-2 rounded-lg text-xs font-medium flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
                      style={{ color: activeTheme.textPrimary }}
                    >
                      <span>{language === 'ar' ? preset.nameAr : preset.name}</span>
                      <span
                        className="w-3 h-3 rounded-full border border-white/40"
                        style={{ backgroundColor: preset.primaryColor }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Private Direct Chat Button */}
          <button
            onClick={() => {
              if (!currentUser) {
                setIsAuthModalOpen(true);
              } else {
                setIsChatModalOpen(true);
              }
            }}
            className="p-2 sm:px-3 sm:py-1.5 rounded-lg border relative transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border-yellow-500/40 text-yellow-400"
            title={language === 'ar' ? 'شات خاص المباشر (يمسح كل 9 ساعات)' : 'Private Direct Chat (Auto-deletes in 9h)'}
          >
            <MessageSquare className="w-4 h-4 text-yellow-400" />
            <span className="hidden xl:inline text-xs font-bold">
              {language === 'ar' ? 'شات خاص' : 'Direct Chat'}
            </span>
            {recentChatCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-yellow-400 animate-ping absolute -top-0.5 -right-0.5" />
            )}
          </button>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 rounded-lg border relative transition-all hover:bg-white/10 cursor-pointer"
              style={{
                backgroundColor: `${activeTheme.primaryColor}10`,
                borderColor: `${activeTheme.primaryColor}30`,
                color: activeTheme.textPrimary,
              }}
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 rtl:-left-1 rtl:right-auto w-4 h-4 rounded-full bg-red-600 text-white font-bold text-[10px] flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notification Drawer Popover */}
            {isNotifOpen && (
              <div
                className="absolute right-0 rtl:left-0 rtl:right-auto mt-2 w-72 sm:w-96 rounded-2xl p-4 border shadow-2xl z-50 backdrop-blur-2xl"
                style={{
                  backgroundColor: activeTheme.cardBg,
                  borderColor: `${activeTheme.primaryColor}40`,
                }}
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="font-bold text-sm flex items-center gap-2" style={{ color: activeTheme.textPrimary }}>
                    <Bell className="w-4 h-4 text-yellow-500" />
                    {t('notificationsTitle')}
                  </h4>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs font-semibold hover:underline text-yellow-500 cursor-pointer"
                    >
                      {t('markAllRead')}
                    </button>
                  )}
                </div>

                <div className="mt-3 space-y-2 max-h-80 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-center py-6 text-gray-400">{t('noNotifications')}</p>
                  ) : (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          if (notif.targetType === 'careers') handleNavClick('careers');
                          else if (notif.targetType === 'news') handleNavClick('news-list');
                        }}
                        className={`p-3 rounded-xl border transition-all text-xs cursor-pointer ${
                          notif.read ? 'opacity-70 border-white/5 bg-white/5' : 'border-yellow-500/30 bg-yellow-500/10'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <span className="font-bold" style={{ color: activeTheme.primaryColor }}>
                            {language === 'ar' ? notif.titleAr : notif.title}
                          </span>
                          <span className="text-[10px] text-gray-400">{notif.timestamp}</span>
                        </div>
                        <p className="mt-1 text-gray-300">
                          {language === 'ar' ? notif.messageAr : notif.message}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="flex items-center gap-1 px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-lg border text-xs font-bold transition-all hover:bg-white/10 cursor-pointer"
            style={{
              backgroundColor: `${activeTheme.primaryColor}15`,
              borderColor: `${activeTheme.primaryColor}40`,
              color: activeTheme.primaryColor,
            }}
          >
            <Globe className="w-3.5 h-3.5" />
            <span className="uppercase text-[11px] sm:text-xs">{language === 'en' ? 'عربي' : 'EN'}</span>
          </button>

          {/* User Profile / Admin Quick Access */}
          {currentUser ? (
            <div className="flex items-center space-x-1.5 rtl:space-x-reverse">
              {(currentUser.role === 'Owner' || currentUser.role === 'Admin') && (
                <button
                  onClick={() => handleNavClick('admin')}
                  className="p-1.5 sm:px-3 sm:py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1 bg-yellow-500/20 text-yellow-400 border-yellow-500/50 hover:bg-yellow-500/30 transition-colors cursor-pointer"
                  title="Admin Dashboard"
                >
                  <ShieldCheck className="w-4 h-4 text-yellow-400" />
                  <span className="hidden md:inline">{t('adminDashboard')}</span>
                </button>
              )}

              <button
                onClick={() => handleNavClick('profile')}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-yellow-500/40 overflow-hidden hover:scale-105 transition-transform cursor-pointer shrink-0"
                title={currentUser.username}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="px-2.5 py-1.5 sm:px-4 sm:py-1.5 rounded-lg text-xs font-bold tracking-wide shadow-lg hover:scale-105 transition-transform flex items-center gap-1 cursor-pointer shrink-0"
              style={{
                backgroundColor: activeTheme.primaryColor,
                color: '#000',
              }}
            >
              <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline">{t('login')}</span>
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border transition-all text-white border-white/20 hover:bg-white/10 cursor-pointer shrink-0"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-yellow-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Full Drawer Navigation */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden border-t px-4 py-5 space-y-4 backdrop-blur-2xl max-h-[85vh] overflow-y-auto shadow-2xl animate-in slide-in-from-top-2 duration-200"
          style={{
            backgroundColor: activeTheme.cardBg,
            borderColor: `${activeTheme.primaryColor}30`,
          }}
        >
          {/* User Quick Info */}
          {currentUser && (
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-10 h-10 rounded-xl object-cover border border-yellow-500/50"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-bold text-sm text-white">{currentUser.username}</h4>
                  <span className="text-[10px] text-yellow-400 font-mono">{currentUser.role}</span>
                </div>
              </div>
              <button
                onClick={() => handleNavClick('profile')}
                className="px-3 py-1 rounded-lg border border-yellow-500/40 text-yellow-400 text-xs font-bold"
              >
                {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
              </button>
            </div>
          )}

          {/* Quick Search trigger in drawer */}
          <button
            onClick={() => {
              setIsSearchOpen(true);
              setIsMobileMenuOpen(false);
            }}
            className="w-full p-3 rounded-xl border border-white/15 bg-black/40 text-xs text-gray-300 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-yellow-400" />
              <span>{t('searchPlaceholder')}</span>
            </span>
            <span className="text-[10px] font-mono text-gray-500">DMX</span>
          </button>

          {/* Navigation Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className="w-full text-left rtl:text-right px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 transition-colors cursor-pointer border"
                  style={{
                    color: isActive ? activeTheme.primaryColor : activeTheme.textPrimary,
                    backgroundColor: isActive ? `${activeTheme.primaryColor}20` : 'rgba(255, 255, 255, 0.04)',
                    borderColor: isActive ? `${activeTheme.primaryColor}50` : 'rgba(255, 255, 255, 0.08)',
                  }}
                >
                  <span className="p-1.5 rounded-lg bg-black/30">{link.icon}</span>
                  <span>{link.label}</span>
                </button>
              );
            })}

            {currentUser && (currentUser.role === 'Owner' || currentUser.role === 'Admin') && (
              <button
                onClick={() => handleNavClick('admin')}
                className="w-full text-left rtl:text-right px-4 py-3 rounded-xl text-sm font-bold flex items-center gap-3 bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 cursor-pointer sm:col-span-2"
              >
                <ShieldCheck className="w-5 h-5 text-yellow-400" />
                <span>{t('adminDashboard')}</span>
              </button>
            )}
          </div>

          {/* Theme Presets Quick Horizontal Selector */}
          <div className="pt-2 border-t border-white/10 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-400 block">
              {language === 'ar' ? 'اختر ثيم الموقع' : 'Select Theme Preset'}
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {presetThemesList.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    applyPresetTheme(preset.id);
                  }}
                  className="px-3 py-1.5 rounded-xl border text-xs font-bold shrink-0 flex items-center gap-1.5 bg-black/40 hover:bg-white/10"
                  style={{ borderColor: preset.primaryColor, color: '#fff' }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: preset.primaryColor }} />
                  <span>{language === 'ar' ? preset.nameAr : preset.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Floating App Dock) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-2xl border-t border-white/15 px-2 py-1.5 shadow-2xl flex items-center justify-around">
        <button
          onClick={() => handleNavClick('home')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all cursor-pointer ${
            activeView === 'home' ? 'text-yellow-400 font-bold scale-105' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Clapperboard className="w-5 h-5" />
          <span className="text-[10px]">{language === 'ar' ? 'الرئيسية' : 'Home'}</span>
        </button>

        <button
          onClick={() => handleNavClick('feed')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all cursor-pointer relative ${
            activeView === 'feed' ? 'text-yellow-400 font-bold scale-105' : 'text-gray-400 hover:text-white'
          }`}
        >
          <MessageSquare className="w-5 h-5 text-yellow-400" />
          <span className="text-[10px]">{language === 'ar' ? 'المجتمع' : 'Feed'}</span>
          <span className="absolute -top-1 right-1 w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
        </button>

        <button
          onClick={() => handleNavClick('anime-list')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all cursor-pointer ${
            activeView === 'anime-list' ? 'text-yellow-400 font-bold scale-105' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Tv className="w-5 h-5" />
          <span className="text-[10px]">{language === 'ar' ? 'الأنميات' : 'Anime'}</span>
        </button>

        <button
          onClick={() => handleNavClick('news-list')}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all cursor-pointer ${
            activeView === 'news-list' ? 'text-yellow-400 font-bold scale-105' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Newspaper className="w-5 h-5" />
          <span className="text-[10px]">{language === 'ar' ? 'الأخبار' : 'News'}</span>
        </button>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`flex flex-col items-center gap-0.5 p-1 rounded-xl transition-all cursor-pointer ${
            isMobileMenuOpen ? 'text-yellow-400 font-bold' : 'text-gray-400 hover:text-white'
          }`}
        >
          <Menu className="w-5 h-5" />
          <span className="text-[10px]">{language === 'ar' ? 'القائمة' : 'Menu'}</span>
        </button>
      </nav>
    </header>
  );
};
