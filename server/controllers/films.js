import mongoose from "mongoose";
import Film from "../models/film.js";
import * as parser from "./parser.js";

export const getFilms = async (req, res) => {
  try {
    const listOfFilms = await Film.find();
    res.status(200).json(listOfFilms);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const addFilm = async (req, res) => {
  const film = req.body;
  const newFilm = new Film(film);
  try {
    await newFilm.save();
    res.status(201).json(newFilm);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const uploadFile = async (req, res) => {
  const fileData = parser.readAndDelFile(req.file.path, "utf8");
  const films = parser.parseData(fileData);
  const newFilms = [];
  try {
    for await( let film of films){
      const newFilm = new Film(film)
      newFilms.push(newFilm)
      await newFilm.save();
    }
    res.status(201).json(newFilms);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const deleteFilm = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");
  await Film.findByIdAndRemove(id);
  res.json({ message: "Post deleted successfully" });
};
