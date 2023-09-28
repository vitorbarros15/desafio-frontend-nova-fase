import React from "react";
import PropTypes from "prop-types";

// MUI
import { Box, Typography } from "@mui/material";
import DateTime from "../../../../components/DateTime";
import InputText from "../../../../components/InputText";
import InputSelect from "../../../../components/InputSelect";

// Hook
import useDate from "../../../../hooks/useDate";

// Styles
import styles from "./inputsIdentification.module.css";

export default function InputsIdentification({
  typesMeetings,
  typesLocations,
  handleChangeEvent,
  errors,
  dataMeeting
}) {
  return (
    <Box className={styles.card}>
      <Box className={styles.containerFirst}>
        <Box widthfull>
          <Typography className={styles.titleIdentification}>Identificação</Typography>
        </Box>
        <Box wwidthfull className={styles.containerInputs}>
          <Box widthfull>
            <InputText
              value={dataMeeting.titulo}
              name="titulo"
              label="Título"
              error={errors.titulo}
              onChange={(e) => {
                handleChangeEvent(e);
              }}
            />
          </Box>
          <Box widthfull>
            <InputSelect
              value={dataMeeting.local}
              name="localId"
              label="Local"
              error={errors.localId}
              options={typesLocations}
              onChange={(e) => {
                handleChangeEvent(e);
              }}
            />
          </Box>
          <Box className={styles.containerDate} width="100%" display="flex" justifyContent="space-between" gap="35px">
            <Box width="425px">
              <DateTime
                value={dataMeeting.dataInicio || ""}
                label="Data e Horário de Início *"
                error={errors.dataInicio}
                onChange={(e) => {
                  const value = { name: "dataInicio", value: useDate(e.$d) };
                  handleChangeEvent(value);
                }}
              />
            </Box>
            <Box width="425px">
              <DateTime
                value={dataMeeting.dataFim}
                label="Data e Horário de Fim"
                onChange={(e) => {
                  const response = { name: "dataFim", value: useDate(e.$d) };
                  handleChangeEvent(response);
                }}
              />
            </Box>
          </Box>
          <Box widthfull>
            <InputSelect
              value={dataMeeting.tipoReuniao}
              name="tipoReuniaoId"
              label="Tipo de Reunião"
              error={errors.tipoReuniaoId}
              options={typesMeetings}
              onChange={(e) => { handleChangeEvent(e); }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

InputsIdentification.defaultProps = {
  typesMeetings: [],
  typesLocations: [],
  handleChangeEvent: null,
  errors: false,
  viewMeeting: {
    titulo: "",
    localId: 0,
    dataInicio: "",
    dataFim: "",
    tipoReuniaoId: ""
  },
  dataMeeting: {}
};

InputsIdentification.propTypes = {
  typesMeetings: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    nome: PropTypes.string
  })),
  typesLocations: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    nome: PropTypes.string
  })),
  handleChangeEvent: PropTypes.func,
  errors: PropTypes.objectOf(PropTypes.string),
  viewMeeting: PropTypes.shape({
    titulo: PropTypes.string,
    localId: PropTypes.number,
    dataInicio: PropTypes.string,
    dataFim: PropTypes.string,
    tipoReuniaoId: PropTypes.string
  }),
  dataMeeting: PropTypes.shape({
    titulo: PropTypes.string,
    local: PropTypes.string,
    dataInicio: PropTypes.string,
    dataFim: PropTypes.string,
    tipoReuniao: PropTypes.string
  })
};
