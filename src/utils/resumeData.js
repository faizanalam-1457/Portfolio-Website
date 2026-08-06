export const resumeData = {
  personalInfo: {
    name: 'Faizan Alam',
    titles: ['AIML Engineer', 'MERN Stack Developer', 'Data Analyst'],
    email: 'faizanalam1457@gmail.com',
    phone: '91+XXXXXXXXXX',
    location: 'Kanpur, Uttar Pradesh, India',
    linkedin: 'https://linkedin.com/in/faizan-alam-858a5630a',
    github: 'https://github.com/faizanalam-1457',
    leetcode: 'https://leetcode.com/u/faizanalam1457',
  },
  summary: `B.Tech CSE (AI & ML) student with Honours in Cyber Security, focused on Machine Learning, Deep Learning, Computer Vision, Generative AI, and full-stack web development. Experienced in building GenAI/RAG applications using LangChain and LLMs (Groq), as well as real-time computer-vision systems with OpenCV and MediaPipe (facial-landmark detection, statistical thresholding). Skilled in Python, SQL, Power BI (DAX, Power Query, modeling), React.js, Node.js, Express.js, and MongoDB for building full-stack secure applications. Solved 130+ algorithmic problems on LeetCode.`,
  
  skills: {
    generativeAI: ['LangChain', 'Retrieval-Augmented Generation (RAG)', 'Groq LLM', 'Jina Embeddings', 'Prompt Engineering', 'LLM Agents'],
    machineLearning: ['Scikit-learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Predictive Modeling', 'Statistical Analysis'],
    computerVision: ['OpenCV', 'MediaPipe', 'OCR', 'Natural Language Processing (NLP)'],
    programming: ['Python', 'Java', 'C', 'JavaScript', 'SQL'],
    webDev: ['React.js', 'Node.js', 'Express.js', 'REST APIs', 'CRUD Operations', 'JWT Authentication', 'HTML5', 'CSS3', 'Responsive Web Design'],
    databases: ['MongoDB', 'SQL'],
    dataAnalytics: ['Power BI (DAX, Power Query, Data Modeling)', 'Data Cleaning', 'Data Visualization', 'Business Intelligence', 'KPI Reporting'],
    tools: ['Git', 'GitHub', 'VS Code', 'Jupyter Notebook', 'Streamlit', 'Linux CLI', 'Figma'],
    csFundamentals: ['Data Structures & Algorithms (DSA)', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks', 'Network Security', 'Threat Analysis', 'Vulnerability Assessment'],
  },

  experience: [
    {
      role: 'Web Developer & Designer Intern',
      company: 'Oasis Infobyte (OIBSIP)',
      location: 'Remote',
      duration: 'Nov 2024 – Jan 2025',
      bullets: [
        'Built and deployed multiple responsive websites using HTML5, CSS3, and JavaScript, ensuring cross-browser compatibility and mobile-first design.',
        'Designed UI/UX wireframes in Figma; identified and resolved bugs and delivered new features on schedule as part of a remote internship cohort, strengthening collaborative development skills.'
      ]
    }
  ],

  education: [
    {
      degree: 'B.Tech in Computer Science and Engineering (AI and ML)',
      institution: 'Allenhouse Institute of Technology, AKTU, Kanpur',
      duration: '2023 – 2027',
      details: [
        'Honours Specialization: Cyber Security',
        'SGPA — Year 1: 8.66, Year 2: 7.77, Semester 5: 8.22'
      ],
      coursework: ['Machine Learning', 'Data Structures and Algorithms', 'DBMS', 'Operating Systems', 'Computer Networks']
    },
    {
      degree: 'Class XII (PCM)',
      institution: 'Super International School, Kanpur',
      duration: '2022',
      details: ['Score: 76%']
    }
  ],

  certificationsAndActivities: [
    'IBM AI Fundamentals Certificate (IBM SkillsBuild, 2024) — AI, ML, neural networks, NLP, enterprise AI deployment.',
    'GenAI Powered Data Analytics Job Simulation — Tata Group.',
    'Self-taught Power BI (Power Query, DAX, data modeling).',
    'Solved 130+ LeetCode DSA problems (Arrays, Trees, Graphs, DP, Greedy); completed the 50-Day DSA Challenge.',
    'Team Coordinator during college hackathons, leading teams of 4–6.'
  ],

  // Matches for client side chatbot
  chatbotQA: [
    {
      keywords: ['hello', 'hi', 'hey', 'greetings', 'who are you', 'assistant'],
      response: `Hi there! I'm Faizan's AI Portfolio Assistant. I can tell you about his projects, skills, internship experience, education, or how to contact him. What would you like to know?`
    },
    {
      keywords: ['project', 'work', 'portfolio', 'develop', 'build'],
      response: `Faizan has worked on several advanced projects across AI/ML and Web Development. Key ones include:\n1. **HR Policy RAG Assistant**: A LangChain-powered chatbot grounding replies in policy documents.\n2. **Expense Tracker**: A full-stack MERN web app with JWT authentication.\n3. **Sales Performance Dashboard**: A Power BI dashboard for business KPI tracking.\n4. **AI Expense Categorizer & Forecaster**: A Python ML model with OCR processing.\n5. **Driver Drowsiness Detector**: A real-time computer vision tracker using MediaPipe.\nAsk me about any specific project for details!`
    },
    {
      keywords: ['rag', 'hr policy', 'chatbot', 'langchain', 'groq'],
      response: `The **HR Policy RAG Assistant** (2026) is a Python application built with LangChain, Groq LLM, and Streamlit. It answers employee policy questions by chunking documents, generating dense vector embeddings, and storing them in a persistent vector store. This prevents LLM hallucinations and keeps responses 100% grounded in company policy.`
    },
    {
      keywords: ['expense tracker', 'mern', 'react', 'node', 'express', 'mongodb'],
      response: `The **MERN Expense Tracker** (2026) is a full-stack web app built using React, Node.js, Express, and MongoDB. It features signup/login authentication with secure JWT tokens, RESTful transaction APIs, and a responsive frontend displaying real-time financial summaries and categorized charts.`
    },
    {
      keywords: ['drowsiness', 'driver', 'opencv', 'mediapipe', 'vision', 'face'],
      response: `The **Driver Drowsiness Detector** (2025) is a real-time computer vision system built with Python, OpenCV, and MediaPipe. It tracks eye landmarks frame-by-frame, computes the Eye Aspect Ratio (EAR), and applies statistical thresholds to sound alerts if eye closure duration indicates fatigue.`
    },
    {
      keywords: ['power bi', 'sales', 'dashboard', 'dax', 'query', 'analytics'],
      response: `Faizan built a **Sales Performance Dashboard** (2026) using Power BI, Power Query, and DAX. It ingests complex sales records, models table relations, and implements DAX measures for real-time KPI tracking. It features drill-through pages, slicers, and interactive line/bar/pie charts.`
    },
    {
      keywords: ['ocr', 'forecasting', 'spend', 'anomalies'],
      response: `The **AI Expense Categorization & Forecasting Engine** (2026) uses Python, Scikit-learn, OCR, and Pandas. It processes transaction rows, structures text from receipt images, trains a classification model for automatic spending categorizations, and projects future spends while flagging anomalies.`
    },
    {
      keywords: ['skills', 'technical', 'technologies', 'programming', 'languages'],
      response: `Faizan's technical skillset is categorized as:\n- **AI & ML**: Scikit-learn, Pandas, NumPy, OpenCV, MediaPipe, NLP, OCR\n- **Generative AI**: LangChain, RAG, Groq LLM, LLM Agents, Jina Embeddings\n- **Web Dev (MERN)**: React.js, Node.js, Express.js, MongoDB, SQL, JWT, REST APIs\n- **Data Analytics**: Power BI, Power Query, DAX, Statistical Modeling\n- **Languages**: Python, Java, C, JavaScript, SQL\n- **Tools**: Git, GitHub, VS Code, Linux CLI, Figma, Streamlit`
    },
    {
      keywords: ['internship', 'experience', 'oasis', 'oibsip', 'web developer'],
      response: `Faizan worked as a **Web Developer & Designer Intern** at Oasis Infobyte (OIBSIP) from Nov 2024 to Jan 2025. He built and deployed responsive websites, designed wireframes in Figma, debugged layout issues, and collaborated in a remote agile cohort.`
    },
    {
      keywords: ['education', 'college', 'btech', 'allenhouse', 'aktu', 'school', 'marks', 'cgpa', 'sgpa'],
      response: `Faizan is pursuing a **B.Tech in Computer Science and Engineering (AI and ML)** with Honours in **Cyber Security** (2023 – 2027) at Allenhouse Institute of Technology, Kanpur. He achieved a SGPA of 8.66 (Year 1), 7.77 (Year 2), and 8.22 (Sem 5). He completed Class XII (PCM) in 2022 at Super International School, Kanpur, scoring 76%.`
    },
    {
      keywords: ['leetcode', 'dsa', 'hackathon', 'coordinator', 'problem', 'challenges'],
      response: `Faizan solved **130+ algorithmic problems** on LeetCode across Arrays, Trees, Graphs, DP, and Greedy strategies, completing the 50-Day DSA challenge. He also served as a **Team Coordinator** leading teams of 4–6 developers during college hackathons.`
    },
    {
      keywords: ['contact', 'email', 'phone', 'call', 'location', 'linkedin', 'github', 'reach', 'hire'],
      response: `You can reach Faizan through the following:\n- **Email**: faizanalam1457@gmail.com\n- **Phone**: 91+XXXXXXXXXX\n- **Location**: Kanpur, India\n- **LinkedIn**: linkedin.com/in/faizan-alam-858a5630a\n- **GitHub**: github.com/faizanalam-1457\nFeel free to write him a message directly in the contact form!`
    }
  ]
};

// Generate Markdown text for Resume download
export function generateMarkdownResume() {
  return `# FAIZAN ALAM
Data Analyst | MERN Stack Developer | AIML Engineer
Kanpur, India | 91+XXXXXXXXXX | faizanalam1457@gmail.com
LinkedIn: linkedin.com/in/faizan-alam-858a5630a
GitHub: github.com/faizanalam-1457 | LeetCode: leetcode.com/u/faizanalam1457

---

## PROFESSIONAL SUMMARY
B.Tech CSE (AI & ML) student with Honours in Cyber Security, focused on Machine Learning, Deep Learning, Computer Vision, and Generative AI. Experienced in building GenAI/RAG applications using LangChain, and LLMs (Groq), as well as real-time computer-vision systems with OpenCV and MediaPipe. Skilled in Python, Scikit-learn, Pandas, and NumPy for model building and data processing, with a strong CS foundation in DSA, DBMS, and Operating Systems. Solved 130+ algorithmic problems on LeetCode. Seeking to apply AI/ML engineering and MERN web development skills.

---

## TECHNICAL SKILLS
- **Machine Learning & Deep Learning**: Scikit-learn, Pandas, NumPy, Matplotlib, Seaborn, Predictive Modeling, Statistical Analysis
- **Generative AI & RAG**: LangChain, Retrieval-Augmented Generation (RAG), Groq LLM, Jina Embeddings, Prompt Engineering, LLM Agents
- **Computer Vision & NLP**: OpenCV, MediaPipe, OCR, Natural Language Processing (NLP)
- **Programming Languages**: Python, Java, C, JavaScript, SQL
- **Web Development & MERN**: React.js, Node.js, Express.js, REST APIs, CRUD Operations, JWT Authentication, HTML5, CSS3, Responsive Design
- **Databases**: MongoDB, SQL
- **Tools & Platforms**: Git, GitHub, VS Code, Jupyter Notebook, Streamlit, Linux CLI, Figma, Power BI (DAX, Power Query)
- **CS Fundamentals & Security**: Data Structures & Algorithms, OOP, DBMS, Operating Systems, Computer Networks, Network Security, Threat Analysis, Vulnerability Assessment

---

## WORK EXPERIENCE
### Web Developer & Designer Intern
**Oasis Infobyte (OIBSIP) | Remote** | *Nov 2024 – Jan 2025*
- Built and deployed multiple responsive websites using HTML5, CSS3, and JavaScript, ensuring cross-browser compatibility and mobile-first design.
- Designed UI/UX wireframes in Figma; identified and resolved bugs and delivered new features on schedule as part of a remote internship cohort.

---

## CORE PROJECTS
### 1. HR Policy RAG Assistant (2026)
*Python, LangChain, Groq LLM, Streamlit*
- Built an AI-powered HR policy chatbot using RAG, grounding responses in company documents to reduce hallucinations.
- Engineered document loading, chunking, dense vector embeddings, and persistent vector stores.

### 2. Expense Tracker Web App (MERN Stack) (2026)
*React.js, Node.js, Express.js, MongoDB, JWT Auth*
- Created a transaction tracking manager with signup/login auth routes and RESTful CRUD transaction endpoints.
- Designed a dashboard rendering income, expenses, balance summaries, and data categories.

### 3. Sales Performance Dashboard (Power BI) (2026)
*Power BI, Power Query, DAX, Data Modeling*
- Designed interactive analytical visuals (KPI cards, bar/line/pie charts, slicers, drill-throughs) for sales trends.
- Cleaned and transformed datasets with Power Query and established DAX measures.

### 4. AI Expense Categorization & Forecasting Engine (2026)
*Python, Machine Learning, OCR, Pandas, Matplotlib*
- Trained an expense categorization classifier and OCR recipe details extraction pipelines.
- Forecasted spending habits using statistical trends and flagged anomalous costs.

---

## EDUCATION
### B.Tech in Computer Science and Engineering (AI and ML)
**Allenhouse Institute of Technology, AKTU, Kanpur** | *2023 – 2027*
- Honours Specialization: Cyber Security
- SGPA — Year 1: 8.66, Year 2: 7.77, Semester 5: 8.22
- Relevant Coursework: Machine Learning, Data Structures and Algorithms, DBMS, Operating Systems, Computer Networks

### Class XII (PCM)
**Super International School, Kanpur** | *2022*
- Score: 76%

---

## CERTIFICATIONS, ACHIEVEMENTS & ACTIVITIES
- IBM AI Fundamentals Certificate (IBM SkillsBuild, 2024)
- GenAI Powered Data Analytics Job Simulation — Tata Group
- Self-taught Power BI (Power Query, DAX, data modeling)
- Solved 130+ LeetCode DSA problems; completed the 50-Day DSA Challenge
- Team Coordinator during college hackathons, leading teams of 4–6
`;
}
