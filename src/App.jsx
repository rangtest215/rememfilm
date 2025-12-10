import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Photography from './pages/Photography';
import Videography from './pages/Videography';
import Contact from './pages/Contact';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="photography" element={<Photography />} />
                <Route path="videography" element={<Videography />} />
                <Route path="contact" element={<Contact />} />
            </Route>
        </Routes>
    );
}

export default App;
