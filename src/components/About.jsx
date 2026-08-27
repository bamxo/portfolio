import { useState, useEffect } from 'react';
import styles from './About.module.css';
import Scene from './Scene';
import Foundation from './Foundation';

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'light' ? false : true
  );

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem('theme') === 'light' ? false : true);
    };

    // Initial check
    handleThemeChange();

    // Listen for storage changes
    window.addEventListener('storage', handleThemeChange);
    
    // Listen for custom theme change event
    window.addEventListener('themeChange', handleThemeChange);

    return () => {
      window.removeEventListener('storage', handleThemeChange);
      window.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  return (
    <div className={styles.pageContainer}>
      <div className={`${styles.container} ${isDarkMode ? styles.dark : styles.light}`}>
        <div className={styles.headerContainer}>
          <h1 className={styles.headerText}>About Me</h1>
          <hr className={styles.horizontalLine} />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.modelContainer}>
            <Scene />
          </div>
          <div className={styles.textContainer}>
            <p className={styles.paragraph}>
              Hi everyone! My name is Landon, and I'm a Computer Science graduate from UC Santa Cruz. I like finding a real, specific problem and building something that actually fixes it, which is the motivation behind all of my products. 
            </p>
            <p className={styles.paragraph}>
            Beyond building things, I practice Taekwondo and serve as Assistant Coach for Peak Performance CA. I love competing and the camaraderie that comes with the sport, in tournaments and in training. Outside of that, you'll find me snowboarding, eating, or experimenting with new recipes in the kitchen.
            </p>
            <p className={styles.paragraph}>
            Right now I'm building Brim, a Shopify app that automates inventory reordering for small merchants, and before that I built GrepThink 2.0 and Canvas to Notion. I'm also open to Software Engineering or Product Management roles, so if you're interested in working together, feel free to reach out!
            </p>
          </div>
        </div>
      </div>
      <Foundation />
    </div>
  );
};

export default About;
