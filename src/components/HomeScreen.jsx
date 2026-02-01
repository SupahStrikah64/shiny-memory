import '../styles/HomeScreen.css';

export default function HomeScreen({ onSelectMode }) {
  return (
    <div className="home-screen">
      <div className="home-header">
        <h1>Trivia Game</h1>
        <p className="subtitle">Test your knowledge</p>
      </div>

      <div className="modes-container">
        <div className="mode-card" onClick={() => onSelectMode('single-player')}>
          <div className="mode-icon">🎮</div>
          <h2>High Score</h2>
          <p>Challenge yourself with 3 lives. How high can you score?</p>
          <button className="mode-btn">Play</button>
        </div>

        <div className="mode-card coming-soon">
          <div className="mode-icon">🥔</div>
          <h2>Hot Potato</h2>
          <p>Compete with friends in real-time trivia battles</p>
          <button className="mode-btn" disabled>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
}
