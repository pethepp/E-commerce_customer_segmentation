import { useState, useEffect } from "react";
import UploadForm from "./components/UploadForm";
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar,
  PieChart, Pie, Cell,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";

// Colors for clusters
const COLORS = ["#ff0000", "#007bff", "#28a745", "#ffc107", "#6f42c1"];

function App() {
  const [result, setResult] = useState(null);
  const [data, setData] = useState([]);
  const [clusterCounts, setClusterCounts] = useState({});

  useEffect(() => {
    if (result !== null) {
      // Generate random feature values for visualization
      const newPoint = { x: Math.random() * 10, y: Math.random() * 10, cluster: result };

      // Update data
      setData([...data, newPoint]);

      // Update cluster count
      setClusterCounts(prev => ({
        ...prev,
        [result]: (prev[result] || 0) + 1
      }));
    }
  }, [result]);

  // Prepare data for bar chart and pie chart
  const barChartData = Object.keys(clusterCounts).map(cluster => ({
    cluster: `Cluster ${cluster}`,
    count: clusterCounts[cluster]
  }));

  const pieChartData = barChartData.map(item => ({
    name: item.cluster,
    value: item.count
  }));

  // Radar chart data (simulated feature values for clusters)
  const radarData = [
    { feature: "Income", cluster0: 50, cluster1: 80, cluster2: 60 },
    { feature: "Spending", cluster0: 30, cluster1: 90, cluster2: 70 },
    { feature: "Savings", cluster0: 70, cluster1: 50, cluster2: 80 }
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Customer Segmentation</h1>
      <UploadForm onResult={setResult} />
      {result !== null && <h2>Predicted Cluster: {result}</h2>}

      {/* Scatter Plot */}
      <h2>Cluster Visualization</h2>
      <ResponsiveContainer width="80%" height={400}>
        <ScatterChart>
          <CartesianGrid />
          <XAxis type="number" dataKey="x" name="Feature 1" />
          <YAxis type="number" dataKey="y" name="Feature 2" />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          {Object.keys(clusterCounts).map((c, i) => (
            <Scatter key={c} name={`Cluster ${c}`} data={data.filter(d => d.cluster == c)} fill={COLORS[i % COLORS.length]} />
          ))}
        </ScatterChart>
      </ResponsiveContainer>

      {/* Bar Chart */}
      <h2>Customer Count per Cluster</h2>
      <ResponsiveContainer width="60%" height={300}>
        <BarChart data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="cluster" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#007bff" />
        </BarChart>
      </ResponsiveContainer>

      {/* Pie Chart */}
      <h2>Cluster Distribution</h2>
      <ResponsiveContainer width="40%" height={300}>
        <PieChart>
          <Pie data={pieChartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Radar Chart */}
      <h2>Cluster Feature Comparison</h2>
      <ResponsiveContainer width="50%" height={300}>
        <RadarChart outerRadius={90} data={radarData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="feature" />
          <PolarRadiusAxis />
          <Radar name="Cluster 0" dataKey="cluster0" stroke="#ff0000" fill="#ff0000" fillOpacity={0.6} />
          <Radar name="Cluster 1" dataKey="cluster1" stroke="#007bff" fill="#007bff" fillOpacity={0.6} />
          <Radar name="Cluster 2" dataKey="cluster2" stroke="#28a745" fill="#28a745" fillOpacity={0.6} />
          <Legend />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default App;
