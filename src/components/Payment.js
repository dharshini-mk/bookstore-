import React, { useState } from "react";

const Payment = () => {
  const [upiId, setUpiId] = useState("");

  const pay = () => {
    // Simulate UPI payment validation
    if (upiId === "mkdharshini24@okicici") {
      alert("Payment successful! Order confirmed.");
    } else {
      alert("Invalid UPI ID.");
    }
  };

  return (
    <div>
      <h2>Payment</h2>
      <input
        type="text"
        placeholder="Enter UPI ID"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
      />
      <button onClick={pay}>Pay</button>
    </div>
  );
};

export default Payment;
