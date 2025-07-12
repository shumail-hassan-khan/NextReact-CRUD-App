import React, { useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

export default function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axiosInstance.post('http://localhost:3000/api/login', form);
            setMessage(res.data.message);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/dashboard');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />

                <p style={{ fontSize: '14px', marginBottom: '10px', textAlign: 'center' }}>
                    New here? <Link to="/register">Register first</Link>
                </p>

                <button type="submit">Login</button>

                {message && <p className="login-message">{message}</p>}
            </form>
        </div>
    );
}
