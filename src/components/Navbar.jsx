import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import bamLogo from '../assets/bam.svg';
import darkToggleBG from '../assets/darkToggleBG.svg';
import lightToggleBG from '../assets/lightToggleBG.svg';
import moonIcon from '../assets/moon.svg';
import sunIcon from '../assets/sun.svg';

const Navbar = () => {
  const [selectedTab, setSelectedTab] = useState('Home');
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'light' ? false : true
  );
  const tabs = ['Home', 'About', 'Experience', 'Projects'];

  useEffect(() => {
    // Apply CSS variable for smooth background transition
    document.documentElement.style.setProperty(
      '--page-bg-color',
      isDarkMode ? '#121212' : '#FAF9F6'
    );

    // Set navbar text color dynamically
    document.documentElement.style.setProperty(
      '--nav-text-color',
      isDarkMode ? '#FFFFFF' : '#323466'
    );
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <nav className={styles.navbar}>
      {/* Navigation Tabs */}
      <img src={bamLogo} alt="Bam Logo" className={styles.logo} />

      {/* Navigation Tabs */}
      <div className={styles.navTabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.navItem} ${
              selectedTab === tab ? styles.selected : ''
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dark/Light Mode Toggle */}
      <div className={styles.toggleContainer} onClick={() => setIsDarkMode(!isDarkMode)}>
        {/* Background Images (Crossfading Effect) */}
        <img
          src={isDarkMode ? darkToggleBG: lightToggleBG}
          alt="Toggle Background"
          className={styles.toggleBackground}
        />

        {/* Icon Images (Crossfading Effect) */}
        <img
          src={isDarkMode ? moonIcon : sunIcon}
          alt="Toggle Icon"
          className={`${styles.toggleIcon} ${isDarkMode ? styles.moon : styles.sun}`}
        />
      </div>
    </nav>
  );
};

export default Navbar;
