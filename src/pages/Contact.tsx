import React from 'react';
import './Contact.css';
import { FaFacebook, FaInstagram, FaXTwitter } from 'react-icons/fa6';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import MHeader from "../components/ui/Headers/MHeader.tsx";
import PageWrapper from "../components/ui/PageWrapper";

const Contact: React.FC = () => {
    return (
        <div className="contact-container">
            <MHeader />
            <PageWrapper>
                <div className="contact-card">
                    <h2>Контакти</h2>
                    <strong>Телефон:</strong>{' '}
                    <p>
                        <FaPhoneAlt style={{ marginRight: '5px', color: '#007bff' }} />
                        0888 123 456
                    </p>
                    <strong>Email:</strong>{' '}
                    <p>
                        <FaEnvelope style={{ marginRight: '5px', color: '#007bff' }} />
                        <a href="mailto:contact@foodrush.bg">foodrush@gmail.com</a>
                    </p>
                    <strong>Адрес:</strong>{' '}
                    <p>
                        <FaMapMarkerAlt style={{ marginRight: '5px', color: '#007bff' }} />
                        <a
                            href="https://www.google.com/maps/place/SAP+Labs+Bulgaria/@42.639507,23.342411,17z"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            бул. Цариградско шосе 115Г, София
                        </a>
                    </p>

                    <div className="social-icons">
                        <a href="#"><FaFacebook /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaXTwitter /></a>
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
};

export default Contact;
