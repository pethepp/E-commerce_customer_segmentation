# 🌍 Customer Segmentation Web App

This is a **Customer Segmentation Web Application** that allows users to upload customer data and receive cluster predictions. The project includes both **backend (Flask API)** and **frontend (ReactJS-based UI with data visualizations)**.

---

## 📚 Project Structure

```
ecommerce-segmentation/
│── backend/                  # Flask backend for ML model
│   │── app.py                # Main Flask API
│   │── model.pkl             # Trained ML model
│   │── requirements.txt      # Backend dependencies
│   └── README.md             # Backend documentation
│
│── frontend/                 # React frontend
│   │── public/               # Public assets (index.html, favicon, etc.)
│   │── src/                  # Source code
│   │   │── components/       # Reusable React components
│   │   │   └── UploadForm.jsx  # File upload form
│   │   │── App.jsx           # Main React component
│   │   │── index.js          # Entry point for React app
│   │   └── styles.css        # Custom styles
│   │── package.json          # Frontend dependencies & scripts
│   └── README.md             # Frontend documentation
│
│── README.md                 # Main documentation
└── setup.sh                  # Setup script (optional)
```

---

## 🚀 How to Start the Project

### **1⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/ecommerce-segmentation.git
cd ecommerce-segmentation
```

---

## 🖥 Backend (Flask) Setup
### **2⃣ Install Dependencies**
```sh
cd backend
pip install -r requirements.txt
```

### **3⃣ Run the Flask API**
```sh
python app.py
```
**Backend will start at**: `http://127.0.0.1:5000/`

---

## 🌐 Frontend (React) Setup
### **4⃣ Install Node.js Dependencies**
```sh
cd frontend
npm install
```

### **5⃣ Start the React App**
```sh
npm start
```
**Frontend will run at**: `http://localhost:3000/`

---

## 📊 Features
✅ **Upload customer data** to predict clusters  
✅ **Cluster Visualization** using charts  
✅ **Customer segmentation insights**  

---

## 🗃 API Endpoints
- `POST /predict` → Takes customer data & returns cluster number + name

Example Request:
```json
{
  "features": [135, 5, 98095]
}
```
Example Response:
```json
{
  "cluster": 1,
  "segment": "Regular Shoppers"
}
```

---

## 🛠 Technologies Used
- **Backend**: Python, Flask, Scikit-learn  
- **Frontend**: React, Recharts, JavaScript  
- **Visualization**: Scatter Plot, Bar Chart, Pie Chart  

---

## 🎯 Future Enhancements
💡 Enhance UI with **better charts**  
💡 Improve **error handling** in backend  
💡 Add **database storage** for customer history  

---

## 👌 Contributors
- **Your Name** - Developer  
- **Other Team Members**  

---

## 📚 License
This project is licensed under the MIT License.

---

Happy Coding! 🚀

