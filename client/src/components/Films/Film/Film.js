import React, { useState } from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
  Snackbar
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { deleteFilm } from "../../../actions/films";
import useStyles from "./styles";

const Film = ({ film }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDeleteClick = () => {
    dispatch(deleteFilm(film._id))
      .then(setOpen(true))
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Film deleted successfully!
        </Alert>
      </Snackbar>
      <CardActions disableSpacing>
        <CardContent>
          <Typography variant="h6" color="textPrimary" component="p">
            {film.title}
          </Typography>
        </CardContent>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        <IconButton
          onClick={handleDeleteClick}
          aria-expanded={expanded}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph >Year: {film.year}</Typography>
          <Typography paragraph >Format: {film.format}</Typography>
          <Typography paragraph >Stars: {film.stars}.</Typography>
          <Typography paragraph color="textSecondary">id: {film._id}</Typography>
        </CardContent>
      </Collapse>

    </Card>
  );
};

export default Film;
