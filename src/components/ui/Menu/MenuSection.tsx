import React, {useEffect, useState} from 'react';
import './MenuSection.css';
import MenuItemCard from './MenuItemCard';
import { Product } from '../../../types';


interface MenuSectionProps {
    items: Product[];
    categories: string[];
    selectedCategory: string | null;
    setSelectedCategory: (category: string) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ items, categories, selectedCategory, setSelectedCategory }) => {
    const [fadeKey, setFadeKey] = useState(0);

    useEffect(() => {
        setFadeKey(prev => prev + 1);
    }, [items]);

    return (
        <div className="menu-section">
            <h2>Menu</h2>

            <div className="menu-section-layout">
                {/* Sidebar */}
                <aside className="menu-sidebar">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`category-button ${selectedCategory === cat ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </aside>

                {/* Menu items */}
                <div className="menu-wrapper">
                    <div key={fadeKey} className="fade">
                        {items.length > 0 ? (
                            <div className="menu-grid">
                                {items.map(item => (
                                    <MenuItemCard key={item.id} item={item} />
                                ))}
                            </div>
                        ) : (
                            <div className="no-items-card">
                                <p>No items available in this category.</p>
                            </div>
                        )}
                    </div>
                </div>


            </div>

        </div>
    );
};

export default MenuSection;
