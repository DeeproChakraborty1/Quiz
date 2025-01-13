


import React from 'react';

const ResultModal = ({ score, totalQuestions, onClose }) => {
  const percentage = (score / totalQuestions) * 100;
  return (
    <div className="modal">
      <h2>Quiz Results</h2>
      <p>Your Score: {score} / {totalQuestions}</p>
      <p>Percentage: {percentage}%</p>
      <button onClick={onClose}>Go to Leaderboard</button>
    </div>
  );
};

export default ResultModal;
