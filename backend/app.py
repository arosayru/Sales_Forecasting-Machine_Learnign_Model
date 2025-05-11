from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import traceback
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Load models
category_model_path = 'sales_forecasting_category_wise_model.joblib'
product_model_path = 'sales_forecasting_product_wise_model.joblib'

category_model = joblib.load(category_model_path)
product_model = joblib.load(product_model_path)

category_features = category_model.feature_names_in_.tolist()
product_features = product_model.feature_names_in_.tolist()

@app.route('/')
def home():
    return "✅ Sales Forecasting API is running!"

# ==============================
# CATEGORY - SINGLE PREDICTION
# ==============================
@app.route('/predict-category', methods=['POST'])
def predict_category():
    try:
        data = request.get_json(force=True)
        df = pd.DataFrame([data])
        for col in category_features:
            if col not in df.columns:
                df[col] = 0
        df = df[category_features]
        prediction = category_model.predict(df)[0]
        return jsonify({'predicted_units_sold': round(prediction)})
    except Exception:
        traceback.print_exc()
        return jsonify({'error': 'Prediction failed'}), 500

# ==============================
# PRODUCT - SINGLE PREDICTION
# ==============================
@app.route('/predict-product', methods=['POST'])
def predict_product():
    try:
        data = request.get_json(force=True)
        df = pd.DataFrame([data])
        for col in product_features:
            if col not in df.columns:
                df[col] = 0
        df = df[product_features]
        prediction = product_model.predict(df)[0]
        return jsonify({'predicted_units_sold': round(prediction)})
    except Exception:
        traceback.print_exc()
        return jsonify({'error': 'Prediction failed'}), 500

# ==============================
# CATEGORY - FUTURE PREDICTIONS
# ==============================
@app.route('/predict-category-future', methods=['POST'])
def predict_category_future():
    try:
        data = request.get_json(force=True)
        base_input = {k: v for k, v in data.items() if k != 'month'}
        results = []

        for month in range(1, 13):
            row = base_input.copy()
            row['month'] = month

            df = pd.DataFrame([row])
            for col in category_features:
                if col not in df.columns:
                    df[col] = 0
            df = df[category_features]

            pred = category_model.predict(df)[0]
            results.append({
                'month': datetime(2025, month, 1).strftime('%b'),
                'actual': 0,
                'predicted': round(pred)
            })

        return jsonify(results)
    except Exception:
        traceback.print_exc()
        return jsonify({'error': 'Future category prediction failed'}), 500

# ==============================
# PRODUCT - FUTURE PREDICTIONS
# ==============================
@app.route('/predict-product-future', methods=['POST'])
def predict_product_future():
    try:
        data = request.get_json(force=True)
        base_input = {k: v for k, v in data.items() if k != 'month'}
        results = []

        for month in range(1, 13):
            row = base_input.copy()
            row['month'] = month

            df = pd.DataFrame([row])
            for col in product_features:
                if col not in df.columns:
                    df[col] = 0
            df = df[product_features]

            pred = product_model.predict(df)[0]
            results.append({
                'month': datetime(2025, month, 1).strftime('%b'),
                'actual': 0,
                'predicted': round(pred)
            })

        return jsonify(results)
    except Exception:
        traceback.print_exc()
        return jsonify({'error': 'Future product prediction failed'}), 500

# ==============================
# CHART DATA - CATEGORY
# ==============================
@app.route('/chart-data-category', methods=['GET'])
def chart_data_category():
    try:
        df = pd.read_csv('data/prediction_chart.csv')
        df['date'] = pd.to_datetime(df['date'])
        df['month'] = df['date'].dt.strftime('%b')
        grouped = df.groupby('month')[['actual', 'predicted']].sum().reset_index()
        return grouped.to_json(orient='records')
    except Exception:
        traceback.print_exc()
        return jsonify({'error': 'Chart data fetch failed'}), 500

# ==============================
# CHART DATA - PRODUCT
# ==============================
@app.route('/chart-data-product', methods=['GET'])
def chart_data_product():
    try:
        df = pd.read_csv('data/prediction_chart.csv')
        df['date'] = pd.to_datetime(df['date'])
        df['month'] = df['date'].dt.strftime('%b')
        grouped = df.groupby('month')[['actual', 'predicted']].sum().reset_index()
        return grouped.to_json(orient='records')
    except Exception:
        traceback.print_exc()
        return jsonify({'error': 'Chart data fetch failed'}), 500

# ==============================
# PRODUCTS LIST (CLEANED)
# ==============================
@app.route('/products', methods=['GET'])
def get_products():
    try:
        df = pd.read_csv('data/products.csv')
        df.columns = df.columns.str.strip().str.lower()
        df.rename(columns={
            'product id': 'product_id',
            'name': 'product_name',
            'product name': 'product_name',
            'category': 'category',
            'price': 'price'
        }, inplace=True)

        required_columns = ['product_id', 'product_name', 'category', 'price']
        df = df[required_columns]

        return df.to_json(orient='records')
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# ==============================
# SALES LIST (CLEANED)
# ==============================
@app.route('/sales', methods=['GET'])
def get_sales():
    try:
        df = pd.read_csv('data/sales_transactions.csv')
        df.columns = df.columns.str.strip().str.lower()
        df.rename(columns={
            'transaction_id': 'transaction_id',
            'date': 'date',
            'product_id': 'product_id',
            'store_id': 'store_id',
            'units_sold': 'units_sold',
            'sales_revenue': 'sales_revenue'
        }, inplace=True)

        required_columns = ['transaction_id', 'date', 'product_id', 'store_id', 'units_sold', 'sales_revenue']
        df = df[required_columns]
        df['date'] = pd.to_datetime(df['date']).dt.strftime('%Y-%m-%d')

        return df.to_json(orient='records')
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# ==============================
# PROMOTIONS LIST (CLEANED)
# ==============================
@app.route('/promotions', methods=['GET'])
def get_promotions():
    try:
        df = pd.read_csv('data/promotions.csv')
        df.columns = df.columns.str.strip().str.lower()
        df.rename(columns={
            'promotion_id': 'promotion_id',
            'product_id': 'product_id',
            'promotion_type': 'promotion_type',
            'start_date': 'start_date',
            'end_date': 'end_date',
            'discount_percent': 'discount_percent'
        }, inplace=True)

        df['start_date'] = pd.to_datetime(df['start_date']).dt.strftime('%Y-%m-%d')
        df['end_date'] = pd.to_datetime(df['end_date']).dt.strftime('%Y-%m-%d')

        required_columns = ['promotion_id', 'product_id', 'promotion_type', 'start_date', 'end_date', 'discount_percent']
        df = df[required_columns]

        return df.to_json(orient='records')
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

# ==============================
# HOLIDAYS LIST (CLEANED)
# ==============================
@app.route('/holidays', methods=['GET'])
def get_holidays():
    try:
        df = pd.read_csv('data/holidays.csv')
        df.columns = df.columns.str.strip().str.lower()
        df.rename(columns={
            'holiday_name': 'holiday_name',
            'date': 'date',
            'region': 'region'
        }, inplace=True)

        df['date'] = pd.to_datetime(df['date']).dt.strftime('%Y-%m-%d')
        df = df[['holiday_name', 'date', 'region']]
        return df.to_json(orient='records')
    except Exception as e:
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500


# ==============================
# MAIN RUNNER
# ==============================
if __name__ == '__main__':
    app.run(debug=True)
