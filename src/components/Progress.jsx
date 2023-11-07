import React from "react";
import { useQuiz } from "../contexts/QuizProvider";

export default function Progress() {
  const { points, numQuestions, index, maxPoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={15} value={index + (answer !== null)}></progress>
      <p>
        Questions <strong>{index + 1}</strong>/ {numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPoints} points
      </p>
    </header>
  );
}
