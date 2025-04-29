import React, { useEffect, useState } from 'react'
import API from '../api/api'
import PageWrapper from '../components/ui/Other/PageWrapper'
import MHeader from '../components/ui/Headers/MHeader'

const SettingsPage: React.FC = () => {
    const [settings, setSettings] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await API.get<Record<string, any>>('/settings');
                setSettings(res.data);
            } catch (err: unknown) {
                console.error('Failed to load settings', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSettings();
    }, []);


    const handleSave = async () => {
        try {
            await API.put('/settings/update', settings)
            alert('Settings updated!')
        } catch (err) {
            console.error(err)
            alert('Failed to update settings.')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSettings((prev: any) => ({
            ...prev,
            [name]: value,
        }))
    }

    if (loading) return <div>Loading settings...</div>

    return (
        <div className="menu-page">
            <MHeader />
            <PageWrapper>
                <h2>Settings</h2>
                <div style={{ marginTop: '2rem' }}>
                    <label>
                        Preferred Theme:
                        <input
                            name="theme"
                            value={settings.theme || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Notification Email:
                        <input
                            name="email"
                            value={settings.email || ''}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <button onClick={handleSave}>Save Settings</button>
                </div>
            </PageWrapper>
        </div>
    )
}

export default SettingsPage
