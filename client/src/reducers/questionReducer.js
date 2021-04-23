import {
  SET_QUESTION,
  SET_QUESTION_ERROR,
  SET_QUESTION_LOADER,
} from "../actions";

const initialQuestionValue = {
  loading: false,
  error: "",
  id: null,
  question: "",
  options: [],
};

const QuestionReducer = (state = initialQuestionValue, { type, payload }) => {
  switch (type) {
    case SET_QUESTION:
      return payload;

    case SET_QUESTION_LOADER:
      state.loading = true;
      return { ...state };

    case SET_QUESTION_ERROR:
      state.loading = false;
      state.error = payload;
      return { ...state };

    default:
      return state;
  }
};

export default QuestionReducer;
