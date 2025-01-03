import React, { useState } from "react";

const Login = () => {
  const [phone, setPhone] = useState("");

  const login = () => {
    // Call backend for login
    alert("Logged in with " + phone);
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
