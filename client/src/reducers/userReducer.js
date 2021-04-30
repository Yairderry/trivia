import {
  SET_USER,
  SET_USER_LOADER,
  SET_USER_ERROR,
  START_BREAK,
  STOP_BREAK,
  CLEAR_USER,
} from "../actions";

const initialUserValue = {
  error: "",
  loading: false,
  id: 0,
  name: "",
  score: null,
  topScore: null,
  playing: false,
  onBreak: false,
  strikes: null,
};

const UserReducer = (state = initialUserValue, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return payload;

    case CLEAR_USER:
      return initialUserValue;

    case SET_USER_LOADER:
      state.loading = true;
      return { ...state };

    case START_BREAK:
      state.onBreak = true;
      return { ...state };

    case STOP_BREAK:
      state.onBreak = false;
      return { ...state };

    case SET_USER_ERROR:
      state.error = payload;
      state.loading = false;
      return { ...state };

    default:
      return state;
  }
};

export default UserReducer;
