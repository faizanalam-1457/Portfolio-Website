import React, { useState } from 'react';
import { Mail, Phone, MapPin, Copy, Check, Send, Code2, Globe, Loader2, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Github, Linkedin } from './SocialIcons';

/* Animated floating label input */
function FloatingInput({ label, id, type = 'text', value, onChange, required = true }) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="form-group relative flex flex-col">
      <motion.label
        htmlFor={id}
        className="absolute left-4 pointer-events-none font-medium tracking-wider z-10"
        animate={{
          top: isActive ? '-8px' : '14px',
          fontSize: isActive ? '10px' : '13px',
          color: isActive ? 'var(--accent-secondary)' : 'var(--text-muted)',
          background: isActive ? 'var(--bg-secondary)' : 'transparent',
          padding: isActive ? '0 6px' : '0',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {label}
      </motion.label>
      <motion.input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="form-input bg-bg-secondary/80 border border-border-glass rounded-xl py-3.5 px-4 text-sm text-text-primary outline-none transition-all duration-300"
        required={required}
        animate={{
          borderColor: focused ? 'var(--accent-secondary)' : 'var(--border-glass)',
          boxShadow: focused ? '0 0 15px rgba(16,185,129,0.2), inset 0 0 0 1px var(--accent-secondary)' : '0 0 0px transparent',
        }}
      />
    </div>
  );
}

