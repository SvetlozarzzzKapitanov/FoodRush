import TraditionalLayout from "./layouts/Traditional Layout.tsx";
import ModernLayout from "./layouts/ModernLayout.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Contact from "./pages/Contact.tsx";
import {useState} from "react";
import './App.css';
import AboutUs from "./pages/AboutUs.tsx";

function App() {
    const [useModernLayout, setUseModernLayout] = useState(true);

    return (
        <Router>
            <div>
                <button
                    className="layout-toggle-btn"
                    onClick={() => setUseModernLayout(!useModernLayout)}
                >
                    {useModernLayout ? 'Switch to Traditional' : 'Switch to Modern'}
                </button>

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/about" element={<AboutUs />} />
                    /*<Route path="*" element={useModernLayout ? <ModernLayout /> : <TraditionalLayout />} />*/
                </Routes>
            </div>
        </Router>
    );
}

export default App;