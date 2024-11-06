import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

const convertFileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(",")[1]);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export function useFile() {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const newFile = {
        name: file.name,
        preview: URL.createObjectURL(file),
        progress: 0,
        completed: false,
        base64: "",
      };

      convertFileToBase64(file).then((base64) => {
        setFiles((prevFiles) =>
          prevFiles.map((f) => (f.name === newFile.name ? { ...f, base64 } : f))
        );
      });

      setFiles((prevFiles) => [...prevFiles, newFile]);

      const interval = setInterval(() => {
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.name === newFile.name
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        );
      }, 500);

      const checkCompletion = () => {
        setFiles((prevFiles) => {
          const updatedFiles = prevFiles.map((f) =>
            f.name === newFile.name && f.progress >= 100
              ? { ...f, completed: true }
              : f
          );
          const completedFile = updatedFiles.find(
            (f) => f.name === newFile.name && f.progress >= 100
          );
          if (completedFile) {
            clearInterval(interval);
          }
          return updatedFiles;
        });
      };

      const completionCheckInterval = setInterval(checkCompletion, 500);

      return () => {
        clearInterval(completionCheckInterval);
      };
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const deleteFile = useCallback((fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  }, []);

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return {
    files,
    setFiles,
    getRootProps,
    getInputProps,
    isDragActive,
    deleteFile,
  };
}
