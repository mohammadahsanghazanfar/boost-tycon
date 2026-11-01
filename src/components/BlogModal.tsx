import React, { useEffect } from 'react';
import { BlogPost } from '../types';
import { X, Calendar, Clock, User, ArrowUpRight } from 'lucide-react';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({
  post,
  onClose,
  onOpenQuote
}) => {
  useEffect(() => {
    if (!post) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="blog-modal-title"
    >
      <div
        className="bg-[#141716] rounded-[36px] w-full max-w-3xl overflow-hidden shadow-2xl border border-white/10 relative max-h-[90vh] flex flex-col text-[#F5F5F4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative aspect-[16/8] w-full bg-[#0A0C0B] overflow-hidden border-b border-white/10">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0B] via-black/40 to-transparent" />

          <button
            onClick={onClose}
            aria-label="Close article modal"
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-[#C6FF00] hover:text-[#0A0C0B] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="bg-[#C6FF00] text-[#0A0C0B] text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full inline-block">
              {post.tag}
            </span>
            <h3 id="blog-modal-title" className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight uppercase italic">
              {post.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex items-center gap-6 text-xs text-white/50 border-b border-white/10 pb-4 font-mono">
            <span className="flex items-center gap-1.5 font-medium">
              <User className="w-3.5 h-3.5" />
              {post.author}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-white/70 leading-relaxed font-light">
            <p className="font-bold text-white uppercase text-base">
              {post.excerpt}
            </p>
            <p>
              {post.content}
            </p>
            <p>
              By aligning audience psychology with data-informed creative formats, forward-thinking brands unlock sustained organic discovery and paid media efficiency simultaneously. Continuous experimentation, first-party data capture, and transparent performance attribution are the three foundational pillars of modern marketing scalability.
            </p>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-white/50">
              Want personalized growth strategies for your enterprise?
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="inline-flex items-center gap-2 bg-[#C6FF00] hover:bg-[#b2e600] text-[#0A0C0B] px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <span>Speak to {post.author}</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
