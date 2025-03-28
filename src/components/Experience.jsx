import styles from './Experience.module.css';

const Experience = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.icon}>🚧</div>
        <h2 className={styles.title}>Under Construction</h2>
        <p className={styles.description}>This section is currently being built. Check back soon!</p>
      </div>
    </div>
  );
};

export default Experience;
