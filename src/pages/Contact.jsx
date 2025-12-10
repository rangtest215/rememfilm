import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="page-container container">
            <h1 className="section-title">Get In Touch</h1>
            <p className="section-subtitle">Let's discuss your next project</p>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="info-item">
                        <h3>Email</h3>
                        <p>hello@remem.film</p>
                    </div>
                    <div className="info-item">
                        <h3>Phone</h3>
                        <p>(+886) 983099204</p>
                    </div>
                    <div className="info-item">
                        <h3>Socials</h3>
                        <div className="social-links-contact">
                            <a href="https://www.instagram.com/remem.film?igsh=MXB6MTl1ZTg5MTFrNA==">Instagram</a>
                            <a href="https://m.youtube.com/%40%E5%9B%9E%E6%98%A0%E5%BD%B1%E5%83%8F?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcAOjwalleHRuA2FlbQIxMQBzcnRjBmFwcF9pZA81NjcwNjczNDMzNTI0MjcAAadc4L1cbnNw7Tr5bP4G5FP7-LQ8qxB020JPqLsdpyRX9fqD2BNU1ebQ3OcMfw_aem_2_3Md_89vY_rzwnPslsZKw">YouTube</a>
                            <a href="#">Twitter</a>
                        </div>
                    </div>
                </div>

                <form className="contact-form">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Your Name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Your Email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="service">Service Interested In</label>
                        <select id="service">
                            <option value="photography">Photography</option>
                            <option value="videography">Videography</option>
                            <option value="both">Both</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea id="message" rows="5" placeholder="Tell me about your project..." required></textarea>
                    </div>
                    <button type="submit" className="btn">Send Message</button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
