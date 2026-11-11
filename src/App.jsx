import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
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
  );
}