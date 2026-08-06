import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Layout, Server, Brain, Database, Cloud, Cpu, Terminal } from 'lucide-react';

/* Animated progress ring around category icon */
function ProgressRing({ progress = 75, size = 52, strokeWidth = 2.5, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg ref={ref} width={size} height={size} className="absolute inset-0" style={{ transform: 'rotate(-90deg)' }}>
      {/* Track */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--border-glass)"
        strokeWidth={strokeWidth}
        opacity={0.3}
      />
      {/* Animated progress */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="url(#skillRingGradient)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={isInView ? { strokeDashoffset: offset } : {}}
        transition={{ duration: 1.5, delay: delay, ease: [0.16, 1, 0.3, 1] }}
      />
      <defs>
        <linearGradient id="skillRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--accent-primary)" />
          <stop offset="100%" stopColor="var(--accent-secondary)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function Skills() {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Layout className="text-accent-secondary" />,
      proficiency: 85,
      skills: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Web Design'],
    },
    {
      title: 'Backend Development',
      icon: <Server className="text-accent-primary" />,
      proficiency: 80,
      skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'WebSockets'],
    },
    {
      title: 'Artificial Intelligence & ML',
      icon: <Brain className="text-accent-secondary" />,
      proficiency: 90,
      skills: ['LangChain', 'RAG Architecture', 'Groq LLM', 'Jina Embeddings', 'Scikit-learn', 'OpenCV', 'MediaPipe', 'NLP', 'OCR'],
    },
    {
      title: 'Databases & Querying',
      icon: <Database className="text-accent-primary" />,
      proficiency: 75,
      skills: ['MongoDB', 'SQL', 'DBMS', 'Power Query'],
    },
    {
      title: 'Cloud & Platforms',
      icon: <Cloud className="text-accent-secondary" />,
      proficiency: 70,
      skills: ['Vercel', 'Render', 'GitHub Pages', 'Git & GitHub'],
    },
    {
      title: 'Tools & Frameworks',
      icon: <Cpu className="text-accent-primary" />,
      proficiency: 82,
      skills: ['Power BI', 'DAX Calculations', 'Streamlit', 'Figma', 'VS Code', 'Jupyter Notebook', 'Linux CLI'],
    },
    {
      title: 'Programming Languages',
      icon: <Terminal className="text-accent-secondary" />,
      proficiency: 88,
      skills: ['Python', 'JavaScript', 'Java', 'C', 'SQL'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 14,
      },
    },
  };

  const tagVariants = {
    hidden: { opacity: 0, scale: 0.7 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.04,
        type: 'spring',
        stiffness: 200,
        damping: 15,
      },
    }),
  };

  return (
    <section id="skills" className="section py-24 relative">
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-accent-glow rounded-full blur-[100px] pointer-events-none"></div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Technical Expertise
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {skillCategories.map((category, i) => (
          <motion.div
            key={i}
            className="animated-glow-card group"
            variants={cardVariants}
          >
            <div className="animated-glow-content flex flex-col justify-between h-full bg-bg-secondary/40 border border-border-glass relative overflow-hidden">
              {/* Spotlight effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(16,185,129,0.08) 0%, transparent 60%)',
                }}
              />

              <div>
                <div className="skill-category-header flex items-center gap-3 border-b border-border-glass pb-4 mb-5">
                  {/* Icon with progress ring */}
                  <div className="relative p-2.5 bg-bg-secondary rounded-xl border border-border-glass">
                    <ProgressRing progress={category.proficiency} delay={i * 0.15} />
                    {category.icon}
                  </div>
                  <div>
                    <h3 className="skill-category-title font-title font-bold text-lg text-text-primary">{category.title}</h3>
                    <span className="text-[10px] text-text-muted font-mono">{category.proficiency}% proficiency</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, sj) => (
                    <motion.span
                      key={sj}
                      custom={sj}
                      variants={tagVariants}
                      className="text-xs bg-bg-secondary/70 border border-border-glass/60 text-text-secondary py-1.5 px-3.5 rounded-xl cursor-default font-medium tracking-wide relative overflow-hidden group/tag"
                      whileHover={{
                        scale: 1.08,
                        borderColor: 'var(--accent-secondary)',
                        color: 'var(--text-primary)',
                        boxShadow: '0 0 15px var(--accent-glow-cyan)',
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {/* Shimmer on hover */}
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/tag:translate-x-full transition-transform duration-700" />
                      <span className="relative z-10">{skill}</span>
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
