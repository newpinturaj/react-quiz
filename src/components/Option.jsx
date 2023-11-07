import React from "react";

export default function Option({
  answer,
  index,
  option,
  correctOption,
  dispatch,
}) {
  return (
    <button
      disabled={answer !== null}
      className={`btn btn-option ${answer === index ? "answer" : ""} ${
        answer !== null ? (correctOption === index ? "correct" : "wrong") : ""
      }`}
      onClick={() => {
        dispatch({ type: "answer", payload: index });
      }}
    >
      {option}
    </button>
  );
}
