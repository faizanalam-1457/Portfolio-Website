import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Download, Mail, Phone, Code2 } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Github, Linkedin } from './SocialIcons';
import { generateMarkdownResume } from '../utils/resumeData';
import profileImg from '../assets/profile.jpg';
import { highlightSection } from '../utils/sectionHighlight';
import confetti from 'canvas-confetti';

/* Animated letter-by-letter text */
function AnimatedLetters({ text, className, delay = 0 }) {
  return (
    <span className={className} style={{ display: 'inline-block' }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40, rotateX: -90, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
          transition={{
            delay: delay + i * 0.04,
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{
            display: 'inline-block',
            transformOrigin: 'bottom',
            minWidth: char === ' ' ? '0.3em' : undefined,
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* Floating code snippet animation */
function FloatingCode() {
  const codeLines = [
    'const model = new LLM("groq");',
    'await rag.query(docs);',
    'pipeline.train(X, y);',
    'cv2.detectFaces(frame);',
    'app.listen(3000);',
  ];

  return (
    <motion.div
      className="absolute -right-4 top-1/4 hidden xl:block opacity-[0.06] pointer-events-none select-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.06 }}
      transition={{ delay: 2, duration: 1 }}
    >
      <pre className="text-xs font-mono text-accent-secondary leading-loose">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2.5 + i * 0.3, duration: 0.6 }}
          >
            {line}
          </motion.div>
        ))}
      </pre>
    </motion.div>
  );
}

export default function Hero() {
  const roles = ['AI/ML Engineer', 'Full Stack Developer', 'Data Analyst', 'UI Designer', 'Problem Solver'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [envelopeRemoved, setEnvelopeRemoved] = useState(false);
  const cardRef = useRef(null);

  // 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const smoothRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const glowX = useMotionValue('50%');
  const glowY = useMotionValue('50%');

  useEffect(() => {
    const timer = setTimeout(() => setEnvelopeRemoved(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleCardMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(((y - centerY) / centerY) * -12);
    rotateY.set(((x - centerX) / centerX) * 12);
    glowX.set(`${(x / rect.width) * 100}%`);
    glowY.set(`${(y / rect.height) * 100}%`);
  };

  const handleCardMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      highlightSection(id);
    }
  };

  const handleViewProjects = () => {
    // Particle burst on click
    confetti({
      particleCount: 30,
      spread: 50,
      startVelocity: 20,
      origin: { y: 0.8 },
      colors: ['#10b981', '#34d399', '#ffffff'],
      gravity: 0.8,
    });
    handleScrollTo('projects');
  };

  const handleDownloadResume = () => {
    try {
      const resumeText = generateMarkdownResume();
      const blob = new Blob([resumeText], { type: 'text/markdown;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Faizan_Alam_Resume.md');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed, falling back to print view', err);
      window.print();
    }
  };

  // Stagger children variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08, delayChildren: 0.2 },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      className="section hero-section min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <FloatingCode />

      <div className="hero-main-content w-full max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

        {/* Left Side Content */}
        <motion.div
          className="hero-text lg:col-span-7 flex flex-col justify-center text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span
            className="hero-subtitle text-accent-secondary font-medium tracking-widest text-sm uppercase mb-4 block"
            variants={childVariants}
          >
            <motion.span
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block w-2 h-2 rounded-full bg-accent-secondary mr-2 shadow-[0_0_8px_var(--accent-secondary)]"
            />
            Welcome to my Digital Space
          </motion.span>

          <motion.h1
            className="hero-title text-5xl md:text-7xl font-title font-extrabold tracking-tight mb-4"
            variants={childVariants}
          >
            Hi, I'm <br />
            <AnimatedLetters
              text="Faizan Alam"
              className="gradient-text font-black relative drop-shadow-[0_0_20px_var(--accent-glow-cyan)]"
              delay={0.5}
            />
          </motion.h1>

          <motion.div className="hero-typing-container flex items-center h-14 mb-6" variants={childVariants}>
            <span className="text-xl md:text-2xl text-text-secondary mr-3 font-light">I am a</span>
            <div className="relative h-full flex items-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 30, opacity: 0, filter: 'blur(8px)', scale: 0.9 }}
                  animate={{ y: 0, opacity: 1, filter: 'blur(0px)', scale: 1 }}
                  exit={{ y: -30, opacity: 0, filter: 'blur(8px)', scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="gradient-text text-xl md:text-2xl font-bold font-title drop-shadow-[0_0_10px_var(--accent-glow)]"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.span
              className="inline-block w-[3px] h-6 bg-accent-primary ml-1 rounded-full"
              animate={{ opacity: [1, 0, 1], scaleY: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 1, ease: 'easeInOut' }}
            />
          </motion.div>

          <motion.p className="hero-desc text-text-muted text-lg max-w-xl leading-relaxed mb-8" variants={childVariants}>
            B.Tech CSE (AI & ML) Honours student specializing in building production-ready GenAI applications, real-time Computer Vision pipelines, and robust full-stack MERN web applications.
          </motion.p>

          <motion.div className="hero-buttons flex flex-wrap gap-4 mb-8" variants={childVariants}>
            <motion.button
              className="btn btn-primary flex items-center gap-2 group relative overflow-hidden"
              onClick={handleViewProjects}
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(16,185,129,0.4)' }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Shimmer overlay */}
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', repeatDelay: 2 }}
                style={{ width: '50%' }}
              />
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
            </motion.button>

            <motion.button
              className="btn btn-secondary flex items-center gap-2"
              onClick={handleDownloadResume}
              whileHover={{ scale: 1.05, borderColor: 'var(--accent-primary)' }}
              whileTap={{ scale: 0.95 }}
              title="Print / Save resume layout"
            >
              <Download size={16} /> Download CV
            </motion.button>
          </motion.div>

          <motion.div className="hero-socials flex items-center gap-4" variants={childVariants}>
            {[
              { href: 'mailto:faizanalam1457@gmail.com', icon: <Mail size={18} />, title: 'Email' },
              { href: 'tel:+91XXXXXXXXXX', icon: <Phone size={18} />, title: 'Phone' },
              { href: 'https://linkedin.com/in/faizan-alam-858a5630a', icon: <Linkedin size={18} />, title: 'LinkedIn', external: true },
              { href: 'https://github.com/faizanalam-1457', icon: <Github size={18} />, title: 'GitHub', external: true },
              { href: 'https://leetcode.com/u/faizanalam1457', icon: <Code2 size={18} />, title: 'LeetCode', external: true },
            ].map((social, i) => (
              <motion.a
                key={social.title}
                href={social.href}
                target={social.external ? '_blank' : undefined}
                rel={social.external ? 'noopener noreferrer' : undefined}
                className="social-icon hover:shadow-[0_0_15px_var(--accent-glow)] transition-shadow duration-300"
                title={`${social.title}`}
                whileHover={{ y: -5, scale: 1.15, rotate: [0, -5, 5, 0] }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Side — 3D Tilt Parallax Card */}
        <motion.div
          className="hero-image-wrapper lg:col-span-5 flex justify-center items-center relative"
          initial={{ opacity: 0, scale: 0.7, filter: 'blur(20px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        >
          {/* Glowing Blurred Lights Behind Image */}
          <div className="absolute w-[120%] h-[120%] -z-10 pointer-events-none flex justify-center items-center">
            <motion.div
              className="absolute w-80 h-80 bg-accent-primary opacity-25 rounded-full blur-[100px]"
              animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute w-64 h-64 bg-accent-secondary opacity-20 rounded-full blur-[80px] -bottom-10 -right-10"
              animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.3, 0.15] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            />
          </div>

          {/* 3D Tilt Container */}
          <motion.div
            ref={cardRef}
            className="relative w-80 h-96 flex items-center justify-center select-none"
            style={{
              perspective: 1200,
              rotateX: smoothRotateX,
              rotateY: smoothRotateY,
              transformStyle: 'preserve-3d',
            }}
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            {/* Profile Photo */}
            <motion.div
              className="absolute z-10 w-72 h-72 rounded-full overflow-hidden shadow-[0_10px_40px_rgba(16,185,129,0.3)] bg-bg-secondary flex justify-center items-center cursor-pointer"
              style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}
              initial={!envelopeRemoved ? { y: 90, opacity: 0, scale: 0.9 } : false}
              animate={
                envelopeRemoved
                  ? {
                      y: [0, -12, 0],
                      opacity: 1,
                      scale: 1,
                      transition: {
                        y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
                      },
                    }
                  : { y: -60, opacity: 1, scale: 1 }
              }
              transition={
                !envelopeRemoved
                  ? { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }
                  : undefined
              }
              whileHover={{
                scale: 1.06,
                boxShadow: '0 0 40px var(--accent-glow), 0 20px 60px rgba(16,185,129,0.2)',
              }}
            >
              {/* Gradient border ring */}
              <div className="absolute inset-0 rounded-full p-[3px] bg-gradient-to-tr from-accent-primary to-accent-secondary">
                <div className="w-full h-full rounded-full overflow-hidden bg-bg-secondary">
                  <img
                    src={profileImg}
                    alt="Faizan Alam"
                    className="w-full h-full object-cover rounded-full pointer-events-none"
                  />
                </div>
              </div>

              {/* Rotating ring decoration */}
              <motion.div
                className="absolute inset-[-8px] rounded-full border border-dashed border-accent-primary/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            {/* Envelope Packaging */}
            <AnimatePresence>
              {!envelopeRemoved && (
                <>
                  {/* Envelope Front Pocket */}
                  <motion.div
                    className="absolute bottom-0 w-full h-48 z-20 overflow-hidden flex items-end"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.5 } }}
                  >
                    <svg viewBox="0 0 320 192" width="100%" height="100%" preserveAspectRatio="none" className="absolute inset-0 z-0 drop-shadow-[0_-5px_15px_rgba(0,0,0,0.4)]">
                      <polygon points="0,40 160,90 320,40 320,192 0,192" fill="var(--bg-glass)" stroke="var(--border-glass)" strokeWidth="1.5" />
                    </svg>
                    <div className="w-full flex justify-between items-center text-[10px] text-text-muted font-mono tracking-wider z-10 px-6 pb-4">
                      <span>ACCESS_GRANTED // PROTOCOL_01</span>
                      <span className="w-2.5 h-2.5 rounded-full bg-accent-primary animate-pulse shadow-[0_0_8px_var(--accent-primary)]"></span>
                    </div>
                  </motion.div>

                  {/* Envelope Back Panel */}
                  <motion.div
                    className="absolute bottom-0 w-full h-48 bg-[#070707] border-x border-b border-border-glass rounded-b-3xl -z-10 shadow-inner"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                  />

                  {/* Envelope Top Flap */}
                  <motion.div
                    className="absolute top-[232px] left-0 w-full h-24 z-30 origin-top"
                    style={{ transformStyle: 'preserve-3d' }}
                    initial={{ rotateX: 0, opacity: 1 }}
                    animate={{ rotateX: 180 }}
                    exit={{ opacity: 0, transition: { duration: 0.5 } }}
                    transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  >
                    <svg viewBox="0 0 320 96" width="100%" height="100%" preserveAspectRatio="none" className="drop-shadow-lg">
                      <polygon points="0,0 320,0 160,96" fill="var(--bg-glass)" stroke="var(--border-glass)" strokeWidth="1.5" />
                    </svg>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.5, y: 0 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <span className="text-[10px] text-text-muted font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-5 h-8 border border-accent-primary/40 rounded-full flex justify-center"
          animate={{ borderColor: ['rgba(16,185,129,0.3)', 'rgba(16,185,129,0.6)', 'rgba(16,185,129,0.3)'] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <motion.div
            className="w-1 h-2 bg-accent-secondary rounded-full mt-1.5"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
