import { useEffect, useRef, useState } from "react";
import { personal } from "../data/portfolio.js";

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

const contactInfo = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    label: "Address",
    value: "Rahim Yar Khan, Punjab, Pakistan",
    href : null,
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    label: "Email",
    value: "sallalzahid51@gmail.com",
    href : "mailto:sallalzahid51@gmail.com",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 5.5 5.5l1.21-1.21a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.27 15l-.35 1.92z"/>
      </svg>
    ),
    label: "Phone",
    value: "+92 318 7589187",
    href : "tel:+923187589187",
  },
];

export default function Contact() {
  const [sectionRef, inView] = useInView(0.08);
  const [form, setForm]       = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [status, setStatus]   = useState(null); // 'sending' | 'sent' | 'error'

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate send — replace with your API/EmailJS/Formspree endpoint
    setTimeout(() => setStatus("sent"), 1500);
  };

  const fadeUp = (delay) => ({
    opacity   : inView ? 1 : 0,
    transform : inView ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section id="contact" className="relative section-padding overflow-hidden">

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-[-5%] right-[-5%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,212,180,0.06) 0%, transparent 65%)" }} />
        <div className="absolute bottom-[-5%] left-[-5%] w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,80,255,0.04) 0%, transparent 65%)" }} />
      </div>

      <div ref={sectionRef} className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14" style={fadeUp(0)}>
          <div className="flex items-center gap-3 mb-3">
            <span className="w-8 h-px bg-cyan-400/60" />
            <span className="section-label text-[11px]">Contact</span>
            <span className="w-8 h-px bg-cyan-400/60" />
          </div>
          <h2 className="section-title mb-3">
            Let's Work <span className="text-gradient">Together</span>
          </h2>
          <p className="font-dm text-white/50 text-[15px] max-w-[460px] leading-relaxed">
            Reach out for collaborations, freelance work, or just to say hi.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-14">

          {/* ── LEFT — Contact info ── */}
          <div className="lg:w-[380px] flex flex-col gap-6 flex-shrink-0">

            <p className="font-dm text-white/55 text-[15px] leading-relaxed" style={fadeUp(0.1)}>
              Feel free to reach out through any of these channels. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
            </p>

            {/* Info cards */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-white/7
                             hover:border-cyan-400/25 transition-all duration-300"
                  style={{
                    background: "rgba(13,20,34,0.65)",
                    backdropFilter: "blur(12px)",
                    ...fadeUp(0.15 + i * 0.1),
                  }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0
                               border border-cyan-400/20 text-cyan-400"
                    style={{ background: "rgba(0,212,180,0.06)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <p className="font-dm text-[11px] font-semibold text-white/30 uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a href={item.href}
                        className="font-dm text-white/80 text-[14px] hover:text-cyan-400 transition-colors duration-200">
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-dm text-white/80 text-[14px]">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div style={fadeUp(0.45)}>
              <p className="font-dm text-[11px] font-semibold text-white/25 uppercase tracking-widest mb-3">
                Follow Me
              </p>
              <div className="flex gap-3">
                {[
                  { icon: <LinkedInIcon />, href: personal.linkedin, label: "LinkedIn" },
                  { icon: <GithubIcon />,   href: personal.github,   label: "GitHub"   },
                ].map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                    className="w-11 h-11 rounded-full flex items-center justify-center
                               border border-white/10 text-white/45
                               hover:text-cyan-400 hover:border-cyan-400/50
                               hover:shadow-[0_0_16px_rgba(0,212,180,0.2)]
                               transition-all duration-200"
                    style={{ background: "rgba(13,20,34,0.7)", backdropFilter: "blur(12px)" }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT — Contact form ── */}
          <div className="flex-1" style={fadeUp(0.2)}>
            <div
              className="rounded-3xl border border-white/8 p-7 md:p-9"
              style={{ background: "rgba(13,20,34,0.7)", backdropFilter: "blur(20px)" }}
            >
              <h3 className="font-syne font-bold text-xl text-white mb-6">Send a Message</h3>

              {status === "sent" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-cyan-400/30"
                    style={{ background: "rgba(0,212,180,0.1)" }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00d4b4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  <h4 className="font-syne font-bold text-xl text-white mb-2">Message Sent!</h4>
                  <p className="font-dm text-white/50 text-[14px] mb-6">Thanks for reaching out. I'll get back to you soon.</p>
                  <button onClick={() => { setStatus(null); setForm({ name:"",email:"",phone:"",subject:"",message:"" }); }}
                    className="btn-outline text-sm">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-dm text-[12px] text-white/40 font-medium">
                        Your Name <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange} required
                        placeholder="Sallal Zahid"
                        className="w-full px-4 py-3 rounded-xl font-dm text-[14px] text-white
                                   placeholder-white/20 outline-none border border-white/8
                                   focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(0,212,180,0.1)]
                                   transition-all duration-200"
                        style={{ background: "rgba(0,0,0,0.3)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-dm text-[12px] text-white/40 font-medium">
                        Email <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange} required
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl font-dm text-[14px] text-white
                                   placeholder-white/20 outline-none border border-white/8
                                   focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(0,212,180,0.1)]
                                   transition-all duration-200"
                        style={{ background: "rgba(0,0,0,0.3)" }}
                      />
                    </div>
                  </div>

                  {/* Phone + Subject */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-dm text-[12px] text-white/40 font-medium">Phone</label>
                      <input
                        type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+92 300 0000000"
                        className="w-full px-4 py-3 rounded-xl font-dm text-[14px] text-white
                                   placeholder-white/20 outline-none border border-white/8
                                   focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(0,212,180,0.1)]
                                   transition-all duration-200"
                        style={{ background: "rgba(0,0,0,0.3)" }}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-dm text-[12px] text-white/40 font-medium">
                        Subject <span className="text-cyan-400">*</span>
                      </label>
                      <input
                        type="text" name="subject" value={form.subject} onChange={handleChange} required
                        placeholder="Project Discussion"
                        className="w-full px-4 py-3 rounded-xl font-dm text-[14px] text-white
                                   placeholder-white/20 outline-none border border-white/8
                                   focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(0,212,180,0.1)]
                                   transition-all duration-200"
                        style={{ background: "rgba(0,0,0,0.3)" }}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="font-dm text-[12px] text-white/40 font-medium">Description</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl font-dm text-[14px] text-white
                                 placeholder-white/20 outline-none border border-white/8 resize-none
                                 focus:border-cyan-400/50 focus:shadow-[0_0_0_3px_rgba(0,212,180,0.1)]
                                 transition-all duration-200"
                      style={{ background: "rgba(0,0,0,0.3)" }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="btn-primary flex items-center justify-center gap-2 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                          fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}