import React, { useState, useEffect, useRef } from 'react';
import { useStudio } from '../context/StudioContext';
import { VerifiedBadge } from './VerifiedBadge';
import {
  X,
  Send,
  Clock,
  Image as ImageIcon,
  MessageSquare,
  Sparkles,
  Search,
  Phone,
  Video,
  ChevronLeft,
  Circle,
  User as UserIcon,
} from 'lucide-react';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80';

export const PrivateChatModal: React.FC = () => {
  const {
    isChatModalOpen,
    setIsChatModalOpen,
    chatRecipientUser,
    setChatRecipientUser,
    chatMessages,
    sendChatMessage,
    currentUser,
    usersList,
    activeTheme,
    language,
  } = useStudio();

  const [messageContent, setMessageContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [selectedRecipientId, setSelectedRecipientId] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Available contacts (excluding logged-in user)
  const otherUsers = usersList.filter((u) => u.id !== currentUser?.id && u.username !== currentUser?.username);

  // Set default recipient on open or recipient change
  useEffect(() => {
    if (chatRecipientUser) {
      setSelectedRecipientId(chatRecipientUser.id);
      setShowMobileSidebar(false);
    } else if (!selectedRecipientId && otherUsers.length > 0) {
      setSelectedRecipientId(otherUsers[0].id);
    }
  }, [chatRecipientUser, otherUsers, isChatModalOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatModalOpen, selectedRecipientId]);

  if (!isChatModalOpen || !currentUser) return null;

  const activeRecipientUser = usersList.find((u) => u.id === selectedRecipientId) || otherUsers[0];

  // STRICT 1-ON-1 PRIVACY:
  // Only filter messages strictly sent between currentUser and selectedRecipientId
  const conversationMessages = chatMessages.filter((msg) => {
    if (!selectedRecipientId) return false;
    const isFromMeToThem = msg.senderId === currentUser.id && msg.recipientId === selectedRecipientId;
    const isFromThemToMe = msg.senderId === selectedRecipientId && msg.recipientId === currentUser.id;
    return isFromMeToThem || isFromThemToMe;
  });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageContent.trim() && !mediaUrl) return;
    if (!selectedRecipientId && activeRecipientUser) {
      setSelectedRecipientId(activeRecipientUser.id);
    }
    const targetId = selectedRecipientId || activeRecipientUser?.id;
    if (!targetId) return;

    await sendChatMessage(targetId, messageContent.trim(), mediaUrl.trim() || undefined);
    setMessageContent('');
    setMediaUrl('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      setMediaUrl(event.target?.result as string);
      setIsUploading(false);
    };
    reader.onerror = () => setIsUploading(false);
    reader.readAsDataURL(file);
  };

  // Filter contacts by search query
  const filteredUsers = otherUsers.filter((u) =>
    u.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-5xl h-[100vh] sm:h-[90vh] sm:rounded-3xl border shadow-2xl flex flex-col md:flex-row overflow-hidden"
        style={{
          backgroundColor: '#0f172a',
          borderColor: `${activeTheme.primaryColor}40`,
        }}
      >
        {/* Sidebar: Messenger Contacts & Conversations */}
        <div
          className={`${
            showMobileSidebar ? 'flex' : 'hidden md:flex'
          } w-full md:w-80 border-b md:border-b-0 md:border-r rtl:md:border-r-0 rtl:md:border-l border-white/10 bg-slate-950/80 flex-col shrink-0`}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold">
                <MessageSquare className="w-5 h-5" />
              </div>
              <h2 className="font-extrabold text-lg text-white">
                {language === 'ar' ? 'المراسلات الخاصة' : 'Private Direct Chats'}
              </h2>
            </div>

            <button
              onClick={() => {
                setIsChatModalOpen(false);
                setChatRecipientUser(null);
              }}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Contact Search Box */}
          <div className="p-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute top-3 left-3 rtl:right-3 rtl:left-auto text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'ar' ? 'بحث في الأعضاء...' : 'Search members...'}
                className="w-full pl-9 rtl:pr-9 rtl:pl-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-gray-400 text-xs focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          {/* Active Online Row */}
          <div className="px-3 py-2 border-b border-white/5 flex items-center gap-3 overflow-x-auto no-scrollbar">
            {otherUsers.map((u) => (
              <div
                key={u.id}
                onClick={() => {
                  setSelectedRecipientId(u.id);
                  setShowMobileSidebar(false);
                }}
                className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
              >
                <div className="relative">
                  <img
                    src={u.avatar || DEFAULT_AVATAR}
                    alt={u.username}
                    className="w-12 h-12 rounded-full object-cover border-2 border-blue-500/50 group-hover:border-blue-400 transition-all"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                    }}
                  />
                  <span className="w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full absolute bottom-0 right-0" />
                </div>
                <span className="text-[10px] text-gray-300 font-medium truncate max-w-[60px]">
                  {u.username}
                </span>
              </div>
            ))}
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredUsers.length === 0 ? (
              <div className="p-6 text-center text-xs text-gray-400 space-y-1">
                <UserIcon className="w-8 h-8 mx-auto text-gray-500 opacity-50" />
                <p>{language === 'ar' ? 'لا يوجد أعضاء آخرين للدردشة' : 'No other members found'}</p>
              </div>
            ) : (
              filteredUsers.map((u) => {
                const isSelected = selectedRecipientId === u.id;
                return (
                  <button
                    key={u.id}
                    onClick={() => {
                      setSelectedRecipientId(u.id);
                      setShowMobileSidebar(false);
                    }}
                    className={`w-full p-3 rounded-2xl flex items-center gap-3 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600/25 border border-blue-500/40 text-white'
                        : 'hover:bg-white/5 text-gray-300'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={u.avatar || DEFAULT_AVATAR}
                        alt={u.username}
                        className="w-12 h-12 rounded-full object-cover border border-white/10"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                        }}
                      />
                      <span className="w-3.5 h-3.5 bg-green-500 border-2 border-slate-900 rounded-full absolute bottom-0 right-0" />
                    </div>

                    <div className="flex-1 min-w-0 text-left rtl:text-right">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm truncate flex items-center gap-1 text-white">
                          <span>{u.username}</span>
                          <VerifiedBadge role={u.role} isVerified={u.isVerified} size="sm" showText={false} />
                        </span>
                      </div>
                      <div className="text-xs text-gray-400 truncate flex items-center gap-1 mt-0.5">
                        <span className="text-blue-400 font-medium">محادثة خاصة 1x1</span>
                        <span>•</span>
                        <span>{u.role}</span>
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Main Messenger Chat Pane */}
        <div
          className={`${
            !showMobileSidebar ? 'flex' : 'hidden md:flex'
          } flex-1 flex-col bg-slate-900/60 overflow-hidden relative`}
        >
          {/* Active Chat Header Bar (Messenger Style - Clean, NO EMAIL) */}
          <div className="p-3.5 px-4 border-b border-white/10 bg-slate-950/80 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              {/* Mobile Back Button */}
              <button
                onClick={() => setShowMobileSidebar(true)}
                className="md:hidden p-1.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white"
              >
                <ChevronLeft className="w-5 h-5 rtl:rotate-180" />
              </button>

              {activeRecipientUser ? (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={activeRecipientUser.avatar || DEFAULT_AVATAR}
                      alt={activeRecipientUser.username}
                      className="w-10 h-10 rounded-full object-cover border border-blue-500/40"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                      }}
                    />
                    <span className="w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full absolute bottom-0 right-0" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white flex items-center gap-1.5">
                      <span>{activeRecipientUser.username}</span>
                      <VerifiedBadge
                        role={activeRecipientUser.role}
                        isVerified={activeRecipientUser.isVerified}
                        size="sm"
                      />
                    </h3>
                    <p className="text-[11px] text-green-400 font-medium flex items-center gap-1">
                      <Circle className="w-2 h-2 fill-green-400" />
                      <span>{language === 'ar' ? 'نشط الآن (محادثة خاصة سرية)' : 'Active now (Private 1-on-1)'}</span>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-sm font-bold text-gray-400">
                  {language === 'ar' ? 'اختر عضواً للمحادثة' : 'Select a member to chat'}
                </div>
              )}
            </div>

            {/* Messenger Right Actions */}
            <div className="flex items-center gap-2">
              <span className="hidden lg:flex px-2.5 py-1 rounded-full border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 text-[11px] font-bold items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'تُمحى كل 9h' : 'Deletes in 9h'}</span>
              </span>

              <button className="p-2 rounded-full bg-white/5 border border-white/10 text-blue-400 hover:bg-white/10 transition-colors">
                <Phone className="w-4 h-4" />
              </button>

              <button className="p-2 rounded-full bg-white/5 border border-white/10 text-blue-400 hover:bg-white/10 transition-colors">
                <Video className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setIsChatModalOpen(false);
                  setChatRecipientUser(null);
                }}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Thread Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {conversationMessages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <Sparkles className="w-8 h-8 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-base text-white">
                    {language === 'ar'
                      ? `بدء محادثة خاصة وسرية مع ${activeRecipientUser?.username || 'العضو'}`
                      : `Private direct conversation with ${activeRecipientUser?.username || 'member'}`}
                  </h4>
                  <p className="text-xs text-gray-400 max-w-xs mt-1">
                    {language === 'ar'
                      ? 'هذه المحادثة خاصة 100% بينكما فقط ولا يمكن لأي شخص آخر الاطلاع عليها. تُحذف تلقائياً بعد 9 ساعات.'
                      : 'This conversation is 100% private between both of you. Self-destructs in 9 hours.'}
                  </p>
                </div>
              </div>
            ) : (
              conversationMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                const hoursLeft = Math.max(
                  0,
                  Math.floor((9 * 60 * 60 * 1000 - (Date.now() - msg.timestampMs)) / (1000 * 60 * 60))
                );
                const minsLeft = Math.max(
                  0,
                  Math.floor(
                    ((9 * 60 * 60 * 1000 - (Date.now() - msg.timestampMs)) % (1000 * 60 * 60)) / (1000 * 60)
                  )
                );

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 max-w-[80%] ${
                      isMe ? 'ml-auto flex-row-reverse' : 'mr-auto'
                    }`}
                  >
                    {!isMe && (
                      <img
                        src={msg.senderAvatar || DEFAULT_AVATAR}
                        alt={msg.senderName}
                        className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0 mb-1"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                        }}
                      />
                    )}

                    <div className={`space-y-1 ${isMe ? 'items-end text-right' : 'items-start text-left'}`}>
                      {!isMe && (
                        <div className="flex items-center gap-1 text-[10px] font-bold text-gray-400 px-1">
                          <span>{msg.senderName}</span>
                          <VerifiedBadge role={msg.senderRole} isVerified={msg.senderVerified} size="sm" showText={false} />
                        </div>
                      )}

                      <div
                        className={`p-3.5 px-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-lg space-y-2 ${
                          isMe
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-br-sm'
                            : 'bg-slate-800 text-gray-100 border border-white/10 rounded-bl-sm'
                        }`}
                      >
                        {msg.content && <p className="whitespace-pre-wrap break-words">{msg.content}</p>}

                        {msg.mediaUrl && (
                          <img
                            src={msg.mediaUrl}
                            alt="attachment"
                            className="max-w-full max-h-60 rounded-2xl object-cover border border-white/20 mt-1"
                            referrerPolicy="no-referrer"
                          />
                        )}

                        <div className="flex items-center justify-between gap-3 text-[9px] text-white/70 pt-1 font-mono">
                          <span>{msg.createdAt}</span>
                          <span className="flex items-center gap-1 text-yellow-300">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{`${hoursLeft}h ${minsLeft}m`}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Messenger Bottom Bar Input */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-white/10 bg-slate-950/90 flex flex-col gap-2"
          >
            {mediaUrl && (
              <div className="relative inline-block border rounded-2xl overflow-hidden bg-black/50 p-1 w-24">
                <img src={mediaUrl} alt="Preview" className="h-20 rounded-xl object-cover" />
                <button
                  type="button"
                  onClick={() => setMediaUrl('')}
                  className="absolute top-1 right-1 p-1 bg-red-600 rounded-full text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <div className="flex items-center gap-2">
              <label className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-blue-400 cursor-pointer shrink-0 transition-all">
                <ImageIcon className="w-5 h-5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>

              <div className="flex-1 relative">
                <input
                  type="text"
                  value={messageContent}
                  onChange={(e) => setMessageContent(e.target.value)}
                  placeholder={
                    language === 'ar'
                      ? `اكتب رسالة خاصة إلى ${activeRecipientUser?.username || 'العضو'}...`
                      : `Private message to ${activeRecipientUser?.username || 'member'}...`
                  }
                  className="w-full px-4 py-2.5 rounded-full bg-slate-800/90 border border-white/10 text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={!messageContent.trim() && !mediaUrl}
                className="p-2.5 px-4 rounded-full font-bold text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center gap-2 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer hover:scale-105 active:scale-95"
              >
                <Send className="w-4 h-4 fill-white" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
