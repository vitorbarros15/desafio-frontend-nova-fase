import React from "react";
import { MenuItem, TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function InputSelect({ value, name, label, error, options, onChange }) {
  return (
    <TextField
      select={!value}
      name={name}
      label={label}
      error={error && true}
      disabled={!!value}
      fullWidth
      size="small"
      required
      defaultValue={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.id}>{option.nome}</MenuItem>
      ))}
    </TextField>
  );
}

InputSelect.defaultProps = { value: "", name: "", label: "", error: false, options: [], onChange: undefined };

InputSelect.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      nome: PropTypes.string.isRequired
    })
  ),
  onChange: PropTypes.func

};
