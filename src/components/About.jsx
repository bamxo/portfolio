import styles from './About.module.css';
import Scene from './Scene';

const About = () => {
  return (
    <div className={styles.container}>
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
            Hi everyone! My name is Landon, and I'm a third-year Computer Science major at UC Santa Cruz. I have a strong passion for software development, with interests spanning web development, machine learning, and mobile development. I enjoy working on projects where I can see my code turn into something functional and meaningful.
          </p>
          <p className={styles.paragraph}>
            Beyond coding, I'm an avid martial artist and serve as the Demo Team Coordinator for UCSC's Taekwondo Club. I love competing and pushing my limits, both in tournaments and in training. When I'm not working on projects or practicing taekwondo, you'll probably find me snowboarding, eating, or experimenting with new recipes in the kitchen.
          </p>
          <p className={styles.paragraph}>
            I like to create technology that is not only functional and efficient but also impactful and user-friendly. If you're interested in working together, feel free to reach out!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
