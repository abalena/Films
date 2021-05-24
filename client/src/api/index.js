import axios from "axios";

const url = "http://localhost:5000/films";

export const fetchFilms = () => axios.get(url);
export const addFilm = (newFilm) => axios.post(url, newFilm);
export const uploadFile = (file) => axios.post(`${url}/update`, file);
export const deleteFilm = (id) => axios.delete(`${url}/${id}`);
