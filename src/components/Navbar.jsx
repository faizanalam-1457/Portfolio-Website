import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { highlightSection } from '../utils/sectionHighlight';

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // 1. Navbar shrink & background transition
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // 2. Reading progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }

      // 3. Active Section highlighting
      const sections = navItems.map(item => document.getElementById(item.id));
      let currentSection = 'home';
      
      sections.forEach(section => {
        if (!section) return;
        const sectionTop = section.offsetTop - 150; // offset for sticky header
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.id;
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 70; // Header height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      highlightSection(id);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ transition: 'all 0.3s ease' }}>
      <a href="#home" className="nav-logo" onClick={(e) => handleLinkClick(e, 'home')}>
        <span className="gradient-text font-title font-extrabold tracking-wider">FAIZAN</span>
        <span className="text-accent-secondary font-normal text-sm">.AI</span>
      </a>

      {/* Desktop Links */}
      <ul className="nav-links hidden md:flex items-center gap-8 list-none">
        {navItems.map((item) => (
          <li
            key={item.id}
            className={`nav-item relative py-2 ${activeSection === item.id ? 'active' : ''}`}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className="text-text-secondary hover:text-text-primary font-medium tracking-wide transition-colors relative duration-300 py-1"
            >
              {item.label}
              
              {/* Premium Sliding Glowing Underline */}
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-primary to-accent-secondary shadow-[0_0_10px_var(--accent-secondary)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button
          className="mobile-menu-btn md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Scroll Progress Bar at bottom of navbar */}
      <div className="scroll-progress-container">
        <div
          className="scroll-progress-bar"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[70px] left-0 w-full bg-bg-secondary border-b border-border-glass backdrop-blur-2xl flex flex-col p-6 gap-4 z-50 md:hidden shadow-lg"
          >
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleLinkClick(e, item.id)}
                className={`py-3 px-4 rounded-xl text-lg font-medium transition-all ${
                  activeSection === item.id 
                    ? 'bg-accent-glow text-accent-secondary border-l-4 border-accent-primary pl-6' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
