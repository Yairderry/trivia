import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { pickAnswer } from "../../actions";

export default function Option({ option, answer }) {
  const dispatch = useDispatch();
  const { userAnswer } = useSelector((state) => state.answer);
  const { onBreak } = useSelector((state) => state.user);
  return (
    <div
      className={`option-question${answer === userAnswer ? " checked" : ""}`}
      onClick={() => {
        if (!onBreak) return dispatch(pickAnswer(answer));
      }}
    >
      {option === true ? "true" : option === false ? "false" : option}
    </div>
  );
}
