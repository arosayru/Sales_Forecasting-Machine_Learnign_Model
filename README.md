# 📊 Sales Forecasting Model

A machine learning-based sales forecasting solution developed to support strategic decision-making at **Nestlé Sri Lanka PLC**. This system provides accurate, data-driven predictions for both category-wise and product-wise sales using advanced regression algorithms.

## 🚀 Project Overview

This project aims to improve **sales prediction accuracy** for better operational efficiency, inventory planning, and demand forecasting. Built using a full-stack architecture (Python backend and React frontend), the solution integrates multiple ML models and visualizes forecasts for actionable business insights.

## 🧠 Algorithms Evaluated

We explored and compared the following machine learning regression models:

- **Gradient Boosting Regressor** ⭐ *(Recommended)*
- **Random Forest Regressor**
- **Decision Tree Regressor**
- **Linear Regression**

The models were evaluated based on accuracy, stability, and interpretability across two main tasks:
- **Category-wise sales forecasting**
- **Product-wise sales forecasting**

### ✅ Best Performing Model:
**Gradient Boosting Regressor** demonstrated the highest performance in both tasks due to its ability to correct prediction errors iteratively and generalize well to unseen data.

---

## 🏗️ Project Structure

Sales Forecasting/
│
├── backend/ # Python backend (Flask or FastAPI)
│ ├── data/
│ │ ├── app.py # Main API endpoint
│ │ ├── sales_forecasting_category_wise_model.pkl
│ │ └── sales_forecasting_product_wise_model.pkl
│ └── requirements.txt # Python dependencies
│
├── frontend/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── services/
│ └── styles/
│
├── .gitignore
├── README.md
└── package.json


---

## 💡 Why Nestlé Should Use This

- 📈 **Accurate Forecasting** using Gradient Boosting and Random Forest
- 🧠 **Data-Driven Decisions** for inventory and production planning
- 🕒 **Operational Efficiency** through demand alignment
- 🔍 **Business Insights** through clean frontend visualizations

---

## 🛠️ Installation & Setup

### Backend
```bash
cd backend
pip install -r requirements.txt
python data/app.py

cd frontend
npm install
npm start
