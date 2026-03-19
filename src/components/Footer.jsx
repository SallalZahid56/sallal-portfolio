import { personal } from "../data/portfolio.js";

const navLinks = [
  { label: "Home",       href: "#home"       },
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Services",   href: "#services"   },
  { label: "Experience", href: "#experience" },
  { label: "Work",       href: "#work"       },
  { label: "Contact",    href: "#contact"    },
];

const scrollTo = (href) => {
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
};

const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const GithubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
  </svg>
);
const EmailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/6">

      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(0,212,180,0.4), transparent)" }} />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,212,180,0.04) 0%, transparent 70%)" }} />

      <div className="section-padding py-14 relative z-10">

        {/* ── Top row ── */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 mb-12 max-w-7xl mx-auto">

          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-4 max-w-[280px] text-center md:text-left">
            {/* Logo */}
            <a
              href="#home"
              onClick={e => { e.preventDefault(); scrollTo("#home"); }}
              className="flex items-end gap-[2px] group"
            >
              <span className="font-syne font-extrabold text-2xl text-white tracking-tight">{personal.initials}</span>
              <span className="font-syne font-extrabold text-2xl text-cyan-400">.</span>
              <span className="w-[6px] h-[6px] rounded-full bg-cyan-400 mb-[9px] ml-[2px]
                               animate-pulse-slow group-hover:shadow-[0_0_8px_rgba(0,212,180,0.8)]
                               transition-shadow duration-300" />
            </a>
            <p className="font-dm text-white/40 text-[13.5px] leading-relaxed">
              Full Stack Developer specializing in the MERN stack — building scalable, high-performance web applications.
            </p>
            {/* Socials */}
            <div className="flex gap-3">
              {[
                { icon: <LinkedInIcon />, href: personal.linkedin, label: "LinkedIn" },
                { icon: <GithubIcon />,   href: personal.github,   label: "GitHub"   },
                { icon: <EmailIcon />,    href: `mailto:${personal.email}`, label: "Email" },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-full flex items-center justify-center
                             border border-white/10 text-white/40
                             hover:text-cyan-400 hover:border-cyan-400/45
                             transition-all duration-200"
                  style={{ background: "rgba(13,20,34,0.7)" }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="font-dm text-[11px] font-semibold text-white/25 uppercase tracking-widest mb-1">
              Navigation
            </p>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2">
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                  className="font-dm text-[13.5px] text-white/45 hover:text-cyan-400
                             transition-colors duration-200 cursor-pointer"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact quick info */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <p className="font-dm text-[11px] font-semibold text-white/25 uppercase tracking-widest mb-1">
              Get In Touch
            </p>
            {[
              { label: personal.email,    href: `mailto:${personal.email}` },
              { label: "+92 318 7589187", href: "tel:+923187589187"         },
              { label: "Rahim Yar Khan, Pakistan", href: null               },
            ].map((item, i) => (
              item.href ? (
                <a key={i} href={item.href}
                  className="font-dm text-[13.5px] text-white/45 hover:text-cyan-400 transition-colors duration-200">
                  {item.label}
                </a>
              ) : (
                <p key={i} className="font-dm text-[13.5px] text-white/45">{item.label}</p>
              )
            ))}
          </div>
        </div>

        {/* ── Divider ── */}
        <div className="max-w-7xl mx-auto border-t border-white/[0.06] mb-6" />

        {/* ── Bottom row ── */}
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-dm text-[13px] text-white/30">
            © {year}{" "}
            <span className="text-white/50 font-medium">{personal.name}</span>
            . All rights reserved.
          </p>
          <p className="font-dm text-[13px] text-white/25">
            Designed &amp; Built by{" "}
            <span className="text-cyan-400/70 font-medium">{personal.name}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}