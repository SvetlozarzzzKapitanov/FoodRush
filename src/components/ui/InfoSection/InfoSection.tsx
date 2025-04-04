import React from 'react';
import InfoCard from './InfoCard.tsx';
import './InfoSection.css';

const InfoSection: React.FC = () => {
    return (
        <div className="info-section">
            <h2>Today’s Favourites</h2>
            <div className="card-container">
                <InfoCard
                    width="250px"
                >
                    <h3>Small Card</h3>
                    <p>Compact info.</p>
                </InfoCard>

                <InfoCard width="500px" height="300px">
                    <h3>Big Card</h3>
                    <p>This one has more space for stuff.</p>
                </InfoCard>

            </div>
        </div>
    );
};

export default InfoSection;
