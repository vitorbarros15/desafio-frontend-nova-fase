import React, { useState, useEffect } from "react";
import { format } from "date-fns";

// MUI
import { Box, Typography } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

// Axios
import AxiosDefault from "../../../permission/AxiosDefault";

// Style
import styles from "./list.module.css";
import MyModal from "../../../components/Modal/myModal";
import MyAlert from "../../../components/MyAlert/myAlert";

function groupMeetingsByTipoReuniao(meetings) {
  const groupedMeetings = {};

  meetings.forEach((meeting) => {
    const { tipoReuniao } = meeting;
    if (!groupedMeetings[tipoReuniao]) {
      groupedMeetings[tipoReuniao] = [];
    }
    groupedMeetings[tipoReuniao].push(meeting);
  });

  const sortedKeys = Object.keys(groupedMeetings).sort();

  const sortedGroupedMeetings = {};
  sortedKeys.forEach((tipoReuniao) => {
    sortedGroupedMeetings[tipoReuniao] = groupedMeetings[tipoReuniao];

    sortedGroupedMeetings[tipoReuniao]
      .sort((a, b) => new Date(b.dataInicio) - new Date(a.dataInicio));
  });

  return sortedGroupedMeetings;
}

function formatDateTime(dateTimeStr) {
  const date = new Date(dateTimeStr);
  return format(date, "dd/MM/yyyy 'às' HH'h'mm");
}

function List() {
  const [showModal, setShowModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [delMeeting, setDelMeeting] = useState();
  const [meetings, setMeetings] = useState([]);
  const [deletedMeeting, setDeletedMeeting] = useState();

  useEffect(() => {
    async function getMeetings() {
      const response = await AxiosDefault.get("Atas");
      setMeetings(response);
    }

    getMeetings();
  }, [deletedMeeting]);

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleShowAlert = () => {
    setOpenAlert(true);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCancel = () => {
    handleCloseModal();
  };

  const deleteMeeting = async () => {
    const response = await AxiosDefault.delete(`Atas/${delMeeting}`);
    handleShowAlert();
    setTimeout(() => {
      handleAlertClose();
    }, 1500);
    handleCloseModal();
    setDeletedMeeting(response);
  };

  const groupedMeetings = groupMeetingsByTipoReuniao(meetings);

  return (
    <Box display="flex" flexDirection="column" gap="35px">
      { groupedMeetings !== null && Object.keys(groupedMeetings).length > 0 ? (
        Object.entries(groupedMeetings).map(([tipoReuniao, meetingGroup]) => (
          <Box className={styles.container} key={tipoReuniao}>
            <Box>
              <Typography height="24px" mb="10px" className={styles.typeMeeting}>{tipoReuniao}</Typography>
              <Box display="flex" flexDirection="column" alignItems="center">
                {meetingGroup.map((meeting, index) => (
                  <Box key={meeting.id} display="flex" className={styles.containerMeetingIcon}>
                    <Box width="100%" display="flex" justifyContent="space-between" alignItems="center" height="74px" clasName={styles.meeting}>
                      <Box>
                        <Typography className={styles.titleMeeting}>{meeting.titulo}</Typography>
                        <Typography className={styles.dateHourLocal}>
                          {formatDateTime(meeting.dataInicio)}
                          ,
                          {" "}
                          {meeting.local}
                        </Typography>
                      </Box>
                      <Box display="flex" gap="17px">
                        <RemoveRedEyeOutlinedIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            window.location.pathname = `/reuniao/${meeting.id}`;
                          }}
                        />
                        <DeleteOutlineIcon
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            handleOpenModal();
                            setDelMeeting(meeting.id);
                          }}
                        />
                      </Box>
                    </Box>
                    {index !== meetingGroup.length - 1 && <Box className={styles.border} />}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        ))
      ) : Object.keys(groupedMeetings).length === 0 && (
        <Box widthfull display="flex" justifyContent="center" alignItems="center" height="100px">
          <Typography>Não há reuniões marcadas!</Typography>
        </Box>
      )}
      <MyModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onConfirm={deleteMeeting}
        onCancel={handleCancel}
      />
      <MyAlert
        open={openAlert}
        onClose={() => handleAlertClose()}
        message="Formulário enviado com sucesso!"
        severity="success"
      />
    </Box>
  );
}

export default List;
