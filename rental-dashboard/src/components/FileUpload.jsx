import React from "react";
import { MdFileUpload, MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const FileUpload = ({
  getRootProps,
  getInputProps,
  isDragActive,
  files,
  deleteFile,
}) => {
  const darkMode = useSelector((state) => state.global.mode);

  return (
    <div>
      <h3
        className={`text-left font-semibold mb-2 ${
          darkMode === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Upload Property Image
      </h3>
      <div
        {...getRootProps()}
        className={`w-full flex items-center justify-center border-2 border-dashed rounded-lg p-4 text-center ${
          darkMode === "dark"
            ? "bg-gray-600 border-gray-400"
            : "bg-gray-200 border-gray-400"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center">
          <MdFileUpload
            className={`text-4xl mb-2 ${
              darkMode === "dark" ? "text-white" : "text-gray-700"
            }`}
          />
          <p
            className={`${
              darkMode === "dark" ? "text-gray-300" : "text-gray-600"
            } mb-2`}
          >
            {isDragActive
              ? "Drop the files here..."
              : "Drag 'n' drop some files here, or click to select files"}
          </p>
        </div>
      </div>

      <div className="mt-4">
        {files.map((file, index) => (
          <div
            key={index}
            className={`flex items-center mb-2 p-2 rounded-lg ${
              darkMode === "dark" ? "bg-gray-700" : "bg-gray-100"
            }`}
          >
            <img
              src={file.preview}
              alt="Preview"
              className="w-10 h-10 object-cover mr-3 rounded-lg"
            />
            <span
              className={`mr-4 ${
                darkMode === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {file.name}
            </span>
            <div className="flex-1 bg-gray-300 dark:bg-gray-500 rounded-full h-2 mr-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${file.progress}%` }}
              ></div>
            </div>
            <span
              className={`${
                darkMode === "dark" ? "text-white" : "text-gray-900"
              } mr-2`}
            >
              {file.completed ? "Completed" : `${file.progress}%`}
            </span>
            <button
              onClick={() => deleteFile(file.name)}
              className="text-red-500"
            >
              <MdDelete className="text-2xl" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUpload;
