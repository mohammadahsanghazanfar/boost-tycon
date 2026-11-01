import React, { useEffect, useRef } from 'react';

interface HeroNeonSplineProps {
  className?: string;
  speed?: number;
  glowIntensity?: number;
}

export const HeroNeonSpline: React.FC<HeroNeonSplineProps> = ({
  className = '',
  speed = 1.0,
  glowIntensity = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const backCanvas = backCanvasRef.current;
    const frontCanvas = frontCanvasRef.current;
    if (!container || !backCanvas || !frontCanvas) return;

    const backCtx = backCanvas.getContext('2d');
    const frontCtx = frontCanvas.getContext('2d');
    if (!backCtx || !frontCtx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Handle resize and DPI scaling
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      backCanvas.width = width * dpr;
      backCanvas.height = height * dpr;
      backCanvas.style.width = `${width}px`;
      backCanvas.style.height = `${height}px`;

      frontCanvas.width = width * dpr;
      frontCanvas.height = height * dpr;
      frontCanvas.style.width = `${width}px`;
      frontCanvas.style.height = `${height}px`;

      backCtx.scale(dpr, dpr);
      frontCtx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse tracking for dynamic 3D tilt
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const normX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const normY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Define 3D control nodes for the flowing neon ribbon that loops around the text
    // Negative Z: Behind text (drawn to backCanvas)
    // Positive Z: In front of text (drawn to frontCanvas)
    const rawNodes = [
      { x: -0.82, y: -0.34, z: -0.75 }, // 0: Behind top-left ("WE")
      { x: -0.52, y: -0.44, z:  0.88 }, // 1: In front of "ARE" left
      { x: -0.12, y: -0.22, z: -0.82 }, // 2: Behind between "ARE" & "BOSS"
      { x: -0.32, y: -0.02, z:  0.92 }, // 3: Cuts in front above "BOSS"
      { x: -0.68, y:  0.22, z: -0.78 }, // 4: Behind "BOSS" lower-left
      { x: -0.20, y:  0.36, z:  0.88 }, // 5: In front looping out of "BOSS"
      { x:  0.15, y:  0.10, z: -0.85 }, // 6: Dives behind "TY" in "TYCOON"
      { x:  0.50, y:  0.26, z:  0.95 }, // 7: Surges in front through "COON"
      { x:  0.86, y: -0.02, z:  0.65 }, // 8: Loops in front around "N" right edge
      { x:  0.62, y: -0.32, z: -0.75 }, // 9: Dives behind top-right
      { x:  0.18, y: -0.45, z: -0.65 }, // 10: Behind top center return arc
      { x: -0.38, y: -0.46, z: -0.60 }, // 11: Behind top left return
    ];

    // Spline Catmull-Rom interpolation
    const getCatmullRomPoint = (
      p0: { x: number; y: number; z: number },
      p1: { x: number; y: number; z: number },
      p2: { x: number; y: number; z: number },
      p3: { x: number; y: number; z: number },
      t: number
    ) => {
      const t2 = t * t;
      const t3 = t2 * t;

      const f0 = -0.5 * t3 + t2 - 0.5 * t;
      const f1 = 1.5 * t3 - 2.5 * t2 + 1.0;
      const f2 = -1.5 * t3 + 2.0 * t2 + 0.5 * t;
      const f3 = 0.5 * t3 - 0.5 * t2;

      return {
        x: p0.x * f0 + p1.x * f1 + p2.x * f2 + p3.x * f3,
        y: p0.y * f0 + p1.y * f1 + p2.y * f2 + p3.y * f3,
        z: p0.z * f0 + p1.z * f1 + p2.z * f2 + p3.z * f3,
      };
    };

    // Precalculate dense closed 3D spline
    const SAMPLES_PER_SEGMENT = 45;
    const splinePoints: { x: number; y: number; z: number }[] = [];
    const numNodes = rawNodes.length;

    for (let i = 0; i < numNodes; i++) {
      const p0 = rawNodes[(i - 1 + numNodes) % numNodes];
      const p1 = rawNodes[i];
      const p2 = rawNodes[(i + 1) % numNodes];
      const p3 = rawNodes[(i + 2) % numNodes];

      for (let s = 0; s < SAMPLES_PER_SEGMENT; s++) {
        const t = s / SAMPLES_PER_SEGMENT;
        splinePoints.push(getCatmullRomPoint(p0, p1, p2, p3, t));
      }
    }

    const totalSplinePoints = splinePoints.length;

    // Glowing particle dust along the ribbon
    const particles = Array.from({ length: 40 }).map((_, i) => ({
      pathT: Math.random(),
      speed: 0.0003 + Math.random() * 0.0007,
      size: 1.5 + Math.random() * 3,
      opacity: 0.3 + Math.random() * 0.7,
      offsetZ: (Math.random() - 0.5) * 0.3,
      offsetRadius: (Math.random() - 0.5) * 20,
    }));

    let startTime = performance.now();

    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001 * speed;

      // Smooth mouse damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;

      const tiltX = mouseRef.current.y * 0.15; // Vertical tilt
      const tiltY = mouseRef.current.x * 0.22; // Horizontal tilt

      // Clear both layers
      backCtx.clearRect(0, 0, width, height);
      frontCtx.clearRect(0, 0, width, height);

      // Center & responsive scale
      const cx = width / 2;
      const cy = height / 2;
      const rx = Math.min(width * 0.54, 760);
      const ry = Math.min(height * 0.44, 280);

      // Perspective projection helper
      const project = (pt: { x: number; y: number; z: number }) => {
        // Apply dynamic mouse tilt rotation
        const cosY = Math.cos(tiltY);
        const sinY = Math.sin(tiltY);
        const cosX = Math.cos(tiltX);
        const sinX = Math.sin(tiltX);

        // Rotate around Y axis
        const x1 = pt.x * cosY + pt.z * sinY;
        const z1 = -pt.x * sinY + pt.z * cosY;

        // Rotate around X axis
        const y2 = pt.y * cosX - z1 * sinX;
        const z2 = pt.y * sinX + z1 * cosX;

        // Perspective scale
        const cameraDist = 2.4;
        const scale = cameraDist / (cameraDist + z2 * 0.7);

        return {
          sx: cx + x1 * rx * scale,
          sy: cy + y2 * ry * scale,
          z: z2,
          scale,
        };
      };

      // Draw ribbon: We render 2 flowing tubular serpents/ribbons
      // Main ribbon: length of 70% of loop, flowing continuously
      const ribbonLengthFraction = 0.76;
      const numRibbonSamples = Math.floor(totalSplinePoints * ribbonLengthFraction);
      const startOffset = (elapsed * 0.08) % 1;

      // Function to render a 3D tubular segment
      const drawRibbonDisc = (
        sx: number,
        sy: number,
        z: number,
        radius: number,
        alpha: number,
        isFront: boolean
      ) => {
        const ctx = isFront ? frontCtx : backCtx;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));

        // 1. Soft atmospheric neon glow
        const glowGrad = ctx.createRadialGradient(sx, sy, radius * 0.3, sx, sy, radius * 3.8);
        glowGrad.addColorStop(0, 'rgba(198, 255, 0, 0.45)');
        glowGrad.addColorStop(0.5, 'rgba(163, 230, 53, 0.15)');
        glowGrad.addColorStop(1, 'rgba(198, 255, 0, 0)');
        ctx.fillStyle = glowGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, radius * 3.8, 0, Math.PI * 2);
        ctx.fill();

        // 2. Base vibrant neon body with 3D cylindrical lighting
        const bodyGrad = ctx.createRadialGradient(
          sx - radius * 0.3,
          sy - radius * 0.3,
          radius * 0.1,
          sx,
          sy,
          radius
        );
        bodyGrad.addColorStop(0, '#E4FF54'); // Bright neon lime-yellow highlight
        bodyGrad.addColorStop(0.4, '#C6FF00'); // Signature Boss Tycoon neon
        bodyGrad.addColorStop(0.85, '#84cc16'); // Darker neon lime rim
        bodyGrad.addColorStop(1, '#15803d'); // Deep emerald shadow

        ctx.fillStyle = bodyGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fill();

        // 3. Specular shiny highlight (glossy 3D tube gleam)
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.beginPath();
        ctx.arc(sx - radius * 0.28, sy - radius * 0.28, radius * 0.32, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      };

      // Draw the ribbon along the spline
      for (let i = 0; i < numRibbonSamples; i += 2) {
        const prog = i / numRibbonSamples; // 0 to 1
        const t = (startOffset + prog * ribbonLengthFraction) % 1;
        const index = Math.floor(t * totalSplinePoints);
        const pt = splinePoints[index];

        const projected = project(pt);

        // Calculate tapered head & tail
        let taper = 1.0;
        if (prog < 0.12) {
          taper = prog / 0.12; // Taper in tail
        } else if (prog > 0.88) {
          taper = (1 - prog) / 0.12; // Taper in head
        }
        // Smooth sine ease
        taper = Math.sin(taper * Math.PI * 0.5);

        // Base tube radius scaled with perspective
        const baseRadius = (11 + taper * 8) * projected.scale;

        // Front vs back assignment based on projected Z
        // Smooth transition around z = 0 to avoid harsh cutoffs
        const isFront = projected.z >= -0.05;

        // Alpha calculation
        const alpha = Math.min(1, taper * 1.2) * glowIntensity;

        drawRibbonDisc(projected.sx, projected.sy, projected.z, baseRadius, alpha, isFront);

        // When crossing z = 0, draw subtle blend on both to avoid hard clipping
        if (Math.abs(projected.z) < 0.15) {
          drawRibbonDisc(projected.sx, projected.sy, projected.z, baseRadius * 0.95, alpha * 0.5, !isFront);
        }
      }

      // Draw energy pulse head (the luminous leading star of the ribbon)
      const headT = (startOffset + ribbonLengthFraction) % 1;
      const headIdx = Math.floor(headT * totalSplinePoints);
      const headPt = splinePoints[headIdx];
      const headProjected = project(headPt);
      const headIsFront = headProjected.z >= -0.05;
      const headCtx = headIsFront ? frontCtx : backCtx;

      // Radiant energy flare at head
      headCtx.save();
      const headPulse = 1 + Math.sin(elapsed * 8) * 0.2;
      const headRadius = 26 * headProjected.scale * headPulse;

      const headFlare = headCtx.createRadialGradient(
        headProjected.sx,
        headProjected.sy,
        0,
        headProjected.sx,
        headProjected.sy,
        headRadius * 3.5
      );
      headFlare.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      headFlare.addColorStop(0.2, 'rgba(198, 255, 0, 0.85)');
      headFlare.addColorStop(0.5, 'rgba(163, 230, 53, 0.4)');
      headFlare.addColorStop(1, 'rgba(198, 255, 0, 0)');

      headCtx.fillStyle = headFlare;
      headCtx.beginPath();
      headCtx.arc(headProjected.sx, headProjected.sy, headRadius * 3.5, 0, Math.PI * 2);
      headCtx.fill();
      headCtx.restore();

      // Render floating neon particles
      particles.forEach((p) => {
        p.pathT = (p.pathT + p.speed) % 1;
        const pIdx = Math.floor(p.pathT * totalSplinePoints);
        const pBase = splinePoints[pIdx];

        // Slight offset
        const pPt = {
          x: pBase.x + Math.sin(p.pathT * 20) * 0.04,
          y: pBase.y + Math.cos(p.pathT * 20) * 0.04,
          z: pBase.z + p.offsetZ,
        };

        const proj = project(pPt);
        const pFront = proj.z >= -0.05;
        const pCtx = pFront ? frontCtx : backCtx;

        pCtx.save();
        pCtx.globalAlpha = p.opacity * Math.min(1, proj.scale);
        pCtx.fillStyle = '#C6FF00';
        pCtx.shadowColor = '#C6FF00';
        pCtx.shadowBlur = 8;
        pCtx.beginPath();
        pCtx.arc(proj.sx, proj.sy, p.size * proj.scale, 0, Math.PI * 2);
        pCtx.fill();
        pCtx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [speed, glowIntensity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
    >
      {/* 1. Behind Text Canvas (Z < 0) */}
      <canvas
        ref={backCanvasRef}
        className="absolute inset-0 pointer-events-none z-0"
        style={{ filter: 'drop-shadow(0 0 20px rgba(198,255,0,0.35))' }}
      />

      {/* 2. In Front of Text Canvas (Z >= 0) */}
      <canvas
        ref={frontCanvasRef}
        className="absolute inset-0 pointer-events-none z-20"
        style={{ filter: 'drop-shadow(0 0 24px rgba(198,255,0,0.45))' }}
      />
    </div>
  );
};
