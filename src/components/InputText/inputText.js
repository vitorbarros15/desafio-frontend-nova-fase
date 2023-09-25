import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export default function InputText({ name, label, error, required }) {
  return (
    <TextField
      name={name}
      label={label}
      error={error && "true"}
      // className={styles.inputsTextField}
      required={required}
      fullWidth
      size="small"
    />
  );
}

InputText.defaultProps = { name: "", label: "", error: false, required: false };

InputText.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  required: PropTypes.bool
};
