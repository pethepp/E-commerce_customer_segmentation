import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Result({ cluster }) {
  if (cluster === null || cluster === "Error: Invalid response" || cluster === "Error: Failed to fetch") {
    return <h2 style={{ color: "red", textAlign: "center" }}>Error: Unable to determine cluster.</h2>;
  }

  // Generate data dynamically for better visualization
  const data = Array.from({ length: 5 }, (_, index) => ({
    name: `Segment ${index}`,
    customers: cluster === index ? 100 : 30,
  }));

  // Assign colors based on cluster index
  const clusterColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d84315"];
  const fillColor = clusterColors[cluster] || "#8884d8"; // Default color

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Predicted Cluster: {cluster}</h2>

      <ResponsiveContainer width="80%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="customers" fill={fillColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Result;
