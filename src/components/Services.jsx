import { useEffect, useRef, useState } from "react";
import { services } from "../data/portfolio.js";

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

// ── Icons for each service ────────────────────────────────────────
const serviceIcons = [
  // 01 Frontend
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/>
  </svg>,
  // 02 Backend
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>,
  // 03 Database
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>,
  // 04 API
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>,
  // 05 Full Stack
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    <line x1="12" y1="2" x2="12" y2="22" opacity="0.5"/>
  </svg>,
  // 06 Performance
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
  </svg>,
];

function ServiceCard({ service, icon, index, inView }) {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="service-card group relative flex flex-col rounded-2xl border border-white/8 overflow-hidden
                 hover:border-cyan-400/35 transition-all duration-400
                 hover:shadow-[0_0_32px_rgba(0,212,180,0.08)]"
      style={{
        background  : "rgba(13,20,34,0.65)",
        backdropFilter: "blur(16px)",
        opacity     : inView ? 1 : 0,
        transform   : inView ? "translateY(0)" : "translateY(32px)",
        transition  : `opacity 0.6s ease ${0.1 * index}s, transform 0.6s ease ${0.1 * index}s, border-color 0.3s, box-shadow 0.3s`,
      }}
    >
      {/* Top cyan line — slides in on hover */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-cyan-400
                      scale-x-0 group-hover:scale-x-100
                      transition-transform duration-400 origin-left" />

      {/* Card content */}
      <div className="flex flex-col h-full p-7">

        {/* Number + icon row */}
        <div className="flex items-center justify-between mb-5">
          <span
            className="font-syne font-extrabold text-4xl leading-none
                       text-white/8 group-hover:text-cyan-400/20
                       transition-colors duration-300 select-none"
          >
            {service.number}
          </span>
          <div
            className="service-icon w-11 h-11 rounded-xl flex items-center justify-center
                       border border-white/10 text-white/45
                       group-hover:border-cyan-400/40 group-hover:text-cyan-400
                       transition-all duration-300"
            style={{ background: "rgba(0,212,180,0.04)" }}
          >
            {icon}
          </div>
        </div>

        {/* Title */}
        <h3 className="font-syne font-bold text-[1.1rem] text-white mb-3 leading-snug
                       group-hover:text-cyan-400 transition-colors duration-300">
          {service.title}
        </h3>

        {/* Short description */}
        <p className="font-dm text-white/55 text-[13.5px] leading-[1.75] mb-5 flex-1">
          {service.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {service.tags.map((tag) => (
            <span
              key={tag}
              className="font-dm text-[11px] font-medium px-2.5 py-1 rounded-full
                         text-cyan-400/80 border border-cyan-400/20
                         group-hover:border-cyan-400/40 group-hover:text-cyan-400
                         transition-all duration-200"
              style={{ background: "rgba(0,212,180,0.04)" }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => scrollTo("#contact")}
          className="flex items-center gap-2 font-dm text-[12.5px] font-medium
                     text-white/40 group-hover:text-cyan-400
                     transition-colors duration-300 w-fit"
        >
          Start a project
          <svg
            xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300"
          >
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const [sectionRef, inView] = useInView(0.05);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="relative section-padding overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,180,0.05) 0%, transparent 65%)" }} />
        <div className="absolute top-[-5%] right-[-5%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,100,255,0.04) 0%, transparent 65%)" }} />
      </div>

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
            <span className="section-label text-[11px]">Services</span>
            <span className="w-8 h-px bg-cyan-400/60" />
          </div>
          <h2 className="section-title mb-3">
            What I Can Do <span className="text-gradient">For You</span>
          </h2>
          <p className="font-dm text-white/50 text-[15px] max-w-[500px] leading-relaxed">
            Highly interactive, performance-minded experiences with tasteful motion
            and a focus on outcomes.
          </p>
        </div>

        {/* 3×2 Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
          {services.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              icon={serviceIcons[i]}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Bottom CTA row */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{
            opacity   : inView ? 1 : 0,
            transform : inView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.7s, transform 0.7s ease 0.7s",
          }}
        >
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-primary flex items-center gap-2"
          >
            Let's Build Something Great
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
          <button
            onClick={() => scrollTo("#work")}
            className="btn-outline flex items-center gap-2"
          >
            See My Work
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
              <polyline points="12 5 19 12 12 19"/>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}