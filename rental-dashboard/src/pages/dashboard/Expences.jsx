import { Typography } from "@mui/material";
import React from "react";
import CardList from "../../components/CardList";
import { useExpence } from "../../hooks/useExpence";
import { useModal } from "../../hooks/useModal";
import CustomModal from "../../components/CustomModal";
import Form from "../../components/Form";
import { useForm } from "../../hooks/useForm";
import ToastProvider, { showToast } from "../../components/CustomToast";
import RenderFormField from "../../components/RenderFormField";
import { useDispatch } from "react-redux";
import { updateExpenceDetails } from "../../store/expence/action";

const Expences = () => {
  const dispatch = useDispatch();
  const {
    pendingExpenses,
    approvedExpenses,
    declinedExpenses,
    completedExpenses,
    handleApprove,
    handleDecline,
    formFields,
  } = useExpence();
  const { open, handleOpen, handleClose, id } = useModal();
  const onSubmit = (values) => {
    const newData = {
      ...values,
      id,
    };

    dispatch(updateExpenceDetails(newData));
    showToast("Operation successful!", "✅", "success");
    handleClose();
  };

  const { formValues, handleChange, handleSubmit } = useForm(onSubmit);
  return (
    <>
      <Typography variant="h3">Pending</Typography>
      <CardList
        data={pendingExpenses}
        approveButton="Approve"
        declineButton="Decline"
        handleDecline={handleDecline}
        handleApprove={handleApprove}
        type="expense"
      />

      <Typography variant="h3">Approved</Typography>
      <CardList
        data={approvedExpenses}
        ButtonText={"Add Expence"}
        handlePageChange={handleOpen}
        type="expense"
      />
      {open && (
        <CustomModal onClose={handleClose} open={open}>
          <Form backgroundColor={"none"}>
            <Typography variant="h2" sx={{ textAlign: "center" }}>
              Add Expence
            </Typography>
            {formFields.map((field, index) => (
              <RenderFormField
                key={index}
                field={field}
                index={index}
                handleChange={handleChange}
                formValues={formValues}
                onClick={handleSubmit}
              />
            ))}
          </Form>
        </CustomModal>
      )}
      <ToastProvider />
      <Typography variant="h3">Declined</Typography>
      <CardList data={declinedExpenses} type="expense" />

      <Typography variant="h3">Completed</Typography>
      <CardList data={completedExpenses} type="expense" />
    </>
  );
};

export default Expences;
