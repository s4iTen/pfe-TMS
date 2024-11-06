import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/user/actions";
import { useNavigate } from "react-router-dom";

export function useSignUp() {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    accountType: "tenant",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAccountTypeChange = (value) => {
    setFormData({ ...formData, accountType: value });
  };

  const validateForm = () => {
    if (
      formData.email &&
      formData.firstName &&
      formData.lastName &&
      formData.password &&
      formData.password === formData.confirmPassword
    ) {
      setIsFormValid(true);
      setShowOnboarding(true);
    } else {
      alert("Please fill out all fields correctly.");
    }
  };

  function handleSubmit() {
    dispatch(addUser(formData));
    if (formData.accountType === "landlord") {
      navigate("/dashboard");
    } else {
      navigate("/dashboard");
    }
  }

  return {
    showOnboarding,
    isFormValid,
    formData,
    validateForm,
    handleChange,
    handleAccountTypeChange,
    handleSubmit,
  };
}
