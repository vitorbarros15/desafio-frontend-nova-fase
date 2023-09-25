import React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PropTypes from "prop-types";

export default function DateTime({ label, error }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer component="DateRangePicker" sx={{ padding: "0px", overflow: "initial" }} components={["DateTimePicker"]}>
        <DateTimePicker
          label={label}
          slotProps={{
            textField: {
              size: "small",
              error: !!error
            }
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}

DateTime.defaultProps = { error: false };

DateTime.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.bool
};
