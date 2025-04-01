// src/components/HeroSection.tsx
import React from 'react';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  return (
      <div className="hero-section">
        <div className="search-container">
          <input type="text" placeholder="Hungry? Let’s fix that." />
        </div>
      </div>
  );
};

export default HeroSection;
