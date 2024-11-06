import React, { useState } from "react";
import Container from "../components/Container";
import CustomInput from "../components/Input";
import {
  Button,
  IconButton,
  InputAdornment,
  Typography,
  useTheme,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { formData, handleSubmit, handleChange } = useLogin();
  const theme = useTheme();
  return (
    <div className="flex items-center justify-center h-screen">
      <Container title={"Please Login your account."}>
        <CustomInput
          label={"Email"}
          type={"email"}
          name={"email"}
          onChange={handleChange}
          value={formData.email}
        />
        <CustomInput
          name={"password"}
          onChange={handleChange}
          label={"Password"}
          type={showPassword ? "text" : "password"}
          value={formData.password}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
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
          Log In
        </Button>
        <Typography>
          New member here? <Link to={"/signup"}>Register Now</Link>
        </Typography>
      </Container>
    </div>
  );
};

export default Login;
