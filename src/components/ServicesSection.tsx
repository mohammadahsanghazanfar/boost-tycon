import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, Sparkles, CheckCircle2, Pause, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICES_DATA } from '../data/mockData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService?: (service: ServiceItem) => void;
  onOpenQuote: (serviceTitle?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onOpenQuote,
}) => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string>('seo-organic-growth');
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const xPosRef = useRef<number>(0);
  const singleSetWidthRef = useRef<number>(0);

  const isDraggingRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const dragRef = useRef<{
    startX: number;
    startPos: number;
    hasDragged: boolean;
  }>({ startX: 0, startPos: 0, hasDragged: false });

  // 3 duplicate sets of services for seamless, infinite looping in both directions
  const allServices = [...SERVICES_DATA, ...SERVICES_DATA, ...SERVICES_DATA];

  // Prime and preload service images into the browser cache for instant display
  useEffect(() => {
    SERVICES_DATA.forEach((s) => {
      const img = new Image();
      img.src = s.image;
    });
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (trackRef.current) {
        const sw = trackRef.current.scrollWidth / 3;
        singleSetWidthRef.current = sw;
        if (xPosRef.current === 0 && sw > 0) {
          xPosRef.current = -sw;
          trackRef.current.style.transform = `translate3d(${-sw}px, 0, 0)`;
        }
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    let lastTime = performance.now();
    let animId: number;

    const AUTO_SPEED = 75; // px per second, moving left-to-right

    const loop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      // Auto-advance if not paused, not dragging, and not hovered
      if (!isPaused && !isDraggingRef.current && !isHoveredRef.current) {
        let newPos = xPosRef.current + AUTO_SPEED * dt;
        const sw = singleSetWidthRef.current;
        if (sw > 0) {
          while (newPos >= 0) newPos -= sw;
          while (newPos < -sw * 2) newPos += sw;
        }
        xPosRef.current = newPos;
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${newPos}px, 0, 0)`;
        }
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animId);
    };
  }, [isPaused]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // Only left click / touch
    dragRef.current = {
      startX: e.clientX,
      startPos: xPosRef.current,
      hasDragged: false,
    };
    isDraggingRef.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragRef.current.startX === 0) return;
    const delta = e.clientX - dragRef.current.startX;
    // Only engage drag if user moved at least 15px intentionally
    if (Math.abs(delta) > 15) {
      dragRef.current.hasDragged = true;
      isDraggingRef.current = true;
      setIsDragging(true);

      let newPos = dragRef.current.startPos + delta;
      const sw = singleSetWidthRef.current;
      if (sw > 0) {
        while (newPos >= 0) newPos -= sw;
        while (newPos < -sw * 2) newPos += sw;
      }
      xPosRef.current = newPos;
      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${newPos}px, 0, 0)`;
      }
    }
  };

  const handlePointerUp = () => {
    dragRef.current.startX = 0;
    isDraggingRef.current = false;
    setIsDragging(false);
    // Suppress clicks briefly only if user was actively dragging
    setTimeout(() => {
      dragRef.current.hasDragged = false;
    }, 120);
  };

  const handleCardClick = (service: ServiceItem, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (dragRef.current.hasDragged) return;
    onOpenQuote(service.title);
  };

  const handleScrollManual = (direction: 'left' | 'right') => {
    const shift = direction === 'left' ? 380 : -380;
    let newPos = xPosRef.current + shift;
    const sw = singleSetWidthRef.current;
    if (sw > 0) {
      while (newPos >= 0) newPos -= sw;
      while (newPos < -sw * 2) newPos += sw;
    }
    xPosRef.current = newPos;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${newPos}px, 0, 0)`;
    }
  };

  return (
    <section id="services" className="py-20 md:py-32 bg-[#0A0C0B] text-[#F5F5F4] relative overflow-hidden border-b border-white/10">
      
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#C6FF00]/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#C6FF00]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10 mb-12 sm:mb-16">
        
        {/* Section Header matching exact attached design */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#141716] border border-white/10 text-[#C6FF00] text-xs font-black uppercase tracking-widest">
              <span>✦</span>
              <span>CAPABILITIES // SERVICES</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase italic leading-[1.08]">
              POWERFUL FEATURES <br />
              TO <span className="text-[#C6FF00] not-italic">ACCELERATE GROWTH</span>
            </h2>
          </div>

          {/* Action Row & Navigation Controls */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 shrink-0">
            {/* Prev / Next Manual Navigation Controls */}
            <div className="flex items-center gap-2 bg-[#141716] border border-white/10 rounded-full p-1.5">
              <button
                onClick={() => handleScrollManual('left')}
                title="Scroll Left"
                aria-label="Scroll services left"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => setIsPaused(!isPaused)}
                title={isPaused ? "Play Animation" : "Pause Animation"}
                aria-label={isPaused ? "Play Animation" : "Pause Animation"}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#C6FF00] hover:bg-white/10 transition-colors cursor-pointer"
              >
                {isPaused ? <Play className="w-3.5 h-3.5 fill-current" /> : <Pause className="w-3.5 h-3.5 fill-current" />}
              </button>

              <button
                onClick={() => handleScrollManual('right')}
                title="Scroll Right"
                aria-label="Scroll services right"
                className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Infinite Animated Carousel Stream with mouse hold-click-and-drag */}
      <div 
        className={`w-full overflow-hidden select-none py-6 touch-pan-y ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
      >
        <div 
          ref={trackRef}
          className="flex items-stretch gap-6 px-6 animate-services-track"
          style={{ width: 'max-content' }}
        >
          {allServices.map((service, index) => {
            const isHighlight = service.id === activeCardId;

            return (
              <div
                key={`${service.id}-${index}`}
                role="button"
                tabIndex={0}
                aria-label={`Open consultation form for ${service.title}`}
                onMouseEnter={() => setActiveCardId(service.id)}
                onClick={(e) => handleCardClick(service, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenQuote(service.title);
                  }
                }}
                className={`w-[310px] sm:w-[340px] md:w-[360px] shrink-0 rounded-[30px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group select-none ${
                  isHighlight
                    ? 'bg-[#C6FF00] text-[#0A0C0B] border-2 border-[#C6FF00] shadow-[0_0_35px_rgba(198,255,0,0.32)] z-10'
                    : 'bg-[#141716] text-[#F5F5F4] border border-white/10 hover:border-white/25 shadow-xl'
                }`}
              >
                <div className="relative">
                  {/* Active Highlight Sparkle (top right) */}
                  {isHighlight && (
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-[#0A0C0B] text-[#C6FF00] flex items-center justify-center shrink-0 shadow-md">
                      <Sparkles className="w-3.5 h-3.5 fill-current" />
                    </div>
                  )}

                  {/* Service Title - Clickable header */}
                  <h3
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQuote(service.title);
                    }}
                    className={`text-xl sm:text-2xl font-black uppercase tracking-tight leading-tight line-clamp-2 pr-8 min-h-[3.25rem] flex items-start cursor-pointer transition-colors group-hover:underline underline-offset-4 decoration-2 ${
                      isHighlight ? 'text-[#0A0C0B] decoration-[#0A0C0B]' : 'text-white decoration-[#C6FF00]'
                    }`}
                  >
                    {service.title}
                  </h3>

                  {/* Short Description */}
                  <p
                    className={`text-xs sm:text-[13px] leading-relaxed mt-2.5 min-h-[4.25rem] ${
                      isHighlight ? 'text-[#0A0C0B]/80 font-medium' : 'text-white/60 font-light'
                    }`}
                  >
                    {service.description}
                  </p>

                  {/* Thumbnail Image */}
                  <div 
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQuote(service.title);
                    }}
                    className="relative rounded-2xl overflow-hidden mt-5 aspect-[16/10] bg-[#121514] border border-white/5 cursor-pointer shadow-inner"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      width={720}
                      height={450}
                      loading={index < 6 ? 'eager' : 'lazy'}
                      fetchPriority={index < 3 ? 'high' : 'auto'}
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Deliverables / Features Checklist */}
                  <div className="mt-5 space-y-2">
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-center gap-2.5 text-[11px] sm:text-xs font-bold uppercase tracking-tight"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 ${
                            isHighlight ? 'text-[#0A0C0B]' : 'text-[#C6FF00]'
                          }`}
                        />
                        <span
                          className={`line-clamp-1 ${
                            isHighlight ? 'text-[#0A0C0B]' : 'text-white/80'
                          }`}
                        >
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Row / CTA Button */}
                <div
                  className={`mt-6 pt-4 border-t ${
                    isHighlight ? 'border-black/15' : 'border-white/10'
                  }`}
                >
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQuote(service.title);
                    }}
                    className={`w-full py-3.5 px-4 rounded-full font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg active:scale-95 ${
                      isHighlight
                        ? 'bg-[#0A0C0B] text-[#C6FF00] hover:bg-black'
                        : 'bg-[#C6FF00] text-[#0A0C0B] hover:bg-[#d4ff33] shadow-[0_0_20px_rgba(198,255,0,0.35)]'
                    }`}
                  >
                    <span>{service.ctaText}</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
