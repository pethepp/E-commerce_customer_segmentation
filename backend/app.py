from flask import Flask, request, jsonify
import joblib
import numpy as np
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained model and scaler
kmeans = joblib.load("kmeans_model.pkl")
scaler = joblib.load("scaler.pkl")

# Define cluster-to-segment mapping
segment_mapping = {
    0: "Loyal Customers",
    1: "Regular Shoppers",
    2: "Churned Customers",
    3: "Potential High-Value"
}

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json  # Expecting a list of dictionaries
        if not isinstance(data, list):
            return jsonify({"error": "Input must be a list of feature objects"}), 400

        predictions = []
        for entry in data:
            features = np.array(entry["features"]).reshape(1, -1)  # Convert input to array
            scaled_features = scaler.transform(features)
            cluster = kmeans.predict(scaled_features)[0]
            
            predictions.append({
                "features": entry["features"],
                "cluster": int(cluster),
                "segment": segment_mapping.get(cluster, "Unknown Segment")
            })
        
        return jsonify(predictions)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=False)
