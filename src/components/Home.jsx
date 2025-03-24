import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import styles from './Home.module.css';
import githubIcon from '../assets/github.svg';
import mailIcon from '../assets/Mail.svg';
import linkedinIcon from '../assets/linkedin.svg';
import profileImage from '../assets/profile.svg';

const Home = () => {
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
    <section className={`${styles.heroSection} ${isDarkMode ? styles.dark : styles.light}`}>
      <div className={styles.heroContent}>
        <div className={styles.greetingContainer}>
          <p className={styles.greeting}>Hello, I'm</p>
          <h1 className={styles.name}>Landon Nguyen</h1>
        </div>

        <div className={styles.titleWrapper}>
          <TypeAnimation
            sequence={[
              'Software Engineer',
              3000,
              'Full Stack Developer',
              3000,
              'Mobile Developer',
              3000,
              'Machine Learning Engineer',
              3000,
            ]}
            wrapper="span"
            speed={200}
            repeat={Infinity}
            className={styles.typingText}
          />
        </div>

        <div className={styles.socialLinks}>
          <a href="https://github.com/bamxo" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="GitHub" />
          </a>
          <a href="mailto:landontqnguyen@gmail.com">
            <img src={mailIcon} alt="Email" />
          </a>
          <a href="https://linkedin.com/in/landon-nguyen-678555238" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
        </div>
      </div>

      <div className={styles.profileImageContainer}>
        <div className={styles.profileImage}>
          <img src={profileImage} alt="Landon Nguyen" />
        </div>
      </div>
    </section>
  );
};

export default Home;
