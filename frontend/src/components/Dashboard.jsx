import { Bar, Radar } from "react-chartjs-2";
import { Link, useLocation } from "react-router-dom";
import { Chart as ChartJS, RadialLinearScale, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(RadialLinearScale, BarElement, Tooltip, Legend, CategoryScale, LinearScale);

function Dashboard() {
  const location = useLocation();
  const { state } = location;
  const customer = state?.customer || null;

  if (!customer) {
    return (
      <div style={{ textAlign: "center", padding: "30px" }}>
        <h1>No customer data available</h1>
        <Link to="/">
          <button style={{ padding: "10px 20px", fontSize: "16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Back to Home
          </button>
        </Link>
      </div>
    );
  }

  // Sample average RFM values for the customer's segment
  const segmentAverages = {
    "Loyal Customers": [70, 800, 5],
    "Regular Shoppers": [50, 500, 3],
    "Churned Customers": [20, 200, 1],
    "Potential High-Value": [60, 900, 4],
  };

  const customerRFM = customer.features; // Assuming it's in [Recency, Frequency, Monetary] format
  const segmentName = customer.segment || "Unknown Segment";
  const segmentAvg = segmentAverages[segmentName] || [0, 0, 0];

  const radarData = {
    labels: ["Recency", "Frequency", "Monetary"],
    datasets: [
      {
        label: "Customer RFM",
        data: customerRFM,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
      {
        label: `Avg ${segmentName}`,
        data: segmentAvg,
        backgroundColor: "rgba(255,99,132,0.4)",
        borderColor: "rgba(255,99,132,1)",
      },
    ],
  };

  const barData = {
    labels: ["Recency", "Frequency", "Monetary"],
    datasets: [
      {
        label: "Customer",
        data: customerRFM,
        backgroundColor: "#4bc0c0",
      },
      {
        label: `Avg ${segmentName}`,
        data: segmentAvg,
        backgroundColor: "#ff7e5f",
      },
    ],
  };

  return (
    <div style={{ textAlign: "center", padding: "30px", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "#444" }}>Customer Insights</h1>
      <h2 style={{ color: "#ff7e5f" }}>Segment: {segmentName}</h2>

      {/* Radar Chart for RFM Comparison */}
      <div style={{ width: "50%", margin: "20px auto" }}>
        <h2>RFM Comparison</h2>
        <Radar data={radarData} />
      </div>

      {/* Bar Chart for RFM Breakdown */}
      <div style={{ width: "50%", margin: "20px auto" }}>
        <h2>Customer vs Segment Average</h2>
        <Bar data={barData} />
      </div>

      <Link to="/">
        <button style={{ marginTop: "20px", padding: "10px 20px", fontSize: "16px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Back to Home
        </button>
      </Link>
    </div>
  );
}

export default Dashboard;