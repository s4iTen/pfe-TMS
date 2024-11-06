import React from "react";
import { Box, Button, Radio, Typography, useTheme } from "@mui/material";
import Container from "./Container";
import CustomInput from "./Input";
import object from "../assets/OBJECTS.png";
import { useSignUp } from "../hooks/useSIgnUp";

const AccountTypeCard = ({
  title,
  description,
  icon,
  isSelected,
  onChange,
}) => {
  return (
    <Box
      sx={{
        border: isSelected ? "2px solid #00BFFF" : "2px solid transparent",
        borderRadius: 2,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        backgroundColor: "#1E1E1E",
        color: "#FFF",
        cursor: "pointer",
        transition: "border-color 0.3s",
        "&:hover": {
          borderColor: isSelected ? "#00BFFF" : "#444",
        },
      }}
      onClick={onChange}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          marginBottom: 1,
        }}
      >
        <div className="w-[10vw] flex items-center justify-between">
          <div>
            <Typography variant="h6" sx={{ marginLeft: 1 }}>
              {icon}
              {title}
            </Typography>
          </div>
          <Radio
            checked={isSelected}
            onChange={onChange}
            value={title.toLowerCase()}
            sx={{ color: "#00BFFF", marginLeft: "auto" }}
          />
        </div>
      </Box>
      <Typography variant="body2" sx={{ color: "#B0B0B0" }}>
        {description}
      </Typography>
    </Box>
  );
};

const RegistrationForm = () => {
  const theme = useTheme();
  const {
    showOnboarding,
    formData,
    validateForm,
    handleChange,
    handleAccountTypeChange,
    handleSubmit,
  } = useSignUp();

  return (
    <Box sx={{ p: 2 }}>
      {!showOnboarding ? (
        <Container>
          <CustomInput
            fullWidth
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <CustomInput
            fullWidth
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <CustomInput
            fullWidth
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <CustomInput
            fullWidth
            name="password"
            label="Create Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <CustomInput
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            sx={{ marginBottom: 2 }}
          />
          <Button
            onClick={validateForm}
            size="large"
            sx={{
              bgcolor:
                theme.palette.mode === "dark"
                  ? "background.default"
                  : theme.palette.primary.main,
              color: "#fff",
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "#222"
                    : theme.palette.primary.dark,
                color: "#fff",
              },
            }}
          >
            Next
          </Button>
        </Container>
      ) : (
        <Container hasHeader={false}>
          <div className="w-full flex items-center justify-center">
            <img src={object} alt="object" className="py-4 w-[5vw]" />
          </div>
          <Typography sx={{ textAlign: "center" }} variant="h5">
            Account Type
          </Typography>
          <Typography sx={{ textAlign: "center" }} variant="body1">
            Choose the account type that suits your needs. Each has a different
            set of tabs and features.
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <AccountTypeCard
              title="Tenant"
              description="Find a place & pay rent online."
              icon={
                <span role="img" aria-label="tenant">
                  🏠
                </span>
              }
              isSelected={formData.accountType === "tenant"}
              onChange={() => handleAccountTypeChange("tenant")}
            />
            <AccountTypeCard
              title="Landlord"
              description="Accept rent online & manage rentals."
              icon={
                <span role="img" aria-label="landlord">
                  👨‍💼
                </span>
              }
              isSelected={formData.accountType === "landlord"}
              onChange={() => handleAccountTypeChange("landlord")}
            />
          </Box>
          <Button
            onClick={handleSubmit}
            size="large"
            sx={{
              bgcolor:
                theme.palette.mode === "dark"
                  ? "background.default"
                  : theme.palette.primary.main,
              color: "#fff",
              "&:hover": {
                bgcolor:
                  theme.palette.mode === "dark"
                    ? "#222"
                    : theme.palette.primary.dark,
                color: "#fff",
              },
            }}
          >
            Create Account
          </Button>
        </Container>
      )}
    </Box>
  );
};

export default RegistrationForm;
