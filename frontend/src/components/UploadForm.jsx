import { useState } from "react";

function UploadForm({ onResult }) {
  const [input, setInput] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const featureArray = input.split(",").map(Number); // Convert input to numbers
      const requestBody = [{ features: featureArray }]; // Format as list of objects

      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Send as list
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response:", data);

      if (Array.isArray(data) && data.length > 0) {
        onResult(data[0].cluster); // Extract first result’s cluster
      } else {
        onResult("Error: Invalid response");
      }
    } catch (error) {
      console.error("Error fetching prediction:", error);
      onResult(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Enter Customer Data:</label>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="135, 5, 98095"
        required
      />
      <button type="submit">Predict</button>
    </form>
  );
}

export default UploadForm;
