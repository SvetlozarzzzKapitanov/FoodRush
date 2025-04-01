import React from 'react';
import InfoCard from "./InfoCard";
import './InfoSection.css';

const InfoSection: React.FC = () => {
    return (
        <div className="info-section">
            <InfoCard>
                <h3>Placeholder Title</h3>
                <p>This box can hold anything we want later on.</p>
            </InfoCard>
        </div>
    );
};

export default InfoSection;