import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './product_card.css';

const ProductPage = () => {
  const { productId } = useParams();
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

  <div className="container">
  {product && (
    <div className="product-card">
      <div className="product-image">
        <div className="image-placeholder">
          <img src={`http://127.0.0.1:8000${product.image}`} alt={product.name} />
        </div>
      </div>
      <div className="product-info">
        <h1 className="product-title">{product.name}</h1>
        <p className="product-meta">{product.price}$</p>
        <p className="product-meta">27.01.2025</p>
        <p className="product-description">{product.description}</p>
        <div class="btn-container">
        <button className="btn reserve">Reserve</button>
        <button className="btn view">View on "Amazon"</button>
        </div>
      </div>
    </div>
  )}
  <p className="note">Giving this as a gift? Reserve it to avoid duplicate gifts.</p>
</div>

  );
};

export default ProductPage;
