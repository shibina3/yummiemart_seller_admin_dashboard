import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const sendOTP = () => {
    // Logic to send OTP
    setIsOtpEnabled(true);
    setAlertMessage("OTP sent successfully!");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleLogin = async () => {
    const response = await fetch("https://akk31sm8ig.execute-api.us-east-1.amazonaws.com/default", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, otp, path: "/verify/otp" }),
    });
    const { body } = await response.json();
    if( ["seller", "admin"].includes(body.userType) && !body.isNewUser ) {
        localStorage.setItem("mobile", mobile);
        if(body.userType === "admin") {
          navigate("/verify-sellers");
          window.location.reload();
        } else {
          navigate("/add-product");
          window.location.reload();
        }
    } else {
        alert("You are not authorized to login! Install the app and Become a Seller or Admin.");
    }
  };

  return (
    <div className="login-page">
      {showAlert && <div className="alert-container">{alertMessage}</div>}
      <div className="login-container">
      <h2 className="yummie-heading"><span className="orange">Yummie</span> <span className="blue">Mart</span></h2>
        <h2 className="heading">Login to Your Account</h2>
        <p className="description">
        Your gateway to seamless business management.
        </p>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="input"
          />
          {mobile.length === 10 && !isOtpEnabled && (
            <button className="send-otp-button" onClick={sendOTP}>
              Send
            </button>
          )}
          {mobile.length === 10 && isOtpEnabled && (
            <span className="verify-icon">✔</span>
          )}
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className={`input ${!isOtpEnabled ? "disabled" : ""}`}
            disabled={!isOtpEnabled}
          />
        </div>
        <div className="input-group">
        <button
          className={`login-button ${otp.length < 4 ? "disabled" : ""}`}
          onClick={handleLogin}
          disabled={otp.length < 4}
        >
          Login
        </button>
        </div>

        <p className="policy-text">
          By clicking on “Login” you are agreeing to our{" "}
          <a href="/terms" className="link-text">
            terms of use
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
