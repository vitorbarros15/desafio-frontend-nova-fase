import React from "react";
import PropTypes from "prop-types";
import { Box, TextField, Typography } from "@mui/material";
import styles from "./textArea.module.css";

export default function TextArea({ value, name, title, rows, onChange }) {
  return (
    <Box className={styles.box}>
      <Typography className={styles.title}>{title}</Typography>
      <TextField
        value={value}
        disabled={value && true}
        className={styles.input}
        name={name}
        multiline
        rows={rows}
        onChange={onChange}
      />
    </Box>
  );
}

TextArea.defaultProps = { value: null, title: "", name: "", rows: 7, onChange: undefined };

TextArea.propTypes = {
  value: PropTypes.string,
  title: PropTypes.string,
  name: PropTypes.string,
  rows: PropTypes.number,
  onChange: PropTypes.func
};
