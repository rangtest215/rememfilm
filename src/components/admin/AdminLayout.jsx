import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const AdminLayout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/admin/login');
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
            {/* Sidebar */}
            <div style={{ width: '250px', backgroundColor: '#1a1c23', color: 'white', padding: '20px', display: 'flex', flexDirection: 'column' }}>
                <h2 style={{ marginBottom: '40px', fontSize: '1.5rem', fontWeight: 'bold' }}>Admin Panel</h2>

                <nav style={{ flex: 1 }}>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to="/admin/dashboard" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '1.1rem', display: 'block', padding: '10px', borderRadius: '5px', transition: 'background 0.2s' }}>
                                Dashboard
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to="/admin/albums" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '1.1rem', display: 'block', padding: '10px', borderRadius: '5px', transition: 'background 0.2s' }}>
                                Albums
                            </Link>
                        </li>
                        <li style={{ marginBottom: '15px' }}>
                            <Link to="/admin/videos" style={{ color: '#d1d5db', textDecoration: 'none', fontSize: '1.1rem', display: 'block', padding: '10px', borderRadius: '5px', transition: 'background 0.2s' }}>
                                Videos
                            </Link>
                        </li>
                    </ul>
                </nav>

                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: 'auto',
                        padding: '10px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '40px' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;
