import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Trophy, Activity, Calendar, GitCommit } from 'lucide-react';

/* Odometer-style digit roller */
function OdometerCounter({ from = 0, to, duration = 1.8, suffix = "" }) {
  const [count, setCount] = useState(from);
  const [isComplete, setIsComplete] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = from;
    const end = parseInt(to);
    if (isNaN(end)) return;

    const totalTicks = 50;
    const step = (end - start) / totalTicks;
    let currentTick = 0;

    const timer = setInterval(() => {
      currentTick += 1;
      // Easing: slow down at the end
      const progress = currentTick / totalTicks;
      const easedProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const nextValue = Math.floor(start + (end - start) * easedProgress);

      if (currentTick >= totalTicks) {
        setCount(end);
        setIsComplete(true);
        clearInterval(timer);
      } else {
        setCount(nextValue);
      }
    }, (duration * 1000) / totalTicks);

    return () => clearInterval(timer);
  }, [isInView, from, to, duration]);

  return (
    <span ref={ref} className="relative inline-flex items-center">
      <motion.span
        animate={isComplete ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.3 }}
      >
        {count}
      </motion.span>
      {suffix}
    </span>
  );
}

export default function Achievements() {
  const stats = [
    {
      id: 'projects',
      icon: <Code size={24} className="text-accent-secondary" />,
      value: '7',
      suffix: '+',
      title: 'Core Projects Shipped',
      desc: 'GenAI, computer vision, and full-stack web applications.',
    },
    {
      id: 'hackathons',
      icon: <Trophy size={24} className="text-accent-primary" />,
      value: '5',
      suffix: '+',
      title: 'Hackathons Led',
      desc: 'Coordinating developer teams of 4–6 during college hackathons.',
    },
    {
      id: 'experience',
      icon: <Calendar size={24} className="text-accent-secondary" />,
      value: '2',
      suffix: '+',
      title: 'Years Active Coding',
      desc: 'Developing deep learning skills and web technologies.',
    },
    {
      id: 'dsa',
      icon: <Activity size={24} className="text-accent-primary" />,
      value: '130',
      suffix: '+',
      title: 'LeetCode Problems',
      desc: 'Arrays, Trees, Graphs, DP, and Greedy algorithms solved.',
    },
    {
      id: 'contributions',
      icon: <GitCommit size={24} className="text-accent-secondary" />,
      value: '15',
      suffix: '+',
      title: 'GitHub Projects/Repos',
      desc: 'Open source work and collaborative academic repositories.',
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.85, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 14,
      },
    },
  };

  return (
    <section id="achievements" className="section py-20 relative">
      <div className="absolute top-[40%] right-[-10%] w-[300px] h-[300px] bg-accent-glow rounded-full blur-[100px] pointer-events-none"></div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Milestones & Achievements
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto mt-12 px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        {stats.map((stat, i) => (
          <motion.div
            key={stat.id}
            className="glass-panel border border-border-glass bg-bg-secondary/40 p-6 rounded-2xl flex flex-col justify-between items-center text-center relative group overflow-hidden"
            variants={cardVariants}
            whileHover={{ y: -6, boxShadow: '0 0 30px var(--accent-glow)' }}
          >
            {/* Bottom highlight gradient bar */}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-[2.5px] bg-gradient-to-r from-accent-primary to-accent-secondary rounded-b-2xl"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
            />

            {/* Background pulse on hover */}
            <div className="absolute inset-0 bg-accent-glow opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

            <motion.div
              className="p-3 bg-bg-secondary rounded-xl border border-border-glass mb-4 relative z-10"
              whileHover={{ scale: 1.15, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            >
              {stat.icon}
            </motion.div>

            <h3 className="font-title font-black text-4xl text-text-primary mb-2 flex items-center justify-center relative z-10">
              <OdometerCounter to={stat.value} suffix={stat.suffix} />
            </h3>

            <div className="relative z-10">
              <h4 className="font-semibold text-sm text-text-secondary mb-1.5">{stat.title}</h4>
              <p className="text-[11px] text-text-muted leading-relaxed font-light">{stat.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
