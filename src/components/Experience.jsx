import React, { useState, useRef } from 'react';
import { motion, useScroll, useSpring, useInView, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

/* Animated timeline node */
function TimelineNode({ index, isExpanded, onClick }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <div ref={ref} className="absolute left-4 md:left-1/2 transform -translate-x-[7px] md:-translate-x-1/2 top-1.5 z-20">
      <motion.div
        className="w-5 h-5 rounded-full border-2 border-accent-secondary bg-bg-primary flex items-center justify-center cursor-pointer"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 15 }}
        whileHover={{ scale: 1.4, borderColor: 'var(--accent-primary)' }}
        onClick={onClick}
        style={{ boxShadow: '0 0 12px var(--accent-glow-cyan)' }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-accent-secondary"
          animate={isInView ? {
            scale: [1, 1.5, 1],
            boxShadow: ['0 0 0px var(--accent-secondary)', '0 0 12px var(--accent-secondary)', '0 0 0px var(--accent-secondary)'],
          } : {}}
          transition={{ delay: 0.5, duration: 1.5, repeat: 2 }}
        />
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const [expandedCard, setExpandedCard] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });

  const timelineData = [
    {
      role: 'Web Developer & Designer Intern',
      company: 'Oasis Infobyte (OIBSIP)',
      location: 'Remote',
      duration: 'Nov 2024 – Jan 2025',
      type: 'internship',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Figma', 'Git', 'Responsive Design'],
      details: [
        'Built and deployed multiple high-performance responsive websites using HTML5, CSS3, and JavaScript, ensuring absolute cross-browser compatibility and mobile-first design principles.',
        'Designed detailed UI/UX wireframes in Figma to model workflows prior to coding, translating designs into pixel-perfect frontend layouts.',
        'Identified, debugged, and resolved legacy frontend bugs; delivered critical client features ahead of schedule as part of a remote agile cohort.',
        'Participated in daily standups and code reviews, strengthening collaborative development, git branch management, and team communication.'
      ]
    },
    {
      role: 'Team Coordinator & Hackathon Lead',
      company: 'College Hackathons & Competitions',
      location: 'Allenhouse Institute of Technology',
      duration: '2024 – Present',
      type: 'activity',
      tech: ['Python', 'DSA', 'Machine Learning', 'Data Modeling', 'Power BI', 'Agile Team Coordination'],
      details: [
        'Served as Team Coordinator during institutional and regional hackathons, leading engineering teams of 4–6 developers to build functional prototypes.',
        'Managed project timelines, delegated tasks based on member skillsets (frontend, backend, AI models), and pitched final solutions to jury panels.',
        'Successfully completed the 50-Day DSA Challenge, solving 130+ algorithmic problems across Arrays, Trees, Graphs, Dynamic Programming, and Greedy algorithms on LeetCode.',
        'Engineered self-taught BI dashboards and ML pipelines, demonstrating a high degree of self-learning capability and technical adaptability.'
      ]
    }
  ];

  const toggleExpand = (e, index) => {
    e.stopPropagation();
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <section id="experience" className="section py-24 relative" ref={containerRef}>
      <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] bg-accent-glow-cyan rounded-full blur-[100px] pointer-events-none"></div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Work & Leadership Timeline
      </motion.h2>

      <div className="relative max-w-4xl mx-auto mt-16 px-4">
        {/* Static Background Timeline Line */}
        <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-border-glass" />

        {/* Scrolling Glowing Timeline Line */}
        <motion.div
          className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accent-primary via-accent-secondary to-accent-primary origin-top"
          style={{
            scaleY,
            boxShadow: '0 0 15px var(--accent-secondary), 0 0 30px rgba(16,185,129,0.2)',
          }}
        />

        <div className="flex flex-col gap-12">
          {timelineData.map((item, index) => {
            const isExpanded = expandedCard === index;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row items-start ${
                  isLeft ? 'md:justify-start' : 'md:justify-end'
                } w-full`}
              >
                {/* Animated Glowing Node */}
                <TimelineNode
                  index={index}
                  isExpanded={isExpanded}
                  onClick={(e) => toggleExpand(e, index)}
                />

                {/* Card Container */}
                <motion.div
                  className="w-[calc(100%-40px)] md:w-[45%] ml-12 md:ml-0 glass-panel border border-border-glass bg-bg-secondary/40 rounded-2xl p-6 cursor-pointer hover:border-accent-primary/60 transition-all duration-300 relative overflow-hidden group"
                  onClick={(e) => toggleExpand(e, index)}
                  initial={{ opacity: 0, x: isLeft ? -60 : 60, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, boxShadow: '0 0 25px var(--accent-glow)' }}
                >
                  {/* Top glow bar */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-primary to-accent-secondary opacity-60"></div>

                  {/* Hover shimmer */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"
                  />

                  <div className="flex flex-col gap-2 relative z-10">
                    <span className="text-xs text-accent-secondary font-mono flex items-center gap-1.5">
                      <Calendar size={12} />
                      {item.duration}
                    </span>

                    <h3 className="font-title font-bold text-xl text-text-primary leading-tight">{item.role}</h3>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-text-secondary">
                      <span className="font-semibold text-text-primary">{item.company}</span>
                      <span className="text-text-muted">•</span>
                      <span className="flex items-center gap-0.5 text-text-muted">
                        <MapPin size={12} />
                        {item.location}
                      </span>
                    </div>

                    {/* Tech badges */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.tech.slice(0, 3).map((t, ti) => (
                        <span key={ti} className="text-[10px] bg-bg-secondary/80 border border-border-glass py-0.5 px-2 rounded-md text-text-muted">{t}</span>
                      ))}
                      {item.tech.length > 3 && (
                        <span className="text-[10px] text-accent-secondary font-mono font-medium">+{item.tech.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {/* Expandable Content */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <ul className="text-xs text-text-secondary list-disc pl-4 space-y-2 leading-relaxed font-light border-t border-border-glass/40 pt-4 mt-4">
                          {item.details.map((detail, dIndex) => (
                            <motion.li
                              key={dIndex}
                              initial={{ opacity: 0, x: -15 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: dIndex * 0.1 }}
                            >
                              {detail}
                            </motion.li>
                          ))}
                        </ul>

                        <div className="mt-4 pt-3 border-t border-border-glass/40">
                          <span className="text-[10px] text-text-primary font-semibold uppercase block mb-1.5">Full Stack:</span>
                          <div className="flex flex-wrap gap-1">
                            {item.tech.map((t, ti) => (
                              <motion.span
                                key={ti}
                                className="text-[9px] bg-bg-secondary border border-border-glass py-0.5 px-2 rounded text-text-secondary font-mono"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: ti * 0.05 }}
                              >
                                {t}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex items-center justify-center gap-1 text-[10px] text-text-muted tracking-wider uppercase font-semibold mt-4 pt-2 border-t border-border-glass/20">
                    {isExpanded ? (
                      <>Show less <ChevronUp size={12} /></>
                    ) : (
                      <>Click to expand <ChevronDown size={12} /></>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
