import React from 'react';
import { motion } from 'framer-motion';
import { Award, GraduationCap, MapPin, Mail, Cpu, Brain, Code, Database, Network } from 'lucide-react';
import profileImg from '../assets/profile.jpg';



export default function About() {
  const interests = [
    { name: 'Generative AI & LLMs', icon: <Cpu size={14} /> },
    { name: 'Computer Vision', icon: <Brain size={14} /> },
    { name: 'MERN Full-Stack Dev', icon: <Code size={14} /> },
    { name: 'Data Visualization & BI', icon: <Database size={14} /> },
    { name: 'Network Security', icon: <Network size={14} /> },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06, delayChildren: 0.2 },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.7, y: 10 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 200, damping: 15 },
    },
  };

  return (
    <section id="about" className="section relative overflow-hidden py-24">
      {/* Decorative Glows */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-accent-glow rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] bg-accent-glow-cyan rounded-full blur-[100px] pointer-events-none"></div>

      <motion.h2
        className="section-title reveal"
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        About Me
      </motion.h2>

      {/* Large Glass Container */}
      <motion.div
        className="relative z-10 glass-panel border border-accent-primary/40 shadow-[0_0_30px_rgba(16,185,129,0.12)] rounded-3xl p-8 md:p-12 max-w-6xl mx-auto"
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Animated Connector Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block z-0" style={{ mixBlendMode: 'screen' }}>
          <path d="M 500,200 H 600 Q 650,200 680,250 T 720,380" fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="2" />
          <motion.path
            d="M 500,200 H 600 Q 650,200 680,250 T 720,380"
            fill="none"
            stroke="url(#about-glow-gradient)"
            strokeWidth="2"
            strokeDasharray="60 180"
            animate={{ strokeDashoffset: [-400, 400] }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
          <path d="M 400,450 H 650 Q 700,450 710,480 T 740,550" fill="none" stroke="rgba(16, 185, 129, 0.08)" strokeWidth="2" />
          <motion.path
            d="M 400,450 H 650 Q 700,450 710,480 T 740,550"
            fill="none"
            stroke="url(#about-glow-gradient)"
            strokeWidth="2"
            strokeDasharray="60 180"
            animate={{ strokeDashoffset: [400, -400] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <defs>
            <linearGradient id="about-glow-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
          </defs>
        </svg>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* Left Column: Summary with text highlight */}
          <motion.div
            className="lg:col-span-7 flex flex-col gap-6 text-left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="font-title font-bold text-2xl text-text-primary flex items-center gap-2">
              <motion.span
                className="text-accent-secondary"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                01.
              </motion.span>
              Engineering Intelligent Systems
            </h3>

            <motion.p
              className="text-text-secondary text-base md:text-lg leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              I am a B.Tech Computer Science & Engineering student specializing in <strong className="text-accent-secondary">Artificial Intelligence & Machine Learning</strong> with Honours in <strong className="text-accent-secondary">Cyber Security</strong> at Allenhouse Institute of Technology. I combine a strong foundation in computer science with practical experience in building intelligent applications and full-stack web solutions.
            </motion.p>

            <motion.p
              className="text-text-secondary text-base md:text-lg leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              My engineering philosophy centers on bridging the gap between raw data, intelligent AI models, and clean user interfaces. I build Retrieval-Augmented Generation (RAG) agents that ground LLM queries, real-time computer vision systems (such as face landmark tracking), and complete MERN stack web applications with custom APIs, secure JWT auth, and dashboard integrations.
            </motion.p>

            <motion.p
              className="text-text-secondary text-base md:text-lg leading-relaxed font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              As a problem-solver who has completed the 50-Day DSA challenge, I thrive in fast-paced environments. My goal is to apply AI/ML engineering and full-stack capabilities to solve high-impact real-world problems.
            </motion.p>

            <div className="mt-4">
              <h4 className="text-sm font-semibold text-text-primary tracking-wider uppercase mb-3">Core Research & Focus Areas:</h4>
              <motion.div
                className="about-interests flex flex-wrap gap-3"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {interests.map((interest, i) => (
                  <motion.span
                    key={i}
                    className="interest-tag flex items-center gap-2 bg-bg-secondary border border-border-glass py-1.5 px-4 rounded-xl text-sm text-text-secondary cursor-default relative overflow-hidden group"
                    variants={tagVariants}
                    whileHover={{
                      scale: 1.05,
                      borderColor: 'var(--accent-secondary)',
                      color: 'var(--text-primary)',
                      boxShadow: '0 0 15px var(--accent-glow-cyan)',
                    }}
                  >
                    {/* Shimmer */}
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative z-10 flex items-center gap-2">{interest.icon}{interest.name}</span>
                  </motion.span>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Profile Card */}
          <motion.div
            className="lg:col-span-5 flex justify-center items-center"
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <motion.div
              className="glass-panel p-6 border border-border-glass rounded-2xl w-full max-w-[360px] flex flex-col items-center text-center relative overflow-hidden bg-bg-secondary/60 hover:shadow-[0_0_30px_var(--accent-glow-cyan)] hover:border-accent-secondary/50 duration-300 group"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* Top glow bar */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-accent-primary to-accent-secondary"></div>

              {/* Rotating border decoration */}
              <motion.div
                className="absolute inset-[-1px] rounded-2xl border border-dashed border-accent-primary/20 pointer-events-none"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />

              {/* Avatar */}
              <div className="relative w-28 h-28 rounded-full p-[3px] bg-gradient-to-tr from-accent-primary to-accent-secondary mb-4 shadow-lg">
                <img
                  src={profileImg}
                  alt="Faizan Alam"
                  className="w-full h-full object-cover rounded-full"
                />
                {/* Pulse ring */}
                <motion.div
                  className="absolute inset-[-4px] rounded-full border border-accent-secondary/30"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              <h3 className="font-title font-bold text-xl text-text-primary tracking-wide">Faizan Alam</h3>
              <p className="text-accent-secondary text-xs font-medium uppercase tracking-wider mb-6">AIML Engineer & Dev</p>

              <div className="w-full flex flex-col gap-4 text-left border-t border-border-glass pt-6">
                {[
                  { icon: <GraduationCap className="text-accent-primary mt-0.5" size={16} />, label: 'Degree', value: 'B.Tech CSE (AI & ML)' },
                  { icon: <Award className="text-accent-primary mt-0.5" size={16} />, label: 'Experience', value: 'Web Dev Intern @ Oasis Infobyte' },
                  { icon: <MapPin className="text-accent-primary mt-0.5" size={16} />, label: 'Location', value: 'Kanpur, Uttar Pradesh, India' },
                  { icon: <Mail className="text-accent-primary mt-0.5" size={16} />, label: 'Email', value: 'faizanalam1457@gmail.com', href: 'mailto:faizanalam1457@gmail.com' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                  >
                    {item.icon}
                    <div>
                      <span className="text-[10px] text-text-muted uppercase tracking-wider block">{item.label}</span>
                      {item.href ? (
                        <a href={item.href} className="text-sm font-medium text-accent-secondary hover:underline break-all">{item.value}</a>
                      ) : (
                        <span className="text-sm font-medium text-text-secondary">{item.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
