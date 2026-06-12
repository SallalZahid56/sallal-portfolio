import { useState, useEffect } from "react";
import { personal } from "../data/portfolio";

const navLinks = [
  { label: "Home",       href: "#home" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Services",   href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Work",       href: "#work" },
  { label: "Contact",    href: "#contact" },
];

const SunIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1" x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);

const MoonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

export default function Navbar() {
  const [activeId, setActiveId] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  // Apply theme to document and persist preference
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) {
      const isDark = saved === "dark";
      setDarkMode(isDark);
      if (isDark) document.documentElement.classList.remove("light");
      else document.documentElement.classList.add("light");
    } else {
      // default: dark
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const onScroll = () => {
      const ids = navLinks.map(l => l.href.replace("#", ""));
      let current = "home";
      ids.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
      setActiveId(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  const pillStyle = darkMode
    ? {
        background: "rgba(13, 20, 34, 0.80)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      }
    : {
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
      };

  return (
    <>
      {/* ── NAVBAR — transparent wrapper, 3 zones ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[4%] pt-4 h-[76px]">

        {/* LEFT — Logo */}
        <a
          href="#home"
          onClick={e => handleNavClick(e, "#home")}
          className="flex items-end gap-[2px] group flex-shrink-0"
        >
          <span className="font-syne font-extrabold text-[1.5rem] text-white tracking-tight leading-none">
            {personal.initials}
          </span>
          <span className="font-syne font-extrabold text-[1.5rem] text-cyan-400 leading-none">.</span>
          <span className="w-[6px] h-[6px] rounded-full bg-cyan-400 mb-[9px] ml-[2px]
                           animate-pulse-slow transition-shadow duration-300
                           group-hover:shadow-[0_0_8px_rgba(0,212,180,0.9)]" />
        </a>

        {/* CENTER — Pill: nav links + divider + Resume + Hire Me */}
        <div
          className="hidden lg:flex items-center gap-[3px] px-2 py-[7px] rounded-full
                     border border-white/[0.09] shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
          style={pillStyle}
        >
          {navLinks.map(link => {
            const isActive = activeId === link.href.replace("#", "");
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={e => handleNavClick(e, link.href)}
                className={`font-dm text-[13px] font-medium px-[14px] py-[6px] rounded-full
                  transition-all duration-200 whitespace-nowrap select-none
                  ${isActive
                    ? "text-dark-900 bg-cyan-400 shadow-[0_2px_14px_rgba(0,212,180,0.4)]"
                    : "text-white/55 hover:text-white hover:bg-white/[0.08]"
                  }`}
              >
                {link.label}
              </a>
            );
          })}

          {/* Divider */}
          <span className="w-px h-[18px] bg-white/10 mx-[6px] flex-shrink-0" />

          {/* Resume */}
          <a
            href={personal.resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="font-dm text-[12px] font-medium tracking-[0.06em] uppercase text-cyan-400
                       px-[14px] py-[6px] rounded-full border border-cyan-400/30
                       hover:bg-cyan-400/10 hover:border-cyan-400/60
                       transition-all duration-200 whitespace-nowrap flex-shrink-0"
          >
            Resume
          </a>

          {/* Hire Me */}
          <a
            href="#contact"
            onClick={e => handleNavClick(e, "#contact")}
            className="font-dm text-[12px] font-semibold tracking-[0.06em] uppercase
                       text-dark-900 bg-cyan-400 px-[14px] py-[6px] rounded-full
                       hover:bg-cyan-500 hover:shadow-[0_4px_16px_rgba(0,212,180,0.4)]
                       transition-all duration-200 whitespace-nowrap flex-shrink-0"
          >
            Hire Me
          </a>
        </div>

        {/* RIGHT — Theme toggle + mobile hamburger */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Theme toggle button */}
          <button
            onClick={() => setDarkMode(prev => !prev)}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-full border border-white/[0.09] flex items-center justify-center
                       text-white/50 hover:text-cyan-400 hover:border-cyan-400/40
                       transition-all duration-200"
            style={pillStyle}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            className="lg:hidden w-9 h-9 rounded-full border border-white/[0.09]
                       flex flex-col items-center justify-center gap-[5px]
                       transition-all duration-200"
            style={pillStyle}
          >
            <span className={`block w-[18px] h-[1.5px] rounded-full transition-all duration-300
              ${menuOpen ? "translate-y-[6.5px] rotate-45 bg-cyan-400" : "bg-white/80"}`} />
            <span className={`block w-[18px] h-[1.5px] rounded-full transition-all duration-300
              ${menuOpen ? "opacity-0 scale-x-0" : "bg-white/80"}`} />
            <span className={`block w-[18px] h-[1.5px] rounded-full transition-all duration-300
              ${menuOpen ? "-translate-y-[6.5px] -rotate-45 bg-cyan-400" : "bg-white/80"}`} />
          </button>
        </div>
      </nav>

      {/* ── MOBILE MENU — floating card, drops below navbar ── */}
      <div
        className={`fixed top-[82px] left-[4%] right-[4%] z-40 rounded-2xl
          border border-white/[0.09] px-3 pb-4 pt-3
          transition-all duration-300 ease-in-out lg:hidden
          ${menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-3 pointer-events-none"}`}
        style={
          darkMode
            ? {
                background: "rgba(10, 15, 26, 0.97)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }
            : {
                background: "rgba(255,255,255,0.96)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }
        }
      >
        <ul className="flex flex-col gap-[2px] mb-3">
          {navLinks.map(link => {
            const isActive = activeId === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={e => handleNavClick(e, link.href)}
                  className={`flex items-center font-dm font-medium text-[14px] px-4 py-[10px] rounded-xl
                    transition-all duration-200 border-l-2
                    ${isActive
                      ? "text-cyan-400 bg-cyan-400/[0.08] border-cyan-400"
                      : "text-white/55 border-transparent hover:text-white hover:bg-white/[0.04] hover:border-cyan-400/30"
                    }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex gap-2 pt-3 border-t border-white/[0.06]">
          <a href={personal.resumeUrl} target="_blank" rel="noreferrer"
            className="btn-outline text-[11px] py-2 px-3 flex-1 text-center">
            Resume
          </a>
          <a href="#contact" onClick={e => handleNavClick(e, "#contact")}
            className="btn-primary text-[11px] py-2 px-3 flex-1 text-center">
            Hire Me
          </a>
        </div>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
