import React, { useState } from 'react';
import api from '../services/api';

function PredictForm({ onPrediction }) {
  const [form, setForm] = useState({
    month: 1,
    day_of_week: 0,
    is_holiday: 0,
    price: 100,
    on_promotion: 0,
    category: 'Food',
    store: 'S02'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: name === 'price' || name === 'month' || name === 'day_of_week' ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert category and store into one-hot format
    const payload = {
      month: form.month,
      day_of_week: form.day_of_week,
      is_holiday: Number(form.is_holiday),
      price: form.price,
      on_promotion: Number(form.on_promotion),
      category_Beverage: form.category === 'Beverage' ? 1 : 0,
      category_Flavor: form.category === 'Flavor' ? 1 : 0,
      category_Food: form.category === 'Food' ? 1 : 0,
      store_id_S02: form.store === 'S02' ? 1 : 0,
      store_id_S03: form.store === 'S03' ? 1 : 0
    };

    try {
      const res = await api.post('/predict', payload);
      onPrediction(res.data.predicted_units_sold);
    } catch (err) {
      console.error('Prediction error:', err);
      alert('Prediction failed. Check backend.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Month:
        <input type="number" name="month" value={form.month} onChange={handleChange} min="1" max="12" />
      </label>
      <br />
      <label>
        Day of Week:
        <input type="number" name="day_of_week" value={form.day_of_week} onChange={handleChange} min="0" max="6" />
      </label>
      <br />
      <label>
        Is Holiday:
        <select name="is_holiday" value={form.is_holiday} onChange={handleChange}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </label>
      <br />
      <label>
        Price:
        <input type="number" name="price" value={form.price} onChange={handleChange} />
      </label>
      <br />
      <label>
        On Promotion:
        <select name="on_promotion" value={form.on_promotion} onChange={handleChange}>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </label>
      <br />
      <label>
        Category:
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="Food">Food</option>
          <option value="Beverage">Beverage</option>
          <option value="Flavor">Flavor</option>
        </select>
      </label>
      <br />
      <label>
        Store:
        <select name="store" value={form.store} onChange={handleChange}>
        <option value="S01">S01</option>
          <option value="S02">S02</option>
          <option value="S03">S03</option>
        </select>
      </label>
      <br />
      <button type="submit">Predict</button>
    </form>
  );
}

export default PredictForm;