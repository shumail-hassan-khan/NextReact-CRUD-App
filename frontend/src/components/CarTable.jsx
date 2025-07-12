import React from 'react';
import axios from 'axios';
import './CarTable.css';

export default function CarTable({ cars, fetchCars, setEditCar }) {
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this car?')) return;

        try {
            await axios.delete(`http://localhost:3000/api/cars/${id}`);
            fetchCars();
        } catch (err) {
            alert('Failed to delete the car.');
        }
    };

    return (
        <div className="car-table-container">
            <h3>All Cars</h3>
            {cars.length === 0 ? (
                <p>No cars found.</p>
            ) : (
                <table className="car-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Plate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car.id}>
                                <td>{car.id}</td>
                                <td>{car.make}</td>
                                <td>{car.model}</td>
                                <td>{car.year}</td>
                                <td>{car.plate}</td>
                                <td>
                                    <button onClick={() => setEditCar(car)} className="edit-btn">Edit</button>
                                    <button onClick={() => handleDelete(car.id)} className="delete-btn">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
