import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'revealing' | 'done'
  const [displayText, setDisplayText] = useState('INITIALIZING');

  useEffect(() => {
    const texts = ['INITIALIZING', 'LOADING ASSETS', 'COMPILING MODULES', 'FAIZAN.AI'];
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length;
      setDisplayText(texts[textIndex]);
    }, 600);

    // Smooth progress
    let prog = 0;
    const progressInterval = setInterval(() => {
      prog += Math.random() * 8 + 2;
      if (prog >= 100) {
        prog = 100;
        clearInterval(progressInterval);
        clearInterval(textInterval);
        setDisplayText('FAIZAN.AI');
        setTimeout(() => setPhase('revealing'), 300);
        setTimeout(() => {
          setPhase('done');
          onComplete?.();
        }, 1200);
      }
      setProgress(Math.min(prog, 100));
    }, 80);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onComplete]);

  // Glitch text characters
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  const getGlitchChar = () => glitchChars[Math.floor(Math.random() * glitchChars.length)];

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ 
            clipPath: 'circle(0% at 50% 50%)',
            opacity: 0,
          }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#050505',
            overflow: 'hidden',
          }}
        >
          {/* Animated Grid Background */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(16,185,129,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.6,
          }} />

          {/* Scanning line */}
          <motion.div
            style={{
              position: 'absolute',
              left: 0,
              width: '100%',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, var(--accent-primary), var(--accent-secondary), transparent)',
              boxShadow: '0 0 20px var(--accent-primary), 0 0 60px var(--accent-primary)',
              opacity: 0.6,
            }}
            animate={{ top: ['0%', '100%', '0%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />

          {/* Center content */}
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            {/* Logo morph */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0, filter: 'blur(20px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 style={{
                fontFamily: 'var(--font-title)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 900,
                letterSpacing: '0.15em',
                background: 'linear-gradient(135deg, #10b981, #34d399, #10b981)',
                backgroundSize: '200% 200%',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                position: 'relative',
              }}>
                <GlitchText text={displayText} isGlitching={phase === 'loading'} />
              </h1>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              style={{ marginTop: '2rem', width: '280px', margin: '2rem auto 0' }}
            >
              <div style={{
                width: '100%',
                height: '3px',
                background: 'rgba(16,185,129,0.15)',
                borderRadius: '4px',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <motion.div
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #10b981, #34d399)',
                    borderRadius: '4px',
                    boxShadow: '0 0 15px #10b981, 0 0 30px rgba(16,185,129,0.3)',
                  }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '0.8rem',
                fontSize: '0.7rem',
                fontFamily: 'monospace',
                color: 'rgba(16,185,129,0.6)',
                letterSpacing: '0.1em',
              }}>
                <span>SYS_LOAD</span>
                <span>{Math.floor(progress)}%</span>
              </div>
            </motion.div>
          </div>

          {/* Corner decorations */}
          <CornerDecor position="top-left" />
          <CornerDecor position="top-right" />
          <CornerDecor position="bottom-left" />
          <CornerDecor position="bottom-right" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function GlitchText({ text, isGlitching }) {
  const [displayChars, setDisplayChars] = useState(text.split(''));
  const glitchChars = '!@#$%^&*_+-=|;:<>?/~';

  useEffect(() => {
    if (!isGlitching) {
      setDisplayChars(text.split(''));
      return;
    }

    const interval = setInterval(() => {
      setDisplayChars(
        text.split('').map((char, i) => {
          if (char === ' ') return ' ';
          return Math.random() > 0.7
            ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
            : char;
        })
      );
    }, 60);

    return () => clearInterval(interval);
  }, [text, isGlitching]);

  return (
    <span style={{ display: 'inline-block' }}>
      {displayChars.map((char, i) => (
        <motion.span
          key={`${i}-${char}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.03, duration: 0.15 }}
          style={{ display: 'inline-block', minWidth: char === ' ' ? '0.3em' : undefined }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

function CornerDecor({ position }) {
  const styles = {
    'top-left': { top: '20px', left: '20px' },
    'top-right': { top: '20px', right: '20px', transform: 'scaleX(-1)' },
    'bottom-left': { bottom: '20px', left: '20px', transform: 'scaleY(-1)' },
    'bottom-right': { bottom: '20px', right: '20px', transform: 'scale(-1)' },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ delay: 0.5 }}
      style={{ position: 'absolute', ...styles[position] }}
    >
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M0 0 L40 0 L40 4 L4 4 L4 40 L0 40 Z" fill="#10b981" opacity="0.5" />
        <circle cx="4" cy="4" r="2" fill="#34d399" />
      </svg>
    </motion.div>
  );
}
