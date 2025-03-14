import { useState, useEffect } from "react";
import UploadForm from "./components/UploadForm";

function App() {
  const [result, setResult] = useState(null);
  const [data, setData] = useState([]);
  const [clusterCounts, setClusterCounts] = useState({});

  useEffect(() => {
    if (result !== null) {
      // Generate random feature values for testing output
      const newPoint = { x: Math.random() * 10, y: Math.random() * 10, cluster: result };

      // Update data and cluster counts safely
      setData((prevData) => [...prevData, newPoint]);

      setClusterCounts((prevCounts) => ({
        ...prevCounts,
        [result]: (prevCounts[result] || 0) + 1
      }));
    }
  }, [result]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Customer Segmentation</h1>
      <UploadForm onResult={setResult} />
      {result !== null && <h2>Predicted Cluster: {result}</h2>}
    </div>
  );
}

export default App;
