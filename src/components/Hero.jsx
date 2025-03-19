import { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import styles from './Hero.module.css';
import githubIcon from '../assets/github.svg';
import mailIcon from '../assets/Mail.svg';
import linkedinIcon from '../assets/linkedin.svg';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.contentContainer}>
        <div className={styles.textContent}>
          <h2 className={styles.greeting}>Hello, I'm</h2>
          <h1 className={`${styles.name} ${isLoaded ? styles.animate : ''}`}>
            Landon Nguyen
          </h1>
          <div className={`${styles.roleContainer} ${isLoaded ? styles.animate : ''}`}>
            <TypeAnimation
              sequence={[
                'Software Engineer',
                2000,
                'Full Stack Developer',
                2000,
                'Mobile Developer',
                2000,
                'Machine Learning Engineer',
                2000,
              ]}
              wrapper="h3"
              speed={50}
              repeat={Infinity}
              className={styles.typingText}
            />
          </div>
          
          <div className={`${styles.socialLinks} ${isLoaded ? styles.animate : ''}`}>
            <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
              <img src={githubIcon} alt="GitHub" />
            </a>
            <a href="mailto:your.email@example.com">
              <img src={mailIcon} alt="Email" />
            </a>
            <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </div>
        </div>
      </div>
      
      <div className={`${styles.profileContainer} ${isLoaded ? styles.animate : ''}`}>
        <div className={styles.profileImage}>
          {/* Replace with your actual image */}
          <img src="your-profile-picture.jpg" alt="Landon Nguyen" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
