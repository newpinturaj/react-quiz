import React from "react";
import { useQuiz } from "../contexts/QuizProvider";

export default function Questions() {
  const { questions, index } = useQuiz();
  return (
    <div>
      <h4>{questions[index].question}</h4>
    </div>
  );
}
