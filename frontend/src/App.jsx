import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UploadForm from "./components/UploadForm";
import Dashboard from "./components/Dashboard";

const clusterNames = {
  0: "Loyal Customer",
  1: "Regular Shopper",
  2: "Churned Customer",
  3: "Potential High-Value",
};

function Home() {
  const [result, setResult] = useState(null);
  const [showSegmentation, setShowSegmentation] = useState(false);

  return (
    <div style={{ 
      textAlign: "center", 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      background: showSegmentation ? "#f8f9fa" : "linear-gradient(135deg, #667eea, #764ba2)", 
      color: showSegmentation ? "#333" : "white", 
      fontFamily: "Arial, sans-serif", 
      padding: "20px" 
    }}>
      {!showSegmentation ? (
        <div style={{ 
          background: "rgba(255, 255, 255, 0.2)", 
          padding: "50px", 
          borderRadius: "15px", 
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", 
          backdropFilter: "blur(10px)" 
        }}>
          <h1>Welcome to Customer Segmentation</h1>
          <p style={{ fontSize: "18px", marginBottom: "20px" }}>Analyze and categorize your customers efficiently.</p>
          <button 
            onClick={() => setShowSegmentation(true)} 
            style={{ 
              padding: "12px 24px", 
              fontSize: "18px", 
              backgroundColor: "#ff7e5f", 
              color: "white", 
              border: "none", 
              borderRadius: "8px", 
              cursor: "pointer", 
              transition: "0.3s" 
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#ff5f5f"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#ff7e5f"}
          >
            Proceed
          </button>
        </div>
      ) : (
        <div style={{ 
          background: "white", 
          padding: "40px", 
          borderRadius: "15px", 
          boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.15)", 
          maxWidth: "500px", 
          width: "100%" 
        }}>
          <h1 style={{ color: "#444", marginBottom: "20px" }}>Customer Segmentation</h1>
          <UploadForm onResult={setResult} />
          {result !== null && (
            <h2 style={{ 
              color: "#ff7e5f", 
              marginTop: "20px", 
              fontSize: "20px", 
              fontWeight: "bold" 
            }}>
              Predicted Cluster: {result} - {clusterNames[result] || "Unknown Segment"}
            </h2>
          )}
          {/* Navigate to Dashboard */}
          <Link to="/dashboard">
            <button 
              style={{ 
                marginTop: "20px", 
                padding: "10px 20px", 
                fontSize: "16px", 
                backgroundColor: "#28a745", 
                color: "white", 
                border: "none", 
                borderRadius: "5px", 
                cursor: "pointer" 
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = "#218838"}
              onMouseOut={(e) => e.target.style.backgroundColor = "#28a745"}
            >
              View Dashboard
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
