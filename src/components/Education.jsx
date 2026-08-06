import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';

export default function Education() {
  const educationData = [
    {
      degree: 'B.Tech in Computer Science and Engineering (AI & ML)',
      institution: 'Allenhouse Institute of Technology, AKTU, Kanpur',
      duration: '2023 – 2027',
      highlights: [
        'Honours Specialization: Cyber Security',
        'SGPA Performance — Year 1: 8.66 | Year 2: 7.77 | Semester 5: 8.22'
      ],
      coursework: [
        'Machine Learning',
        'Data Structures & Algorithms',
        'Database Management Systems',
        'Operating Systems',
        'Computer Networks'
      ]
    },
    {
      degree: 'Class XII (PCM)',
      institution: 'Super International School, Kanpur',
      duration: '2022',
      highlights: [
        'Board Core: Physics, Chemistry, Mathematics',
        'Academic Achievement Score: 76%'
      ],
      coursework: []
    }
  ];

  return (
    <div className="edu-column flex flex-col gap-6 w-full text-left">
      <h3 className="column-title font-title font-bold text-2xl text-text-primary flex items-center gap-2 mb-2">
        <div className="p-2 bg-accent-glow rounded-xl border border-accent-primary/20 text-accent-primary">
          <GraduationCap size={22} />
        </div> 
        Education
      </h3>
      
      {educationData.map((edu, index) => (
        <motion.div 
          key={index} 
          className="edu-card glass-panel border border-border-glass bg-bg-secondary/40 p-6 rounded-2xl relative overflow-hidden hover:border-accent-primary/50 hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          whileHover={{ y: -4 }}
        >
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-primary to-accent-secondary opacity-60"></div>

          <div className="edu-header flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-4">
            <div className="edu-title-group">
              <h4 className="edu-degree font-title font-bold text-lg text-text-primary">{edu.degree}</h4>
              <span className="edu-inst text-sm text-accent-secondary font-medium block mt-1">{edu.institution}</span>
            </div>
            <span className="edu-duration text-xs font-mono text-text-muted bg-bg-secondary py-1 px-3 border border-border-glass rounded-lg self-start sm:self-auto">{edu.duration}</span>
          </div>

          <ul className="edu-bullets text-xs text-text-secondary list-disc pl-4 space-y-1.5 leading-relaxed font-light mb-4">
            {edu.highlights.map((h, hi) => (
              <li key={hi}>{h}</li>
            ))}
          </ul>

          {edu.coursework.length > 0 && (
            <div className="border-t border-border-glass/40 pt-4 mt-4">
              <div className="text-xs font-semibold text-text-primary mb-2.5 flex items-center gap-1">
                <BookOpen size={12} className="text-accent-secondary" /> Relevant Coursework:
              </div>
              <div className="edu-courses flex flex-wrap gap-1.5">
                {edu.coursework.map((course, ci) => (
                  <span 
                    key={ci} 
                    className="text-[10px] bg-bg-secondary text-text-secondary border border-border-glass py-1 px-2.5 rounded-lg hover:border-accent-secondary transition-colors"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
