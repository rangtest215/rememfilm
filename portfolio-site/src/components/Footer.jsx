import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-content">
                    <h3>REMEM.FILM</h3>
                    <p>Capturing moments, telling stories.</p>
                    <div className="social-links">
                        <a href="https://www.instagram.com/remem.film?igsh=MXB6MTl1ZTg5MTFrNA==" target="_blank" rel="noopener noreferrer">Instagram</a>
                        <a href="https://m.youtube.com/%40%E5%9B%9E%E6%98%A0%E5%BD%B1%E5%83%8F?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcAOjwalleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAadc4L1cbnNw7Tr5bP4G5FP7-LQ8qxB020JPqLsdpyRX9fqD2BNU1ebQ3OcMfw_aem_2_3Md_89vY_rzwnPslsZKw" target="_blank" rel="noopener noreferrer">YouTube</a>
                        <a href="#" target="_blank" rel="noopener noreferrer">Email</a>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} RememFilm. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
