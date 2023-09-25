import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./buttonCreate.module.css";

export default function ButtonCreate() {
  return (
    <Box display="flex" alignItems="center" className={styles.containerButton}>
      <Link to="/criarReuniao" style={{ textDecoration: "none" }}>
        <Button className={styles.buttonCreate}>
          <Typography className={styles.icon}>
            +
          </Typography>
          <Typography className={styles.text}>
            NOVA ATA
          </Typography>
        </Button>
      </Link>
    </Box>
  );
}
