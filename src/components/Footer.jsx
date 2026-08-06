import React, { useState, useEffect } from 'react';
import { ArrowUp, Mail, Code2, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin } from './SocialIcons';
import { highlightSection } from '../utils/sectionHighlight';

export default function Footer() {
  const [backToTopVisible, setBackToTopVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setBackToTopVisible(true);
      } else {
        setBackToTopVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    highlightSection('home');
  };

  const handleLinkClick = (e, id) => {
    e.preventDefault();
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
    <>
      <footer className="footer border-t border-border-glass/40 bg-bg-secondary/40 py-12 relative z-10">
        <div className="footer-container max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="flex flex-col items-center md:items-start gap-2">
            <a href="#home" className="footer-logo no-underline flex items-center gap-1" onClick={(e) => handleLinkClick(e, 'home')}>
              <span className="gradient-text font-title font-extrabold tracking-wider">FAIZAN</span>
              <span className="text-accent-secondary font-normal text-sm">.AI</span>
            </a>
            <p className="text-xs text-text-muted mt-1">Building intelligent agents & full-stack web architectures.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-text-secondary">
            <a href="#home" onClick={(e) => handleLinkClick(e, 'home')} className="hover:text-accent-secondary transition-colors no-underline">Home</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:text-accent-secondary transition-colors no-underline">About</a>
            <a href="#skills" onClick={(e) => handleLinkClick(e, 'skills')} className="hover:text-accent-secondary transition-colors no-underline">Skills</a>
            <a href="#projects" onClick={(e) => handleLinkClick(e, 'projects')} className="hover:text-accent-secondary transition-colors no-underline">Projects</a>
            <a href="#experience" onClick={(e) => handleLinkClick(e, 'experience')} className="hover:text-accent-secondary transition-colors no-underline">Experience</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, 'contact')} className="hover:text-accent-secondary transition-colors no-underline">Contact</a>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-3">
            <div className="footer-socials flex items-center gap-3">
              <a href="mailto:faizanalam1457@gmail.com" className="p-2 bg-bg-secondary border border-border-glass rounded-xl text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-all duration-300" title="Email">
                <Mail size={16} />
              </a>
              <a href="https://linkedin.com/in/faizan-alam-858a5630a" target="_blank" rel="noopener noreferrer" className="p-2 bg-bg-secondary border border-border-glass rounded-xl text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-all duration-300" title="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://github.com/faizanalam-1457" target="_blank" rel="noopener noreferrer" className="p-2 bg-bg-secondary border border-border-glass rounded-xl text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-all duration-300" title="GitHub">
                <Github size={16} />
              </a>
              <a href="https://leetcode.com/u/faizanalam1457" target="_blank" rel="noopener noreferrer" className="p-2 bg-bg-secondary border border-border-glass rounded-xl text-text-secondary hover:text-accent-primary hover:border-accent-primary transition-all duration-300" title="LeetCode">
                <Code2 size={16} />
              </a>
            </div>
            <div className="text-[10px] text-text-muted mt-1 font-light">
              &copy; {new Date().getFullYear()} Faizan Alam. All rights reserved.
            </div>
          </div>

        </div>
      </footer>

      {/* Floating Animated Back To Top Button */}
      <AnimatePresence>
        {backToTopVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            whileHover={{ scale: 1.1, translateY: -2 }}
            whileTap={{ scale: 0.9 }}
            className="back-to-top fixed bottom-8 right-8 p-3 rounded-full bg-accent-primary text-white border-none cursor-pointer flex items-center justify-center shadow-lg shadow-accent-primary/20 z-50 hover:bg-accent-secondary hover:shadow-accent-secondary/20 transition-all duration-300"
            onClick={scrollToTop}
            aria-label="Back to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
