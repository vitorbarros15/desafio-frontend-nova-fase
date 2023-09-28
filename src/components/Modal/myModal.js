import * as React from "react";
import PropTypes from "prop-types";

import { Box, Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Fade from "@mui/material/Fade";

import styles from "../../layout/Form/formCreate.module.css";
import styles2 from "./myModal.module.css";

export default function MyModal({ isOpen, onClose, onConfirm, onCancel }) {
  return (
    <Modal
      keepMounted
      open={isOpen}
      onClose={onClose}
      color="white"
    >
      <Fade in={isOpen} timeout={300}>
        <Box
          className={styles2.modalBackground}
        >
          <Typography alignItems="center" variant="h6" component="h2">
            Você deseja realmente deletar está reunião?
          </Typography>
          <Box widthful className={styles.containerButtons} display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Button color="error" type="button" className={styles.buttonCancel} onClick={onCancel}>
              Fechar
            </Button>
            <Button color="info" type="button" className={styles.buttonSave} onClick={onConfirm}>
              Confirmar
            </Button>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

MyModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func
};

MyModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
  onConfirm: () => {},
  onCancel: () => {}
};
