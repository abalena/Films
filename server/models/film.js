import mongoose from "mongoose";

const filmSchema = mongoose.Schema({
  title: { type: String, required: true },
  year: { type: String, required: true },
  format: { type: String, required: true },
  stars: { type: String, required: true },
});

const Film = mongoose.model("Film", filmSchema);

export default Film;
