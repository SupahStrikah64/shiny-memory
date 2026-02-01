import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import GameScreen from './components/GameScreen'
import './App.css'

function App() {
  const [currentScreen, setCurrentScreen] = useState('home')

  const handleSelectMode = (mode) => {
    setCurrentScreen(mode)
  }

  const handleBackHome = () => {
    setCurrentScreen('home')
  }

  return (
    <div className="app-container">
      {currentScreen === 'home' && (
        <HomeScreen onSelectMode={handleSelectMode} />
      )}
      {currentScreen === 'single-player' && (
        <GameScreen onBackHome={handleBackHome} />
      )}
    </div>
  )
}

export default App
