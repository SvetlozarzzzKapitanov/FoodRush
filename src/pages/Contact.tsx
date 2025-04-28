import React from 'react';
import './Contact.css';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import MHeader from "../components/ui/Headers/MHeader";

const Contact: React.FC = () => {
    return (
        <>
            <MHeader />
            <div className="contact-container">
                <div className="contact-card">
                    <h2>Контакти</h2>
                    <strong>Телефон:</strong>
                    <p>
                        <FaPhoneAlt style={{ marginRight: '5px', color: '#007bff' }} />
                        0888 123 456
                    </p>
                    <strong>Email:</strong>
                    <p>
                        <FaEnvelope style={{ marginRight: '5px', color: '#007bff' }} />
                        <a href="mailto:contact@foodrush.bg">foodrush@gmail.com</a>
                    </p>
                    <strong>Адрес:</strong>
                    <p>
                        <FaMapMarkerAlt style={{ marginRight: '5px', color: '#007bff' }} />
                        <a
                            href="https://www.google.com/maps/place/SAP+Labs+Bulgaria"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            ул. „Сребърна“ 16, 1407 София
                        </a>
                    </p>

                    <div className="social-icons">
                        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                            <FaFacebook />
                        </a>
                        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                            <FaInstagram />
                        </a>
                        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                            <FaXTwitter />
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
