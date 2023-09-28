import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

// Hook
import { Box, Button, Card } from "@mui/material";
import AxiosDefault from "../../permission/AxiosDefault";
import InputsIdentification from "../Form/components/identification";
import MeetingContent from "../Form/components/meetingContent";
import BackgroundWrapper from "../../components/Wrapper";
import TextAtas from "../../components/Title";

import styles from "../Form/formCreate.module.css";

export default function ViewMeeting() {
  const { id } = useParams();
  const [dataMeeting, setDataMeeting] = useState();

  useEffect(() => {
    async function getMeeting() {
      return new Promise(async (resolve, reject) => {
        await AxiosDefault.get(`Atas/${id}`)
          .then((response) => {
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
          title="Ata Completa de Reunião"
          description="Os campos não são editavéis (*)"
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
              && <MeetingContent chosenMeetingView={dataMeeting} />}
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
