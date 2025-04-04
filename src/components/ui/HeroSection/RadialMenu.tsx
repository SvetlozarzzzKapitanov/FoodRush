import React, { useState, ReactNode } from 'react';
import './RadialMenu.css';

interface RadialMenuProps {
    children: ReactNode[];
}

const RadialMenu: React.FC<RadialMenuProps> = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);

    const count = children.length;

    return (
        <div className="radial-container">
            <ul className="radial-list">
                {children.map((child, index) => {
                    const angle = (360 / count) * index - 90; // -90° so the first item goes up
                    const radius = open ? 100 : 0;

                    const x = radius * Math.cos(angle * (Math.PI / 180));
                    const y = radius * Math.sin(angle * (Math.PI / 180));

                    return (
                        <li
                            key={index}
                            className="radial-item"
                            style={{
                                transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
                                opacity: open ? 1 : 0,
                                transitionDelay: `${index * 0.05}s`,
                            }}
                        >
                            {child}
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
