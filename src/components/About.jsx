import { useEffect, useRef, useState } from "react";
import heroImg from "../assets/hero.jpg";

const techTags = [
  "React.js", "Next.js", "Node.js", "Express.js",
  "MongoDB", "PostgreSQL", "Tailwind CSS", "JavaScript", "Api Integration",
  "TypeScript", "Git", "Docker", "REST APIs, GraphQL",
];

function useInView(threshold = 0.15) {
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

export default function About() {
  const [sectionRef, inView] = useInView(0.1);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUp = (delay) => ({
    opacity   : inView ? 1 : 0,
    transform : inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  const socials = [
    { icon: <LinkedInIcon />, href: "https://www.linkedin.com/in/sallal-zahid-4984672bb", label: "LinkedIn" },
    { icon: <GithubIcon />,   href: "https://github.com/SallalZahid56",                   label: "GitHub"   },
    { icon: <EmailIcon />,    href: "mailto:sallalzahid51@gmail.com",                     label: "Email"    },
  ];

  return (
    <section id="about" className="relative section-padding overflow-hidden">

      {/* ── Card wrapper with top divider shadow line ── */}
      <div
        ref={sectionRef}
        className="about-card relative max-w-7xl mx-auto rounded-3xl overflow-hidden"
        style={{
          background  : "rgba(10,14,22,0.85)",
          backdropFilter: "blur(20px)",
          border      : "1px solid rgba(255,255,255,0.07)",
          // Top glowing shadow line
          boxShadow   : "0 -1px 0 rgba(0,212,180,0.25), 0 0 60px rgba(0,212,180,0.04), inset 0 1px 0 rgba(0,212,180,0.15)",
        }}
      >
        {/* Subtle inner dark bg — kills particle dots inside card */}
        <div className="about-overlay absolute inset-0 pointer-events-none"
          style={{ background: "rgba(8,12,20,0.6)", zIndex: 0 }} />

        {/* Ambient glow inside card */}
        <div className="absolute top-1/2 left-[-8%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(0,212,180,0.06) 0%, transparent 65%)",
                   transform: "translateY(-50%)", zIndex: 0 }} />

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-20">

            {/* ── LEFT — Image + social icons ── */}
            <div
              className="flex-shrink-0 flex flex-col items-center mx-auto lg:mx-0"
              style={{
                opacity   : inView ? 1 : 0,
                transform : inView ? "translateX(0)" : "translateX(-40px)",
                transition: "opacity 0.8s ease, transform 0.8s ease",
              }}
            >
              <div className="relative">
                {/* Corner accents */}
                <span className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-cyan-400 rounded-tl-md z-10" />
                <span className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-cyan-400 rounded-tr-md z-10" />
                <span className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-cyan-400 rounded-bl-md z-10" />
                <span className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-cyan-400 rounded-br-md z-10" />

                {/* Removed spinning conic border to keep image background static */}

                {/* Outer glow */}
                <div className="absolute -inset-5 rounded-2xl pointer-events-none"
                  style={{ background: "radial-gradient(ellipse, rgba(0,212,180,0.09) 0%, transparent 65%)" }} />

                {/* Image */}
                <div className="relative overflow-hidden rounded-2xl border border-cyan-400/20"
                  style={{ width: "clamp(240px, 24vw, 300px)", aspectRatio: "3/4",
                           background: "linear-gradient(160deg, rgba(0,212,180,0.08), rgba(0,60,180,0.06))" }}>
                  <img src={heroImg} alt="Sallal Zahid"
                    className="w-full h-full object-cover object-top" />
                  {/* Bottom fade for social overlap area */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(8,12,20,0.9), transparent)" }} />
                </div>

                {/* Social icons — half on image, half below */}
                <div className="absolute -bottom-5 left-0 right-0 flex items-center justify-center gap-3 z-20">
                  {socials.map(({ icon, href, label }) => (
                      <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                        className="social-btn w-10 h-10 rounded-full flex items-center justify-center
                                   text-white hover:text-cyan-400
                                   hover:shadow-[0_0_16px_rgba(0,212,180,0.3)]
                                   transition-all duration-200 border border-white/15
                                   hover:border-cyan-400/50"
                        style={{ background: "rgba(13,20,34,0.95)", backdropFilter: "blur(12px)" }}>
                        {icon}
                      </a>
                  ))}
                </div>
              </div>

              {/* Space below for social icons overflow */}
              <div className="h-10" />

              {/* Experience badge */}
              <div className="card-dark rounded-2xl px-5 py-3 border border-cyan-400/20 mt-1 text-center">
                <p className="font-syne font-extrabold text-2xl text-cyan-400 leading-none">2+</p>
                <p className="font-dm text-xs text-white/50 mt-1 whitespace-nowrap">Years of Experience</p>
              </div>
            </div>

            {/* ── RIGHT — Content ── */}
            <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left pt-2">

              {/* Label */}
              <div className="flex items-center gap-3 mb-4" style={fadeUp(0.1)}>
                <span className="w-8 h-px bg-cyan-400/60" />
                <span className="section-label text-[11px]">About Me</span>
              </div>

              {/* Heading */}
              <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-white leading-tight mb-6"
                style={fadeUp(0.2)}>
                I am a Professional{" "}
                <span className="text-gradient">Full-Stack</span>{" "}
                Web Developer
              </h2>

              {/* Para 1 — pure white */}
              <p className="font-dm text-white text-[15px] leading-[1.9] mb-4 max-w-[560px]"
                style={{ ...fadeUp(0.3), opacity: inView ? 0.85 : 0 }}>
                I'm a Software Engineer with 2+ years of development experience, specializing
                in building modern, scalable web applications. My expertise spans both frontend
                and backend technologies, enabling me to develop complete, end-to-end solutions.
              </p>

              {/* Para 2 — pure white */}
              <p className="font-dm text-white text-[15px] leading-[1.9] mb-8 max-w-[560px]"
                style={{ ...fadeUp(0.4), opacity: inView ? 0.85 : 0 }}>
                On the frontend I work extensively with React.js and Next.js, crafting responsive,
                user-friendly interfaces. On the backend I specialize in Node.js, Express.js, and
                REST APIs — building robust, scalable architectures and efficient server-side solutions.
              </p>

              {/* Tech tags */}
              <div className="flex flex-wrap gap-2 mb-10 justify-center lg:justify-start"
                style={fadeUp(0.5)}>
                {techTags.map((tag) => (
                  <span key={tag}
                    className="font-dm text-[13px] font-medium text-cyan-400 px-3 py-1.5
                               rounded-full border border-cyan-400/25
                               hover:bg-cyan-400/10 hover:border-cyan-400/50
                               transition-all duration-200 cursor-default"
                    style={{ background: "rgba(0,212,180,0.05)" }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div style={fadeUp(0.6)}>
                <button onClick={() => scrollTo("#work")}
                  className="btn-primary flex items-center gap-2">
                  My Recent Work
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Removed aboutSpin keyframes to stop background rotation */}
    </section>
  );
}