import React from "react";
import { useSelector } from "react-redux";
import Loader from "./Loader";
import Option from "./Option";
import ErrorMessage from "./ErrorMessage";

export default function Question() {
  const { question, options, loading, error } = useSelector(
    (state) => state.question
  );

  return (
    <div className="question-section">
      {error && <ErrorMessage message={error} />}
      {loading && <Loader />}
      <div>{question}</div>
      <div>
        {options.map((option, i) => (
          <Option key={i} option={option} />
        ))}
      </div>
    </div>
  );
}
