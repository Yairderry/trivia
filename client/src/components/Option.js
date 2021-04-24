import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pickAnswer } from "../actions";

export default function Option({ option }) {
  const dispatch = useDispatch();
  const optionRef = useRef();
  const answer = useSelector((state) => state.answer);
  return (
    <div
      className="option-question"
      ref={optionRef}
      onClick={() => {
        console.log(answer);
        dispatch(pickAnswer(optionRef.current.innerText));
      }}
    >
      {option === true ? "true" : option === false ? "false" : option}
    </div>
  );
}
