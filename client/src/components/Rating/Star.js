import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveQuestion, rateQuestion } from "../../actions";

export default function Star({ rating }) {
  const { id } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  // TODO: allow only one rate
  const rateOrSaveQuestion = () => {
    id ? dispatch(rateQuestion(rating)) : dispatch(saveQuestion(rating));
  };
  return <span onClick={() => rateOrSaveQuestion()}>{rating}</span>;
}
