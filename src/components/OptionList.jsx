import React from "react";
import Option from "./Option";
import { useQuiz } from "../contexts/QuizProvider";

export default function OptionList() {
  const { questions, answer, dispatch, index } = useQuiz();

  const options = questions[index].options;
  const correctOption = questions[index].correctOption;

  return (
    <div className="options">
      {options.map((option, index) => (
        <Option
          key={index}
          index={index}
          option={option}
          answer={answer}
          correctOption={correctOption}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}
