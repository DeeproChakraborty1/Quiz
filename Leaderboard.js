


import React, { useState, useEffect } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const leaderboardData = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setLeaderboard(leaderboardData);
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      <ol>
        {leaderboard.map((user, index) => (
          <li key={index}>
            {user.name}: {user.score} points
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
