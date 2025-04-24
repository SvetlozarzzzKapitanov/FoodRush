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
                            href="https://www.google.com/maps/place/SAP+Labs+Bulgaria/@42.6603877,23.3184622,17z/data=!4m6!3m5!1s0x40a8fe964c0f552f:0xf16513b0a4f40273!8m2!3d42.6598587!4d23.3210517!16s%2Fg%2F1tlzynys?entry=ttu&g_ep=EgoyMDI1MDQyMS4wIKXMDSoASAFQAw%3D%3D"
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
            </PageWrapper>
        </div>
    );
};

export default Contact;
