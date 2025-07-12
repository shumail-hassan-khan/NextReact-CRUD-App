import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import CarForm from '../components/CarForm';
import CarTable from '../components/CarTable';
import './Dashboard.css';

export default function Dashboard() {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);
    const [editCar, setEditCar] = useState(null);

    const fetchCars = async () => {
        try {
            const res = await axiosInstance.get('http://localhost:3000/api/cars');
            setCars(res.data.data);
        } catch (err) {
            console.log('Error fetching cars:', err);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) navigate('/login');
        else fetchCars();
    }, []);

    return (
        <div className="dashboard-wrapper">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-logo">NEXTCRUD</div>
                <ul className="navbar-menu">
                    <li><Link to="/dashboard">Home</Link></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </nav>

            {/* Main Content */}
            <div className="dashboard-content">
                <CarForm fetchCars={fetchCars} editCar={editCar} setEditCar={setEditCar} />
                <CarTable cars={cars} fetchCars={fetchCars} setEditCar={setEditCar} />
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="footer-section">
                    <h4>About Us</h4>
                    <p>Simple CRUD system using Next.js & React.</p>
                </div>
                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#">Dashboard</a></li>
                        <li><a href="#">Support</a></li>
                        <li><a href="#">Docs</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>Email: support@nextcrud.com</p>
                    <p>Phone: +92-123-4567890</p>
                </div>
            </footer>
        </div>
    );
}
