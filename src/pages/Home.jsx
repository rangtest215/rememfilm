import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home">
            <section className="hero">
                <div className="hero-content">
                    <h1>Capturing Life's <span className="highlight">Greatest Moments</span></h1>
                    <p>Professional Photography & Videography Services</p>
                    <div className="hero-buttons">
                        <Link to="/photography" className="btn">View Portfolio</Link>
                        <Link to="/contact" className="btn btn-outline">Get in Touch</Link>
                    </div>
                </div>
            </section>

            <section className="services container">
                <h2 className="section-title">My Services</h2>
                <p className="section-subtitle">Tailored solutions for your visual needs</p>

                <div className="services-grid">
                    <div className="service-card">
                        <div className="service-icon">📷</div>
                        <h3>Photography</h3>
                        <p>High-quality stills for weddings, events, and portraits. We capture the essence of the moment.</p>
                        <Link to="/photography" className="text-link">Explore Gallery &rarr;</Link>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">🎥</div>
                        <h3>Videography</h3>
                        <p>Cinematic storytelling for your special occasions. Relive the emotions through motion.</p>
                        <Link to="/videography" className="text-link">Watch Videos &rarr;</Link>
                    </div>

                    <div className="service-card">
                        <div className="service-icon">✨</div>
                        <h3>Creative Direction</h3>
                        <p>Full-service creative direction to bring your vision to life, from concept to final edit.</p>
                        <Link to="/contact" className="text-link">Let's Collaborate &rarr;</Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
