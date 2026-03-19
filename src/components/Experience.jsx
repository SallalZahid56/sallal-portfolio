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

const experiences = [
  {
    type      : "Job",
    mode      : "Onsite",
    status    : "Current",
    period    : "Sept 2024 — Present",
    role      : "Web Developer",
    company   : "INFONAV",
    location  : "Rahim Yar Khan",
    description: "Working as a Web Developer building scalable, production-ready web applications. Responsible for both frontend and backend development, client integrations, and converting UI/UX designs into pixel-perfect interfaces.",
    achievements: [
      "Developed and maintained scalable backend services using Node.js, Express, and databases.",
      "Integrated Google APIs to automate data workflows and reporting pipelines.",
      "Converted UI/UX designs into responsive web interfaces using HTML, CSS, JavaScript, and React.",
    ],
  },
  {
    type      : "Internship",
    mode      : "Onsite",
    status    : "Completed",
    period    : "July 2024 — Sept 2024",
    role      : "Frontend Intern",
    company   : "INFONAV",
    location  : "Rahim Yar Khan",
    description: "Completed frontend internship at INFONAV, gaining hands-on experience in React development and collaborating with backend teams on real production projects.",
    achievements: [
      "Built responsive and reusable UI components using React and core frontend technologies.",
      "Collaborated with backend developers to integrate REST APIs and enhance application performance.",
    ],
  },
];

const education = [
  {
    degree : "BS Cyber Security",
    school : "KFUEIT — Khwaja Fareed University of Engineering & IT",
    period : "2020 — 2024",
    grade  : "GPA: 2.93 / 4.00",
  },
];

// Badge component
function Badge({ label, color = "cyan" }) {
  const styles = {
    cyan   : "bg-cyan-400/10 text-cyan-400 border-cyan-400/25",
    green  : "bg-green-400/10 text-green-400 border-green-400/25",
    yellow : "bg-yellow-400/10 text-yellow-400 border-yellow-400/25",
    gray   : "bg-white/5 text-white/40 border-white/10",
  };
  return (
    <span className={`font-dm text-[11px] font-medium px-2.5 py-1 rounded-full border ${styles[color]}`}>
      {label}
    </span>
  );
}

