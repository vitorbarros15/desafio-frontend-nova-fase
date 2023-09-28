import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// MUI
import { Box, Button, Card } from "@mui/material";

// Componentes
import MeetingContent from "./components/meetingContent";
import InputsIdentification from "./components/identification";

// Hook
import useForm from "../../hooks/useForm";
import AxiosDefault from "../../permission/AxiosDefault";

// Styles
import styles from "./formCreate.module.css";
import BackgroundWrapper from "../../components/Wrapper";
import TextAtas from "../../components/Title";
import MyAlert from "../../components/MyAlert";

function FormCreate() {
  const [typesMeetings, setTypeMeetings] = useState([]);
  const [typesLocations, setLocations] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const {
    formData,
    handleChange,
    handleChangeEvent,
    handleChangeAtaReuniao,
    validateForm,
    data,
    errors
  } = useForm({
    titulo: { value: "", required: true },
    dataInicio: { value: "", required: true },
    dataFim: "",
    localId: { value: "", required: true },
    tipoReuniaoId: { value: "", required: true },
    camposAtaReuniao: []
  });

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleShowAlert = () => {
    setOpenAlert(true);
  };

  useEffect(() => {
    async function getData() {
      const responseMeeting = await AxiosDefault.get("TiposReuniao");
      const responseLocation = await AxiosDefault.get("Locais");
      setTypeMeetings(responseMeeting);
      setLocations(responseLocation);
    }

    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    if (isFormValid) {
      try {
        await AxiosDefault.post("Atas", data);
        handleShowAlert();
        setTimeout(() => {
          handleAlertClose();
          window.location.pathname = "/";
        }, 1500);
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
                chosenMeeting={formData.tipoReuniaoId.value}
                handleChangeAtaReuniao={handleChangeAtaReuniao}
                handleChangeEvent={handleChangeEvent}
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
      <MyAlert
        open={openAlert}
        onClose={() => handleAlertClose()}
        message="Formulário enviado com sucesso!"
        severity="success"
      />
    </BackgroundWrapper>
  );
}

export default FormCreate;
