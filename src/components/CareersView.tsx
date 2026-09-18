import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { Briefcase, Send, CheckCircle2, ShieldCheck, FileText, User, Mail, Phone, Lock, Sparkles, ArrowLeft } from 'lucide-react';

export const CareersView: React.FC = () => {
  const { language, activeTheme, submitJobApplication, setActiveView } = useStudio();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [position, setPosition] = useState('2D Animator');
  const [experienceYears, setExperienceYears] = useState('1-3 Years');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !coverLetter) return;

    setIsSubmitting(true);
    try {
      const res = await submitJobApplication({
        fullName,
        email,
        phone,
        position,
        experienceYears,
        portfolioUrl,
        coverLetter,
      });
      setSubmittedRefId(res.id);
    } catch (err) {
      console.error('Job submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const positionsList = [
    { id: '2D Animator', labelAr: 'مُحرك رسوم 2D (2D Animator)', labelEn: '2D Animator' },
    { id: '3D Animator', labelAr: 'مُحرك رسوم 3D (3D Animator)', labelEn: '3D Animator' },
    { id: 'Voice Actor', labelAr: 'مؤدي صوتي (Voice Actor / Seiyuu)', labelEn: 'Voice Actor' },
    { id: 'Translator', labelAr: 'مترجم نصوص ومحاكاة (Translator & Subtitler)', labelEn: 'Translator & Subtitler' },
    { id: 'Sound Designer', labelAr: 'مهندس صوتيات ومؤثرات (Sound Designer)', labelEn: 'Sound Designer' },
    { id: 'Video Editor', labelAr: 'مونتير فيديو ومؤثرات بصرية (Video Editor & VFX)', labelEn: 'Video Editor & VFX' },
    { id: 'Script Writer', labelAr: 'كاتب سيناريو وحوارات (Script Writer)', labelEn: 'Script Writer' },
    { id: 'Graphic Designer', labelAr: 'مصمم جرافيك وبوسترات (Graphic Designer)', labelEn: 'Graphic Designer' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <button
        onClick={() => setActiveView('home')}
        className="px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 hover:text-white flex items-center gap-2 transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
        <span>{language === 'ar' ? 'الرجوع للرئيسية' : 'Back to Home'}</span>
      </button>

      {/* Header Banner */}
      <div
        className="rounded-3xl p-8 sm:p-12 border shadow-2xl relative overflow-hidden space-y-4"
        style={{
          backgroundColor: activeTheme.cardBg,
          borderColor: `${activeTheme.primaryColor}40`,
        }}
      >
        <div className="inline-flex items-center gap-2 px-3 me.5 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-xs font-mono font-bold">
          <Briefcase className="w-4 h-4" />
          <span>{language === 'ar' ? 'الانضمام لفريق استوديو DMX™' : 'Join DMX™ Studio Creative Team'}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black tracking-tight" style={{ color: activeTheme.textPrimary }}>
          {language === 'ar' ? 'التقديم على وظيفة بالاستوديو' : 'Apply for Studio Position'}
        </h1>

        <p className="text-sm text-gray-300 leading-relaxed max-w-2xl">
          {language === 'ar'
            ? 'هل تمتلك الشغف والإبداع في عالم الأنيمي والإنتاج؟ امشِ قدمًا وقدم بياناتك وسيرتك الذاتية (CV). البيانات مشفرة بالكامل وتصل فوراً إلى إدارة المالك بشكل آمن.'
            : 'Are you passionate about anime production? Submit your information and CV link below. All entries are encrypted end-to-end and routed directly to Studio Executive Owners.'}
        </p>

        <div className="flex items-center gap-2 text-xs font-bold text-yellow-400 pt-2">
          <ShieldCheck className="w-4 h-4" />
          <span>{language === 'ar' ? 'تشفير آمن آلي بين المتقدم والمالك' : 'Direct Encrypted Delivery to Studio Owners'}</span>
        </div>
      </div>

      {submittedRefId ? (
        <div className="p-8 sm:p-12 rounded-3xl border border-yellow-500/50 bg-yellow-500/10 text-center space-y-6">
          <CheckCircle2 className="w-16 h-16 text-yellow-400 mx-auto animate-bounce" />
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-white">
              {language === 'ar' ? 'تم استلام طلبك بنجاح!' : 'Application Submitted Successfully!'}
            </h2>
            <p className="text-sm text-gray-300 max-w-md mx-auto">
              {language === 'ar'
                ? 'شكراً لاهتمامك بالانضمام إلى DMX™ Studio. تمت أرشفة بياناتك وتشفيرها، وسيتم التواصل معك على البريد الإلكتروني المرفق.'
                : 'Thank you for your application. Your documents have been encrypted and sent to studio administrators.'}
            </p>
          </div>

          <div className="inline-block p-4 rounded-2xl bg-black/60 border border-yellow-500/30 font-mono text-xs font-bold text-yellow-400">
            {language === 'ar' ? 'رقم مرجع الطلب:' : 'Reference ID:'} {submittedRefId}
          </div>

          <div>
            <button
              onClick={() => {
                setSubmittedRefId(null);
                setFullName('');
                setEmail('');
                setPhone('');
                setCoverLetter('');
                setPortfolioUrl('');
              }}
              className="px-6 py-3 rounded-xl font-bold text-xs bg-yellow-500 text-black hover:bg-yellow-400 transition-all cursor-pointer"
            >
              {language === 'ar' ? 'تقديم طلب جديد' : 'Submit Another Application'}
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border p-6 sm:p-10 space-y-6 shadow-2xl backdrop-blur-xl"
          style={{
            backgroundColor: activeTheme.cardBg,
            borderColor: `${activeTheme.primaryColor}30`,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-yellow-400" />
                <span>{language === 'ar' ? 'الاسم بالكامل' : 'Full Name'}</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={language === 'ar' ? 'مثال: محمد علي المنصور' : 'e.g. Mohamed Al-Mansour'}
                className="w-full px-4 py-3 rounded-xl border bg-black/50 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                style={{ borderColor: `${activeTheme.primaryColor}30` }}
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-yellow-400" />
                <span>{language === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full px-4 py-3 rounded-xl border bg-black/50 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                style={{ borderColor: `${activeTheme.primaryColor}30` }}
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-yellow-400" />
                <span>{language === 'ar' ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp'}</span>
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+20 123 456 7890"
                className="w-full px-4 py-3 rounded-xl border bg-black/50 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                style={{ borderColor: `${activeTheme.primaryColor}30` }}
              />
            </div>

            {/* Position */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-yellow-400" />
                <span>{language === 'ar' ? 'الوظيفة المطلوبة' : 'Target Position'}</span>
              </label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border bg-black/80 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                style={{ borderColor: `${activeTheme.primaryColor}30` }}
              >
                {positionsList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {language === 'ar' ? p.labelAr : p.labelEn}
                  </option>
                ))}
              </select>
            </div>

            {/* Experience */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
                <span>{language === 'ar' ? 'سنوات الخبرة' : 'Years of Experience'}</span>
              </label>
              <select
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border bg-black/80 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                style={{ borderColor: `${activeTheme.primaryColor}30` }}
              >
                <option value="Middling Beginner">{language === 'ar' ? 'مبتدئ / موهبة صاعدة' : 'Beginner / Emerging Talent'}</option>
                <option value="1-3 Years">{language === 'ar' ? '1 - 3 سنوات' : '1 - 3 Years'}</option>
                <option value="3-5 Years">{language === 'ar' ? '3 - 5 سنوات' : '3 - 5 Years'}</option>
                <option value="5+ Years">{language === 'ar' ? 'أكثر من 5 سنوات (خبير)' : '5+ Years (Senior Expert)'}</option>
              </select>
            </div>

            {/* Portfolio / CV Link */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-yellow-400" />
                <span>{language === 'ar' ? 'رابط معرض الأعمال / CV / Drive' : 'Portfolio / CV Link (Drive / Behance / ArtStation)'}</span>
              </label>
              <input
                type="url"
                required
                value={portfolioUrl}
                onChange={(e) => setPortfolioUrl(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="w-full px-4 py-3 rounded-xl border bg-black/50 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                style={{ borderColor: `${activeTheme.primaryColor}30` }}
              />
            </div>
          </div>

          {/* Cover Letter / Bio */}
          <div className="space-y-2">
            <label className="text-xs font-extrabold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-yellow-400" />
              <span>{language === 'ar' ? 'نبذة عنك ومؤهلاتك (مشفرة)' : 'Encrypted Cover Letter & Bio'}</span>
            </label>
            <textarea
              required
              rows={5}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder={
                language === 'ar'
                  ? 'اكتب نبذة مختصرة عن خبراتك السابقة والأدوات التي تجيدها...'
                  : 'Write a brief description of your background, software skills, and motivation...'
              }
              className="w-full p-4 rounded-xl border bg-black/50 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors"
              style={{ borderColor: `${activeTheme.primaryColor}30` }}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl font-black text-sm sm:text-base shadow-2xl flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-95 transition-all disabled:opacity-50"
            style={{
              backgroundColor: activeTheme.primaryColor,
              color: '#000',
            }}
          >
            <Send className="w-5 h-5" />
            <span>
              {isSubmitting
                ? language === 'ar'
                  ? 'جاري تشفير البيانات وإرسال الطلب...'
                  : 'Encrypting & Transmitting...'
                : language === 'ar'
                ? 'إرسال الطلب مشفراً إلى مالك الاستوديو'
                : 'Send Encrypted Application to Owner'}
            </span>
          </button>
        </form>
      )}
    </div>
  );
};
