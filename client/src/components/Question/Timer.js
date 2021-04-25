import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { failedToAnswer, setTimerRef, timerTick } from "../../actions";

export default function Timer() {
  const dispatch = useDispatch();
  const timer = useSelector((state) => state.timer);

  useEffect(() => {
    const tick = setInterval(() => {
      dispatch(timerTick());
    }, 500);

    const questionTimer = setTimeout(() => {
      dispatch(failedToAnswer());
      clearInterval(tick);
    }, timer.questionTime);

    dispatch(setTimerRef([tick, questionTimer]));

    return () => {
      clearTimeout(questionTimer);
      clearInterval(tick);
    };
  }, [timer.questionStart]);

  return <div>{timer.timer}</div>;
}
