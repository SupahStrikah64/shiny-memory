import { useState, useEffect } from 'react';
import { fetchQuestion } from '../services/triviaAPI';
import QuestionCard from './QuestionCard';
import '../styles/GameScreen.css';

export default function GameScreen({ onBackHome }) {
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);

  // Load initial question
  useEffect(() => {
    loadQuestion();
  }, []);

  const loadQuestion = async () => {
    try {
      setLoading(true);
      setSelectedAnswer(null);
      setShowResult(false);
      const data = await fetchQuestion();
      setQuestion(data.question);
      setAnswers(data.answers);
      setCorrectAnswer(data.correctAnswer);
    } catch (error) {
      console.error('Failed to load question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerClick = (answer) => {
    if (showResult || loading) return;

    setSelectedAnswer(answer);
    setShowResult(true);

    // Check if correct
    if (answer === correctAnswer) {
      setScore(score + 10);
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives === 0) {
        setGameOver(true);
      }
    }
  };

  const handleNextQuestion = () => {
    if (!gameOver) {
      loadQuestion();
    }
  };

  const handleRestart = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setSelectedAnswer(null);
    setShowResult(false);
    loadQuestion();
  };

  if (gameOver) {
    return (
      <div className="game-over-screen">
        <h1>Game Over!</h1>
        <div className="final-score">Final Score: {score}</div>
        <div className="game-over-buttons">
          <button className="restart-btn" onClick={handleRestart}>
            Play Again
          </button>
          <button className="home-btn" onClick={onBackHome}>
            Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-screen">
      <button className="back-btn" onClick={onBackHome}>← Back</button>
      
      <div className="game-header">
        <div className="score">Score: {score}</div>
        <div className="lives">
          Lives: {lives} {Array(lives).fill('❤️').join('')}
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading question...</div>
      ) : question ? (
        <>
          <QuestionCard
            question={question}
            answers={answers}
            onAnswerClick={handleAnswerClick}
            selectedAnswer={selectedAnswer}
            showResult={showResult}
            correctAnswer={correctAnswer}
            loading={loading}
          />
          {showResult && (
            <button className="next-btn" onClick={handleNextQuestion}>
              Next Question
            </button>
          )}
        </>
      ) : (
        <div className="error">Failed to load question</div>
      )}
    </div>
  );
}
