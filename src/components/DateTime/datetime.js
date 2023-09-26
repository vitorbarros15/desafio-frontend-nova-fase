import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import "dayjs/locale/pt-br";
import PropTypes from "prop-types";

export default function DateTime({ label, error, onChange }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DemoContainer component="DateRangePicker" sx={{ padding: "0px", overflow: "initial" }} components={["DateTimePicker"]}>
        <DateTimePicker
          label={label}
          error={error && true}
          slotProps={{ textField: { size: "small" } }}
          onChange={onChange}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

DateTime.defaultProps = { label: "", error: false, onChange: undefined };

DateTime.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  onChange: PropTypes.func

};
