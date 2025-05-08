import React, { useState } from 'react';
// import AvailableOrdersTab from "../components/ui/DeliveryDashboard/AvailableOrdersTab.tsx";
// import InProgressTab from "../components/ui/DeliveryDashboard/InProgressTab.tsx";
import EarningsTab from "../components/ui/DeliveryDashboard/EarningsTab.tsx";
import DeliveryOrdersTab from "../components/ui/DeliveryDashboard/DeliveryOrdersTab.tsx";

const DeliveryDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'available' | 'in-progress' | 'earnings'>('available');

    return (
        <div className="menu-page">
            <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>Delivery Dashboard</h2>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '2rem 0' }}>
                <button className={activeTab === 'in-progress' ? 'order-tab active' : 'order-tab'} onClick={() => setActiveTab('in-progress')}>In Progress</button>
                <button className={activeTab === 'earnings' ? 'order-tab active' : 'order-tab'} onClick={() => setActiveTab('earnings')}>Earnings</button>
            </div>

            {activeTab === 'in-progress' && <DeliveryOrdersTab />}
            {activeTab === 'earnings' && <EarningsTab />}
        </div>
    );
};

export default DeliveryDashboard;
