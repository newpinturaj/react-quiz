import React from "react";
import Timer from "./Timer";
import Button from "./Button";
import { useQuiz } from "../contexts/QuizProvider";

export default function Footer() {
  const { answer, dispatch, index, numQuestions, remainingTime } = useQuiz();
  return (
    <footer>
      <Timer remainingTime={remainingTime} dispatch={dispatch} />
      {answer !== null && (
        <Button
          onClick={() => {
            dispatch({ type: "next" });
          }}
        >
          {index < numQuestions - 1 ? "Next" : "Finish"}
        </Button>
      )}
    </footer>
  );
}
