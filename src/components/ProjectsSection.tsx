import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/mockData';
import { ProjectItem } from '../types';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenQuote: () => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  onSelectProject,
  onOpenQuote
}) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Social Media Marketing', 'Search Engine Marketing', 'Paid Advertising', 'Brand Strategy'];

  const filteredProjects =
    activeCategory === 'All'
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter(
          (p) => p.category === activeCategory || p.tag.includes(activeCategory)
        );

  return (
    <section id="projects" className="py-20 md:py-32 bg-[#0A0C0B] text-[#F5F5F4] relative overflow-hidden border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141716] border border-white/10 text-[#C6FF00] text-xs font-extrabold uppercase tracking-widest">
            <span>✦</span>
            <span>PROOF, NOT PROMISES.</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase italic leading-tight">
            Real Campaigns. Real Revenue. <br />
            <span className="text-[#C6FF00] not-italic">Real Proof.</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed">
            Don&apos;t take our word for it — take the numbers. Here&apos;s how we&apos;ve helped brands across real estate, healthcare, fitness, and fashion turn marketing spend into measurable growth.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#C6FF00] text-[#0A0C0B] shadow-[0_0_20px_rgba(198,255,0,0.25)]'
                  : 'bg-[#141716] text-white/70 hover:text-[#C6FF00] border border-white/10 hover:border-[#C6FF00]/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2x2 Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="bg-[#141716] rounded-[36px] overflow-hidden border border-white/10 hover:border-[#C6FF00]/60 transition-all duration-300 hover:shadow-[0_0_40px_rgba(198,255,0,0.15)] group cursor-pointer flex flex-col justify-between"
            >
              {/* Image Preview */}
              <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Tag Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="bg-[#0A0C0B]/90 backdrop-blur-md text-[#C6FF00] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-white/10">
                    {project.tag}
                  </span>
                </div>

                {/* Floating Results Pill */}
                <div className="absolute bottom-4 left-4 z-10">
                  <span className="bg-[#C6FF00] text-[#0A0C0B] text-xs font-black uppercase tracking-wider px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-md">
                    <Sparkles className="w-3.5 h-3.5 fill-current" />
                    {project.results}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 sm:p-8 flex items-start justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-[11px] font-extrabold text-white/40 uppercase tracking-widest">
                    {project.client} • {project.year}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase group-hover:text-[#C6FF00] transition-colors leading-snug">
                    {project.title}
                  </h3>
                </div>

                {/* Lime Arrow Action */}
                <div className="w-12 h-12 rounded-full bg-[#1E2220] group-hover:bg-[#C6FF00] text-[#C6FF00] group-hover:text-[#0A0C0B] flex items-center justify-center shrink-0 transition-all duration-200 border border-white/10 group-hover:border-transparent">
                  <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <button
            onClick={() => onOpenQuote()}
            className="inline-flex items-center gap-2 bg-[#C6FF00] hover:bg-[#b2e600] text-[#0A0C0B] px-8 py-4 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_25px_rgba(198,255,0,0.2)] hover:shadow-[0_0_35px_rgba(198,255,0,0.35)] cursor-pointer group"
          >
            <span>Initiate My Project</span>
            <ArrowUpRight className="w-4 h-4 stroke-[3] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </section>
  );
};
