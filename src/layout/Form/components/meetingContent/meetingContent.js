import React from "react";

// MUI
import { Box, Typography } from "@mui/material";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import PropTypes from "prop-types";
import DateTime from "../../../../components/DateTime";
import TextArea from "../../../../components/TextArea";
import InputText from "../../../../components/InputText";

// Hook
import useDate from "../../../../hooks/useDate";

// Style
import styles from "./meetingContent.module.css";

export default function MeetingContent({
  chosenMeeting,
  typeOfMeeting,
  handleChangeEvent
  handleChangeAtaReuniao
}) {
  console.log("chosenMeeting", chosenMeeting, typeOfMeeting);
  function createTextArea(campo) {
    console.log(campo);
    return (
      <TextArea
        name={campo.id}
        title={campo.nome}
        onChange={(e) => {
          handleChangeEvent(e);
          console.log("e", e.target.value);
        }}
      />
    // <Box className={styles.containerTextArea} key={campo.id}>
    //   <Typography className={styles.tituloTextArea}>{campo.nome}</Typography>
    //   <TextField
    //     multiline
    //     rows={7}
    //     className={styles.textArea}
    //     onChange={(e) => {
    //       const value = { campoId: campo.id, valor: e.target.value };
    //       handleChangeAtaReuniao(value);
    //     }}
    //   />
    // </Box>
    );
  }

  function createDateTime(campo) {
    console.log("campo", campo.campoId);
    return (
      <DateTime
        label={campo.nome}
        onChange={(e) => {
          const response = { name: campo.id, value: useDate(e.$d) };
          handleChangeEvent(response);
        }}
      />
    // <Box key={campoNome} className={styles.inputsDate}>
    //   <LocalizationProvider dateAdapter={AdapterDayjs}>
    //     <DemoContainer components={["DateTimePicker"]}>
    //       <DateTimePicker
    //         label={campoNome}
    //         slotProps={{ textField: { size: "small" } }}
    //         onChange={(e) => {
    //           const dateTime = e.$d;
    //           const value = { campoId, valor: useDate(dateTime) };
    //           console.log("response", value);
    //           handleChangeAtaReuniao(value);
    //         }}
    //       />
    //     </DemoContainer>
    //   </LocalizationProvider>
    // </Box>
    );
  }

  function createText(campo) {
    console.log("campo", campo);
    return (
      <Box width="100%">
        <InputText name={campo.id} label={campo.nome} onChange={(e) => handleChangeEvent(e)} />
      </Box>
      // <Box width="100%" key={campoNome}>
      //   <TextField
      //     size="small"
      //     sx={{ width: "100%" }}
      //     label={campoNome}
      //     onChange={(e) => {
      //       const value = { campoId, valor: e.target.value };
      //       handleChangeAtaReuniao(value);
      //     }}
      //   />
      // </Box>
    );
  }

  function createDefault() {
    return (
      <Box className={styles.containerDefault} width="880px" height="85px" display="flex">
        <Typography className={styles.default}>
          Selecione o Tipo de Reunião
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={styles.containerMeetingContent}>
      <Box>
        <Typography className={styles.titleMeetingContent}>Conteúdo da Reunião</Typography>
      </Box>
      <Box display="flex" flexDirection="column" gap="35px">
        {chosenMeeting ? (
          typeOfMeeting.map((object) => {
            console.log("typeOfMeeting", typeOfMeeting, chosenMeeting, object);
            if (object.nome === chosenMeeting) {
              return object.campos.map((campo) => {
                if (campo.tipo === "textarea") {
                  return createTextArea(campo);
                } if (campo.tipo === "datetime") {
                  return createDateTime(campo, campo.id, campo.nome);
                } if (campo.tipo === "text") {
                  return createText(campo);
                }
                return null;
              });
            }
            return null;
          })
        ) : (
          createDefault()
        )}
      </Box>
    </Box>
  );
}

MeetingContent.propTypes = {
  chosenMeeting: PropTypes.number.isRequired,
  // handleChangeAtaReuniao: PropTypes.func.isRequired,
  typeOfMeeting: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      campos: PropTypes.arrayOf(
        PropTypes.shape({
          tipo: PropTypes.string.isRequired,
          nome: PropTypes.string.isRequired
        })
      ).isRequired
    })
  ).isRequired,
  handleChangeEvent: PropTypes.func.isRequired
};
