import React, { useEffect, useRef, useState } from 'react';

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

function easeOutBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function easeOutBounce(t: number): number {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    const t2 = t - 1.5 / d1;
    return n1 * t2 * t2 + 0.75;
  } else if (t < 2.5 / d1) {
    const t2 = t - 2.25 / d1;
    return n1 * t2 * t2 + 0.9375;
  } else {
    const t2 = t - 2.625 / d1;
    return n1 * t2 * t2 + 0.984375;
  }
}

function clamp01(val: number): number {
  return Math.max(0, Math.min(1, val));
}

interface BossTycoonHeroAnimationProps {
  className?: string;
  letterFill?: string;
  ribbonColor?: string;
}

export const BossTycoonHeroAnimation: React.FC<BossTycoonHeroAnimationProps> = ({
  className = '',
  letterFill = '#FFFFFF',
  ribbonColor = '#C6FF00'
}) => {
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLength, setPathLength] = useState<number>(3950);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [mouseOffset, setMouseOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // 7-second synchronized loop cycle: smile appears first, ribbon flows left-to-right, both conclude together
  const [elapsed, setElapsed] = useState<number>(0.0);
  const lastTimeRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobileView(window.innerWidth < 640);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    if (pathRef.current) {
      const measured = pathRef.current.getTotalLength();
      if (measured > 100) setPathLength(measured);
    }
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setElapsed(0.5);
      setIsPaused(true);
    }
  }, []);

  useEffect(() => {
    if (isPaused) {
      lastTimeRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }

    const LOOP_DURATION = 12.0;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = now;
      const dt = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      setElapsed((prev) => {
        const next = prev + dt;
        return next >= LOOP_DURATION ? next - LOOP_DURATION : next;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isPaused]);

  // 15 letters for "WE ARE BOSS TYCOON" - always visible
  const totalLetters = 15;
  const visibleLetterCount = totalLetters;

  // Fluid, well-paced ribbon drift across typography:
  // - Starts at 1.4s (draws across from left to right over 4.7s)
  // - Ending tail exits across left to right over matching 4.7s, completing at 10.8s
  const RIBBON_START = 1.4;
  const RIBBON_DRAW_DURATION = 4.7;
  const RIBBON_RETRACT_DURATION = 4.7;
  const RIBBON_END = RIBBON_START + RIBBON_DRAW_DURATION + RIBBON_RETRACT_DURATION; // 10.8s

  const rawHead = clamp01((elapsed - RIBBON_START) / RIBBON_DRAW_DURATION);
  const headProgress = easeInOutCubic(rawHead);

  const rawTail = clamp01((elapsed - (RIBBON_START + RIBBON_DRAW_DURATION)) / RIBBON_RETRACT_DURATION);
  const tailProgress = easeInOutCubic(rawTail);

  // Green smile under double 'OO' in TYCOON:
  // - REMOVED only when the ribbon animation starts (fades out as ribbon starts at 1.4s)
  // - HIDDEN while the ribbon is animating across (1.4s to 10.8s)
  // - PUT BACK AGAIN as soon as the ribbon animation ends to the right (reappears at 10.8s and remains until next cycle)
  let smileOpacity = 0;
  let smileScale = 1;

  if (elapsed >= RIBBON_END) {
    // Ribbon has ended to the right! Smile is put back with a lively spring bounce
    const reEnterProgress = easeOutBack(clamp01((elapsed - RIBBON_END) / 0.35));
    smileOpacity = clamp01((elapsed - RIBBON_END) / 0.16);
    smileScale = 0.82 + 0.18 * reEnterProgress;
  } else if (elapsed < RIBBON_START) {
    // Ribbon hasn't started yet! Smile is resting in place, and fades out right as ribbon launches
    const fadeOutProgress = clamp01((elapsed - (RIBBON_START - 0.22)) / 0.22);
    smileOpacity = 1 - easeInOutCubic(fadeOutProgress);
    smileScale = 1 - 0.15 * fadeOutProgress;
  } else {
    // Ribbon is actively animating across: smile is removed
    smileOpacity = 0;
    smileScale = 0.85;
  }

  // E in "ARE" morphs into triple-bar ≡ as ribbon passes through
  let eProgress = 0;
  if (elapsed >= 2.4 && elapsed < 4.7) {
    eProgress = easeOutQuart(clamp01((elapsed - 2.4) / 0.55));
  } else if (elapsed >= 4.7 && elapsed <= 5.5) {
    eProgress = 1 - easeInOutCubic(clamp01((elapsed - 4.7) / 0.8));
  }

  const startDist = tailProgress * pathLength;
  const endDist = headProgress * pathLength;
  const visibleLen = Math.max(0, endDist - startDist);
  // Ribbon is visible only while actively animating
  const isRibbonVisible = elapsed >= RIBBON_START && elapsed <= RIBBON_END && visibleLen > 1;
  const deltaE = 74 * eProgress;

  // Exact green ribbon wave path spanning from far left of website to far right of website
  const ribbonPathData = [
    'M -450,115',
    'C -320,125 -180,138 -35,148',
    'C 85,170 218,248 302,236',
    'C 348,229 332,108 246,108',
    'C 175,108 148,195 172,258',
    'C 196,320 275,342 348,312',
    'C 420,280 475,102 546,102',
    'C 615,102 635,338 695,338',
    'C 760,338 780,82 840,82',
    'C 905,82 925,344 985,344',
    'C 1050,344 1075,78 1145,78',
    'C 1215,78 1240,342 1305,342',
    'C 1375,342 1410,136 1485,136',
    'C 1545,136 1590,172 1640,198',
    'C 1740,226 1870,250 2000,242',
    'C 2110,235 2250,215 2390,205',
  ].join(' ');

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x: normX * 5, y: normY * 4 });
  };

  const svgViewBox = isMobileView ? '60 40 1480 325' : '0 45 1600 325';

  return (
    <div
      className={`relative w-full select-none overflow-hidden flex items-center justify-center py-2 sm:py-4 ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => setMouseOffset({ x: 0, y: 0 })}
    >
      <h1 className="sr-only">WE ARE BOSS TYCOON</h1>

      <svg
        viewBox={svgViewBox}
        className="w-full h-auto min-h-[220px] sm:min-h-[300px] md:min-h-[360px] lg:min-h-[420px] max-h-[75vh] sm:max-h-[85vh] overflow-visible block filter drop-shadow-[0_12px_45px_rgba(0,0,0,0.9)]"
        role="img"
        aria-label="WE ARE BOSS TYCOON animated kinetic typography with green ribbon"
      >
        <defs>
          {/* Clips foreground ribbon from where it starts on the left so it comes in front of W, stopping before E */}
          <clipPath id="front-e-loop-clip">
            <polygon points="-500,0 298,0 298,420 -500,420" />
          </clipPath>
        </defs>

        {/* LAYER 1: Background Neon Green Ribbon (weaves BEHIND letters) */}
        <g
          style={{
            transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
            transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <path
            ref={pathRef}
            d={ribbonPathData}
            fill="none"
            stroke={ribbonColor}
            strokeWidth={34}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: `${visibleLen} ${pathLength * 2}`,
              strokeDashoffset: -startDist,
              opacity: isRibbonVisible ? 1 : 0,
            }}
          />
        </g>

        {/* LAYER 2: Geometric White Bold Letters */}
        <g
          transform="translate(70, 26) scale(0.735)"
          fill={letterFill}
          stroke={letterFill}
          strokeWidth={1.8}
        >
          {/* ================= WE ================= */}
          {/* W */}
          {visibleLetterCount >= 1 && (
            <g transform="translate(180, 148)">
              <path d="M 0,0 L 25,0 L 41,82 L 54,0 L 72,0 L 85,82 L 101,0 L 126,0 L 99,124 L 75,124 L 63,48 L 51,124 L 27,124 Z" />
            </g>
          )}

          {/* E */}
          {visibleLetterCount >= 2 && (
            <g transform="translate(319, 148)">
              <path d="M 0,0 L 78,0 L 78,22 L 24,22 L 24,51 L 70,51 L 70,73 L 24,73 L 24,102 L 78,102 L 78,124 L 0,124 Z" />
            </g>
          )}

          {/* ================= ARE ================= */}
          {/* A */}
          {visibleLetterCount >= 3 && (
            <g transform="translate(433, 148)">
              <path
                fillRule="evenodd"
                d="M 36,0 L 62,0 L 98,124 L 72,124 L 65,96 L 33,96 L 26,124 L 0,124 Z M 49,27 L 38,74 L 60,74 Z"
              />
            </g>
          )}

          {/* R */}
          {visibleLetterCount >= 4 && (
            <g transform="translate(544, 148)">
              <path
                fillRule="evenodd"
                d="M 0,0 L 48,0 C 73,0 86,14 86,38 C 86,56 76,69 59,73 L 90,124 L 63,124 L 39,76 L 24,76 L 24,124 L 0,124 Z M 24,21 L 45,21 C 56,21 62,27 62,38 C 62,49 56,55 45,55 L 24,55 Z"
              />
            </g>
          )}

          {/* E morphing into ≡ */}
          {visibleLetterCount >= 5 && (
            <g transform="translate(645, 148)">
              <rect x={0} y={0} width={78 + deltaE} height={22} rx={eProgress * 10} />
              <rect x={0} y={51} width={70 + 8 * eProgress + deltaE} height={22} rx={eProgress * 10} />
              <rect x={0} y={102} width={78 + deltaE} height={22} rx={eProgress * 10} />
              <rect
                x={0}
                y={0}
                width={24 * Math.max(0, 1 - eProgress * 1.8)}
                height={124}
                opacity={Math.max(0, 1 - eProgress * 1.6)}
              />
            </g>
          )}

          {/* ================= BOSS ================= */}
          <g transform={`translate(${deltaE}, 0)`}>
            {/* B */}
            {visibleLetterCount >= 6 && (
              <g transform="translate(759, 148)">
                <path
                  fillRule="evenodd"
                  d="M 0,0 L 50,0 C 72,0 82,12 82,31 C 82,47 74,56 58,59 C 76,62 86,72 86,92 C 86,112 74,124 50,124 L 0,124 Z M 24,22 L 48,22 C 57,22 61,26 61,33 C 61,40 57,44 48,44 L 24,44 Z M 24,66 L 49,66 C 59,66 63,72 63,80 C 63,88 59,94 49,94 L 24,94 Z"
                />
              </g>
            )}

            {/* O */}
            {visibleLetterCount >= 7 && (
              <g transform="translate(858, 148)">
                <path
                  fillRule="evenodd"
                  d="M 48,0 C 75,0 96,28 96,62 C 96,96 75,124 48,124 C 21,124 0,96 0,62 C 0,28 21,0 48,0 Z M 48,23 C 35,23 24,40 24,62 C 24,84 35,101 48,101 C 61,101 72,84 72,62 C 72,40 61,23 48,23 Z"
                />
              </g>
            )}

            {/* S */}
            {visibleLetterCount >= 8 && (
              <g transform="translate(967, 148)">
                <path d="M 78,35 L 56,35 C 54,26 48,21 41,21 C 33,21 28,26 28,32 C 28,39 33,43 46,47 C 67,54 82,62 82,85 C 82,109 63,124 41,124 C 18,124 4,110 1,88 L 24,88 C 26,98 32,104 41,104 C 49,104 56,99 56,92 C 56,84 49,80 37,76 C 18,69 3,61 3,39 C 3,16 20,0 41,0 C 64,0 76,14 78,35 Z" />
              </g>
            )}

            {/* S */}
            {visibleLetterCount >= 9 && (
              <g transform="translate(1062, 148)">
                <path d="M 78,35 L 56,35 C 54,26 48,21 41,21 C 33,21 28,26 28,32 C 28,39 33,43 46,47 C 67,54 82,62 82,85 C 82,109 63,124 41,124 C 18,124 4,110 1,88 L 24,88 C 26,98 32,104 41,104 C 49,104 56,99 56,92 C 56,84 49,80 37,76 C 18,69 3,61 3,39 C 3,16 20,0 41,0 C 64,0 76,14 78,35 Z" />
              </g>
            )}

            {/* ================= TYCOON ================= */}
            {/* Single T */}
            {visibleLetterCount >= 10 && (
              <g transform="translate(1180, 148)">
                <path d="M 0,0 L 84,0 L 84,22 L 54,22 L 54,124 L 30,124 L 30,22 L 0,22 Z" />
              </g>
            )}

            {/* Y C O O N */}
            <g>
              {/* Symmetric Y */}
              {visibleLetterCount >= 11 && (
                <g transform="translate(1277, 148)">
                  <path d="M 0,0 L 25,0 L 46,42 L 67,0 L 92,0 L 58,60 L 58,124 L 34,124 L 34,60 Z" />
                </g>
              )}

              {/* C */}
              {visibleLetterCount >= 12 && (
                <g transform="translate(1380, 148)">
                  <path d="M 88,38 L 65,38 C 62,26 54,21 47,21 C 32,21 24,37 24,62 C 24,87 32,103 47,103 C 54,103 62,98 65,86 L 88,86 C 84,109 68,124 47,124 C 18,124 0,98 0,62 C 0,26 18,0 47,0 C 68,0 84,15 88,38 Z" />
                </g>
              )}

              {/* O */}
              {visibleLetterCount >= 13 && (
                <g transform="translate(1485, 148)">
                  <path
                    fillRule="evenodd"
                    d="M 48,0 C 75,0 96,28 96,62 C 96,96 75,124 48,124 C 21,124 0,96 0,62 C 0,28 21,0 48,0 Z M 48,23 C 35,23 24,40 24,62 C 24,84 35,101 48,101 C 61,101 72,84 72,62 C 72,40 61,23 48,23 Z"
                  />
                </g>
              )}

              {/* O */}
              {visibleLetterCount >= 14 && (
                <g transform="translate(1594, 148)">
                  <path
                    fillRule="evenodd"
                    d="M 48,0 C 75,0 96,28 96,62 C 96,96 75,124 48,124 C 21,124 0,96 0,62 C 0,28 21,0 48,0 Z M 48,23 C 35,23 24,40 24,62 C 24,84 35,101 48,101 C 61,101 72,84 72,62 C 72,40 61,23 48,23 Z"
                  />
                </g>
              )}

              {/* Expressive Neon Green Smile Arc under double 'OO' (Reference design: mood smile) */}
              {visibleLetterCount >= 14 && smileOpacity > 0.005 && (
                <g
                  transform={`translate(1485, 148) translate(102.5, 160) scale(${smileScale}) translate(-102.5, -160)`}
                  style={{
                    opacity: smileOpacity,
                    filter: 'drop-shadow(0 0 10px rgba(198, 255, 0, 0.6))',
                    transition: 'opacity 60ms linear',
                  }}
                >
                  <path
                    d="M 18,138 C 36,172 70,182 102.5,182 C 135,182 169,172 187,138 C 167,162 135,168 102.5,168 C 70,168 38,162 18,138 Z"
                    fill={ribbonColor}
                    stroke="none"
                  />
                </g>
              )}

              {/* N */}
              {visibleLetterCount >= 15 && (
                <g transform="translate(1703, 148)">
                  <path d="M 0,0 L 24,0 L 68,82 L 68,0 L 92,0 L 92,124 L 68,124 L 24,42 L 24,124 L 0,124 Z" />
                </g>
              )}
            </g>
          </g>
        </g>

        {/* LAYER 3: Foreground Green Ribbon (clips over W for 3D weave) */}
        <g
          clipPath="url(#front-e-loop-clip)"
          style={{
            transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0)`,
            transition: 'transform 180ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <path
            d={ribbonPathData}
            fill="none"
            stroke={ribbonColor}
            strokeWidth={34}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              strokeDasharray: `${visibleLen} ${pathLength * 2}`,
              strokeDashoffset: -startDist,
              opacity: isRibbonVisible ? 1 : 0,
            }}
          />
        </g>

        {/* LAYER 4: E in "WE" explicitly rendered on top so ribbon goes behind E completely */}
        {visibleLetterCount >= 2 && (
          <g
            transform="translate(70, 26) scale(0.735)"
            fill={letterFill}
            stroke={letterFill}
            strokeWidth={1.8}
            style={{ pointerEvents: 'none' }}
          >
            <g transform="translate(319, 148)">
              <path d="M 0,0 L 78,0 L 78,22 L 24,22 L 24,51 L 70,51 L 70,73 L 24,73 L 24,102 L 78,102 L 78,124 L 0,124 Z" />
            </g>
          </g>
        )}
      </svg>

      {/* Discrete hover controls */}
      <div className="absolute bottom-1 right-4 flex items-center gap-1.5 opacity-0 hover:opacity-100 transition-opacity duration-200">
        <button
          type="button"
          onClick={() => setIsPaused((p) => !p)}
          className="px-2.5 py-1 rounded bg-white/90 border border-slate-300 text-xs text-slate-800 shadow-sm cursor-pointer"
        >
          {isPaused ? 'Play' : 'Pause'}
        </button>
        <button
          type="button"
          onClick={() => { setElapsed(0.05); setIsPaused(false); }}
          className="px-2.5 py-1 rounded bg-white/90 border border-slate-300 text-xs text-slate-800 shadow-sm cursor-pointer"
        >
          Replay
        </button>
      </div>
    </div>
  );
};
