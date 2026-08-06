import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Cpu, Layers, BarChart2, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Bookmark, Check } from 'lucide-react';
import { Github } from './SocialIcons';

/* 3D Tilt Card Wrapper */
function TiltCard({ children, className = '' }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    ref.current.style.setProperty('--spotlight-x', `${(x / rect.width) * 100}%`);
    ref.current.style.setProperty('--spotlight-y', `${(y / rect.height) * 100}%`);
  };

  const handleMouseLeave = () => {
    if (ref.current) {
      ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

// High-fidelity SVG Mockups
function ProjectMockup({ id }) {
  if (id === 'rag-assistant') {
    return (
      <div className="w-full h-44 bg-bg-secondary/80 relative flex items-center justify-center overflow-hidden border-b border-border-glass">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--accent-primary)_1px,_transparent_1px)] bg-[size:16px_16px]"></div>
        <div className="relative w-4/5 h-4/5 glass-panel p-3 border border-border-glass rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-center border-b border-border-glass/40 pb-2 mb-2">
            <span className="text-[10px] text-accent-secondary font-mono tracking-widest">RAG_AGENT_V2.0</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
            </div>
          </div>
          <div className="flex flex-col gap-1.5 flex-1 justify-center">
            <motion.div
              className="bg-accent-primary/10 border border-accent-primary/20 rounded py-1 px-2 text-[9px] text-text-secondary max-w-[80%] self-start"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Querying policy document chunk #12...
            </motion.div>
            <motion.div
              className="bg-accent-secondary/10 border border-accent-secondary/20 rounded py-1 px-2 text-[9px] text-accent-secondary max-w-[80%] self-end"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              Groq LLM: Synthesizing grounded response...
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'expense-tracker') {
    return (
      <div className="w-full h-44 bg-bg-secondary/80 relative flex items-center justify-center overflow-hidden border-b border-border-glass">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(124,58,237,0.1)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(124,58,237,0.1)_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="relative w-[75%] h-[80%] glass-panel p-3 border border-border-glass rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-text-primary font-bold">Expense Dashboard</span>
            <span className="text-[9px] text-accent-secondary font-mono">$4,850.50</span>
          </div>
          <div className="flex items-end gap-2.5 h-16 pt-2">
            {[8, 14, 10, 12, 6, 11].map((h, i) => (
              <motion.div
                key={i}
                className="w-full rounded-t-sm"
                style={{ background: i % 2 === 0 ? 'rgba(16,185,129,0.5)' : 'rgba(52,211,153,0.6)' }}
                initial={{ height: 0 }}
                whileInView={{ height: `${h * 4}px` }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (id === 'sales-dashboard') {
    return (
      <div className="w-full h-44 bg-bg-secondary/80 relative flex items-center justify-center overflow-hidden border-b border-border-glass">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,_transparent_1px)] bg-[size:10px_10px]"></div>
        <div className="relative w-4/5 h-4/5 glass-panel p-3 border border-border-glass rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-text-secondary">Sales Performance KPIs</span>
            <span className="text-[9px] text-emerald-400 font-mono">+12.4% YoY</span>
          </div>
          <div className="relative flex-1 flex items-center justify-center mt-1">
            <svg className="w-full h-12 overflow-visible" viewBox="0 0 100 40">
              <motion.path
                d="M0,35 Q15,10 30,28 T60,8 T90,20 T100,5"
                fill="none"
                stroke="var(--accent-secondary)"
                strokeWidth="2.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
              <path d="M0,35 Q15,10 30,28 T60,8 T90,20 T100,5 L100,40 L0,40 Z" fill="url(#sales-gradient)" opacity="0.1" />
              <defs>
                <linearGradient id="sales-gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--accent-secondary)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'ai-forecasting') {
    return (
      <div className="w-full h-44 bg-bg-secondary/80 relative flex items-center justify-center overflow-hidden border-b border-border-glass">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--accent-secondary)_1px,_transparent_1px)] bg-[size:12px_12px]"></div>
        <div className="relative w-4/5 h-4/5 glass-panel p-3 border border-border-glass rounded-xl flex flex-col justify-between">
          <span className="text-[10px] text-accent-primary font-mono">SCIKIT_MODEL_PREDICT</span>
          <div className="flex gap-2 items-center justify-center h-16">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-full border border-accent-secondary/30">
              <motion.div
                className="w-8 h-8 rounded-full border border-dashed border-accent-primary/60"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              />
              <Cpu size={12} className="absolute text-accent-secondary" />
            </div>
            <div className="flex flex-col gap-1">
              <motion.div className="h-2 w-16 bg-accent-secondary/20 rounded" animate={{ width: ['40%', '100%', '40%'] }} transition={{ duration: 3, repeat: Infinity }} />
              <motion.div className="h-2 w-20 bg-accent-primary/20 rounded" animate={{ width: ['60%', '100%', '60%'] }} transition={{ duration: 4, repeat: Infinity }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'drowsiness-detector') {
    return (
      <div className="w-full h-44 bg-bg-secondary/80 relative flex items-center justify-center overflow-hidden border-b border-border-glass">
        <motion.div
          className="absolute w-36 h-36 border border-accent-primary/20 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <div className="relative w-4/5 h-4/5 glass-panel p-3 border border-border-glass rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-text-primary">Eye Mesh Tracking</span>
            <motion.span
              className="text-[8px] bg-red-900/50 text-red-400 px-1.5 py-0.5 rounded border border-red-800"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              ALERT: FATIGUE
            </motion.span>
          </div>
          <div className="flex-1 flex items-center justify-center mt-1">
            <svg className="w-20 h-12" viewBox="0 0 100 60">
              <motion.path
                d="M10,30 Q50,0 90,30 Q50,60 10,30 Z"
                fill="none"
                stroke="var(--accent-secondary)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
              />
              <circle cx="50" cy="30" r="12" fill="none" stroke="var(--accent-primary)" strokeWidth="2" />
              <motion.circle cx="50" cy="30" r="4" fill="var(--accent-secondary)" animate={{ r: [4, 3, 4] }} transition={{ duration: 2, repeat: Infinity }} />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  if (id === 'gesture-controller') {
    return (
      <div className="w-full h-44 bg-bg-secondary/80 relative flex items-center justify-center overflow-hidden border-b border-border-glass">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,_transparent_1px)] bg-[size:15px_15px]"></div>
        <div className="relative w-4/5 h-4/5 glass-panel p-3 border border-border-glass rounded-xl flex flex-col justify-between">
          <span className="text-[10px] text-accent-secondary font-mono">WEBSOCKET_HAND_CONNECT</span>
          <div className="flex-1 flex items-center justify-center">
            <svg className="w-24 h-16 overflow-visible" viewBox="0 0 100 80">
              <motion.path
                d="M50,75 L35,55 L25,45 Q20,40 25,35 L30,42 L30,15 Q30,10 35,10 L35,42 L42,12 Q42,8 47,8 L47,42 L55,10 Q55,6 60,6 L60,42 L67,15 Q67,11 72,11 L72,45 L78,35 Q82,32 85,38 L77,65 Z"
                fill="none"
                stroke="var(--accent-primary)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2 }}
              />
              <motion.circle cx="35" cy="10" r="2.5" fill="var(--accent-secondary)" animate={{ r: [2.5, 3.5, 2.5] }} transition={{ duration: 2, repeat: Infinity }} />
              <motion.circle cx="47" cy="8" r="2.5" fill="var(--accent-secondary)" animate={{ r: [2.5, 3.5, 2.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
              <motion.circle cx="60" cy="6" r="2.5" fill="var(--accent-secondary)" animate={{ r: [2.5, 3.5, 2.5] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-44 bg-bg-secondary/80 relative flex items-center justify-center overflow-hidden border-b border-border-glass">
      <div className="absolute inset-0 bg-accent-glow opacity-10"></div>
      <Layers className="text-accent-secondary animate-bounce" size={40} />
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedProject, setExpandedProject] = useState(null);

  const categories = ['All', 'AI & ML', 'MERN Stack', 'Data Analytics'];

  const projectsData = [
    {
      id: 'rag-assistant',
      title: 'HR Policy RAG Assistant',
      category: 'AI & ML',
      icon: <Cpu />,
      tech: ['Python', 'LangChain', 'Groq LLM', 'Streamlit', 'Jina Embeddings'],
      github: 'https://github.com/faizanalam1457/HR-Policy-Rag-Assistant',
      demo: '#',
      summary: 'An AI-powered Retrieval-Augmented Generation (RAG) assistant that grounds employee questions in company policy documents to prevent model hallucinations.',
      features: [
        'Advanced document parsing: Loads, segments, and cleans corporate PDFs into structured text chunks.',
        'Dense vector representations: Uses Jina Embeddings to encode chunks and index them into a persistent vector store.',
        'Intelligent agent routing: Custom retriever fetches the top-K relevant chunks to inject into Groq LLM prompts.',
        'Dual interface deployment: Shipped both a streamlined Streamlit chat page and an automated command-line tool.'
      ],
      justification: 'LangChain and Groq LLM API were selected to achieve sub-second query-to-answer responses, while the persistent local vector store avoids expensive re-indexing operations on subsequent program runs.',
      challenge: 'Resolving LLM hallucinations when employees query topics not covered in standard policy books.',
      solution: 'Configured a similarity score threshold limit and designed an explicit grounding prompt that instructs the LLM to output a clean "I am sorry, but I cannot find this information in the policy docs" fallback instead of fabricating responses.'
    },
    {
      id: 'expense-tracker',
      title: 'Expense Tracker Web App',
      category: 'MERN Stack',
      icon: <Layers />,
      tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT'],
      github: 'https://github.com/faizanalam-1457',
      demo: '#',
      summary: 'A secure, full-stack transaction manager enabling users to register accounts, log incomes or expenses, and view real-time balance metrics.',
      features: [
        'Secure user pathways: Implemented custom signup/login routing secured with JWT (JSON Web Tokens) in HttpOnly cookies.',
        'RESTful transaction CRUD: Modular endpoints handling create, read, update, and delete actions for user entries.',
        'Interactive dashboards: Aggregates balances, tracks incomes, and visualizes costs categorized by type.',
        'Responsive layout controls: Crafted mobile-first CSS grids that scale flawlessly across device dimensions.'
      ],
      justification: 'MongoDB was chosen for its flexible document structure that lets transaction fields evolve, and Express/Node provides a fast, lightweight server architecture that handles concurrent user authentication routes easily.',
      challenge: 'Maintaining real-time client state synchronizations on transaction modifications without full page refreshes.',
      solution: 'Used React state contexts combined with optimistic UI updates. When a user submits an expense, the client immediately updates the local layout while writing asynchronously to MongoDB.'
    },
    {
      id: 'sales-dashboard',
      title: 'Sales Performance Dashboard',
      category: 'Data Analytics',
      icon: <BarChart2 />,
      tech: ['Power BI', 'Power Query', 'DAX', 'Data Modeling', 'Data Visualization'],
      github: '#',
      demo: '#',
      summary: 'A business intelligence dashboard translating raw corporate records into actionable, interactive sales metrics and performance KPIs.',
      features: [
        'ETL pipeline cleanup: Cleaned and structured inconsistent dataset sources via Power Query advanced transforms.',
        'Relational modeling: Engineered a clean Star-schema data model linking sales data to dimension tables.',
        'Calculated metrics: Formulated complex DAX measures to calculate Year-Over-Year growth, running totals, and target tracking.',
        'Drill-through exploration: Setup detail paths, interactive filter cards, and trend visuals.'
      ],
      justification: 'Power BI was selected for its enterprise-level ETL engine (Power Query) and high-performance DAX formula system, allowing quick aggregations of millions of transactions.',
      challenge: 'Aggregating date-based transaction tables having missing periods and mismatched regional locales.',
      solution: 'Created an independent Date Dimension table in the model, establishing consistent calendar dimensions, and applied column sanitization filters during the ETL process.'
    },
    {
      id: 'ai-forecasting',
      title: 'AI Expense Categorizer & Forecaster',
      category: 'AI & ML',
      icon: <Cpu />,
      tech: ['Python', 'Scikit-learn', 'Pandas', 'OCR', 'Matplotlib'],
      github: 'https://github.com/faizanalam-1457',
      demo: '#',
      summary: 'An automated pipeline utilizing optical character recognition to extract receipt details and ML models to forecast spending habits.',
      features: [
        'Structured OCR parsing: Extracts vendor names, transaction dates, and total prices from unstructured receipt photos.',
        'ML text classification: Pre-processes transaction strings and trains a classification model to automatically assign categories.',
        'Time-series forecasting: Projects monthly spend rates and flags anomalous transaction amounts.',
        'Data analytics dashboard: Renders spending trends using Pandas and Matplotlib.'
      ],
      justification: 'Python with Scikit-learn was chosen due to its comprehensive toolkit for statistical training, and Pandas provides unmatched speed for parsing tabular structures.',
      challenge: 'Extracting data accurately from low-contrast, skewed, or blurred paper receipts.',
      solution: 'Created a computer vision pre-processing step using OpenCV (applying adaptive thresholding, binarization, and skew correction) which increased OCR read accuracy by 35%.'
    },
    {
      id: 'drowsiness-detector',
      title: 'Driver Drowsiness Detector',
      category: 'AI & ML',
      icon: <Cpu />,
      tech: ['Python', 'OpenCV', 'MediaPipe', 'Computer Vision'],
      github: 'https://github.com/faizanalam-1457',
      demo: '#',
      summary: 'A real-time safety system utilizing local webcam feeds to monitor driver fatigue indicators and trigger immediate alerts.',
      features: [
        'Real-time landmark capture: Tracks 468 facial points at 30+ FPS using MediaPipe FaceMesh.',
        'EAR mathematical tracking: Computes Eye Aspect Ratio (EAR) frame-by-frame to measure eye openness.',
        'Fatigue threshold alerts: Applies statistical triggers that sound audio alarms if eyes remain closed.',
        'Low-latency implementation: Bypasses network requests by computing all frames locally on the client.'
      ],
      justification: 'MediaPipe and OpenCV were chosen because they provide highly optimized, C++-backed Python bindings that perform landmark tracking in real-time on standard CPU machines.',
      challenge: 'Avoiding false alerts caused by normal rapid blinking or head movements.',
      solution: 'Implemented a sliding-window frame check. An alarm triggers only if the EAR drops below the threshold for more than 20 consecutive frames (approx 600ms), avoiding transient blink errors.'
    },
    {
      id: 'gesture-controller',
      title: 'Hand Gesture Web Controller',
      category: 'AI & ML',
      icon: <Cpu />,
      tech: ['Python', 'MediaPipe', 'JavaScript', 'WebSockets'],
      github: 'https://github.com/faizanalam-1457',
      demo: '#',
      summary: 'A hands-free browser controller that translates camera-tracked hand shapes into scroll and click commands.',
      features: [
        'Precise hand landmarks: Tracks 21 coordinates per hand in real-time.',
        'Multi-gesture classifier: Decodes gesture shapes (e.g. scroll up/down, click, zoom).',
        'Bidirectional sockets: Connects the Python tracker to JavaScript frontends via WebSockets.',
        'Frictionless browser navigation: Executes page scroll triggers dynamically.'
      ],
      justification: 'Combining a local Python MediaPipe listener with WebSockets and vanilla JS allows offloading heavy image tracking to the backend while keeping front-end scroll reactions immediate.',
      challenge: 'Preventing erratic page jumps or shaky browser reactions due to minor finger tremors.',
      solution: 'Implemented a smoothing factor algorithm that averages landmark movements across three consecutive frames and added a debounce filter on click triggers.'
    }
  ];

  const filteredProjects = activeFilter === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  const toggleExpand = (id) => {
    setExpandedProject(expandedProject === id ? null : id);
  };

  return (
    <section id="projects" className="section py-24 relative">
      <div className="absolute bottom-[-10%] right-[-10%] w-[350px] h-[350px] bg-accent-glow rounded-full blur-[100px] pointer-events-none"></div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Featured Projects
      </motion.h2>

      {/* Category filter buttons with morph animation */}
      <div className="projects-filters flex justify-center gap-4 flex-wrap mb-12">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            className={`filter-btn py-2 px-6 rounded-full font-medium tracking-wide transition-all border relative overflow-hidden ${
              activeFilter === cat
                ? 'bg-accent-primary border-accent-primary text-white shadow-[0_0_20px_var(--accent-glow)]'
                : 'border-border-glass bg-bg-secondary/40 text-text-secondary hover:border-accent-secondary hover:text-text-primary'
            }`}
            onClick={() => {
              setActiveFilter(cat);
              setExpandedProject(null);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            layout
          >
            {activeFilter === cat && (
              <motion.div
                layoutId="activeFilterBg"
                className="absolute inset-0 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}
            <span className="relative z-10">{cat}</span>
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, i) => {
            const isExpanded = expandedProject === project.id;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.85, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard className="animated-glow-card">
                  <div className="animated-glow-content flex flex-col justify-between p-0 h-full overflow-hidden border border-border-glass bg-bg-secondary/40 relative group">

                    {/* Spotlight effect */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[1]"
                      style={{
                        background: 'radial-gradient(circle 200px at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(16,185,129,0.1), transparent)',
                      }}
                    />

                    {/* Category Mockup Display */}
                    <div className="relative group/mockup overflow-hidden">
                      <ProjectMockup id={project.id} />
                      <div className="absolute inset-0 bg-bg-primary/10 group-hover/mockup:backdrop-blur-[2px] transition-all duration-500 pointer-events-none"></div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col justify-between relative z-10">
                      <div>
                        <div className="flex justify-between items-center mb-3">
                          <motion.span
                            className="text-[10px] bg-accent-glow text-accent-secondary font-mono tracking-wider font-semibold py-1 px-2.5 rounded-md uppercase"
                            whileHover={{ scale: 1.05 }}
                          >
                            {project.category}
                          </motion.span>

                          <div className="project-links flex items-center gap-3">
                            {project.github !== '#' && (
                              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-accent-primary transition-colors" title="Source Code">
                                <Github size={18} />
                              </a>
                            )}
                            {project.demo !== '#' && (
                              <a href={project.demo} className="text-text-muted hover:text-accent-secondary transition-colors" title="Live Demo">
                                <ExternalLink size={18} />
                              </a>
                            )}
                          </div>
                        </div>

                        <h3 className="project-title font-title font-bold text-xl text-text-primary mb-2 hover:text-accent-secondary transition-colors duration-300">{project.title}</h3>
                        <p className="project-desc text-sm text-text-muted leading-relaxed font-light mb-4">{project.summary}</p>

                        {/* Expandable Deep Details */}
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              className="overflow-hidden border-t border-border-glass/40 pt-4 mt-4"
                            >
                              <div className="flex items-center gap-1.5 font-semibold text-xs text-text-primary mb-2">
                                <Bookmark size={12} className="text-accent-primary" />
                                Key Features
                              </div>
                              <ul className="text-xs text-text-secondary list-disc pl-4 space-y-1 mb-4 leading-relaxed font-light">
                                {project.features.map((feat, fi) => (
                                  <motion.li
                                    key={fi}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: fi * 0.08 }}
                                  >
                                    {feat}
                                  </motion.li>
                                ))}
                              </ul>

                              <div className="flex items-center gap-1.5 font-semibold text-xs text-text-primary mb-1">
                                <Check size={12} className="text-accent-secondary" />
                                Architecture & Tech Justification
                              </div>
                              <p className="text-xs text-text-muted leading-relaxed font-light mb-4 pl-4">{project.justification}</p>

                              <div className="flex items-center gap-1.5 font-semibold text-xs text-text-primary mb-1">
                                <AlertCircle size={12} className="text-accent-primary" />
                                Technical Challenge
                              </div>
                              <p className="text-xs text-text-muted leading-relaxed font-light mb-4 pl-4">{project.challenge}</p>

                              <div className="flex items-center gap-1.5 font-semibold text-xs text-text-primary mb-1">
                                <CheckCircle2 size={12} className="text-accent-secondary" />
                                Engineering Solution
                              </div>
                              <p className="text-xs text-text-muted leading-relaxed font-light pl-4">{project.solution}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <div className="mt-6 flex flex-col gap-4">
                        <motion.button
                          className="flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl border border-border-glass text-xs font-semibold text-text-secondary hover:text-text-primary hover:border-accent-primary transition-all duration-300"
                          onClick={() => toggleExpand(project.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isExpanded ? (
                            <>Close Details <ChevronUp size={14} /></>
                          ) : (
                            <>Explore Deep Details <ChevronDown size={14} /></>
                          )}
                        </motion.button>

                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border-glass/40">
                          {project.tech.map((t, ti) => (
                            <motion.span
                              key={ti}
                              className="text-[10px] bg-bg-secondary text-text-secondary border border-border-glass/60 py-1 px-2.5 rounded-lg font-medium"
                              whileHover={{ borderColor: 'var(--accent-secondary)', color: 'var(--text-primary)' }}
                            >
                              {t}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
