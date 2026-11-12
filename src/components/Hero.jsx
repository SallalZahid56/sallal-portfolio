import { useEffect, useRef, useState } from "react";
import { personal } from "../data/portfolio.js";
import heroVideo from "../assets/bg-video.mp4";

/* ── Earthy Green palette (the hero is always dark because of the video) ── */
const ACCENT = "#84a98c";          // Muted Teal
const ACCENT_2 = "#cad2c5";        // Ash Grey
const BASE = "27,36,41";           // deep charcoal (rgb) for overlays
const ON_ACCENT = "#1b2429";       // text on accent buttons
const TEXT = "#f4f6f1";
const MUTED = "rgba(202,210,197,0.82)";
const FAINT = "rgba(202,210,197,0.55)";
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
      <span
        className="font-syne font-extrabold text-2xl md:text-3xl leading-none"
        style={{ color: TEXT }}
      >
        {count}
        <span style={{ color: ACCENT }}>{suffix}</span>
      </span>
      <span
        className="font-dm text-xs md:text-sm mt-1 whitespace-nowrap"
        style={{ color: MUTED }}
      >
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

      {/* Bottom fade: blends the hero into the next section (works in light + dark theme) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 z-[2] pointer-events-none"
        style={{ background: "linear-gradient(to top, var(--bg), transparent)" }}
      />

      {/* Content */}
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
            className="font-dm text-lg font-light mb-1 animate-fade-up"
            style={{ color: MUTED, animationDelay: "0.2s", animationFillMode: "both" }}
          >
            Hi, I'm
          </p>

          <h1
            className="font-syne font-extrabold text-5xl md:text-6xl lg:text-[4.5rem] leading-[1.05] mb-4 animate-fade-up"
            style={{ color: TEXT, animationDelay: "0.3s", animationFillMode: "both" }}
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
            <span className="font-dm text-base font-light" style={{ color: FAINT }}>—</span>
            <span className="font-dm text-base md:text-lg font-medium" style={{ color: TEXT }}>
              {displayed}
              <span
                className="inline-block w-[2px] h-[18px] ml-[2px] align-middle animate-pulse"
                style={{ background: ACCENT }}
              />
            </span>
          </div>

          <p
            className="font-dm text-sm md:text-[15px] leading-[1.9] max-w-[500px] mb-8 animate-fade-up"
            style={{
              color: TEXT,
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
              className="px-6 py-3 rounded-full font-dm text-sm font-semibold
                         transition-all duration-200 hover:-translate-y-0.5 hover:brightness-110"
              style={{
                background: ACCENT,
                color: ON_ACCENT,
                boxShadow: "0 8px 28px rgba(132,169,140,0.3)",
              }}
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3 rounded-full font-dm text-sm font-semibold
                         border border-[#cad2c5]/35 hover:border-[#cad2c5]
                         transition-colors duration-200"
              style={{
                color: TEXT,
                background: `rgba(${BASE},0.5)`,
                backdropFilter: "blur(10px)",
              }}
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
                             border border-[#cad2c5]/20 text-[#cad2c5]/80
                             hover:text-[#f4f6f1] hover:border-[#84a98c]
                             transition-all duration-200"
                  style={{ background: `rgba(${BASE},0.6)`, backdropFilter: "blur(12px)" }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Compact stats */}
          <div
            className="grid grid-cols-2 sm:grid-cols-4 gap-px w-full max-w-[560px]
                       rounded-2xl overflow-hidden border border-[#cad2c5]/15 animate-fade-up"
            style={{
              background: "rgba(202,210,197,0.15)",
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
        <span className="font-dm text-[10px] tracking-[4px] uppercase" style={{ color: FAINT }}>
          Scroll
        </span>
        <div
          className="w-px h-8"
          style={{ background: `linear-gradient(to bottom, ${ACCENT}99, transparent)` }}
        />
        <div className="w-1 h-1 rounded-full animate-bounce" style={{ background: ACCENT }} />
      </div>
    </section>
  );
}