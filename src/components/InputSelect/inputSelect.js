import React from "react";
import { MenuItem, TextField } from "@mui/material";
import PropTypes from "prop-types";

export default function InputSelect({ name, label, error, options, onChange }) {
  return (
    <TextField
      name={name}
      label={label}
      error={error && true}
      select
      fullWidth
      size="small"
      required
      onChange={onChange}
    >
      {options.map((option) => (
        <MenuItem key={option.id} value={option.nome}>{option.nome}</MenuItem>
      ))}
    </TextField>
  );
}

InputSelect.defaultProps = { error: false, onChange: undefined };

InputSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nome: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func

};
