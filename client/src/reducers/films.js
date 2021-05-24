import { FETCH_ALL, ADD, UPLOAD, DELETE } from "../constants/actionTypes";

export default (films = [], action) => {
  switch (action.type) {
    case UPLOAD:
      return [...films, ...action.payload];
    case DELETE:
      return films.filter((film) => film._id !== action.payload);
    case FETCH_ALL:
      return action.payload;
    case ADD:
      return [...films, action.payload];
    default:
      return films;
  }
};
