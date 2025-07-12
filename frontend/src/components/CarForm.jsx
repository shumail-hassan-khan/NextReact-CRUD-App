import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarForm.css';

export default function CarForm({ fetchCars, editCar, setEditCar }) {
    const [form, setForm] = useState({ make: '', model: '', year: '', plate: '' });
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (editCar) {
            setForm({
                make: editCar.make,
                model: editCar.model,
                year: editCar.year,
                plate: editCar.plate,
            });
        }
    }, [editCar]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editCar
            ? `http://localhost:3000/api/cars/${editCar.id}`
            : 'http://localhost:3000/api/cars';

        const method = editCar ? 'put' : 'post';

        try {
            const res = await axios[method](url, form);
            setMessage(res.data.message);
            fetchCars();
            setForm({ make: '', model: '', year: '', plate: '' });
            setEditCar(null);
        } catch (err) {
            setMessage(err.response?.data?.message || 'Something went wrong.');
        }
    };

    return (
        <div className="car-form-container">
            <h3>{editCar ? 'Edit Car' : 'Add New Car'}</h3>
            <form onSubmit={handleSubmit} className="car-form">
                <input type="text" name="make" value={form.make} placeholder="Make" onChange={handleChange} required />
                <input type="text" name="model" value={form.model} placeholder="Model" onChange={handleChange} required />
                <input type="text" name="year" value={form.year} placeholder="Year" onChange={handleChange} required />
                <input type="text" name="plate" value={form.plate} placeholder="Plate (ABC-123 / AB-1234)" onChange={handleChange} required />
                <button type="submit">{editCar ? 'Update Car' : 'Add Car'}</button>
                {message && <p className="form-message">{message}</p>}
            </form>
        </div>
    );
}
