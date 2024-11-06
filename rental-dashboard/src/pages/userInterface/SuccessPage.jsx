import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const sessionId = new URLSearchParams(location.search).get("session_id");
  const [countdown, setCountdown] = useState(3);
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/verify-payment?session_id=${sessionId}`
        );
        if (response.data.success) {
          console.log("Payment verified, rent created successfully.");
        } else {
          console.log("Payment verification failed.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate("/");
    }

    return () => clearInterval(timer);
  }, [countdown, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <h1 className="text-4xl font-bold mb-4">Thank you for your payment!</h1>
      <p className="text-lg">
        You will be redirected to the home page in {countdown} seconds.
      </p>
    </div>
  );
};

export default SuccessPage;
