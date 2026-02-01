import '../styles/QuestionCard.css';

export default function QuestionCard({
  question,
  answers,
  onAnswerClick,
  selectedAnswer,
  showResult,
  correctAnswer,
  loading,
}) {
  return (
    <div className="question-card">
      <div className="question-text">{question}</div>

      <div className="answers-grid">
        {answers.map((answer, index) => {
          let buttonClass = 'answer-btn';

          if (showResult) {
            if (answer === correctAnswer) {
              buttonClass += ' correct';
            } else if (answer === selectedAnswer && answer !== correctAnswer) {
              buttonClass += ' incorrect';
            }
          } else if (answer === selectedAnswer) {
            buttonClass += ' selected';
          }

          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => onAnswerClick(answer)}
              disabled={loading || showResult}
            >
              {answer}
            </button>
          );
        })}
      </div>

      {showResult && selectedAnswer !== correctAnswer && (
        <div className="feedback incorrect-feedback">
          ✗ Wrong! The correct answer is: <strong>{correctAnswer}</strong>
        </div>
      )}

      {showResult && selectedAnswer === correctAnswer && (
        <div className="feedback correct-feedback">✓ Correct!</div>
      )}
    </div>
  );
}
