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
  dispatch({ type: "SET_USER_ERROR", payload: message });
  setTimeout(() => dispatch({ type: "SET_USER_ERROR", payload: "" }), 3000);
};

export const checkAnswer = () => {
  return async (dispatch, getState) => {
    dispatch({ type: SET_ANSWER_LOADER });

    const { user, question, answer } = getState();

    if (answer.userAnswer === undefined) return;

    try {
      const { data } = question.id
        ? await axios
            .post(
              `api/question/check-answer?userId=${user.id}&questionId=${question.id}&answer=${answer.userAnswer}`,
              { ...question }
            )
            .catch((err) => {
              errorFade(dispatch, err.response.data);
            })
        : await axios
            .post(`api/question/check-answer?answer=${answer.userAnswer}`, {
              ...question,
            })
            .catch((err) => {
              errorFade(dispatch, err.response.data);
            });

      dispatch({
        type: SET_ANSWER,
        payload: {
          userAnswer: "",
          correctAnswer: "",
          loading: false,
          error: "",
        },
      });

      const score = data.userAnswer === data.correctAnswer ? 100 : 0;

      dispatch({ type: "SET_USER_LOADER" });
      axios
        .put(`api/user/update-score?id=${user.id}&score=${score}`)
        .then((data) =>
          dispatch({
            type: "SET_USER",
            payload: { ...data.data, onBreak: true },
          })
        )
        .catch((err) => {
          errorFade(dispatch, err.response.data);
        });
    } catch (err) {
      errorFade(dispatch, err.response.data);
    }
  };
};
