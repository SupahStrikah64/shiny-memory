import axios from 'axios';

const TRIVIA_API_URL = 'https://opentdb.com/api.php';

// Decode HTML entities
const decodeHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.documentElement.textContent;
};

export const fetchQuestion = async () => {
  try {
    const response = await axios.get(TRIVIA_API_URL, {
      params: {
        amount: 1,
        type: 'multiple',
      },
    });

    const question = response.data.results[0];

    // Shuffle and decode answers
    const allAnswers = [
      question.correct_answer,
      ...question.incorrect_answers,
    ].sort(() => Math.random() - 0.5);

    return {
      question: decodeHTML(question.question),
      answers: allAnswers.map((answer) => decodeHTML(answer)),
      correctAnswer: decodeHTML(question.correct_answer),
      difficulty: question.difficulty,
      category: decodeHTML(question.category),
    };
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
};
