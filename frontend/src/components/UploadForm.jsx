import { useState } from "react";

function UploadForm({ onResult }) {
  const [recency, setRecency] = useState("");
  const [frequency, setFrequency] = useState("");
  const [monetary, setMonetary] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!recency || !frequency || !monetary) {
      onResult("Error: Please enter all values.");
      return;
    }

    try {
      const featureArray = [Number(recency), Number(frequency), Number(monetary)];

      if (featureArray.some(isNaN)) {
        throw new Error("All inputs must be numeric.");
      }

      const requestBody = [{ features: featureArray }];

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);

      if (Array.isArray(data) && data.length > 0) {
        onResult(data[0].cluster);
      } else {
        onResult("Error: Invalid response");
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
      onResult(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <label style={{ fontWeight: "bold" }}>Enter RFM Data:</label>
      
      <input
        type="text"
        value={recency}
        onChange={(e) => setRecency(e.target.value)}
        placeholder="Recency (Days Since Last Purchase)"
        required
        style={inputStyle}
      />
      
      <input
        type="text"
        value={frequency}
        onChange={(e) => setFrequency(e.target.value)}
        placeholder="Frequency (Number of Purchases)"
        required
        style={inputStyle}
      />
      
      <input
        type="text"
        value={monetary}
        onChange={(e) => setMonetary(e.target.value)}
        placeholder="Monetary (Total Spend)"
        required
        style={inputStyle}
      />

      <button type="submit" style={buttonStyle}>Predict</button>
    </form>
  );
}

const inputStyle = {
  padding: "10px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
  width: "100%",
};

const buttonStyle = {
  padding: "12px",
  fontSize: "16px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "0.3s",
};

export default UploadForm;