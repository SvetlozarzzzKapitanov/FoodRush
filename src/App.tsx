import TraditionalLayout from "./layouts/Traditional Layout.tsx";
import ModernLayout from "./layouts/ModernLayout.tsx";
import {useState} from "react";
import './App.css';

function App() {
    const [useModernLayout, setUseModernLayout] = useState(true);

    return (
        <div>
            <button
                className="layout-toggle-btn"
                onClick={() => setUseModernLayout(!useModernLayout)}
            >
                {useModernLayout ? 'Switch to Traditional' : 'Switch to Modern'}
            </button>

            {useModernLayout ? <ModernLayout /> : <TraditionalLayout />}
        </div>
    );
}

export default App;