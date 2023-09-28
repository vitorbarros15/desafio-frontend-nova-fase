import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

export default function InputText({ value, name, label, error, onChange }) {
  return (
    <TextField
      name={name}
      label={label}
      value={value}
      disabled={!!value}
      error={error && true}
      required
      InputLabelProps={value ? { shrink: true } : null}
      fullWidth
      type="text"
      size="small"
      onChange={onChange}
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
