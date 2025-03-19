import Navbar from './components/navbar';
import styles from './App.module.css';
import Hero from './components/Hero';

function App() {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      <Hero />
      {/* Rest of the components go here */}
    </div>
  )
}

export default App
