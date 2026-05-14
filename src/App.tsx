import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ExperienceSection } from './components/ExperienceSection';
import { WhyMe } from './components/WhyMe';
import { Blog } from './components/Blog';
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
      <WhyMe />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}
