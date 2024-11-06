import { useState } from "react";

export function useModal() {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const handleOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  const handleClose = () => setOpen(false);

  return { open, setOpen, handleOpen, handleClose, id };
}
