import React, { useState, useEffect } from "react";

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
import AxiosDefault from "../../../../permission/AxiosDefault";

export default function MeetingContent({
  chosenMeeting,
  handleChangeAtaReuniao
}) {
  const [typesMeetings, setTypeMeetings] = useState([]);

  useEffect(() => {
    async function getTypesMeetings() {
      const responseMeeting = await AxiosDefault.get("TiposReuniao");
      setTypeMeetings(responseMeeting);
    }

    getTypesMeetings();
  }, [chosenMeeting]);

  function createTextArea(campo) {
    console.log("campo, campo", campo);
    return (
      <TextArea
        value={campo.valor}
        name={campo.id}
        title={campo.nome}
        onChange={(e) => {
          console.log("e", e.target.value);
          const value = { campoId: campo.id, value: e.target.value };
          console.log(value);
          handleChangeAtaReuniao(value);
        }}
      />
    );
  }

  function createDateTime(campo) {
    console.log("campo", campo);
    return (
      <DateTime
        label={campo.nome}
        onChange={(e) => {
          const value = { campoId: campo.id, value: useDate(e.$d) };
          handleChangeAtaReuniao(value);
        }}
      />
    );
  }

  function createText(campo) {
    console.log("campo", campo);
    return (
      <Box widthfull>
        <InputText
          name={campo.id}
          label={campo.nome}
          onChange={(e) => {
            const value = { campoId: campo.id, value: e.target.value };
            handleChangeAtaReuniao(value);
          }}
        />
      </Box>
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
          typesMeetings.map((object) => {
            if (object.id === chosenMeeting) {
              return object.campos.map((campo) => {
                if (campo.tipo === "textarea") {
                  return createTextArea(campo);
                } if (campo.tipo === "datetime") {
                  return createDateTime(campo);
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
  handleChangeAtaReuniao: PropTypes.func.isRequired
};
