import React from "react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import Option from "./Option";
import Timer from "./Timer";
import ErrorMessage from "../ErrorMessage";

export default function Question() {
  const { question, options, loading, error } = useSelector(
    (state) => state.question
  );

  return (
    <div className="question-section">
      <Timer />
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}
      <div>{question}</div>
      <div>
        {options &&
          options.map((option, i) => {
            return (
              <Option
                key={i}
                option={option}
                answer={
                  option === true ? true : option === false ? false : option
                }
              />
            );
          })}
      </div>
    </div>
  );
}
