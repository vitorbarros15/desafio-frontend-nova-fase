import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Hook
import { Box, Button, Card } from "@mui/material";
import AxiosDefault from "../../permission/AxiosDefault";
import InputsIdentification from "../Form/components/identification/inputsIdentification";
import MeetingContent from "../Form/components/meetingContent/meetingContent";
import BackgroundWrapper from "../../components/Wrapper/backgroundWrapper";
import TextAtas from "../../components/Title/text";

import styles from "../Form/formCreate.module.css";

export default function ViewMeeting() {
  const { id } = useParams();
  const [dataMeeting, setDataMeeting] = useState();

  useEffect(() => {
    async function getMeeting() {
      return new Promise(async (resolve, reject) => {
        await AxiosDefault.get(`Atas/${id}`)
          .then((response) => {
            console.log("response: ", response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }

    getMeeting()
      .then((response) => {
        setDataMeeting(response);
      })
      .catch((error) => {
        console.error("Erro ao buscar reunião:", error);
      });
  }, []);

  return (
    <BackgroundWrapper>
      <Box display="flex" justifyContent="center" mt="31px">
        <TextAtas
          title="Nova Ata de Reunião"
          description="Os campos obrigatórios estão marcados com um asterisco (*)"
        />
      </Box>
      <Box display="flex" justifyContent="center">
        <Card className={styles.card}>
          <Box position="relative">
            <Box>
              <InputsIdentification dataMeeting={dataMeeting} />
            </Box>
            <Box>
              { dataMeeting
              && <MeetingContent chosenMeeting={dataMeeting.tipoReuniaoId} />}
            </Box>
            <Box position="absolute" right="0" bottom="0" mb="29px">
              <Box className={styles.containerButtons}>
                <Link to="/">
                  <Button className={styles.buttonCancel}>
                    CANCELAR
                  </Button>
                </Link>
                <Button className={styles.buttonSave}>
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
