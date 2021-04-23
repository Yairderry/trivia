import { combineReducers } from "redux";

import userReducer from "./userReducer";
import questionReducer from "./questionReducer";
import boardReducer from "./boardReducer";
import answerReducer from "./answerReducer";

export default combineReducers({
  user: userReducer,
  question: questionReducer,
  board: boardReducer,
  answer: answerReducer,
});
