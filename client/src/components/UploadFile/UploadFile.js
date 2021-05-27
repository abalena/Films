import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Paper, Typography, Snackbar, LinearProgress } from "@material-ui/core";
import { Alert } from '@material-ui/lab';

import { uploadFile } from "../../actions/films";
import useStyles from "./styles";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setIsSelected(true);
      console.log(isSelected);
    } else {
      setIsSelected(false);
    }
  };

  const handleSubmit = () => {
    if (isSelected && selectedFile.type === "text/plain") {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      dispatch(uploadFile(formData))
        .then(() => {
          setOpen(true);
          setLoading(false);
        })
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Paper className={classes.paper}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          File uploaded successfully!
        </Alert>
      </Snackbar>
      <Typography variant="h6">Upload films</Typography>
      <input
        accept=".txt"
        className={classes.input}
        id="contained-button-file"
        type="file"
        name="file"
        onChange={handleChange}
      />
      <label htmlFor="contained-button-file" className={classes.label}>
        <Button variant="contained" color="primary" component="span" fullWidth className={classes.button}>
          Browse
        </Button>
      </label>
      {isSelected ? (
        selectedFile.type === "text/plain" ? (
          <Typography paragraph color="textPrimary" align="center">
            Filename: {selectedFile.name}
          </Typography>
        ) : (
          <Typography paragraph color="error" align="center">
            Choose .txt file
          </Typography>
        )
      ) : (
        <Typography paragraph color="textPrimary" align="center">
          Select a file to upload it
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        type="submit"
        component="span"
        onClick={handleSubmit}
        fullWidth
        className={classes.button}
        disabled={!isSelected || (selectedFile.type !== "text/plain")}
      >
        Upload
      </Button>
      {loading ? <LinearProgress className={classes.progress} /> : (<></>)}

    </Paper>
  );
};

export default UploadFile;
