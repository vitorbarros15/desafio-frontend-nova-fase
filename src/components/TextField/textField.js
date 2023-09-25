import React from "react";
import PropTypes from "prop-types"; // Importe o PropTypes

import TextField from "@mui/material/TextField";

function TextFielda({ name, label, required, error }) {
  return (
    <TextField
      name={name}
      label={label}
      required={required}
      size="small"
      error={error && true}
    />
  );
}

TextFielda.defaultProps = {
  name: "",
  error: false,
  required: false
};

TextFielda.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  error: PropTypes.bool
};

export default TextFielda;
