


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ResultModal from './ResultModal';

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const settings = JSON.parse(localStorage.getItem('quizSettings'));
    if (!settings) {
      navigate('/');
    }

    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`https://opentdb.com/api.php`, {
          params: {
            amount: settings.numberOfQuestions,
            category: settings.category,
            difficulty: settings.difficulty,
            type: 'multiple',
          },
        });
        setQuestions(response.data.results);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [navigate]);

  const handleAnswerSelection = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNextQuestion = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer('');
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleSubmitQuiz = () => {
    setShowResult(true);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      {currentQuestion && (
        <>
          <div>
            <h2>
              Question {currentQuestionIndex + 1} of {questions.length}
            </h2>
            <h3>{currentQuestion.question}</h3>
            <div>
              {currentQuestion.incorrect_answers
                .concat(currentQuestion.correct_answer)
                .map((answer, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelection(answer)}
                    style={{
                      backgroundColor: selectedAnswer === answer ? 'lightblue' : 'white',
                    }}
                  >
                    {answer}
                  </button>
                ))}
            </div>
          </div>
          <div>
            <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            {currentQuestionIndex === questions.length - 1 ? (
              <button onClick={handleSubmitQuiz}>Submit</button>
            ) : (
              <button onClick={handleNextQuestion}>Next</button>
            )}
          </div>
        </>
      )}
      {showResult && (
        <ResultModal score={score} totalQuestions={questions.length} onClose={() => navigate('/leaderboard')} />
      )}
    </div>
  );
};

export default Quiz;
