import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getQuestion,
  checkAnswer,
  startBreak,
  endQuestion,
  startQuestion,
  endGame,
} from "../actions";
import Question from "./Question/Question";
import Rating from "./Rating/Rating";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";

export default function Game() {
  const dispatch = useDispatch();

  const { name, score, strikes, error, loading, onBreak } = useSelector(
    (state) => state.user
  );

  const { timerRef } = useSelector((state) => state.timer);

  useEffect(() => {
    dispatch(getQuestion());
    dispatch(startQuestion());
  }, [name]);

  return (
    <div>
      {strikes < 3 ? (
        <>
          <div className="info-user">
            {error && <ErrorMessage message={error} />}
            {loading && <Loader />}
            <span className="info-user-username">{name}</span>
            <span className="info-user-secondrow">
              <span>Score: {score}</span>
              <span>Strikes: {strikes}</span>
            </span>
          </div>
          <Question />
        </>
      ) : (
        <div>you lost loser</div>
      )}

      {onBreak ? (
        <Rating />
      ) : (
        <>
          {strikes < 3 && (
            <button
              className="submit-btn"
              onClick={() => {
                clearTimeout(timerRef[1]);
                clearInterval(timerRef[0]);
                dispatch(endQuestion());
                if (!onBreak) dispatch(checkAnswer());
                dispatch(startBreak());
              }}
            >
              Submit
            </button>
          )}

          <Link onClick={() => dispatch(endGame())} to="/lobby">
            Back to lobby
          </Link>
        </>
      )}
    </div>
  );
}
