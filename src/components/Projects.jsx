import { useState, useEffect } from 'react';
import styles from './Projects.module.css';
import projectsData from '../data/projects.json';
import githubIcon from '../assets/githublink.svg';
import { getAssetPath } from '../utils/assetPath';

const Projects = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'light' ? false : true
  );
  const [grepthinkUsers, setGrepthinkUsers] = useState('x');
  const [c2nUsers, setC2nUsers] = useState('x');

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

  useEffect(() => {
    fetch('https://api.grepthink2.com/api/stats/usercount')
      .then(res => res.json())
      .then(data => setGrepthinkUsers(data.count ?? data))
      .catch(() => {});
    fetch('https://api.canvastonotion.io/api/usercount')
      .then(res => res.json())
      .then(data => setC2nUsers(data.count ?? data))
      .catch(() => {});
  }, []);

  return (
    <div className={`${styles.container} ${!isDarkMode ? styles.light : ''}`}>
      <div className={styles.content}>
        <h1 className={`${styles.header} ${!isDarkMode ? styles.light : ''}`}>Past Projects</h1>
        <p className={`${styles.headerDescription} ${!isDarkMode ? styles.light : ''}`}>Explore the projects I've worked on so far</p>
        <div className={`${styles.userCountPill} ${!isDarkMode ? styles.light : ''}`}>
          <span className={styles.pillDot} />
          x people use what I've built
        </div>
        <div className={styles.projectsGrid}>
          {projectsData.projects.map((project, index) => (
            <div key={index} className={`${styles.projectCard} ${!isDarkMode ? styles.light : ''}`}>
              <img 
                src={getAssetPath(project.thumbnail)} 
                alt={project.name}
                className={styles.thumbnail}
              />
              <h2 className={styles.projectName}>{project.name}</h2>
              <p className={`${styles.projectDescription} ${!isDarkMode ? styles.light : ''}`}>{project.description}</p>
              <div className={styles.bottomContainer}>
                <p className={`${styles.techStack} ${!isDarkMode ? styles.light : ''}`}>
                  {project.tech}
                  {(index === 0 || index === 1) && (
                    <span className={styles.userCountBadge}> • {index === 0 ? grepthinkUsers : c2nUsers} users</span>
                  )}
                </p>
                <div className={styles.githubLinkContainer}>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.githubLink}
                  >
                    <img 
                      src={githubIcon} 
                      alt="GitHub Link"
                      className={styles.githubIcon}
                    />
                  </a>
                  <span className={styles.tooltip}>
                    {index === 0 || 1 ? "View Landing Page" : "View GitHub Repository"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
