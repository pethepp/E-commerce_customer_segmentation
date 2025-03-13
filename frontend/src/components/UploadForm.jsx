import { useState } from "react";

const UploadForm = ({ onResult }) => {
  const [features, setFeatures] = useState("");

  const handleChange = (e) => {
    setFeatures(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const featureArray = features.split(",").map(Number);

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features: featureArray }),
    });

    const data = await response.json();
    onResult(data.cluster);
  };

  return (
    <div>
      <h2>Enter Customer Data:</h2>
      <input type="text" value={features} onChange={handleChange} placeholder="Enter features, comma-separated" />
      <button onClick={handleSubmit}>Predict</button>
    </div>
  );
};

export default UploadForm;
