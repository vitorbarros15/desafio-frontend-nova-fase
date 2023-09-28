import React from "react";
import PropTypes from "prop-types";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function DateTime({ value, label, error, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DemoContainer component="DateRangePicker" sx={{ padding: "0px", overflow: "initial" }} components={["DateTimePicker"]}>
        <DateTimePicker
          label={label}
          value={value ? dayjs(value) : null}
          disabled={value && true}
          slotProps={{
            textField:
            {
              size: "small",
              error: error && true
            }
          }}
          onChange={onChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

DateTime.defaultProps = { value: "", label: "", error: false, onChange: undefined };

DateTime.propTypes = {
  value: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func

};
