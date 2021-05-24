import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { addFilm } from "../../actions/films";

const Form = () => {
  const [filmData, setFilmData] = useState({
    title: "",
    year: "",
    format: "",
    stars: "",
  });
  const classes = useStyles();

  const dispatch = useDispatch();
  const years = [];
  for (let i = 1896; i <= 2021; i++) {
    years.push(i);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addFilm(filmData));
    clear();
  };
  const clear = () => {
    setFilmData({ title: "", year: "", format: "", stars: "" });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        validate="true"
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Add film</Typography>
        <TextField
          name="title"
          label="Title"
          fullWidth
          value={filmData.title}
          onChange={(e) => setFilmData({ ...filmData, title: e.target.value })}
          required
        />

        <FormControl required fullWidth>
          <InputLabel id="year-select">Year</InputLabel>
          <Select
            inputProps={{
              name: "Year",
              id: "year-select",
            }}
            autoWidth
            value={filmData.year}
            onChange={(e) => setFilmData({ ...filmData, year: e.target.value })}
            required
          >
            {years.map((year, i) => (
              <MenuItem key={i + year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          name="format"
          label="Format"
          fullWidth
          value={filmData.format}
          onChange={(e) => setFilmData({ ...filmData, format: e.target.value })}
          required
        />
        <TextField
          name="stars"
          label="Stars"
          fullWidth
          value={filmData.stars}
          onChange={(e) => setFilmData({ ...filmData, stars: e.target.value })}
          required
        />
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="secondary"
          size="small"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
