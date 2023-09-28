import React from "react";
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./text.module.css";

function TextAtas({ title, description }) {
  return (
    <Box className={styles.containerText}>
      <Typography className={styles.title}>{title}</Typography>
      <Typography className={styles.description}>{description}</Typography>
    </Box>
  );
}

TextAtas.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default TextAtas;
