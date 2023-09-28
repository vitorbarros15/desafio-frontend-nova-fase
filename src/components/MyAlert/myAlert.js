import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import PropTypes from "prop-types";

function MyAlert({ open, onClose, message, severity }) {
  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <MuiAlert elevation={6} variant="filled" onClose={onClose} severity={severity}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}

MyAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(["error", "warning", "info", "success"]).isRequired
};

export default MyAlert;