export default function Experience() {
  const [sectionRef, inView] = useInView(0.08);

  return (
    <section id="experience" className="relative section-padding overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[-5%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,180,0.05) 0%, transparent 65%)" }} />
      </div>

      <div ref={sectionRef} className="max-w-7xl mx-auto">

        {/* ── Section header ── */}
        <div
          className="flex flex-col items-center text-center mb-16"
          style={{
            opacity   : inView ? 1 : 0,
            transform : inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease, transform 0.7s ease",
          }}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-cyan-400/60" />
            <span className="section-label text-[11px]">Resume</span>
            <span className="w-8 h-px bg-cyan-400/60" />
          </div>
          <h2 className="section-title mb-3">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="font-dm text-white/50 text-[15px] max-w-[460px] leading-relaxed">
            A journey through my professional career and the impact I've made.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

          {/* ── LEFT — Work Experience timeline ── */}
          <div className="flex-1">
            <h3
              className="font-syne font-bold text-xl text-white mb-8"
              style={{
                opacity   : inView ? 1 : 0,
                transform : inView ? "translateY(0)" : "translateY(16px)",
                transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
              }}
            >
              Professional Experience
            </h3>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-[19px] top-2 bottom-2 w-px"
                style={{
                  background     : "linear-gradient(to bottom, #00d4b4, rgba(0,212,180,0.1))",
                  opacity        : inView ? 1 : 0,
                  transition     : "opacity 0.8s ease 0.3s",
                }}
              />

              <div className="flex flex-col gap-8">
                {experiences.map((exp, i) => (
                  <div
                    key={i}
                    className="relative flex gap-6"
                    style={{
                      opacity   : inView ? 1 : 0,
                      transform : inView ? "translateX(0)" : "translateX(-24px)",
                      transition: `opacity 0.7s ease ${0.2 + i * 0.15}s, transform 0.7s ease ${0.2 + i * 0.15}s`,
                    }}
                  >
                    {/* Timeline dot */}
                    <div className="flex-shrink-0 mt-1">
                      <div
                        className="w-10 h-10 rounded-full border-2 border-cyan-400 flex items-center justify-center z-10 relative"
                        style={{ background: "#0a0f1a" }}
                      >
                        <div className="w-3 h-3 rounded-full bg-cyan-400" />
                      </div>
                    </div>

                    {/* Card */}
                    <div
                      className="flex-1 rounded-2xl border border-white/8 p-6 mb-1
                                 hover:border-cyan-400/30 transition-all duration-300
                                 hover:shadow-[0_0_24px_rgba(0,212,180,0.06)]"
                      style={{ background: "rgba(13,20,34,0.65)", backdropFilter: "blur(16px)" }}
                    >
                      {/* Top row — badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        <Badge label={exp.type}   color={exp.type === "Job" ? "cyan" : "yellow"} />
                        <Badge label={exp.mode}   color="gray" />
                        {exp.status === "Current"
                          ? <Badge label="Current"   color="green" />
                          : <Badge label="Completed" color="gray" />
                        }
                        <span className="font-dm text-[12px] text-white/35 ml-auto">
                          {exp.period}
                        </span>
                      </div>

                      {/* Role + company */}
                      <h4 className="font-syne font-bold text-lg text-white mb-0.5">
                        {exp.role}
                      </h4>
                      <p className="font-dm text-cyan-400 text-[13px] font-medium mb-1">
                        @ {exp.company}
                        <span className="text-white/35 font-normal ml-2">— {exp.location}</span>
                      </p>

                      {/* Description */}
                      <p className="font-dm text-white/55 text-[13.5px] leading-[1.75] mb-4 mt-3">
                        {exp.description}
                      </p>

                      {/* Achievements */}
                      <div className="space-y-2">
                        <p className="font-dm text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-2">
                          Key Contributions
                        </p>
                        {exp.achievements.map((ach, j) => (
                          <div key={j} className="flex items-start gap-2.5">
                            <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                            <p className="font-dm text-white/65 text-[13.5px] leading-[1.7]">{ach}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT — Education + Download ── */}
          <div className="lg:w-[340px] flex flex-col gap-8">

            {/* Education */}
            <div
              style={{
                opacity   : inView ? 1 : 0,
                transform : inView ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.7s ease 0.4s, transform 0.7s ease 0.4s",
              }}
            >
              <h3 className="font-syne font-bold text-xl text-white mb-6">Education</h3>

              {education.map((edu, i) => (
                <div
                  key={i}
                  className="relative rounded-2xl border border-white/8 p-6
                             hover:border-cyan-400/30 transition-all duration-300"
                  style={{ background: "rgba(13,20,34,0.65)", backdropFilter: "blur(16px)" }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-cyan-400/60 to-transparent" />

                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-cyan-400/20"
                      style={{ background: "rgba(0,212,180,0.06)" }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00d4b4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                      </svg>
                    </div>
                    <span className="font-dm text-[12px] text-white/35">{edu.period}</span>
                  </div>

                  <h4 className="font-syne font-bold text-base text-white mb-1">{edu.degree}</h4>
                  <p className="font-dm text-cyan-400/80 text-[13px] mb-2">{edu.school}</p>
                  <p className="font-dm text-white/40 text-[12px]">{edu.grade}</p>
                </div>
              ))}
            </div>

            {/* Download resume card */}
            <div
              className="rounded-2xl border border-cyan-400/20 p-6 text-center
                         hover:border-cyan-400/40 hover:shadow-[0_0_30px_rgba(0,212,180,0.08)]
                         transition-all duration-300"
              style={{
                background    : "rgba(13,20,34,0.65)",
                backdropFilter: "blur(16px)",
                opacity       : inView ? 1 : 0,
                transform     : inView ? "translateY(0)" : "translateY(24px)",
                transition    : "opacity 0.7s ease 0.55s, transform 0.7s ease 0.55s, border-color 0.3s, box-shadow 0.3s",
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyan-400/20"
                style={{ background: "rgba(0,212,180,0.07)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00d4b4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="12" y1="18" x2="12" y2="12"/>
                  <polyline points="9 15 12 18 15 15"/>
                </svg>
              </div>

              <h4 className="font-syne font-bold text-lg text-white mb-2">Want to know more?</h4>
              <p className="font-dm text-white/45 text-[13.5px] leading-relaxed mb-5">
                Download my full resume for a detailed overview of my skills and experience.
              </p>

              <a
                href="/Sallal-Zahid_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="btn-primary flex items-center justify-center gap-2 w-full"
              >
                Download Resume
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}