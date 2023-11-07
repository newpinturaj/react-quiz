import React, { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

const initialState = {
  questions: [],
  answer: null,
  points: 0,
  status: "",
  index: 0,
  highscore: 0,
  remainingTime: null,
  numQuestions: null,
  maxPoints: null,
  error: null,
};

const PER_QUESTION_TIME = 20; //seconds

const BASE_URL = "http://localhost:4000";

function reducer(state, actions) {
  switch (actions.type) {
    case "loading":
      return { ...state, status: "loading" };

    case "questions/loaded":
      return {
        ...state,
        questions: actions.payload.data,
        numQuestions: actions.payload.numQues,
        maxPoints: actions.payload.maxPoints,
        status: "questionsLoaded",
      };

    case "start":
      return {
        ...state,
        answer: null,
        points: 0,
        status: "active",
        index: 0,
        remainingTime: state.questions.length * PER_QUESTION_TIME,
      };

    case "next":
      if (state.index < state.questions.length - 1)
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      return {
        ...state,
        status: "finish",
        highscore:
          state.highscore < state.points ? state.points : state.highscore,
      };

    case "answer":
      return {
        ...state,
        answer: actions.payload,
        points:
          state.questions[state.index].correctOption === actions.payload
            ? state.points + state.questions[state.index].points
            : state.points,
      };

    case "timer":
      if (state.remainingTime === 0)
        return {
          ...state,
          status: "finish",
          highscore:
            state.highscore < state.points ? state.points : state.highscore,
        };
      return { ...state, remainingTime: state.remainingTime - 1 };

    case "error":
      return {
        ...state,
        status: "error",
        error: actions.payload,
      };

    default:
      throw new Error("Unknown Operation");
  }
}

export default function QuizProvider({ children }) {
  const [
    {
      questions,
      answer,
      points,
      status,
      index,
      highscore,
      remainingTime,
      maxPoints,
      numQuestions,
      error,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(() => {
    async function fetchData() {
      try {
        dispatch({ type: "loading" });
        const res = await fetch(`${BASE_URL}/questions`);
        const data = await res.json();
        console.log(data[0].points);

        const maxPoints = data.reduce(
          (acc, currQues) => acc + currQues.points,
          0
        );
        const numQues = data.length;

        dispatch({
          type: "questions/loaded",
          payload: { data: data, maxPoints: maxPoints, numQues: numQues },
        });
      } catch (err) {
        dispatch({ type: "error", payload: err });
      }
    }
    fetchData();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        answer,
        points,
        status,
        index,
        highscore,
        remainingTime,
        numQuestions,
        maxPoints,
        error,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);

  if (context === undefined)
    throw new Error("Context is used outside the scope");

  return context;
}
