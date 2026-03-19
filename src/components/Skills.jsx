import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

const allSkills = [
  { name: "React.js",     color: "#61DAFB", icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="2.5" fill="#61DAFB"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" stroke="#61DAFB" strokeWidth="1.2" fill="none" transform="rotate(120 12 12)"/></svg> },
  { name: "Next.js",      color: "#ffffff", icon: <svg viewBox="0 0 24 24" fill="white"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.75 14.25L8.5 7.5H7v9h1.5v-6.75l6.5 8.25H16.5V7.5H15v8.75z"/></svg> },
  { name: "JavaScript",   color: "#F7DF1E", icon: <svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#F7DF1E"/><text x="3" y="19" fontSize="13" fontWeight="bold" fill="#000">JS</text></svg> },
  { name: "TypeScript",   color: "#3178C6", icon: <svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#3178C6"/><text x="2.5" y="19" fontSize="12" fontWeight="bold" fill="#fff">TS</text></svg> },
  { name: "Node.js",      color: "#68A063", icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v10l9 5 9-5V7L12 2z" stroke="#68A063" strokeWidth="1.5" fill="none"/><path d="M12 8v8M9 9.5l3-1.5 3 1.5" stroke="#68A063" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { name: "Express.js",   color: "#cccccc", icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 6h16M4 10h10M4 14h12M4 18h8" stroke="#ccc" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { name: "MongoDB",      color: "#47A248", icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 2c0 0-6 8.5-6 12a6 6 0 0012 0c0-3.5-6-12-6-12z" stroke="#47A248" strokeWidth="1.5" fill="none"/><path d="M12 5v14" stroke="#47A248" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { name: "PostgreSQL",   color: "#336791", icon: <svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="8" rx="7" ry="4" stroke="#336791" strokeWidth="1.5" fill="none"/><path d="M5 8v8c0 2.2 3.1 4 7 4s7-1.8 7-4V8" stroke="#336791" strokeWidth="1.5" fill="none"/></svg> },
  { name: "MySQL",        color: "#4479A1", icon: <svg viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="7" rx="7" ry="3" stroke="#4479A1" strokeWidth="1.5" fill="none"/><path d="M5 7v5c0 1.66 3.13 3 7 3s7-1.34 7-3V7" stroke="#4479A1" strokeWidth="1.5" fill="none"/><path d="M5 12v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" stroke="#4479A1" strokeWidth="1.5" fill="none"/></svg> },
  { name: "Tailwind CSS", color: "#06B6D4", icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35.98 1 2.09 2.15 4.6 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C15.62 7.15 14.51 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.9 1.35C8.38 16.85 9.49 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.9-1.35C10.62 13.15 9.51 12 7 12z" fill="#06B6D4"/></svg> },
  { name: "HTML5",        color: "#E34F26", icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 2l1.5 17L12 21l6.5-2L20 2H4z" stroke="#E34F26" strokeWidth="1.5" fill="none"/><path d="M8 8h8l-.5 5.5L12 15l-3.5-1.5L8 8z" stroke="#E34F26" strokeWidth="1.2" fill="none"/></svg> },
  { name: "CSS3",         color: "#1572B6", icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 2l1.5 17L12 21l6.5-2L20 2H4z" stroke="#1572B6" strokeWidth="1.5" fill="none"/><path d="M8 8h8l-.5 5.5L12 15l-3.5-1.5L8 8z" stroke="#1572B6" strokeWidth="1.2" fill="none"/></svg> },
  { name: "Git",          color: "#F05032", icon: <svg viewBox="0 0 24 24" fill="none"><circle cx="6" cy="6" r="2" stroke="#F05032" strokeWidth="1.5" fill="none"/><circle cx="18" cy="6" r="2" stroke="#F05032" strokeWidth="1.5" fill="none"/><circle cx="6" cy="18" r="2" stroke="#F05032" strokeWidth="1.5" fill="none"/><path d="M8 6h8M6 8v8" stroke="#F05032" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 18l8-8" stroke="#F05032" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { name: "Docker",       color: "#2496ED", icon: <svg viewBox="0 0 24 24" fill="none"><rect x="2" y="11" width="3" height="3" rx="0.5" stroke="#2496ED" strokeWidth="1.3" fill="none"/><rect x="6" y="11" width="3" height="3" rx="0.5" stroke="#2496ED" strokeWidth="1.3" fill="none"/><rect x="10" y="11" width="3" height="3" rx="0.5" stroke="#2496ED" strokeWidth="1.3" fill="none"/><rect x="6" y="7" width="3" height="3" rx="0.5" stroke="#2496ED" strokeWidth="1.3" fill="none"/><rect x="10" y="7" width="3" height="3" rx="0.5" stroke="#2496ED" strokeWidth="1.3" fill="none"/></svg> },
  { name: "REST APIs",    color: "#00D4B4", icon: <svg viewBox="0 0 24 24" fill="none"><path d="M4 12h16M16 8l4 4-4 4" stroke="#00D4B4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="12" r="2" stroke="#00D4B4" strokeWidth="1.3" fill="none"/></svg> },
  { name: "GraphQL",      color: "#E10098", icon: <svg viewBox="0 0 24 24" fill="none"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" stroke="#E10098" strokeWidth="1.5" fill="none"/><circle cx="12" cy="3" r="1.5" fill="#E10098"/><circle cx="20" cy="7.5" r="1.5" fill="#E10098"/><circle cx="20" cy="16.5" r="1.5" fill="#E10098"/><circle cx="12" cy="21" r="1.5" fill="#E10098"/><circle cx="4" cy="16.5" r="1.5" fill="#E10098"/><circle cx="4" cy="7.5" r="1.5" fill="#E10098"/></svg> },
  { name: "Firebase",     color: "#FFCA28", icon: <svg viewBox="0 0 24 24" fill="none"><path d="M5 20L8 4l4.5 8L15 7l4 13H5z" stroke="#FFCA28" strokeWidth="1.5" fill="none" strokeLinejoin="round"/></svg> },
  { name: "Vercel",       color: "#ffffff", icon: <svg viewBox="0 0 24 24" fill="white"><path d="M12 3L23 21H1L12 3z"/></svg> },
];

// Split into two rows
const row1 = allSkills.slice(0, 9);
const row2 = allSkills.slice(9);

// Individual skill card
function SkillCard({ skill }) {
  return (
    <div
      className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-2xl
                 border border-white/8 mx-2 group cursor-default
                 hover:border-cyan-400/40 hover:shadow-[0_0_20px_rgba(0,212,180,0.1)]
                 transition-all duration-300"
      style={{ background: "rgba(13,20,34,0.7)", backdropFilter: "blur(12px)" }}
    >
      <div className="w-8 h-8 flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
        {skill.icon}
      </div>
      <span
        className="font-dm text-[13px] font-medium whitespace-nowrap transition-colors duration-200"
        style={{ color: "rgba(255,255,255,0.72)" }}
      >
        {skill.name}
      </span>
      {/* color dot */}
      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 opacity-60"
        style={{ background: skill.color }} />
    </div>
  );
}

// Marquee row — direction: "left" | "right"
function MarqueeRow({ skills, direction = "left", speed = 35 }) {
  // Triple the items so the loop is seamless
  const items = [...skills, ...skills, ...skills];
  const animName = direction === "left" ? "marqueeLeft" : "marqueeRight";

  return (
    <div className="relative overflow-hidden w-full">
      {/* Left fade */}
      <div className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #0a0f1a, transparent)" }} />
      {/* Right fade */}
      <div className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #0a0f1a, transparent)" }} />

      <div
        className="flex items-center py-2"
        style={{
          animation       : `${animName} ${speed}s linear infinite`,
          width           : "max-content",
          willChange      : "transform",
        }}
      >
        {items.map((skill, i) => (
          <SkillCard key={`${skill.name}-${i}`} skill={skill} />
        ))}
      </div>

      <style>{`
        @keyframes marqueeLeft {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        @keyframes marqueeRight {
          0%   { transform: translateX(calc(-100% / 3)); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default function Skills() {
  const [sectionRef, inView] = useInView(0.1);

  return (
    <section id="skills" className="relative section-padding overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none select-none"
        style={{ background: "radial-gradient(circle, rgba(0,212,180,0.05) 0%, transparent 65%)" }} />

      <div ref={sectionRef} className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          className="flex flex-col items-center text-center mb-14"
          style={{
            opacity   : inView ? 1 : 0,
            transform : inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-cyan-400/60" />
            <span className="section-label text-[11px]">Technologies</span>
            <span className="w-8 h-px bg-cyan-400/60" />
          </div>
          <h2 className="section-title mb-3">
            My <span className="text-gradient">Skills</span>
          </h2>
          <p className="font-dm text-white/50 text-[15px] max-w-[460px] leading-relaxed">
            Tools and technologies I use to bring ideas to life.
          </p>
        </div>

        {/* Marquee rows */}
        <div
          className="flex flex-col gap-4"
          style={{
            opacity   : inView ? 1 : 0,
            transition: "opacity 0.8s ease 0.3s",
          }}
        >
          {/* Row 1 — scrolls right (→) */}
          <MarqueeRow skills={row1} direction="right" speed={30} />

          {/* Row 2 — scrolls left (←) */}
          <MarqueeRow skills={row2} direction="left" speed={28} />
        </div>

      </div>
    </section>
  );
}