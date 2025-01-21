import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        username: false,  // Ошибка для username
        email: false,     // Ошибка для email
        password: false,  // Ошибка для password
    });
    const [errorMessages, setErrorMessages] = useState({
        username: '',  // Сообщение об ошибке для username
        email: '',     // Сообщение об ошибке для email
        password: '',  // Сообщение об ошибке для password
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Обновляем данные формы
        setFormData({
            ...formData,
            [name]: value,
        });

        // Валидация при изменении значения
        if (name === 'username') {
            setErrors({
                ...errors,
                username: value.trim() === '',  // Если поле пустое, ошибка
            });
            setErrorMessages({
                ...errorMessages,
                username: value.trim() === '' ? 'Username cannot be empty.' : '',
            });
        }

        if (name === 'password') {
            setErrors({
                ...errors,
                password: value.length < 6, // Ошибка, если пароль меньше 6 символов
            });
            setErrorMessages({
                ...errorMessages,
                password: value.length < 6 ? 'Password must be at least 6 characters long.' : '',
            });
        }
    };

    // Валидация для username при потере фокуса
    const handleUsernameBlur = (e) => {
        setErrors({
            ...errors,
            username: e.target.value.trim() === '', // true, если username пустой
        });
        setErrorMessages({
            ...errorMessages,
            username: e.target.value.trim() === '' ? 'Username cannot be empty.' : '',
        });
    };

    // Валидация для email при потере фокуса
    const handleEmailBlur = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setErrors({
            ...errors,
            email: !emailRegex.test(e.target.value), // true, если email некорректный
        });
        setErrorMessages({
            ...errorMessages,
            email: !emailRegex.test(e.target.value) ? 'Email must be in the format "example@example.com"' : '',
        });
    };

    // Валидация для password при потере фокуса
    const handlePasswordBlur = (e) => {
        setErrors({
            ...errors,
            password: e.target.value.length < 6, // true, если пароль меньше 6 символов
        });
        setErrorMessages({
            ...errorMessages,
            password: e.target.value.length < 6 ? 'Password must be at least 6 characters long.' : '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Проверяем наличие ошибок
        if (errors.username || errors.email || errors.password) {
            setMessage('Please fill in all fields correctly.');
            return;  // Если есть ошибка, не отправляем форму
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/users/register/', formData);
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Error: ' + JSON.stringify(error.response.data));
        }
    };

    return (
        <div>
            <h1>Join MyWishlist</h1>
            <h3>Create an account to save your wishlist and share it with friends</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        onBlur={handleUsernameBlur}  // Валидация при потере фокуса
                        className={errors.username ? 'input-error' : ''} // Подсветка для username
                        required
                    />
                    {errors.username && <p className="error-message">{errorMessages.username}</p>}  {/* Подсказка для username */}
                </div>

                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        onBlur={handleEmailBlur}  // Валидация при потере фокуса
                        className={errors.email ? 'input-error' : ''} // Подсветка для email
                        required
                    />
                    {errors.email && <p className="error-message">{errorMessages.email}</p>}  {/* Подсказка для email */}
                </div>

                <div>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        onBlur={handlePasswordBlur}  // Валидация при потере фокуса
                        className={errors.password ? 'input-error' : ''} // Подсветка для password
                        required
                    />
                    {errors.password && <p className="error-message">{errorMessages.password}</p>}  {/* Подсказка для password */}
                </div>
                <button type="submit">Sign up</button>
                <p>Already have an account? <a><b>Log in</b></a></p>
            </form>
            {message && <p>{message}</p>}
            <p className="foot">By continuing, you agree to the <a><b>Terms of Use</b></a> and <a><b>Privacy Policy</b></a></p>
        </div>
    );
};

export default Register;
