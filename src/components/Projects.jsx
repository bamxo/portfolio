import { useState, useEffect, useRef } from 'react';
import styles from './Projects.module.css';
import projectsData from '../data/projects.json';
import userCountsSnapshot from '../data/userCounts.json';
import githubIcon from '../assets/githublink.svg';
import { getAssetPath } from '../utils/assetPath';

function getInitialCounts() {
  try {
    const cached = JSON.parse(localStorage.getItem('portfolio_user_counts') || 'null');
    if (cached && typeof cached.grepthink === 'number') return cached;
  } catch {}
  return { grepthink: userCountsSnapshot.grepthink, c2n: userCountsSnapshot.c2n };
}

const Projects = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'light' ? false : true
  );

  const initial = getInitialCounts();
  const [grepthinkUsers, setGrepthinkUsers] = useState(initial.grepthink);
  const [c2nUsers, setC2nUsers] = useState(initial.c2n);
  const countsRef = useRef(initial);

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
      .then(data => {
        const count = data.count ?? data;
        setGrepthinkUsers(count);
        countsRef.current.grepthink = count;
        localStorage.setItem('portfolio_user_counts', JSON.stringify(countsRef.current));
      })
      .catch(() => {});

    fetch('https://api.canvastonotion.io/api/usercount')
      .then(res => res.json())
      .then(data => {
        const count = data.count ?? data;
        setC2nUsers(count);
        countsRef.current.c2n = count;
        localStorage.setItem('portfolio_user_counts', JSON.stringify(countsRef.current));
      })
      .catch(() => {});
  }, []);

  return (
    <div className={`${styles.container} ${!isDarkMode ? styles.light : ''}`}>
      <div className={styles.content}>
        <h1 className={`${styles.header} ${!isDarkMode ? styles.light : ''}`}>Past Projects</h1>
        <p className={`${styles.headerDescription} ${!isDarkMode ? styles.light : ''}`}>Explore the projects I've worked on so far</p>
        <div className={`${styles.userCountPill} ${!isDarkMode ? styles.light : ''}`}>
          <span className={styles.pillDot} />
          {grepthinkUsers + c2nUsers} people use what I've built
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
