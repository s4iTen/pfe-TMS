import React from "react";
import Form from "../../components/Form";
import { Typography } from "@mui/material";
import RenderFormField from "../../components/RenderFormField";
import { useForm } from "../../hooks/useForm";
import { useDispatch } from "react-redux";
import { addMaintainer } from "../../store/maintainer/action";

const formFields = [
  {
    type: "text",
    label: "Full Name",
    name: "fullName",
    placeholder: "Enter Maintainer's Full Name",
  },
  {
    type: "text",
    label: "Phone Number",
    name: "tel",
    placeholder: "Enter Phone Number",
  },
  {
    type: "email",
    label: "Email",
    name: "email",
    placeholder: "Enter Email",
  },
  {
    type: "text",
    label: "Job",
    name: "job",
    placeholder: "Enter Job Title",
  },
  {
    type: "file",
    label: "Upload Image",
    name: "image",
    placeholder: "Upload an Image",
  },
  {
    type: "button",
    label: "Submit",
    name: "submitButton",
    text: "Submit Maintainer",
  },
];

const AddMaintainerForm = () => {
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    console.log(values);

    dispatch(addMaintainer(values));
  };

  const {
    formValues,
    getRootProps,
    getInputProps,
    files,
    isDragActive,
    deleteFile,
    handleChange,
    handleSubmit,
  } = useForm(onSubmit);

  return (
    <Form>
      {formFields.map((field, index) => (
        <RenderFormField
          key={index}
          field={field}
          index={index}
          handleChange={handleChange}
          formValues={formValues}
          files={files}
          onClick={handleSubmit}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          deleteFile={deleteFile}
        />
      ))}
    </Form>
  );
};

const AddMaintainer = ({ open }) => {
  return (
    <>
      <Typography variant="h3">Add Maintainer</Typography>
      <AddMaintainerForm />
    </>
  );
};

export default AddMaintainer;
