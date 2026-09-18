import React from 'react';
import { useStudio } from '../context/StudioContext';
import { Clapperboard, Globe, Shield, Sparkles, Youtube, Twitter, Instagram, Disc as Discord, Play } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t, language, activeTheme, setActiveView } = useStudio();

  return (
    <footer
      className="w-full border-t pt-16 pb-12 transition-colors duration-300 relative overflow-hidden"
      style={{
        backgroundColor: activeTheme.bgBase,
        borderColor: `${activeTheme.primaryColor}20`,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse cursor-pointer" onClick={() => setActiveView('home')}>
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${activeTheme.primaryColor}, ${activeTheme.accentColor})`,
                  color: '#000',
                }}
              >
                <Play className="w-5 h-5 fill-black text-black ml-0.5" />
              </div>
              <span className="font-extrabold text-xl tracking-wide" style={{ color: activeTheme.textPrimary }}>
                {language === 'ar' ? activeTheme.studioNameAr || activeTheme.studioName : activeTheme.studioName}
              </span>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              {language === 'ar'
                ? 'المنصة العربية الرائدة لمشاهدة واكتشاف ومتابعة مسلسلات وأفلام الأنيمي المترجمة باللغة العربية مع سيرفرات ومشغل عالي السرعة.'
                : 'Premier Arabic anime streaming platform for searching, discovering, and watching subtitled anime with high-speed streaming servers.'}
            </p>

            {/* Social Media Links */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse pt-2">
              <a href="#" className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-yellow-500/20 text-gray-300 hover:text-yellow-400 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-yellow-500/20 text-gray-300 hover:text-yellow-400 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-yellow-500/20 text-gray-300 hover:text-yellow-400 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-yellow-500/20 text-gray-300 hover:text-yellow-400 transition-colors">
                <Discord className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs">
            <div className="space-y-3">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-yellow-400">Studio Catalog</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => setActiveView('anime-detail')} className="hover:text-white transition-colors">
                    Painter of Death (2027)
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('anime-list')} className="hover:text-white transition-colors">
                    Cyber Blade Zero
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('anime-list')} className="hover:text-white transition-colors">
                    Shadows of Eternity
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-yellow-400">Media & Lore</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => setActiveView('news-list')} className="hover:text-white transition-colors">
                    {t('news')}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('character-list')} className="hover:text-white transition-colors">
                    {t('characters')}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('gallery')} className="hover:text-white transition-colors">
                    {t('gallery')} Vault
                  </button>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-extrabold text-sm uppercase tracking-wider text-yellow-400">Studio Hub</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button onClick={() => setActiveView('contact')} className="hover:text-white transition-colors">
                    {t('contact')}
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveView('admin')} className="hover:text-white transition-colors">
                    {t('adminDashboard')}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-gray-500 font-mono">
          <p>© 2026 DMX™ Animation Studio Inc. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <span>Tokyo • Dubai</span>
            <span>•</span>
            <span>v2.7 AAA Production Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
