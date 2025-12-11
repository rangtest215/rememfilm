import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Dashboard = () => {
    const { currentUser } = useAuth();

    return (
        <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px' }}>Dashboard</h1>
            <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>Welcome back, {currentUser?.email}</h2>
                <p style={{ color: '#666' }}>Select "Albums" or "Videos" from the sidebar to manage your portfolio content.</p>
            </div>
        </div>
    );
};

export default Dashboard;
