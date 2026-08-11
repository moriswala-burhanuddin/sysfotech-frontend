import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const isMenuNavigation = sessionStorage.getItem('menuNavigation');
    
    if (isMenuNavigation === 'true') {
      // Smooth scroll to top with better UX
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      sessionStorage.removeItem('menuNavigation');
    }
  }, [pathname]);
}

export function setMenuNavigation() {
  sessionStorage.setItem('menuNavigation', 'true');
}

// Enhanced scroll behavior for better UX
export function scrollToSection(sectionId: string, offset = 80) {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      left: 0,
      behavior: 'smooth'
    });
  }
}

// Scroll to top with smooth animation
export function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}
