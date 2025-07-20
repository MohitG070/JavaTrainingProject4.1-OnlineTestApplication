import React, { useEffect, useState } from 'react';

function Result({ userAnswers, questions, onRestart }) {
  const [correctAnswers, setCorrectAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('/answers.json')
      .then(res => res.json())
      .then(data => {
        setCorrectAnswers(data);
        let sc = 0;
        for (let q of questions) {
          if (userAnswers[q.id] === data[q.id]) sc++;
        }
        setScore(sc);
      });
  }, [userAnswers, questions]);

  return (
    <div>
      <h2>Results</h2>
      <p>Your Score: <b>{score}/10</b></p>
      {questions.map((q, idx) => (
        <p key={q.id}>
          {idx + 1}. {q.question} <br />
          Your Answer: {userAnswers[q.id] || <i>Not Answered</i>} <br />
          Correct Answer: {correctAnswers[q.id]} {' '}
          {userAnswers[q.id] === undefined
            ? <b>(NOT ANSWERED)</b>
            : userAnswers[q.id] === correctAnswers[q.id]
              ? <b>(CORRECT ANSWER)</b>
              : <b>(WRONG ANSWER)</b>
          }
        </p>
      ))}
      <button onClick={onRestart} style={{ marginTop: '20px' }}>
        Reattempt Quiz
      </button>
    </div>
  );
}

export default Result;
