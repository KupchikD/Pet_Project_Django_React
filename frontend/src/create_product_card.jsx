import React, { useState } from 'react';
import axios from 'axios';
import './create_product_card.css';

const CreateProductPage = () => {
  const [formData, setFormData] = useState({
    url: '',
    name: '',
    image: null,
    description: '',
    currency: '',
    price: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Проверка для поля цены
    if (name === 'price') {
      // Преобразуем строку в число
      const numericValue = value ? parseFloat(value) : '';
      setFormData(prevState => ({
        ...prevState,
        [name]: numericValue
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    setFormData(prevState => ({
      ...prevState,
      image: e.target.files[0] // Поле для загрузки файла
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Сброс ошибок перед отправкой

    // Валидация данных перед отправкой
    if (!formData.name || !formData.price || !formData.currency) {
      setError('Пожалуйста, заполните все обязательные поля.');
      return;
    }

    const data = new FormData();
    Object.keys(formData).forEach(key => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/products/create/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Товар успешно создан!');
      setFormData({ url: '', name: '', image: null, description: '', currency: '', price: '' });
    } catch (error) {
      console.error('Ошибка при создании товара:', error.response || error);
      alert('Ошибка при создании товара!');
    }
  };

  return (
    <div className="container">
      {/* Навигация */}
      <aside className="sidebar">
        <nav>
          <ul>
            <li><a href="/">Главная</a></li>
            <li><a href="/products">Товары</a></li>
            <li><a href="/product-card/create">Добавить товар</a></li>
          </ul>
        </nav>
      </aside>

      {/* Контент */}
      <main className="content">
        <h1>Новый товар/продукт</h1>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>} {/* Выводим ошибку, если она есть */}

          <label>Назва</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Введите название"
            onChange={handleChange}
            required
          />

          <label>Посилання</label>
          <input
            type="text"
            name="url"
            value={formData.url}
            placeholder="Введите ссылку"
            onChange={handleChange}
          />

          <label>Фото</label>
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
          />

          <label>Опис</label>
          <textarea
            placeholder="Введите описание"
            name="description"
            value={formData.description}
            onChange={handleChange}
          ></textarea>

          <label>Ціна</label>
          <div className="price-input">
            <input
              type="text"
              name="currency"
              placeholder="Валюта (например, USD)"
              value={formData.currency}
              onChange={handleChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Цена"
              value={formData.price}
              onChange={handleChange}
            />
          </div>

          <button type="submit">Зберегти</button>
        </form>
      </main>
    </div>
  );
};

export default CreateProductPage;
