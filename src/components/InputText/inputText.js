import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export default function InputText({ value, name, label, error, onChange }) {
  // const inputValue = value || null;

  const inputLabelProps = value === true ? { shrink: true } : null;
  return (
    <TextField
    // classname={styles.inputsTextField}
      name={name}
      label={label}
      value={value}
      disabled={!!value}
      error={error && true}
      fullWidth
      type="text"
      size="small"
      onChange={onChange}
      InputLabelProps={inputLabelProps}
    />
  );
}

InputText.defaultProps = { value: null, name: "", label: "", error: false, onChange: undefined };

InputText.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func
};
