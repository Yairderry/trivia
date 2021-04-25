import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getQuestion, checkAnswer, startBreak } from "../actions";
import Question from "./Question/Question";
import Rating from "./Rating/Rating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function Game() {
  const dispatch = useDispatch();
  const { name, score, strikes, error, loading, onBreak } = useSelector(
    (state) => state.user
  );

  const answer = useSelector((state) => state.answer);

  useEffect(() => {
    dispatch(getQuestion());
  }, [name]);

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

      {onBreak ? (
        <Rating />
      ) : (
        <button
          onClick={() => {
            if (!onBreak) dispatch(checkAnswer());
            dispatch(startBreak());
            console.log(answer);
          }}
        >
          Submit
        </button>
      )}
    </div>
  );
}
