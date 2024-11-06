import React from "react";
import Form from "../../components/Form";
import { Typography } from "@mui/material";
import RenderFormField from "../../components/RenderFormField";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { addProperty } from "../../store/property/action";
import ToastProvider, { showToast } from "../../components/CustomToast";

const formFields = [
  {
    type: "text",
    label: "Title",
    name: "title",
    placeholder: "Enter Property Title",
  },
  {
    type: "textarea",
    label: "Description",
    name: "description",
    placeholder: "Write About Property",
  },
  {
    type: "number",
    label: "Bedrooms",
    name: "bedrooms",
    placeholder: "Enter Number of Bedrooms",
  },
  {
    type: "number",
    label: "Bathrooms",
    name: "bathrooms",
    placeholder: "Enter Number of Bathrooms",
  },
  {
    type: "number",
    label: "Rent",
    name: "rent",
    placeholder: "Enter Rent Amount",
  },
  {
    type: "text",
    label: "Address",
    name: "adress",
    placeholder: "Enter Full Address",
    helperText:
      "Use this format please: 321 Beachfront Road, San Diego, CA 92101",
  },
  {
    type: "file",
    label: "Upload Property Image",
    name: "photos",
    multiple: true,
  },
  {
    type: "button",
    label: "Apply",
    name: "applyButton",
    text: "Applying For Leasing",
  },
];

const AddPropertyForm = ({ formFields }) => {
  const userId = useSelector((state) => state.global.userId);
  const dispatch = useDispatch();
  const onSubmit = (values) => {
    const newData = {
      ...values,
      userOwner: userId,
    };
    dispatch(addProperty(newData));
    showToast("Operation successful!", "✅", "success");
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

const AddProperty = () => {
  return (
    <>
      <Typography variant="h3">Add Property</Typography>
      <AddPropertyForm formFields={formFields} />
      <ToastProvider />
    </>
  );
};

export default AddProperty;
