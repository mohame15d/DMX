import React from 'react';
import { ShieldCheck, Sparkles, Star, CheckCircle2, Tv } from 'lucide-react';
import { UserRole } from '../types';

interface VerifiedBadgeProps {
  role?: UserRole;
  isVerified?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export const VerifiedBadge: React.FC<VerifiedBadgeProps> = ({
  role,
  isVerified,
  size = 'md',
  showText = true,
  className = '',
}) => {
  // If not verified and role is plain 'User' or 'Moderator', return null unless verified
  if (!role && !isVerified) return null;

  // Determine badge styling based on role or verification
  if (role === 'Owner') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-black text-black shadow-lg bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 animate-pulse border border-yellow-200/80 cursor-default select-none ${
          size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs px-2.5 py-1' : 'text-[10px]'
        } ${className}`}
        title="حساب المالك الموثق الشارة الذهبية اللامعة"
      >
        <Star className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'} fill-black stroke-black`} />
        {showText && <span>المالك</span>}
      </span>
    );
  }

  if (role === 'Admin') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-extrabold text-white shadow-lg bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 border border-cyan-300/60 cursor-default select-none ${
          size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs px-2.5 py-1' : 'text-[10px]'
        } ${className}`}
        title="حساب أدمن موثق الشارة الزرقاء اللامعة"
      >
        <ShieldCheck className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'} text-white fill-blue-700`} />
        {showText && <span>أدمن</span>}
      </span>
    );
  }

  if (role === 'Publisher') {
    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-white shadow-lg bg-gradient-to-r from-purple-600 via-fuchsia-500 to-violet-600 border border-fuchsia-300/60 cursor-default select-none ${
          size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs px-2.5 py-1' : 'text-[10px]'
        } ${className}`}
        title="ناشر أنمي موثق الشارة البنفسجية اللامعة"
      >
        <Tv className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'} text-fuchsia-200`} />
        {showText && <span>ناشر أنمي</span>}
      </span>
    );
  }

  if (isVerified) {
    return (
      <span
        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-500/50 shadow-md ${
          size === 'sm' ? 'text-[9px]' : 'text-[10px]'
        } ${className}`}
        title="حساب موثق"
      >
        <CheckCircle2 className={`${size === 'sm' ? 'w-2.5 h-2.5' : 'w-3.5 h-3.5'} text-cyan-400 fill-cyan-950`} />
        {showText && <span>موثق</span>}
      </span>
    );
  }

  return null;
};
