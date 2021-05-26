import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  CircularProgress,
  IconButton,
  TextField,
  Radio,
  Typography
} from "@material-ui/core";
import SortIcon from "@material-ui/icons/Sort";
import SearchIcon from "@material-ui/icons/Search";

import Film from "./Film/Film";
import useStyles from "./styles";

const Films = () => {
  const films = useSelector((state) => state.films);
  const [filteredFilms, setFilteredFilms] = useState([]);
  const [isSorted, setIsSorted] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchBy, setSearchBy] = useState("title");
  const classes = useStyles();

  const filter = () => {
    if (searchValue) {
      const newFilms = films.filter((film) => {
        const title = film.title.toLowerCase();
        const star = film.stars.toLowerCase();
        const filter = searchValue.toLowerCase();
        const searchResultTitle = title.includes(filter);
        const searchResultStar = star.includes(filter);
        return searchBy === "title" ? searchResultTitle : searchResultStar;
      });
      setFilteredFilms(newFilms);
      searchValue ? setIsSearched(true) : setIsSearched(false);
    } else {
      setIsSearched(false);
      return films;
    }
  };

  const handleSort = () => {
    if (!isSearched) {
      films.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
      setIsSorted(true);
    } else if (isSearched) {
      filteredFilms.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
      setIsSorted(true);
    }
  };

  const handleChange = (event) => {
    setSearchBy(event.target.value);
  };

  return !films.length ? (
    <Typography variant="h4" gutterBottom>There are no films in this list ... </Typography>
  ) : (
    <>
      <Grid
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        <Grid container justify="space-between">
          <Grid item xm={3}>
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={handleSort}
            >
              <SortIcon />
            </IconButton>
          </Grid>
          <Grid item xm={9}>
            <Radio
              checked={searchBy === "title"}
              onChange={handleChange}
              color="primary"
              value="title"
            />
            <Radio
              checked={searchBy === "star"}
              onChange={handleChange}
              color="primary"
              value="star"
            />
            <TextField
              id="standard-basic"
              label={`Search by ${searchBy}`}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={filter}
            />
            <IconButton
              color="primary"
              aria-label="search"
              component="span"
              onClick={filter}
            >
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
        {isSearched
          ? (filteredFilms.length ? filteredFilms.map((film) => (
            <Grid key={film._id} item xs={12} sm={12}>
              <Film film={film} />
            </Grid>
          )) :
            <div>
              <Typography variant="h4" gutterBottom>
                No results
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Search for other keywords
              </Typography>
            </div>)

          : films.map((film) => (
            <Grid key={film._id} item xs={12} sm={12}>
              <Film film={film} />
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Films;
