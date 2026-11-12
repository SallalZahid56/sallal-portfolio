import { useEffect, useRef, useState } from "react";
import { personal } from "../data/portfolio.js";
import heroImg from "../assets/hero.jpg";

/* Neue Montreal first, Arial as the fallback */
const FONT = '"Neue Montreal", Arial, Helvetica, sans-serif';

const techTags = [
  "React.js", "Next.js", "Node.js", "Express.js",
  "MongoDB", "PostgreSQL", "Tailwind CSS", "JavaScript",
  "TypeScript", "API Integration", "REST APIs", "GraphQL",
  "Git", "Docker",
];

const highlights = [
  { value: "2+",       label: "Years of experience" },
  { value: "Frontend", label: "React.js · Next.js" },
  { value: "Backend",  label: "Node.js · Express.js" },
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
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
  </svg>
);
const GithubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);
const EmailIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

export default function About() {
  const [sectionRef, inView] = useInView(0.1);

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const fadeUp = (delay, to = 1) => ({
    opacity: inView ? to : 0,
    transform: inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  const socials = [
    { icon: <LinkedInIcon />, href: "https://www.linkedin.com/in/sallal-zahid-4984672bb", label: "LinkedIn" },
    { icon: <GithubIcon />,   href: "https://github.com/SallalZahid56",                   label: "GitHub"   },
    { icon: <EmailIcon />,    href: "mailto:sallalzahid51@gmail.com",                     label: "Email"    },
  ];

  return (
    <section
      id="about"
      className="relative section-padding overflow-hidden"
      style={{ fontFamily: FONT }}
    >
      <div
        ref={sectionRef}
        className="about-card relative max-w-6xl mx-auto rounded-3xl overflow-hidden"
        style={{
          background: "var(--surface-strong)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid var(--line)",
          boxShadow:
            "0 -1px 0 rgb(var(--accent-rgb) / 0.35), 0 24px 60px rgba(0,0,0,0.18)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-[-10%] right-[-8%] w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgb(var(--accent-rgb) / 0.12) 0%, transparent 65%)",
          }}
        />

        <div className="relative z-10 p-8 md:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-12 lg:gap-16 items-center">

            {/* ── LEFT: statement ── */}
            <div>
              {/* Small circular profile photo + label */}
              <div className="flex items-center gap-4 mb-7" style={fadeUp(0.1)}>
                <img
                  src={heroImg}
                  alt={personal.name}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover object-top flex-shrink-0"
                  style={{
                    border: "2px solid var(--accent)",
                    boxShadow: "0 0 0 5px rgb(var(--accent-rgb) / 0.15)",
                  }}
                />
                <div>
                  <p
                    className="text-[11px] uppercase font-medium mb-1"
                    style={{ color: "var(--accent)", letterSpacing: "0.25em" }}
                  >
                    About Me
                  </p>
                  <p
                    className="text-lg md:text-xl font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {personal.name}
                  </p>
                </div>
              </div>

              <h2
                className="text-3xl md:text-4xl lg:text-[2.75rem] leading-[1.15] mb-6"
                style={{
                  color: "var(--text)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  ...fadeUp(0.2),
                }}
              >
                I am a Professional{" "}
                <span className="text-gradient">Full-Stack</span> Web Developer
              </h2>

              <p
                className="text-[15px] leading-[1.85] mb-4 max-w-[560px]"
                style={{ color: "var(--text)", ...fadeUp(0.3, 0.82) }}
              >
                I'm a Software Engineer with 2+ years of development experience, specializing
                in building modern, scalable web applications. My expertise spans both frontend
                and backend technologies, enabling me to develop complete, end-to-end solutions.
              </p>

              <p
                className="text-[15px] leading-[1.85] mb-8 max-w-[560px]"
                style={{ color: "var(--text)", ...fadeUp(0.4, 0.82) }}
              >
                On the frontend I work extensively with React.js and Next.js, crafting responsive,
                user-friendly interfaces. On the backend I specialize in Node.js, Express.js, and
                REST APIs — building robust, scalable architectures and efficient server-side solutions.
              </p>

              {/* CTA + socials */}
              <div className="flex flex-wrap items-center gap-4" style={fadeUp(0.5)}>
                <button
                  onClick={() => scrollTo("#work")}
                  className="btn-primary flex items-center gap-2"
                  style={{ fontFamily: FONT }}
                >
                  My Recent Work
                  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                <div className="flex items-center gap-2.5">
                  {socials.map(({ icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="social-btn w-10 h-10 rounded-full flex items-center justify-center
                                 text-white border border-white/15
                                 hover:text-cyan-400 hover:border-cyan-400/50
                                 transition-all duration-200"
                      style={{ background: "var(--surface)" }}
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT: highlights + tech stack ── */}
            <div className="flex flex-col gap-4" style={fadeUp(0.3)}>
              <div className="grid grid-cols-3 gap-3">
                {highlights.map((h) => (
                  <div
                    key={h.label}
                    className="card-dark rounded-2xl px-3 py-4 text-center"
                  >
                    <p
                      className="text-xl md:text-2xl leading-none"
                      style={{ color: "var(--accent)", fontWeight: 600 }}
                    >
                      {h.value}
                    </p>
                    <p
                      className="text-[11px] mt-2 leading-snug"
                      style={{ color: "var(--text)", opacity: 0.6 }}
                    >
                      {h.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="card-dark rounded-2xl p-6">
                <p
                  className="text-[11px] uppercase font-medium mb-4"
                  style={{ color: "var(--text)", opacity: 0.55, letterSpacing: "0.2em" }}
                >
                  Tech I work with
                </p>
                <div className="flex flex-wrap gap-2">
                  {techTags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[13px] font-medium text-cyan-400 px-3 py-1.5 rounded-full
                                 border border-cyan-400/25 bg-cyan-400/5
                                 hover:bg-cyan-400/10 hover:border-cyan-400/50
                                 transition-all duration-200 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}