import React from "react";
import { Link } from "react-router-dom";

// MUI
import { Card, Box, Button, TextField, Typography } from "@mui/material";

// Componentes
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import BackgroundWrapper from "../../../components/Wrapper/backgroundWrapper";
import TextAtas from "../../../components/Title/text";
// import MeetingContent from "../../Form/components/meetingContent/meetingContent";

// Hook
// import useForm from "../../../hooks/useForm";
// import AxiosDefault from "../../../permission/AxiosDefault";

// Styles
import styles from "../../Form/formCreate.module.css";
import stylesIden from "../../Form/components/identification/inputsIdentification.module.css";

function ViewMeeting() {
  return (
    <BackgroundWrapper>
      <Box display="flex" justifyContent="center" mt="31px">
        <TextAtas
          title="Ata de Reunião"
          description="Não é possível editar os campos"
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Card className={styles.card}>
          <Box position="relative">
            <Box className={stylesIden.card}>
              <Box className={stylesIden.containerFirst}>
                <Box width="100%">
                  <Typography className={stylesIden.titleIdentification}>Identificação</Typography>
                </Box>
                <Box width="100%" className={stylesIden.containerInputs}>
                  <Box width="100%">
                    <TextField
                      className={stylesIden.inputsTextField}
                      disabled
                      name="titulo"
                      label="Título"
                      size="small"
                    />
                  </Box>
                  <Box width="100%">
                    <TextField
                      disabled
                      className={stylesIden.inputsTextField}
                      label="Local"
                      size="small"
                    />
                  </Box>
                  <Box className={stylesIden.containerDate} width="100%" display="flex" justifyContent="space-between">
                    <Box className={stylesIden.inputsDate}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer component="DateRangePicker" sx={{ padding: "0px", overflow: "initial" }} components={["DateTimePicker"]}>
                          <DateTimePicker
                            disabled
                            label="Data e Horário de Início *"
                            slotProps={{ textField: { size: "small" } }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>
                    <Box className={stylesIden.inputsDate}>
                      <LocalizationProvider sx={{ color: "red" }} dateAdapter={AdapterDayjs}>
                        <DemoContainer x={{ padding: "0px", overflow: "initial", color: "red" }} components={["DateTimePicker"]}>
                          <DateTimePicker
                            disabled
                            label="Data e Horário de Fim"
                            slotProps={{ textField: { size: "small" } }}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </Box>
                  </Box>
                  <Box width="100%">
                    <TextField
                      className={stylesIden.inputsTextField}
                      disabled
                      label="Tipo de Reunião"
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box>
              {/* <MeetingContent
                chosenMeeting={formData.tipoReuniaoId.valor}
                typeOfMeeting={typesMeetings}
                handleChangeAtaReuniao={handleChangeAtaReuniao}
              /> */}
            </Box>
            <Box position="absolute" right="0" bottom="0" mb="29px">
              <Box justifyContent="flex-end" className={styles.containerButtons}>
                <Link to="/">
                  <Button className={styles.buttonCancel}>
                    VOLTAR
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </BackgroundWrapper>
  );
}

export default ViewMeeting;
