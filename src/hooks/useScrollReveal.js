import { useEffect } from 'react';

export function useScrollReveal() {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Once revealed, we can optionally unobserve
            // observer.unobserve(entry.target);
          } else {
            // Keep it dynamic: remove if it goes out of view, or keep it revealed
            // Let's keep it revealed for standard behavior, or remove it for repeatable scroll effects.
            // Removing it makes it scroll-triggered every time:
            // entry.target.classList.remove('active');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before the element fully enters
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => {
      revealElements.forEach((element) => observer.unobserve(element));
    };
  }, []);
}
