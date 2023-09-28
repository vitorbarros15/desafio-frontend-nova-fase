import React from "react";
import { Box, Paper } from "@mui/material";
import BackgroundWrapper from "../../components/Wrapper";
import TextAtas from "../../components/Title";
import ButtonCreate from "../../components/Button";
import styles from "./meetingList.module.css";
import List from "./components/list";

export default function MeetingList() {
  return (
    <BackgroundWrapper sx={{ height: "100vh" }}>
      <Box display="flex" justifyContent="center" height="96px">
        <Box display="flex" justifyContent="space-between" className={styles.boxAtasButton}>
          <TextAtas
            title="Atas de Reunião"
            description="Estas são as atas das últimas reuniões"
          />
          <ButtonCreate />
        </Box>
      </Box>
      <Box display="flex" justifyContent="center">
        <Box className={styles.backgroundList}>
          <Paper elevation={3}>
            <List />
          </Paper>
        </Box>
      </Box>
    </BackgroundWrapper>
  );
}
