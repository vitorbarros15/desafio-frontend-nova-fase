import React from "react";
import PropTypes from "prop-types";

import { Box, Card } from "@mui/material";
import TextAtas from "../../components/Title/text";
import BackgroundWrapper from "../../components/Wrapper/backgroundWrapper";

import styles from "./formBackground.module.css";

export default function FormBackground({ identification, MeetingContent, buttons }) {
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
              {identification}
            </Box>
            <Box>
              {MeetingContent}
            </Box>
            <Box position="absolute" right="0" bottom="0" mb="29px">
              {buttons}
            </Box>
          </Box>
        </Card>
      </Box>
    </BackgroundWrapper>
  );
}

FormBackground.propTypes = {
  identification: PropTypes.func.isRequired,
  MeetingContent: PropTypes.func.isRequired,
  buttons: PropTypes.func.isRequired
};
