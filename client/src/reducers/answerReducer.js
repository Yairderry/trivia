import { SET_ANSWER, SET_ANSWER_ERROR, SET_ANSWER_LOADER } from "../actions";

const initialAnswerValue = {
  loading: false,
  error: "",
  userAnswer: "",
  correctAnswer: "",
};

const AnswerReducer = (state = initialAnswerValue, { type, payload }) => {
  switch (type) {
    case SET_ANSWER:
      return payload;

    case SET_ANSWER_LOADER:
      state.loading = true;
      return { ...state };

    case SET_ANSWER_ERROR:
      state.loading = false;
      state.error = payload;
      return { ...state };

    default:
      return state;
  }
};

export default AnswerReducer;
