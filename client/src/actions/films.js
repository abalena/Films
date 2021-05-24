import { FETCH_ALL, ADD, UPLOAD, DELETE } from "../constants/actionTypes";
import * as api from "../api";

export const getFilms = () => async (dispatch) => {
  try {
    const { data } = await api.fetchFilms();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addFilm = (film) => async (dispatch) => {
  try {
    const { data } = await api.addFilm(film);
    dispatch({ type: ADD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const uploadFile = (file) => async (dispatch) => {
  try {
    const { data } = await api.uploadFile(file);
    dispatch({ type: UPLOAD, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteFilm = (id) => async (dispatch) => {
  try {
    await api.deleteFilm(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};
