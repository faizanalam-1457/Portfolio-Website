import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Background() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Generate slow floating particles
    const generated = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 25 + 15,
    }));
    setParticles(generated);
  }, []);

  return (
    <div className="bg-container">
      {/* Cybersecurity Cyberpunk Grid */}
      <div className="bg-grid"></div>
      
      {/* Premium Noise Overlay */}
      <div className="bg-noise"></div>
      
      {/* Glowing Neon Blobs (Mesh) */}
      <div className="bg-glow-orb orb-1"></div>
      <div className="bg-glow-orb orb-2"></div>
      <div className="bg-glow-orb orb-3"></div>

      {/* Floating Particles */}
      <div className="particles-container">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.15, 0.7, 0.15],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </div>
  );
}
