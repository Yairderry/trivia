import axios from "axios";

export const SET_ANSWER = "SET_ANSWER";
export const PICK_ANSWER = "PICK_ANSWER";
export const SET_ANSWER_ERROR = "SET_ANSWER_ERROR";
export const SET_ANSWER_LOADER = "SET_ANSWER_LOADER";

export const setAnswer = (payload) => ({
  type: SET_ANSWER,
  payload,
});

export const pickAnswer = (payload) => ({
  type: PICK_ANSWER,
  payload,
});

export const setAnswerLoader = () => ({
  type: SET_ANSWER_LOADER,
});

export const setAnswerError = (payload) => ({
  type: SET_ANSWER_ERROR,
  payload,
});

const errorFade = (dispatch, message) => {
  dispatch({ type: SET_ANSWER_ERROR, payload: message });
  setTimeout(() => dispatch({ type: SET_ANSWER_ERROR, payload: "" }), 3000);
};

export const checkAnswer = () => {
  return (dispatch, getState) => {
    dispatch({ type: SET_ANSWER_LOADER });

    const { question, answer } = getState();

    if (!answer.userAnswer) return;

    question.id
      ? axios
          .post(
            `api/question/check-answer?questionId=${question.id}&answer=${answer.userAnswer}`,
            { ...question }
          )
          .then((data) => {
            dispatch({
              type: SET_ANSWER,
              payload: { ...data.data, loading: false, error: "" },
            });
          })
          .catch((err) => {
            errorFade(dispatch, err.response.data);
          })
      : axios
          .post(`api/question/check-answer?answer=${answer.userAnswer}`, {
            ...question,
          })
          .then((data) => {
            dispatch({
              type: SET_ANSWER,
              payload: { ...data.data, loading: false, error: "" },
            });
          })
          .catch((err) => {
            errorFade(dispatch, err.response.data);
          });
  };
};
