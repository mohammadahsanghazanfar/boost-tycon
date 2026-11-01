import React, { useEffect } from 'react';
import { ProjectItem } from '../types';
import { X, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenQuote: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onOpenQuote
}) => {
  useEffect(() => {
    if (!project) return;

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
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        className="bg-[#141716] rounded-[36px] w-full max-w-3xl overflow-hidden shadow-2xl border border-white/10 relative max-h-[90vh] flex flex-col text-[#F5F5F4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image with close button */}
        <div className="relative aspect-[16/9] w-full bg-[#0A0C0B] overflow-hidden border-b border-white/10">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0B] via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            aria-label="Close project modal"
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-[#C6FF00] hover:text-[#0A0C0B] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
            <span className="bg-[#C6FF00] text-[#0A0C0B] text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full inline-block">
              {project.tag}
            </span>
            <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase italic">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Key Metric Banner */}
          <div className="p-4 rounded-2xl bg-[#1E2220] border border-[#C6FF00]/40 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#C6FF00] text-[#0A0C0B] flex items-center justify-center font-black shrink-0">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <span className="text-[10px] font-black text-[#C6FF00] uppercase tracking-widest block">
                Headline Campaign Result
              </span>
              <span className="text-base font-black text-white uppercase tracking-tight">
                {project.results}
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/50">
              The Strategic Challenge & Execution
            </h4>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
              {project.description}
            </p>
          </div>

          {/* Deliverables */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-white/50">
              Deliverables & Strategy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.deliverables.map((del, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-bold text-white bg-[#1E2220] p-3 rounded-xl border border-white/10">
                  <CheckCircle2 className="w-4 h-4 text-[#C6FF00] shrink-0" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Action */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-white/50">
              Client: <strong className="text-white font-bold">{project.client}</strong> • Year: <strong className="text-[#C6FF00] font-mono">{project.year}</strong>
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenQuote();
              }}
              className="inline-flex items-center gap-2 bg-[#C6FF00] hover:bg-[#b2e600] text-[#0A0C0B] px-8 py-3 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              <span>Get Similar Results</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
