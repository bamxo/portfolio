import React, { useState, useEffect } from 'react';
import styles from './Foundation.module.css';
import techStackData from '../data/techStack.json';
import toolsData from '../data/tools.json';
import { getAssetPath } from '../utils/assetPath';

const Foundation = () => {
    const [selectedButton, setSelectedButton] = useState('Tech Stack');
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'light' ? false : true
    );
    const [visibleContent, setVisibleContent] = useState('Tech Stack');
    const [isTransitioning, setIsTransitioning] = useState(false);

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
        if (selectedButton !== visibleContent) {
            setIsTransitioning(true);
            const timer = setTimeout(() => {
                setVisibleContent(selectedButton);
                setIsTransitioning(false);
            }, 300); // Match this with CSS transition duration
            return () => clearTimeout(timer);
        }
    }, [selectedButton]);

    const buttons = ['Tech Stack', 'Tools', 'Coursework'];

    const renderContent = (contentType) => {
        switch (contentType) {
            case 'Tech Stack':
                return (
                    <div className={styles.techStackGrid}>
                        {techStackData.techStack.map((tech, index) => (
                            <div key={index} className={`${styles.techCard} ${!isDarkMode ? styles.light : ''}`}>
                                <img 
                                    src={getAssetPath(tech.icon)} 
                                    alt={`${tech.name} icon`} 
                                    className={styles.techIcon}
                                />
                                <div className={styles.techInfo}>
                                    <span className={styles.techName}>{tech.name}</span>
                                    <span className={styles.proficiencyText}>{tech.proficiency}</span>
                                    <div className={styles.progressBarContainer}>
                                        <div 
                                            className={`${styles.progressBar} ${styles[tech.proficiency.toLowerCase()]}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'Tools':
                return (
                    <div className={styles.techStackGrid}>
                        {toolsData.tools.map((tool, index) => (
                            <div key={index} className={`${styles.techCard} ${!isDarkMode ? styles.light : ''}`}>
                                <img 
                                    src={getAssetPath(tool.icon)} 
                                    alt={`${tool.name} icon`} 
                                    className={styles.techIcon}
                                />
                                <div className={styles.techInfo}>
                                    <span className={styles.techName}>{tool.name}</span>
                                    <span className={styles.proficiencyText}>{tool.proficiency}</span>
                                    <div className={styles.progressBarContainer}>
                                        <div 
                                            className={`${styles.progressBar} ${styles[tool.proficiency.toLowerCase()]}`}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'Coursework':
                return (
                    <div className={`${styles.courseContainer} ${!isDarkMode ? styles.light : ''}`}>
                        <ul className={styles.courseList}>
                            <li className={styles.courseItem}>
                                <span className={styles.courseCode}>CSE 186</span>
                                <span className={styles.courseTitle}> - Full Stack Web Development I</span>
                            </li>
                            <li className={styles.courseItem}>
                                <span className={styles.courseCode}>CSE 144</span>
                                <span className={styles.courseTitle}> - Applied Machine Learning</span>
                            </li>
                            <li className={styles.courseItem}>
                                <span className={styles.courseCode}>CSE 118</span>
                                <span className={styles.courseTitle}> - Mobile Applications</span>
                            </li>
                            <li className={styles.courseItem}>
                                <span className={styles.courseCode}>CSE 115A</span>
                                <span className={styles.courseTitle}> - Intro to Software Engineering</span>
                            </li>
                            <li className={styles.courseItem}>
                                <span className={styles.courseCode}>CSE 160</span>
                                <span className={styles.courseTitle}> - Computer Graphics</span>
                            </li>
                            <li className={styles.courseItem}>
                                <span className={styles.courseCode}>CSE 180</span>
                                <span className={styles.courseTitle}> - Database Systems I</span>
                            </li>
                            <li className={styles.courseItem}>
                                <span className={styles.courseCode}>CSE 150</span>
                                <span className={styles.courseTitle}> - Computer Networks</span>
                            </li>
                            <li className={styles.courseItem}>
                                <span className={styles.courseCode}>CSE 130</span>
                                <span className={styles.courseTitle}> - Principles of Computer Systems Design</span>
                            </li>
                            <li className={styles.courseItem}>
                                <span className={styles.courseCode}>CSE 101</span>
                                <span className={styles.courseTitle}> - Data Structures and Algorithms</span>
                            </li>
                        </ul>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <hr className={styles.horizontalLine} />
                <h2 className={`${styles.headerText} ${!isDarkMode ? styles.light : ''}`}>Foundation</h2>
            </div>
            <div className={styles.buttonContainer}>
                {buttons.map((button) => (
                    <button
                        key={button}
                        className={`${styles.button} ${!isDarkMode ? styles.light : ''} ${selectedButton === button ? styles.selected : ''}`}
                        onClick={() => setSelectedButton(button)}
                    >
                        {button}
                    </button>
                ))}
            </div>
            <div className={styles.contentContainer}>
                {buttons.map((contentType) => (
                    <div
                        key={contentType}
                        className={`${styles.contentWrapper} ${
                            contentType === visibleContent && !isTransitioning ? styles.visible : styles.hidden
                        }`}
                        style={{ display: (contentType === visibleContent || contentType === selectedButton) ? 'block' : 'none' }}
                    >
                        {renderContent(contentType)}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Foundation; 