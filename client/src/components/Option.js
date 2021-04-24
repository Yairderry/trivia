import React from "react";
import { useDispatch } from "react-redux";
import { pickAnswer } from "../actions";

export default function Option({ option, answer }) {
  const dispatch = useDispatch();
  return (
    <div
      className="option-question"
      onClick={() => {
        dispatch(pickAnswer(answer));
      }}
    >
      {option === true ? "true" : option === false ? "false" : option}
    </div>
  );
}
