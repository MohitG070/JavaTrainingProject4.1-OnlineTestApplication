import React from 'react';

function Review({ answers, questions, onSubmit, onBack }) {
  return (
    <div>
      <h2>Review Your Answers</h2>
      {questions.map((q, idx) => (
        <p key={q.id}>
          {idx + 1}. {q.question} <br />
          Your Answer: {answers[q.id] || <b>Not Answered</b>}
        </p>
      ))}
      <button onClick={onBack}>Back</button>
      <span> </span>
      <button onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default Review;
