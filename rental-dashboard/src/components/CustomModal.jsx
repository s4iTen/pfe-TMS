import { Box, Modal, useMediaQuery, useTheme } from "@mui/material";
import React from "react";

const CustomModal = ({ children, onClose, open, sx, key }) => {
  const isNonMobile = useMediaQuery("(min-width : 1024px)");
  const theme = useTheme();
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    backgroundColor: theme.palette.background.alt,
    transform: "translate(-50%, -50%)",
    width: isNonMobile ? "50vw" : "auto",
    border: "2px solid #ddd",
    borderRadius: 5,
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      sx={sx}
      key={key}
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

export default CustomModal;
