import React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import LogoIndrustriall from "../../assets/imagens/Logo.png";
import styles from "./backgroundWrrapper.module.css";

function BackgroundWrapper({ children }) {
  return (
    <Box height="100%" className={styles.wrapper}>
      <Box className={styles.boxLogo}>
        <img src={LogoIndrustriall} alt="IndrustriALL logo" />
      </Box>
      {children}
    </Box>
  );
}

BackgroundWrapper.propTypes = { children: PropTypes.node.isRequired };

export default BackgroundWrapper;
