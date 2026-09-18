import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { Mail, MapPin, Send, CheckCircle2, Globe, Building2, Phone } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { t, language, activeTheme } = useStudio();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Licensing & Distribution',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'Licensing & Distribution', message: '' });
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight" style={{ color: activeTheme.textPrimary }}>
          {t('contactStudio')}
        </h1>
        <p className="text-sm text-gray-400 leading-relaxed">{t('contactDesc')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Form */}
        <div
          className="md:col-span-7 p-6 sm:p-8 rounded-3xl border backdrop-blur-xl shadow-2xl space-y-6"
          style={{
            backgroundColor: activeTheme.cardBg,
            borderColor: `${activeTheme.primaryColor}30`,
          }}
        >
          {submitted ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto animate-bounce" />
              <h3 className="text-2xl font-black text-white">Inquiry Received!</h3>
              <p className="text-xs text-gray-400">
                Thank you. Our international executive team will review your message within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{t('yourName')}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Kenji Takahashi"
                  className="w-full px-4 py-3 rounded-xl border bg-white/5 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                  style={{ borderColor: `${activeTheme.primaryColor}30`, color: activeTheme.textPrimary }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{t('yourEmail')}</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="business@company.com"
                  className="w-full px-4 py-3 rounded-xl border bg-white/5 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                  style={{ borderColor: `${activeTheme.primaryColor}30`, color: activeTheme.textPrimary }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{t('subject')}</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border bg-black text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                  style={{ borderColor: `${activeTheme.primaryColor}30`, color: activeTheme.textPrimary }}
                >
                  <option value="Licensing & Distribution">International Licensing & TV Distribution</option>
                  <option value="Press & Media Releases">Press & Media Releases</option>
                  <option value="Studio Careers & Talent">Studio Careers & Talent Acquisition</option>
                  <option value="Fan Works & Community">Fan Works & Community Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">{t('message')}</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Details of your business proposal or inquiry..."
                  className="w-full px-4 py-3 rounded-xl border bg-white/5 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                  style={{ borderColor: `${activeTheme.primaryColor}30`, color: activeTheme.textPrimary }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-extrabold text-sm shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
                style={{ backgroundColor: activeTheme.primaryColor, color: '#000' }}
              >
                <Send className="w-5 h-5" />
                <span>{t('sendMessage')}</span>
              </button>
            </form>
          )}
        </div>

        {/* Studio Locations & Info */}
        <div className="md:col-span-5 space-y-6">
          <div
            className="p-6 rounded-3xl border backdrop-blur-xl space-y-4"
            style={{
              backgroundColor: activeTheme.cardBg,
              borderColor: `${activeTheme.primaryColor}30`,
            }}
          >
            <h3 className="text-xl font-extrabold flex items-center gap-2 text-yellow-400">
              <Building2 className="w-5 h-5" />
              <span>{t('tokyoStudio')}</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              DMX Animation Studio Inc.
              <br />
              Roppongi Hills Mori Tower 42F, Minato City, Tokyo 106-6108, Japan
            </p>
            <p className="text-xs font-mono text-gray-400">Email: tokyo-studio@dmx-studio.com</p>
          </div>

          <div
            className="p-6 rounded-3xl border backdrop-blur-xl space-y-4"
            style={{
              backgroundColor: activeTheme.cardBg,
              borderColor: `${activeTheme.primaryColor}30`,
            }}
          >
            <h3 className="text-xl font-extrabold flex items-center gap-2 text-yellow-400">
              <Globe className="w-5 h-5" />
              <span>{t('dubaiStudio')}</span>
            </h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              DMX Creative Entertainment Hub
              <br />
              Dubai Design District (d3), Building 7, Dubai, United Arab Emirates
            </p>
            <p className="text-xs font-mono text-gray-400">Email: dubai-hub@dmx-studio.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};
