import { useEffect, useRef, useState } from "react";

import payrollImg      from "../assets/payroll.png";
import taskuberImg     from "../assets/taskuber.png";
import infonavigImg    from "../assets/infonavigators.png";
import zetoImg         from "../assets/zeto.png";
import inavImg         from "../assets/infonav.png";
import draftsImg       from "../assets/drafts.png";
import madcutsImg      from "../assets/madcuts.png";

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

const projects = [
  {
    number     : "01",
    title      : "Payroll & Office Management System",
    description: "A full-featured MERN stack payroll system with role-based authentication, Google OAuth, and Google Sheets API integration for automated project syncs. Features complex MongoDB aggregation pipelines for detailed payroll reports and office management.",
    client     : "INFONAV",
    status     : "Live",
    type       : "Full Stack App",
    tags       : ["React.js", "Node.js", "MongoDB", "Express.js", "Google OAuth", "TypeScript"],
    liveUrl    : "https://payroll-system-app.netlify.app/",
    image      : payrollImg,
    gradient   : "from-cyan-400/20 to-blue-600/20",
    accentColor: "#00d4b4",
  },
  {
    number     : "02",
    title      : "Taskuber — SaaS Platform",
    description: "Next.js SaaS application with role-based auth (email/Google), Prisma-backed API for service requests, orders, and vouchers. Includes admin and user dashboards, file uploads, notifications, and automated migrations with a maintainable codebase.",
    client     : "Personal Project",
    status     : "Live",
    type       : "Full Stack SaaS",
    tags       : ["Next.js", "TypeScript", "Prisma", "Tailwind CSS", "REST API", "SaaS"],
    liveUrl    : "https://taskuber-saas-app.netlify.app/",
    image      : taskuberImg,
    gradient   : "from-purple-500/20 to-blue-600/20",
    accentColor: "#a855f7",
  },
  {
    number     : "03",
    title      : "InfoNavigators — Digital Marketing Agency",
    description: "Professional digital marketing agency website built for a real client. Features service showcases, team profiles, testimonials, and lead generation sections with a clean responsive layout optimized for conversions.",
    client     : "InfoNavigators",
    status     : "Live",
    type       : "Agency Website",
    tags       : ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    liveUrl    : "https://infonavigators.com/",
    image      : infonavigImg,
    gradient   : "from-blue-500/20 to-indigo-600/20",
    accentColor: "#60a5fa",
  },
  {
    number     : "04",
    title      : "Zeto Picks — React Landing Page",
    description: "Modern and responsive landing page for Zeto Picks built with React and Tailwind CSS. Features smooth scroll animations, a clean hero section, feature highlights, and a fully responsive layout across all device sizes.",
    client     : "Zeto Picks",
    status     : "Live",
    type       : "React Landing Page",
    tags       : ["React.js", "Tailwind CSS", "JavaScript", "Vite"],
    liveUrl    : "https://zeto-picks.netlify.app/",
    image      : zetoImg,
    gradient   : "from-green-500/20 to-teal-600/20",
    accentColor: "#22c55e",
  },
  {
    number     : "05",
    title      : "INFONAV — Digital Marketing Site",
    description: "Custom website built for INFONAV digital marketing agency. Highlights services, team expertise, client results, and contact information. Fully responsive with a professional and modern design that drives client inquiries.",
    client     : "INFONAV",
    status     : "Live",
    type       : "Agency Website",
    tags       : ["HTML5", "CSS3", "JavaScript", "Responsive"],
    liveUrl    : "https://infonav-html.freelancerszonepk.com/",
    image      : inavImg,
    gradient   : "from-orange-500/20 to-red-600/20",
    accentColor: "#f97316",
  },
  {
    number     : "06",
    title      : "Draft HTML — Landing Page",
    description: "High-converting landing page built with pure HTML and CSS. Focused on clean typography, strong call-to-action sections, and fast load performance without any JavaScript frameworks — just clean semantic markup.",
    client     : "Freelance",
    status     : "Live",
    type       : "HTML Landing Page",
    tags       : ["HTML5", "CSS3", "Responsive Design"],
    liveUrl    : "https://draft-html.freelancerszonepk.com/",
    image      : draftsImg,
    gradient   : "from-yellow-500/20 to-orange-600/20",
    accentColor: "#eab308",
  },
  {
    number     : "07",
    title      : "MadCuts — Barber Shop Landing Page",
    description: "Stylish landing page for MadCuts barber shop. Features a bold and masculine design with appointment booking section, service showcase, pricing table, and gallery — all built with HTML and CSS for maximum performance.",
    client     : "MadCuts",
    status     : "Live",
    type       : "HTML Landing Page",
    tags       : ["HTML5", "CSS3", "Business Landing Page"],
    liveUrl    : "https://madcuts-html.freelancerszonepk.com/",
    image      : madcutsImg,
    gradient   : "from-pink-500/20 to-rose-600/20",
    accentColor: "#ec4899",
  },
];

