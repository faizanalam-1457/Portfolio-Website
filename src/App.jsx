import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';
import Certifications from './components/Certifications';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Background from './components/Background';
import Chatbot from './components/Chatbot';
import InteractiveSystem from './components/InteractiveSystem';
import LoadingScreen from './components/LoadingScreen';
import AnimatedSection, { SectionDivider } from './components/AnimatedSection';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [loading, setLoading] = useState(true);

  // Toggle theme callback
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', next);
      return next;
    });
  };

  // Sync theme with body data-theme attribute
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      {/* Cinematic Loading Screen */}
      {loading && (
        <LoadingScreen onComplete={() => setLoading(false)} />
      )}

      {/* Premium Visual Background System */}
      <Background />
      
      {/* Lagging hardware-accelerated custom cursor */}
      <CustomCursor />
      
      {/* Interactive AI Chatbot Resume Assistant */}
      <Chatbot theme={theme} toggleTheme={toggleTheme} />

      {/* Gamified & Interactive Features (Palette, Terminal, Audio, Konami) */}
      <InteractiveSystem />

      {/* Main Navigation */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Page Layout */}
      <main className="relative z-10 w-full">
        {/* Hero Section */}
        <Hero />

        <SectionDivider />

        {/* About Section */}
        <AnimatedSection animation="fadeUp" delay={0.1}>
          <About />
        </AnimatedSection>

        <SectionDivider />

        {/* Technical Proficiency Grid */}
        <AnimatedSection animation="scaleUp" delay={0.1}>
          <Skills />
        </AnimatedSection>

        <SectionDivider />

        {/* Projects Showcase */}
        <AnimatedSection animation="fadeUp" delay={0.1}>
          <Projects />
        </AnimatedSection>

        <SectionDivider />

        {/* Professional Timeline */}
        <AnimatedSection animation="fadeLeft" delay={0.1}>
          <Experience />
        </AnimatedSection>

        <SectionDivider />

        {/* Education & Certifications Column Grid */}
        <AnimatedSection animation="fadeUp" delay={0.1}>
          <section id="education" className="section py-24 relative">
            <div className="absolute top-[30%] left-[-10%] w-[300px] h-[300px] bg-accent-glow rounded-full blur-[100px] pointer-events-none"></div>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
              <Education />
              <Certifications />
            </div>
          </section>
        </AnimatedSection>

        <SectionDivider />

        {/* Stats & Achievements */}
        <AnimatedSection animation="scaleUp" delay={0.1}>
          <Achievements />
        </AnimatedSection>

        <SectionDivider />

        {/* Contact Form Sheet */}
        <AnimatedSection animation="fadeUp" delay={0.1}>
          <Contact />
        </AnimatedSection>
      </main>

      {/* Footer & Back to top button */}
      <Footer />
    </>
  );
}
