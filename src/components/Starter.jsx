import React from "react";
import { useQuiz } from "../contexts/QuizProvider";

export default function Starter() {
  const { numQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        Let's Start
      </button>
    </div>
  );
}
