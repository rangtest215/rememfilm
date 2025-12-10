import React, { useState, useEffect } from 'react';
import photosData from '../data/photos.json';
import './Photography.css';

const Photography = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        setAlbums(photosData);
    }, []);

    return (
        <div className="page-container container">
            <h1 className="section-title">Photography Portfolio</h1>
            <p className="section-subtitle">A collection of my best work across different categories</p>

            {albums.map((album) => (
                <div key={album.id} className="album-section">
                    <div className="album-header">
                        <h2>{album.title}</h2>
                        <p>{album.description}</p>
                    </div>
                    <div className="photo-grid">
                        {album.photos.map((photo, index) => (
                            <div key={index} className="photo-item">
                                <img src={photo} alt={`${album.title} ${index + 1}`} loading="lazy" />
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Photography;
