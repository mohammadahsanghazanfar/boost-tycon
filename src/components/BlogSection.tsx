import React from 'react';
import { BLOG_POSTS } from '../data/mockData';
import { BlogPost } from '../types';
import { ArrowUpRight, Clock } from 'lucide-react';

interface BlogSectionProps {
  onSelectBlog: (post: BlogPost) => void;
  onOpenQuote: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onSelectBlog, onOpenQuote }) => {
  return (
    <section id="blogs" className="py-20 md:py-32 bg-[#0A0C0B] text-[#F5F5F4] relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141716] border border-white/10 text-[#C6FF00] text-xs font-extrabold uppercase tracking-widest">
              <span>✦</span>
              <span>Publications // Insights</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white uppercase italic leading-tight">
              What Do Our <br className="hidden sm:inline" />
              <span className="text-[#C6FF00] not-italic">Innovators & Experts</span> Recommend?
            </h2>
          </div>

          <div>
            <button
              onClick={() => onOpenQuote()}
              className="inline-flex items-center gap-2 bg-[#141716] hover:bg-[#1E2220] text-white hover:text-[#C6FF00] px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-200 border border-white/10 hover:border-[#C6FF00]/50 group cursor-pointer"
            >
              <span>View All Publications</span>
              <ArrowUpRight className="w-4 h-4 text-[#C6FF00] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* 3 Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectBlog(post)}
              className="bg-[#141716] rounded-[32px] overflow-hidden border border-white/10 hover:border-[#C6FF00]/60 transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#0A0C0B]/90 backdrop-blur-sm text-[#C6FF00] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full border border-white/10">
                      {post.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="flex items-center gap-4 text-xs text-white/40 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white group-hover:text-[#C6FF00] transition-colors leading-snug uppercase">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/60 leading-relaxed font-light line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Read More Footer */}
              <div className="px-6 sm:px-7 pb-6 pt-3 flex items-center justify-between border-t border-white/10">
                <span className="text-xs font-black uppercase tracking-widest text-[#C6FF00] group-hover:underline flex items-center gap-1.5">
                  Read Article
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
