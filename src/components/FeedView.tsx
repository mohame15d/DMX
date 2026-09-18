import React, { useState } from 'react';
import { useStudio } from '../context/StudioContext';
import { CommunityPost } from '../types';
import {
  MessageSquare,
  Heart,
  ThumbsUp,
  Share2,
  Image as ImageIcon,
  Send,
  Sparkles,
  Smile,
  Trash2,
  User as UserIcon,
  ShieldCheck,
} from 'lucide-react';

import { VerifiedBadge } from './VerifiedBadge';

const POPULAR_EMOJIS = ['😊', '🔥', '❤️', '👍', '🥳', '👏', '🎌', '⚔️', '⚡', '🎬', '🍿', '😮', '😂'];
const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80';

export const FeedView: React.FC = () => {
  const {
    language,
    activeTheme,
    currentUser,
    posts,
    addPost,
    toggleLikePost,
    addReactionToPost,
    deletePost,
    comments,
    addComment,
    upvoteComment,
    deleteComment,
    setIsAuthModalOpen,
    usersList,
  } = useStudio();

  // Post Creator State
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostMedia, setNewPostMedia] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Active post comments toggle
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  const [showCommentEmojiPicker, setShowCommentEmojiPicker] = useState(false);

  // File Upload Handler for Post Media
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setNewPostMedia(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!newPostContent.trim() && !newPostMedia) return;

    addPost(newPostContent, newPostMedia);
    setNewPostContent('');
    setNewPostMedia('');
    setShowEmojiPicker(false);
  };

  const handleInsertEmojiToPost = (emoji: string) => {
    setNewPostContent((prev) => prev + emoji);
  };

  const handleInsertEmojiToComment = (emoji: string) => {
    setCommentInput((prev) => prev + emoji);
  };

  const handleAddCommentToPost = (postId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    if (!commentInput.trim()) return;

    addComment('news', postId, commentInput);
    setCommentInput('');
    setShowCommentEmojiPicker(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-8">
      {/* Community Banner */}
      <div
        className="p-6 rounded-3xl border shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{
          backgroundColor: activeTheme.cardBg,
          borderColor: `${activeTheme.primaryColor}40`,
        }}
      >
        <div className="space-y-1 text-center sm:text-left rtl:sm:text-right z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 text-[11px] font-mono font-bold uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'مجتمع DMX™ الرسمي' : 'DMX™ Social Feed'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black" style={{ color: activeTheme.textPrimary }}>
            {language === 'ar' ? 'منشورات ومناقشات الأنمي' : 'Anime Community Feed'}
          </h1>
          <p className="text-xs text-gray-400">
            {language === 'ar'
              ? 'شارك أفكارك، منشوراتك، والتسريبات والتفاعل بالإيموجيات والتعليقات!'
              : 'Share posts, thoughts, news, and react with emojis & comments!'}
          </p>
        </div>
      </div>

      {/* Post Creator Box (Facebook Style) */}
      <div
        className="p-5 sm:p-6 rounded-3xl border shadow-2xl space-y-4"
        style={{
          backgroundColor: activeTheme.cardBg,
          borderColor: `${activeTheme.primaryColor}30`,
        }}
      >
        <div className="flex items-center gap-3">
          {currentUser ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.username}
              className="w-11 h-11 rounded-2xl object-cover border-2 border-yellow-500/50 shadow-md"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center text-gray-400">
              <UserIcon className="w-6 h-6" />
            </div>
          )}

          <div className="flex-1">
            <h4 className="font-bold text-sm" style={{ color: activeTheme.textPrimary }}>
              {currentUser
                ? currentUser.username
                : language === 'ar'
                ? 'زائر (سجل دخولك للنشر)'
                : 'Guest (Log in to post)'}
            </h4>
            <span className="text-[10px] text-gray-400 font-mono">
              {currentUser ? currentUser.role : 'Guest View'}
            </span>
          </div>
        </div>

        <form onSubmit={handleCreatePost} className="space-y-3">
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder={
              language === 'ar'
                ? 'ماذا يدور في ذهنك بخصوص انميات DMX اليوم؟'
                : "What's on your mind about DMX anime today?"
            }
            rows={3}
            className="w-full p-4 rounded-2xl border bg-black/40 text-sm focus:outline-none focus:border-yellow-400 transition-colors resize-none"
            style={{
              borderColor: `${activeTheme.primaryColor}30`,
              color: activeTheme.textPrimary,
            }}
          />

          {/* Media Preview if attached */}
          {newPostMedia && (
            <div className="relative rounded-2xl overflow-hidden border border-white/20 max-h-60 bg-black">
              <img src={newPostMedia} alt="Post Attachment" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setNewPostMedia('')}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-black/80 text-white hover:bg-red-600 transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Toolbar Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/10">
            <div className="flex items-center gap-2">
              {/* Media File Input */}
              <label className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 flex items-center gap-1.5 cursor-pointer transition-colors">
                <ImageIcon className="w-4 h-4 text-yellow-400" />
                <span>{language === 'ar' ? 'إرفاق صورة' : 'Attach Image'}</span>
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>

              {/* Emoji Picker Button */}
              <button
                type="button"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Smile className="w-4 h-4 text-yellow-400" />
                <span>{language === 'ar' ? 'إيموجي' : 'Emoji'}</span>
              </button>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl font-extrabold text-xs shadow-xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
              style={{
                backgroundColor: activeTheme.primaryColor,
                color: '#000',
              }}
            >
              <Send className="w-4 h-4 rtl:rotate-180" />
              <span>{language === 'ar' ? 'نشر المنشور' : 'Publish Post'}</span>
            </button>
          </div>

          {/* Emoji Toolbar Quick Bar */}
          {showEmojiPicker && (
            <div className="p-3 rounded-2xl border border-white/10 bg-black/60 flex flex-wrap gap-2 text-xl">
              {POPULAR_EMOJIS.map((emoji, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleInsertEmojiToPost(emoji)}
                  className="hover:scale-125 transition-transform p-1 cursor-pointer"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="p-8 rounded-3xl border border-white/10 text-center text-gray-400 text-sm">
            {language === 'ar'
              ? 'لا توجد منشورات حالياً. كن أول من ينشر في مجتمع DMX!'
              : 'No posts yet. Be the first to share a post in the DMX community!'}
          </div>
        ) : (
          posts.map((post: CommunityPost) => {
            const isLiked = currentUser ? post.likedBy?.includes(currentUser.id) : false;
            const postComments = comments.filter((c) => c.targetId === post.id);

            return (
              <div
                key={post.id}
                className="p-5 sm:p-6 rounded-3xl border shadow-2xl space-y-4 backdrop-blur-xl transition-all"
                style={{
                  backgroundColor: activeTheme.cardBg,
                  borderColor: `${activeTheme.primaryColor}25`,
                }}
              >
                {/* Author Info */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {(() => {
                      const authorUser = usersList.find((u) => u.username === post.userName || u.id === post.userId);
                      const displayAvatar = authorUser?.avatar || post.userAvatar || DEFAULT_AVATAR;
                      return (
                        <img
                          src={displayAvatar}
                          alt={post.userName}
                          className="w-10 h-10 rounded-2xl object-cover border border-yellow-500/40"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                          }}
                        />
                      );
                    })()}
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm" style={{ color: activeTheme.textPrimary }}>
                          {post.userName}
                        </h4>
                        {(() => {
                          const authorUser = usersList.find((u) => u.username === post.userName);
                          return (
                            <VerifiedBadge
                              role={authorUser?.role || post.userRole}
                              isVerified={authorUser?.isVerified ?? true}
                              size="sm"
                            />
                          );
                        })()}
                      </div>
                      <span className="text-[10px] text-gray-400 font-mono">{post.createdAt}</span>
                    </div>
                  </div>

                  {currentUser && (currentUser.id === post.userId || currentUser.role === 'Owner') && (
                    <button
                      onClick={() => deletePost(post.id)}
                      className="p-2 rounded-xl text-gray-400 hover:text-red-400 hover:bg-white/5 transition-colors cursor-pointer"
                      title="Delete Post"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Post Content */}
                <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: activeTheme.textPrimary }}>
                  {post.content}
                </p>

                {/* Media Attachment */}
                {post.mediaUrl && (
                  <div className="rounded-2xl overflow-hidden border border-white/10 max-h-96 bg-black">
                    <img
                      src={post.mediaUrl}
                      alt="Post Attachment"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                {/* Reaction Quick Stats & Emoji Buttons */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 text-xs text-gray-400">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleLikePost(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                        isLiked
                          ? 'border-red-500/50 bg-red-500/20 text-red-400 font-bold'
                          : 'border-white/10 bg-white/5 hover:bg-white/10 text-gray-300'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      <span>{post.likes || 0}</span>
                    </button>

                    {/* Emoji Reaction Pills */}
                    <div className="flex items-center gap-1">
                      {['❤️', '🔥', '👍', '😮', '😂'].map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => addReactionToPost(post.id, emoji)}
                          className="px-2 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/15 text-xs transition-transform hover:scale-115 cursor-pointer"
                        >
                          {emoji} {post.reactions?.[emoji] || 0}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setActiveCommentPostId(activeCommentPostId === post.id ? null : post.id)
                    }
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-gray-300 cursor-pointer font-bold"
                  >
                    <MessageSquare className="w-4 h-4 text-yellow-400" />
                    <span>
                      {language === 'ar'
                        ? `التعليقات (${postComments.length})`
                        : `Comments (${postComments.length})`}
                    </span>
                  </button>
                </div>

                {/* Comments Section Toggle */}
                {activeCommentPostId === post.id && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
                    {/* Comment Input */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        placeholder={
                          language === 'ar' ? 'اكتب تعليقك مع إيموجيات...' : 'Write a comment with emojis...'
                        }
                        className="flex-1 px-4 py-2.5 rounded-xl border bg-black/40 text-xs text-white focus:outline-none focus:border-yellow-400"
                        style={{ borderColor: `${activeTheme.primaryColor}30` }}
                      />

                      <button
                        type="button"
                        onClick={() => setShowCommentEmojiPicker(!showCommentEmojiPicker)}
                        className="px-3 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold text-yellow-400 cursor-pointer"
                      >
                        😊
                      </button>

                      <button
                        onClick={() => handleAddCommentToPost(post.id)}
                        className="px-4 py-2.5 rounded-xl font-extrabold text-xs bg-yellow-500 text-black hover:bg-yellow-400 cursor-pointer flex items-center gap-1"
                      >
                        <Send className="w-3.5 h-3.5 rtl:rotate-180" />
                      </button>
                    </div>

                    {showCommentEmojiPicker && (
                      <div className="p-2 rounded-xl border border-white/10 bg-black/80 flex flex-wrap gap-2 text-lg">
                        {POPULAR_EMOJIS.map((emoji, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleInsertEmojiToComment(emoji)}
                            className="hover:scale-125 transition-transform cursor-pointer"
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Comments List */}
                    <div className="space-y-2">
                      {postComments.length === 0 ? (
                        <p className="text-xs text-gray-400 py-2">
                          {language === 'ar' ? 'لا توجد تعليقات بعد.' : 'No comments yet.'}
                        </p>
                      ) : (
                        postComments.map((comment) => (
                          <div
                            key={comment.id}
                            className="p-3 rounded-2xl border border-white/10 bg-white/5 flex items-start justify-between gap-3 text-xs"
                          >
                            <div className="flex items-start gap-2.5">
                              {(() => {
                                const commentUser = usersList.find((u) => u.username === comment.userName);
                                const avatarSrc = commentUser?.avatar || comment.userAvatar || DEFAULT_AVATAR;
                                return (
                                  <img
                                    src={avatarSrc}
                                    alt={comment.userName}
                                    className="w-7 h-7 rounded-xl object-cover"
                                    referrerPolicy="no-referrer"
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = DEFAULT_AVATAR;
                                    }}
                                  />
                                );
                              })()}
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-white">{comment.userName}</span>
                                  {(() => {
                                    const commentUser = usersList.find((u) => u.username === comment.userName);
                                    return (
                                      <VerifiedBadge
                                        role={commentUser?.role || 'User'}
                                        isVerified={commentUser?.isVerified ?? false}
                                        size="sm"
                                      />
                                    );
                                  })()}
                                  <span className="text-[10px] text-gray-400 font-mono">
                                    {comment.createdAt}
                                  </span>
                                </div>
                                <p className="text-gray-300 mt-0.5">{comment.content}</p>
                              </div>
                            </div>

                            <button
                              onClick={() => upvoteComment(comment.id)}
                              className="px-2 py-1 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-[11px] font-bold text-yellow-400 flex items-center gap-1 cursor-pointer"
                            >
                              <ThumbsUp className="w-3 h-3" />
                              <span>{comment.upvotes || 0}</span>
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
