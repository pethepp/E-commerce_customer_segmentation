import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

function Result({ cluster }) {
  if (cluster === null) return null;

  // Dummy data for visualization (Can be modified based on actual segmentation)
  const data = [
    { name: "Segment 0", customers: cluster === 0 ? 100 : 30 },
    { name: "Segment 1", customers: cluster === 1 ? 100 : 30 },
    { name: "Segment 2", customers: cluster === 2 ? 100 : 30 },
    { name: "Segment 3", customers: cluster === 3 ? 100 : 30 },
    { name: "Segment 4", customers: cluster === 4 ? 100 : 30 },
  ];

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Predicted Cluster: {cluster}</h2>
      
      <ResponsiveContainer width="80%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="customers" fill={cluster === 0 ? "#8884d8" : cluster === 1 ? "#82ca9d" : cluster === 2 ? "#ffc658" : cluster === 3 ? "#ff7300" : "#d84315"} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Result;
