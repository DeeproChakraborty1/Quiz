


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SetupQuiz = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [category, setCategory] = useState(21); // Default: General Knowledge
  const [difficulty, setDifficulty] = useState('easy');
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  const handleStartQuiz = () => {
    localStorage.setItem('quizSettings', JSON.stringify({ name, category, difficulty, numberOfQuestions }));
    navigate('/quiz');
  };

  return (
    <div>
      <h1>Setup Quiz</h1>
      <form>
        <input type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value={21}>General Knowledge</option>
          <option value={9}>General Knowledge</option>
          <option value={11}>Entertainment: Video Games</option>
          {/* Add more categories as needed */}
        </select>
        <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <input type="number" value={numberOfQuestions} onChange={(e) => setNumberOfQuestions(e.target.value)} />
        <button type="button" onClick={handleStartQuiz}>Start Quiz</button>
      </form>
    </div>
  );
};

export default SetupQuiz;
