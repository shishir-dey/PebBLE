import React, { useState } from 'react';
import './styles/global.css';

function App() {
    const [services, setServices] = useState([]);
    const [connected, setConnected] = useState(false);

    const handleAddService = () => {
        console.log('Adding a service...');
    };

    const handleConnect = () => {
        setConnected(true);
        console.log('Connecting...');
    };

    return (
        <div className="container">
            <aside className="sidebar">
                <h1 style={{ fontSize: '2rem' }}>PebBLE</h1>
                <h5>*Works on Chrome and Edge</h5>

                <div className="horizontal-row">
                    <h4>Service</h4>
                    <button id="add-service-button" onClick={handleAddService}>
                        +
                    </button>
                </div>

                <div className="vertical-row" id="service-list">
                    {services.map((service, index) => (
                        <div key={index}>{service}</div>
                    ))}
                </div>

                <p style={{ fontSize: '0.8rem' }}>
                    Automatic discovery of services is not supported in Web Bluetooth.
                </p>
                <button id="connect-button" className="connect-btn" disabled={connected} onClick={handleConnect}>
                    {connected ? 'Disconnect' : 'Connect'}
                </button>

                <div style={{ marginTop: 50 }} />
                <div className="horizontal-row">
                    <h4>Shortcuts</h4>
                    <button>+</button>
                </div>
            </aside>

            <main className="content">
                <section className="">
                    <h2 id="device-name" style={{ fontSize: '2rem' }}>Device</h2>
                    <div className="horizontal-row">
                        <p id="mac" style={{ fontSize: '1rem' }}>
                            MAC: (not supported)
                        </p>
                        <p id="rssi">RSSI: (not supported)</p>
                        <p id="conn-interval">Connection Interval: (not supported)</p>
                    </div>
                </section>
                <div className="card-container" id="main" />
            </main>
        </div>
    );
}

export default App;
