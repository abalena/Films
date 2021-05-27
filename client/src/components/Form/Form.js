import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  TextField,
  Button,
  Typography,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Snackbar
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import { addFilm } from "../../actions/films";

const Form = () => {
  const films = useSelector((state) => state.films);
  const [filmData, setFilmData] = useState({
    title: "",
    year: "",
    format: "",
    stars: "",
  });
  const [open, setOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const years = [];
  for (let i = 1896; i <= 2021; i++) {
    years.push(i);
  }

  const formats = ["VHD", "DVD", "Blu-Ray"];

  const validate = () => {
    const existedFilms = films.filter((film) =>
      film.title == filmData.title && film.year == filmData.year
    )
    return existedFilms.length;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate() == 0) {
      setIsAdded(false);
      dispatch(addFilm(filmData))
        .then(() => {
          clear();
          setOpen(true);

        })
    } else {
      setIsAdded(true);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const clear = () => {
    setFilmData({ title: "", year: "", format: "", stars: "" });
  };

  return (
    <Paper className={classes.paper}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Film added successfully!
        </Alert>
      </Snackbar>
      <form
        autoComplete="off"
        validate="true"
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">Add film</Typography>
        {isAdded ? <Typography variant="subtitle1" color="error">Film has been added</Typography> : <></>}

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
        <FormControl required fullWidth>
          <InputLabel id="format-select">Format</InputLabel>
          <Select
            inputProps={{
              name: "Format",
              id: "format-select",
            }}
            autoWidth
            value={filmData.format}
            onChange={(e) => setFilmData({ ...filmData, format: e.target.value })}
            required
          >
            {formats.map((format, i) => (
              <MenuItem key={i} value={format}>
                {format}
              </MenuItem>
            ))}

          </Select>
        </FormControl>

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
