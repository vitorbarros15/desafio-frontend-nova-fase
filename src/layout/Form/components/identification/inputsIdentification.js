import React from "react";

// MUI
import { Box, Typography, MenuItem } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PropTypes from "prop-types";
import DateTime from "../../../../components/DateTime";

// Hook
import useDate from "../../../../hooks/useDate";

// Styles
import styles from "./inputsIdentification.module.css";

function InputsIdentification({ typesMeetings, typesLocations, handleChangeEvent, errors }) {
  return (
    <Box className={styles.card}>
      <Box className={styles.containerFirst}>
        <Box width="100%">
          <Typography className={styles.titleIdentification}>Identificação</Typography>
        </Box>
        <Box width="100%" className={styles.containerInputs}>
          <Box width="100%">
            <TextField
              className={styles.inputsTextField}
              required
              name="titulo"
              label="Título"
              size="small"
              error={errors.titulo && "true"}
              onChange={(e) => {
                const value = { nome: "titulo", valor: e.target.value };
                handleChangeEvent(value);
              }}
            />
          </Box>
          <Box width="100%">
            <TextField
              className={styles.inputsTextField}
              required
              select
              label="Local"
              size="small"
              error={errors.localId && "true"}
              onChange={(e) => {
                typesLocations.forEach((objeto) => {
                  if (objeto.nome === e.target.value) {
                    const value = { nome: "localId", valor: objeto.id };
                    handleChangeEvent(value);
                  }
                });
              }}
            >
              {typesLocations.map((option) => (
                <MenuItem key={option.id} value={option.nome}>{option.nome}</MenuItem>
              ))}
            </TextField>
          </Box>
          <Box className={styles.containerDate} width="100%" display="flex" justifyContent="space-between">
            <Box className={styles.inputsDate}>
              <DateTime
                label="Data e Horário de Início *"
                error={errors.dataInicio}
                onChange={(e) => {
                  const dateTime = e.$d;
                  const value = { nome: "dataInicio", valor: useDate(dateTime) };
                  handleChangeEvent(value);
                }}
              />
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer component="DateRangePicker"
                sx={{ padding: "0px", overflow: "initial" }} components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Data e Horário de Início *"
                    slotProps={{ textField: { size: "small" } }}
                    onChange={(e) => {
                      const dateTime = e.$d;
                      const value = { nome: "dataInicio", valor: useDate(dateTime) };
                      handleChangeEvent(value);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider> */}
            </Box>
            <Box className={styles.inputsDate}>
              <LocalizationProvider sx={{ color: "red" }} dateAdapter={AdapterDayjs}>
                <DemoContainer sx={{ padding: "0px", overflow: "initial", color: "red" }} components={["DateTimePicker"]}>
                  <DateTimePicker
                    label="Data e Horário de Fim *"
                    slotProps={{ textField: { size: "small" } }}
                    onChange={(e) => {
                      const dateTime = e.$d;
                      const response = { nome: "dataFim", valor: useDate(dateTime) };
                      handleChangeEvent(response);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
          </Box>
          <Box width="100%">
            <TextField
              className={styles.inputsTextField}
              select
              label="Tipo de Reunião"
              required
              size="small"
              error={errors.tipoReuniaoId && "true"}
              onChange={async (e) => {
                typesMeetings.forEach((objeto) => {
                  if (objeto.nome === e.target.value) {
                    const value = { nome: "tipoReuniaoId", valor: objeto.id };
                    console.log("value", value);
                    handleChangeEvent(value);
                  }
                });
              }}
            >
              {typesMeetings.map((option) => (
                <MenuItem key={option.id} value={option.nome}>{option.nome}</MenuItem>
              ))}
            </TextField>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default InputsIdentification;

InputsIdentification.propTypes = {
  typesMeetings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired
  })).isRequired,
  typesLocations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    nome: PropTypes.string.isRequired
  })).isRequired,
  handleChangeEvent: PropTypes.func.isRequired,
  errors: PropTypes.isRequired
};
