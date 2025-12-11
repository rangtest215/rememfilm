import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Photography from './pages/Photography';
import Videography from './pages/Videography';
import Contact from './pages/Contact';

import { AuthProvider } from './context/AuthContext';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminAlbums from './pages/admin/AdminAlbums';
import AdminVideos from './pages/admin/AdminVideos';

function App() {
    return (
        <AuthProvider>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="photography" element={<Photography />} />
                    <Route path="videography" element={<Videography />} />
                    <Route path="contact" element={<Contact />} />
                </Route>

                {/* Admin Routes */}
                <Route path="/admin/login" element={<Login />} />
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }>
                    <Route index element={<Navigate to="dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    {/* Placeholder for future routes */}
                    <Route path="albums" element={<AdminAlbums />} />
                    <Route path="videos" element={<AdminVideos />} />
                </Route>
            </Routes>
        </AuthProvider>
    );
}

export default App;