export default function Work() {
  const [sectionRef, inView] = useInView(0.1);
  const [current, setCurrent]   = useState(0);
  const [animDir, setAnimDir]   = useState(null); // 'left' | 'right'
  const [animating, setAnimating] = useState(false);

  const goTo = (index, dir) => {
    if (animating || index === current) return;
    setAnimDir(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
      setAnimDir(null);
    }, 350);
  };

  const prev = () => goTo(current === 0 ? projects.length - 1 : current - 1, "right");
  const next = () => goTo(current === projects.length - 1 ? 0 : current + 1, "left");

  const p = projects[current];

  // Slide animation styles
  const slideIn = {
    opacity  : animating ? 0 : 1,
    transform: animating
      ? animDir === "left" ? "translateX(-40px)" : "translateX(40px)"
      : "translateX(0)",
    transition: "opacity 0.35s ease, transform 0.35s ease",
  };

  return (
    <section id="work" className="relative section-padding overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute bottom-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,180,0.05) 0%, transparent 65%)" }} />
        <div className="absolute top-[10%] left-[-8%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,80,255,0.04) 0%, transparent 65%)" }} />
      </div>

      <div ref={sectionRef} className="max-w-7xl mx-auto">

        {/* ── Header ── */}
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
            <span className="section-label text-[11px]">Work</span>
            <span className="w-8 h-px bg-cyan-400/60" />
          </div>
          <h2 className="section-title mb-3">
            My Recent <span className="text-gradient">Works</span>
          </h2>
          <p className="font-dm text-white/50 text-[15px] max-w-[480px] leading-relaxed">
            High-performance builds with clean architecture and delightful UI/UX.
          </p>
        </div>

        {/* ── Slider card ── */}
        <div
          style={{
            opacity   : inView ? 1 : 0,
            transform : inView ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s",
          }}
        >
          {/* Main card */}
          <div
            className="work-card relative rounded-3xl border border-white/8 overflow-hidden group"
            style={{ background: "rgba(13,20,34,0.7)", backdropFilter: "blur(20px)" }}
          >
            <div className="flex flex-col lg:flex-row min-h-[480px]" style={slideIn}>

              {/* ── LEFT — Image / visual ── */}
              <div
                className="lg:w-[45%] relative overflow-hidden flex-shrink-0"
                style={{ minHeight: "300px" }}
              >
                {/* Gradient background */}
                <div
                  className="work-left-gradient absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${p.accentColor}18 0%, rgba(0,10,30,0.95) 100%)`,
                  }}
                />

                {/* Real project screenshot */}
                <img
                  src={p.image}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-contain object-center p-4"
                />

                {/* Overlay gradient — left to right fade into card bg */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to right, transparent 55%, rgba(13,20,34,0.95) 100%), linear-gradient(to top, rgba(13,20,34,0.6) 0%, transparent 40%)",
                  }}
                />

                {/* Live badge — bottom left */}
                <div
                  className="work-live-badge absolute bottom-5 left-5 flex items-center gap-2 px-4 py-2 rounded-full border border-white/15"
                  style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(10px)" }}
                >
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
                  <span className="font-dm text-xs text-white/70">Live Project</span>
                </div>

                {/* Project number watermark */}
                <div
                  className="absolute top-4 left-5 font-syne font-extrabold text-[4rem] leading-none select-none"
                  style={{ color: `${p.accentColor}18` }}
                >
                  {p.number}
                </div>
              </div>

              {/* ── RIGHT — Details ── */}
              <div className="flex-1 flex flex-col p-8 lg:p-10">

                {/* Top row — number + type */}
                <div className="flex items-center justify-between mb-5">
                  <span className="font-dm text-[11px] font-medium tracking-[3px] uppercase text-white/25">
                    Project {p.number} / {String(projects.length).padStart(2, "0")}
                  </span>
                  <span
                    className="font-dm text-[11px] font-medium px-3 py-1 rounded-full border"
                    style={{
                      background  : `${p.accentColor}12`,
                      color       : p.accentColor,
                      borderColor : `${p.accentColor}30`,
                    }}
                  >
                    {p.type}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-syne font-extrabold text-2xl md:text-3xl text-white leading-tight mb-4">
                  {p.title}
                </h3>

                {/* Description */}
                <p className="font-dm text-white/60 text-[14.5px] leading-[1.85] mb-6 flex-1">
                  {p.description}
                </p>

                {/* Client + Status row */}
                <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-xl border border-white/6"
                  style={{ background: "rgba(0,0,0,0.2)" }}>
                  <div>
                    <p className="font-dm text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-1">Client</p>
                    <p className="font-dm text-white/80 text-[14px] font-medium">{p.client}</p>
                  </div>
                  <div>
                    <p className="font-dm text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-1">Status</p>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                      <p className="font-dm text-green-400 text-[14px] font-medium">{p.status}</p>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <p className="font-dm text-[10px] font-semibold text-white/25 uppercase tracking-widest mb-3">
                    Technologies
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map(tag => (
                      <span key={tag}
                        className="font-dm text-[12px] font-medium px-3 py-1.5 rounded-full border"
                        style={{
                          background  : `${p.accentColor}08`,
                          color       : p.accentColor,
                          borderColor : `${p.accentColor}25`,
                        }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Visit Website link */}
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 font-dm text-[13px] font-semibold
                             transition-all duration-200 w-fit group/link"
                  style={{ color: p.accentColor }}
                >
                  Visit Website
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-200">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* ── Navigation row ── */}
          <div className="flex items-center justify-between mt-8">

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? "left" : "right")}
                  className="transition-all duration-300 rounded-full"
                  style={{
                    width     : i === current ? "28px" : "8px",
                    height    : "8px",
                    background: i === current ? p.accentColor : "rgba(255,255,255,0.15)",
                  }}
                />
              ))}
            </div>

            {/* Counter */}
            <span className="font-dm text-sm text-white/30">
              <span className="text-white/70 font-medium">{String(current + 1).padStart(2, "0")}</span>
              {" / "}
              {String(projects.length).padStart(2, "0")}
            </span>

            {/* Prev / Next buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-white/10 flex items-center justify-center
                           text-white/50 hover:text-white hover:border-white/30
                           transition-all duration-200 active:scale-95"
                style={{ background: "rgba(13,20,34,0.8)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full flex items-center justify-center
                           text-dark-900 transition-all duration-200 active:scale-95
                           hover:shadow-[0_4px_20px_rgba(0,212,180,0.35)]"
                style={{ background: p.accentColor }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}