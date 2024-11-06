import React, { useEffect, useState } from "react";
import PropertyComponent from "../../components/PropertyComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../components/Spinner";
import CustomModal from "../../components/CustomModal";
import { useModal } from "../../hooks/useModal";
import RenderFormField from "../../components/RenderFormField";
import Form from "../../components/Form";
import { useForm } from "../../hooks/useForm";
import { Typography } from "@mui/material";
import ToastProvider, { showToast } from "../../components/CustomToast";
import dayjs from "dayjs";
import { addRent } from "../../store/rent/action";

const formFields = [
  {
    type: "date",
    label: "Available From",
    name: "availableFrom",
    placeholder: "Select Start Date",
  },
  {
    type: "date",
    label: "Available To",
    name: "availableTo",
    placeholder: "Select End Date",
  },
  {
    type: "button",
    label: "Apply",
    name: "applyButton",
    text: "Rent this house",
  },
];

const SingleProperty = () => {
  const { _id } = useParams();
  const { formValues, handleChange, handleSubmit } = useForm(onSubmit);
  const [totalPrice, setTotalPrice] = useState(0);
  const property = useSelector((state) =>
    state.propertyReducer.data.find((prop) => prop._id === _id)
  );
  const userId = useSelector((state) => state.global.userId);
  const darkMode = useSelector((state) => state.global.mode);
  const navigate = useNavigate();
  const calculateTotalPrice = (startDate, endDate, dailyRent) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    if (start.isValid() && end.isValid()) {
      const days = end.diff(start, "day");
      return days * dailyRent;
    }
    return 0;
  };

  useEffect(() => {
    if (formValues.availableFrom && formValues.availableTo) {
      const startDate = dayjs(formValues.availableFrom).format("YYYY-MM-DD");
      const endDate = dayjs(formValues.availableTo).format("YYYY-MM-DD");
      const price = calculateTotalPrice(startDate, endDate, property.rent);
      setTotalPrice(price);
    } else {
      setTotalPrice(null);
    }
  }, [formValues, property]);
  const dispatch = useDispatch();
  function onSubmit(values) {
    const startDate = dayjs(values.availableFrom).format("YYYY-MM-DD");
    const endDate = dayjs(values.availableTo).format("YYYY-MM-DD");

    const data = {
      userRent: userId,
      userOwner: userId,
      property: property._id,
      startDate,
      endDate,
      totalPrice,
    };

    navigate("/payment", { state: data });
    handleClose();
    showToast("Operation successful!", "✅", "success");
  }

  const { open, handleOpen, handleClose } = useModal();

  if (!property) {
    return <Spinner />;
  }

  return (
    <section
      className={`py-12  ${darkMode === "dark" ? "bg-[#444]" : "bg-[#F2F2F2]"}`}
    >
      <div className="w-[90vw] mx-auto">
        <PropertyComponent
          property={property}
          ButtonText={"Aplly for leasing"}
          handleClick={handleOpen}
        />
        {open && (
          <CustomModal onClose={handleClose} open={open}>
            <Form backgroundColor={"none"}>
              <Typography variant="h2" sx={{ textAlign: "center" }}>
                Apply for leasing for {property.title}
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
              {totalPrice ? (
                <Typography variant="h6" sx={{ textAlign: "right" }}>
                  Total Price: ${totalPrice}
                </Typography>
              ) : null}
            </Form>
          </CustomModal>
        )}
        <ToastProvider />
      </div>
    </section>
  );
};

export default SingleProperty;
