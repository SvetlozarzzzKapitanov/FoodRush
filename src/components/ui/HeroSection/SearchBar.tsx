import React from "react";
import './SearchBar.css';
const SearchBar: React.FC = () => {
    const handleSearch = () => {
        const query = (document.getElementById("search-input") as HTMLInputElement).value;
        if (query) {
            alert(`Searching for ${query}`);
        }
    }
    return (
        <div className="search-bar">
            <input
                id ="search-input"
                type="text"
                placeholder="Hungry? Let’s fix that."
            />
            <button className="search-icon" onClick={handleSearch}>
                <img src="/SearchLensIcon.svg" alt="Search" />
            </button>
        </div>
    );
};

export default SearchBar;