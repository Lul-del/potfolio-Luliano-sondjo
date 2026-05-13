import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ExperienceSection } from './components/ExperienceSection';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0D0D13]">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ExperienceSection />
      <Contact />
      <Footer />
    </div>
  );
}
