import React, { useEffect, useState } from 'react';

function Quiz({ onNext }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    fetch('/questions.json')
      .then(res => res.json())
      .then(data => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 10);
        setQuestions(selected);
      });
  }, []);

  const handleChange = (qId, option) => {
    setAnswers(prev => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = () => {
    onNext(answers, questions);
  };

  return (
    <div>
      <h2>Quiz</h2>
      {questions.map((q, index) => (
        <div key={q.id}>
          <p>{index + 1}. {q.question}</p>
          {q.options.map(opt => (
            <label key={opt}>
              <input
                type="radio"
                name={`q${q.id}`}
                value={opt}
                onChange={() => handleChange(q.id, opt)}
                checked={answers[q.id] === opt}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}
      <br/>
      <button onClick={handleSubmit}>Review Answers</button>
    </div>
  );
}

export default Quiz;
