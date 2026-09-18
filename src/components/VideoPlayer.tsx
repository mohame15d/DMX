import React, { useState, useRef, useEffect } from 'react';
import { useStudio } from '../context/StudioContext';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Sliders,
  Subtitles,
  Languages,
  Tv,
  MessageSquare,
  ThumbsUp,
  Send,
  SkipForward,
  SkipBack,
  Sparkles,
  ArrowLeft,
  Settings,
  Monitor,
} from 'lucide-react';

export const VideoPlayer: React.FC = () => {
  const {
    t,
    language,
    activeTheme,
    selectedEpisodeId,
    episodes,
    animeList,
    comments,
    addComment,
    upvoteComment,
    setSelectedEpisodeId,
    saveWatchProgress,
    setActiveView,
  } = useStudio();

  const episode = episodes.find((e) => e.id === selectedEpisodeId) || episodes[0];
  const anime = animeList.find((a) => a.id === episode?.animeId) || animeList[0];

  const videoRef = useRef<HTMLVideoElement>(null);

  // Player Controls State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Selector Settings dropdown states
  const [selectedSub, setSelectedSub] = useState('ar');
  const [selectedAudio, setSelectedAudio] = useState('jp');
  const [selectedQuality, setSelectedQuality] = useState('1080p');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeServerId, setActiveServerId] = useState('server-ultra');
  const [serverErrorMsg, setServerErrorMsg] = useState('');

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [commentText, setCommentText] = useState('');

  // Available high-speed servers
  const availableServers = [
    { id: 'server-ultra', name: 'Ultra FHD 1080p', nameAr: 'السيرفر الفائق 1080p', speed: 'فائق السرعة' },
    { id: 'server-fast', name: 'Fast HD 720p', nameAr: 'السيرفر السريع 720p', speed: 'سريع للغاية' },
    { id: 'server-ar-sub', name: 'Arabic Subtitled Server', nameAr: 'سيرفر الترجمة العربية المباشرة', speed: 'مترجم' },
    { id: 'server-backup', name: 'Cloud Backup Server', nameAr: 'السيرفر السحابي الاحتياطي', speed: 'احتياطي' },
  ];

  const handleVideoError = () => {
    const currentIdx = availableServers.findIndex((s) => s.id === activeServerId);
    const nextIdx = (currentIdx + 1) % availableServers.length;
    const nextServer = availableServers[nextIdx];
    setActiveServerId(nextServer.id);
    setServerErrorMsg(
      language === 'ar'
        ? `تعذر الاتصال بالسيرفر، تم التحويل تلقائياً إلى "${nextServer.nameAr}"`
        : `Server error, automatically switched to "${nextServer.name}"`
    );
    setTimeout(() => setServerErrorMsg(''), 4000);
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  // Episode comments
  const episodeComments = comments.filter(
    (c) => c.targetType === 'episode' && c.targetId === episode.id
  );

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
    setDuration(videoRef.current.duration || 0);

    // Save watch history periodically
    if (Math.floor(videoRef.current.currentTime) % 10 === 0) {
      saveWatchProgress(
        episode.id,
        episode.animeId,
        Math.floor(videoRef.current.currentTime),
        Math.floor(videoRef.current.duration || 0)
      );
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = () => {
    const container = document.getElementById('dmx-player-container');
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleNextEpisode = () => {
    const animeEps = episodes.filter((e) => e.animeId === episode.animeId);
    const currentIndex = animeEps.findIndex((e) => e.id === episode.id);
    if (currentIndex < animeEps.length - 1) {
      setSelectedEpisodeId(animeEps[currentIndex + 1].id);
    }
  };

  const handlePrevEpisode = () => {
    const animeEps = episodes.filter((e) => e.animeId === episode.animeId);
    const currentIndex = animeEps.findIndex((e) => e.id === episode.id);
    if (currentIndex > 0) {
      setSelectedEpisodeId(animeEps[currentIndex - 1].id);
    }
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment('episode', episode.id, commentText);
    setCommentText('');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className={`space-y-8 pb-16 ${isTheaterMode ? 'bg-black p-4 rounded-3xl' : ''}`}>
      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 pt-4 flex justify-between items-center">
        <button
          onClick={() => setActiveView('anime-detail')}
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
          <span>Back to {language === 'ar' ? anime.titleAr : anime.title}</span>
        </button>

        <button
          onClick={() => setIsTheaterMode(!isTheaterMode)}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 border transition-all ${
            isTheaterMode
              ? 'bg-yellow-500 text-black border-yellow-500'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          <Monitor className="w-4 h-4" />
          <span>{isTheaterMode ? t('exitTheaterMode') : t('theaterMode')}</span>
        </button>
      </div>

      {serverErrorMsg && (
        <div className="max-w-6xl mx-auto px-4">
          <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold text-xs text-center animate-pulse">
            ⚡ {serverErrorMsg}
          </div>
        </div>
      )}

      {/* Main Video Player Canvas Container */}
      <div
        id="dmx-player-container"
        className={`relative mx-auto overflow-hidden rounded-2xl shadow-2xl border bg-black group transition-all ${
          isTheaterMode ? 'max-w-full' : 'max-w-6xl'
        }`}
        style={{ borderColor: `${activeTheme.primaryColor}40` }}
      >
        <video
          ref={videoRef}
          src={episode.videoUrl}
          className="w-full aspect-video object-contain cursor-pointer"
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onError={handleVideoError}
        />

        {/* Subtitles Overlay */}
        {selectedSub !== 'off' && (
          <div className="absolute bottom-16 left-0 right-0 text-center pointer-events-none px-6">
            <span className="inline-block px-4 py-1.5 rounded-lg bg-black/85 text-yellow-300 font-bold text-sm sm:text-base border border-yellow-500/30 shadow-2xl">
              {language === 'ar'
                ? `مشاهدة ممتعة - ${anime.titleAr} (الحلقة ${episode.episodeNumber}) - مترجم للعربية`
                : `Enjoy Watching - ${anime.title} (Episode ${episode.episodeNumber}) - Arabic Subtitled`}
            </span>
          </div>
        )}

        {/* Custom Controls Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
          {/* Progress Seek Bar */}
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-white/20 accent-yellow-400 cursor-pointer rounded-lg"
          />

          <div className="flex items-center justify-between text-xs font-mono text-white">
            {/* Left Controls */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <button onClick={togglePlay} className="p-2 rounded-lg hover:bg-white/20 transition-colors">
                {isPlaying ? <Pause className="w-5 h-5 text-yellow-400" /> : <Play className="w-5 h-5 fill-yellow-400 text-yellow-400" />}
              </button>

              <button onClick={handlePrevEpisode} className="p-2 rounded-lg hover:bg-white/20 transition-colors" title={t('prevEpisode')}>
                <SkipBack className="w-4 h-4 text-gray-300" />
              </button>

              <button onClick={handleNextEpisode} className="p-2 rounded-lg hover:bg-white/20 transition-colors" title={t('nextEpisode')}>
                <SkipForward className="w-4 h-4 text-gray-300" />
              </button>

              {/* Volume Slider */}
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <button onClick={toggleMute} className="p-1 hover:bg-white/20 rounded">
                  {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-white" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 accent-yellow-400 cursor-pointer"
                />
              </div>

              <span>
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Right Controls */}
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              {/* Quality & Settings Modal Trigger */}
              <div className="relative">
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className="p-2 rounded-lg hover:bg-white/20 text-yellow-400 transition-colors flex items-center gap-1"
                >
                  <Settings className="w-4 h-4" />
                </button>

                {isSettingsOpen && (
                  <div
                    className="absolute bottom-10 right-0 rtl:left-0 rtl:right-auto w-64 p-3 rounded-xl border shadow-2xl backdrop-blur-2xl text-xs space-y-3"
                    style={{ backgroundColor: activeTheme.cardBg, borderColor: `${activeTheme.primaryColor}50` }}
                  >
                    {/* Subtitles */}
                    <div>
                      <span className="block font-bold text-gray-400 mb-1 flex items-center gap-1">
                        <Subtitles className="w-3.5 h-3.5" />
                        {t('subtitles')}
                      </span>
                      <div className="grid grid-cols-3 gap-1">
                        {['ar', 'en', 'off'].map((sub) => (
                          <button
                            key={sub}
                            onClick={() => setSelectedSub(sub)}
                            className={`py-1 rounded text-[11px] font-bold border ${
                              selectedSub === sub ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-white/5 border-white/10'
                            }`}
                          >
                            {sub.toUpperCase()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Audio */}
                    <div>
                      <span className="block font-bold text-gray-400 mb-1 flex items-center gap-1">
                        <Languages className="w-3.5 h-3.5" />
                        {t('audioLanguage')}
                      </span>
                      <div className="grid grid-cols-2 gap-1">
                        {['jp', 'ar'].map((aud) => (
                          <button
                            key={aud}
                            onClick={() => setSelectedAudio(aud)}
                            className={`py-1 rounded text-[11px] font-bold border ${
                              selectedAudio === aud ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-white/5 border-white/10'
                            }`}
                          >
                            {aud === 'jp' ? 'JP Japanese' : 'AR Dub'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quality */}
                    <div>
                      <span className="block font-bold text-gray-400 mb-1">
                        {t('quality')}
                      </span>
                      <div className="grid grid-cols-3 gap-1">
                        {['4K', '1080p', '720p'].map((q) => (
                          <button
                            key={q}
                            onClick={() => setSelectedQuality(q)}
                            className={`py-1 rounded text-[11px] font-bold border ${
                              selectedQuality === q ? 'bg-yellow-500 text-black border-yellow-500' : 'bg-white/5 border-white/10'
                            }`}
                          >
                            {q}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Fullscreen */}
              <button onClick={toggleFullscreen} className="p-2 rounded-lg hover:bg-white/20 transition-colors">
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Episode Header & Info Bar */}
      <div className="max-w-6xl mx-auto px-4 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/10">
          <div>
            <h1 className="text-2xl font-black text-yellow-400">
              {language === 'ar' ? episode.titleAr : episode.title}
            </h1>
            <p className="text-xs text-gray-400 mt-1">
              {language === 'ar' ? anime.titleAr : anime.title} • Episode #{episode.episodeNumber} • {episode.views.toLocaleString()} Views
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
              Quality: {selectedQuality}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/10 text-gray-300">
              Audio: {selectedAudio.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Synopsis */}
        <p className="text-sm text-gray-300 leading-relaxed">
          {language === 'ar' ? episode.synopsisAr : episode.synopsis}
        </p>

        {/* Streaming Servers Selector Bar */}
        <div className="p-4 rounded-2xl border border-white/10 bg-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-black text-yellow-400 uppercase tracking-wider flex items-center gap-2">
              <Tv className="w-4 h-4" />
              <span>{language === 'ar' ? 'سيرفرات المشاهدة عالية السرعة (Streaming Servers)' : 'Fast Streaming Servers'}</span>
            </h3>
            <span className="text-[10px] font-mono text-gray-400">DMX Studio CDN</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {availableServers.map((srv) => (
              <button
                key={srv.id}
                onClick={() => setActiveServerId(srv.id)}
                className={`p-3 rounded-xl border text-left rtl:text-right transition-all cursor-pointer flex flex-col justify-between gap-1 ${
                  activeServerId === srv.id
                    ? 'border-yellow-400 bg-yellow-400/20 text-white shadow-lg'
                    : 'border-white/10 bg-black/40 text-gray-400 hover:border-white/30 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white truncate">
                    {language === 'ar' ? srv.nameAr : srv.name}
                  </span>
                  {activeServerId === srv.id && <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />}
                </div>
                <span className="text-[10px] text-yellow-400 font-mono font-bold">
                  {srv.speed}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Episode Selector Grid */}
        <div className="space-y-3 pt-6">
          <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: activeTheme.textPrimary }}>
            <Tv className="w-5 h-5 text-yellow-400" />
            <span>{t('episodesList')}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {episodes
              .filter((e) => e.animeId === episode.animeId)
              .map((ep) => (
                <div
                  key={ep.id}
                  onClick={() => setSelectedEpisodeId(ep.id)}
                  className={`p-3 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${
                    ep.id === episode.id
                      ? 'border-yellow-500 bg-yellow-500/10'
                      : 'border-white/10 bg-white/5 hover:border-white/30'
                  }`}
                >
                  <img
                    src={ep.thumbnail}
                    alt={ep.title}
                    className="w-16 h-10 object-cover rounded-md"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="text-xs font-bold block line-clamp-1">
                      {language === 'ar' ? ep.titleAr : ep.title}
                    </span>
                    <span className="text-[10px] text-gray-400">{ep.duration}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-6 pt-8 border-t border-white/10">
          <h3 className="text-xl font-extrabold flex items-center gap-2" style={{ color: activeTheme.textPrimary }}>
            <MessageSquare className="w-5 h-5 text-yellow-400" />
            <span>{t('comments')} ({episodeComments.length})</span>
          </h3>

          {/* Leave Comment Form */}
          <form onSubmit={handlePostComment} className="flex gap-3">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder={t('leaveComment')}
              className="flex-1 px-4 py-3 rounded-xl border bg-white/5 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
              style={{ borderColor: `${activeTheme.primaryColor}30`, color: activeTheme.textPrimary }}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2"
              style={{ backgroundColor: activeTheme.primaryColor, color: '#000' }}
            >
              <Send className="w-4 h-4" />
              <span>{t('postComment')}</span>
            </button>
          </form>

          {/* Comment List */}
          <div className="space-y-3">
            {episodeComments.length === 0 ? (
              <p className="text-xs text-gray-400 py-4 text-center">{t('noCommentsYet')}</p>
            ) : (
              episodeComments.map((c) => (
                <div key={c.id} className="p-4 rounded-xl border bg-white/5 border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <img src={c.userAvatar} alt={c.userName} className="w-7 h-7 rounded-full object-cover" />
                      <span className="font-bold text-yellow-400">{c.userName}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
                        {c.userRole}
                      </span>
                    </div>
                    <span className="text-gray-400">{c.createdAt}</span>
                  </div>

                  <p className="text-xs text-gray-200">{c.content}</p>

                  <div className="flex items-center gap-4 text-[11px] pt-1 text-gray-400">
                    <button
                      onClick={() => upvoteComment(c.id)}
                      className="flex items-center gap-1 hover:text-yellow-400 transition-colors"
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${c.isUpvoted ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                      <span>{c.upvotes} {t('upvote')}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
