import React, { useState, useEffect } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { useStudio } from '../context/StudioContext';

interface CountdownProps {
  targetDateStr?: string;
  targetDate?: string;
  title?: string;
}

export const CountdownTimer: React.FC<CountdownProps> = ({ targetDateStr, targetDate, title }) => {
  const { language, activeTheme } = useStudio();

  // Stable default target date if none specified (Jan 1, 2027)
  const effectiveDate = targetDate || targetDateStr || '2027-01-01T00:00:00Z';

  const calculateTimeLeft = () => {
    const targetMs = new Date(effectiveDate).getTime();
    const difference = targetMs - Date.now();
    if (isNaN(difference) || difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      expired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [effectiveDate]);

  if (timeLeft.expired) {
    return (
      <div className="p-4 rounded-2xl border border-green-500/40 bg-green-500/10 text-green-400 font-black text-xs sm:text-sm text-center flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-green-400" />
        <span>{language === 'ar' ? 'العرض متوفر الآن للمشاهدة الرسمية!' : 'Show is Available Now for Official Streaming!'}</span>
      </div>
    );
  }

  return (
    <div
      className="p-5 sm:p-6 rounded-2xl border shadow-xl backdrop-blur-xl space-y-3"
      style={{
        backgroundColor: activeTheme.cardBg,
        borderColor: `${activeTheme.primaryColor}40`,
      }}
    >
      <div className="flex items-center justify-between">
        <h4 className="font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 text-yellow-400">
          <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />
          <span>{title || (language === 'ar' ? 'العد التنازلي لموعد العرض القادم' : 'Live Release Countdown')}</span>
        </h4>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-gray-300">
          LIVE
        </span>
      </div>

      <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
        <div className="p-2 sm:p-3 rounded-xl bg-black/50 border border-white/10">
          <span className="block text-lg sm:text-2xl font-black font-mono text-yellow-400">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-gray-400 font-bold">
            {language === 'ar' ? 'يوم' : 'Days'}
          </span>
        </div>

        <div className="p-2 sm:p-3 rounded-xl bg-black/50 border border-white/10">
          <span className="block text-lg sm:text-2xl font-black font-mono text-yellow-400">
            {String(timeLeft.hours).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-gray-400 font-bold">
            {language === 'ar' ? 'ساعة' : 'Hours'}
          </span>
        </div>

        <div className="p-2 sm:p-3 rounded-xl bg-black/50 border border-white/10">
          <span className="block text-lg sm:text-2xl font-black font-mono text-yellow-400">
            {String(timeLeft.minutes).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-gray-400 font-bold">
            {language === 'ar' ? 'دقيقة' : 'Mins'}
          </span>
        </div>

        <div className="p-2 sm:p-3 rounded-xl bg-black/50 border border-white/10">
          <span className="block text-lg sm:text-2xl font-black font-mono text-yellow-400">
            {String(timeLeft.seconds).padStart(2, '0')}
          </span>
          <span className="text-[10px] sm:text-xs text-gray-400 font-bold">
            {language === 'ar' ? 'ثانية' : 'Secs'}
          </span>
        </div>
      </div>
    </div>
  );
};
