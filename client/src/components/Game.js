import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuestion, checkAnswer, updateUserScore } from "../actions";
import Question from "./Question";

export default function Game() {
  const dispatch = useDispatch();
  const { name, score, strikes } = useSelector((state) => state.user);
  const answer = useSelector((state) => state.answer);
  const question = useSelector((state) => state.question);

  useEffect(() => {
    dispatch(getQuestion());
    console.log(question);
  }, [answer.correctAnswer]);

  return (
    <div>
      <div className="info-user">
        <span>Username: {name}</span>
        <span>Score: {score}</span>
        <span>Strikes: {strikes}</span>
      </div>
      <Question />
      <button
        onClick={() => {
          dispatch(checkAnswer());
          dispatch(updateUserScore());
        }}
      >
        Submit
      </button>
    </div>
  );
}
