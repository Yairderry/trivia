import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveQuestion, rateQuestion } from "../../actions";

export default function Star({ rating, didRate, setDidRate }) {
  const { id } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setDidRate(false);
    };
  }, [id]);

  const rateOrSaveQuestion = () => {
    console.log(didRate);
    if (!didRate) {
      id ? dispatch(rateQuestion(rating)) : dispatch(saveQuestion(rating));
      setDidRate(true);
    }
  };
  return <span onClick={() => rateOrSaveQuestion()}>{rating}</span>;
}
