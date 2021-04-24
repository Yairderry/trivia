import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pickAnswer } from "../actions";

export default function Option({ option, answer }) {
  const dispatch = useDispatch();
  const { userAnswer } = useSelector((state) => state.answer);
  return (
    <div
      className={`option-question${answer === userAnswer ? " checked" : ""}`}
      onClick={() => {
        dispatch(pickAnswer(answer));
      }}
    >
      {option === true ? "true" : option === false ? "false" : option}
    </div>
  );
}
