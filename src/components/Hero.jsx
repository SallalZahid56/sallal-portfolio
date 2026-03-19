import { useEffect, useRef, useState } from "react";
import { personal } from "../data/portfolio.js";
import heroImg from "../assets/hero.jpg";

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
      className="flex-1 flex flex-col items-center justify-center py-4 px-3
                 border-r border-white/10 last:border-r-0"
    >
      <span className="font-syne font-extrabold text-3xl md:text-4xl text-white leading-none">
        {count}<span className="text-cyan-400">{suffix}</span>
      </span>
      <span className="font-dm text-sm text-white/60 mt-1 whitespace-nowrap">{label}</span>
    </div>
  );
}

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);
const EmailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing,    setTyping]    = useState(true);
  const [animate,   setAnimate]   = useState(false);
  const imgWrapRef = useRef(null);

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

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const wrap = imgWrapRef.current;
    if (!wrap) return;
    const onMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth  / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1.2) {
        wrap.style.transform = `perspective(800px) rotateY(${dx * 10}deg) rotateX(${-dy * 10}deg) translateY(-14px)`;
      }
    };
    const onLeave = () => { wrap.style.transform = ""; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const socials = [
    { icon: <LinkedInIcon />, href: "https://www.linkedin.com/in/sallal-zahid-4984672bb", label: "LinkedIn" },
    { icon: <GithubIcon />,   href: "https://github.com/SallalZahid56",                   label: "GitHub"   },
    { icon: <EmailIcon />,    href: "mailto:sallalzahid51@gmail.com",                     label: "Email"    },
  ];

  const statData = [
    { value: 2,   suffix: "+", label: "Years Exp."    },
    { value: 15,  suffix: "+", label: "Projects"      },
    { value: 5,   suffix: "+", label: "Happy Clients" },
    { value: 200, suffix: "+", label: "Code Commits"  },
  ];

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,180,0.07) 0%, transparent 65%)" }} />
        <div className="absolute bottom-[5%] left-[-8%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,100,255,0.05) 0%, transparent 65%)" }} />
      </div>

      {/* Two col */}
      <div className="section-padding w-full pt-[110px] pb-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">

            <div className="flex items-center gap-3 mb-5 animate-fade-up"
              style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
              <span className="w-8 h-px bg-cyan-400/60" />
              <span className="section-label text-[11px]">Welcome to my portfolio</span>
              <span className="w-8 h-px bg-cyan-400/60" />
            </div>

            <p className="font-dm text-white/50 text-lg font-light mb-1 animate-fade-up"
              style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
              Hi, I'm
            </p>

            <h1 className="font-syne font-extrabold text-5xl md:text-6xl lg:text-[4.5rem] text-white leading-[1.05] mb-4 animate-fade-up"
              style={{ animationDelay: "0.3s", animationFillMode: "both" }}>
              {personal.name.split(" ")[0]}{" "}
              <span className="text-gradient">{personal.name.split(" ")[1]}</span>
            </h1>

            <div className="flex items-center gap-2 mb-5 h-7 animate-fade-up"
              style={{ animationDelay: "0.4s", animationFillMode: "both" }}>
              <span className="font-dm text-white/40 text-base font-light">—</span>
              <span className="font-dm text-white/80 text-base md:text-lg font-medium">
                {displayed}
                <span className="inline-block w-[2px] h-[18px] bg-cyan-400 ml-[2px] align-middle animate-pulse" />
              </span>
            </div>

            {/* Description — pure white */}
            <p className="font-dm text-white text-sm md:text-[15px] leading-[1.9] max-w-[500px] mb-8 animate-fade-up"
              style={{ animationDelay: "0.5s", animationFillMode: "both", opacity: 0.82 }}>
              I'm a passionate Full Stack Developer with 2+ years of experience building
              modern, scalable web applications from concept to deployment. I specialize
              in the MERN stack — crafting clean frontends with React and robust backends
              with Node.js &amp; Express. I care deeply about performance, clean code, and
              delivering experiences that users actually love.
            </p>

            <div className="flex items-center gap-3 animate-fade-up"
              style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
              {socials.map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className="w-11 h-11 rounded-full flex items-center justify-center
                             border border-white/10 text-white/55
                             hover:text-cyan-400 hover:border-cyan-400/50
                             hover:shadow-[0_0_20px_rgba(0,212,180,0.22)]
                             transition-all duration-200"
                  style={{ background: "rgba(13,20,34,0.7)", backdropFilter: "blur(12px)" }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* RIGHT — blob image */}
          <div className="flex-shrink-0 flex items-center justify-center animate-fade-up"
            style={{ animationDelay: "0.35s", animationFillMode: "both" }}>
            <div ref={imgWrapRef} className="relative"
              style={{ transition: "transform 0.12s ease-out", willChange: "transform",
                       animation: "heroFloat 7s ease-in-out infinite" }}>
              <div className="absolute -inset-6 pointer-events-none"
                style={{ background: "radial-gradient(ellipse, rgba(0,212,180,0.13) 0%, transparent 65%)",
                         borderRadius: "60% 40% 55% 45% / 50% 45% 55% 50%" }} />
              <div className="absolute -inset-[3px] pointer-events-none"
                style={{ background: "conic-gradient(from 0deg, #00d4b4, rgba(0,168,255,0.6), transparent 45%, transparent 55%, rgba(0,168,255,0.6), #00d4b4)",
                         borderRadius: "60% 40% 55% 45% / 50% 45% 55% 50%",
                         opacity: 0.55, animation: "blobRotate 8s linear infinite" }} />
              <div className="relative overflow-hidden border border-cyan-400/20"
                style={{ width: "clamp(260px, 28vw, 360px)", aspectRatio: "3 / 4",
                         borderRadius: "60% 40% 55% 45% / 50% 45% 55% 50%",
                         background: "linear-gradient(160deg, rgba(0,212,180,0.08), rgba(0,60,180,0.06))",
                         animation: "blobMorph 9s ease-in-out infinite" }}>
                <img src={heroImg} alt="Sallal Zahid"
                  className="w-full h-full object-cover object-top"
                  style={{ borderRadius: "inherit" }} />
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "linear-gradient(to top, rgba(10,15,26,0.45) 0%, transparent 40%)",
                           borderRadius: "inherit" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats — full width bar */}
      <div className="section-padding pt-0 pb-14 relative z-10 animate-fade-up"
        style={{ animationDelay: "0.8s", animationFillMode: "both" }}>
        <div
          className="flex items-stretch rounded-2xl overflow-hidden border border-white/10"
          style={{ background: "rgba(13,20,34,0.7)", backdropFilter: "blur(16px)" }}
        >
          {statData.map((s, i) => (
            <StatPill key={i} {...s} animate={animate} />
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                      animate-fade-in z-10" style={{ animationDelay: "1.3s", animationFillMode: "both" }}>
        <span className="font-dm text-[10px] text-white/20 tracking-[4px] uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-cyan-400/40 to-transparent" />
        <div className="w-1 h-1 rounded-full bg-cyan-400/40 animate-bounce" />
      </div>

      <style>{`
        @keyframes heroFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes blobMorph {
          0%,100%{border-radius:60% 40% 55% 45%/50% 45% 55% 50%}
          25%{border-radius:50% 50% 40% 60%/55% 40% 60% 45%}
          50%{border-radius:40% 60% 50% 50%/45% 55% 45% 55%}
          75%{border-radius:55% 45% 60% 40%/50% 60% 40% 50%}
        }
        @keyframes blobRotate { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>
    </section>
  );
}