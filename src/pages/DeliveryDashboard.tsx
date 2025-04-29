import React, { useState } from 'react';
import AvailableOrdersTab from "../components/ui/DeliveryDashboard/AvailableOrdersTab.tsx";
// TODO: import InProgressTab, EarningsTab when ready

const DeliveryDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'available' | 'in-progress' | 'earnings'>('available');

    return (
        <div className="menu-page">
            <h2 style={{ textAlign: 'center', marginTop: '1rem' }}>Delivery Dashboard</h2>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', margin: '2rem 0' }}>
                <button className={activeTab === 'available' ? 'order-tab active' : 'order-tab'} onClick={() => setActiveTab('available')}>Available Orders</button>
                <button className={activeTab === 'in-progress' ? 'order-tab active' : 'order-tab'} onClick={() => setActiveTab('in-progress')}>In Progress</button>
                <button className={activeTab === 'earnings' ? 'order-tab active' : 'order-tab'} onClick={() => setActiveTab('earnings')}>Earnings</button>
            </div>

            {activeTab === 'available' && <AvailableOrdersTab />}
            {/* {activeTab === 'in-progress' && <InProgressTab />} */}
            {/* {activeTab === 'earnings' && <EarningsTab />} */}
        </div>
    );
};

export default DeliveryDashboard;
