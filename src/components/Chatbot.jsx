import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Bot, Folder, ExternalLink, Mail, Code2 } from 'lucide-react';
import { Github, Linkedin } from './SocialIcons';
import { resumeData } from '../utils/resumeData';
import profileImg from '../assets/profile.jpg';

// Typewriter Text Animator Component (Simplified, no audio ticks)
function TypewriterText({ text, speed = 8, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  
  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    
    if (!text) {
      if (onComplete) onComplete();
      return;
    }

    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed, onComplete]);
  
  return <>{displayedText}</>;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isTypingText, setIsTypingText] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize messages list if empty
  useEffect(() => {
    if (messages.length === 0) {
      resetChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages.length]);

  // Auto-scroll to bottom of chat history
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const resetChat = () => {
    setMessages([
      {
        sender: 'bot',
        text: "Hello! I am Faizan's AI Assistant. Ask me anything about his projects, skills, education, internship experience, or how to contact him!",
        type: 'text'
      }
    ]);
  };

  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    // Add user message to chat list
    const userMsg = { sender: 'user', text };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setIsTypingText(false);

    // Process query matching
    setTimeout(() => {
      const result = matchQuery(text);

      // Add bot response
      setMessages((prev) => [...prev, { sender: 'bot', text: result.text, type: result.type }]);
      setIsTyping(false);
      setIsTypingText(true);
    }, 800); // 0.8s responsive typing delay
  };

  const matchQuery = (query) => {
    const cleanQuery = query.trim().toLowerCase();
    
    // Help query returns conversational instructions
    if (cleanQuery === 'help' || cleanQuery === '/help' || cleanQuery === '?') {
      return {
        type: 'text',
        text: `You can ask me about:\n- **projects**: View his development work\n- **skills**: See his technical capabilities\n- **experience**: Check his internship history\n- **education**: View his B.Tech details\n- **contact**: Get touch info & profile links`
      };
    }
    if (cleanQuery === 'neofetch' || cleanQuery === 'system' || cleanQuery === 'faizan' || cleanQuery === 'resume') {
      return {
        type: 'neofetch',
        text: ''
      };
    }
    if (cleanQuery === 'skills' || cleanQuery === 'technologies' || cleanQuery === 'languages') {
      return {
        type: 'skills',
        text: ''
      };
    }
    if (cleanQuery === 'projects' || cleanQuery === 'work' || cleanQuery === 'portfolio') {
      return {
        type: 'projects',
        text: ''
      };
    }
    if (cleanQuery === 'contact' || cleanQuery === 'email' || cleanQuery === 'phone' || cleanQuery === 'reach') {
      return {
        type: 'contact',
        text: ''
      };
    }
    if (cleanQuery === 'experience' || cleanQuery === 'internship') {
      const expQa = resumeData.chatbotQA.find(qa => qa.keywords.includes('internship'));
      return {
        type: 'text',
        text: expQa ? expQa.response : 'Worked as a Web Developer Intern at Oasis Infobyte (Nov 2024 - Jan 2025).'
      };
    }
    if (cleanQuery === 'education' || cleanQuery === 'college' || cleanQuery === 'aktu') {
      const eduQa = resumeData.chatbotQA.find(qa => qa.keywords.includes('education'));
      return {
        type: 'text',
        text: eduQa ? eduQa.response : 'Pursuing B.Tech CSE (AI & ML) at Allenhouse Institute of Technology.'
      };
    }

    // Normal keyword checking using resumeData
    for (const qa of resumeData.chatbotQA) {
      const match = qa.keywords.some((keyword) => cleanQuery.includes(keyword));
      if (match) {
        let type = 'text';
        if (qa.keywords.includes('skills')) type = 'skills';
        if (qa.keywords.includes('project') && !qa.keywords.includes('rag') && !qa.keywords.includes('expense') && !qa.keywords.includes('drowsiness') && !qa.keywords.includes('sales')) type = 'projects';
        if (qa.keywords.includes('contact')) type = 'contact';
        return { type, text: qa.response };
      }
    }

    // Default fallback response
    return {
      type: 'text',
      text: `I am not sure I understand that query. You can ask me about his "projects", "internship", "skills", "education", or "contact" details.`
    };
  };

  const renderCustomMessage = (msg, index) => {
    if (msg.sender === 'user') {
      return <div>{msg.text}</div>;
    }

    // Custom visual output renderers for bot responses
    switch (msg.type) {
      case 'neofetch':
        return (
          <div className="modern-profile-card">
            <div className="profile-card-header">
              <img src={profileImg} alt="Faizan Alam" className="profile-card-avatar" />
              <div className="profile-card-name-role">
                <span className="profile-card-name">Faizan Alam</span>
                <span className="profile-card-role">AIML Engineer & MERN Developer</span>
              </div>
            </div>
            <div className="profile-card-details">
              <div className="profile-detail-row">
                <span className="profile-detail-key">Degree:</span>
                <span className="profile-detail-val">B.Tech CSE (AI & ML)</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-key">LeetCode:</span>
                <span className="profile-detail-val">130+ Solved</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-key">Experience:</span>
                <span className="profile-detail-val">Web Dev Intern</span>
              </div>
              <div className="profile-detail-row">
                <span className="profile-detail-key">Status:</span>
                <span className="profile-detail-val" style={{ color: 'var(--accent-secondary)' }}>Open to Roles</span>
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="modern-skills-grid">
            <div className="skills-category-box">
              <div className="skills-category-title"><Folder size={12} style={{ marginRight: '6px' }} /> Generative AI & ML</div>
              <div className="skills-category-pills">
                {['LangChain', 'RAG', 'Groq LLM', 'Scikit-learn', 'OpenCV', 'MediaPipe'].map((s, i) => (
                  <span key={i} className="modern-skill-badge">{s}</span>
                ))}
              </div>
            </div>
            <div className="skills-category-box">
              <div className="skills-category-title"><Folder size={12} style={{ marginRight: '6px' }} /> Web Dev (MERN)</div>
              <div className="skills-category-pills">
                {['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth'].map((s, i) => (
                  <span key={i} className="modern-skill-badge">{s}</span>
                ))}
              </div>
            </div>
            <div className="skills-category-box">
              <div className="skills-category-title"><Folder size={12} style={{ marginRight: '6px' }} /> Languages & Tools</div>
              <div className="skills-category-pills">
                {['Python', 'Java', 'SQL', 'Git', 'Power BI', 'Figma'].map((s, i) => (
                  <span key={i} className="modern-skill-badge">{s}</span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="modern-projects-list">
            {[
              {
                title: 'HR Policy RAG Assistant',
                desc: 'LangChain-powered chatbot grounding replies in policy documents using dense vector embeddings.',
                tags: ['Python', 'LangChain', 'Groq', 'Streamlit'],
                link: 'https://github.com/faizanalam1457/HR-Policy-Rag-Assistant'
              },
              {
                title: 'MERN Expense Tracker',
                desc: 'Full-stack transaction manager featuring secure JWT session cookies & responsive charts.',
                tags: ['React', 'Node.js', 'MongoDB', 'Express'],
                link: 'https://github.com/faizanalam-1457'
              },
              {
                title: 'Sales Performance Dashboard',
                desc: 'Power BI analytics showing business KPIs utilizing Power Query data modelling & DAX.',
                tags: ['Power BI', 'Power Query', 'DAX'],
                link: 'https://github.com/faizanalam-1457'
              },
              {
                title: 'Driver Drowsiness Detector',
                desc: 'Real-time computer vision tracker computing Eye Aspect Ratio (EAR) with MediaPipe landmarks.',
                tags: ['Python', 'OpenCV', 'MediaPipe'],
                link: 'https://github.com/faizanalam-1457'
              }
            ].map((proj, idx) => (
              <div key={idx} className="modern-project-card">
                <div className="modern-project-header">
                  <span className="modern-project-title">{proj.title}</span>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="modern-project-link">
                    <ExternalLink size={12} />
                  </a>
                </div>
                <p className="modern-project-desc">{proj.desc}</p>
                <div className="modern-project-tags">
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="modern-project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="modern-contact-list">
            <div className="modern-contact-item">
              <span className="modern-contact-icon"><Mail size={14} /></span>
              <span className="modern-contact-label">Email:</span>
              <a href="mailto:faizanalam1457@gmail.com" className="modern-contact-val">faizanalam1457@gmail.com</a>
            </div>
            <div className="modern-contact-item">
              <span className="modern-contact-icon"><Linkedin size={14} /></span>
              <span className="modern-contact-label">LinkedIn:</span>
              <a href="https://linkedin.com/in/faizan-alam-858a5630a" target="_blank" rel="noopener noreferrer" className="modern-contact-val">faizan-alam</a>
            </div>
            <div className="modern-contact-item">
              <span className="modern-contact-icon"><Github size={14} /></span>
              <span className="modern-contact-label">GitHub:</span>
              <a href="https://github.com/faizanalam-1457" target="_blank" rel="noopener noreferrer" className="modern-contact-val">faizanalam-1457</a>
            </div>
            <div className="modern-contact-item">
              <span className="modern-contact-icon"><Code2 size={14} /></span>
              <span className="modern-contact-label">LeetCode:</span>
              <a href="https://leetcode.com/u/faizanalam1457" target="_blank" rel="noopener noreferrer" className="modern-contact-val">faizanalam1457</a>
            </div>
            <button type="button" className="modern-copy-email-btn" onClick={() => {
              navigator.clipboard.writeText('faizanalam1457@gmail.com');
              alert('Email copied to clipboard!');
            }}>Copy Email Address</button>
          </div>
        );

      default:
        // Render simple paragraphs with bold parsing and typewriter animations
        return (
          <div className="chat-bubble-paragraphs">
            {msg.text.split('\n').map((line, li) => {
              const parts = line.split(/\*\*(.*?)\*\*/g);
              const renderedLine = parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
              
              // Only apply typewriter to the most recent bot message
              const isLastMessage = index === messages.length - 1;
              if (isLastMessage && isTypingText) {
                return (
                  <p key={li}>
                    <TypewriterText 
                      text={line} 
                      onComplete={li === msg.text.split('\n').length - 1 ? () => setIsTypingText(false) : undefined}
                    />
                  </p>
                );
              }
              
              return (
                <p key={li}>
                  {renderedLine}
                </p>
              );
            })}
          </div>
        );
    }
  };

  const getSuggestionChips = () => {
    return [
      { label: 'Projects 🚀', query: 'projects' },
      { label: 'Skills 💻', query: 'skills' },
      { label: 'Education 🎓', query: 'education' },
      { label: 'Contact ✉️', query: 'contact' },
    ];
  };

  return (
    <div className="chatbot-wrapper">
      {/* Floating Chat Trigger Button */}
      <button
        className={`chatbot-trigger ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Chatbot"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && <span className="chatbot-pulse-dot"></span>}
      </button>

      {/* Chat Window Panel */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chatbot-header">
          <div style={{ display: 'flex', alignContent: 'center', gap: '10px', alignItems: 'center' }}>
            <div className="chatbot-avatar">
              <Bot size={18} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="chatbot-title">Faizan's AI Assistant</span>
              <span className="chatbot-status">Online</span>
            </div>
          </div>
          
          <button
            type="button"
            className="chatbot-close-btn"
            onClick={() => setIsOpen(false)}
            title="Close Assistant"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat History Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chat-bubble-row ${msg.sender}`}>
              <div className={`chat-bubble ${msg.sender}`}>
                {renderCustomMessage(msg, index)}
              </div>
            </div>
          ))}

          {/* Typing Indicator Bubble */}
          {isTyping && (
            <div className="chat-bubble-row bot">
              <div className="chat-bubble bot typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        <div className="chatbot-suggestions">
          {getSuggestionChips().map((chip, i) => (
            <button
              type="button"
              key={i}
              className="suggestion-chip"
              onClick={() => handleSendMessage(chip.query)}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Footer Input Form */}
        <form
          className="chatbot-input-form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage(inputValue);
          }}
        >
          <div className="chatbot-input-container">
            <input
              type="text"
              className="chatbot-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything about Faizan..."
              disabled={isTyping}
            />
          </div>
          <button type="submit" className="chatbot-send-btn" disabled={!inputValue.trim() || isTyping}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
