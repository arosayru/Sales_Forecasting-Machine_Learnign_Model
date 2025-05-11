import React, { useState } from 'react';
import api from '../services/api';

function CategoryForm({ onPrediction, onFuturePrediction }) {
  const [form, setForm] = useState({
    category: 'Food',
    month: 1,
    is_holiday: 0,
    price: 100,
    on_promotion: 0,
    store: 'S02'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: ['month', 'price'].includes(name) ? Number(value) : value
    }));
  };

  const buildPayload = () => ({
    month: form.month,
    is_holiday: Number(form.is_holiday),
    price: form.price,
    on_promotion: Number(form.on_promotion),
    category_Beverage: form.category === 'Beverage' ? 1 : 0,
    category_Flavor: form.category === 'Flavor' ? 1 : 0,
    category_Food: form.category === 'Food' ? 1 : 0,
    store_id_S01: form.store === 'S01' ? 1 : 0,
    store_id_S02: form.store === 'S02' ? 1 : 0,
    store_id_S03: form.store === 'S03' ? 1 : 0,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = buildPayload();
      const res = await api.post('/predict-category', payload);
      const prediction = Math.round(res.data.predicted_units_sold);
      onPrediction(prediction);

      // 👇 Update chart with only the selected month
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      const chart = months.map((m, i) => ({
        month: m,
        actual: 0,
        predicted: i === (form.month - 1) ? prediction : 0
      }));

      onFuturePrediction(chart);
    } catch (err) {
      console.error('Prediction failed:', err);
      alert('Prediction failed.');
    }
  };

  const handleFuture = async () => {
    try {
      const payload = buildPayload();
      const res = await api.post('/predict-category-future', payload);

      const formatted = res.data.map(item => ({
        month: item.month,          // e.g., Jan, Feb, ...
        actual: item.actual || 0,   // default fallback
        predicted: item.predicted
      }));

      onFuturePrediction(formatted);
    } catch (err) {
      console.error('Future prediction failed:', err);
      alert('Future prediction failed.');
    }
  };

  return (
    <form className="form-grid" onSubmit={handleSubmit}>
      <label>Category:
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="Food">Food</option>
          <option value="Beverage">Beverage</option>
          <option value="Flavor">Flavor</option>
        </select>
      </label>

      <label>Month:
        <input
          type="number"
          name="month"
          value={form.month}
          onChange={handleChange}
          min="1"
          max="12"
        />
      </label>

      <label>Is Holiday:
        <select name="is_holiday" value={form.is_holiday} onChange={handleChange}>
          <option value={0}>No</option>
          <option value={1}>Yes</option>
        </select>
      </label>

      <label>Price:
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
        />
      </label>

      <label>On Promotion:
        <select name="on_promotion" value={form.on_promotion} onChange={handleChange}>
          <option value={0}>No</option>
          <option value={1}>Yes</option>
        </select>
      </label>

      <label>Store:
        <select name="store" value={form.store} onChange={handleChange}>
          <option value="S01">S01</option>
          <option value="S02">S02</option>
          <option value="S03">S03</option>
        </select>
      </label>

      <button className="predict-btn" type="submit">Predict</button>
      <button
        type="button"
        className="predict-btn"
        style={{ marginLeft: '10px' }}
        onClick={handleFuture}
      >
        Predict Future (12 Months)
      </button>
    </form>
  );
}

export default CategoryForm;
