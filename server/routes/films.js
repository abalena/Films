import express from "express";
import multer from "multer";

import { getFilms, addFilm, uploadFile, deleteFilm } from "../controllers/films.js";

const router = express.Router();
const upload = multer({ dest: './uploads/' });

router.get("/", getFilms);
router.post("/", addFilm);
router.post("/update", upload.single("file"), uploadFile);
router.delete("/:id", deleteFilm);

export default router;
