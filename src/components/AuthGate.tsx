import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { Lock, User as UserIcon, Sparkles, ArrowRight, Languages, Sun, Moon, Play } from 'lucide-react';

export const AuthGate: React.FC = () => {
  const {
    language,
    setLanguage,
    activeTheme,
    toggleTheme,
    login,
    register,
  } = useStudio();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim() || !password.trim()) {
      setErrorMsg(
        language === 'ar'
          ? 'يرجى كتابة اسم المستخدم وكلمة المرور'
          : 'Please enter username and password'
      );
      return;
    }

    if (mode === 'login') {
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
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative p-4 sm:p-6 overflow-hidden select-none"
      style={{
        backgroundColor: activeTheme.bgBase,
        color: activeTheme.textPrimary,
      }}
    >
      {/* Background Lighting & Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20 filter blur-[120px]"
          style={{ backgroundColor: activeTheme.primaryColor }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90" />
      </div>

      {/* Top Utility Bar */}
      <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-20 max-w-5xl mx-auto">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shadow-xl"
            style={{ backgroundColor: activeTheme.primaryColor, color: '#000' }}
          >
            <Play className="w-4 h-4 fill-black text-black ml-0.5" />
          </div>
          <span className="font-extrabold text-sm tracking-wider uppercase hidden sm:inline text-gray-300">
            Anime Stream
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Switcher */}
          <button
            onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            className="px-3.5 py-1.5 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-xs font-extrabold flex items-center gap-2 transition-all cursor-pointer shadow-lg"
          >
            <Languages className="w-4 h-4 text-yellow-400" />
            <span>{language === 'ar' ? 'English (EN)' : 'العربية (AR)'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-white/20 bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all cursor-pointer shadow-lg"
          >
            {activeTheme.id === 'cyberpunk' ? <Sun className="w-4 h-4 text-yellow-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Auth Card Box */}
      <div
        className="relative z-10 w-full max-w-md rounded-3xl border shadow-2xl p-6 sm:p-10 space-y-6 backdrop-blur-2xl my-12"
        style={{
          backgroundColor: activeTheme.cardBg,
          borderColor: `${activeTheme.primaryColor}50`,
        }}
      >
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-yellow-400">
              {language === 'ar' ? 'بوابة الدخول الرسمية' : 'Official Portal Access'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight" style={{ color: activeTheme.textPrimary }}>
            {mode === 'login'
              ? language === 'ar'
                ? 'تسجيل الدخول إلى استوديو DMX™'
                : 'Sign In to DMX™ Studio'
              : language === 'ar'
              ? 'إنشاء حساب جديد'
              : 'Create New Account'}
          </h1>

          <p className="text-xs text-gray-300 leading-relaxed max-w-sm mx-auto">
            {language === 'ar'
              ? 'مرحباً بك! قم بتسجيل الدخول مباشرة بواسطة اسم المستخدم وكلمة المرور للوصول لكافة أجزاء الموقع.'
              : 'Welcome! Sign in directly with your Username and Password to access the portal.'}
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="grid grid-cols-2 p-1 rounded-2xl bg-black/40 border border-white/10 font-bold text-xs">
          <button
            onClick={() => {
              setMode('login');
              setErrorMsg('');
            }}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              mode === 'login' ? 'bg-yellow-500 text-black shadow-lg font-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </button>
          <button
            onClick={() => {
              setMode('register');
              setErrorMsg('');
            }}
            className={`py-2.5 rounded-xl transition-all cursor-pointer ${
              mode === 'register' ? 'bg-yellow-500 text-black shadow-lg font-black' : 'text-gray-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? 'حساب جديد' : 'Register'}
          </button>
        </div>

        {/* Error Alert Box */}
        {errorMsg && (
          <div className="p-3.5 rounded-2xl border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-bold text-center leading-relaxed">
            {errorMsg}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-300 block">
              {language === 'ar' ? 'اسم المستخدم (Username)' : 'Username'}
            </label>
            <div className="relative">
              <UserIcon className="w-4 h-4 absolute top-3.5 left-3.5 rtl:right-3.5 rtl:left-auto text-yellow-400" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل اسم المستخدم' : 'Enter username'}
                className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 rounded-xl border bg-black/50 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                style={{ borderColor: `${activeTheme.primaryColor}30` }}
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-300 block">
              {language === 'ar' ? 'كلمة المرور (Password)' : 'Password'}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute top-3.5 left-3.5 rtl:right-3.5 rtl:left-auto text-yellow-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter password'}
                className="w-full pl-10 pr-4 rtl:pr-10 rtl:pl-4 py-3 rounded-xl border bg-black/50 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                style={{ borderColor: `${activeTheme.primaryColor}30` }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-extrabold text-sm sm:text-base shadow-2xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            style={{
              backgroundColor: activeTheme.primaryColor,
              color: '#000',
              boxShadow: `0 0 25px ${activeTheme.primaryColor}40`,
            }}
          >
            <span>
              {mode === 'login'
                ? language === 'ar'
                  ? 'دخول الاستوديو'
                  : 'Enter Studio Portal'
                : language === 'ar'
                ? 'إنشاء الحساب ودخول الاستوديو'
                : 'Create Account & Enter'}
            </span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </form>
      </div>

      {/* Footer Branding */}
      <div className="relative z-10 text-center text-[11px] text-gray-500 font-mono">
        © {new Date().getFullYear()} DMX™ Animation Studio. All Rights Reserved.
      </div>
    </div>
  );
};
