import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveQuestion, rateQuestion } from "../../actions";

export default function Star({
  rating,
  didRate,
  setDidRate,
  clickedRating,
  setClickedRating,
}) {
  const { id } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      setDidRate(false);
    };
  }, [id]);

  const rateOrSaveQuestion = () => {
    if (!didRate) {
      id ? dispatch(rateQuestion(rating)) : dispatch(saveQuestion(rating));
      setDidRate(true);
      setClickedRating(rating);
    }
  };
  return (
    <span
      className={`rating-star fa fa-star fa-3x${
        clickedRating >= rating ? " rating-glow" : ""
      }`}
      onClick={() => rateOrSaveQuestion()}
    >
      {/* <span class="fa fa-star fa-3x"></span> */}
    </span>
  );
}
