import { useEffect, useRef, useState } from "react";
import { personal } from "../data/portfolio.js";
import heroVideo from "../assets/bg-video.mp4";

/* ── Palette (change here to restyle the whole hero) ── */
const ACCENT = "#A78BFA";        // violet
const ACCENT_2 = "#60A5FA";      // sky blue
const BASE = "7,7,15";           // near-black (rgb) used for overlays
const GRADIENT_TEXT = `linear-gradient(90deg, ${ACCENT}, ${ACCENT_2})`;

const roles = [
  "Full Stack Developer",
  "React Developer",
  "Node.js Developer",
  "MERN Stack Developer",
];

function useCounter(target, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatPill({ value, suffix, label, animate }) {
  const count = useCounter(value, 1800, animate);
  return (
    <div
      className="flex flex-col items-center justify-center py-4 px-3"
      style={{ background: `rgba(${BASE},0.78)`, backdropFilter: "blur(14px)" }}
    >
      <span className="font-syne font-extrabold text-2xl md:text-3xl text-white leading-none">
        {count}
        <span style={{ color: ACCENT }}>{suffix}</span>
      </span>
      <span className="font-dm text-xs md:text-sm text-white/70 mt-1 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [animate, setAnimate] = useState(false);
  const videoRef = useRef(null);

  /* Typewriter */
  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;
    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        timeout = setTimeout(() => {
          setRoleIndex((i) => (i + 1) % roles.length);
          setTyping(true);
        }, 200);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  /* Start stat counters */
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 600);
    return () => clearTimeout(t);
  }, []);

  /* Force muted autoplay */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  const socials = [
    { icon: <LinkedInIcon />, href: "https://www.linkedin.com/in/sallal-zahid-4984672bb", label: "LinkedIn" },
    { icon: <GithubIcon />, href: "https://github.com/SallalZahid56", label: "GitHub" },
    { icon: <EmailIcon />, href: "mailto:sallalzahid51@gmail.com", label: "Email" },
  ];

  const statData = [
    { value: 2, suffix: "+", label: "Years Exp." },
    { value: 20, suffix: "+", label: "Projects" },
    { value: 5, suffix: "+", label: "Happy Clients" },
    { value: 800, suffix: "+", label: "Code Commits" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Mobile overlay: even darkening because text spans the full width */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none lg:hidden"
        style={{ background: `rgba(${BASE},0.78)` }}
      />

      {/* Desktop overlay: dark on the text side, fades out so the video stays clear on the right */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none hidden lg:block"
        style={{
          background: `linear-gradient(90deg,
            rgba(${BASE},0.95) 0%,
            rgba(${BASE},0.82) 32%,
            rgba(${BASE},0.30) 62%,
            rgba(${BASE},0) 100%)`,
        }}
      />

      {/* Content: left aligned, right side left open for the video */}
      <div className="section-padding w-full pt-[110px] pb-16 relative z-10">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-[620px]">

          <div
            className="flex items-center gap-3 mb-5 animate-fade-up"
            style={{ animationDelay: "0.1s", animationFillMode: "both" }}
          >
            <span className="w-8 h-px" style={{ background: ACCENT }} />
            <span
              className="font-dm text-[11px] uppercase tracking-[3px] font-medium"
              style={{ color: ACCENT }}
            >
              Welcome to my portfolio
            </span>
          </div>

          <p
            className="font-dm text-white/70 text-lg font-light mb-1 animate-fade-up"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            Hi, I'm
          </p>

          <h1
            className="font-syne font-extrabold text-5xl md:text-6xl lg:text-[4.5rem] text-white leading-[1.05] mb-4 animate-fade-up"
            style={{ animationDelay: "0.3s", animationFillMode: "both" }}
          >
            {personal.name.split(" ")[0]}{" "}
            <span
              style={{
                backgroundImage: GRADIENT_TEXT,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                color: "transparent",
              }}
            >
              {personal.name.split(" ")[1]}
            </span>
          </h1>

          <div
            className="flex items-center gap-2 mb-5 h-7 animate-fade-up"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <span className="font-dm text-white/50 text-base font-light">—</span>
            <span className="font-dm text-white text-base md:text-lg font-medium">
              {displayed}
              <span
                className="inline-block w-[2px] h-[18px] ml-[2px] align-middle animate-pulse"
                style={{ background: ACCENT }}
              />
            </span>
          </div>

          <p
            className="font-dm text-white text-sm md:text-[15px] leading-[1.9] max-w-[500px] mb-8 animate-fade-up"
            style={{
              animationDelay: "0.5s",
              animationFillMode: "both",
              opacity: 0.92,
              textShadow: "0 1px 12px rgba(0,0,0,0.6)",
            }}
          >
            I'm a passionate Full Stack Developer with 2+ years of experience building
            modern, scalable web applications from concept to deployment. I specialize
            in the MERN stack — crafting clean frontends with React and robust backends
            with Node.js &amp; Express. I care deeply about performance, clean code, and
            delivering experiences that users actually love.
          </p>

          {/* Buttons + socials */}
          <div
            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-10 animate-fade-up"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            <a
              href="#work"
              className="px-6 py-3 rounded-full font-dm text-sm font-semibold text-white
                         transition-transform duration-200 hover:-translate-y-0.5"
              style={{
                backgroundImage: GRADIENT_TEXT,
                boxShadow: "0 8px 28px rgba(139,92,246,0.35)",
              }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full font-dm text-sm font-semibold text-white
                         border border-white/25 hover:border-white/60
                         transition-colors duration-200"
              style={{ background: `rgba(${BASE},0.5)`, backdropFilter: "blur(10px)" }}
            >
              Contact Me
            </a>

            <div className="flex items-center gap-3">
              {socials.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-full flex items-center justify-center
                             border border-white/15 text-white/70
                             hover:text-white hover:border-white/50
                             transition-all duration-200"
                  style={{ background: `rgba(${BASE},0.6)`, backdropFilter: "blur(12px)" }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Compact stats (kept on the left so the video stays unobstructed) */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-px w-full max-w-[560px]
                       rounded-2xl overflow-hidden border border-white/10 animate-fade-up"
            style={{
              background: "rgba(255,255,255,0.1)",
              animationDelay: "0.8s",
              animationFillMode: "both",
            }}
          >
            {statData.map((s, i) => (
              <StatPill key={i} {...s} animate={animate} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in z-10"
        style={{ animationDelay: "1.3s", animationFillMode: "both" }}
      >
        <span className="font-dm text-[10px] text-white/40 tracking-[4px] uppercase">
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{ background: `linear-gradient(to bottom, ${ACCENT}99, transparent)` }}
        />
        <div
          className="w-1 h-1 rounded-full animate-bounce"
          style={{ background: ACCENT }}
        />
      </div>
    </section>
  );
}