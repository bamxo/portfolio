import { useState, useEffect, useRef } from 'react';
import styles from './Experience.module.css';
import experienceData from '../data/experience.json';
import linkIcon from '../assets/link.svg';
import { getAssetPath } from '../utils/assetPath';

const Experience = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'light' ? false : true
  );
  const [isLogoFading, setIsLogoFading] = useState(false);
  const [endDotOffset, setEndDotOffset] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const lastCardRef = useRef(null);
  const timelineCircleRefs = useRef([]);
  const [lineHeights, setLineHeights] = useState([]);
  const resizeTimeoutRef = useRef(null);
  const logoRefs = useRef([]);
  const cardRefs = useRef([]);
  const endDotRef = useRef(null);

  const updateLineHeights = () => {
    // Ensure DOM has updated before calculations
    requestAnimationFrame(() => {
      const newLineHeights = timelineCircleRefs.current.map((circle, index) => {
        if (!circle) return 0;

        const isLastCircle = index === timelineCircleRefs.current.length - 1;
        
        if (isLastCircle && lastCardRef.current) {
          const cardRect = lastCardRef.current.getBoundingClientRect();
          return cardRect.height + 100;
        } else {
          const nextCircle = timelineCircleRefs.current[index + 1];
          if (nextCircle) {
            const currentRect = circle.getBoundingClientRect();
            const nextRect = nextCircle.getBoundingClientRect();
            return Math.max(nextRect.top - currentRect.top, 0);
          }
        }
        return 0;
      });

      // Only update if we have valid heights
      if (newLineHeights.some(height => height > 0)) {
        setLineHeights(newLineHeights);
      }
    });
  };

  const debouncedUpdateLineHeights = () => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      updateLineHeights();
    }, 100);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Initial update
    const initialUpdate = () => {
      // Wait for initial render to complete
      requestAnimationFrame(() => {
        setTimeout(updateLineHeights, 100);
      });
    };
    initialUpdate();

    // Handle resize with debounce
    window.addEventListener('resize', debouncedUpdateLineHeights);
    
    return () => {
      window.removeEventListener('resize', debouncedUpdateLineHeights);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const updateEndDotPosition = () => {
      if (lastCardRef.current) {
        const cardHeight = lastCardRef.current.offsetHeight;
        setEndDotOffset(cardHeight + 100);
        requestAnimationFrame(() => {
          setTimeout(updateLineHeights, 50);
        });
      }
    };

    updateEndDotPosition();
    window.addEventListener('resize', updateEndDotPosition);

    return () => {
      window.removeEventListener('resize', updateEndDotPosition);
    };
  }, []);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsLogoFading(true);
      setTimeout(() => {
        setIsDarkMode(localStorage.getItem('theme') === 'light' ? false : true);
        setTimeout(() => {
          setIsLogoFading(false);
          requestAnimationFrame(() => {
            setTimeout(updateLineHeights, 50);
          });
        }, 50);
      }, 300);
    };

    handleThemeChange();
    window.addEventListener('storage', handleThemeChange);
    window.addEventListener('themeChange', handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.visible);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Observe all elements
    logoRefs.current.forEach(ref => ref && observer.observe(ref));
    cardRefs.current.forEach(ref => ref && observer.observe(ref));
    timelineCircleRefs.current.forEach(ref => ref && observer.observe(ref));
    if (endDotRef.current) {
      observer.observe(endDotRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Reset refs arrays when experiences change
  logoRefs.current = new Array(experienceData.experiences.length).fill(null);
  cardRefs.current = new Array(experienceData.experiences.length).fill(null);
  timelineCircleRefs.current = new Array(experienceData.experiences.length).fill(null);

  return (
    <div className={styles.experienceContainer}>
      <div className={styles.headerContainer}>
        <h2 className={styles.header}>Experience</h2>
        <div className={styles.headerLine}></div>
      </div>
      {experienceData.experiences.map((experience, index) => {
        const isLastCard = index === experienceData.experiences.length - 1;
        const isFirstCard = index === 0;
        return (
          <div key={index} className={styles.experienceCard}>
            {windowWidth > 480 && (
              <img 
                ref={el => logoRefs.current[index] = el}
                src={isDarkMode ? getAssetPath(experience.logo.dark) : getAssetPath(experience.logo.light)}
                alt={`${experience.company} logo`} 
                className={`${styles.logo} ${isLogoFading ? styles.fade : ''}`}
              />
            )}
            <div className={styles.timelineContainer} style={isLastCard ? { height: `${endDotOffset}px` } : undefined}>
              <div 
                className={`${styles.timelineCircle} ${isFirstCard ? styles.visible : ''}`}
                ref={el => timelineCircleRefs.current[index] = el}
                style={{ '--line-height': `${lineHeights[index] || 380}px` }}
              />
              {isLastCard && (
                <div 
                  ref={endDotRef}
                  className={styles.timelineEndDot} 
                />
              )}
            </div>
            <div 
              ref={el => {
                cardRefs.current[index] = el;
                if (isLastCard) lastCardRef.current = el;
              }}
              className={`${styles.cardContent} ${isFirstCard ? styles.visible : ''} ${windowWidth <= 480 ? styles.mobile : ''}`}
            >
              {windowWidth <= 480 && (
                <img 
                  ref={el => logoRefs.current[index] = el}
                  src={isDarkMode ? getAssetPath(experience.logo.dark) : getAssetPath(experience.logo.light)}
                  alt={`${experience.company} logo`} 
                  className={`${styles.logo} ${styles.mobile} ${isLogoFading ? styles.fade : ''}`}
                />
              )}
              <h3 className={styles.company}>{experience.company}</h3>
              <p className={styles.position}>{experience.position}</p>
              <p className={styles.duration}>{experience.duration}</p>
              <ul className={styles.description}>
                {experience.description.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <a 
                href={`https://${experience.link}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <img 
                  src={linkIcon} 
                  alt="External link" 
                  className={styles.link}
                />
              </a>
            </div>
          </div>
        );
      })}
      <div className={styles.spacer}></div>
    </div>
  );
};

export default Experience;
