import React, { useEffect } from "react";

export default function Timer({ remainingTime, dispatch }) {
  const min = Math.floor(remainingTime / 60);
  const sec = remainingTime % 60;

  // console.log(`${min}:${sec}`);

  useEffect(() => {
    const timerID = setInterval(() => {
      dispatch({ type: "timer" });
    }, 1000);

    console.log("useEffectRun");

    return () => {
      console.log("CleanUP Run");
      clearInterval(timerID);
    };
  }, [dispatch]);

  return (
    <div className="timer">
      {min < 10 ? "0" + min : min}:{sec < 10 ? "0" + sec : sec}
    </div>
  );
}
