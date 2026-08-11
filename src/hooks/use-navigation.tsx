import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export type NavigationType = 'menu' | 'action' | 'section' | 'external';

interface NavigationOptions {
  type: NavigationType;
  smooth?: boolean;
  sectionId?: string;
  offset?: number;
}

export function useNavigation() {
  const navigate = useNavigate();

  const navigateTo = useCallback((
    path: string, 
    options: NavigationOptions = { type: 'action', smooth: true }
  ) => {
    const { type, smooth = true, sectionId, offset = 80 } = options;

    if (type === 'menu') {
      // Menu navigation - scroll to top
      sessionStorage.setItem('menuNavigation', 'true');
      navigate(path);
    } else if (type === 'section' && sectionId) {
      // Section navigation - scroll to specific section
      navigate(path);
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const elementPosition = element.offsetTop - offset;
          window.scrollTo({
            top: elementPosition,
            left: 0,
            behavior: smooth ? 'smooth' : 'auto'
          });
        }
      }, 100); // Small delay to ensure page is loaded
    } else {
      // Action navigation - normal navigation
      navigate(path);
    }
  }, [navigate]);

  const scrollToSection = useCallback((sectionId: string, offset = 80) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        left: 0,
        behavior: 'smooth'
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  return {
    navigateTo,
    scrollToSection,
    scrollToTop
  };
}
