import './App.css';
import Register from './Register';
import ProductPage from './product_card';
import CreateProductPage from './create_product_card';
import axios from 'axios';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

class App extends React.Component{
    state = { details: [], }

    componentDidMount(){
        let data;
        axios.get('http://localhost:8000/api/products/create/')
        .then(res => {
            data = res.data;
            this.setState({
                details: data
            });
        })
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        const Home = () => (
            <div>
                <h1>Главная страница</h1>
                {/* Тут можно добавить какие-то элементы или данные, если нужно */}
            </div>
        );

        return(
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/product-card/:productId" element={<ProductPage />} />
                    <Route path="/product-card/create" element={<CreateProductPage />} />
                </Routes>
            </Router>
        );
    }
}

export default App;
