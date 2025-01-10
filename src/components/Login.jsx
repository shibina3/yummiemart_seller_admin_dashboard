import React, { useState } from "react";

function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpEnabled, setIsOtpEnabled] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const sendOTP = () => {
    // Logic to send OTP
    setIsOtpEnabled(true);
    setAlertMessage("OTP sent successfully!");
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleLogin = async () => {
    const response = await fetch("http://localhost:4000/verify/otp", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ mobile, otp }),
    });
    const data = await response.json();
    if( ["seller", "admin"].includes(data.userType) && !data.isNewUser ) {
        console.log("Logged in with OTP:", otp);
        localStorage.setItem("mobile", mobile);
    } else {
        alert("You are not authorized to login! Install the app and Become a Seller or Admin.");
    }
  };

  return (
    <div className="login-page">
      {showAlert && <div className="alert-container">{alertMessage}</div>}
      <div className="login-container">
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
