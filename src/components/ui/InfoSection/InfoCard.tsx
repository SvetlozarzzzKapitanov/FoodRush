import React from 'react';
import './InfoCard.css';

interface InfoCardProps {
    children: React.ReactNode;
    width?: string;
    height?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ children, width = '300px', height = 'auto' }) => {
    return (
        <div className="info-card" style={{ width, height }}>
            {children}
        </div>
    );
};

export default InfoCard;