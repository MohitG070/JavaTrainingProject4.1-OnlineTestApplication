import React, { useState } from 'react';
import Quiz from './Quiz';
import Review from './Review';
import Result from './Result';

function App() {
  const [step, setStep] = useState(1);
  const [userAnswers, setUserAnswers] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const restartQuiz = () => {
    setStep(1);
    setUserAnswers({});
    setSelectedQuestions([]);
  };

  return (
    <div>
      {step === 1 && (
        <Quiz
          onNext={(answers, questions) => {
            setUserAnswers(answers);
            setSelectedQuestions(questions);
            setStep(2);
          }}
        />
      )}
      {step === 2 && (
        <Review
          answers={userAnswers}
          questions={selectedQuestions}
          onSubmit={() => setStep(3)}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Result
          userAnswers={userAnswers}
          questions={selectedQuestions}
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
}

export default App;
