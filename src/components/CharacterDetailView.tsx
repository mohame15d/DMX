import React from 'react';
import { useStudio } from '../context/StudioContext';
import { Users, Zap, Award, ArrowLeft, Mic, Sparkles, Edit } from 'lucide-react';

export const CharacterDetailView: React.FC = () => {
  const {
    t,
    language,
    activeTheme,
    selectedCharacterId,
    characters,
    animeList,
    setActiveView,
    setSelectedCharacterId,
    currentUser,
  } = useStudio();

  const char = characters.find((c) => c.id === selectedCharacterId) || characters[0];
  const anime = animeList.find((a) => a.id === char?.animeId) || animeList[0];

  if (!char) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <Users className="w-12 h-12 text-yellow-400 mx-auto opacity-60" />
        <h3 className="text-xl font-bold text-white">
          {language === 'ar' ? 'لا توجد شخصيات مضافة حالياً' : 'No character selected'}
        </h3>
        <button
          onClick={() => setActiveView('character-list')}
          className="px-6 py-2.5 rounded-xl text-xs font-bold bg-yellow-500 text-black"
        >
          {language === 'ar' ? 'العودة لقائمة الشخصيات' : 'Back to Character List'}
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Navigation & Owner Actions */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setActiveView('character-list')}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>{language === 'ar' ? 'العودة لقائمة الشخصيات' : 'Back to Character Roster'}</span>
        </button>

        {(currentUser?.role === 'Owner' || currentUser?.role === 'Admin' || currentUser?.role === 'Publisher') && (
          <button
            onClick={() => setActiveView('admin')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 text-xs font-extrabold transition-all cursor-pointer shadow-lg"
          >
            <Edit className="w-3.5 h-3.5 text-yellow-400" />
            <span>{language === 'ar' ? 'تعديل بيانات هذه الشخصية' : 'Edit Character Entry'}</span>
          </button>
        )}
      </div>

      {/* Hero Header */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Character Portrait Card */}
        <div className="md:col-span-4 rounded-3xl overflow-hidden border-2 shadow-2xl relative"
          style={{ borderColor: `${activeTheme.primaryColor}50` }}>
          <img
            src={char.portrait}
            alt={char.name}
            className="w-full aspect-[3/4] object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 right-4 text-center">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-yellow-400">
              CV: {language === 'ar' ? char.voiceActor.nameAr : char.voiceActor.name}
            </span>
          </div>
        </div>

        {/* Character Details & Abilities */}
        <div className="md:col-span-8 space-y-8">
          <div className="space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              {language === 'ar' ? anime.titleAr : anime.title}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight" style={{ color: activeTheme.textPrimary }}>
              {language === 'ar' ? char.nameAr : char.name}
            </h1>
            <p className="text-lg font-mono text-gray-400">{char.kanjiName}</p>

            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-bold text-gray-300">
              <span className="px-3 py-1 rounded-md bg-white/10">{t('characterRole')}: {language === 'ar' ? char.roleAr : char.role}</span>
              <span className="px-3 py-1 rounded-md bg-white/10">Age: {char.age}</span>
            </div>
          </div>

          {/* Biography */}
          <div
            className="p-6 rounded-2xl border backdrop-blur-xl space-y-3"
            style={{ backgroundColor: activeTheme.cardBg, borderColor: `${activeTheme.primaryColor}25` }}
          >
            <h3 className="text-lg font-extrabold flex items-center gap-2 text-yellow-400">
              <Sparkles className="w-5 h-5" />
              <span>{t('biography')}</span>
            </h3>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base">
              {language === 'ar' ? char.biographyAr : char.biography}
            </p>
          </div>

          {/* Signature Abilities & Power Bars */}
          <div className="space-y-4">
            <h3 className="text-xl font-black flex items-center gap-2" style={{ color: activeTheme.textPrimary }}>
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>{t('abilities')}</span>
            </h3>

            <div className="space-y-3">
              {char.abilities.map((ability, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border bg-white/5 space-y-2"
                  style={{ borderColor: `${activeTheme.primaryColor}20` }}
                >
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-yellow-400">{language === 'ar' ? ability.nameAr : ability.name}</span>
                    <span className="font-mono text-gray-400">{ability.powerLevel}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${ability.powerLevel}%`,
                        backgroundColor: activeTheme.primaryColor,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-300">{ability.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const CharacterList: React.FC = () => {
  const { t, language, activeTheme, characters, setSelectedCharacterId, setActiveView } = useStudio();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3" style={{ color: activeTheme.textPrimary }}>
          <Users className="w-8 h-8 text-yellow-400" />
          <span>{t('characters')} Archives</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Explore the roster of characters, voice actors, and power lore created by DMX™ Studio.
        </p>
      </div>

      {characters.length === 0 ? (
        <div className="p-12 text-center rounded-3xl border border-dashed border-white/20 bg-white/5 space-y-4">
          <Users className="w-12 h-12 text-yellow-400 mx-auto opacity-60" />
          <h3 className="text-xl font-bold text-white">
            {language === 'ar' ? 'أرشيف الشخصيات فارغ حالياً' : 'Character archive is empty'}
          </h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            {language === 'ar'
              ? 'يمكن للمالك إضافة الشخصيات ومعلومات مؤدي الأصوات والقدرات من لوحة التحكم.'
              : 'The studio owner can add character profiles and voice actors from the Admin Dashboard.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {characters.map((char) => (
            <div
              key={char.id}
              onClick={() => {
                setSelectedCharacterId(char.id);
                setActiveView('character-detail');
              }}
              className="group rounded-2xl overflow-hidden border backdrop-blur-md transition-all duration-300 hover:scale-[1.03] cursor-pointer flex flex-col justify-between shadow-xl"
              style={{
                backgroundColor: activeTheme.cardBg,
                borderColor: `${activeTheme.primaryColor}30`,
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={char.portrait}
                  alt={char.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-yellow-400 block">
                    {language === 'ar' ? char.roleAr : char.role}
                  </span>
                  <h3 className="font-extrabold text-lg text-white group-hover:text-yellow-400 transition-colors">
                    {language === 'ar' ? char.nameAr : char.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
