import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import './Videography.css';

const Videography = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'videos'));
                const videosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setVideos(videosData);
            } catch (error) {
                console.error("Error fetching videos: ", error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="page-container container">
            <h1 className="section-title">Videography Portfolio</h1>
            <p className="section-subtitle">Cinematic stories told through motion</p>

            <div className="video-grid">
                {videos.map((video) => (
                    <div key={video.id} className="video-card">
                        <div className="video-wrapper">
                            <iframe
                                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                                title={video.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="video-info">
                            <h3>{video.title}</h3>
                            <p>{video.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Videography;
