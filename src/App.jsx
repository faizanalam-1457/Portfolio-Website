import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CustomCursor from "./components/CustomCursor";
import Background from "./components/Background";
import Chatbot from "./components/Chatbot";
import InteractiveSystem from "./components/InteractiveSystem";
import LoadingScreen from "./components/LoadingScreen";
import AnimatedSection, {
  SectionDivider,
} from "./components/AnimatedSection";

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111",
        color: "white",
        padding: "40px",
      }}
    >
      <h1>✅ React & Vercel are Working</h1>
      <p>If you can see this page, the deployment is successful.</p>

      {/* Uncomment ONE component at a time */}

      {/* <Background /> */}

      {/* <CustomCursor /> */}

      {/* <LoadingScreen onComplete={() => setLoading(false)} /> */}

      {/* <Chatbot theme={theme} toggleTheme={toggleTheme} /> */}

      {/* <InteractiveSystem /> */}

      {/* <Navbar theme={theme} toggleTheme={toggleTheme} /> */}

      {/* <Hero /> */}

      {/* <SectionDivider /> */}

      {/* <AnimatedSection animation="fadeUp">
        <About />
      </AnimatedSection> */}

      {/* <AnimatedSection animation="fadeUp">
        <Skills />
      </AnimatedSection> */}

      {/* <AnimatedSection animation="fadeUp">
        <Projects />
      </AnimatedSection> */}

      {/* <AnimatedSection animation="fadeUp">
        <Experience />
      </AnimatedSection> */}

      {/* <AnimatedSection animation="fadeUp">
        <Education />
      </AnimatedSection> */}

      {/* <AnimatedSection animation="fadeUp">
        <Certifications />
      </AnimatedSection> */}

      {/* <AnimatedSection animation="fadeUp">
        <Achievements />
      </AnimatedSection> */}

      {/* <AnimatedSection animation="fadeUp">
        <Contact />
      </AnimatedSection> */}

      {/* <Footer /> */}
    </div>
  );
}