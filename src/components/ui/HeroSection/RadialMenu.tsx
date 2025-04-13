import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RadialMenu.css';

interface RadialItem {
    label: string;
    icon?: React.ReactNode;
    to: string;
}

interface RadialMenuProps {
    items: RadialItem[];
}

const RadialMenu: React.FC<RadialMenuProps> = ({ items }) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => setOpen(!open);
    const count = items.length;

    return (
        <div className="radial-container">
            <ul className="radial-list">
                {items.map((item, index) => {
                    const radius = open ? 200 : 0;
                    const angle = (2 * Math.PI * index) / count; // semi-circle (top to bottom)
                    const x = -Math.cos(angle) * radius; // to the left
                    const y = Math.sin(angle) * radius;

                    return (
                        <li
                            key={index}
                            className="radial-item"
                            style={{
                                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                                opacity: open ? 1 : 0,
                                transitionDelay: `${index * 0.05}s`,
                            }}
                            onClick={() => navigate(item.to)}
                        >
                            {item.icon && <div className="bubble-icon">{item.icon}</div>}
                            <div className="bubble-label">{item.label}</div>
                        </li>
                    );
                })}
            </ul>

            <button className="radial-toggle" onClick={toggleMenu}>
                ☰
            </button>
        </div>
    );

};

export default RadialMenu;
// const radius = open ? 200 : 0;
// const angle = (2 * Math.PI * index) / count; // пълна обиколка
//
// const x = Math.cos(angle) * radius;
// const y = Math.sin(angle) * radius;