import ParticleBackground from "./components/ParticleBackground";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

const Placeholder = ({ id, label }) => (
  <section id={id} className="min-h-screen flex items-center justify-center border-b border-white/5">
    <p className="font-syne text-4xl font-bold text-white/10 tracking-wider uppercase">{label}</p>
  </section>
);

export default function App() {
  return (
    <>
      {/* ── body background color set on html/body in index.css ── */}
      {/* Canvas fixed behind everything at z-index 0              */}
      <ParticleBackground />

      {/* Wrapper has NO background — transparent so canvas shows  */}
      <div style={{ position: "relative", zIndex: 2, backgroundColor: "transparent" }}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Services />
        <Experience />
        <Work />
        <Contact />
        <Footer />
      </div>
    </>
  );
}