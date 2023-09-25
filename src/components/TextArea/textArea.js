import React from "react";
import PropTypes from "prop-types";
import { Box, TextField, Typography } from "@mui/material";
import styles from "./textArea.module.css";

export default function TextArea({ title }) {
  console.log("title", title);
  return (
    <Box className={styles.box}>
      <Typography className={styles.title}>{title}</Typography>
      <TextField
        className={styles.input}
        multiline
        rows={7}
      />
    </Box>
  );
}

TextArea.defaultProps = { title: "" };

TextArea.propTypes = { title: PropTypes.string };
