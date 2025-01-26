import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './product_card.css'; // Стилевой файл для компонента

const ProductPage = () => {
  const { productId } = useParams();  // Получаем id товара из URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/products/${productId}/`)
      .then(res => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [productId]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      {product && (
        <div className="product-card">
          <h2>{product.name}</h2>
          <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} />
          <p>Цена: {product.price}</p>
          <p>Статус: {product.status}</p>
          <p>{product.description}</p>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
