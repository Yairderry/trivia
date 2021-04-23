import { SET_BOARD, SET_BOARD_LOADER, SET_BOARD_ERROR } from "../actions";

const initialBoardValue = {
  error: "",
  loading: false,
  scoreboard: [],
};

const BoardReducer = (state = initialBoardValue, { type, payload }) => {
  switch (type) {
    case SET_BOARD:
      return payload;

    case SET_BOARD_LOADER:
      state.loading = true;
      return { ...state };

    case SET_BOARD_ERROR:
      state.error = payload;
      state.loading = false;
      return { ...state };

    default:
      return state;
  }
};

export default BoardReducer;
