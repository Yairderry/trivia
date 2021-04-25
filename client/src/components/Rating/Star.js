import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  saveQuestion,
  rateQuestion,
  stopBreak,
  getQuestion,
} from "../../actions";

export default function Star({ rating }) {
  const { id } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  const rateOrSaveQuestion = () => {
    id ? dispatch(rateQuestion(rating)) : dispatch(saveQuestion(rating));
    dispatch(getQuestion());
    dispatch(stopBreak());
  };
  return <span onClick={() => rateOrSaveQuestion()}>{rating}</span>;
}