function FloatingTextarea({ label, id, value, onChange, rows = 4, required = true }) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  return (
    <div className="form-group relative flex flex-col">
      <motion.label
        htmlFor={id}
        className="absolute left-4 pointer-events-none font-medium tracking-wider z-10"
        animate={{
          top: isActive ? '-8px' : '14px',
          fontSize: isActive ? '10px' : '13px',
          color: isActive ? 'var(--accent-secondary)' : 'var(--text-muted)',
          background: isActive ? 'var(--bg-secondary)' : 'transparent',
          padding: isActive ? '0 6px' : '0',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {label}
      </motion.label>
      <motion.textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={rows}
        className="form-input bg-bg-secondary/80 border border-border-glass rounded-xl py-3.5 px-4 text-sm text-text-primary outline-none transition-all duration-300 resize-none"
        required={required}
        animate={{
          borderColor: focused ? 'var(--accent-secondary)' : 'var(--border-glass)',
          boxShadow: focused ? '0 0 15px rgba(16,185,129,0.2), inset 0 0 0 1px var(--accent-secondary)' : '0 0 0px transparent',
        }}
      />
    </div>
  );
}

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [status, setStatus] = useState(null); // 'success', 'error', or null
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStatus('success');

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#10b981', '#34d399', '#ffffff']
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus(null), 5000);
    }, 1200);
  };

  const contactMethods = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: 'faizanalam1457@gmail.com',
      href: 'mailto:faizanalam1457@gmail.com',
      copyType: 'email',
      copied: copiedEmail,
      color: 'text-accent-primary',
    },
    {
      icon: <Phone size={20} />,
      label: 'Phone',
      value: '+91 XXXXXXXXXX',
      href: 'tel:+91XXXXXXXXXX',
      copyType: 'phone',
      copied: copiedPhone,
      color: 'text-accent-secondary',
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: 'Kanpur, Uttar Pradesh, India',
      color: 'text-accent-primary',
    },
  ];

  return (
    <section id="contact" className="section py-24 relative">
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] bg-accent-glow rounded-full blur-[100px] pointer-events-none"></div>

      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Get In Touch
      </motion.h2>

      <motion.div
        className="contact-container max-w-5xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left Column: Contact info */}
        <div className="lg:col-span-5 flex">
          <motion.div
            className="contact-card glass-panel border border-border-glass bg-bg-secondary/40 p-8 rounded-3xl w-full flex flex-col justify-between hover:border-accent-primary/50 transition-all duration-300 group"
            whileHover={{ y: -4 }}
          >
            <div>
              <h3 className="form-title font-title font-bold text-2xl text-text-primary mb-2 text-left">Contact Details</h3>
              <p className="text-sm text-text-muted mb-8 text-left font-light">Have an interesting project or position? Let's connect and build something innovative.</p>

              <div className="flex flex-col gap-6 text-left">
                {contactMethods.map((method, i) => (
                  <motion.div
                    key={method.label}
                    className="contact-method flex items-center gap-4"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                  >
                    <motion.div
                      className={`contact-icon-box p-3 bg-bg-secondary border border-border-glass rounded-xl ${method.color}`}
                      whileHover={{ scale: 1.1, rotate: 5, borderColor: 'var(--accent-secondary)' }}
                    >
                      {method.icon}
                    </motion.div>
                    <div className="contact-text-box flex-1">
                      <span className="contact-label text-[10px] text-text-muted uppercase tracking-wider block">{method.label}</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        {method.href ? (
                          <a href={method.href} className="contact-value text-sm font-medium text-text-secondary hover:text-accent-secondary transition-colors">
                            {method.value}
                          </a>
                        ) : (
                          <span className="contact-value text-sm font-medium text-text-secondary">{method.value}</span>
                        )}
                        {method.copyType && (
                          <motion.button
                            className="p-1 rounded bg-bg-secondary border border-border-glass hover:border-accent-primary text-text-muted hover:text-text-primary transition-all"
                            onClick={() => handleCopy(method.value.replace(/\s/g, ''), method.copyType)}
                            whileTap={{ scale: 0.85 }}
                          >
                            <AnimatePresence mode="wait">
                              {method.copied ? (
                                <motion.span key="check" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                  <Check size={12} className="text-emerald-400" />
                                </motion.span>
                              ) : (
                                <motion.span key="copy" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                  <Copy size={12} />
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Icons row */}
            <div className="border-t border-border-glass/40 pt-6 mt-8">
              <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-3 text-left">Digital Footprints</span>
              <div className="contact-social-row flex items-center gap-3">
                {[
                  { href: 'https://github.com/faizanalam-1457', icon: <Github size={18} />, title: 'GitHub' },
                  { href: 'https://linkedin.com/in/faizan-alam-858a5630a', icon: <Linkedin size={18} />, title: 'LinkedIn' },
                  { href: 'https://leetcode.com/u/faizanalam1457', icon: <Code2 size={18} />, title: 'LeetCode' },
                  { href: '#', icon: <Globe size={18} />, title: 'Portfolio' },
                ].map((social, i) => (
                  <motion.a
                    key={social.title}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    title={social.title}
                    whileHover={{ y: -4, scale: 1.1, rotate: [0, -5, 5, 0] }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Contact form */}
        <div className="lg:col-span-7">
          <motion.div
            className="contact-form-panel glass-panel border border-border-glass bg-bg-secondary/40 p-8 rounded-3xl hover:border-accent-secondary/50 transition-all duration-300"
            whileHover={{ y: -4 }}
          >
            <h3 className="form-title font-title font-bold text-2xl text-text-primary mb-6 text-left">Send a Message</h3>

            <form className="contact-form flex flex-col gap-5 text-left" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FloatingInput label="Name" id="name" value={formData.name} onChange={handleInputChange} />
                <FloatingInput label="Email" id="email" type="email" value={formData.email} onChange={handleInputChange} />
              </div>

              <FloatingInput label="Subject" id="subject" value={formData.subject} onChange={handleInputChange} />
              <FloatingTextarea label="Message" id="message" value={formData.message} onChange={handleInputChange} />

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-xl text-xs text-emerald-400 font-medium flex items-center gap-2"
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                  >
                    <CheckCircle size={16} />
                    Your message has been sent successfully! Let's celebrate. 🎉
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    className="p-4 bg-red-950/40 border border-red-500/50 rounded-xl text-xs text-red-400 font-medium"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    Please fill in all fields before sending.
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Morphing submit button */}
              <motion.button
                type="submit"
                className="btn btn-primary flex items-center justify-center gap-2 self-start py-3 px-8 rounded-xl font-semibold shadow-lg shadow-accent-primary/25 relative overflow-hidden"
                disabled={loading}
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px var(--accent-glow)' }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  width: loading ? '52px' : 'auto',
                  borderRadius: loading ? '50%' : '12px',
                }}
                transition={{ duration: 0.3 }}
              >
                <AnimatePresence mode="wait">
                  {loading ? (
                    <motion.span key="loading" initial={{ opacity: 0, rotate: 0 }} animate={{ opacity: 1, rotate: 360 }} transition={{ rotate: { repeat: Infinity, duration: 1, ease: 'linear' } }}>
                      <Loader2 size={18} />
                    </motion.span>
                  ) : status === 'success' ? (
                    <motion.span key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2">
                      <CheckCircle size={16} /> Sent!
                    </motion.span>
                  ) : (
                    <motion.span key="default" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                      Send Message <Send size={14} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
