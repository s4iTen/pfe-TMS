import { createTheme, ThemeProvider } from "@mui/material/styles";
import { themeSettings } from "./theme";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { CssBaseline } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { getProperty } from "./store/property/action";
import SpinnerFullPage from "./pages/userInterface/SpinnerFullPage";
import { setUserId } from "./store/global/slice";
import { jwtDecode } from "jwt-decode";
import { getRent } from "./store/rent/action";
import { getExpence } from "./store/expence/action";
import { getUser } from "./store/user/actions";
import { getMaintainer } from "./store/maintainer/action";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { ProtectedRoute } from "./pages/ProtectedRoute";
import RentedProperties from "./pages/dashboard/RentedProperties";

const LandingPage = lazy(() => import("./pages/userInterface/LandingPage"));
const Properties = lazy(() => import("./pages/userInterface/Properties"));
const Agents = lazy(() => import("./pages/userInterface/Agents"));
const Blog = lazy(() => import("./pages/userInterface/Blog"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/userInterface/PageNotFound"));
const LandingLayout = lazy(() => import("./pages/userInterface/LandingLayout"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const DashLayout = lazy(() => import("./pages/dashboard/DashLayout"));
const MyPropreties = lazy(() => import("./pages/dashboard/MyPropreties"));
const AddProprety = lazy(() => import("./pages/dashboard/AddProprety"));
const Maintainer = lazy(() => import("./pages/dashboard/Maintainer"));
const Contacts = lazy(() => import("./pages/dashboard/Contacts"));
const AddMaintainer = lazy(() => import("./pages/dashboard/AddMaintainer"));
const Property = lazy(() => import("./pages/dashboard/Property"));
const MapPage = lazy(() => import("./pages/dashboard/MapPage"));
const Expences = lazy(() => import("./pages/dashboard/Expences"));
const SingleProperty = lazy(() =>
  import("./pages/userInterface/SingleProperty")
);
const MyProperty = lazy(() => import("./pages/userInterface/MyProperty"));
const Payment = lazy(() => import("./pages/userInterface/Payment"));
const SuccessPage = lazy(() => import("./pages/userInterface/SuccessPage"));

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const stripePromise = loadStripe(
    "pk_test_51QHMpfIYhSdqZGWMYN2Qq6gFhAEKfbAK5boGRFspVh5CUOAN72iHYR1Rya4pIuwHIg1nSaC359aHE9fPBufnIbwU00SgHxA1Et"
  );

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        dispatch(setUserId(decoded.id));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token, dispatch]);

  useEffect(() => {
    dispatch(getProperty());
    dispatch(getRent());
    dispatch(getMaintainer());
    dispatch(getUser());
    dispatch(getExpence());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route element={<LandingLayout theme={theme} />}>
                <Route path="/*" replace element={<PageNotFound />} />
                <Route index element={<LandingPage />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/agents" element={<Agents />} />
                <Route path="/blog" element={<Blog />} />
                <Route
                  path="/properties/:_id"
                  element={
                    token ? <SingleProperty /> : <Navigate to="/login" />
                  }
                />
                <Route
                  path="/rents"
                  element={token ? <MyProperty /> : <Navigate to="/login" />}
                />
                <Route
                  path="/payment"
                  element={token ? <Payment /> : <Navigate to="/login" />}
                />
                <Route
                  path="/success"
                  element={token ? <SuccessPage /> : <Navigate to="/login" />}
                />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route
                  element={
                    <DashLayout setOpen={setOpen} open={open} theme={theme} />
                  }
                >
                  <Route path="/add-Maintainer" element={<AddMaintainer />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/property" element={<MyPropreties />} />
                  <Route path="/property/:_id" element={<Property />} />
                  <Route
                    path="/rented-properties"
                    element={<RentedProperties />}
                  />
                  <Route path="/add-property" element={<AddProprety />} />
                  <Route path="/maintainer" element={<Maintainer />} />
                  <Route path="/expences" element={<Expences />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/MapPage" element={<MapPage />} />
                </Route>
              </Route>

              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </Elements>
    </ThemeProvider>
  );
}

export default App;
