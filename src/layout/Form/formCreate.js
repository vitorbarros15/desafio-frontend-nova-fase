import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// MUI
import { Card, Box, Button } from "@mui/material";

// Componentes
import BackgroundWrapper from "../../components/Wrapper/backgroundWrapper";
import TextAtas from "../../components/Title/text";
import MeetingContent from "./components/meetingContent/meetingContent";
import InputsIdentification from "./components/identification/inputsIdentification";

// Hook
import useForm from "../../hooks/useForm";
import AxiosDefault from "../../permission/AxiosDefault";

// Styles
import styles from "./formCreate.module.css";

function FormCreate() {
  const [typesMeetings, setTypeMeetings] = useState([]);
  const [typesLocations, setLocations] = useState([]);
  const {
    formData,
    handleChange,
    handleChangeEvent,
    handleChangeAtaReuniao,
    validateForm,
    data,
    errors
  } = useForm({
    titulo: { valor: "", required: true },
    dataInicio: { valor: "", required: true },
    dataFim: { valor: "", required: true },
    localId: { valor: "", required: true },
    tipoReuniaoId: { valor: "", required: true },
    camposAtaReuniao: []
  });

  useEffect(() => {
    async function getData() {
      const responseMeeting = await AxiosDefault.get("TiposReuniao");
      const responseLocation = await AxiosDefault.get("Locais");
      setTypeMeetings(responseMeeting);
      setLocations(responseLocation);
      console.log("response", responseMeeting, responseLocation);
    }

    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      try {
        await AxiosDefault.post("Atas", data);
        window.location.pathname = "/";
      } catch (error) {
        console.error("Erro ao enviar o formulário:", error);
      }
    }
  };

  return (
    <BackgroundWrapper>
      <Box display="flex" justifyContent="center" mt="31px">
        <TextAtas
          title="Nova Ata de Reunião"
          description="Os campos obrigatórios estão marcados com um asterisco (*)"
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Card className={styles.card} onSubmit={handleSubmit}>
          <Box position="relative">
            <Box>
              <InputsIdentification
                typesMeetings={typesMeetings}
                typesLocations={typesLocations}
                handleChange={handleChange}
                handleChangeEvent={handleChangeEvent}
                errors={errors}
              />
            </Box>
            <Box>
              <MeetingContent
                chosenMeeting={formData.tipoReuniaoId.valor}
                typeOfMeeting={typesMeetings}
                handleChangeAtaReuniao={handleChangeAtaReuniao}
              />
            </Box>
            <Box position="absolute" right="0" bottom="0" mb="29px">
              <Box className={styles.containerButtons}>
                <Link to="/">
                  <Button className={styles.buttonCancel}>
                    CANCELAR
                  </Button>
                </Link>
                <Button className={styles.buttonSave} onClick={handleSubmit}>
                  SALVAR ATA
                </Button>
              </Box>
            </Box>
          </Box>
        </Card>
      </Box>
    </BackgroundWrapper>
  );
}

export default FormCreate;
