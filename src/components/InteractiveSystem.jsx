import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal as TermIcon, Music, Volume2, VolumeX, Mic, Award, X, Sparkles, Trophy, Gamepad2, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

// Available achievements list
const ACHIEVEMENTS_DATA = {
  EXPLORER: { title: 'Digital Explorer', desc: 'Opened the Command Palette (⌘K)', icon: <Search size={18} /> },
  HACKER: { title: 'Netrunner', desc: 'Logged into the Cyber Terminal Console (t)', icon: <TermIcon size={18} /> },
  KONAMI: { title: 'Konami Code Master', desc: 'Unlocked the legendary code! (↑↑↓↓←→←→BA)', icon: <Trophy size={18} className="text-yellow-400" /> },
  GAMER: { title: 'SQL Injection Expert', desc: 'Reached 25 score in Node Hacking Mini-Game', icon: <Gamepad2 size={18} /> },
  MUSICIAN: { title: 'Chiptune Enthusiast', desc: 'Synced your vibe with Web Audio synth loop', icon: <Music size={18} /> },
  VOICE: { title: 'Vocal Command', desc: 'Activated Voice Navigation protocol', icon: <Mic size={18} /> }
};

export default function InteractiveSystem() {
  // Navigation lists for command palette
  const navItems = [
    { label: 'Go to Home', action: () => scrollToSection('home'), category: 'Navigation' },
    { label: 'Go to About', action: () => scrollToSection('about'), category: 'Navigation' },
    { label: 'Go to Skills', action: () => scrollToSection('skills'), category: 'Navigation' },
    { label: 'Go to Projects', action: () => scrollToSection('projects'), category: 'Navigation' },
    { label: 'Go to Experience', action: () => scrollToSection('experience'), category: 'Navigation' },
    { label: 'Go to Education', action: () => scrollToSection('education'), category: 'Navigation' },
    { label: 'Go to Contact', action: () => scrollToSection('contact'), category: 'Navigation' },
    { label: 'Toggle Theme Mode', action: () => toggleAppTheme(), category: 'Actions' },
    { label: 'Open Terminal Console', action: () => setTerminalOpen(true), category: 'Actions' },
    { label: 'Play Hacking Mini-Game', action: () => { setTerminalOpen(true); startTerminalGame(); }, category: 'Actions' },
    { label: 'Toggle Synth Chiptune Music', action: () => toggleMusic(), category: 'Audio' },
    { label: 'Start Voice Navigation Listener', action: () => startVoiceNavigation(), category: 'Actions' },
    { label: 'Launch Confetti Celebration', action: () => triggerConfetti(), category: 'Fun' }
  ];

  // Component states
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState('');
  const [narratorSpeaking, setNarratorSpeaking] = useState(false);
  const [narratorPanelOpen, setNarratorPanelOpen] = useState(false);
  const [currentNarratingSection, setCurrentNarratingSection] = useState(null);
  
  // Search query in command palette
  const [searchQuery, setSearchQuery] = useState('');
  
  // Audio state
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioContextRef = useRef(null);
  const synthIntervalRef = useRef(null);

  // Achievement toast state
  const [activeToast, setActiveToast] = useState(null);
  const [toastQueue, setToastQueue] = useState([]);

  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState([
    'FAIZAN.AI OS [Version 3.01.2026]',
    '(c) 2026 Faizan Alam. All connection lines secure.',
    'Type "help" to display command lists.'
  ]);
  const [gameActive, setGameActive] = useState(false);
  const [gameScore, setGameScore] = useState(0);
  const [gameNodes, setGameNodes] = useState([]);
  
  const terminalEndRef = useRef(null);

  // Konami Code state
  const konamiSeq = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  const konamiProgress = useRef([]);

  // 1. Keyboard Event Listeners (Shortcuts & Konami)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K to toggle Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setPaletteOpen(prev => !prev);
        return;
      }

      // Close open modals on Escape
      if (e.key === 'Escape') {
        setPaletteOpen(false);
        setTerminalOpen(false);
        return;
      }

      // Shortcuts (ignoring when inside input forms)
      const insideInput = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA';
      if (!insideInput) {
        if (e.key === 't') {
          e.preventDefault();
          setTerminalOpen(prev => !prev);
          return;
        }
        if (e.key === 'm') {
          e.preventDefault();
          toggleMusic();
          return;
        }

        // Navigation shortcuts (G + H/A/S/P/E/C)
        if (e.key === 'g') {
          const handleNextKey = (nextEvent) => {
            document.removeEventListener('keydown', handleNextKey);
            if (nextEvent.key === 'h') scrollToSection('home');
            if (nextEvent.key === 'a') scrollToSection('about');
            if (nextEvent.key === 's') scrollToSection('skills');
            if (nextEvent.key === 'p') scrollToSection('projects');
            if (nextEvent.key === 'e') scrollToSection('experience');
            if (nextEvent.key === 'c') scrollToSection('contact');
          };
          document.addEventListener('keydown', handleNextKey);
        }
      }

      // Konami Code progress tracking
      const expectedKey = konamiSeq[konamiProgress.current.length];
      if (e.key === expectedKey) {
        konamiProgress.current.push(e.key);
        if (konamiProgress.current.length === konamiSeq.length) {
          triggerKonamiEffect();
          konamiProgress.current = [];
        }
      } else {
        konamiProgress.current = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [musicPlaying]);

  // Achievement unlock triggers
  useEffect(() => {
    if (paletteOpen) {
      unlockAchievement('EXPLORER');
    }
  }, [paletteOpen]);

  useEffect(() => {
    if (terminalOpen) {
      unlockAchievement('HACKER');
      setTimeout(() => {
        if (terminalEndRef.current) {
          terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [terminalOpen]);

  // Toast Queue Manager
  useEffect(() => {
    if (toastQueue.length > 0 && !activeToast) {
      const nextToast = toastQueue[0];
      setActiveToast(nextToast);
      setToastQueue(prev => prev.slice(1));
      
      // Play arcade chiptune lock sound
      playChiptuneSFX();

      // Clear toast after 4s
      setTimeout(() => {
        setActiveToast(null);
      }, 4000);
    }
  }, [toastQueue, activeToast]);

  const unlockAchievement = (key) => {
    const saved = localStorage.getItem(`ach_${key}`);
    if (!saved) {
      localStorage.setItem(`ach_${key}`, 'unlocked');
      const data = ACHIEVEMENTS_DATA[key];
      if (data) {
        setToastQueue(prev => [...prev, data]);
      }
    }
  };

  // Helper: Smooth scroll
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elRect = el.getBoundingClientRect().top;
      const pos = elRect - bodyRect - offset;
      window.scrollTo({ top: pos, behavior: 'smooth' });
    }
    setPaletteOpen(false);
  };

  // Helper: Toggle theme
  const toggleAppTheme = () => {
    const current = document.body.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setPaletteOpen(false);
  };

  // Confetti celebration
  const triggerConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#10b981', '#34d399', '#ffffff']
    });
    setPaletteOpen(false);
  };

  // Konami Secret Glitch Effect
  const triggerKonamiEffect = () => {
    unlockAchievement('KONAMI');
    triggerConfetti();

    // Play arcade fanfare sound
    playKonamiFanfare();

    // Glitch screen effect (adds class to body, then removes it after 1.5s)
    document.body.classList.add('konami-glitch-active');
    
    // Log secret console Easter Egg
    console.log('%c👾 KONAMI CODE UNLOCKED! Secret Mode Initiated 👾', 'color: #10b981; font-size: 20px; font-weight: bold; background: #000; padding: 10px; border: 2px solid #10b981;');

    setTimeout(() => {
      document.body.classList.remove('konami-glitch-active');
    }, 1500);
  };

  // 2. WEB AUDIO SYNTH ENGINE (Synthesized Audio)
  const toggleMusic = () => {
    if (musicPlaying) {
      // Stop music
      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      setMusicPlaying(false);
    } else {
      // Start music
      unlockAchievement('MUSICIAN');
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        const mainGain = ctx.createGain();
        mainGain.gain.value = 0.02; // soft volume
        mainGain.connect(ctx.destination);

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 400;
        filter.connect(mainGain);

        // Synth Chiptune Sequence arpeggiator
        // A minor pentatonic scale notes (frequencies)
        const notes = [110, 130.81, 146.83, 164.81, 196.00, 220, 261.63, 329.63];
        let step = 0;

        synthIntervalRef.current = setInterval(() => {
          if (ctx.state === 'suspended') ctx.resume();

          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          
          // Sawtooth with high cut filter creates retro bass chiptunes
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(notes[step % notes.length], ctx.currentTime);
          
          oscGain.gain.setValueAtTime(0.04, ctx.currentTime);
          oscGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.65);
          
          osc.connect(oscGain);
          oscGain.connect(filter);
          
          osc.start();
          osc.stop(ctx.currentTime + 0.7);

          step = (step + 1) % notes.length;
        }, 320);

        setMusicPlaying(true);
      } catch (err) {
        console.error('Audio synthesizer init failed', err);
      }
    }
  };

  // Play achievement lock sound (arcade-like "ding-ding")
  const playChiptuneSFX = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = 'square';
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      const now = ctx.currentTime;
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.setValueAtTime(392, now + 0.1);
      osc.frequency.setValueAtTime(523, now + 0.2);

      oscGain.gain.setValueAtTime(0.04, now);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

      osc.start(now);
      osc.stop(now + 0.4);
    } catch (e) {}
  };

  // Play special fanfare for Konami Code Unlock
  const playKonamiFanfare = () => {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523.25, 523.25, 523.25, 523.25, 659.25, 587.33, 523.25, 659.25, 783.99];
      const durations = [0.1, 0.1, 0.1, 0.2, 0.2, 0.1, 0.1, 0.1, 0.4];
      let delay = 0;

      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
        
        gain.gain.setValueAtTime(0.04, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + durations[i]);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + durations[i]);
        delay += durations[i] + 0.02;
      });
    } catch (e) {}
  };

  // --- VOICE SPEECH NARRATOR SYSTEM ---
  const sectionNarrations = {
    home: "You are on the Home section. Here, you can find Faizan Alam's summary as an AI and ML Engineer and Full Stack Developer.",
    about: "The About section outlines Faizan's background. He is a B Tech Computer Science student at Allenhouse Institute of Technology, specializing in Artificial Intelligence, Machine Learning, and Cyber Security. He builds intelligent agents, computer vision trackers, and full-stack web applications.",
    skills: "The Skills section lists Faizan's core technical capabilities. He specializes in Frontend with React and Tailwind, Backend with Node and Express, Databases with MongoDB and SQL, and AI modeling using LangChain, Groq LLM, Scikit-learn, OpenCV, and MediaPipe.",
    projects: "The Projects section showcases Faizan's systems. These include an HR Policy RAG Assistant, a MERN Expense Tracker with JWT authentication, a Power BI Sales Performance Dashboard, and a MediaPipe Driver Drowsiness Detector.",
    experience: "The Experience section displays Faizan's work history. He worked as a Web Developer Intern at Oasis Infobyte, building responsive websites and wireframes, and acts as a college Hackathon Lead.",
    education: "The Education section shows Faizan's credentials. He is pursuing a B Tech in Computer Science and Engineering with Honours in Cyber Security, and completed his high school PCM with honours.",
    contact: "The Contact section provides communication channels. You can email Faizan at faizanalam1457@gmail.com, or view his LinkedIn, GitHub, and LeetCode profiles."
  };

  const speakText = (sectionKey, text, callback) => {
    if (!window.speechSynthesis) {
      alert("Text to Speech is not supported in this browser.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en')) || voices[0];
    if (englishVoice) utterance.voice = englishVoice;
    
    utterance.rate = 1.05;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => {
      setNarratorSpeaking(true);
      setCurrentNarratingSection(sectionKey);
    };
    utterance.onend = () => {
      setNarratorSpeaking(false);
      setCurrentNarratingSection(null);
      if (callback) callback();
    };
    utterance.onerror = () => {
      setNarratorSpeaking(false);
      setCurrentNarratingSection(null);
      if (callback) callback();
    };
    window.speechSynthesis.speak(utterance);
  };

  const startSpeechRecognitionForNarration = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setVoiceActive(true);
      setVoiceMessage("Speak a section name (e.g. 'About')...");
    };
    recognition.onend = () => {
      setVoiceActive(false);
    };
    recognition.onerror = () => {
      setVoiceActive(false);
    };
    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setVoiceMessage(`Matched: "${command}"`);

      let matchedSection = null;
      if (command.includes('about') || command.includes('profile')) matchedSection = 'about';
      else if (command.includes('skills') || command.includes('ability') || command.includes('technologies')) matchedSection = 'skills';
      else if (command.includes('project') || command.includes('work') || command.includes('portfolio')) matchedSection = 'projects';
      else if (command.includes('experience') || command.includes('job') || command.includes('career')) matchedSection = 'experience';
      else if (command.includes('education') || command.includes('college') || command.includes('school')) matchedSection = 'education';
      else if (command.includes('contact') || command.includes('hire') || command.includes('email')) matchedSection = 'contact';
      else if (command.includes('home') || command.includes('top')) matchedSection = 'home';

      if (matchedSection) {
        scrollToSection(matchedSection);
        setTimeout(() => {
          speakText(matchedSection, sectionNarrations[matchedSection]);
        }, 800);
      } else {
        speakText('error', "Sorry, I could not find that section. Please click the voice speaker button to try again.");
      }
    };
    recognition.start();
  };

  const startNarratorGuide = () => {
    if (narratorPanelOpen) {
      setNarratorPanelOpen(false);
      window.speechSynthesis.cancel();
      setNarratorSpeaking(false);
      setCurrentNarratingSection(null);
      return;
    }
    
    // Announce the guide options and open the options list panel
    setNarratorPanelOpen(true);
    speakText(
      'guide',
      "Welcome to the portfolio voice guide. Click any section in the narrator panel to listen to its details."
    );
  };

  // 3. VOICE NAVIGATION SYSTEM
  const startVoiceNavigation = () => {
    setPaletteOpen(false);
    
    // Check Speech Recognition support
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition is not supported by your current browser. Try Chrome or Safari.');
      return;
    }

    unlockAchievement('VOICE');
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setVoiceActive(true);
      setVoiceMessage('Listening for navigation command...');
    };

    recognition.onerror = (e) => {
      setVoiceActive(false);
      console.error(e);
    };

    recognition.onend = () => {
      setVoiceActive(false);
    };

    recognition.onresult = (event) => {
      const command = event.results[0][0].transcript.toLowerCase();
      setVoiceMessage(`Command detected: "${command}"`);

      // Navigation Command Routing
      if (command.includes('about') || command.includes('profile')) {
        scrollToSection('about');
      } else if (command.includes('skills') || command.includes('experience')) {
        scrollToSection('skills');
      } else if (command.includes('projects') || command.includes('portfolio') || command.includes('work')) {
        scrollToSection('projects');
      } else if (command.includes('contact') || command.includes('hire')) {
        scrollToSection('contact');
      } else if (command.includes('home') || command.includes('top')) {
        scrollToSection('home');
      } else if (command.includes('theme') || command.includes('dark') || command.includes('light')) {
        toggleAppTheme();
      } else if (command.includes('terminal') || command.includes('console')) {
        setTerminalOpen(true);
      } else {
        setVoiceMessage(`Command "${command}" unrecognized.`);
      }

      setTimeout(() => {
        setVoiceMessage('');
      }, 3000);
    };

    recognition.start();
  };

  // 4. RETRO TERMINAL ACTIONS & LOGIC
  const runTerminalCommand = (e) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.toLowerCase().trim();
    setTerminalLogs(prev => [...prev, `> ${terminalInput}`]);

    let output = [];
    
    if (gameActive) {
      // Hacking Game input processing
      if (cmd === 'exit') {
        setGameActive(false);
        output = ['Hacking node connection severed. Terminal restored.'];
      } else {
        const num = parseInt(cmd);
        if (!isNaN(num) && num > 0 && num <= gameNodes.length) {
          const targetedNode = gameNodes[num - 1];
          if (targetedNode.secure) {
            output = ['Node already breached. Connect to other interfaces.'];
          } else {
            // Success breach node
            const points = Math.floor(Math.random() * 8) + 4;
            const newScore = gameScore + points;
            setGameScore(newScore);
            
            // Mark node secure
            const updated = [...gameNodes];
            updated[num - 1].secure = true;
            setGameNodes(updated);

            output = [
              `BREACH SUCCESSFUL: Secure node #${num} compromised!`,
              `Extracted +${points} Databank Credits.`,
              `Total Credits: ${newScore} C`
            ];

            // Achievement check
            if (newScore >= 25) {
              unlockAchievement('GAMER');
            }

            // Regenerate nodes if all are secure
            if (updated.every(n => n.secure)) {
              output.push('--- LEVEL BREACH COMPLETE. GENERATING SUB-LAYERS ---');
              setTimeout(() => generateHackingNodes(), 500);
            }
          }
        } else {
          output = ['ERR: Invalid Node target ID. Choose an active connection interface ID.'];
        }
      }
    } else {
      // Standard shell commands
      switch (cmd) {
        case 'help':
          output = [
            'System Commands:',
            '  about     - Brief narrative summary about Faizan',
            '  skills    - List core tech capabilities',
            '  projects  - Show featured systems shipped',
            '  contact   - Print communication endpoints',
            '  theme     - Toggle light/dark UI framework theme',
            '  music     - Play ambient chiptune synth bass',
            '  game      - Play SQL Hacking Node Mini-game',
            '  clear     - Clean the visual screen logs',
            '  exit      - Close Terminal console'
          ];
          break;
        case 'about':
          output = [
            'Name: Faizan Alam',
            'Role: AIML Engineer & Full Stack MERN Developer',
            'B.Tech CSE (AI & ML) student with Honours focus in Cyber Security.',
            'Specializing in RAG systems, CV models, and robust Web APIs.'
          ];
          break;
        case 'skills':
          output = [
            'Capability Database:',
            '  AI & ML   : LangChain, RAG, Groq LLM, Scikit-learn, OpenCV',
            '  Frontend  : React.js, Tailwind CSS, Responsive Web Design',
            '  Backend   : Node.js, Express.js, REST APIs, JWT Security',
            '  Databases : MongoDB, SQL, DBMS structures',
            '  Languages : Python, JavaScript, Java, C'
          ];
          break;
        case 'projects':
          output = [
            '1. HR Policy RAG Assistant (LangChain, Groq LLM, Vector Stores)',
            '2. MERN Expense Tracker (Full stack CRUD, JWT auth, MongoDB)',
            '3. Sales Dashboard (Power BI KPI reporting, DAX measures)',
            '4. Driver Drowsiness Detector (Real-time facial eye-mesh tracking)'
          ];
          break;
        case 'contact':
          output = [
            'Contact Interfaces:',
            '  Email     : faizanalam1457@gmail.com',
            '  LinkedIn  : linkedin.com/in/faizan-alam-858a5630a',
            '  GitHub    : github.com/faizanalam-1457',
            '  LeetCode  : leetcode.com/u/faizanalam1457'
          ];
          break;
        case 'theme':
          toggleAppTheme();
          output = ['System Theme framework toggled.'];
          break;
        case 'music':
          toggleMusic();
          output = [musicPlaying ? 'Web Audio synth stopped.' : 'Synthesizing ambient chiptune sequencer loop...'];
          break;
        case 'game':
          startTerminalGame();
          output = ['Initializing Node Breaker Console Game...'];
          break;
        case 'clear':
          setTerminalLogs([]);
          setTerminalInput('');
          return;
        case 'exit':
          setTerminalOpen(false);
          setTerminalInput('');
          return;
        default:
          output = [`Command "${cmd}" not recognized. Type "help" for a list of directives.`];
      }
    }

    setTerminalLogs(prev => [...prev, ...output]);
    setTerminalInput('');

    // Scroll to bottom of terminal
    setTimeout(() => {
      if (terminalEndRef.current) {
        terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const startTerminalGame = () => {
    setGameActive(true);
    setGameScore(0);
    generateHackingNodes();
    setTerminalLogs(prev => [
      ...prev,
      '==============================================',
      '🚨 NETRUNNER PORT INTERFACE HACK SYSTEM 🚨',
      'Choose a connection index to bypass encryption:',
      'Type "exit" at any time to sever connection.'
    ]);
  };

  const generateHackingNodes = () => {
    const count = 4;
    const generated = Array.from({ length: count }).map((_, i) => ({
      id: i + 1,
      port: Math.floor(Math.random() * 8000) + 1000,
      secure: false
    }));
    setGameNodes(generated);
  };

  // Filter commands in palette
  const filteredItems = navItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* 1. Interactive Media & Narrator Toolbar Float */}
      <div className="fixed bottom-24 right-8 z-40 flex flex-col gap-3">
        {/* Voice Speaker Narration Button */}
        <motion.button
          onClick={startNarratorGuide}
          className={`p-3 rounded-full border shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
            narratorPanelOpen 
              ? 'bg-accent-primary border-accent-primary text-white shadow-[0_0_15px_var(--accent-glow)]' 
              : 'bg-bg-secondary border-border-glass text-text-secondary hover:border-accent-primary'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Narrate Portfolio Sections"
        >
          <Volume2 size={18} className={narratorSpeaking ? "animate-bounce" : ""} />
        </motion.button>

        {/* Chiptune Music Button */}
        <motion.button
          onClick={toggleMusic}
          className={`p-3 rounded-full border shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${
            musicPlaying 
              ? 'bg-accent-primary border-accent-primary text-white shadow-[0_0_15px_var(--accent-glow)]' 
              : 'bg-bg-secondary border-border-glass text-text-secondary hover:border-accent-primary'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Toggle Synthesized Ambient Chiptunes"
        >
          {musicPlaying ? <Music size={18} className="animate-spin" /> : <Music size={18} />}
        </motion.button>

        {/* Speaker Narrator Options Panel */}
        <AnimatePresence>
          {narratorPanelOpen && (
            <motion.div
              className="absolute bottom-36 right-0 z-50 glass-panel bg-bg-secondary border border-border-glass rounded-2xl p-4 shadow-2xl w-64 text-left flex flex-col gap-2"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
            >
              <div className="flex justify-between items-center border-b border-border-glass pb-2 mb-1">
                <span className="text-xs font-title font-bold text-text-primary tracking-wide flex items-center gap-1.5 uppercase">
                  <Volume2 size={14} className="text-accent-primary" /> Audio Guide
                </span>
                <button
                  onClick={() => setNarratorPanelOpen(false)}
                  className="text-text-muted hover:text-text-primary p-0.5"
                >
                  <X size={12} />
                </button>
              </div>

              {/* List of sections to click and narrate */}
              <div className="flex flex-col gap-1.5 max-h-56 overflow-y-auto pr-1">
                {Object.keys(sectionNarrations).map((key) => (
                  <button
                    key={key}
                    onClick={() => {
                      scrollToSection(key);
                      speakText(key, sectionNarrations[key]);
                    }}
                    className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-xs text-left font-medium transition-all ${
                      narratorSpeaking && currentNarratingSection === key
                        ? 'bg-accent-glow text-accent-secondary border border-accent-secondary/30'
                        : 'hover:bg-accent-glow/50 text-text-secondary hover:text-text-primary border border-transparent'
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      narratorSpeaking && currentNarratingSection === key 
                        ? 'bg-accent-secondary animate-ping' 
                        : 'bg-text-muted/50'
                    }`}></span>
                    <span className="capitalize">{key}</span>
                  </button>
                ))}
              </div>

              {/* Narrator currently reading status / control */}
              {narratorSpeaking && (
                <div className="mt-2 pt-2 border-t border-border-glass flex justify-between items-center gap-2">
                  <span className="text-[9px] text-accent-secondary animate-pulse uppercase tracking-wider">Reading Section...</span>
                  <button
                    onClick={() => {
                      window.speechSynthesis.cancel();
                      setNarratorSpeaking(false);
                      setCurrentNarratingSection(null);
                    }}
                    className="text-[9px] font-mono bg-red-950/20 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white px-2 py-1 rounded transition-all"
                  >
                    Stop Speech
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Console command hint bar */}
        <motion.div 
          className="bg-bg-secondary/90 border border-border-glass text-[9px] text-text-muted px-2.5 py-1 rounded-md cursor-pointer hover:border-accent-secondary"
          onClick={() => setPaletteOpen(true)}
          whileHover={{ scale: 1.05 }}
        >
          Press <span className="font-mono text-accent-secondary">⌘K</span>
        </motion.div>
      </div>

      {/* 2. Command Palette Overlay (⌘K) */}
      <AnimatePresence>
        {paletteOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPaletteOpen(false)}
            />

            <motion.div 
              className="relative w-full max-w-lg glass-panel bg-bg-secondary border border-border-glass rounded-2xl overflow-hidden shadow-2xl z-10"
              initial={{ opacity: 0, y: -40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -40, scale: 0.95 }}
              transition={{ duration: 0.25 }}
            >
              {/* Search Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border-glass">
                <Search className="text-text-muted" size={20} />
                <input
                  type="text"
                  placeholder="Type a command or nav target..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-transparent border-none text-text-primary outline-none text-sm placeholder:text-text-muted"
                  autoFocus
                />
                <button 
                  onClick={() => setPaletteOpen(false)}
                  className="text-text-muted hover:text-text-primary p-1"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Items List */}
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredItems.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {filteredItems.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={item.action}
                        className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-accent-glow hover:text-text-primary text-text-secondary text-sm font-medium transition-all text-left group"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles size={14} className="text-text-muted group-hover:text-accent-secondary" />
                          {item.label}
                        </span>
                        <span className="text-[10px] font-mono bg-bg-secondary border border-border-glass px-2 py-0.5 rounded text-text-muted uppercase">
                          {item.category}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-sm text-text-muted">
                    No matching commands found.
                  </div>
                )}
              </div>

              {/* Info footer */}
              <div className="bg-bg-secondary/60 px-4 py-3 border-t border-border-glass text-[10px] text-text-muted flex justify-between items-center">
                <span>Navigate ↑↓ • Enter to select • Esc to exit</span>
                <span className="font-mono text-accent-secondary">FAIZAN_OS v3.0</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Retro CRT Terminal Overlay (t) */}
      <AnimatePresence>
        {terminalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTerminalOpen(false)}
            />

            <motion.div 
              className="relative w-full max-w-2xl bg-[#030704] border border-[#10b981]/50 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(16,185,129,0.2)] z-10 flex flex-col h-[480px]"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
            >
              {/* CRT Scanline Filter effect */}
              <div className="absolute inset-0 pointer-events-none z-30 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%]"></div>
              
              {/* Header Bar */}
              <div className="bg-[#0c120d] px-4 py-3 border-b border-[#10b981]/30 flex justify-between items-center z-10">
                <div className="flex items-center gap-2">
                  <TermIcon size={14} className="text-[#10b981]" />
                  <span className="font-mono text-xs text-[#10b981] font-semibold tracking-wider">ROOT_SYS@FAIZAN_OS:~</span>
                </div>
                <div className="flex gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]/20 border border-[#10b981] animate-pulse"></span>
                  <button 
                    onClick={() => setTerminalOpen(false)}
                    className="text-[#10b981]/70 hover:text-[#10b981] p-1 font-bold"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>

              {/* Logs Content Screen */}
              <div className="flex-1 overflow-y-auto p-6 font-mono text-sm text-[#10b981] flex flex-col gap-2 bg-[#030704] text-left z-10 select-text">
                {terminalLogs.map((log, idx) => (
                  <div key={idx} className="whitespace-pre-wrap leading-relaxed glow-text-green">{log}</div>
                ))}

                {/* Hacking Game Node UI */}
                {gameActive && (
                  <div className="my-3 p-4 border border-dashed border-[#10b981]/30 bg-[#070e09] rounded-xl flex flex-col gap-3">
                    <div className="flex justify-between text-xs border-b border-[#10b981]/20 pb-2">
                      <span>DATAFRAME_LINKS: ACTIVE</span>
                      <span className="text-yellow-400 font-bold">SCORE: {gameScore} C</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {gameNodes.map((node) => (
                        <div 
                          key={node.id} 
                          className={`p-2 border rounded text-xs flex justify-between items-center ${
                            node.secure 
                              ? 'border-emerald-700 bg-emerald-950/20 text-emerald-400' 
                              : 'border-[#10b981]/40 bg-black/40 text-[#10b981] hover:border-[#10b981] cursor-pointer'
                          }`}
                        >
                          <span>[{node.id}] PORT: {node.port}</span>
                          <span>{node.secure ? 'BREACHED' : 'SECURE'}</span>
                        </div>
                      ))}
                    </div>
                    <p className="text-[10px] text-[#10b981]/70">Enter Node Index Number (1-4) to breach node.</p>
                  </div>
                )}

                <div ref={terminalEndRef} />
              </div>

              {/* Command Input Bar */}
              <form 
                onSubmit={runTerminalCommand}
                className="bg-[#070e09] border-t border-[#10b981]/30 p-4 flex gap-2 items-center z-10"
              >
                <span className="font-mono text-sm text-[#10b981] font-bold">{gameActive ? '(hacking) $' : '$'}</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-[#10b981] placeholder:text-[#10b981]/35 glow-text-green uppercase"
                  placeholder="Enter command..."
                  autoFocus
                />
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. VOICE NAVIGATION STATUS OVERLAY */}
      <AnimatePresence>
        {voiceActive && (
          <motion.div 
            className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 glass-panel border border-accent-secondary/50 bg-bg-secondary p-4 rounded-2xl flex items-center gap-3 shadow-2xl max-w-sm w-full"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-accent-secondary animate-ping"></div>
            <div className="flex-1 text-left">
              <span className="text-xs text-text-secondary font-semibold block uppercase tracking-wider">Voice Navigation</span>
              <p className="text-[11px] text-text-muted mt-0.5">{voiceMessage || 'Listening for "Go to about", "Open terminal", etc...'}</p>
            </div>
            <Mic size={18} className="text-accent-secondary animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. ACHIEVEMENT TOAST POPUP (Bottom Right) */}
      <AnimatePresence>
        {activeToast && (
          <motion.div 
            className="fixed bottom-8 right-8 z-50 glass-panel border border-yellow-500/50 bg-[#120e03]/90 shadow-[0_0_20px_rgba(234,179,8,0.15)] rounded-2xl p-5 max-w-xs flex gap-4 overflow-hidden"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          >
            {/* Top highlight warning line */}
            <div className="absolute top-0 left-0 w-full h-[2.5px] bg-yellow-500"></div>

            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-yellow-500 flex items-center justify-center h-fit self-center">
              <Award size={22} className="animate-bounce" />
            </div>

            <div className="text-left flex-1">
              <span className="text-[9px] text-yellow-500 uppercase tracking-widest font-mono font-bold block mb-1">Achievement Unlocked</span>
              <h4 className="font-title font-bold text-sm text-text-primary">{activeToast.title}</h4>
              <p className="text-[11px] text-text-muted mt-1 font-light leading-relaxed">{activeToast.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
