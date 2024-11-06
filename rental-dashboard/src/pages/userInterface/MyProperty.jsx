import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CardList from "../../components/CardList";
import { useModal } from "../../hooks/useModal";
import CustomModal from "../../components/CustomModal";
import Form from "../../components/Form";
import { Typography } from "@mui/material";
import RenderFormField from "../../components/RenderFormField";
import { useForm } from "../../hooks/useForm";
import { addExpence } from "../../store/expence/action";
import ToastProvider, { showToast } from "../../components/CustomToast";
import { getRent } from "../../store/rent/action";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner";
const formFields = [
  {
    type: "textarea",
    label: "Message",
    name: "message",
    placeholder: "Enter your message",
  },
  {
    type: "button",
    label: "Apply",
    name: "applyButton",
    text: "Rent this house",
  },
];

const MyProperty = () => {
  const darkMode = useSelector((state) => state.global.mode);
  const userId = useSelector((state) => state.global.userId);
  const users = useSelector((state) => state.userReducer.data);
  const { data, loading, error } = useFetch(
    getRent,
    (state) => state.rentReducer
  );
  const properties = useSelector((state) => state.propertyReducer.data);
  const { open, handleOpen, handleClose, id } = useModal();
  const { formValues, handleChange, handleSubmit } = useForm(onSubmit);
  const dispatch = useDispatch();
  async function onSubmit(values) {
    const rentedObject = data.find((rent) => rent._id === id);
    if (rentedObject) {
      const newData = {
        propertyId: rentedObject.property,
        ownerId: rentedObject.userOwner,
        ...values,
      };
      dispatch(addExpence(newData));

      showToast("Operation successful!", "✅", "success");
      handleClose();
    } else {
      showToast("Rent object not found", "⚠️", "error");
    }
  }
  const transformedData = data
    .filter((rent) => rent.userRent === userId)
    .map((rent) => {
      const userOwner = users.find((user) => user._id === rent.userOwner);
      const userRent = users.find((user) => user._id === rent.userRent);
      const property = properties.find((prop) => prop._id === rent.property);
      return {
        ...rent,
        userOwner: userOwner
          ? userOwner.firstName + " " + userOwner.lastName
          : "Unknown Owner",
        userRent: userRent
          ? userRent.firstName + " " + userRent.lastName
          : "Unknown Renter",
        property: property ? property.title : "Unknown Property",
        propertyImage: property ? property.photos[0] : "",
      };
    });
  if (loading === "loading") return <Spinner />;
  if (error) return <p>Error loading properties: {error}</p>;
  return (
    <section
      className={`py-12 ${darkMode === "dark" ? "bg-[#444]" : "bg-[#FFF]"}`}
    >
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl font-bold text-center mb-8 ${
            darkMode === "dark" ? "text-white" : "text-gray-800"
          }`}
        >
          My Properties
        </h2>
        <CardList
          data={transformedData}
          type={"rent"}
          handlePageChange={handleOpen}
        />
        {open && (
          <CustomModal onClose={handleClose} open={open}>
            <Form backgroundColor={"none"}>
              <Typography variant="h2" sx={{ textAlign: "center" }}>
                Apply for maintenance
              </Typography>
              {formFields.map((field, index) => (
                <RenderFormField
                  key={index}
                  field={field}
                  index={index}
                  formValues={formValues}
                  handleChange={handleChange}
                  onClick={handleSubmit}
                />
              ))}
            </Form>
          </CustomModal>
        )}
        <ToastProvider />
      </div>
    </section>
  );
};

export default MyProperty;
