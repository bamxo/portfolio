import Navbar from './components/navbar';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.appContainer}>
      <Navbar />
      {/* Rest of the components go here */}
    </div>
  )
}

export default App
