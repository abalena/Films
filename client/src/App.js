import React, { useEffect } from "react";
import { Container, AppBar, Typography, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { getFilms } from "./actions/films";
import Films from "./components/Films/Films";
import Form from "./components/Form/Form";
import UploadFile from "./components/UploadFile/UploadFile";
import useStyles from "./styles";

const App = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography className={classes.heading} variant="h2" align="center">
          Films
        </Typography>
      </AppBar>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Films />
          </Grid>

          <Grid item xs={12} sm={4}>
            <UploadFile />
            <Form />
          </Grid>
        </Grid>
    </Container>
  );
};

export default App;
