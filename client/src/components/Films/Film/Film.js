import React, {useState} from "react";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import {
  Card,
  CardContent,
  CardActions,
  Collapse,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { deleteFilm } from "../../../actions/films";
import useStyles from "./styles";

const Film = ({ film }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
        <CardActions disableSpacing>
      <CardContent>
        <Typography variant="h6" color="textSecondary" component="p">
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
          
          onClick={()=>dispatch(deleteFilm(film._id))}
          aria-expanded={expanded}
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{film.year}</Typography>
          <Typography paragraph>{film.format}</Typography>
          <Typography paragraph>{film.stars}</Typography>
        </CardContent>
      </Collapse>
      
    </Card>
  );
};

export default Film;
