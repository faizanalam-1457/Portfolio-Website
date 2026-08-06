import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const presets = {
  fadeUp: {
    initial: { opacity: 0, y: 60, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeDown: {
    initial: { opacity: 0, y: -60, filter: 'blur(8px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  },
  fadeLeft: {
    initial: { opacity: 0, x: -80, filter: 'blur(6px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  fadeRight: {
    initial: { opacity: 0, x: 80, filter: 'blur(6px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
    animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
  },
  blurIn: {
    initial: { opacity: 0, filter: 'blur(20px)' },
    animate: { opacity: 1, filter: 'blur(0px)' },
  },
};

export default function AnimatedSection({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  className = '',
  style = {},
  id,
  showDivider = false,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const preset = presets[animation] || presets.fadeUp;

  return (
    <>
      {showDivider && <SectionDivider />}
      <motion.div
        ref={ref}
        id={id}
        className={className}
        style={style}
        initial={preset.initial}
        animate={isInView ? preset.animate : preset.initial}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </>
  );
}

/* Animated gradient divider with traveling light */
function SectionDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <div ref={ref} className="section-divider-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem 0',
      position: 'relative',
      zIndex: 5,
      overflow: 'hidden',
    }}>
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width: '80%',
          maxWidth: '600px',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--accent-primary), var(--accent-secondary), transparent)',
          position: 'relative',
          transformOrigin: 'center',
        }}
      >
        {/* Traveling light dot */}
        <motion.div
          animate={{
            left: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: 'var(--accent-secondary)',
            boxShadow: '0 0 12px var(--accent-secondary), 0 0 30px var(--accent-primary)',
          }}
        />
      </motion.div>
    </div>
  );
}

export { SectionDivider };
