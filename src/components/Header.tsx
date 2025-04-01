import './Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <div className="Branding">
                <img src="/Logo.svg" alt="Logo" />
                <h1>Food and Delivery</h1>
            </div>
        </header>
    );
};

export default Header;