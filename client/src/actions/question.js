import axios from "axios";

export const SET_QUESTION = "SET_QUESTION";
export const SET_QUESTION_ERROR = "SET_QUESTION_ERROR";
export const SET_QUESTION_LOADER = "SET_QUESTION_LOADER";

export const setQuestion = (payload) => ({
  type: SET_QUESTION,
  payload,
});

export const setQuestionLoader = () => ({
  type: SET_QUESTION_LOADER,
});

export const setQuestionError = (payload) => ({
  type: SET_QUESTION_ERROR,
  payload,
});

const errorFade = (dispatch, message) => {
  dispatch({ type: SET_QUESTION_ERROR, payload: message });
  setTimeout(() => dispatch({ type: SET_QUESTION_ERROR, payload: "" }), 3000);
};

export const getQuestion = () => {
  return (dispatch, getState) => {
    dispatch({ type: SET_QUESTION_LOADER });
    const { user } = getState();

    if (!user.id) return;

    axios
      .get(`api/question/new?userId=${user.id}`)
      .then((data) => dispatch({ type: SET_QUESTION, payload: data.data }))
      .catch((err) => {
        errorFade(dispatch, err.response.data);
      });
  };
};

export const saveQuestion = (rating) => {
  return (dispatch, getState) => {
    const { question, answer } = getState();
    const savedQuestion = {
      question: question.question,
      option_1: question.options[0].toString(),
      option_2: question.options[1].toString(),
      option_3: question.options[2] && question.options[2].toString(),
      option_4: question.options[3] && question.options[3].toString(),
      answer: answer.correctAnswer.toString(),
      isCorrect: answer.correctAnswer === answer.userAnswer,
    };

    if (!rating) return;

    dispatch({ type: SET_QUESTION_LOADER });
    axios
      .post(`api/question/save?rating=${rating}`, {
        ...savedQuestion,
      })
      .then(() => {
        dispatch({
          type: SET_QUESTION,
          payload: { ...question, loading: false },
        });
      })
      .catch((err) => {
        errorFade(dispatch, err.message);
      });
  };
};

export const rateQuestion = (rating) => {
  return (dispatch, getState) => {
    const { question } = getState();

    if (!question.id || !rating) return;

    dispatch({ type: SET_QUESTION_LOADER });
    axios
      .put(`api/question/rate?id=${question.id}&rating=${rating}`)
      .then(() =>
        dispatch({
          type: SET_QUESTION,
          payload: { ...question, loading: false },
        })
      )
      .catch((err) => {
        errorFade(dispatch, err.response.data);
      });
  };
};
