import React, { useState } from "react";

const Signup = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOtp = () => {
    // Call backend to send OTP
    alert("OTP sent to " + phone);
    setOtpSent(true);
  };

  const verifyOtp = () => {
    // Verify OTP logic
    alert("Phone verified successfully!");
  };

  return (
    <div>
      <h2>Signup</h2>
      {!otpSent ? (
        <>
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default Signup;
