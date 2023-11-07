import React from "react";

export default function Result({ points, highscore, maxPoints, dispatch }) {
  const percent = Math.round((points / maxPoints) * 100);
  return (
    <>
      <p className="result">
        You scored <strong>{points}</strong> out of {maxPoints} ({percent}%)
      </p>
      <p className="highscore">(High Score: {highscore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "start" });
        }}
      >
        Restart Quiz
      </button>
    </>
  );
}
