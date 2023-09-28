import React, { useState, useEffect } from "react";

// MUI
import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";

import DateTime from "../../../../components/DateTime";
import TextArea from "../../../../components/TextArea";
import InputText from "../../../../components/InputText";

// Hook
import useDate from "../../../../hooks/useDate";
import AxiosDefault from "../../../../permission/AxiosDefault";

// Style
import styles from "./meetingContent.module.css";

export default function MeetingContent({
  chosenMeeting,
  chosenMeetingView,
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
    return (
      <TextArea
        value={campo.valor}
        name={campo.id}
        title={campo.nome}
        onChange={(e) => {
          const value = { campoId: campo.id, valor: e.target.value };
          handleChangeAtaReuniao(value);
        }}
      />
    );
  }

  function createDateTime(campo) {
    return (
      <DateTime
        value={campo.valor}
        label={campo.nome}
        onChange={(e) => {
          const value = { campoId: campo.id, valor: useDate(e.$d) };
          handleChangeAtaReuniao(value);
        }}
      />
    );
  }

  function createText(campo) {
    return (
      <Box widthfull>
        <InputText
          value={campo.valor}
          name={campo.id}
          label={campo.nome}
          onChange={(e) => {
            const value = { campoId: campo.id, valor: e.target.value };
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
        {typesMeetings.map((object) => {
          if (object.id === chosenMeeting) {
            return (object.campos).map((campo) => {
              if (campo.tipo === "textarea") {
                return createTextArea(campo);
              } if (campo.tipo === "datetime") {
                return createDateTime(campo);
              } if (campo.tipo === "text") {
                return createText(campo);
              }
              return null;
            });
          } if (chosenMeetingView.tipoReuniaoId === object.id) {
            return (chosenMeetingView.camposAtaReuniao).map((campo) => {
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
        }) || createDefault()}

      </Box>
    </Box>
  );
}

MeetingContent.defaultProps = { chosenMeetingView: "" };

MeetingContent.propTypes = {
  chosenMeeting: PropTypes.number.isRequired,
  chosenMeetingView: PropTypes.shape({
    camposAtaReuniao: PropTypes.arrayOf(
      PropTypes.shape({
        campoId: PropTypes.number,
        valor: PropTypes.string
      })
    ),
    dataFim: PropTypes.string,
    dataInicio: PropTypes.string,
    id: PropTypes.number,
    local: PropTypes.string,
    localId: PropTypes.number,
    tipoReuniao: PropTypes.string,
    tipoReuniaoId: PropTypes.number,
    titulo: PropTypes.string
  }),
  handleChangeAtaReuniao: PropTypes.func.isRequired
};
