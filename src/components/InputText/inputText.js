import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export default function InputText({ name, label, error, onChange }) {
  return (
    <TextField
      name={name}
      label={label}
      error={error && "true"}
      // classname={styles.inputsTextField}
      required
      fullWidth
      size="small"
      onChange={onChange}
    />
  );
}

InputText.defaultProps = { name: "", label: "", error: false, onChange: undefined };

InputText.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func
};
