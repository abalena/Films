import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Paper, Typography } from "@material-ui/core";

import { uploadFile } from "../../actions/films";
import useStyles from "./styles";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (event) => {
    if (event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setIsSelected(true);
    } else {
      setIsSelected(false);
    }
  };

  const handleSubmit = () => {
    if (isSelected && selectedFile.type === "text/plain") {
      const formData = new FormData();
      formData.append("file", selectedFile);
      dispatch(uploadFile(formData));
    } 
  };

  return (
    <Paper className={classes.paper}>
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
        <Button variant="contained" color="primary" component="span" fullWidth>
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
          Select a file to show details
        </Typography>
      )}

      <Button
        variant="contained"
        color="primary"
        type="submit"
        component="span"
        onClick={handleSubmit}
        fullWidth
      >
        Upload
      </Button>
    </Paper>
  );
};

export default UploadFile;
