import { useEffect, useRef } from "react";

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext("2d");

    let W, H, dots = [], animId;

    const COL_GAP  = 36;   // space between columns
    const ROW_GAP  = 36;   // space between dots in each column
    const DOT_R    = 1.8;
    const EFFECT_R = 250;
    const ALPHA    = 0.45;
    const mouse    = { x: -9999, y: -9999 };

    const buildDots = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
      dots = [];
      const cols = Math.ceil(W / COL_GAP) + 1;
      const rows = Math.ceil(H / ROW_GAP) + 1;

      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          const ox = c * COL_GAP;
          const oy = r * ROW_GAP;
          dots.push({ ox, oy, x: ox, y: oy });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.x;
      const my = mouse.y;

      for (const d of dots) {
        // Always compute from origin → mouse, works whether mouse moving or still
        const dx   = d.ox - mx;
        const dy   = d.oy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let tx = d.ox;
        let ty = d.oy;

        if (dist < EFFECT_R && dist > 0) {
          const force = (EFFECT_R - dist) / EFFECT_R;
          tx = d.ox + (dx / dist) * force * EFFECT_R * 0.65;
          ty = d.oy + (dy / dist) * force * EFFECT_R * 0.65;
        }

        // Faster lerp (0.18) so repel tracks moving cursor tightly
        d.x += (tx - d.x) * 0.18;
        d.y += (ty - d.y) * 0.18;

        ctx.beginPath();
        ctx.arc(d.x, d.y, DOT_R, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${ALPHA})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    const onMove  = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = ()  => { mouse.x = -9999; mouse.y = -9999; };

    buildDots();
    draw();

    window.addEventListener("mousemove",  onMove,   { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize",     buildDots);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize",     buildDots);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position      : "fixed",
        top           : 0,
        left          : 0,
        width         : "100vw",
        height        : "100vh",
        pointerEvents : "none",
        zIndex        : 0,
      }}
    />
  );
}