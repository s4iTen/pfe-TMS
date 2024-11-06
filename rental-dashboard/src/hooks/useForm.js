import { useState, useEffect } from "react";
import { useFile } from "./useFile";

export const useForm = (onSubmit) => {
  const [formValues, setFormValues] = useState({});

  const {
    getRootProps,
    getInputProps,
    files,
    setFiles,
    isDragActive,
    deleteFile,
  } = useFile();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };



  useEffect(() => {
    if (files.length > 0) {
      const base64Files = files.map((file) => file.base64);

      setFormValues((prevValues) => ({
        ...prevValues,
        uploadedFiles: base64Files,
      }));
    }
  }, [files]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
    setFormValues({});
    setFiles([]);
  };

  return {
    setFormValues,
    formValues,
    getRootProps,
    getInputProps,
    files,
    isDragActive,
    deleteFile,
    handleChange,
    handleSubmit,
  };
};
