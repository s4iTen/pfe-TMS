import React from "react";
import { Button } from "@mui/material";
import CustomInput from "../components/Input";
import CustomTextArea from "../components/TextArea";
import FileUpload from "../components/FileUpload";
import CustomDatePicker from "./DatePicker";
import CustomSelect from "./CustomSelect";

const RenderFormField = ({
  field,
  index,
  handleChange,
  formValues,
  errors,
  files,
  getRootProps,
  getInputProps,
  isDragActive,
  deleteFile,
  onClick,
}) => {
  switch (field.type) {
    case "text":
      return (
        <CustomInput
          key={index}
          label={field.label}
          type="text"
          placeholder={field.placeholder}
          name={field.name}
          value={formValues[field.name]}
          onChange={handleChange}
          helperText={field.helperText}
        />
      );
    case "email":
      return (
        <CustomInput
          key={index}
          label={field.label}
          type="email"
          placeholder={field.placeholder}
          name={field.name}
          value={formValues[field.name]}
          onChange={handleChange}
        />
      );
    case "number":
      return (
        <CustomInput
          key={index}
          label={field.label}
          type="number"
          placeholder={field.placeholder}
          name={field.name}
          value={formValues[field.name]}
          onChange={handleChange}
        />
      );
    case "textarea":
      return (
        <CustomTextArea
          key={index}
          label={field.label}
          placeholder={field.placeholder}
          name={field.name}
          value={formValues[field.name]}
          onChange={handleChange}
        />
      );
    case "date":
      return (
        <CustomDatePicker
          key={index}
          label={field.label}
          name={field.name}
          value={formValues[field.name]}
          onChange={handleChange}
        />
      );
    case "file":
      return (
        <FileUpload
          key={index}
          files={files}
          getRootProps={getRootProps}
          getInputProps={getInputProps}
          isDragActive={isDragActive}
          deleteFile={deleteFile}
        />
      );
    case "select":
      return (
        <CustomSelect
          key={index}
          handleChange={handleChange}
          label={field.label}
          options={field.options}
          value={formValues[field.name] || ""}
          name={field.name}
        />
      );
    case "button":
      return (
        <Button
          onClick={onClick}
          key={index}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          type="submit"
        >
          {field.text}
        </Button>
      );
    default:
      return null;
  }
};

export default RenderFormField;
