import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, ShieldCheck } from 'lucide-react';

export default function Certifications() {
  const certificationsData = [
    {
      name: 'IBM AI Fundamentals Certificate',
      issuer: 'IBM SkillsBuild',
      date: '2024',
      details: [
        'Comprehensive training in Artificial Intelligence foundations, Neural Networks, Machine Learning algorithms, and NLP.',
        'Hands-on experience applying enterprise AI deployment frameworks and ethical AI principles.'
      ],
      link: '#'
    },
    {
      name: 'GenAI Powered Data Analytics',
      issuer: 'Tata Group (Forage Simulation)',
      date: '2024',
      details: [
        'Simulated analyst assignments: cleaning large-scale tabular datasets, drafting BI briefs, and leveraging GenAI workflows.',
        'Constructed visualization dashboards to address strategic KPI requirements.'
      ],
      link: '#'
    },
    {
      name: 'Self-Taught Data Analytics & BI',
      issuer: 'Independent Study',
      date: '2024',
      details: [
        'Mastered data cleaning, star-schema modeling, and advanced visualization with Power BI.',
        'Wrote DAX calculations (measures, calculated columns) and used Power Query for ETL.'
      ],
      link: '#'
    }
  ];

  return (
    <div className="cert-column flex flex-col gap-6 w-full text-left">
      <h3 className="column-title font-title font-bold text-2xl text-text-primary flex items-center gap-2 mb-2">
        <div className="p-2 bg-accent-glow-cyan rounded-xl border border-accent-secondary/20 text-accent-secondary">
          <Award size={22} />
        </div> 
        Certifications & Milestones
      </h3>

      {certificationsData.map((cert, index) => (
        <motion.div 
          key={index} 
          className="cert-card glass-panel border border-border-glass bg-bg-secondary/40 p-6 rounded-2xl relative overflow-hidden hover:border-accent-secondary/50 hover:shadow-[0_0_20px_var(--accent-glow-cyan)] transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          whileHover={{ y: -4 }}
        >
          {/* Top highlight bar */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-accent-secondary to-accent-primary opacity-60"></div>

          <div className="cert-header flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-4">
            <div className="cert-title-group">
              <h4 className="cert-name font-title font-bold text-lg text-text-primary">{cert.name}</h4>
              <span className="cert-issuer text-sm text-accent-secondary font-medium block mt-1">{cert.issuer}</span>
            </div>
            <span className="cert-date text-xs font-mono text-text-muted bg-bg-secondary py-1 px-3 border border-border-glass rounded-lg self-start sm:self-auto">{cert.date}</span>
          </div>

          <ul className="cert-bullets text-xs text-text-secondary list-disc pl-4 space-y-1.5 leading-relaxed font-light mb-4">
            {cert.details.map((detail, di) => (
              <li key={di}>{detail}</li>
            ))}
          </ul>

          <div className="flex items-center justify-between border-t border-border-glass/40 pt-4 mt-4">
            <span className="flex items-center gap-1 text-[10px] text-text-muted font-mono">
              <ShieldCheck size={12} className="text-accent-secondary" /> Secure Credential
            </span>
            {cert.link !== '#' ? (
              <motion.a 
                href={cert.link} 
                className="text-xs font-semibold text-accent-secondary flex items-center gap-1 hover:underline"
                whileHover={{ scale: 1.05 }}
              >
                Verify Certificate <ExternalLink size={12} />
              </motion.a>
            ) : (
              <span className="text-[10px] text-text-muted font-mono italic">
                Verified
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
