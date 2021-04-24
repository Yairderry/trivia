import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuestion, checkAnswer } from "../actions";
import Question from "./Question";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function Game() {
  const dispatch = useDispatch();
  const { name, score, strikes, error, loading } = useSelector(
    (state) => state.user
  );

  useEffect(() => {
    dispatch(getQuestion());
  }, [score, strikes]);

  return (
    <div>
      <div className="info-user">
        {error && <ErrorMessage message={error} />}
        {loading && <Loader />}
        <span>Username: {name}</span>
        <span>Score: {score}</span>
        <span>Strikes: {strikes}</span>
      </div>
      <Question />
      <button
        onClick={() => {
          dispatch(checkAnswer());
        }}
      >
        Submit
      </button>
    </div>
  );
}
