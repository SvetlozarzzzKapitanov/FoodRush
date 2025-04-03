import React from 'react';
import './HeroSection.css';

const HeroSection: React.FC = () => {
    const handleSearch = () => {
        const query = (document.getElementById("search-input") as HTMLInputElement).value;
        if (query) {
            alert(`Searching for ${query}`);
        }
    }
  return (
      <div className="hero-section">
        <div className="search-bar">
          <input
              id ="search-input"
              type="text"
              placeholder="Hungry? Let’s fix that."
          />

            <button className="search-icon" onClick={handleSearch}>
                <img src="/public/SearchLensIcon.svg" alt="Search" />
            </button>
        </div>
      </div>
  );
};

export default HeroSection;
