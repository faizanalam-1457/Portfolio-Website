import React, { useEffect, useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

const TRAIL_LENGTH = 8;
const TRAIL_DECAY = 0.85;

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [trail, setTrail] = useState([]);
  const trailRef = useRef([]);
  const rafRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for outer ring
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 22 });

  // Smooth springs for inner dot
  const dotX = useSpring(mouseX, { stiffness: 380, damping: 28 });
  const dotY = useSpring(mouseY, { stiffness: 380, damping: 28 });

  // Update trail on animation frame
  const updateTrail = useCallback(() => {
    const { x, y } = posRef.current;
    const prev = trailRef.current;
    const newTrail = [{ x, y, id: Date.now() }];

    for (let i = 0; i < Math.min(prev.length, TRAIL_LENGTH - 1); i++) {
      newTrail.push({
        x: prev[i].x + (x - prev[i].x) * (1 - TRAIL_DECAY),
        y: prev[i].y + (y - prev[i].y) * (1 - TRAIL_DECAY),
        id: prev[i].id,
      });
    }

    trailRef.current = newTrail;
    setTrail([...newTrail]);
    rafRef.current = requestAnimationFrame(updateTrail);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(updateTrail);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [updateTrail]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const handleMouseDown = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), 400);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  useEffect(() => {
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll(
        'a, button, input, textarea, select, .animated-glow-card, .interest-tag, [role="button"], .btn, .social-icon, .filter-btn, .nav-item'
      );

      interactives.forEach((el) => {
        el.addEventListener('mouseenter', () => setHovered(true));
        el.addEventListener('mouseleave', () => setHovered(false));
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  // Hide on touch / small screens
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null;
  if (!visible) return null;

  return (
    <>
      {/* Trailing ghost dots */}
      {trail.slice(1).map((point, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            left: point.x,
            top: point.y,
            width: `${Math.max(3, 7 - i)}px`,
            height: `${Math.max(3, 7 - i)}px`,
            borderRadius: '50%',
            background: `var(--accent-secondary)`,
            opacity: Math.max(0.05, 0.35 - i * 0.04),
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9996,
            transition: 'opacity 0.1s ease',
            boxShadow: `0 0 ${6 - i}px var(--accent-secondary)`,
          }}
        />
      ))}

      {/* Click ripple burst */}
      <AnimatePresence>
        {clicked && (
          <motion.div
            key="ripple"
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: posRef.current.x,
              top: posRef.current.y,
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              border: '2px solid var(--accent-primary)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              zIndex: 9997,
              boxShadow: '0 0 15px var(--accent-primary)',
            }}
          />
        )}
      </AnimatePresence>

      {/* Inner Dot */}
      <motion.div
        className="custom-cursor-dot"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          borderRadius: '50%',
          width: '8px',
          height: '8px',
          backgroundColor: hovered ? 'var(--accent-primary)' : 'var(--accent-secondary)',
          boxShadow: hovered
            ? '0 0 15px var(--accent-primary), 0 0 30px rgba(16,185,129,0.3)'
            : '0 0 10px var(--accent-secondary)',
        }}
        animate={{
          scale: clicked ? 0.5 : hovered ? 1.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="custom-cursor-outline"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          borderRadius: '50%',
          border: `1.5px solid ${hovered ? 'var(--accent-secondary)' : 'var(--accent-primary)'}`,
          width: hovered ? '55px' : '32px',
          height: hovered ? '55px' : '32px',
          backgroundColor: hovered ? 'rgba(16,185,129,0.08)' : 'transparent',
          boxShadow: hovered ? '0 0 20px rgba(16,185,129,0.15)' : 'none',
          willChange: 'transform',
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: clicked ? 0.7 : hovered ? 1.1 : 1,
          rotate: hovered ? 90 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
      />
    </>
  );
}
