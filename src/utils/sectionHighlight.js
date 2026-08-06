export function highlightSection(sectionId, delay = 600) {
  if (!sectionId) return;

  setTimeout(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Remove class if it was previously added (to allow restart)
    section.classList.remove('section-highlight-active');

    // Force reflow to reset the CSS transition/animation
    void section.offsetWidth;

    // Add the animation class
    section.classList.add('section-highlight-active');

    // Clean up class after animation ends (1.6 seconds)
    setTimeout(() => {
      section.classList.remove('section-highlight-active');
    }, 1600);
  }, delay);
}
