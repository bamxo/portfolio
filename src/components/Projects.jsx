import { useState, useEffect } from 'react';
import styles from './Projects.module.css';
import projectsData from '../data/projects.json';
import githubIcon from '../assets/githublink.svg';
import { getAssetPath } from '../utils/assetPath';

function parseCount(data) {
  const count = data?.count ?? data?.user_count ?? data;
  const n = Number(count);
  return Number.isFinite(n) ? n : null;
}

const CountSpinner = () => (
  <span className={styles.countSpinner} aria-hidden="true" />
);

function UserCountLabel({ count }) {
  return (
    <span className={styles.userCountBadge}>
      {' • '}
      {count != null ? `${count} users` : <CountSpinner />}
    </span>
  );
}

const Projects = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'light' ? false : true
  );

  const [grepthinkUsers, setGrepthinkUsers] = useState(null);
  const [c2nUsers, setC2nUsers] = useState(null);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(localStorage.getItem('theme') === 'light' ? false : true);
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
    fetch('https://api.grepthink2.com/api/stats/usercount')
      .then(res => res.json())
      .then(data => setGrepthinkUsers(parseCount(data)))
      .catch(() => {});

    fetch('https://api.canvastonotion.io/api/usercount')
      .then(res => res.json())
      .then(data => setC2nUsers(parseCount(data)))
      .catch(() => {});
  }, []);

  const countsReady = grepthinkUsers != null && c2nUsers != null;

  return (
    <div className={`${styles.container} ${!isDarkMode ? styles.light : ''}`}>
      <div className={styles.content}>
        <h1 className={`${styles.header} ${!isDarkMode ? styles.light : ''}`}>Past Projects</h1>
        <p className={`${styles.headerDescription} ${!isDarkMode ? styles.light : ''}`}>Explore the projects I've worked on so far</p>
        <div className={`${styles.userCountPill} ${!isDarkMode ? styles.light : ''}`}>
          <span className={styles.pillDot} />
          {countsReady ? (
            `${grepthinkUsers + c2nUsers} people use what I've built`
          ) : (
            <>
              <CountSpinner />
              people use what I've built
            </>
          )}
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
                    <UserCountLabel count={index === 0 ? grepthinkUsers : c2nUsers} />
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
