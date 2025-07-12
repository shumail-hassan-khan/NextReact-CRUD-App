import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const res = await axios.post('http://localhost:3000/api/register', form);
            setMessage(res.data.message);

            if (res.status === 201) {
                setTimeout(() => navigate('/login'), 1000);
            }
        } catch (err) {
            setMessage(err.response?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Register</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                />
                <label style={{ marginBottom: '10px' }}>
                    <input
                        type="checkbox"
                        onChange={() => setShowPassword(!showPassword)}
                    />{' '}
                    Show Password
                </label>
                <button type="submit">Register</button>
                {message && <p className="register-message">{message}</p>}
            </form>
        </div>
    );
}
