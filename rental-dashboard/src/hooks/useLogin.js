import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: formData.email,
        password: formData.password,
      });

      window.localStorage.setItem("token", response.data.token);

      const decoded = jwtDecode(response.data.token);

      if (decoded.userType === "landlord") {
        navigate("/dashboard");
      } else if (decoded.userType === "tenant") {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return { formData, handleSubmit, handleChange };
}
